"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from 'react';

function FailureContent() {
  const searchParams = useSearchParams();
  const txn = searchParams.get("txn");

  return (
    <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-100 max-w-lg w-full text-center">
      <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Payment Failed</h1>
      <p className="text-lg text-gray-600 mb-2">We could not process your transaction at this time.</p>
      {txn && (
        <div className="bg-gray-50 rounded-lg p-3 mb-8 inline-block w-full">
          <p className="text-sm text-gray-500 font-medium">Transaction ID</p>
          <p className="text-sm font-mono text-gray-800 break-all">{txn}</p>
        </div>
      )}
      <p className="text-gray-500 text-sm mb-8">Please try again, or contact our support team on WhatsApp if the amount was deducted.</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link 
          href="/#pricing"
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition duration-200"
        >
          Try Again
        </Link>
        <a 
          href="https://wa.me/917588186264"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl transition duration-200"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
}

export default function PaymentFailure() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Suspense fallback={<div className="p-8 text-center bg-white rounded-xl shadow">Loading status...</div>}>
         <FailureContent />
      </Suspense>
    </div>
  );
}
