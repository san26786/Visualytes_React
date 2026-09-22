"use client";

import { BrandPageBackdrop } from "@/src/common/components/ui/brand/page-effects";
import { motion } from "framer-motion";
import { CheckCircle2, Home } from "lucide-react";
import Link from "next/link";
import ConfirmPayment from "./ConfirmPayment";

export default function PaymentSuccessPage() {
  return (
     <main className="relative overflow-hidden  min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-100 px-6">
          <BrandPageBackdrop />
      <ConfirmPayment />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 text-center border border-green-100"
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
          className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100"
        >
          <CheckCircle2
            size={55}
            className="text-green-600"
          />
        </motion.div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Payment Successful!
        </h1>

        <p className="text-gray-600 leading-relaxed mb-8">
          Thank you for your payment. Your transaction has been completed
          successfully and your order is being processed.
        </p>

        <div className="space-y-4">

          {/* <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full rounded-xl bg-black text-white py-4 font-semibold hover:bg-gray-800 transition"
          >
            Continue Shopping
            <ArrowRight size={18} />
          </Link> */}

          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full rounded-xl border border-gray-200 py-4 font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            <Home size={18} />
            Go Home
          </Link>

        </div>

      </motion.div>
    </main>
  );
}