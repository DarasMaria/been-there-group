import Link from 'next/link'
import PageHero from '@/components/ui/PageHero'
import { Download, ArrowRight, FileText } from 'lucide-react'

export const metadata = {
  title: 'Download Catalogue',
  description: 'Download the Been There Group furniture rental catalogue and lookbook.',
}

export default function CataloguePage() {
  return (
    <>
      <PageHero
        label="Catalogue & Lookbook"
        title="Download our catalogue"
        subtitle="Get the full Been There Group product catalogue to browse offline, share with your planning team, or present to clients."
        centered
      />

      <section style={{ padding: '80px 0', backgroundColor: '#FAFAF8', flex: 1 }}>
        <div className="container">
          <div
            style={{
              maxWidth: '640px',
              margin: '0 auto',
            }}
          >
            {/* Catalogue card */}
            <div
              style={{
                backgroundColor: '#fff',
                border: '1px solid #E8E4DC',
                overflow: 'hidden',
                marginBottom: '24px',
              }}
            >
              {/* Preview */}
              <div
                style={{
                  backgroundColor: '#2C2C2A',
                  padding: '48px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '240px',
                }}
              >
                <FileText size={48} style={{ color: '#A8926F', marginBottom: '16px' }} />
                <h3
                  style={{
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: '28px',
                    fontWeight: 300,
                    color: '#FAFAF8',
                    textAlign: 'center',
                    letterSpacing: '0.04em',
                  }}
                >
                  Been There Group
                </h3>
                <p style={{ fontSize: '13px', color: 'rgba(232,228,220,0.6)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '4px' }}>
                  Product Catalogue & Lookbook
                </p>
              </div>

              <div style={{ padding: '32px' }}>
                <h2
                  style={{
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: '24px',
                    fontWeight: 400,
                    color: '#2C2C2A',
                    marginBottom: '12px',
                  }}
                >
                  Full Product Catalogue
                </h2>
                <p style={{ fontSize: '14px', color: '#6B6560', lineHeight: 1.8, marginBottom: '20px' }}>
                  Includes all rental categories: 3 & 2 seater couches, accent chairs, coffee & side tables, benches, ottomans, cocktail tables, cocktail chairs, and bar & reception counters. With product photography, specifications and style tags.
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    'Full product range across all 9 categories',
                    'Specifications: dimensions, material, colour',
                    'Style tags and event type suitability',
                    'Services overview',
                    'How to request a quote',
                  ].map((item) => (
                    <li key={item} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '13px', color: '#6B6560' }}>
                      <span style={{ color: '#8B7355', flexShrink: 0 }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div style={{ backgroundColor: '#FFF8F2', border: '1px solid #F0D9C0', padding: '16px', marginBottom: '24px', fontSize: '13px', color: '#8B7355' }}>
                  Our digital catalogue will be available for download here shortly. In the meantime, request a catalogue directly from our team.
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <a
                    href="mailto:quotes@beentheregroup.co.za?subject=Catalogue Request"
                    className="btn-primary"
                    style={{ justifyContent: 'center' }}
                  >
                    <Download size={16} />
                    Request Catalogue by Email
                  </a>
                  <p style={{ fontSize: '12px', color: '#A8926F', textAlign: 'center', fontStyle: 'italic' }}>
                    No sign-up required — we'll send the PDF directly.
                  </p>
                </div>
              </div>
            </div>

            {/* Online catalogue prompt */}
            <div
              style={{
                padding: '28px',
                backgroundColor: '#F2F0EB',
                border: '1px solid #D8D4CC',
                textAlign: 'center',
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-cormorant), Georgia, serif',
                  fontSize: '20px',
                  fontWeight: 400,
                  color: '#2C2C2A',
                  marginBottom: '8px',
                }}
              >
                Prefer to browse online?
              </h3>
              <p style={{ fontSize: '13px', color: '#6B6560', marginBottom: '20px' }}>
                Explore the full catalogue directly on our website — with filters, product detail pages and direct Add to Quote functionality.
              </p>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/rentals" className="btn-primary" style={{ padding: '12px 24px' }}>
                  Browse Online Catalogue <ArrowRight size={14} />
                </Link>
                <Link href="/quote-basket/request" className="btn-outline" style={{ padding: '12px 24px' }}>
                  Request a Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
