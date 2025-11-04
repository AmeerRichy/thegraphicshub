// e.g., app/refund-policy/page.tsx
import Header from '../components/header';
import Footer from '../components/footer';
import FaqHero from '../sections/FaqHero';
import RefundPolicyHeroExact from '../sections/RefundPolicyHero';
import RefundPolicyDetails from '../sections/RefundPolicyDetails';

export default function RefundPolicyPage() {
  return (
    <>
    <Header/>
  <RefundPolicyHeroExact/>
     <RefundPolicyDetails/>
      <Footer/>
          </>
  );
}
