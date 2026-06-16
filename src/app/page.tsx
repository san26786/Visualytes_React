import Image from "next/image";
import Mainheader from "../common/components/layouts/header/_component/Mainheader";
import Footer from "../common/components/layouts/footer/_component/footer";
import ProcessSection from "../app/(home)/ProcessSection";
import FirstSection from "../common/components/layouts/first_section/firstsection";
import { Children } from "react";
import ServiceWrapper from "./(home)/(services)/ServicesWrapper";
import ServicesPage from "./(home)/(services)/Services";

export default function Home() {
  return (
    <div>
     <Mainheader />
     <FirstSection />
 <ServiceWrapper/>
 <ServicesPage  />
      <ProcessSection/>
      <Footer />
    </div>
  );
}
