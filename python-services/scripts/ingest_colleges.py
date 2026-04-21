from __future__ import annotations

import sys
from pathlib import Path
from typing import Any

import pandas as pd
from sqlalchemy.orm import Session

BASE_DIR = Path(__file__).resolve().parents[1]
if str(BASE_DIR) not in sys.path:
    sys.path.insert(0, str(BASE_DIR))

from database import Base, SessionLocal, engine
from models import Branch, Category, College, CollegeType, Cutoff

DEFAULT_CSV_PATH = BASE_DIR / "data" / "sample_cutoffs.csv"


def _clean_text(value: Any, *, title_case: bool = False) -> str | None:
    if pd.isna(value):
        return None
    text = str(value).strip()
    if not text:
        return None
    return text.title() if title_case else text


def _clean_dataframe(csv_path: Path) -> pd.DataFrame:
    df = pd.read_csv(csv_path)
    required = {
        "college_id",
        "college_name",
        "location",
        "district",
        "college_type",
        "fees_per_year",
        "branch_code",
        "branch_name",
        "category",
        "year",
        "round_no",
        "cutoff_percentile",
    }
    missing = required - set(df.columns)
    if missing:
        raise ValueError(f"CSV missing required columns: {', '.join(sorted(missing))}")

    text_columns = ["college_name", "location", "district", "college_type", "branch_name"]
    for column in text_columns:
        df[column] = df[column].apply(lambda value: _clean_text(value, title_case=True))

    for column in ["short_name", "affiliated_to", "website", "naac_grade"]:
        if column in df.columns:
            df[column] = df[column].apply(_clean_text)

    df["branch_code"] = df["branch_code"].astype(str).str.strip().str.upper()
    df["category"] = df["category"].astype(str).str.strip().str.upper()
    df["fees_per_year"] = pd.to_numeric(df["fees_per_year"], errors="coerce").fillna(0)
    df["cutoff_percentile"] = pd.to_numeric(df["cutoff_percentile"], errors="coerce")
    df["year"] = pd.to_numeric(df["year"], errors="coerce").fillna(0).astype(int)
    df["round_no"] = pd.to_numeric(df["round_no"], errors="coerce").fillna(1).astype(int)
    df = df.dropna(subset=["college_id", "college_name", "branch_code", "branch_name", "cutoff_percentile"])
    df["college_id"] = df["college_id"].astype(int)
    return df


def _enum_value(enum_cls: type[CollegeType] | type[Category], value: str):
    for item in enum_cls:
        if item.value.lower() == value.lower():
            return item
    raise ValueError(f"Unsupported {enum_cls.__name__}: {value}")


def ingest_colleges(csv_path: str | Path = DEFAULT_CSV_PATH, dry_run: bool = False) -> dict[str, int | str | bool]:
    path = Path(csv_path)
    if not path.is_absolute():
        path = BASE_DIR / path
    if not path.exists():
        raise FileNotFoundError(f"CSV not found: {path}")

    df = _clean_dataframe(path)
    if dry_run:
        return {
            "source": str(path),
            "dry_run": True,
            "rows_processed": int(len(df)),
            "unique_colleges": int(df["college_id"].nunique()),
            "unique_branches": int(df["branch_code"].nunique()),
        }

    Base.metadata.create_all(bind=engine)

    created_colleges = 0
    updated_colleges = 0
    created_branches = 0
    created_cutoffs = 0
    updated_cutoffs = 0

    db: Session = SessionLocal()
    try:
        for _, row in df.iterrows():
            college = db.get(College, int(row["college_id"]))
            if college is None:
                college = College(id=int(row["college_id"]))
                db.add(college)
                created_colleges += 1
            else:
                updated_colleges += 1

            college.name = row["college_name"]
            college.short_name = row.get("short_name")
            college.location = row["location"] or row["district"]
            college.district = row["district"]
            college.college_type = _enum_value(CollegeType, row["college_type"])
            college.affiliated_to = row.get("affiliated_to") or "Savitribai Phule Pune University"
            college.website = row.get("website")
            college.naac_grade = row.get("naac_grade")

            branch = (
                db.query(Branch)
                .filter(Branch.college_id == college.id, Branch.code == row["branch_code"])
                .one_or_none()
            )
            if branch is None:
                branch = Branch(college=college, code=row["branch_code"])
                db.add(branch)
                created_branches += 1

            branch.name = row["branch_name"]
            branch.fees_per_year = float(row["fees_per_year"]) if pd.notna(row["fees_per_year"]) else None
            db.flush()

            category = _enum_value(Category, row["category"])
            cutoff = (
                db.query(Cutoff)
                .filter(
                    Cutoff.college_id == college.id,
                    Cutoff.branch_id == branch.id,
                    Cutoff.year == int(row["year"]),
                    Cutoff.category == category,
                    Cutoff.round_no == int(row["round_no"]),
                )
                .one_or_none()
            )
            if cutoff is None:
                cutoff = Cutoff(
                    college=college,
                    branch=branch,
                    year=int(row["year"]),
                    category=category,
                    round_no=int(row["round_no"]),
                )
                db.add(cutoff)
                created_cutoffs += 1
            else:
                updated_cutoffs += 1

            cutoff.cutoff_percentile = float(row["cutoff_percentile"])

        db.commit()
    except Exception:
        db.rollback()
        raise
    finally:
        db.close()

    return {
        "source": str(path),
        "dry_run": False,
        "rows_processed": int(len(df)),
        "colleges_created": created_colleges,
        "colleges_updated": updated_colleges,
        "branches_created": created_branches,
        "cutoffs_created": created_cutoffs,
        "cutoffs_updated": updated_cutoffs,
    }


if __name__ == "__main__":
    dry = "--dry-run" in sys.argv
    args = [arg for arg in sys.argv[1:] if arg != "--dry-run"]
    csv_arg = Path(args[0]) if args else DEFAULT_CSV_PATH
    print(ingest_colleges(csv_arg, dry_run=dry))
