from sqlalchemy import Column, Integer, String, Float, Enum, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from database import Base
import enum


class CollegeType(str, enum.Enum):
    GOVERNMENT = "Government"
    AIDED = "Aided"
    UNAIDED = "Unaided"
    AUTONOMOUS = "Autonomous"


class Category(str, enum.Enum):
    OPEN = "OPEN"
    OBC = "OBC"
    SC = "SC"
    ST = "ST"
    EWS = "EWS"
    OPEN_PH = "OPEN_PH"
    OBC_PH = "OBC_PH"


class College(Base):
    __tablename__ = "colleges"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    short_name = Column(String(50))
    location = Column(String(100), nullable=False)
    district = Column(String(100), nullable=False)
    college_type = Column(Enum(CollegeType), nullable=False)
    affiliated_to = Column(String(150), default="Savitribai Phule Pune University")
    website = Column(String(255))
    naac_grade = Column(String(5))
    nirf_rank = Column(Integer)
    total_intake = Column(Integer)
    established_year = Column(Integer)

    cutoffs = relationship("Cutoff", back_populates="college", cascade="all, delete-orphan")
    branches = relationship("Branch", back_populates="college", cascade="all, delete-orphan")


class Branch(Base):
    __tablename__ = "branches"

    id = Column(Integer, primary_key=True, index=True)
    college_id = Column(Integer, ForeignKey("colleges.id"), nullable=False)
    name = Column(String(150), nullable=False)
    code = Column(String(20))
    intake = Column(Integer)
    fees_per_year = Column(Float)

    college = relationship("College", back_populates="branches")
    cutoffs = relationship("Cutoff", back_populates="branch")

    __table_args__ = (UniqueConstraint("college_id", "code"),)


class Cutoff(Base):
    __tablename__ = "cutoffs"

    id = Column(Integer, primary_key=True, index=True)
    college_id = Column(Integer, ForeignKey("colleges.id"), nullable=False)
    branch_id = Column(Integer, ForeignKey("branches.id"), nullable=False)
    year = Column(Integer, nullable=False)
    category = Column(Enum(Category), nullable=False)
    round_no = Column(Integer, default=1)
    cutoff_percentile = Column(Float, nullable=False)

    college = relationship("College", back_populates="cutoffs")
    branch = relationship("Branch", back_populates="cutoffs")

    __table_args__ = (UniqueConstraint("college_id", "branch_id", "year", "category", "round_no"),)
