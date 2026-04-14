"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from 'react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const txn = searchParams.get("txn");

  return (
    <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-100 max-w-lg w-full text-center">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Payment Successful!</h1>
      <p className="text-lg text-gray-600 mb-2">Thank you for enrolling in our counselling program.</p>
      {txn && (
        <div className="bg-gray-50 rounded-lg p-4 mb-8 inline-block w-full">
          <p className="text-sm text-gray-500 font-medium">Transaction ID</p>
          <p className="text-sm font-mono text-gray-800 break-all">{txn}</p>
        </div>
      )}
      <p className="text-gray-500 text-sm mb-8">Our expert counsellor will contact you shortly on your registered mobile number to proceed.</p>
      <Link 
        href="/"
        className="inline-block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl transition duration-200"
      >
        Return to Home
      </Link>
    </div>
  );
}

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Suspense fallback={<div className="p-8 text-center bg-white rounded-xl shadow">Loading status...</div>}>
         <SuccessContent />
      </Suspense>
    </div>
  );
}
