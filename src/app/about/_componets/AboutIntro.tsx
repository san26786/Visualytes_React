import Link from "next/link";

export default function AboutIntro() {
  return (
    <section className="relative mt-[130px] overflow-hidden px-6 pb-8 pt-16 lg:px-10 lg:pt-20">
      <div className="pointer-events-none absolute left-8 top-0 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="pointer-events-none absolute right-8 top-24 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />

      <div className="mx-auto max-w-7xl">
        <ol className="mb-6 flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em]">
          <li>
            <Link href="/" className="text-cyan-300 transition-colors hover:text-white">
              Home
            </Link>
          </li>
          <li className="text-white/30">●</li>
          <li className="text-white/60">About Us</li>
        </ol>

        <div className="text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300">
            Your Visualisation Is Our Reality
          </p>
          <h1 className="text-4xl font-bold text-white sm:text-6xl">
            About{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-pink-400 bg-clip-text text-transparent">
              Visualytes
            </span>
          </h1>
          <div className="mx-auto mt-6 max-w-5xl rounded-[2rem] border border-white/10 bg-white/5 px-6 py-8 text-center backdrop-blur-md">
            <h2 className="text-2xl font-semibold text-white sm:text-4xl">
              Our Brand Statement
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-200 sm:text-2xl">
              Visualytes brings perfection, high quality deliveries and premium
              level service to web-apps, computer software and digital marketing
              while helping clients to fulfill all their IT needs under one roof.
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-10">
          <div className="mb-8 flex justify-center">
            <div className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-8 py-3">
              <h3 className="text-2xl font-semibold text-cyan-200 sm:text-4xl">
                Welcome Message From Our MD
              </h3>
            </div>
          </div>

          <div className="space-y-5 text-[18px] leading-9 text-slate-300">
            <p>
              Welcome to Visualytes. We are a group of highly dynamic, creative
              and talented skill set of people, who are one hundred percent ready
              to go that extra mile in order to create premium value for our
              clients. It’s this skill set of creativity that make Visualytes so
              great and one of the top reasons our clients choose to work with us
              on their required projects. This is the foundation on which our
              successful and innovative reputation is based.
            </p>

            <p>
              We have created Visualytes to reinvent existing business models and
              industry standards, developing first-class solutions for our
              clients, partners, employees, and shareholders. Today we are proud
              to say that we have surpassed this optimistic goal in so many areas
              with optimal effectiveness.
            </p>

            <p>
              When we say we are your partner for total technical care, we mean
              it! With many years of experience and expertise, we are one of the
              industry leaders in integrated IT solutions, which are not only the
              backbone of our business but also the trigger of our growth into new
              innovation and strategic expansion. Owing to such forward thinking
              mindset, we have confidently marched towards new market and service
              growth areas and successfully positioned ourselves in both software
              solution and whole lifecycle of software development. We are your
              one-stop shop for all your IT needs. Our client growth and
              satisfaction has resulted in us globalizing and differentiating
              ourselves from competitors in a very short time.
            </p>

            <p>
              Please feel free to explore our website, learn more about us and
              what we do.
            </p>

            <p>We very much look forward to working with you.</p>

            <div className="pt-4">
              <p className="text-slate-400">Sincerely,</p>
              <p className="mt-5 text-xl font-bold text-white">Nagendra Mishra</p>
              <p className="text-slate-300">Managing Director</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}