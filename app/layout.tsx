import type { Metadata } from 'next'
import {
  Cardo,
  EB_Garamond,
  IM_Fell_English,
  UnifrakturMaguntia,
} from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import '@/styles/tokens.css'
import './globals.css'

/*
 * Typefaces (self-hosted via next/font/google — downloaded to the build
 * output, served from our origin; no runtime requests to fonts.googleapis).
 *
 * Family   | Role                                         | Weights
 * ---------|----------------------------------------------|----------
 * Cardo    | Vampire Court, formal display, site wordmark | 400, 700
 * Garamond | Necromancer Academy, humanistic long-form    | 400 i, 500, 700
 * Fell     | Living Resistance + default body             | 400 + 400 i
 * Fraktur  | Pale King display only (never body)          | 400
 */

const fontCardo = Cardo({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cardo',
  display: 'swap',
})

const fontGaramond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-garamond',
  display: 'swap',
})

const fontFell = IM_Fell_English({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-fell',
  display: 'swap',
})

const fontUnifraktur = UnifrakturMaguntia({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-unifraktur',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://gravenspire.com'),
  title: {
    default: 'Gravenspire — The Archive',
    template: '%s — Gravenspire',
  },
  description:
    'A small gothic MMO, still being written. Working documents from the city — faction notices, design notes, and the weekly devlog.',
  openGraph: {
    title: 'Gravenspire — The Archive',
    description:
      'A small gothic MMO, still being written. Working documents from the city.',
    url: 'https://gravenspire.com',
    siteName: 'Gravenspire',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Gravenspire — The Archive',
    description:
      'A small gothic MMO, still being written. Working documents from the city.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport = {
  themeColor: '#2E2B29',
  colorScheme: 'dark' as const,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const fontVariables = [
    fontFell.variable,
    fontCardo.variable,
    fontGaramond.variable,
    fontUnifraktur.variable,
  ].join(' ')

  return (
    <html lang="en" className={fontVariables}>
      <body>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
