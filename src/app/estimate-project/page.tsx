"use client";

import { Check } from "lucide-react";
import { BrandPageBackdrop } from "@/src/common/components/ui/brand/page-effects";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

export default function EstimateProjectPage() {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    companyPersonnel: "",
    email: "",
    phone: "",
    mobileType: "",
    budget: "",
    projectDetails: "",
    timeline: "",
    marketing: false,
  });


  const [loading, setLoading] = useState(false);


  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault();

    try {

      setLoading(true);


      const res = await fetch(
        "/api/estimate-project",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );


      const result = await res.json();


      if(result.success){

        toast.success(result.message || "Project estimate submitted successfully!");
        
        setFormData({
        firstName:"",
        lastName:"",
        companyName:"",
        companyPersonnel:"",
        email:"",
        phone:"",
        mobileType:"",
        budget:"",
        projectDetails:"",
        timeline:"",
        marketing:false,
        });
        
        }
        else{
        
        toast.error(result.message || "Something went wrong!");
        
        }

      if (result.success) {

        setFormData({
          firstName: "",
          lastName: "",
          companyName: "",
          companyPersonnel: "",
          email: "",
          phone: "",
          mobileType: "",
          budget: "",
          projectDetails: "",
          timeline: "",
          marketing: false,
        });

      }


    } catch(error){

      console.error(error);
      
      toast.error("Something went wrong. Please try again.");
      
      }
    finally {

      setLoading(false);

    }

  }



  return (

    <main className="relative overflow-hidden bg-slate-950 min-h-screen py-24 pt-40">


      <section className="mx-auto max-w-5xl px-6">


        <BrandPageBackdrop />


        <h1 className="mb-8 text-center text-4xl font-semibold text-blue-900">
          ESTIMATE PROJECT
        </h1>



        <div className="mb-10 flex items-center justify-center gap-5">


          <div className="relative h-20 w-20 overflow-hidden rounded-full border border-yellow-400">

            <Image
              src="/assets/png/nagendra-sir.png"
              alt="CEO"
              fill
              className="object-cover"
            />

          </div>


          <div className="max-w-xl rounded-md bg-gray-50 px-5 py-4 text-sm font-semibold leading-6 text-blue-900 shadow-sm">

            Hi, I Am Nagendra, CEO Of Visualytes. I Would Love To Talk With You
            About Your Project Or Needs. Send Me An Email Or Answer Questions
            Below. Talk To You Soon!

          </div>


        </div>




        <form

          onSubmit={handleSubmit}

          className="
rounded-xl
bg-gray-50
p-10
shadow-sm
"

        >


          <div className="grid gap-6 md:grid-cols-2">



            <Input
              label="First Name"
              required
              value={formData.firstName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  firstName: e.target.value
                })
              }
            />



            <Input
              label="Last Name"
              required
              value={formData.lastName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  lastName: e.target.value
                })
              }
            />



            <Input
              label="Company Name"
              required
              value={formData.companyName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  companyName: e.target.value
                })
              }
            />




            <Input
              label="Company Personnel Name"
              value={formData.companyPersonnel}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  companyPersonnel: e.target.value
                })
              }
            />




            <Input
              label="Email"
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value
                })
              }
            />



            <Input
              label="Phone Number"
              required
              value={formData.phone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phone: e.target.value
                })
              }
            />



            <Select

              label="Type of Mobile Application"

              required

              value={formData.mobileType}

              onChange={(e) =>
                setFormData({
                  ...formData,
                  mobileType: e.target.value
                })
              }

              options={[
                "Select Option",
                "iOS Application",
                "Android Application",
                "Hybrid Application",
              ]}

            />



            <Input

              label="Your Estimated Budget"

              required

              value={formData.budget}

              onChange={(e) =>
                setFormData({
                  ...formData,
                  budget: e.target.value
                })
              }

            />





            <div className="md:col-span-2">


              <label className="mb-1 block text-sm text-gray-500">

                Project Details

                <span className="ml-1 text-red-500">
                  *
                </span>

              </label>



              <textarea

                required

                value={formData.projectDetails}

                onChange={(e) =>
                  setFormData({
                    ...formData,
                    projectDetails: e.target.value
                  })
                }

                className="
h-24
w-full
rounded-md
border
border-gray-300
bg-white
px-4
py-3
outline-none
focus:border-blue-500
"

              />


            </div>





            <Select

              label="What timeline you have in hand ?"

              required

              value={formData.timeline}

              onChange={(e) =>
                setFormData({
                  ...formData,
                  timeline: e.target.value
                })
              }

              options={[
                "Select Option",
                "1 Month",
                "3 Months",
                "6 Months",
                "More than 6 Months",
              ]}

            />



          </div>
          {/* Marketing Checkbox */}

          <label className="mt-6 flex cursor-pointer items-center gap-3 text-sm text-gray-500">


            <div
              className={`
flex
h-6
w-6
items-center
justify-center
rounded-md
border-2
transition-all
duration-200
${formData.marketing
                  ?
                  "border-emerald-500 bg-emerald-500"
                  :
                  "border-gray-300 bg-white"
                }
`}
            >


              {
                formData.marketing && (
                  <Check
                    className="h-5 w-5 text-white"
                    strokeWidth={3}
                  />
                )
              }


            </div>



            <input

              type="checkbox"

              checked={formData.marketing}

              onChange={(e) =>
                setFormData({
                  ...formData,
                  marketing: e.target.checked
                })
              }

              className="hidden"

            />


            <span>
              I Agree to Receive Marketing Communication from Visualytes
            </span>


          </label>





          <div className="mt-8 text-center">


            <button

              type="button"

              className="
rounded-full
border-2
border-yellow-400
px-8
py-2
text-sm
font-semibold
text-blue-600
transition
hover:bg-yellow-50
"

            >

              Answer 2 more questions to get more precise estimation

            </button>


          </div>





          <div className="mt-12 flex justify-center">


            <button

              type="submit"

              disabled={loading}

              className="
rounded-full
bg-gradient-to-r
from-pink-500
to-pink-400
px-14
py-4
text-sm
font-bold
tracking-[3px]
text-white
shadow-md
transition
hover:scale-105
disabled:opacity-50
"

            >


              {
                loading
                  ?
                  "SUBMITTING..."
                  :
                  "ESTIMATE MY PROJECT"
              }


            </button>


          </div>



        </form>


      </section>


    </main>

  );

}






// INPUT COMPONENT

function Input({

  label,

  type = "text",

  value,

  required = false,

  onChange

}: {

  label: string;

  type?: string;

  value: string;

  required?: boolean;

  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

}) {


  return (

    <div>


      <label className="mb-1 block text-sm text-gray-500">

        {label}

        {
          required &&
          <span className="ml-1 text-red-500">
            *
          </span>
        }

      </label>



      <input

        type={type}

        value={value}

        required={required}

        onChange={onChange}

        className="
h-10
w-full
rounded-md
border
border-gray-300
bg-white
px-4
outline-none
focus:border-blue-500
"

      />


    </div>

  )

}








// SELECT COMPONENT

function Select({

  label,

  options,

  value,

  required = false,

  onChange

}: {

  label: string;

  options: string[];

  value: string;

  required?: boolean;

  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;

}) {


  return (

    <div>


      <label className="mb-1 block text-sm text-gray-500">

        {label}

        {
          required &&
          <span className="ml-1 text-red-500">
            *
          </span>
        }

      </label>



      <select

        value={value}

        required={required}

        onChange={onChange}

        className="
h-10
w-full
rounded-md
border
border-gray-300
bg-white
px-4
text-gray-600
outline-none
focus:border-blue-500
"

      >


        {
          options.map((item) => (

            <option

              key={item}

              value={item}

              disabled={
                item === "Select Option"
              }

            >

              {item}

            </option>

          ))

        }


      </select>


    </div>

  )

}