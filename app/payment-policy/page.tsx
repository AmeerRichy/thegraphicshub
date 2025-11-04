import Footer from "../components/footer";
import Header from "../components/header";
import PaymentPolicyDetails from "../sections/PaymentPolicyDetails";
import PaymentPolicyHeroExact from "../sections/PaymentPolicyHero";
import PrivacyPolicyHeroExact from "../sections/PolicyHero";
import PrivacyPolicyDetails from "../sections/PrivacyPolicyDetails";

export default function PaymentPolicyPage() {
  return (
    <>
      {/* <FaqHeroExact /> or your Privacy hero */}
      <Header/>
 <PaymentPolicyHeroExact/>
 <PaymentPolicyDetails/>
 <Footer/>
    </>
  );
}
