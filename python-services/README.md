# Vertex Career Times — Python Services

FastAPI microservice for CAP admission counselling. Runs alongside the Next.js app.

## Setup

```bash
cd python-services

# Create virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # Mac/Linux

pip install -r requirements.txt

# Copy and fill in env vars
cp .env.example .env
```

Edit `.env` with your Hostinger MySQL credentials.

## Run

If your terminal is already inside `python-services`, use this command:

```bash
python -m uvicorn main:app --reload --port 8000
```

If your terminal is in the project root, use this command instead:

```bash
python -m uvicorn python-services.main:app --reload --port 8000
```

The frontend and API will be available at `http://localhost:8000`.  
Interactive docs: `http://localhost:8000/docs`

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Health check |
| GET | `/colleges` | Search colleges with filters |
| GET | `/colleges/{id}` | Get single college |
| POST | `/predict` | CAP prediction (safe/target/ambitious) |
| GET | `/analytics/cutoff-trend` | Cutoff trend over years |
| GET | `/analytics/district-stats` | College stats by district |
| GET | `/analytics/top-branches` | Branches ranked by avg cutoff |
| POST | `/predict/report` | Structured counselling report from prediction results |
| POST | `/ingestion/run` | Manual CSV ingestion trigger |

## College Search Filters

```
GET /colleges?name=coep&college_type=Government&district=Pune&branch_code=CS&min_fee=0&max_fee=50000
```

## Prediction Example

```json
POST /predict
{
  "percentile": 97.5,
  "category": "OPEN",
  "branch_preference": ["CS", "IT"],
  "home_district": "Pune",
  "budget": 200000
}
```

Returns colleges split into `safe` (>2 percentile gap), `target` (±1.5), and `ambitious` (<-1.5).

## Prediction Report

```bash
POST /predict/report
```

Uses the same JSON body as `/predict` and returns `summary`, `counts`, `recommended_colleges`, and grouped `categories`.

## Analytics Formats

Existing analytics endpoints keep their default response shapes. For chart-ready data, add `format=series`:

```bash
GET /analytics/district-stats?format=series
GET /analytics/top-branches?district=Pune&format=series
GET /analytics/cutoff-trend?branch=CSE&format=series
```

## Data Ingestion

Dry-run the CSV pipeline without touching the database:

```bash
python scripts/ingest_colleges.py --dry-run
```

Run the ingestion into the configured database:

```bash
python scripts/ingest_colleges.py
```

You can also trigger a dry-run through the API:

```bash
POST /ingestion/run?dry_run=true
```

## Calling from Next.js

```js
// In any Next.js API route or server component
const res = await fetch('http://localhost:8000/predict', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ percentile: 97.5, category: 'OPEN', branch_preference: ['CS'], home_district: 'Pune', budget: 150000 })
})
const data = await res.json()
```

For production, set `PYTHON_API_URL` in your Next.js `.env` and point it to the deployed service URL.

## Database

The service uses the same Hostinger MySQL database as Next.js.  
Tables (`colleges`, `branches`, `cutoffs`) are auto-created on first run via SQLAlchemy.

To seed real data, import `sample_cutoffs.csv` or write a seed script using the models in `models.py`.
