import HomeHero from '@/app/sections/homehero'
import Header from '@/app/components/header'
import NarrativeSection from '@/app/sections/NarrativeSection'
import WondersSection from './sections/WondersSection'
import PraiseSection from './sections/PraiseSection'

export default function Home() {
  return (
    <main>
      <Header/>
      <HomeHero />
      <NarrativeSection/>
      <WondersSection/>
      <PraiseSection/>
    </main>
  )
}
