import type React from "react"
import { Orbitron, Poppins } from "next/font/google"
import "./globals.css"
import LoadingScreen from "@/components/loading-screen"

const orbitron = Orbitron({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-orbitron",
  weight: ["500", "700"],
})

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["300", "400", "600", "700"],
})

export const metadata = {
  title: "Uzair — Full‑Stack Developer & Blockchain Enthusiast",
  description:
    "Passionate Full‑Stack Developer with a love for programming and gaming. I craft UI/UX, scalable backends, web/mobile apps, and Ethereum‑based dApps.",
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "any" },
      { url: "/favicon.png", type: "image/x-icon" },
    ],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  generator: 'Uzair'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${orbitron.variable} ${poppins.variable} antialiased`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className="bg-bg text-gray-200 selection:bg-neon/20 selection:text-white relative">
        <LoadingScreen />
        <div className="max-w-full overflow-hidden">
          {children}
        </div>
      </body>
    </html>
  )
}
