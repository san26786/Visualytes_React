"use client";

import { Mail, Phone, Tag, User, MessageSquare } from "lucide-react";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { motion, type BezierDefinition } from "framer-motion";

const EASE: BezierDefinition = [0.22, 1, 0.36, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: {
    duration: 0.6,
    delay,
    ease: EASE,
  },
});

const inputClass =
  "h-[62px] w-full rounded-2xl border border-white/10 bg-slate-900 px-5 text-[14px] text-white placeholder:text-slate-500 transition-all duration-200 focus:border-cyan-400/60 focus:bg-slate-800/90 focus:outline-none focus:ring-2 focus:ring-cyan-400/20";

export default function ContactForm() {
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "",
    message: "",
  });

  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!captchaToken) {
      alert("Please verify that you are not a robot.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          captchaToken,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Message sent successfully!");

        setForm({
          name: "",
          email: "",
          phone: "",
          topic: "",
          message: "",
        });

        setCaptchaToken(null);
        recaptchaRef.current?.reset();
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative bg-transparent py-12 lg:py-20">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10">

        <motion.div
          className="mb-14 text-center"
          {...fadeUp(0)}
        >
          <span className="inline-block rounded-full border border-cyan-300/30 bg-cyan-300/10 px-5 py-1.5 text-[11px] font-bold uppercase tracking-[0.3em] text-cyan-300">
            We Read Every Message
          </span>

          <h2 className="mt-5 text-[38px] font-bold text-white sm:text-[46px]">
            Send Your{" "}
            <span className="bg-gradient-to-r from-fuchsia-300 to-pink-400 bg-clip-text text-transparent">
              Message
            </span>
          </h2>
        </motion.div>


        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            ease: EASE,
          }}
        >

          <div className="pointer-events-none absolute -inset-px rounded-[2.25rem] bg-gradient-to-br from-cyan-400/30 via-fuchsia-500/20 to-pink-500/30 blur-sm" />

          <div className="pointer-events-none absolute -inset-[3px] rounded-[2.35rem] bg-gradient-to-br from-cyan-400/15 via-transparent to-pink-400/15 blur-md" />


          <form
            onSubmit={handleSubmit}
            className="relative z-10 space-y-5 rounded-[2.25rem] border border-white/10 bg-slate-950/95 p-6 shadow-[0_40px_100px_rgba(0,0,0,0.6)] backdrop-blur-xl md:p-10 lg:p-14"
          >

            <div className="pointer-events-none absolute left-0 top-0 h-60 w-60 rounded-full bg-cyan-400/8 blur-3xl" />

            <div className="pointer-events-none absolute bottom-0 right-0 h-60 w-60 rounded-full bg-fuchsia-500/8 blur-3xl" />


            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

              <div className="relative">
                <User
                  size={15}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  className={`${inputClass} pl-11`}
                  required
                />
              </div>


              <div className="relative">
                <Mail
                  size={15}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  className={`${inputClass} pl-11`}
                  required
                />
              </div>

            </div>


            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

              <div className="relative">
                <Phone
                  size={15}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={handleChange}
                  className={`${inputClass} pl-11`}
                />
              </div>


              <div className="relative">
                <Tag
                  size={15}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type="text"
                  name="topic"
                  placeholder="Your Topic"
                  value={form.topic}
                  onChange={handleChange}
                  className={`${inputClass} pl-11`}
                />
              </div>

            </div>


            <div className="relative">
              <MessageSquare
                size={15}
                className="absolute left-5 top-5 text-slate-500"
              />

              <textarea
                rows={6}
                name="message"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                className="w-full resize-none rounded-2xl border border-white/10 bg-slate-900 py-5 pl-11 pr-5 text-[14px] text-white placeholder:text-slate-500 transition-all duration-200 focus:border-cyan-400/60 focus:bg-slate-800/90 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                required
              />
            </div>


            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />


            <div className="flex flex-col items-center justify-between gap-8 pt-2 lg:flex-row">

              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                onChange={(token) => setCaptchaToken(token)}
                theme="dark"
              />


              <div className="flex gap-4">

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative overflow-hidden rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 px-10 py-4 font-bold text-white shadow-lg shadow-fuchsia-500/30 transition-all duration-300 hover:shadow-fuchsia-500/50 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <span className="relative z-10">
                    {loading ? "Sending…" : "Send Message"}
                  </span>

                  <span className="absolute inset-0 -translate-x-full animate-[shimmer_2.4s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                </motion.button>


                <motion.button
                  type="reset"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setForm({
                      name: "",
                      email: "",
                      phone: "",
                      topic: "",
                      message: "",
                    });

                    setCaptchaToken(null);
                    recaptchaRef.current?.reset();
                  }}
                  className="rounded-full border border-cyan-400/50 bg-transparent px-10 py-4 font-bold text-cyan-300 transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-400 hover:text-slate-950"
                >
                  Clear
                </motion.button>

              </div>

            </div>

          </form>

        </motion.div>

      </div>
    </section>
  );
}