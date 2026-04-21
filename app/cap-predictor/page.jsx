'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const API_BASE = process.env.NEXT_PUBLIC_PYTHON_API_BASE || 'http://localhost:8001'

const categories = ['OPEN', 'OBC', 'SC', 'ST', 'EWS', 'OPEN_PH', 'OBC_PH']
const branches = [
  { code: 'CS', name: 'Computer' },
  { code: 'IT', name: 'Information Tech' },
  { code: 'ENTC', name: 'ENTC' },
  { code: 'ME', name: 'Mechanical' },
  { code: 'CE', name: 'Civil' },
]

function formatFee(value) {
  if (value == null) return 'Fee NA'
  return `Rs. ${Number(value).toLocaleString('en-IN')}`
}

async function apiFetch(path, options = {}) {
  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), 5000)

  try {
    const response = await fetch(`${API_BASE}${path}`, {
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
      signal: controller.signal,
      ...options,
    })

    if (!response.ok) {
      throw new Error((await response.text()) || `Request failed: ${response.status}`)
    }

    return response.json()
  } finally {
    window.clearTimeout(timeout)
  }
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-700">{eyebrow}</p>
        <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950">{title}</h2>
      </div>
      {description ? <p className="max-w-xl text-sm leading-6 text-slate-600">{description}</p> : null}
    </div>
  )
}

function StatTile({ label, value }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-extrabold text-slate-950">{value}</p>
    </div>
  )
}

function ResultColumn({ title, count, tone, items }) {
  const toneClass = {
    safe: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    target: 'bg-amber-100 text-amber-700 border-amber-200',
    ambitious: 'bg-rose-100 text-rose-700 border-rose-200',
  }[tone]

  return (
    <section className="overflow-hidden rounded-lg border border-slate-200 bg-white">
      <div className="flex items-center justify-between bg-slate-50 px-3 py-3">
        <h4 className="text-sm font-bold text-slate-950">{title}</h4>
        <span className={`rounded-lg border px-2.5 py-1 text-xs font-bold ${toneClass}`}>{count}</span>
      </div>
      {items.length ? (
        items.slice(0, 6).map((item, index) => (
          <article key={`${item.college_name}-${item.branch}-${index}`} className="border-t border-slate-100 p-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h5 className="text-sm font-bold leading-5 text-slate-950">{item.college_name}</h5>
                <p className="mt-1 text-xs font-semibold text-slate-500">
                  {item.short_name || item.district || 'College option'}
                </p>
              </div>
              <span className={`rounded-lg border px-2 py-1 text-[11px] font-bold ${toneClass}`}>
                {item.classification}
              </span>
            </div>
            <p className="mt-3 text-sm font-semibold text-blue-700">{item.branch}</p>
            <dl className="mt-3 grid gap-2 text-xs font-medium text-slate-600">
              <div className="flex justify-between gap-3">
                <dt>District</dt>
                <dd className="text-right text-slate-900">{item.district}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt>Cutoff</dt>
                <dd className="text-slate-900">{item.cutoff_2024 == null ? 'NA' : Number(item.cutoff_2024).toFixed(2)}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt>Fees</dt>
                <dd className="text-slate-900">{formatFee(item.fees_per_year)}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt>Score gap</dt>
                <dd className="text-slate-900">
                  {item.percentile_gap == null ? 'NA' : `${Number(item.percentile_gap).toFixed(2)} gap`}
                </dd>
              </div>
            </dl>
          </article>
        ))
      ) : (
        <div className="border-t border-slate-100 p-3 text-sm font-medium text-slate-500">
          No {title.toLowerCase()} matches.
        </div>
      )}
    </section>
  )
}

export default function CapPredictorPage() {
  const [apiOnline, setApiOnline] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [stats, setStats] = useState({ colleges: '--', districts: '--', branches: '--' })
  const [districts, setDistricts] = useState([])
  const [profile, setProfile] = useState({
    percentile: 97.5,
    category: 'OPEN',
    branch_preference: ['CS'],
    home_district: 'Pune',
    budget: 200000,
  })
  const [prediction, setPrediction] = useState(null)
  const [report, setReport] = useState(null)
  const [colleges, setColleges] = useState({ total: 0, results: [] })
  const [collegeFilters, setCollegeFilters] = useState({ name: '', district: '', branch: '', type: '' })
  const [analytics, setAnalytics] = useState({ district: [], branches: [], trend: [], trendTitle: 'Cutoff trend' })
  const [loading, setLoading] = useState({ predict: false, report: false, colleges: false })
  const [error, setError] = useState('')

  const payload = useMemo(() => ({
    percentile: Number(profile.percentile),
    category: profile.category,
    branch_preference: profile.branch_preference,
    home_district: profile.home_district || 'Pune',
    budget: Number(profile.budget),
  }), [profile])

  useEffect(() => {
    setMounted(true)
    setDarkMode(window.localStorage.getItem('capPredictorTheme') === 'dark')
  }, [])

  useEffect(() => {
    if (mounted) {
      window.localStorage.setItem('capPredictorTheme', darkMode ? 'dark' : 'light')
    }
  }, [darkMode, mounted])

  useEffect(() => {
    async function bootstrap() {
      try {
        await apiFetch('/health')
        setApiOnline(true)
      } catch {
        setApiOnline(false)
      }

      try {
        const [districtSeries, branchSeries, collegePage, catalog] = await Promise.all([
          apiFetch('/analytics/district-stats?format=series'),
          apiFetch('/analytics/top-branches?year=2024&category=OPEN&format=series'),
          apiFetch('/colleges?page=1&page_size=1'),
          apiFetch('/colleges?page=1&page_size=100'),
        ])
        const districtRows = districtSeries.data || districtSeries
        const branchRows = branchSeries.data || branchSeries
        const uniqueBranches = new Set((catalog.results || []).flatMap((college) => (college.branches || []).map((branch) => branch.code).filter(Boolean)))
        setDistricts(districtRows.map((item) => item.district))
        setStats({
          colleges: collegePage.total || 0,
          districts: districtRows.length,
          branches: uniqueBranches.size || branchRows.length,
        })
        setAnalytics((prev) => ({
          ...prev,
          district: (districtSeries.labels || []).map((label, index) => ({ label, value: districtSeries.values?.[index] ?? districtRows[index]?.total_colleges ?? 0 })),
          branches: (branchSeries.labels || []).map((label, index) => ({ label, value: branchSeries.values?.[index] ?? branchRows[index]?.avg_cutoff ?? 0 })),
        }))

        const first = collegePage.results?.[0]
        const branch = first?.branches?.[0]?.code || 'CS'
        if (first) {
          const trendSeries = await apiFetch(`/analytics/cutoff-trend?college_id=${first.id}&branch_code=${branch}&category=OPEN&format=series`)
          const trendRows = trendSeries.data || []
          const row = trendRows[0]
          setAnalytics((prev) => ({
            ...prev,
            trendTitle: row ? `${row.college_name} - ${row.branch_name}` : 'Cutoff trend',
            trend: (trendSeries.labels || []).map((label, index) => ({ label, value: trendSeries.values?.[index] ?? 0 })),
          }))
        }
      } catch (err) {
        setError('Some analytics could not be loaded. Confirm the Python backend is running.')
      }
    }

    bootstrap()
    loadColleges()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function loadColleges(nextFilters = collegeFilters) {
    setLoading((state) => ({ ...state, colleges: true }))
    const params = new URLSearchParams({ page: '1', page_size: '9' })
    if (nextFilters.name) params.set('name', nextFilters.name)
    if (nextFilters.district) params.set('district', nextFilters.district)
    if (nextFilters.branch) params.set('branch_code', nextFilters.branch)
    if (nextFilters.type) params.set('college_type', nextFilters.type)
    try {
      const data = await apiFetch(`/colleges?${params.toString()}`)
      setColleges(data)
    } catch {
      setError('Could not load college data from Python backend.')
    } finally {
      setLoading((state) => ({ ...state, colleges: false }))
    }
  }

  async function runPrediction(event) {
    event.preventDefault()
    setError('')
    setReport(null)
    if (!payload.branch_preference.length) {
      setError('Select at least one preferred branch.')
      return
    }
    setLoading((state) => ({ ...state, predict: true }))
    try {
      setPrediction(await apiFetch('/predict', { method: 'POST', body: JSON.stringify(payload) }))
    } catch {
      setError('Prediction failed. Check that FastAPI is running and CORS is configured.')
    } finally {
      setLoading((state) => ({ ...state, predict: false }))
    }
  }

  async function generateReport() {
    setError('')
    if (!payload.branch_preference.length) {
      setError('Select at least one preferred branch.')
      return
    }
    setLoading((state) => ({ ...state, report: true }))
    try {
      setReport(await apiFetch('/predict/report', { method: 'POST', body: JSON.stringify(payload) }))
    } catch {
      setError('Report generation failed. Restart the Python backend if /predict/report is not loaded.')
    } finally {
      setLoading((state) => ({ ...state, report: false }))
    }
  }

  function updateBranch(code) {
    setProfile((current) => {
      const exists = current.branch_preference.includes(code)
      const next = exists
        ? current.branch_preference.filter((item) => item !== code)
        : [...current.branch_preference, code]
      return { ...current, branch_preference: next }
    })
  }

  const isDark = mounted && darkMode
  const reportData = report?.data
  const chartGrid = isDark ? '#334155' : '#e2e8f0'
  const chartText = isDark ? '#cbd5e1' : '#64748b'
  const primaryBar = isDark ? '#60a5fa' : '#1d4ed8'
  const secondaryBar = isDark ? '#22d3ee' : '#0f172a'
  const pageStyle = {
    backgroundColor: isDark ? '#020617' : '#f8fafc',
    color: isDark ? '#e2e8f0' : '#020617',
  }

  return (
    <main
      className="min-h-screen bg-slate-50 text-slate-950 transition-colors duration-300"
      data-cap-theme={isDark ? 'dark' : 'light'}
      style={pageStyle}
    >
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1260px] items-center justify-between px-4">
          <a href="#top" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-blue-800 text-sm font-bold text-white">VCT</span>
            <span>
              <span className="block text-sm font-bold text-slate-950">Vertex Career Times</span>
              <span className="hidden text-xs font-medium text-slate-500 sm:block">Engineering admissions platform</span>
            </span>
          </a>
          <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-600 md:flex">
            <a className="hover:text-blue-700" href="#predictor">Predictor</a>
            <a className="hover:text-blue-700" href="#report">Report</a>
            <a className="hover:text-blue-700" href="#colleges">Colleges</a>
            <a className="hover:text-blue-700" href="#analytics">Analytics</a>
            <a className="hover:text-blue-700" href="#backend">Backend</a>
          </nav>
          <div className="flex items-center gap-2">
            <button
              className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 px-3 text-xs font-bold text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
              onClick={() => setDarkMode((value) => !value)}
              type="button"
            >
              <span>{isDark ? 'Light mode' : 'Dark mode'}</span>
            </button>
            <span className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600">
              <span className={`h-2.5 w-2.5 rounded-full ${apiOnline ? 'bg-emerald-500' : 'bg-rose-500'}`} />
              {apiOnline ? 'API Online' : 'API Offline'}
            </span>
          </div>
        </div>
      </header>

      <section id="top" className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-[1260px] gap-5 px-4 py-7 lg:grid-cols-[1fr_0.78fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-700">Maharashtra Engineering Admissions</p>
            <h1 className="mt-3 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
              Admission predictor for counselling decisions
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Enter MHT-CET details, review college fit categories, and generate a structured counselling report from the Python FastAPI backend.
            </p>
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            <StatTile label="Colleges" value={stats.colleges} />
            <StatTile label="Districts" value={stats.districts} />
            <StatTile label="Branches" value={stats.branches} />
          </div>
        </div>
      </section>

      <section id="predictor" className="mx-auto max-w-[1260px] px-4 py-8">
        <SectionHeading
          eyebrow="Student Workspace"
          title="CAP predictor"
          description="The frontend submits the profile to POST /predict; recommendation groups are returned by the Python backend."
        />

        {error ? (
          <div className="mb-4 rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm font-semibold text-rose-700">{error}</div>
        ) : null}

        <div className="grid gap-4 lg:grid-cols-[360px_minmax(0,1fr)]">
          <form onSubmit={runPrediction} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-4 border-b border-slate-200 pb-3">
              <h3 className="text-base font-bold">Student profile</h3>
              <p className="mt-1 text-sm text-slate-500">Use realistic values for viva walkthroughs.</p>
            </div>
            <div className="grid gap-3.5">
              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label className="text-sm font-semibold" htmlFor="percentile">MHT-CET percentile</label>
                  <input
                    id="percentile"
                    className="min-h-10 w-28 rounded-lg border border-slate-300 px-3 py-2 text-center text-sm font-bold text-blue-700 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    value={profile.percentile}
                    onChange={(event) => setProfile((current) => ({ ...current, percentile: event.target.value }))}
                  />
                </div>
                <input
                  className="w-full accent-blue-700"
                  type="range"
                  min="0"
                  max="100"
                  step="0.01"
                  value={profile.percentile}
                  onChange={(event) => setProfile((current) => ({ ...current, percentile: event.target.value }))}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold" htmlFor="category">Category</label>
                <select
                  id="category"
                  className="min-h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  value={profile.category}
                  onChange={(event) => setProfile((current) => ({ ...current, category: event.target.value }))}
                >
                  {categories.map((category) => <option key={category} value={category}>{category}</option>)}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold" htmlFor="district">Preferred district</label>
                <select
                  id="district"
                  className="min-h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  value={profile.home_district}
                  onChange={(event) => setProfile((current) => ({ ...current, home_district: event.target.value }))}
                >
                  {(districts.length ? districts : ['Pune']).map((district) => <option key={district} value={district}>{district}</option>)}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">Preferred branches</label>
                <div className="grid grid-cols-3 gap-2">
                  {branches.map((branch) => (
                    <button
                      key={branch.code}
                      type="button"
                      onClick={() => updateBranch(branch.code)}
                      className={`min-h-10 rounded-lg border text-sm font-semibold transition ${
                        profile.branch_preference.includes(branch.code)
                          ? 'border-blue-700 bg-blue-50 text-blue-700'
                          : 'border-slate-300 bg-white text-slate-700 hover:border-blue-300'
                      }`}
                    >
                      {branch.code}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label className="text-sm font-semibold" htmlFor="budget">Annual budget</label>
                  <span className="rounded-lg bg-blue-50 px-3 py-1 text-sm font-bold text-blue-700">{formatFee(profile.budget)}</span>
                </div>
                <input
                  id="budget"
                  className="w-full accent-blue-700"
                  type="range"
                  min="0"
                  max="250000"
                  step="5000"
                  value={profile.budget}
                  onChange={(event) => setProfile((current) => ({ ...current, budget: event.target.value }))}
                />
              </div>

              <div className="grid gap-2">
                <button disabled={loading.predict} className="min-h-10 rounded-lg bg-blue-700 px-5 py-3 text-sm font-bold text-white disabled:opacity-70" type="submit">
                  {loading.predict ? 'Predicting...' : 'Predict colleges'}
                </button>
                <button disabled={loading.report} onClick={generateReport} className="min-h-10 rounded-lg border border-blue-200 bg-white px-5 py-3 text-sm font-bold text-blue-700 disabled:opacity-70" type="button">
                  {loading.report ? 'Generating report...' : 'Generate counselling report'}
                </button>
              </div>
            </div>
          </form>

          <div className="grid gap-4">
            <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-col justify-between gap-2 border-b border-slate-200 px-5 py-4 sm:flex-row sm:items-center">
                <div>
                  <h3 className="text-base font-bold">Recommendation output</h3>
                  <p className="text-sm text-slate-500">Safe, Target, and Ambitious options returned by the API.</p>
                </div>
                <span className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600">
                  {prediction ? `${prediction.total_matches} matches for ${prediction.percentile} percentile` : 'Ready for input'}
                </span>
              </div>
              <div className="grid gap-3 p-4 lg:grid-cols-3">
                {prediction ? (
                  <>
                    <ResultColumn title="Safe" tone="safe" count={prediction.safe?.length || 0} items={prediction.safe || []} />
                    <ResultColumn title="Target" tone="target" count={prediction.target?.length || 0} items={prediction.target || []} />
                    <ResultColumn title="Ambitious" tone="ambitious" count={prediction.ambitious?.length || 0} items={prediction.ambitious || []} />
                  </>
                ) : (
                  <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-5 text-center text-slate-500 lg:col-span-3">
                    <p className="text-base font-bold text-slate-700">Run a prediction to view recommendations</p>
                    <p className="mt-2 text-sm">The browser displays results returned from the Python backend.</p>
                  </div>
                )}
              </div>
            </section>

            {reportData ? (
              <section id="report" className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 px-5 py-4">
                  <h3 className="text-base font-bold">Counselling report</h3>
                  <p className="text-sm text-slate-500">Structured summary for counselling discussion.</p>
                </div>
                <div className="grid gap-5 p-5 lg:grid-cols-[1fr_280px]">
                  <div>
                    <p className="text-sm leading-6 text-slate-700">{reportData.summary}</p>
                    <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
                      <div className="grid grid-cols-[44px_1fr_0.8fr_0.7fr] gap-3 bg-slate-50 px-3 py-2 text-xs font-bold uppercase tracking-wide text-slate-500">
                        <span>No.</span><span>College</span><span>Branch</span><span>Category</span>
                      </div>
                      {(reportData.recommended_colleges || []).slice(0, 6).map((item, index) => (
                        <div key={`${item.college_name}-${index}`} className="grid grid-cols-[44px_1fr_0.8fr_0.7fr] gap-3 border-t border-slate-200 px-3 py-3 text-sm">
                          <span className="font-semibold text-slate-500">{index + 1}</span>
                          <span className="font-semibold text-slate-900">{item.college_name}</span>
                          <span className="text-slate-600">{item.branch}</span>
                          <span className="font-semibold capitalize text-blue-700">{item.classification}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <aside className="rounded-lg border border-slate-200 p-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Summary</p>
                    <dl className="mt-3 grid gap-2 text-sm font-medium">
                      <div className="flex justify-between"><dt>Safe</dt><dd className="font-bold text-emerald-700">{reportData.counts?.safe || 0}</dd></div>
                      <div className="flex justify-between"><dt>Target</dt><dd className="font-bold text-amber-700">{reportData.counts?.target || 0}</dd></div>
                      <div className="flex justify-between"><dt>Ambitious</dt><dd className="font-bold text-rose-700">{reportData.counts?.ambitious || 0}</dd></div>
                      <div className="flex justify-between border-t border-slate-200 pt-2"><dt>Total matches</dt><dd className="font-bold">{reportData.counts?.total_matches || 0}</dd></div>
                    </dl>
                  </aside>
                </div>
              </section>
            ) : null}
          </div>
        </div>
      </section>

      <section id="colleges" className="mx-auto max-w-[1260px] px-4 py-8">
        <SectionHeading eyebrow="College Data" title="Search colleges" />
        <div className="mb-4 grid gap-3 rounded-lg border border-slate-200 bg-white p-3 md:grid-cols-2 lg:grid-cols-[1.2fr_0.75fr_0.75fr_0.75fr_auto]">
          <input className="min-h-10 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100" placeholder="Search college name or short name" value={collegeFilters.name} onChange={(event) => setCollegeFilters((current) => ({ ...current, name: event.target.value }))} />
          <select className="min-h-10 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm" value={collegeFilters.district} onChange={(event) => { const next = { ...collegeFilters, district: event.target.value }; setCollegeFilters(next); loadColleges(next) }}>
            <option value="">All districts</option>
            {districts.map((district) => <option key={district} value={district}>{district}</option>)}
          </select>
          <select className="min-h-10 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm" value={collegeFilters.branch} onChange={(event) => { const next = { ...collegeFilters, branch: event.target.value }; setCollegeFilters(next); loadColleges(next) }}>
            <option value="">All branches</option>
            {branches.map((branch) => <option key={branch.code} value={branch.code}>{branch.name}</option>)}
          </select>
          <select className="min-h-10 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm" value={collegeFilters.type} onChange={(event) => { const next = { ...collegeFilters, type: event.target.value }; setCollegeFilters(next); loadColleges(next) }}>
            <option value="">All types</option>
            <option value="Government">Government</option>
            <option value="Aided">Aided</option>
            <option value="Unaided">Unaided</option>
            <option value="Autonomous">Autonomous</option>
          </select>
          <button className="min-h-10 rounded-lg bg-slate-900 px-5 py-2 text-sm font-bold text-white" onClick={() => loadColleges()}>{loading.colleges ? 'Loading...' : 'Search'}</button>
        </div>
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="hidden bg-slate-50 px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500 md:grid md:grid-cols-[1.25fr_0.7fr_0.55fr_0.75fr] md:gap-4">
            <span>College</span><span>District</span><span>Type</span><span>Branches / fees</span>
          </div>
          {colleges.results?.length ? colleges.results.map((college) => {
            const minFee = (college.branches || []).map((branch) => branch.fees_per_year).filter((value) => value != null).sort((a, b) => a - b)[0]
            return (
              <article key={college.id} className="grid gap-2 border-t border-slate-200 px-4 py-3 md:grid-cols-[1.25fr_0.7fr_0.55fr_0.75fr] md:items-center md:gap-4">
                <div>
                  <h3 className="text-sm font-bold">{college.name}</h3>
                  <p className="mt-1 text-xs font-medium text-slate-500">{college.short_name || college.affiliated_to || 'Engineering college'}</p>
                </div>
                <span className="text-sm font-medium text-slate-700">{college.district || college.location}</span>
                <span className="text-sm font-medium text-slate-700">{college.college_type}</span>
                <span className="text-sm text-slate-600">
                  {(college.branches || []).slice(0, 4).map((branch) => branch.code).join(', ') || 'Branches NA'}
                  <span className="block text-xs font-semibold text-slate-500">{formatFee(minFee)}</span>
                </span>
              </article>
            )
          }) : (
            <div className="p-8 text-center text-sm text-slate-500">No colleges found.</div>
          )}
        </div>
      </section>

      <section id="analytics" className="border-y border-slate-200 bg-white py-8">
        <div className="mx-auto max-w-[1260px] px-4">
          <SectionHeading
            eyebrow="Analytics"
            title="Cutoff and distribution insights"
            description="Charts consume Python backend series responses with labels and values for cleaner reporting."
          />
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-4">
                <h3 className="text-base font-bold">District distribution</h3>
                <p className="text-sm text-slate-500">Total colleges by district</p>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analytics.district}>
                    <CartesianGrid strokeDasharray="3 3" stroke={chartGrid} />
                    <XAxis dataKey="label" tick={{ fontSize: 11, fill: chartText }} />
                    <YAxis tick={{ fontSize: 11, fill: chartText }} />
                    <Tooltip />
                    <Bar dataKey="value" fill={primaryBar} radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-4">
                <h3 className="text-base font-bold">Top branches</h3>
                <p className="text-sm text-slate-500">Average OPEN cutoff percentile, 2024</p>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analytics.branches}>
                    <CartesianGrid strokeDasharray="3 3" stroke={chartGrid} />
                    <XAxis dataKey="label" tick={{ fontSize: 11, fill: chartText }} />
                    <YAxis tick={{ fontSize: 11, fill: chartText }} />
                    <Tooltip />
                    <Bar dataKey="value" fill={secondaryBar} radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm lg:col-span-2">
              <div className="mb-4">
                <h3 className="text-base font-bold">Cutoff trend</h3>
                <p className="text-sm text-slate-500">{analytics.trendTitle}</p>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analytics.trend}>
                    <CartesianGrid strokeDasharray="3 3" stroke={chartGrid} />
                    <XAxis dataKey="label" tick={{ fontSize: 11, fill: chartText }} />
                    <YAxis domain={['dataMin - 0.5', 'dataMax + 0.5']} tick={{ fontSize: 11, fill: chartText }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke={primaryBar} strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="backend" className="mx-auto max-w-[1260px] px-4 py-8">
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-700">Technical Backend Work</p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight">Python services supporting counselling workflows</h2>
          </div>
          <div className="grid divide-y divide-slate-200 md:grid-cols-4 md:divide-x md:divide-y-0">
            {[
              ['FastAPI endpoints', 'Health, colleges, prediction, report generation, analytics, and ingestion routes.'],
              ['Data processing', 'CSV ingestion, field cleaning, branch normalization, and DB-ready structures.'],
              ['CAP logic', 'Colleges are grouped into Safe, Target, and Ambitious using cutoff gaps.'],
              ['Analytics layer', 'District distribution, branch averages, and cutoff trends return chart-ready data.'],
            ].map(([title, description]) => (
              <div key={title} className="p-5">
                <h3 className="font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
