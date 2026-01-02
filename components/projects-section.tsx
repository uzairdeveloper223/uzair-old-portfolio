import { Flame, Lock, Coins, CheckSquare } from "lucide-react"

export default function ProjectsSection() {
  const projects = [
    {
      name: "FireGram",
      description:
        "A web app similar to Instagram with search, media uploads, likes, comments, and a full notification system.",
      icon: Flame,
      url: "https://firegram-social-app.vercel.app/",
    },
    {
      name: "Mystery Mart",
      description: "An e‑commerce platform.",
      icon: Lock,
      url: "https://mystery-mart-app-app.vercel.app/",
    },
    {
      name: "UZT Token",
      description: "Developing an Ethereum meme coin on the Sepolia testnet.",
      icon: Coins,
      url: "https://sepolia.etherscan.io/token/0xd34a92111268942311eb8ca207a9091f12d2ef3a",
    },
    {
      name: "UZT Todo",
      description: "Earn UZT by creating todos, airdrops, and referrals on Sepolia testnet.",
      icon: CheckSquare,
      url: "https://uzt-todo.rf.gd",
    },
  ]

  return (
    <section id="projects" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="reveal font-display text-3xl md:text-4xl">
          Notable <span className="text-neon">Projects</span>
        </h2>

        <div className="mt-10 grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => {
            const IconComponent = project.icon
            return (
              <div
                key={index}
                className="reveal tilt p-6 rounded-2xl bg-panel border border-line group hover:border-neon/60 hover:shadow-neon"
              >
                <div className="flex items-center gap-2">
                  <IconComponent className="w-5 h-5 text-neon" />
                  <h3 className="font-semibold">{project.name}</h3>
                </div>
                <p className="mt-2 text-sm text-gray-400">{project.description}</p>
                <div className="mt-4 flex justify-end">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover-burst inline-flex items-center gap-2 px-4 py-2 text-sm rounded-xl border border-neon/40 text-neon hover:text-white hover:border-neon hover:shadow-neon-strong transition-all"
                  >
                    View Project
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
