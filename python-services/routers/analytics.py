from fastapi import APIRouter, Query, HTTPException
from pathlib import Path
from typing import Optional
import pandas as pd

from schemas import BranchTrend, TrendPoint, DistrictStats
from models import Category

router = APIRouter(prefix="/analytics", tags=["Analytics"])

DATA_PATH = Path(__file__).parent.parent / "data" / "sample_cutoffs.csv"

_df: pd.DataFrame | None = None

BRANCH_ALIASES = {
    "CSE": "CS",
    "COMPUTER": "CS",
    "COMP": "CS",
    "EXTC": "ENTC",
    "ELECTRONICS": "ENTC",
    "CIVIL": "CE",
    "MECH": "ME",
    "MECHANICAL": "ME",
}


def _load() -> pd.DataFrame:
    global _df
    if _df is None:
        _df = pd.read_csv(DATA_PATH)
        _df = _df.where(pd.notna(_df), None)
        _df["branch_code"] = _df["branch_code"].astype(str).str.upper().str.strip()
        _df["category"] = _df["category"].astype(str).str.upper().str.strip()
        _df["district"] = _df["district"].astype(str).str.strip()
    return _df


def _format_response(data, labels=None, values=None, response_format: str = "legacy"):
    if response_format == "series":
        return {"labels": labels or [], "values": values or [], "data": data}
    if response_format == "standard":
        return {"success": True, "data": data}
    return data


def _normalise_branch(value: str) -> str:
    cleaned = value.upper().strip()
    return BRANCH_ALIASES.get(cleaned, cleaned)


@router.get("/cutoff-trend")
def cutoff_trend(
    college_id: Optional[int] = Query(None),
    branch_code: Optional[str] = Query(None),
    branch: Optional[str] = Query(None),
    category: Category = Query(Category.OPEN),
    response_format: str = Query("legacy", alias="format", pattern="^(legacy|series|standard)$"),
):
    df = _load()
    cat_str = category.value
    selected_branch = _normalise_branch(branch_code or branch or "")
    if not selected_branch:
        raise HTTPException(status_code=422, detail="Provide branch_code or branch")

    mask = (df["branch_code"] == selected_branch) & (df["category"] == cat_str)
    if college_id is not None:
        mask = mask & (df["college_id"] == college_id)
    rows = df[mask].sort_values("year")
    if rows.empty:
        raise HTTPException(status_code=404, detail="No data found for given filters")

    if college_id is None:
        rows = (
            rows.groupby(["year", "branch_name", "category"], as_index=False)["cutoff_percentile"]
            .mean()
            .sort_values("year")
        )
        trend = [
            TrendPoint(year=int(r["year"]), cutoff_percentile=round(float(r["cutoff_percentile"]), 2))
            for _, r in rows.iterrows()
        ]
        result = [
            BranchTrend(
                college_name="All Colleges",
                branch_name=rows.iloc[0]["branch_name"],
                category=category,
                trend=trend,
            )
        ]
        return _format_response(
            result,
            labels=[point.year for point in trend],
            values=[point.cutoff_percentile for point in trend],
            response_format=response_format,
        )

    trend = [
        TrendPoint(year=int(r["year"]), cutoff_percentile=round(float(r["cutoff_percentile"]), 2))
        for _, r in rows.iterrows()
    ]
    result = [
        BranchTrend(
            college_name=rows.iloc[0]["college_name"],
            branch_name=rows.iloc[0]["branch_name"],
            category=category,
            trend=trend,
        )
    ]
    return _format_response(
        result,
        labels=[point.year for point in trend],
        values=[point.cutoff_percentile for point in trend],
        response_format=response_format,
    )


@router.get("/district-stats")
def district_stats(
    district: Optional[str] = Query(None),
    response_format: str = Query("legacy", alias="format", pattern="^(legacy|series|standard)$"),
):
    df = _load()
    latest = df[df["year"] == df["year"].max()]
    if district:
        latest = latest[latest["district"].str.lower().str.contains(district.lower(), na=False)]
    grouped = latest.groupby("district")

    stats = []
    for district, grp in grouped:
        unique = grp.drop_duplicates("college_id")
        stats.append(
            DistrictStats(
                district=str(district),
                total_colleges=unique["college_id"].nunique(),
                government_count=int((unique["college_type"] == "Government").sum()),
                aided_count=int((unique["college_type"] == "Aided").sum()),
                unaided_count=int((unique["college_type"] == "Unaided").sum()),
                avg_fees=round(float(unique["fees_per_year"].mean()), 2) if "fees_per_year" in unique else None,
            )
        )
    result = sorted(stats, key=lambda x: x.total_colleges, reverse=True)
    return _format_response(
        result,
        labels=[item.district for item in result],
        values=[item.total_colleges for item in result],
        response_format=response_format,
    )


@router.get("/top-branches")
def top_branches(
    year: int = Query(2024),
    category: Category = Query(Category.OPEN),
    branch: Optional[str] = Query(None),
    district: Optional[str] = Query(None),
    response_format: str = Query("legacy", alias="format", pattern="^(legacy|series|standard)$"),
):
    df = _load()
    mask = (df["year"] == year) & (df["category"] == category.value)
    if branch:
        branch_term = _normalise_branch(branch)
        mask = mask & (
            df["branch_code"].str.contains(branch_term, na=False)
            | df["branch_name"].str.upper().str.contains(branch_term, na=False)
        )
    if district:
        mask = mask & df["district"].str.lower().str.contains(district.lower(), na=False)
    rows = df[mask]
    if rows.empty:
        raise HTTPException(status_code=404, detail="No data for given year/category")

    avg = (
        rows.groupby(["branch_code", "branch_name"])["cutoff_percentile"]
        .mean()
        .reset_index()
        .sort_values("cutoff_percentile", ascending=False)
    )
    result = avg.rename(columns={"cutoff_percentile": "avg_cutoff"})
    result["avg_cutoff"] = result["avg_cutoff"].round(2)
    records = result.to_dict(orient="records")
    return _format_response(
        records,
        labels=[row["branch_code"] for row in records],
        values=[row["avg_cutoff"] for row in records],
        response_format=response_format,
    )
