"use client";

import { motion } from "framer-motion";
import { XCircle, RotateCcw, Home } from "lucide-react";
import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-orange-100 px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 text-center border border-red-100"
      >

        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            delay: 0.2,
          }}
          className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-100"
        >
          <XCircle
            size={55}
            className="text-red-600"
          />
        </motion.div>


        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Payment Cancelled
        </h1>


        <p className="text-gray-600 leading-relaxed mb-8">
          Your payment was cancelled or interrupted. No charges have been made.
          You can try again whenever you are ready.
        </p>


        <div className="space-y-4">

          <Link
            href="/packages"
            className="flex items-center justify-center gap-2 w-full rounded-xl bg-black text-white py-4 font-semibold hover:bg-gray-800 transition"
          >
            <RotateCcw size={18}/>
            Try Payment Again
          </Link>


          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full rounded-xl border border-gray-200 py-4 font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            <Home size={18}/>
            Back To Home
          </Link>

        </div>


      </motion.div>
    </main>
  );
}