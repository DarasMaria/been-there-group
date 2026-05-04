import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import { QuoteBasketProvider } from '@/context/QuoteBasketContext'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Been There Group | Premium Event Furniture Rental — Gauteng',
    template: '%s | Been There Group',
  },
  description:
    'Premium event furniture rental for beautifully produced spaces. Serving Gauteng — corporates, agencies, venues and private clients.',
  keywords: [
    'event furniture rental',
    'Gauteng',
    'furniture hire',
    'corporate events',
    'wedding furniture',
    'lounge furniture rental',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    siteName: 'Been There Group',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body>
        <QuoteBasketProvider>{children}</QuoteBasketProvider>
      </body>
    </html>
  )
}
