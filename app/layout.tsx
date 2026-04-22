import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import '@/styles/tokens.css'
import './globals.css'

/*
 * Typefaces — truly self-hosted via next/font/local.
 *
 * Source woff2 files are committed under `public/fonts/` and loaded at
 * build time with hashing. No runtime dependency on fonts.googleapis
 * or fonts.gstatic. Subset: latin only (covers basic + Latin-1
 * supplement + the punctuation block we use: em-dash, curly quotes,
 * section sign).
 *
 * To add a weight: drop the woff2 file in the right subdir, add a
 * `src` entry in the relevant block below. Keep these in sync with
 * the `--font-*` custom properties in `styles/tokens.css`.
 */

const fontCardo = localFont({
  src: [
    { path: '../public/fonts/cardo/cardo-400.woff2',        weight: '400', style: 'normal' },
    { path: '../public/fonts/cardo/cardo-400-italic.woff2', weight: '400', style: 'italic' },
    { path: '../public/fonts/cardo/cardo-700.woff2',        weight: '700', style: 'normal' },
  ],
  variable: '--font-cardo',
  display: 'swap',
})

const fontGaramond = localFont({
  src: [
    { path: '../public/fonts/eb-garamond/eb-garamond-400.woff2',        weight: '400', style: 'normal' },
    { path: '../public/fonts/eb-garamond/eb-garamond-400-italic.woff',  weight: '400', style: 'italic' },
    { path: '../public/fonts/eb-garamond/eb-garamond-500.woff2',        weight: '500', style: 'normal' },
    { path: '../public/fonts/eb-garamond/eb-garamond-700.woff2',        weight: '700', style: 'normal' },
  ],
  variable: '--font-garamond',
  display: 'swap',
})

const fontFell = localFont({
  src: [
    { path: '../public/fonts/im-fell-english/im-fell-english-400.woff2',        weight: '400', style: 'normal' },
    { path: '../public/fonts/im-fell-english/im-fell-english-400-italic.woff2', weight: '400', style: 'italic' },
  ],
  variable: '--font-fell',
  display: 'swap',
})

const fontUnifraktur = localFont({
  src: [
    { path: '../public/fonts/unifraktur-maguntia/unifraktur-maguntia-400.woff2', weight: '400', style: 'normal' },
  ],
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
