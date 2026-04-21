from fastapi import APIRouter, HTTPException
from pathlib import Path
import pandas as pd

from schemas import PredictionRequest, PredictionResponse, CollegePrediction
from models import Category

router = APIRouter(prefix="/predict", tags=["CAP Prediction"])

DATA_PATH = Path(__file__).parent.parent / "data" / "sample_cutoffs.csv"

_df: pd.DataFrame | None = None


def _load_data() -> pd.DataFrame:
    global _df
    if _df is None:
        _df = pd.read_csv(DATA_PATH)
        _df["branch_code"] = _df["branch_code"].str.upper().str.strip()
        _df["category"] = _df["category"].str.upper().str.strip()
        _df["district"] = _df["district"].str.strip()
    return _df


def _classify(gap: float) -> str:
    """gap = student_percentile - cutoff_percentile (positive means safer)"""
    if gap >= 2.0:
        return "safe"
    if gap >= -1.5:
        return "target"
    return "ambitious"


@router.post("", response_model=PredictionResponse)
def predict_colleges(req: PredictionRequest):
    try:
        df = _load_data()
    except FileNotFoundError:
        raise HTTPException(status_code=500, detail="Cutoff data not found. Run seed script first.")

    cat_str = req.category.value

    # Filter to requested category, preferred branches, and budget
    mask = (
        (df["category"] == cat_str)
        & (df["branch_code"].isin(req.branch_preference))
        & (df["year"] == df["year"].max())  # latest year's cutoffs
    )

    if req.budget > 0:
        mask = mask & (df["fees_per_year"] <= req.budget)

    filtered = df[mask].copy()

    if filtered.empty:
        # Fallback: relax branch filter
        mask_relaxed = (df["category"] == cat_str) & (df["year"] == df["year"].max())
        if req.budget > 0:
            mask_relaxed = mask_relaxed & (df["fees_per_year"] <= req.budget)
        filtered = df[mask_relaxed].copy()

    if filtered.empty:
        return PredictionResponse(
            percentile=req.percentile,
            category=req.category,
            safe=[],
            target=[],
            ambitious=[],
            total_matches=0,
        )

    # Get 2023 cutoffs for trend
    df_prev = df[(df["category"] == cat_str) & (df["year"] == df["year"].max() - 1)][
        ["college_id", "branch_code", "cutoff_percentile"]
    ].rename(columns={"cutoff_percentile": "cutoff_prev"})

    filtered = filtered.merge(df_prev, on=["college_id", "branch_code"], how="left")
    filtered["gap"] = req.percentile - filtered["cutoff_percentile"]
    filtered["classification"] = filtered["gap"].apply(_classify)
    filtered["home_district_bonus"] = filtered["district"].str.lower() == req.home_district.lower()

    results: dict[str, list[CollegePrediction]] = {"safe": [], "target": [], "ambitious": []}

    for _, row in filtered.sort_values("cutoff_percentile", ascending=False).iterrows():
        pred = CollegePrediction(
            college_name=row["college_name"],
            short_name=None if pd.isna(row.get("short_name")) else row.get("short_name"),
            branch=row["branch_name"],
            district=row["district"],
            college_type=row["college_type"],
            fees_per_year=None if pd.isna(row.get("fees_per_year")) else row.get("fees_per_year"),
            cutoff_2024=None if pd.isna(row.get("cutoff_percentile")) else row["cutoff_percentile"],
            cutoff_2023=None if pd.isna(row.get("cutoff_prev")) else row.get("cutoff_prev"),
            percentile_gap=round(float(row["gap"]), 4),
            classification=row["classification"],
            home_district_bonus=bool(row["home_district_bonus"]),
        )
        results[row["classification"]].append(pred)

    return PredictionResponse(
        percentile=req.percentile,
        category=req.category,
        safe=results["safe"],
        target=results["target"],
        ambitious=results["ambitious"],
        total_matches=len(filtered),
    )


def _college_to_report_item(college: CollegePrediction) -> dict:
    return {
        "college_name": college.college_name,
        "short_name": college.short_name,
        "branch": college.branch,
        "district": college.district,
        "college_type": college.college_type,
        "fees_per_year": college.fees_per_year,
        "cutoff_2024": college.cutoff_2024,
        "cutoff_2023": college.cutoff_2023,
        "percentile_gap": college.percentile_gap,
        "classification": college.classification,
        "home_district_bonus": college.home_district_bonus,
    }


@router.post("/report")
def prediction_report(req: PredictionRequest):
    prediction = predict_colleges(req)
    safe = [_college_to_report_item(item) for item in prediction.safe]
    target = [_college_to_report_item(item) for item in prediction.target]
    ambitious = [_college_to_report_item(item) for item in prediction.ambitious]

    top_recommendations = (safe[:5] + target[:3] + ambitious[:2])[:10]
    summary = (
        f"For {req.percentile:.2f} percentile in {req.category.value}, "
        f"the system found {prediction.total_matches} matching college options. "
        f"Use Safe colleges as primary choices, Target colleges as balanced options, "
        f"and Ambitious colleges as stretch preferences."
    )

    return {
        "success": True,
        "data": {
            "student_profile": {
                "percentile": req.percentile,
                "category": req.category.value,
                "branch_preference": req.branch_preference,
                "home_district": req.home_district,
                "budget": req.budget,
            },
            "summary": summary,
            "counts": {
                "safe": len(safe),
                "target": len(target),
                "ambitious": len(ambitious),
                "total_matches": prediction.total_matches,
            },
            "recommended_colleges": top_recommendations,
            "categories": {
                "safe": safe,
                "target": target,
                "ambitious": ambitious,
            },
        },
    }
