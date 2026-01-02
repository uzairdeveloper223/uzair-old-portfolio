'use client';

import { Instagram, Facebook, Send, Twitter, Github } from "lucide-react"

import { useIsMobile } from "@/hooks/use-mobile";

export default function ContactSection() {
  const isMobile = useIsMobile();
  
  const emails = [
    "contact@uzair.is-a.dev",
    "uzairdeveloper@proton.me",
    "uzairdeveloper@hotmail.com",
    "uzairdeveloper@atomicmail.io",
    "developer.uzair223@gmail.com",
  ]

  const socialLinks = [
    { name: "Instagram", url: "https://www.instagram.com/mughal_x22", icon: Instagram },
    { name: "Facebook", url: "https://www.facebook.com/mughal.x22", icon: Facebook },
    { name: "Telegram", url: "https://t.me/mughal_x22", icon: Send },
    { name: "X", url: "https://twitter.com/mughal_x22", icon: Twitter },
    { name: "GitHub", url: "https://github.com/uzairdeveloper223", icon: Github },
  ]

  return (
    <section id="contact" className="py-12 md:py-24 bg-panel/40 border-t border-line/40">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="reveal font-display text-2xl md:text-4xl text-center md:text-left">
          Get in <span className="text-neon">Touch</span>
        </h2>

        <div className="mt-6 md:mt-8 grid md:grid-cols-2 gap-4 md:gap-6">
          <div className="reveal tilt p-4 md:p-6 rounded-2xl bg-panel border border-line">
            <p className="text-gray-300 text-sm md:text-base">Prefer email? Choose any:</p>
            <ul className="mt-2 md:mt-3 text-sm text-gray-400 space-y-2">
              {emails.map((email, index) => (
                <li key={index}>
                  <a 
                    className={`${email.includes('is-a.dev') ? 'is-a-dev-email' : 'link-underline hover:text-white'} break-all`} 
                    href={`mailto:${email}`}
                  >
                    {email.includes('is-a.dev') ? (
                      <>
                        contact@uzair.is-a.dev
                      </>
                    ) : (
                      email
                    )}
                  </a>
                </li>
              ))}
            </ul>

            <div className={`mt-4 flex flex-wrap gap-3 md:gap-4 text-gray-400 ${isMobile ? 'justify-center' : ''}`}>
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon
                return (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover-burst inline-flex items-center gap-2 hover:text-neon text-sm md:text-base"
                  >
                    <IconComponent className="w-4 h-4" />
                    {isMobile ? null : social.name}
                  </a>
                )
              })}
            </div>
          </div>

          <form
            className="reveal tilt p-4 md:p-6 rounded-2xl bg-panel border border-line"
            action="https://formsubmit.co/contact@uzair.is-a.dev"
            method="POST"
          >
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />

            <div className="grid gap-3 md:gap-4">
              <div className="relative">
                <input
                  name="name"
                  placeholder="Your name"
                  className="w-full bg-bg border border-line rounded-xl px-4 py-2.5 md:py-3 focus:outline-none focus:border-neon/70 text-sm md:text-base"
                  required
                />
              </div>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  className="w-full bg-bg border border-line rounded-xl px-4 py-2.5 md:py-3 focus:outline-none focus:border-neon/70 text-sm md:text-base"
                  required
                />
              </div>
              <div className="relative">
                <textarea
                  name="message"
                  rows={isMobile ? 3 : 4}
                  placeholder="Your message"
                  className="w-full bg-bg border border-line rounded-xl px-4 py-2.5 md:py-3 focus:outline-none focus:border-neon/70 text-sm md:text-base"
                  required
                />
              </div>
              <button
                className="hover-burst inline-flex items-center justify-center gap-2 px-4 py-2.5 md:py-3 rounded-xl bg-neon/10 border border-neon text-neon hover:text-white hover:bg-neon/20 hover:shadow-neon-strong transition text-sm md:text-base"
                type="submit"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
