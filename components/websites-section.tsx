import { MessageCircle, Flame, Lock, BookOpen, User, CheckSquare } from "lucide-react"

export default function WebsitesSection() {
  const websites = [
    {
      name: "ChatX",
      description: "Online chat platform",
      url: "http://chatx.infy.uk",
      icon: MessageCircle,
    },
    {
      name: "Firegram",
      description: "Instagram‑like social app",
      url: "https://firegram-social-app.vercel.app/",
      icon: Flame,
    },
    {
      name: "Mystery Mart",
      description: "E‑commerce platform",
      url: "https://mystery-mart-app-app.vercel.app/",
      icon: Lock,
    },
    {
      name: "Noor-e-Quran",
      description: "Quran Reading and Listening Web App",
      url: "http://uzair.ct.ws/Noor-e-Quran/index.html",
      icon: BookOpen,
    },
    {
      name: "Personal Website",
      description: "Uzair's personal hub",
      url: "https://uzair-dev-mu.vercel.app/",
      icon: User,
    },
    {
      name: "UZT Todo",
      description: "To‑do with blockchain rewards",
      url: "https://uzt-todo.rf.gd",
      icon: CheckSquare,
    },
  ]

  return (
    <section id="websites" className="py-16 md:py-24 border-y border-line/40 bg-panel/40">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="reveal font-display text-3xl md:text-4xl">
          Featured <span className="text-neon">Websites</span>
        </h2>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {websites.map((website, index) => {
            const IconComponent = website.icon
            return (
              <div
                key={index}
                className="reveal tilt p-6 rounded-2xl bg-panel border border-line group hover:border-neon/60 hover:shadow-neon"
              >
                <div className="flex items-center gap-2 text-gray-300">
                  <IconComponent className="w-5 h-5 text-neon" />
                  <span className="font-semibold">{website.name}</span>
                </div>
                <p className="mt-2 text-sm text-gray-400">{website.description}</p>
                <div className="mt-4 flex justify-end">
                  <a
                    href={website.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover-burst inline-flex items-center gap-2 px-4 py-2 text-sm rounded-xl border border-neon/40 text-neon hover:text-white hover:border-neon hover:shadow-neon-strong transition-all"
                  >
                    Visit Website
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
