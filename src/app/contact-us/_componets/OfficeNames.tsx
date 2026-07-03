"use client";

const officeData = [
  {
    title: "Delivery Centers",
    locations: [
      "Southampton, United Kingdom",
      "London, United Kingdom",
      "Mumbai, India",
      "Ahmedabad, India",
      "Kolkata, India",
      "Noida, India",
    ],
  },
  {
    title: "Sales Offices",
    locations: [
      "London, United Kingdom",
      "Mumbai, India",
      "Texas, USA",
      "Sydney, Australia",
      "United Arab Emirates",
      "Douglas, Isle of Man",
    ],
  },
  {
    title: "Corporate Offices",
    locations: [
      "London, United Kingdom",
      "Basingstoke, United Kingdom",
      "Mumbai, India",
    ],
  },
];

export default function OfficeNames() {
  return (
    <section className="bg-white py-14 md:py-16 mb-30">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-20">
          {officeData.map((office) => (
            <div key={office.title}>
              <h2 className="mb-6 text-[36px] font-medium leading-tight text-[#1f2732]">
                {office.title}
              </h2>

              <ul className="space-y-5">
                {office.locations.map((location) => (
                  <li key={location} className="flex items-center gap-3">
                   
<span className="rt-icon2-pin-alt"></span>
                    <span className="text-[18px] font-normal leading-none text-[#8d8d8d]">
                      {location}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}