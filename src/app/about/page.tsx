
import Map from './_componets/Map';
import HelpCards from './_componets/ HelpCards';
import HexagonCrads from './_componets/HexagonCrads';
import AboutIntro from './_componets/AboutIntro';
import History from './_componets/History';
import Milestone from './_componets/Milestone';
import Details from './_componets/Details';

export default function AboutBrandSection() {
  return (
    <>
     <AboutIntro/>
     <Details/>
     <History/>


      
     <Milestone/>


<HexagonCrads/>
   
      <HelpCards/>

        <Map/>
     
    </>
  );
}