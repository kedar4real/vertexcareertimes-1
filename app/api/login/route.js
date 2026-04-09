import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { verifyPassword, generateToken, verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const { mobile, password } = await req.json();
    if (!mobile || !password) {
      return NextResponse.json({ error: "Mobile and password required" }, { status: 400 });
    }

    const users = await query("SELECT * FROM students WHERE mobile = ?", [mobile]);
    if (users.length === 0) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const user = users[0];
    const isMatch = await verifyPassword(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = generateToken({ id: user.id, name: user.name, mobile: user.mobile });

    const cookieStore = await cookies();
    cookieStore.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, 
      path: "/",
    });

    return NextResponse.json({ success: true, user: { name: user.name, mobile: user.mobile } });
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;
    
    if (!token) return NextResponse.json({ authenticated: false }, { status: 401 });
    
    const valid = verifyToken(token);
    if (!valid) return NextResponse.json({ authenticated: false }, { status: 401 });
    
    return NextResponse.json({ authenticated: true, user: valid });
}
