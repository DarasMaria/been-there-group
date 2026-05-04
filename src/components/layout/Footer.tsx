'use client'

import Link from 'next/link'
import { MessageCircle, Mail, Phone } from 'lucide-react'

const catalogueLinks = [
  { href: '/rentals/3-seater-couches', label: '3 Seater Couches' },
  { href: '/rentals/2-seater-couches', label: '2 Seater Couches' },
  { href: '/rentals/1-seater-chairs', label: '1 Seater Chairs' },
  { href: '/rentals/cocktail-tables', label: 'Cocktail Tables' },
  { href: '/rentals/bar-reception-counters', label: 'Bar & Reception Counters' },
  { href: '/rentals', label: 'View Full Catalogue →' },
]

const companyLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/catalogue', label: 'Download Catalogue' },
]

const supportLinks = [
  { href: '/faq', label: 'FAQ' },
  { href: '/terms', label: 'Terms & Rental Policy' },
  { href: '/contact', label: 'Contact Us' },
  { href: '/quote-basket/request', label: 'Request a Quote' },
]

export default function Footer() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '27000000000'
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hi, I'd like to enquire about furniture rental.`

  return (
    <footer
      style={{
        backgroundColor: '#2C2C2A',
        color: '#E8E4DC',
        paddingTop: '64px',
        paddingBottom: '32px',
      }}
    >
      <div className="container">
        {/* Top Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '48px',
            paddingBottom: '48px',
            borderBottom: '1px solid rgba(232,228,220,0.15)',
          }}
        >
          {/* Brand */}
          <div>
            <Link
              href="/"
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: '22px',
                fontWeight: 400,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#FAFAF8',
                textDecoration: 'none',
                display: 'block',
                marginBottom: '16px',
              }}
            >
              Been There Group
            </Link>
            <p
              style={{
                fontSize: '13px',
                lineHeight: 1.7,
                color: 'rgba(232,228,220,0.7)',
                maxWidth: '260px',
                marginBottom: '24px',
              }}
            >
              Premium event furniture rental for beautifully produced spaces, delivered with professional execution. Serving Gauteng.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '12px',
                  color: '#A8926F',
                  textDecoration: 'none',
                  letterSpacing: '0.04em',
                }}
              >
                <MessageCircle size={14} />
                Enquire on WhatsApp
              </a>
              <a
                href="mailto:quotes@beentheregroup.co.za"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '12px',
                  color: 'rgba(232,228,220,0.6)',
                  textDecoration: 'none',
                }}
              >
                <Mail size={14} />
                quotes@beentheregroup.co.za
              </a>
            </div>
          </div>

          {/* Catalogue */}
          <div>
            <h4
              style={{
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#A8926F',
                marginBottom: '20px',
              }}
            >
              Catalogue
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {catalogueLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      fontSize: '13px',
                      color: 'rgba(232,228,220,0.7)',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#FAFAF8')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(232,228,220,0.7)')}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4
              style={{
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#A8926F',
                marginBottom: '20px',
              }}
            >
              Company
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      fontSize: '13px',
                      color: 'rgba(232,228,220,0.7)',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#FAFAF8')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(232,228,220,0.7)')}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4
              style={{
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#A8926F',
                marginBottom: '20px',
              }}
            >
              Support
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      fontSize: '13px',
                      color: 'rgba(232,228,220,0.7)',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#FAFAF8')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(232,228,220,0.7)')}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '28px',
          }}
        >
          <p style={{ fontSize: '12px', color: 'rgba(232,228,220,0.4)', margin: 0 }}>
            © {new Date().getFullYear()} Been There Group. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            <Link
              href="/terms"
              style={{ fontSize: '12px', color: 'rgba(232,228,220,0.4)', textDecoration: 'none' }}
            >
              Terms & Policy
            </Link>
            <Link
              href="/contact"
              style={{ fontSize: '12px', color: 'rgba(232,228,220,0.4)', textDecoration: 'none' }}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
