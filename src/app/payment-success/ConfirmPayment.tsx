"use client";

import { useEffect } from "react";

/** Records the finished payment against its purchase; renders nothing. */
export default function ConfirmPayment() {
  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get("session_id");
    if (!sessionId) return;
    fetch("/api/checkout/confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId }),
    }).catch((error) => console.error("Unable to confirm payment", error));
  }, []);

  return null;
}
