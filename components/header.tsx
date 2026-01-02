'use client';

import { useState, useEffect } from "react"
import { Codesandbox, Mail, Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY
      
      // Show header in these cases:
      // 1. Scrolling up
      // 2. At the top of the page
      // 3. Menu is open
      if (currentScrollY <= 0 || currentScrollY < lastScrollY || isMenuOpen) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', controlHeader)
    return () => window.removeEventListener('scroll', controlHeader)
  }, [lastScrollY, isMenuOpen])

  const menuItems = [
    { href: "#home", label: "Home" },
    { href: "#skills", label: "Skills" },
    { href: "#websites", label: "Websites" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ]

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-bg/60 border-b border-line/40"
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : '-100%' }}
      transition={{ duration: 0.3 }}>
      <nav className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2 text-neon font-display tracking-widest text-lg">
          <Codesandbox className="w-5 h-5" />
          <span>
            UZ<span className="text-white">AIR</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-6 text-sm">
          {menuItems.map((item) => (
            <li key={item.href}>
              <a className="link-underline hover:text-white" href={item.href}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="mailto:contact@uzair.is-a.dev"
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-neon/40 hover:border-neon hover:shadow-neon-strong transition hover-burst"
        >
          <Mail className="w-4 h-4" />
          <span className="text-sm">Say Salam</span>
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-neon hover:text-white transition-colors"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 right-0 bg-bg border-b border-line/40"
          >
            <nav className="px-4 py-4 flex flex-col gap-4">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm py-2 px-4 hover:text-neon transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="mailto:contact@uzair.is-a.dev"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-3 mt-2 rounded-xl border border-neon/40 hover:border-neon hover:shadow-neon text-neon transition-all"
              >
                <Mail className="w-4 h-4" />
                <span className="text-sm">Say Salam</span>
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
