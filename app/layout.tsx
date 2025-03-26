import type React from "react"
import type { Metadata } from "next"
import { Anek_Bangla as FontBangla, Inter } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/components/auth-provider"
import { AIProvider } from "@/components/ai/ai-provider"
import { GitHubProvider } from "@/components/github/github-provider"

const fontBangla = FontBangla({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-bangla",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "OctaActions - AI-Powered Development Platform",
  description: "A modern browser-based code editor with AI integration, GitHub connectivity, and multilingual support",
  icons: {
    icon: "/favicon.ico",
  },
  generator: 'OctaActions Platform'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link href="https://fonts.cdnfonts.com/css/li-ador-noirrit?styles=87152" rel="stylesheet" />
        </head>
        <body className={cn("min-h-screen bg-background font-sans antialiased", inter.variable, fontBangla.variable)}>
          <AuthProvider>
            <AIProvider>
              <GitHubProvider>
                <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
                  {children}
                  <Toaster />
                </ThemeProvider>
              </GitHubProvider>
            </AIProvider>
          </AuthProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}