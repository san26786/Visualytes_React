"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Upload, ArrowUpRight } from "lucide-react";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import BrandSubPageShell from "@/src/common/components/ui/brand/BrandSubPageShell";
import {
  BRAND_MOTION,
  BRAND_SURFACE,
  BRAND_TEXT,
} from "@/src/common/components/ui/brand/theme";

const jobs = [
  {
    icon: "/assets/png/info_icon_1.png",
    title: "Lead Developer",
    desc: "A passionate leader and team player",
  },
  {
    icon: "/assets/png/info_icon_2.png",
    title: "Mobile Developer",
    desc: "Self-motivated with a strong sense of ownership",
  },
  {
    icon: "/assets/png/info_icon_3.png",
    title: "Team Leader",
    desc: "A QA Team leader with at least 5 years' experience",
  },
  {
    icon: "/assets/png/info_icon_4.png",
    title: "Product Designer",
    desc: "Designer with 3 years' experience in UX",
  },
  {
    icon: "/assets/png/info_icon_5.png",
    title: "Head of Marketing",
    desc: "Close-to-numbers individual with a passion for products",
  },
  {
    icon: "/assets/png/info_icon_6.png",
    title: "Office Manager",
    desc: "A service-oriented go-getter with 3+ years' experience",
  },
];

const accents = [
  "group-hover:border-cyan-300/40",
  "group-hover:border-fuchsia-300/40",
  "group-hover:border-violet-300/40",
  "group-hover:border-emerald-300/40",
  "group-hover:border-orange-300/40",
  "group-hover:border-pink-300/40",
];

const inputClass =
  "h-14 w-full rounded-2xl border border-white/10 bg-slate-900/60 px-5 text-sm text-white placeholder:text-slate-500 outline-none transition-colors focus:border-cyan-300/40 sm:h-16 sm:px-6";

export default function CareersPage() {
  const [resume, setResume] = useState<File | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string>("");
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    designation: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const resetForm = () => {
    setForm({ name: "", email: "", designation: "", message: "" });
    setResume(null);
    if (fileRef.current) fileRef.current.value = "";
    setCaptchaToken("");
    recaptchaRef.current?.reset();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!captchaToken) {
      setFeedback({ type: "error", message: "Please verify reCAPTCHA." });
      return;
    }
    if (!resume) {
      setFeedback({ type: "error", message: "Please upload your resume." });
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("designation", form.designation);
      formData.append("message", form.message);
      formData.append("captchaToken", captchaToken);
      formData.append("resume", resume);

      const res = await fetch("/api/careers", { method: "POST", body: formData });
      const data = await res.json();

      setFeedback({
        type: data.success ? "success" : "error",
        message: data.message,
      });

      if (data.success) resetForm();
    } catch {
      setFeedback({ type: "error", message: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <BrandSubPageShell
      title="Careers"
      eyebrow="Join Our Team"
      subtitle="Build meaningful digital products with a passionate team. Submit your application and we'll be in touch when a role opens up."
    >
      <section className="px-4 pb-12 pt-4">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job, index) => (
              <motion.div
                key={job.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
                className={`group flex flex-col items-center px-6 py-10 text-center ${BRAND_SURFACE.glassCard} ${accents[index % accents.length]} ${BRAND_MOTION.softTransition} hover:-translate-y-2`}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-slate-900/60">
                  <Image
                    src={job.icon}
                    alt={job.title}
                    width={40}
                    height={40}
                    className="object-contain brightness-0 invert opacity-80 transition-all duration-300 group-hover:opacity-100 group-hover:brightness-100 group-hover:invert-0"
                  />
                </div>
                <h3 className={`mt-5 ${BRAND_TEXT.cardTitle}`}>{job.title}</h3>
                <p className={`mt-2 max-w-7xl ${BRAND_TEXT.cardBody}`}>{job.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-24 pt-4">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 overflow-hidden rounded-2xl border border-fuchsia-300/20 bg-fuchsia-300/5">
            <div className="animate-marquee whitespace-nowrap py-3 text-center text-sm font-medium text-fuchsia-200">
              Currently we do not have any vacancies. Please fill out the form below — we&apos;ll update you when roles become available.
            </div>
          </div>

          <div className={`p-6 sm:p-10 ${BRAND_SURFACE.sectionWrap}`}>
            <div className="mb-8 text-center">
              <h2 className={BRAND_TEXT.sectionTitle}>Apply Now</h2>
              <p className={`mt-3 ${BRAND_TEXT.sectionBody}`}>
                Share your details and we&apos;ll keep your profile on file for future opportunities.
              </p>
            </div>

            {feedback && (
              <div
                className={`mb-6 rounded-2xl border px-5 py-4 text-sm ${
                  feedback.type === "success"
                    ? "border-emerald-300/30 bg-emerald-300/10 text-emerald-200"
                    : "border-red-300/30 bg-red-300/10 text-red-200"
                }`}
              >
                {feedback.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 lg:grid-cols-2">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className={inputClass}
                  required
                />
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className={`${inputClass} pr-12`}
                    required
                  />
                  <Mail
                    size={18}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-cyan-300"
                  />
                </div>
              </div>

              <div className="grid gap-5 lg:grid-cols-2">
                <div>
                  <input
                    list="designations"
                    name="designation"
                    value={form.designation}
                    onChange={handleChange}
                    placeholder="Preferred Role"
                    className={inputClass}
                    required
                  />
                  <datalist id="designations">
                    {jobs.map((job) => (
                      <option key={job.title} value={job.title} />
                    ))}
                  </datalist>
                </div>

                <div className={`flex h-14 items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/60 px-5 sm:h-16 sm:px-6 ${BRAND_MOTION.softTransition} focus-within:border-cyan-300/40`}>
                  <Upload size={18} className="shrink-0 text-cyan-300" />
                  <input
                    ref={fileRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setResume(e.target.files?.[0] || null)}
                    className="w-full cursor-pointer text-sm text-slate-400 file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-cyan-300/15 file:px-4 file:py-2 file:text-xs file:font-semibold file:uppercase file:tracking-wider file:text-cyan-300 hover:file:bg-cyan-300/25"
                    required
                  />
                </div>
              </div>

              <textarea
                rows={5}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us about yourself..."
                className={`${inputClass} resize-none py-4`}
                required
              />

              <div className="flex flex-col items-center justify-between gap-6 pt-4 lg:flex-row">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                  onChange={(token) => setCaptchaToken(token || "")}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-300/10 px-10 py-4 text-xs font-bold uppercase tracking-[0.25em] text-cyan-300 transition-all hover:border-cyan-300 hover:bg-cyan-300 hover:text-slate-950 disabled:opacity-50"
                >
                  {loading ? "Submitting..." : "Submit Application"}
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </BrandSubPageShell>
  );
}
