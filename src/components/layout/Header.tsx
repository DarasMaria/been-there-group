'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, ShoppingBag } from 'lucide-react'
import { useQuoteBasket } from '@/context/QuoteBasketContext'

const navLinks = [
  { href: '/rentals', label: 'Rentals' },
  { href: '/services', label: 'Services' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { totalItems } = useQuoteBasket()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: scrolled ? 'rgba(250, 250, 248, 0.97)' : '#FAFAF8',
        borderBottom: '1px solid #D8D4CC',
        backdropFilter: scrolled ? 'blur(8px)' : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
          {/* Logo */}
          <Link
            href="/"
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: '20px',
              fontWeight: 500,
              letterSpacing: '0.08em',
              color: '#2C2C2A',
              textDecoration: 'none',
              textTransform: 'uppercase',
            }}
          >
            Been There Group
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', gap: '32px', alignItems: 'center' }} className="hidden-mobile">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: '12px',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#6B6560',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#2C2C2A')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#6B6560')}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Quote Basket */}
            <Link
              href="/quote-basket"
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: '#2C2C2A',
                textDecoration: 'none',
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              <ShoppingBag size={18} />
              <span className="hidden-mobile">Quote Basket</span>
              {totalItems > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    backgroundColor: '#8B7355',
                    color: '#fff',
                    borderRadius: '50%',
                    width: '18px',
                    height: '18px',
                    fontSize: '10px',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    lineHeight: 1,
                  }}
                >
                  {totalItems}
                </span>
              )}
            </Link>

            {/* CTA */}
            <Link href="/quote-basket/request" className="btn-primary hidden-mobile" style={{ padding: '10px 20px' }}>
              Build Your Quote
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#2C2C2A',
                padding: '4px',
              }}
              className="show-mobile"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            backgroundColor: '#FAFAF8',
            borderTop: '1px solid #D8D4CC',
            padding: '24px',
          }}
        >
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  padding: '14px 0',
                  fontSize: '14px',
                  fontWeight: 400,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: '#2C2C2A',
                  textDecoration: 'none',
                  borderBottom: '1px solid #E8E4DC',
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/quote-basket/request"
              onClick={() => setMenuOpen(false)}
              className="btn-primary"
              style={{ marginTop: '20px', justifyContent: 'center' }}
            >
              Build Your Quote
            </Link>
          </nav>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
          .hidden-mobile { display: flex !important; }
        }
      `}</style>
    </header>
  )
}
