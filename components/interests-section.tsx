import { Gamepad2, Laptop, Coins, BookOpen, Feather } from "lucide-react"

export default function InterestsSection() {
  const interests = [
    {
      name: "Gaming",
      description: "GTA: San Andreas, Naxeex games, PUBG Mobile, and more.",
      icon: Gamepad2,
    },
    {
      name: "Tech & Development",
      description: "Web apps, game modding, colorful UI design.",
      icon: Laptop,
    },
    {
      name: "Blockchain Development",
      description: "Ethereum testnet projects, token creation.",
      icon: Coins,
    },
    {
      name: "Islamic Teachings",
      description: "Oneness of Allah; finality of Prophet Muhammad (S.A.W).",
      icon: BookOpen,
    },
    {
      name: "Poetry",
      description: "Favorite poet: Allama Iqbal.",
      icon: Feather,
    },
  ]

  return (
    <section className="py-16 md:py-24 border-t border-line/40">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="reveal font-display text-3xl md:text-4xl">
          Interests & <span className="text-neon">Hobbies</span>
        </h2>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {interests.map((interest, index) => {
            const IconComponent = interest.icon
            return (
              <div
                key={index}
                className="reveal tilt p-6 rounded-2xl bg-panel/60 border border-line hover:border-neon/50"
              >
                <div className="flex items-center gap-2">
                  <IconComponent className="w-5 h-5 text-neon" />
                  <h3 className="font-semibold">{interest.name}</h3>
                </div>
                <p className="mt-2 text-sm text-gray-400">{interest.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
