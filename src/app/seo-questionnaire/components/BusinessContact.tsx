"use client";

interface BusinessContactData {
  businessName: string;
  fullName: string;
  mobilePhone: string;
  businessPhone: string;
  websiteUrl: string;
  email: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

type Props = {
  data: BusinessContactData;
  setData: React.Dispatch<React.SetStateAction<BusinessContactData>>;
};

export default function BusinessContact({ data, setData }: Props) {


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };


  return (
    <div>

      <h2 className="text-3xl font-bold text-slate-900">
        Business Contact Details
      </h2>

      <p className="mt-2 text-slate-500">
        Please provide your business and contact information.
      </p>


      <div className="mt-8 grid gap-5 md:grid-cols-2">


        <input
          required
          name="businessName"
          value={data.businessName || ""}
          onChange={handleChange}
          placeholder="Business Name"
          className="
          h-14
          rounded-2xl
          border
          border-slate-200
          px-5
          outline-none
          focus:border-violet-500
          "
        />


        <input
          required
          name="fullName"
          value={data.fullName || ""}
          onChange={handleChange}
          placeholder="Full Name"
          className="
          h-14
          rounded-2xl
          border
          border-slate-200
          px-5
          outline-none
          focus:border-violet-500
          "
        />



        <input
          required
          name="mobilePhone"
          value={data.mobilePhone || ""}
          onChange={handleChange}
          placeholder="Mobile Phone Number"
          type="tel"
          className="
          h-14
          rounded-2xl
          border
          border-slate-200
          px-5
          outline-none
          focus:border-violet-500
          "
        />



        <input
          required
          name="businessPhone"
          value={data.businessPhone || ""}
          onChange={handleChange}
          placeholder="Business Phone"
          type="tel"
          className="
          h-14
          rounded-2xl
          border
          border-slate-200
          px-5
          outline-none
          focus:border-violet-500
          "
        />



        <input
          required
          name="websiteUrl"
          value={data.websiteUrl || ""}
          onChange={handleChange}
          placeholder="Website URL"
          type="url"
          className="
          h-14
          rounded-2xl
          border
          border-slate-200
          px-5
          outline-none
          focus:border-violet-500
          "
        />



        <input
          required
          name="email"
          value={data.email || ""}
          onChange={handleChange}
          placeholder="Business Contact Email"
          type="email"
          className="
          h-14
          rounded-2xl
          border
          border-slate-200
          px-5
          outline-none
          focus:border-violet-500
          "
        />



        <input
          required
          name="address1"
          value={data.address1 || ""}
          onChange={handleChange}
          placeholder="Business Address Line 1"
          className="
          h-14
          rounded-2xl
          border
          border-slate-200
          px-5
          outline-none
          focus:border-violet-500
          md:col-span-2
          "
        />



        <input
          name="address2"
          value={data.address2 || ""}
          onChange={handleChange}
          placeholder="Business Address Line 2"
          className="
          h-14
          rounded-2xl
          border
          border-slate-200
          px-5
          outline-none
          focus:border-violet-500
          md:col-span-2
          "
        />



        <input
          required
          name="city"
          value={data.city || ""}
          onChange={handleChange}
          placeholder="City"
          className="
          h-14
          rounded-2xl
          border
          border-slate-200
          px-5
          outline-none
          focus:border-violet-500
          "
        />



        <input
          required
          name="state"
          value={data.state || ""}
          onChange={handleChange}
          placeholder="State or County"
          className="
          h-14
          rounded-2xl
          border
          border-slate-200
          px-5
          outline-none
          focus:border-violet-500
          "
        />



        <input
          required
          name="postalCode"
          value={data.postalCode || ""}
          onChange={handleChange}
          placeholder="Postal / Zip Code"
          className="
          h-14
          rounded-2xl
          border
          border-slate-200
          px-5
          outline-none
          focus:border-violet-500
          "
        />



        <select
          required
          name="country"
          value={data.country || ""}
          onChange={handleChange}
          className="
          h-14
          rounded-2xl
          border
          border-slate-200
          px-5
          text-slate-600
          outline-none
          focus:border-violet-500
          "
        >

          <option value="">
            Please select
          </option>

          <option value="United Kingdom">
            United Kingdom
          </option>

          <option value="India">
            India
          </option>

          <option value="United States">
            United States
          </option>

        </select>


      </div>


    </div>
  );
}