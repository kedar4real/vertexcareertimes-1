import { NextResponse } from "next/server";
import crypto from "crypto";
import { query } from "@/lib/db";

export async function POST(req) {
  try {
    // PhonePe sends callback using form data
    const formData = await req.formData();
    const transactionId = formData.get("transactionId");
    const code = formData.get("code");
    const merchantId = formData.get("merchantId");

    const saltKey = process.env.PHONEPE_SALT_KEY;
    const saltIndex = process.env.PHONEPE_SALT_INDEX;
    const UAT_URL = process.env.PHONEPE_API_URL || "https://api.phonepe.com/apis/hermes";

    // Prepare status check URL
    const statusURL = `/pg/v1/status/${merchantId}/${transactionId}`;
    
    // Checksum for status check
    const checksumStr = statusURL + saltKey;
    const dataSha256 = crypto.createHash("sha256").update(checksumStr).digest("hex");
    const checksum = dataSha256 + "###" + saltIndex;

    const response = await fetch(`${UAT_URL}${statusURL}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
        "X-MERCHANT-ID": merchantId,
      },
    });

    const resData = await response.json();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    if (resData.success && resData.code === "PAYMENT_SUCCESS") {
      // Update DB
      await query(
        "UPDATE payments SET status = 'SUCCESS' WHERE transaction_id = ?",
        [transactionId]
      );
      
      // Redirect to success page
      return NextResponse.redirect(`${baseUrl}/payment-success?txn=${transactionId}`, { status: 302 });
    } else {
      // Update DB to failed
      await query(
        "UPDATE payments SET status = 'FAILED' WHERE transaction_id = ?",
        [transactionId]
      );
      
      return NextResponse.redirect(`${baseUrl}/payment-failure?txn=${transactionId}`, { status: 302 });
    }
  } catch (error) {
    console.error("Payment Status Error:", error);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    return NextResponse.redirect(`${baseUrl}/payment-failure`, { status: 302 });
  }
}
