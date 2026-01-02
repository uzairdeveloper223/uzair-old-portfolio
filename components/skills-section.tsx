import { Code2, Computer, Settings } from "lucide-react"

export default function SkillsSection() {
  return (
    <section id="skills" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="reveal font-display text-3xl md:text-4xl text-white">
          Technical <span className="text-neon">Skills</span>
        </h2>

        <div className="mt-10 grid md:grid-cols-3 gap-6">
          <div className="reveal tilt p-6 rounded-2xl bg-panel/60 border border-line hover:border-neon/50 hover:shadow-neon">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <Code2 className="w-5 h-5 text-neon" />
              Languages
            </h3>
            <ul className="mt-4 text-gray-300 grid grid-cols-2 gap-y-1 text-sm">
              <li>Java</li>
              <li>Rust</li>
              <li>JavaScript</li>
              <li>HTML</li>
              <li>CSS</li>
              <li>Python</li>
              <li>Bash</li>
              <li>Lua</li>
              <li>XML</li>
              <li>PHP</li>
            </ul>
          </div>

          <div className="reveal tilt p-6 rounded-2xl bg-panel/60 border border-line hover:border-neon/50 hover:shadow-neon">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <Computer className="w-5 h-5 text-neon" />
              Operating Systems
            </h3>
            <ul className="mt-4 text-gray-300 grid grid-cols-2 gap-y-1 text-sm">
              <li>Ubuntu</li>
              <li>Garuda Linux</li>
              <li>Bazzite</li>
              <li>Debian</li>
              <li>Kali Linux</li>
              <li>ParrotOS</li>
              <li>MintOS</li>
              <li>Manjaro</li>
              <li>Arch Linux</li>
              <li>Fedora</li>
              <li>…and more</li>
            </ul>
          </div>

          <div className="reveal tilt p-6 rounded-2xl bg-panel/60 border border-line hover:border-neon/50 hover:shadow-neon">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <Settings className="w-5 h-5 text-neon" />
              Frameworks & Tools
            </h3>
            <ul className="mt-4 text-gray-300 grid grid-cols-2 gap-y-1 text-sm">
              <li>VS Code</li>
              <li>Node.js</li>
              <li>Cloudflare</li>
              <li>IntelliJ</li>
              <li>Godot</li>
              <li>GitHub</li>
              <li>Nmap</li>
              <li>Wireshark</li>
              <li>Termux / X11 / API</li>
              <li>Burp Suite</li>
            </ul>
            <div className="mt-4 text-gray-400 text-sm">
              Stacks: Next.js/Node · Android (Java/XML/Compose) · GTK + Python (gi)
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
