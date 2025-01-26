"use client"

import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit, Sen } from "next/font/google";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import Layout from "@/components/layout/Layout";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

// fonts and metadata
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const sen = Sen({
  variable: "--font-sen",
  subsets: ["latin"],
});

export const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "DoIt - Task Management",
//   description: "A modern task management application",
// };

// root layout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${sen.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
          themes={["light", "dark"]}
          value={{
            dark: "dark",
            light: "light",
          }}
        >
          <Layout>{children}</Layout>
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
