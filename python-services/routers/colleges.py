from fastapi import APIRouter, HTTPException, Query
from pathlib import Path
from typing import Optional
import pandas as pd

from models import CollegeType
from schemas import BranchOut, CollegeOut, PaginatedColleges

router = APIRouter(prefix="/colleges", tags=["Colleges"])

DATA_PATH = Path(__file__).parent.parent / "data" / "sample_cutoffs.csv"

_df: pd.DataFrame | None = None


def _load() -> pd.DataFrame:
    global _df
    if _df is None:
        _df = pd.read_csv(DATA_PATH)
        _df["branch_code"] = _df["branch_code"].str.upper().str.strip()
        _df["college_type"] = _df["college_type"].str.strip()
        _df["district"] = _df["district"].str.strip()
    return _df


def _build_college(grp: pd.DataFrame) -> CollegeOut:
    row = grp.iloc[0]
    branches = (
        grp[["branch_code", "branch_name", "fees_per_year"]]
        .drop_duplicates("branch_code")
        .reset_index(drop=True)
    )
    branch_list = [
        BranchOut(
            id=i,
            name=str(b["branch_name"]),
            code=str(b["branch_code"]),
            intake=None,
            fees_per_year=float(b["fees_per_year"]) if pd.notna(b["fees_per_year"]) else None,
        )
        for i, b in branches.iterrows()
    ]
    return CollegeOut(
        id=int(row["college_id"]),
        name=str(row["college_name"]),
        short_name=str(row["short_name"]) if pd.notna(row.get("short_name")) else None,
        location=str(row["location"]) if pd.notna(row.get("location")) else str(row["district"]),
        district=str(row["district"]),
        college_type=CollegeType(row["college_type"]),
        affiliated_to=str(row["affiliated_to"]) if pd.notna(row.get("affiliated_to")) else None,
        website=str(row["website"]) if pd.notna(row.get("website")) else None,
        naac_grade=str(row["naac_grade"]) if pd.notna(row.get("naac_grade")) else None,
        nirf_rank=None,
        total_intake=None,
        established_year=None,
        branches=branch_list,
    )


def _unique_colleges(df: pd.DataFrame) -> pd.DataFrame:
    """One row per (college_id, branch_code) from the latest year."""
    latest = df[df["year"] == df["year"].max()]
    return latest.drop_duplicates(subset=["college_id", "branch_code"])


@router.get("", response_model=PaginatedColleges)
def search_colleges(
    name: Optional[str] = Query(None),
    college_type: Optional[CollegeType] = Query(None),
    district: Optional[str] = Query(None),
    branch_code: Optional[str] = Query(None),
    min_fee: Optional[float] = Query(None, ge=0),
    max_fee: Optional[float] = Query(None),
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
):
    df = _unique_colleges(_load())

    if name:
        n = name.lower()
        df = df[
            df["college_name"].str.lower().str.contains(n, na=False)
            | df["short_name"].str.lower().str.contains(n, na=False)
        ]
    if college_type:
        df = df[df["college_type"] == college_type.value]
    if district:
        df = df[df["district"].str.lower().str.contains(district.lower(), na=False)]
    if branch_code:
        df = df[df["branch_code"].str.contains(branch_code.upper(), na=False)]
    if min_fee is not None:
        df = df[df["fees_per_year"] >= min_fee]
    if max_fee is not None:
        df = df[df["fees_per_year"] <= max_fee]

    college_ids = df["college_id"].unique()
    total = len(college_ids)

    paged_ids = college_ids[(page - 1) * page_size : page * page_size]
    full_df = _unique_colleges(_load())
    results = [
        _build_college(full_df[full_df["college_id"] == cid])
        for cid in paged_ids
    ]

    return PaginatedColleges(total=total, page=page, page_size=page_size, results=results)


@router.get("/{college_id}", response_model=CollegeOut)
def get_college(college_id: int):
    df = _unique_colleges(_load())
    grp = df[df["college_id"] == college_id]
    if grp.empty:
        raise HTTPException(status_code=404, detail="College not found")
    return _build_college(grp)
