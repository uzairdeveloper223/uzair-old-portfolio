import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import SkillsSection from "@/components/skills-section"
import WebsitesSection from "@/components/websites-section"
import ProjectsSection from "@/components/projects-section"
import InterestsSection from "@/components/interests-section"
import ContactSection from "@/components/contact-section"
import ParticleAnimation from "@/components/particle-animation"
import CursorEffects from "@/components/cursor-effects"
import InteractiveEffects from "@/components/interactive-effects"

export default function Home() {
  return (
    <>
      {/* Effects - conditionally render based on device */}
      <div className="hidden md:block">
        <ParticleAnimation />
        <CursorEffects />
        <InteractiveEffects />
      </div>

      <Header />
      <main className="px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <HeroSection />
        <SkillsSection />
        <WebsitesSection />
        <ProjectsSection />
        <InterestsSection />
        <ContactSection />
      </main>

      <footer className="py-6 md:py-8 text-center text-xs text-gray-500 px-4">
        <span className="hidden md:inline">Built with ❤️ | Press <kbd>U Z A I R</kbd> or try the Konami Code 😉</span>
        <span className="md:hidden">Built with ❤️ by Uzair</span>
      </footer>
    </>
  )
}
