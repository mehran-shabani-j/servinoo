import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { SkipToContent } from "@/components/ui/accessible-icon"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "سرویسو - پلتفرم ارائه خدمات",
  description: "پلتفرم آنلاین برای یافتن و ارائه خدمات در ایران",
  generator: 'v0.dev',
  keywords: ['خدمات', 'ایران', 'متخصص', 'تعمیرات', 'آموزش', 'پزشکی'],
  authors: [{ name: 'سرویسو' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: "سرویسو - پلتفرم ارائه خدمات",
    description: "پلتفرم آنلاین برای یافتن و ارائه خدمات در ایران",
    type: 'website',
    locale: 'fa_IR',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className={inter.className}>
        <SkipToContent />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div id="app" className="min-h-screen">
            <main id="main-content" tabIndex={-1}>
              {children}
            </main>
          </div>
          <Toaster />
          <div id="live-region" aria-live="polite" aria-atomic="true" className="sr-only" />
        </ThemeProvider>
      </body>
    </html>
  )
}
