import { NextResponse } from "next/server";
import { query } from "@/lib/db";

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

    const parsed = colleges.map((c) => ({
      ...c,
      branches: typeof c.branches === "string" ? JSON.parse(c.branches) : c.branches,
      highlights: typeof c.highlights === "string" ? JSON.parse(c.highlights) : c.highlights,
    }));

    return NextResponse.json({ colleges: parsed });
  } catch (err) {
    console.error("Colleges API error:", err);
    return NextResponse.json({ error: "Failed to fetch colleges" }, { status: 500 });
  }
}
