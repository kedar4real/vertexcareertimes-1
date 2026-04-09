import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { hashPassword } from "@/lib/auth";

export async function POST(req) {
  try {
    const { mobile, dob, newPassword } = await req.json();
    
    if (!mobile || !dob || !newPassword) {
      return NextResponse.json({ error: "Mobile, DOB, and new password are required" }, { status: 400 });
    }

    const users = await query("SELECT id FROM students WHERE mobile = ? AND dob = ?", [mobile, dob]);
    if (users.length === 0) {
      return NextResponse.json({ error: "Invalid mobile or DOB" }, { status: 401 });
    }

    const hashed = await hashPassword(newPassword);
    await query("UPDATE students SET password = ? WHERE mobile = ?", [hashed, mobile]);

    return NextResponse.json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
