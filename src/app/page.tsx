import FirstSection from "../common/components/layouts/first_section/firstsection";
import ServiceWrapper from "./services/ServicesWrapper";
import ServicesPage from "./services/Services";
import ProcessSection from "./(home)/ProcessSection";
import AboveFooter from "../common/components/layouts/AboveFooter";
import LatestBlogs from "./(home)/_componts/LatestBlogs";
import HomeBanner from "./(home)/HomeBanner";
import DigitalMarketingIntro from "./(home)/DigitalMarketingIntro";
import Portfolio from "./(home)/Portfolio";
import CaseStudy from "./(home)/Casestudies";
import VideoSection from "./(home)/VideoSection";
import BusinessCommunities from "./(home)/BusinessCommunities";
import BooksSection from "./(home)/BooksSection";
import TestimonialsSection from "./(home)/TestimonialsSection";
import AppointmentTalk from "./(home)/AppointmentTalk";
import ClientSlider from "./(home)/ClientSlider";

export default function Home() {
  return (
    <>
    <HomeBanner/>
    <DigitalMarketingIntro/>
      {/* <FirstSection /> */}
      {/* <ServiceWrapper /> */}
      {/* <ServicesPage /> */}
      <ProcessSection />
      <Portfolio/>
      <CaseStudy/>
      <VideoSection/>
      <BusinessCommunities/>
      <BooksSection/>
      <TestimonialsSection/>
      {/* <AppointmentTalk/> */}
      {/* <ClientSlider/> */}
      <LatestBlogs/>

      <AboveFooter />
    </>
  );
}

