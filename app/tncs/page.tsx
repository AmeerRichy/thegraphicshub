import Footer from "../components/footer";
import Header from "../components/header";
import TermsConditionsDetails from "../sections/TermsConditionsDetails";
import TermsConditionsHeroExact from "../sections/TermsConditionsHero";


export default function tncs() {
  return (
    <>
      {/* <FaqHeroExact /> or your Privacy hero */}
      <Header/>
<TermsConditionsHeroExact/>
<TermsConditionsDetails/>
 <Footer/>
    </>
  );
}
