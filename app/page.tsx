import HomeHero from '@/app/sections/homehero'
import Header from '@/app/components/header'
import NarrativeSection from '@/app/sections/NarrativeSection'
import WondersSection from './sections/WondersSection'
import PraiseSection from './sections/PraiseSection'
import MysticPortal from './sections/MysticPortal'
import Footer from './components/footer'

export default function Home() {
  return (
    <main>
      <Header/>
      <HomeHero />
      <NarrativeSection/>
      <WondersSection/>
      <MysticPortal/>
      <PraiseSection/>
      <Footer/>
    </main>
  )
}
