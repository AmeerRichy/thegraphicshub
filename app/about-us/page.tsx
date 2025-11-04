import Footer from '../components/footer'
import Header from '../components/header'
import Abouthero from '../sections/Abouthero'
import FinaleCtaSection from '../sections/FinaleCtaSection'
import MagicAwaitsSection from '../sections/MagicAwaitsSection'
import VisionMissionSection from '../sections/Visionandmission'

export default function About() {
  return (
    <>
      <Header />
      <Abouthero />
      <VisionMissionSection/>
      <MagicAwaitsSection/>
      <FinaleCtaSection/>
      <Footer/>
    </>
  )
}
