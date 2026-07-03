import ContactForm from "./_componets/ContactForm";
import LiveSupport from "./_componets/LiveSupport";
import OfficeLocation from "./_componets/OfficeLocation";
import OfficeNames from "./_componets/OfficeNames";
import PageHeader from "./_componets/PageHeader";

export default function Page() {


  return (
    <>
     <PageHeader/>
     <LiveSupport/>
     <ContactForm/>
     <OfficeLocation/>
     <OfficeNames/>
    </>
  );
}