export default function BlogPostLoading() {
  return (
    <main className="min-h-screen bg-slate-950 pt-[130px]">
      <div className="mx-auto max-w-5xl animate-pulse px-6 py-16 lg:px-10">
        <div className="h-4 w-32 rounded-full bg-cyan-300/20" />
        <div className="mt-8 h-16 max-w-4xl rounded-2xl bg-white/10" />
        <div className="mt-6 h-6 w-64 rounded-full bg-white/10" />
        <div className="mt-12 aspect-[16/8] rounded-3xl bg-white/10" />
        <div className="mx-auto mt-12 max-w-3xl space-y-4">
          <div className="h-4 rounded-full bg-white/10" />
          <div className="h-4 rounded-full bg-white/10" />
          <div className="h-4 w-4/5 rounded-full bg-white/10" />
        </div>
      </div>
    </main>
  );
}
