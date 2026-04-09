import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { hashPassword } from "@/lib/auth";

export async function POST(req) {
  try {
    const { name, dob, district, category, mobile, password } = await req.json();

    if (!name || !dob || !district || !category || !mobile || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const existingUser = await query("SELECT id FROM students WHERE mobile = ?", [mobile]);
    if (existingUser.length > 0) {
      return NextResponse.json({ error: "Mobile number already registered" }, { status: 409 });
    }

    const hashed = await hashPassword(password);
    await query(
      "INSERT INTO students (name, dob, district, category, mobile, password) VALUES (?, ?, ?, ?, ?, ?)",
      [name, dob, district, category, mobile, hashed]
    );

    return NextResponse.json({ success: true, message: "Registration successful" }, { status: 201 });
  } catch (error) {
    console.error("Register Error:", error);
    if (error.code === 'ER_ACCESS_DENIED_ERROR' || error.code === 'ECONNREFUSED') {
      return NextResponse.json({ error: "Local database not running or credentials invalid" }, { status: 500 });
    }
    if (error.code === 'ER_BAD_DB_ERROR') {
      return NextResponse.json({ error: "Database 'vertex_db' does not exist. Please run SETUP.sql" }, { status: 500 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
