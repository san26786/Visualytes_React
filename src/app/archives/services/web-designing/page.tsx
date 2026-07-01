import ServiceSection from "@/src/app/our-services/_componets/ServiceSection";
import ServicePageBanner from "@/src/common/components/layouts/ServicePageBanner";
import React from 'react'

const page = () => {
  return (<>
    <ServicePageBanner
  title="Website Designing"
  breadcrumbs={[
    {
      label: "Services",
      href: "/archives/services",
    },
    {
      label: "Website Designing",
    },
  ]}
/>
<ServiceSection
  title="Design is not a thing you do. It’s a way of life. Creative, flexible and affordable website design. "
intro=""
  description={[
    "Are you still struggling to get on new customers with traditional offline marketing techniques? Do you feel online marketing would take more time and money? If you feel you are not tech-savvy and a business website is not your thing; think about it a little more. At this very moment, a majority of the world population is surfing the web and browsing about a product or service.",
    "You cannot deny the fact that people are diligent about analyzing online reviews and product descriptions before purchasing a product. Do you need more reasons to hire a web designer? Read on to find out why you must invest in making a good business website.",
  ]}
  image="/assets/png/services/Website-designing.png"
  topDescription={["If you think small businesses do not need website marketing strategies then you are wrong. It is always better to have a website with all the relevant information about your products and services. You should invest in making your brand look appealing online to a customer."]}
  bullets={[
    "You can attract genuine customers",
    "You can be available 24×7",
    "You get a designated online presence",
    "Showcase your brand's USP",
  ]}

  // bottomTitle="Why Every Business Needs a Website"

  bottomDescription="A website is a good platform to attract consumers by elaborating on your company’s evolution over the years. Also, most consumers trust a brand having a reputed legacy. So, showcase your worth with an attractive logo, slogan, and an all-inclusive website. Customers are more likely to contact a business using online information. Modern websites have contact information forms for getting genuine customers."

/>
</> )
}

export default page