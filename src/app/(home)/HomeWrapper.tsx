                                                                                              
import AboveFooter from "@/src/common/components/layouts/AboveFooter";
import TestimonialsSection from "./_componts/TestimonialsSection";
import DigitalMarketingIntro from "./_componts/DigitalMarketingIntro";
import ProcessSection from "./_componts/ProcessSection";
import CaseStudy from "./_componts/Casestudies";
import VideoSection from "./_componts/VideoSection";
import BooksSection from "./_componts/BooksSection";
import HomeBanner from "./_componts/HomeBanner";
import AppointmentTalk from "./_componts/AppointmentTalk";
import ClientSlider from "./_componts/ClientSlider";
import Portfolio from "./_componts/Portfolio";
import BusinessCommunities from "./_componts/BusinessCommunities";
export default function HomeWrapper() {
  return (
    <>
    <HomeBanner />
    <DigitalMarketingIntro/>
      <ProcessSection />
      <Portfolio/>
      <CaseStudy/>
      <VideoSection/>
      <BusinessCommunities/>
      <BooksSection/>
      <TestimonialsSection/>
      <AppointmentTalk/> 
      <ClientSlider/>
      {/* <BlogSlider/> */}
      <AboveFooter />
    </>
  );
}

