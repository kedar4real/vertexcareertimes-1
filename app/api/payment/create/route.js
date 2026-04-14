import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req) {
  try {
    const { plan, amount, mobile } = await req.json();

    if (!plan || !amount || !mobile) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const merchantId = process.env.PHONEPE_MERCHANT_ID;
    const saltKey = process.env.PHONEPE_SALT_KEY;
    const saltIndex = process.env.PHONEPE_SALT_INDEX;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const transactionId = `TXN_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    const payload = {
      merchantId: merchantId,
      merchantTransactionId: transactionId,
      merchantUserId: `MUID_${mobile}`,
      amount: parseInt(amount) * 100, // Amount in paise
      redirectUrl: `${baseUrl}/api/payment/status`,
      redirectMode: "POST",
      callbackUrl: `${baseUrl}/api/payment/status`,
      mobileNumber: mobile,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
      // Pass plan info in custom fields or note so we can save it later?
      // Actually we will save to the DB as PENDING right now.
    };

    // Save PENDING transaction to DB
    const { query } = require('@/lib/db');
    await query(
      "CREATE TABLE IF NOT EXISTS payments (id INT AUTO_INCREMENT PRIMARY KEY, user_mobile VARCHAR(15) NOT NULL, plan VARCHAR(100) NOT NULL, amount DECIMAL(10, 2) NOT NULL, transaction_id VARCHAR(100) UNIQUE NOT NULL, status VARCHAR(20) DEFAULT 'PENDING', created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)"
    );
    await query(
      "INSERT INTO payments (user_mobile, plan, amount, transaction_id, status) VALUES (?, ?, ?, ?, 'PENDING')",
      [mobile, plan, amount, transactionId]
    );

    const dataBase64 = Buffer.from(JSON.stringify(payload)).toString("base64");
    const fullURL = dataBase64 + "/pg/v1/pay" + saltKey;
    const dataSha256 = crypto.createHash("sha256").update(fullURL).digest("hex");
    const checksum = dataSha256 + "###" + saltIndex;

    const UAT_URL = process.env.PHONEPE_API_URL || "https://api.phonepe.com/apis/hermes";

    const response = await fetch(`${UAT_URL}/pg/v1/pay`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
      },
      body: JSON.stringify({ request: dataBase64 }),
    });

    const resData = await response.json();

    if (resData.success) {
      const redirectUrl = resData.data.instrumentResponse.redirectInfo.url;
      return NextResponse.json({ url: redirectUrl }, { status: 200 });
    } else {
      console.error("PhonePe API Error:", resData);
      return NextResponse.json({ error: "Failed to initiate payment" }, { status: 400 });
    }
  } catch (error) {
    console.error("Payment Create Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
