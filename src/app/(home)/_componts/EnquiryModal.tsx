"use client";

import { useRef, useState } from "react";
import { X } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import toast from "react-hot-toast";

const SERVICES = [
  "Web Development",
  "Bespoke Software Development",
  "Digital Marketing",
  "Mobile Apps",
  "Corporate Branding",
  "Quality Assurance",
  "Hosting Services",
  "Maintenance & Support",
  "Other",
];

const inputClass =
  "w-full rounded-md border-0 bg-gray-100 px-4 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-pink-400";

export default function EnquiryModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", message: "" });

  if (!open) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const resetForm = () => {
    setForm({ name: "", phone: "", email: "", service: "", message: "" });
    setCaptchaToken(null);
    recaptchaRef.current?.reset();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!captchaToken) {
      toast.error("Please verify that you are not a robot.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, captchaToken }),
      });
      const data = await res.json();

      if (data.success) {
        toast.success("Thanks! Your enquiry has been sent — check your inbox for confirmation.");
        resetForm();
        onClose();
      } else {
        toast.error(data.message || "Failed to send enquiry.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[680px] overflow-hidden rounded-lg bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-[#F0396A] px-8 py-6 text-center">
          <h2 className="text-2xl font-bold uppercase tracking-wide text-white sm:text-3xl">
            Enquiry Form
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="space-y-5 p-6 sm:p-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className={inputClass}
              required
            />
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className={inputClass}
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              className={inputClass}
              required
            />
            <select
              name="service"
              value={form.service}
              onChange={handleChange}
              className={`${inputClass} appearance-none bg-[length:14px] bg-[right_1rem_center] bg-no-repeat`}
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
              }}
              required
            >
              <option value="" disabled>
                Select Services
              </option>
              {SERVICES.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Enquiry Details"
            rows={4}
            className={`${inputClass} resize-none`}
            required
          />

          <div className="flex flex-col items-center gap-6 pt-2">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
              onChange={(token) => setCaptchaToken(token)}
            />

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center rounded-full bg-[#F0396A] px-10 py-4 text-xs font-bold uppercase tracking-[2px] text-white transition-all hover:bg-[#d92e5c] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Sending…" : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
