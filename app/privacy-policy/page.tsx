import Footer from "../components/footer";
import Header from "../components/header";
import PrivacyPolicyHeroExact from "../sections/PolicyHero";
import PrivacyPolicyDetails from "../sections/PrivacyPolicyDetails";

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* <FaqHeroExact /> or your Privacy hero */}
      <Header/>
 <PrivacyPolicyHeroExact/>
 <PrivacyPolicyDetails/>
 <Footer/>
    </>
  );
}
