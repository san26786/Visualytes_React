"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
// import BusinessContact, {
//   BusinessContactData,
// } from "../BusinessContact";
import Image from "next/image";
import BusinessInfo from "../BusinessInfo";

export default function LoginCard() {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const [step, setStep] = useState(1);


  
  const steps = [
    "Business Contact Details",
    "About Business",
    "Package",
    "Competitor",
    "Website Access Details",
    "Google Account Details",
    "Social Media",
  ];


  const handleLogin = async () => {
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = (await response.json()) as {
        message?: string;
        role?: "ADMIN" | "EDITOR";
      };

      if (!response.ok || !result.role) {
        setError(result.message ?? "Unable to sign in. Please try again.");
        return;
      }

      if (result.role === "ADMIN") {
        router.push("/admin-dashboard");
        return;
      }

      setStep(2);
    } catch {
      setError("Unable to sign in. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const [formData, setFormData] = useState<Record<string,string>>({
    businessName: "",
    contactPerson: "",
    mobileNumber: "",
    businessPhone: "",
    websiteUrl: "",
    businessEmail: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "United Kingdom",
    businessSector: "",
    description: "",
    businessCategories: "",
    servicesProducts: "",
  });
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6 py-10">
     <div
  className={`grid w-full overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.12)]
  ${
    step === 1
    ? "max-w-7xl lg:grid-cols-2"
    : "max-w-7xl lg:grid-cols-1"
  }`}
>

        {/* LEFT */}
        <div
  className={`z-10 ${
    step === 1
      ? "p-8 sm:p-12 lg:p-16"
      : "p-8 sm:p-10 lg:p-14"
  }`}
>

          {/* Logo */}
          <div className="mb-10 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-pink-500 text-xl font-bold text-white">
              V
            </div>

            <div>
              <h2 className="font-semibold text-slate-900">
                Visualytes
              </h2>
              <p className="text-sm text-slate-500">
                SEO Questionnaire
              </p>
            </div>
            {/* <BusinessInfo 
            formData={formData} 
            setFormData={setFormData}/> */}

          </div>

          {step === 1 && (
            <>
              <div className="mb-8">
                <h1 className="text-4xl font-bold tracking-tight text-slate-900">
                  Welcome Back 👋
                </h1>

                <p className="mt-3 text-slate-500">
                  Sign in to continue your SEO questionnaire.
                </p>
              </div>

              {/* Email */}
              <div className="mb-5">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Email Address
                </label>

                <div className="flex h-14 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-5 focus-within:border-violet-500">
                  <Mail size={20} className="text-slate-400" />

                  <input
                    type="email"
                    placeholder="hello@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent outline-none"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="mb-5">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Password
                </label>

                <div className="flex h-14 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-5">
                  <Lock size={20} className="text-slate-400" />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent outline-none"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember */}
              <div className="mb-8 flex justify-between">
                <label className="flex gap-2 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    className="accent-violet-600"
                  />
                  Remember me
                </label>

                <Link
                  href="#"
                  className="text-sm text-violet-600"
                >
                  Forgot password?
                </Link>
              </div>

              {error && (
                <p className="mb-4 text-center text-red-500">
                  {error}
                </p>
              )}

              <button
                onClick={handleLogin}
                disabled={isSubmitting}
                className="flex h-14 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-violet-600 to-pink-500 font-semibold text-white shadow-lg transition hover:scale-[1.02]"
              >
                Continue →
              </button>

            </>
          )}

          {step === 2 && (
            <BusinessInfo 
            formData={formData} 
            setFormData={setFormData}/>
          )}

          <div className="mt-8 rounded-2xl bg-slate-50 p-4">
            <p className="text-center text-xs text-slate-500">
              Your business information is encrypted and securely stored.
            </p>
          </div>
        </div>

        {step > 1 && (
  <div className="mb-10 overflow-x-auto">
    <div className="flex min-w-max items-center">
      {steps.map((title, index) => {
        const currentStep = index + 2;

        return (
          <div key={title} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-all
                  ${
                    currentStep < step
                      ? "bg-green-500 text-white"
                      : currentStep === step
                      ? "bg-violet-600 text-white"
                      : "bg-slate-200 text-slate-500"
                  }`}
              >
                {index + 1}
              </div>

              <p
                className={`mt-2 w-28 text-center text-xs font-medium
                  ${
                    currentStep <= step
                      ? "text-violet-700"
                      : "text-slate-400"
                  }`}
              >
                {title}
              </p>
            </div>

            {index !== steps.length - 1 && (
              <div
                className={`mx-3 h-1 w-16 rounded-full
                  ${
                    currentStep < step
                      ? "bg-green-500"
                      : "bg-slate-200"
                  }`}
              />
            )}
          </div>
        );
      })}
    </div>
  </div>
)}

        {/* RIGHT */}

     
          {/* RIGHT IMAGE */}
{step === 1 && (
  <div className="relative hidden lg:block overflow-hidden">
    <Image
      src="/assets/jpng/3Dlogin.jpeg"
      alt="SEO Questionnaire Login"
      fill
      className="object-cover"
      priority
    />

    {/* Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

    <div className="absolute bottom-10 left-10 right-10 text-white">
      <h2 className="text-3xl font-bold">
        Grow Your Business With Better SEO
      </h2>

      <p className="mt-3 text-sm text-white/80">
        Complete your SEO questionnaire and let our experts create
        a customized growth strategy for your business.
      </p>
    </div>
  </div>
)}
{/* {step === 2 && (
  <BusinessContact
    data={formData}
    setData={setFormData}
    next={() => setStep(3)}
  />
)}

{step === 3 && (
  <AboutBusiness
    data={formData}
    setData={setFormData}
    next={() => setStep(4)}
    previous={() => setStep(2)}
  />
)}

{step === 4 && (
  <Package
    data={formData}
    setData={setFormData}
    next={() => setStep(5)}
    previous={() => setStep(3)}
  />
)}

{step === 5 && (
  <Competitor
    data={formData}
    setData={setFormData}
    next={() => setStep(6)}
    previous={() => setStep(4)}
  />
)}

{step === 6 && (
  <WebsiteAccess
    data={formData}
    setData={setFormData}
    next={() => setStep(7)}
    previous={() => setStep(5)}
  />
)}

{step === 7 && (
  <GoogleAccount
    data={formData}
    setData={setFormData}
    next={() => setStep(8)}
    previous={() => setStep(6)}
  />
)}

{step === 8 && (
  <SocialMedia
    data={formData}
    setData={setFormData}
    previous={() => setStep(7)}
  />
)} */}
  
      </div>
    </div>
  );
}
