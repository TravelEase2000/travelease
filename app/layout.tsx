'use client';

import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/lib/auth-context"
import { Toaster } from "@/components/ui/toaster"
import { ErrorBoundary } from "@/components/error-boundary"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="travelease-theme"
        >
          <AuthProvider>
            <ErrorBoundary>
              <div className="relative flex min-h-screen flex-col bg-background">
                <Navbar />
                <main className="flex-1 container mx-auto px-4 py-6">
                  {children}
                </main>
                <Footer />
              </div>
            </ErrorBoundary>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  )
}

import './globals.css'