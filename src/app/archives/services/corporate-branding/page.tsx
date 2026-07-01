import ServiceSection from "@/src/app/our-services/_componets/ServiceSection";
import ServicePageBanner from "@/src/common/components/layouts/ServicePageBanner";
import React from 'react'

const page = () => {
  return (<>
    <ServicePageBanner
  title="Corporate Branding"
  breadcrumbs={[
    {
      label: "Services",
      href: "/archives/services",
    },
    {
      label: "Corporate Branding",
    },
  ]}
/>
<ServiceSection
  title="Promoting the brand name of a corporate entity, as opposed to specific products or services."
intro=""
  description={[
    "The first impression is indeed the last one, and that is where your business logo and a strong branding strategy can help boost the conversion rate.",
    "Corporate Branding is making the customer feel your specialty in everything that belongs to your company. In other words, how your customers perceive your brand will depend on a lot of factors like, how you manage your staff; how you give importance to customer reviews and suggestions; how well you handle complaints from customers; your creativity in marketing; and a lot more.",
  ]}
  image="/assets/png/services/corporate-branding-min.png"
  topDescription={["A strong brand will pay attention to these details and will remain consistent in their approach.",
    "Corporate Branding is not an option anymore, it is as vital as the yearly budget for your company. Let us take a deeper look at ‘Why Corporate Branding is Important?’",
    "At the end of a financial year, a company as a whole will definitely want to look at the profit figures rather than spending time discussing what went wrong in the plan. Though there is no shortcut to success, some smart moves can save you a lot of trouble when it comes to corporate branding. Once you find out what works best for your brand, do not lose the grip. When your brand becomes so vast that it can tell a story by just its logo; you know you have done your best in corporate branding. People will buy your product when they buy your story; You must have a remarkable story-telling skill to keep your customers engaged with your brand. If you are finding it difficult to come up with corporate branding ideas let us know where to dive in to help. Visualytes have been successful in reshaping brand identity for several businesses so far. It gives us great pleasure to see brands achieve great success through an identity transformation.",
  ]}
  bullets={[
   
  ]}

  // bottomTitle="Why Every Business Needs a Website"

  bottomDescription=""

/>
</> )
}

export default page