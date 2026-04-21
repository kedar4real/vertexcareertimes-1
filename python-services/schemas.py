from pydantic import BaseModel, Field, field_validator
from typing import Optional
from models import CollegeType, Category


# ── College schemas ──────────────────────────────────────────────────────────

class BranchOut(BaseModel):
    id: int
    name: str
    code: Optional[str]
    intake: Optional[int]
    fees_per_year: Optional[float]

    model_config = {"from_attributes": True}


class CollegeOut(BaseModel):
    id: int
    name: str
    short_name: Optional[str]
    location: str
    district: str
    college_type: CollegeType
    affiliated_to: Optional[str]
    website: Optional[str]
    naac_grade: Optional[str]
    nirf_rank: Optional[int]
    total_intake: Optional[int]
    established_year: Optional[int]
    branches: list[BranchOut] = []

    model_config = {"from_attributes": True}


class CollegeSearchParams(BaseModel):
    name: Optional[str] = None
    college_type: Optional[CollegeType] = None
    district: Optional[str] = None
    branch_code: Optional[str] = None
    min_fee: Optional[float] = None
    max_fee: Optional[float] = None
    page: int = Field(default=1, ge=1)
    page_size: int = Field(default=20, ge=1, le=100)


class PaginatedColleges(BaseModel):
    total: int
    page: int
    page_size: int
    results: list[CollegeOut]


# ── Cutoff schemas ───────────────────────────────────────────────────────────

class CutoffOut(BaseModel):
    college_name: str
    branch_name: str
    year: int
    category: Category
    round_no: int
    cutoff_percentile: float

    model_config = {"from_attributes": True}


# ── Prediction schemas ───────────────────────────────────────────────────────

class PredictionRequest(BaseModel):
    percentile: float = Field(..., ge=0.0, le=100.0)
    category: Category
    branch_preference: list[str] = Field(..., min_length=1, max_length=10)
    home_district: str
    budget: int = Field(..., ge=0)

    @field_validator("branch_preference")
    @classmethod
    def normalise_branches(cls, v: list[str]) -> list[str]:
        return [b.strip().upper() for b in v]


class CollegePrediction(BaseModel):
    college_name: str
    short_name: Optional[str]
    branch: str
    district: str
    college_type: str
    fees_per_year: Optional[float]
    cutoff_2024: Optional[float]
    cutoff_2023: Optional[float]
    percentile_gap: float
    classification: str  # "safe" | "target" | "ambitious"
    home_district_bonus: bool


class PredictionResponse(BaseModel):
    percentile: float
    category: Category
    safe: list[CollegePrediction]
    target: list[CollegePrediction]
    ambitious: list[CollegePrediction]
    total_matches: int


# ── Analytics schemas ────────────────────────────────────────────────────────

class TrendPoint(BaseModel):
    year: int
    cutoff_percentile: float


class BranchTrend(BaseModel):
    college_name: str
    branch_name: str
    category: Category
    trend: list[TrendPoint]


class DistrictStats(BaseModel):
    district: str
    total_colleges: int
    government_count: int
    aided_count: int
    unaided_count: int
    avg_fees: Optional[float]
