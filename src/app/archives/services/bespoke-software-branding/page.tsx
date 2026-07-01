import ServiceSection from "@/src/app/our-services/_componets/ServiceSection";
import ServicePageBanner from "@/src/common/components/layouts/ServicePageBanner";
import React from 'react'

const page = () => {
  return (<>
    <ServicePageBanner
  title="Bespoke Software"
  breadcrumbs={[
    {
      label: "Services",
      href: "/archives/services",
    },
    {
      label: "Bespoke Software",
    },
  ]}
/>
<ServiceSection
  title="We turn good ideas into great products."
intro=""
  description={[
    "Do you have a business model in mind? Let's get it in the market with the best possible development and a huge room for customization.",
    "Many business owners are often in a dilemma about choosing between a tailor-made software (bespoke software) and commonly used software. Going ahead with bespoke software can open up a lot of possibilities for business expansion and development. However, some companies prefer not to invest in a custom-made software and settle for less expensive off-the-shelf products.",
  ]}
  image="/assets/png/services/Bespoke-Software-Development.png"
  topDescription={["Whether you opt for bespoke software or off-the-shelf solutions, providing a seamless user experience is what makes businesses survive. Consumers just want a simple yet responsive website that performs well on desktops as well as mobile devices. When you have the power to make their trust in your brand sustain use it wisely. Choose smart solutions to cater to the requirements of a large number of consumers.",
    "Off-the-shelf solutions are most commonly used but bespoke guarantees a qualitative performance to achieve desired results. It works in harmony with the needs of the employees as well as clients. The expectations of the consumers in the coming generation will be much higher than now. So, it makes sense to keep your standards high and deliver smart solutions.",
  ]}
  bullets={[
   
  ]}

  // bottomTitle="Why Every Business Needs a Website"

  bottomDescription=""

/>
</> )
}

export default page