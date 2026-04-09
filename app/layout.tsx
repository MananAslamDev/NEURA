import type React from "react"
import type { Metadata } from "next"
import { Poppins, Outfit } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
})

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
})

export const metadata: Metadata = {
  title: "NEURA - Advanced AI Voice Agents",
  description: "24/7 AI Voice Receptionist Agents for Modern Businesses",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="%239333ea"/><text transform="translate(50 54)" text-anchor="middle" dominant-baseline="central" font-family="sans-serif" font-weight="900" font-size="65" fill="%23ffffff">N</text></svg>',
        type: "image/svg+xml",
      }
    ]
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${outfit.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <Suspense fallback={<div>Loading...</div>}>
            {children}
            <Analytics />
            <Toaster position="bottom-right" />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
