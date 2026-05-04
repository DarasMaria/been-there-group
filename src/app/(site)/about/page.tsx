import Link from 'next/link'
import PageHero from '@/components/ui/PageHero'
import { ArrowRight, CheckCircle } from 'lucide-react'

export const metadata = {
  title: 'About Us',
  description: 'Learn about Been There Group — a premium event furniture rental business serving the Gauteng events market.',
}

const values = [
  {
    title: 'Premium, not pretentious',
    description:
      'We believe premium events deserve premium furniture. Our catalogue is carefully curated to reflect current design trends while remaining functional and durable for real event environments.',
  },
  {
    title: 'Operationally serious',
    description:
      'Events run on time or they fail. We approach every booking with the operational rigour required to ensure furniture is delivered, set up, and collected exactly as planned.',
  },
  {
    title: 'Built for professionals',
    description:
      'We primarily serve event planners, agencies, corporate clients and venues. Our systems, quoting process and communication are designed to work efficiently alongside production teams.',
  },
  {
    title: 'Transparent process',
    description:
      "We don't publish prices online — because pricing depends on your specific event. What we do guarantee is a formal, itemised quote, clearly communicated and professionally delivered.",
  },
]

const clients = [
  'Event Planners & Production Companies',
  'Corporate Marketing & Events Teams',
  'Advertising & Brand Agencies',
  'Wedding Planners & Coordinators',
  'Venues & Hospitality Groups',
  'Direct Private Clients',
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="Who We Are"
        title="Been There Group"
        subtitle="A premium furniture rental business serving the Gauteng events market. Built for planners, agencies, venues and corporate clients who expect professional execution."
      />

      {/* Story */}
      <section style={{ padding: '80px 0', backgroundColor: '#FAFAF8', flex: 1 }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '80px',
              alignItems: 'start',
            }}
          >
            <div>
              <span className="section-label">Our Story</span>
              <h2
                style={{
                  fontFamily: 'var(--font-cormorant), Georgia, serif',
                  fontSize: 'clamp(28px, 3.5vw, 44px)',
                  fontWeight: 300,
                  color: '#2C2C2A',
                  marginBottom: '24px',
                }}
              >
                Furniture built for<br />beautiful events
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <p style={{ fontSize: '15px', color: '#6B6560', lineHeight: 1.8 }}>
                  Been There Group was founded with a clear purpose: to bring premium furniture rental to the Gauteng events market with the operational professionalism that event planners and corporate clients actually need.
                </p>
                <p style={{ fontSize: '15px', color: '#6B6560', lineHeight: 1.8 }}>
                  Too often, furniture hire means compromise — uninspiring pieces, unreliable logistics or a mismatch between what was promised and what was delivered. We built Been There Group to change that.
                </p>
                <p style={{ fontSize: '15px', color: '#6B6560', lineHeight: 1.8 }}>
                  Every piece in our catalogue has been selected for its design quality, durability and event-suitability. Every booking is handled with precision — from the first quote to final collection.
                </p>
              </div>
            </div>

            <div>
              <span className="section-label">What Makes Us Different</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '20px' }}>
                {values.map((v) => (
                  <div key={v.title} style={{ paddingBottom: '24px', borderBottom: '1px solid #E8E4DC' }}>
                    <h3
                      style={{
                        fontFamily: 'var(--font-cormorant), Georgia, serif',
                        fontSize: '20px',
                        fontWeight: 500,
                        color: '#2C2C2A',
                        marginBottom: '8px',
                      }}
                    >
                      {v.title}
                    </h3>
                    <p style={{ fontSize: '14px', color: '#6B6560', lineHeight: 1.75 }}>{v.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who we serve */}
      <section style={{ padding: '80px 0', backgroundColor: '#F2F0EB', borderTop: '1px solid #D8D4CC', borderBottom: '1px solid #D8D4CC' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '64px',
              alignItems: 'center',
            }}
          >
            <div>
              <span className="section-label">Who We Serve</span>
              <h2
                style={{
                  fontFamily: 'var(--font-cormorant), Georgia, serif',
                  fontSize: 'clamp(28px, 3.5vw, 44px)',
                  fontWeight: 300,
                  color: '#2C2C2A',
                  marginBottom: '16px',
                }}
              >
                Built for the events industry
              </h2>
              <p style={{ fontSize: '15px', color: '#6B6560', lineHeight: 1.8, maxWidth: '400px' }}>
                We work with the full range of professionals and clients who produce and plan events across Gauteng.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {clients.map((client) => (
                <div
                  key={client}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '16px 20px',
                    backgroundColor: '#fff',
                    border: '1px solid #E8E4DC',
                  }}
                >
                  <CheckCircle size={16} style={{ color: '#8B7355', flexShrink: 0 }} />
                  <span style={{ fontSize: '14px', color: '#2C2C2A' }}>{client}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Commercial positioning */}
      <section style={{ padding: '80px 0', backgroundColor: '#2C2C2A' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(28px, 4vw, 52px)',
              fontWeight: 300,
              color: '#FAFAF8',
              marginBottom: '16px',
            }}
          >
            No prices online — by design
          </h2>
          <p
            style={{
              fontSize: '16px',
              color: 'rgba(232,228,220,0.7)',
              maxWidth: '560px',
              margin: '0 auto 40px',
              lineHeight: 1.75,
            }}
          >
            We don't display pricing because every quote is different. Your event date, location, quantities, services required and specific pieces all determine the final price. We issue a formal, itemised quote for every enquiry.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/quote-basket/request" className="btn-primary">
              Request a Quote <ArrowRight size={16} />
            </Link>
            <Link href="/rentals"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 28px',
                fontSize: '13px',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#FAFAF8',
                border: '1px solid rgba(232,228,220,0.3)',
                textDecoration: 'none',
              }}
            >
              Browse Catalogue
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
