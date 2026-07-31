"use client";

import { ChangeEvent } from "react";

interface BusinessInfoProps {
  formData: Record<string, string>;
  setFormData: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

const countries = [
  "United Kingdom",
  "India",
  "United States",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Spain",
  "Italy",
  "Japan",
  "China",
  "Brazil",
  "South Africa",
];

export default function BusinessInfo({
  formData,
  setFormData,
}: BusinessInfoProps) {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section className="space-y-8">
      <input
        type="hidden"
        name="subject"
        value="Local SEO Setup Form"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          name="businessName"
          placeholder="Business Name"
          value={formData.businessName}
          onChange={handleChange}
        />

        <Input
          name="contactPerson"
          placeholder="Contact Person Full Name"
          value={formData.contactPerson}
          onChange={handleChange}
        />

        <Input
          name="mobileNumber"
          placeholder="Mobile Phone Number"
          maxLength={13}
          value={formData.mobileNumber}
          onChange={handleChange}
        />

        <Input
          name="businessPhone"
          placeholder="Business Phone"
          maxLength={13}
          value={formData.businessPhone}
          onChange={handleChange}
        />

        <Input
          name="websiteUrl"
          type="url"
          placeholder="Website URL"
          value={formData.websiteUrl}
          onChange={handleChange}
        />

        <Input
          name="businessEmail"
          type="email"
          placeholder="Business Contact Email"
          value={formData.businessEmail}
          onChange={handleChange}
        />

        <Input
          name="addressLine1"
          placeholder="Business Address Line 1"
          value={formData.addressLine1}
          onChange={handleChange}
        />

        <Input
          name="addressLine2"
          placeholder="Business Address Line 2"
          value={formData.addressLine2}
          onChange={handleChange}
        />

        <Input
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
        />

        <Input
          name="state"
          placeholder="State or County"
          value={formData.state}
          onChange={handleChange}
        />

        <Input
          name="postalCode"
          placeholder="Postal / Zip Code"
          value={formData.postalCode}
          onChange={handleChange}
        />

        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
          className="h-12 rounded-lg border px-4"
        >
          {countries.map((country) => (
            <option key={country}>
              {country}
            </option>
          ))}
        </select>
      </div>


      <Input
        name="businessSector"
        placeholder="What business sector are you in?"
        value={formData.businessSector}
        onChange={handleChange}
      />


      <div>
        <div className="flex justify-between text-sm mb-2">
          <span>Business Description</span>
          <span>
            {500 - (formData.description?.length || 0)} Remaining Characters
          </span>
        </div>

        <textarea
          name="description"
          maxLength={500}
          rows={5}
          placeholder="Business description Enter up to 500 Character"
          value={formData.description}
          onChange={handleChange}
          className="w-full rounded-lg border p-4"
        />
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <textarea
          name="businessCategories"
          rows={5}
          placeholder="List up to 5 additional business categories"
          value={formData.businessCategories}
          onChange={handleChange}
          className="rounded-lg border p-4"
        />

        <textarea
          name="servicesProducts"
          rows={5}
          placeholder="List up to 5 Services / Products"
          value={formData.servicesProducts}
          onChange={handleChange}
          className="rounded-lg border p-4"
        />

      </div>

    </section>
  );
}


function Input({
  name,
  placeholder,
  value,
  onChange,
  type = "text",
  maxLength,
}: {
  name:string;
  placeholder:string;
  value?:string;
  onChange:(e:ChangeEvent<HTMLInputElement>)=>void;
  type?:string;
  maxLength?:number;
}) {

  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value || ""}
      maxLength={maxLength}
      onChange={onChange}
      className="h-12 rounded-lg border px-4 w-full"
    />
  );
}