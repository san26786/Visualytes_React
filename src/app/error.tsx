"use client";

import { useEffect } from "react";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="grid min-h-screen place-items-center bg-slate-950 px-5 text-center text-white">
      <div className="max-w-md">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
          Something went wrong
        </p>
        <h1 className="mt-4 text-3xl font-bold">Please try loading this page again.</h1>
        <button
          type="button"
          onClick={reset}
          className="mt-8 rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
