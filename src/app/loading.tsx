export default function Loading() {
  return (
    <main className="min-h-screen bg-slate-950 px-5 py-24" aria-busy="true">
      <div className="mx-auto max-w-7xl animate-pulse space-y-8">
        <div className="h-12 w-48 rounded-xl bg-white/10" />
        <div className="h-80 rounded-3xl bg-white/10" />
        <div className="grid gap-6 md:grid-cols-3">
          {[0, 1, 2].map((item) => (
            <div key={item} className="h-56 rounded-3xl bg-white/10" />
          ))}
        </div>
      </div>
    </main>
  );
}
