import { NextResponse } from "next/server";
import { query } from "@/lib/db";

const FALLBACK_COLLEGES = [
  {
    id: "demo-coep",
    name: "COEP Technological University",
    location: "Pune",
    district: "Pune",
    type: "Government",
    rating: 4.8,
    branches: ["CSE", "AIML", "ENTC", "Mechanical", "Civil"],
    highlights: ["Strong placement reputation", "Historic institute", "Research focused"],
    established_year: 1854,
  },
  {
    id: "demo-vjti",
    name: "VJTI Mumbai",
    location: "Mumbai",
    district: "Mumbai",
    type: "Government",
    rating: 4.7,
    branches: ["CS", "IT", "Electronics", "Civil", "Mechanical"],
    highlights: ["Top recruiters visit", "Excellent infrastructure", "Industry connections"],
    established_year: 1887,
  },
  {
    id: "demo-pict",
    name: "PICT Pune",
    location: "Pune",
    district: "Pune",
    type: "Private (Autonomous)",
    rating: 4.7,
    branches: ["CSE", "IT", "ENTC"],
    highlights: ["Top CS college in Pune", "Strong coding culture", "High placement focus"],
    established_year: 1983,
  },
  {
    id: "demo-walchand",
    name: "Walchand College of Engineering",
    location: "Sangli",
    district: "Sangli",
    type: "Government",
    rating: 4.6,
    branches: ["CSE", "Mechanical", "Civil", "Electrical"],
    highlights: ["Historic government institute", "Good faculty", "Strong alumni network"],
    established_year: 1947,
  },
  {
    id: "demo-spit",
    name: "Sardar Patel Institute of Technology",
    location: "Mumbai",
    district: "Mumbai",
    type: "Private (Autonomous)",
    rating: 4.6,
    branches: ["CSE", "IT", "EXTC", "Electrical"],
    highlights: ["Reputed Mumbai institute", "Strong placements", "Active technical culture"],
    established_year: 1962,
  },
  {
    id: "demo-gcoea",
    name: "Government College of Engineering Amravati",
    location: "Amravati",
    district: "Amravati",
    type: "Government",
    rating: 4.3,
    branches: ["CSE", "Electrical", "Mechanical", "Civil"],
    highlights: ["Government aided", "Affordable fees", "Good academic reputation"],
    established_year: 1963,
  },
];

function safeJson(value, fallback = []) {
  if (Array.isArray(value)) return value;
  if (!value) return fallback;

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

function normalizeDbCollege(college) {
  return {
    ...college,
    branches: safeJson(college.branches),
    highlights: safeJson(college.highlights),
  };
}

function normalizePythonCollege(college) {
  const branches = Array.isArray(college.branches)
    ? college.branches.map((branch) => branch.code || branch.name).filter(Boolean)
    : [];

  return {
    id: college.id,
    name: college.name,
    location: college.location || college.district || "Maharashtra",
    district: college.district || college.location || "Maharashtra",
    type: college.college_type || college.type || "Engineering College",
    rating: 4.4,
    branches: branches.length ? branches : ["CS", "IT", "ENTC"],
    highlights: [
      college.affiliated_to || "CAP counselling data available",
      "Branch and cutoff data connected",
      "Useful for admission comparison",
    ],
    established_year: college.established_year || null,
  };
}

function filterColleges(colleges, { search, type, location, limit }) {
  const searchText = search.toLowerCase();

  return colleges
    .filter((college) => {
      const branchText = (college.branches || []).join(" ").toLowerCase();
      const matchesSearch =
        !searchText ||
        college.name?.toLowerCase().includes(searchText) ||
        college.location?.toLowerCase().includes(searchText) ||
        branchText.includes(searchText);

      const matchesType = !type || college.type === type;
      const matchesLocation = !location || college.location === location || college.district === location;

      return matchesSearch && matchesType && matchesLocation;
    })
    .sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0))
    .slice(0, limit);
}

async function fetchPythonColleges({ search, type, location, limit }) {
  const baseUrl = process.env.PYTHON_API_BASE || process.env.NEXT_PUBLIC_PYTHON_API_BASE;
  if (!baseUrl) return [];

  const params = new URLSearchParams({ page: "1", page_size: String(Math.max(limit, 12)) });
  if (search) params.set("name", search);
  if (type) params.set("college_type", type);
  if (location) params.set("district", location);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 1500);

  try {
    const response = await fetch(`${baseUrl}/colleges?${params.toString()}`, {
      signal: controller.signal,
      cache: "no-store",
    });

    if (!response.ok) return [];

    const data = await response.json();
    return (data.results || []).map(normalizePythonCollege);
  } finally {
    clearTimeout(timeout);
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search")?.trim() || "";
  const type = searchParams.get("type")?.trim() || "";
  const location = searchParams.get("location")?.trim() || "";
  const limit = Math.min(parseInt(searchParams.get("limit") || "6"), 50);

  const conditions = [];
  const values = [];

  if (search) {
    conditions.push("(name LIKE ? OR location LIKE ? OR branches LIKE ?)");
    values.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }
  if (type) {
    conditions.push("type = ?");
    values.push(type);
  }
  if (location) {
    conditions.push("location = ?");
    values.push(location);
  }

  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  values.push(limit);

  try {
    const colleges = await query(
      `SELECT id, name, location, district, type, rating, branches, highlights, established_year
       FROM colleges ${where} ORDER BY rating DESC LIMIT ?`,
      values
    );

    const parsed = colleges.map(normalizeDbCollege);

    if (parsed.length) {
      return NextResponse.json({ colleges: parsed, source: "mysql" });
    }
  } catch (err) {
    console.warn("Colleges API database fallback:", err.message);
  }

  try {
    const pythonColleges = await fetchPythonColleges({ search, type, location, limit });
    if (pythonColleges.length) {
      return NextResponse.json({
        colleges: filterColleges(pythonColleges, { search, type, location, limit }),
        source: "python",
      });
    }
  } catch (err) {
    console.warn("Colleges API Python fallback:", err.message);
  }

  return NextResponse.json({
    colleges: filterColleges(FALLBACK_COLLEGES, { search, type, location, limit }),
    source: "fallback",
  });
}
