"use client";

import { Mail } from "lucide-react";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

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
    <section className="bg-white py-10 lg:py-20">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
        <div className="mb-10 text-center">
          <h2 className="text-[36px] font-medium text-[#232b39] ">
            Send Your Message
          </h2>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <input
              type="text"
              name="name"
              placeholder="FULL NAME"
              value={form.name}
              onChange={handleChange}
              className="h-[72px] w-full bg-[#f6f5f5] px-8 text-[13px] placeholder:text-[#8b8b8b] focus:outline-none"
              required
            />

            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="EMAIL ADDRESS"
                value={form.email}
                onChange={handleChange}
                className="h-[72px] w-full bg-[#f6f5f5] px-8 pr-16 text-[13px] placeholder:text-[#8b8b8b] focus:outline-none"
                required
              />

              <Mail
                size={18}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-[#27c7b8]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <input
              type="tel"
              name="phone"
              placeholder="PHONE NUMBER"
              value={form.phone}
              onChange={handleChange}
              className="h-[72px] w-full bg-[#f6f5f5] px-8 text-[13px] placeholder:text-[#8b8b8b] focus:outline-none"
            />

            <input
              type="text"
              name="topic"
              placeholder="YOUR TOPIC"
              value={form.topic}
              onChange={handleChange}
              className="h-[72px] w-full bg-[#f6f5f5] px-8 text-[13px] placeholder:text-[#8b8b8b] focus:outline-none"
            />
          </div>

          <textarea
            rows={6}
            name="message"
            placeholder="YOUR MESSAGE"
            value={form.message}
            onChange={handleChange}
            className="w-full resize-none bg-[#f6f5f5] px-8 py-6 text-[13px] placeholder:text-[#8b8b8b] focus:outline-none"
            required
          />

          <div className="flex flex-col items-center justify-between gap-10 pt-10 lg:flex-row">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
              onChange={(token: string | null) => {
                setCaptchaToken(token);
              }}
            />

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="rounded-full bg-[#ff4778] px-10 py-5 font-bold text-white hover:bg-[#232b39]"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

              <button
                type="reset"
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
                className="rounded-full border-2 border-[#ff4778] px-10 py-5 font-bold text-[#ff4778] hover:bg-[#ff4778] hover:text-white"
              >
                Clear
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}