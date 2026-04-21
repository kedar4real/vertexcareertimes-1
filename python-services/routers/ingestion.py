from pathlib import Path

from fastapi import APIRouter, HTTPException, Query

from scripts.ingest_colleges import DEFAULT_CSV_PATH, ingest_colleges

router = APIRouter(prefix="/ingestion", tags=["Data Ingestion"])


@router.post("/run")
def run_ingestion(csv_path: str | None = None, dry_run: bool = Query(False)):
    try:
        result = ingest_colleges(Path(csv_path) if csv_path else DEFAULT_CSV_PATH, dry_run=dry_run)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Ingestion failed: {exc}")
    return {"success": True, "data": result}
