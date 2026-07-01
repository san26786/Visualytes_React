import ServiceSection from "@/src/app/our-services/_componets/ServiceSection";
import ServicePageBanner from "@/src/common/components/layouts/ServicePageBanner";
import React from 'react'

const page = () => {
  return (<>
    <ServicePageBanner
  title="Maintenance & Support"
  breadcrumbs={[
    {
      label: "Services-1",
      href: "/archives/services",
    },
    {
      label: "Maintenance & Support",
    },
  ]}
/>
<ServiceSection
  title="Maintain your product with our experts "
intro=""
  description={[
    "Development to us is only a part of our scope; our main task is to support your app or website from the outside and take it to the level that you desire for.",
    "We are a website maintenance services company, helping businesses across the globe improve the performance and security of their websites. Whether you’re looking for a monthly, hourly, or after-hours website maintenance plan, Visualytes provides the experience and expertise your company demands.",
  ]}
  image="/assets/png/services/maintenance-and-support-1170x780-min.png"
  topDescription={["With every online search, 50 percent of users discover a new company, product, or service. They visit your website, explore your products, browse your services, and get a first impression of your business. That first impression can make or break your company’s next sale.",
    "For businesses today, this fact makes website maintenance a top priority."
  ]}
  bullets={[
   
  ]}

  // bottomTitle="Why Every Business Needs a Website"

  bottomDescription=""

/>
</> )
}

export default page