import ServiceSection from "@/src/app/our-services/_componets/ServiceSection";
import ServicePageBanner from "@/src/common/components/layouts/ServicePageBanner";
import React from 'react'

const page = () => {
  return (<>
    <ServicePageBanner
  title="Mobile App Development"
  breadcrumbs={[
    {
      label: "Services",
      href: "/archives/services",
    },
    {
      label: "Mobile App Development",
    },
  ]}
/>
<ServiceSection
  title="Get the best applications developing solutions here!!!"
intro=""
  description={[
    "Launch a beast of a business in the app store and turn all the spotlight on your mobile app by availing our mobile app development service.",
    "Mobile applications have become like our significant other; we cannot leave without it anymore. Our lifestyle has been evolved over the years so much with the use of mobile applications for several tasks like paying the power bill; making a to-do list or searching for a new car; we use handy applications for hassle-free processing.",
  ]}
  image="/assets/png/services/mobile-app-development.jpg-min.png"
  topDescription={["According to Google, about 80% of mobile users prefer to buy from a company having a mobile application for better user experience. No wonder, there are almost 2.6 million Android apps on the Play Store and about 2 million or more in the App Store.",
    "Like other digital marketing tactics, mobile app development techniques also keep changing as new technology begins to show its magic. So, let us find out what the top 6 Mobile app development trends for 2020 and beyond.",
  ]}
  bullets={[
    
  ]}

  // bottomTitle="Why Every Business Needs a Website"

  bottomDescription="To catch up with the trends is a difficult task along with managing a team of your own. But, Visualytes can assist you in bringing the latest mobile application trends inclusive of relevant customisation. Apart from a business website, a Mobile Application that provides a smooth and, interactive and responsive experience to the user can refine your reputation to a great extent. Explore these trends to match your marketing strategy requirements to achieve greater success."

/>
</> )
}

export default page