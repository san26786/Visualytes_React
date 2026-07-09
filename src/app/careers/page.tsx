"use client";

import PageBanner from "@/src/common/components/layouts/PageBanner";
import Image from "next/image";
import { Mail } from "lucide-react";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

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

export default function Page() {

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


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      designation: "",
      message: "",
    });

    setResume(null);

    if (fileRef.current) {
      fileRef.current.value = "";
    }    setCaptchaToken("");

    recaptchaRef.current?.reset();
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!captchaToken) {
      alert("Please verify reCAPTCHA");
      return;
    }

    if (!resume) {
      alert("Please upload your resume");
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


      const res = await fetch("/api/careers", {
        method: "POST",
        body: formData,
      });


      const data = await res.json();


      alert(data.message);


      if(data.success){
        resetForm();
      }


    } catch(error){

      console.error(error);
      alert("Something went wrong");

    } finally {

      setLoading(false);

    }
  };


  return (
    <>
      <PageBanner title="Careers"/>


      <section className="py-8 md:py-10">

        <div className="max-w-7xl mx-auto px-5">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16">

            {jobs.map((job,index)=>(

              <div
                key={index}
                className="group text-center flex flex-col items-center"
              >

                <div className="w-16 h-16 flex items-center justify-center">

                  <Image
                    src={job.icon}
                    alt={job.title}
                    width={64}
                    height={64}
                    className="
                    object-contain
                    transition-all
                    duration-300
                    group-hover:brightness-0
                    group-hover:saturate-100
                    group-hover:invert-[39%]
                    group-hover:sepia-[99%]
                    group-hover:saturate-[2353%]
                    group-hover:hue-rotate-[316deg]
                    "
                  />

                </div>


                <h3
                className="
                mt-6
                text-[23px]
                font-medium
                text-[#1f2732]
                transition-colors
                group-hover:text-[#ff497c]
                "
                >
                  {job.title}
                </h3>


                <p className="
                mt-3
                text-[16px]
                leading-8
                text-[#7f7f7f]
                max-w-[320px]
                ">
                  {job.desc}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>



      <section className="bg-white py-10 lg:py-20">

        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">


        <div className="text-block shortcode overflow-hidden my-5 bg-[#ff497c] px-7 py-2 text-[#fff]">
  <div className="career-heading whitespace-nowrap animate-marquee text-center text-[18px] ">
    Currently we do not have any vacancy&apos;s. Please fill out the above form with proper details. We will update you when we have any vacancy&apos;s available.
  </div>
</div>


          <form 
          onSubmit={handleSubmit}
          className="space-y-5"
          >


          <div className="grid lg:grid-cols-2 gap-5">


            <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="FULL NAME"
            className="h-[72px] bg-[#f6f5f5] px-8 text-sm outline-none"
            required
            />


            <div className="relative">

            <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="EMAIL ADDRESS"
            className="h-[72px] w-full bg-[#f6f5f5] px-8 pr-14 text-sm outline-none"
            required
            />


            <Mail
            size={18}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-[#27c7b8]"
            />

            </div>


          </div>



          <div className="grid lg:grid-cols-2 gap-5">

  {/* Designation Select */}
  <div className="relative">
  <input
    list="designations"
    name="designation"
    value={form.designation}
    onChange={handleChange}
    placeholder="Select DESIGNATION"
    className="
      h-[72px]
      w-full
      bg-[#f6f5f5]
      px-8
      text-sm
      text-[#7f7f7f]
      outline-none
      uppercase
    "
    required
  />

  <datalist id="designations">
    {jobs.map((job, index) => (
      <option key={index} value={job.title} />
    ))}
  </datalist>
</div>


  {/* Resume Upload */}
  <div className="h-[72px] bg-[#f6f5f5] flex items-center px-8">

  <input
    ref={fileRef}
    type="file"
    accept=".pdf,.doc,.docx"
    onChange={(e) =>
      setResume(e.target.files?.[0] || null)
    }
    className="
      w-full
      text-sm
      text-[#7f7f7f]
      file:mr-5
      file:rounded-none
      file:border-0
      file:bg-[#232b39]
      file:px-6
      file:py-3
      file:text-sm
      file:font-medium
      file:text-white
      hover:file:bg-[#ff497c]
      cursor-pointer
    "
    required
  />

</div>

</div>

          <textarea
          rows={6}
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Enter MESSAGE"
          className="w-full resize-none bg-[#f6f5f5] px-8 py-6 outline-none"
          required
          />


          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 pt-10">


          <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
          onChange={(token)=>setCaptchaToken(token || "")}
          />


          <div className="flex gap-4">


          <button
          disabled={loading}
          className="
          rounded-full
          bg-[#ff4778]
          px-10
          py-5
          font-bold
          text-white
          hover:bg-[#232b39]
          uppercase mb-7
          "
          >
            {loading ? "Submitting..." : "Submit"}
          </button>



          


          </div>

          </div>


          </form>


        </div>

      </section>

    </>
  );
}