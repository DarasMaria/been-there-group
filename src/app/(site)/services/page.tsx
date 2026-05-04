import Link from 'next/link'
import PageHero from '@/components/ui/PageHero'
import { Truck, Settings, Users, Palette, Layout, Search, Star, ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Services',
  description: 'Full-service event furniture rental including delivery, setup, styling support and bespoke sourcing.',
}

const services = [
  {
    icon: Truck,
    title: 'Delivery & Collection',
    description:
      'We handle all logistics — from our warehouse to your venue and back. White-glove delivery and careful collection, so you can focus on your event.',
    detail: 'Available across Gauteng. Delivery pricing quoted based on event location and quantity.',
  },
  {
    icon: Settings,
    title: 'Setup & Strike',
    description:
      'Our on-site crew will professionally install and arrange all hired furniture according to your event layout, and pack everything down after your event ends.',
    detail: 'Available as a standalone service or combined with delivery. Timing coordinated around your event schedule.',
  },
  {
    icon: Users,
    title: 'On-Site Crew',
    description:
      'For larger events or productions requiring hands-on management, our experienced crew can be on-site throughout your event to assist with furniture management.',
    detail: 'Available for full-day, half-day or partial event coverage.',
  },
  {
    icon: Palette,
    title: 'Styling Support',
    description:
      'Need guidance on how to arrange and style the furniture for maximum visual impact? Our team provides event layout planning and on-site styling direction.',
    detail: 'Ideal for weddings, brand activations and high-end corporate events.',
  },
  {
    icon: Layout,
    title: 'Event Layout Planning',
    description:
      'Before your event, we can assist with layout and floorplan consultation to ensure the furniture selection works for your space, flow and aesthetic.',
    detail: 'Provided as part of the quote consultation process for larger productions.',
  },
  {
    icon: Search,
    title: 'Custom Sourcing',
    description:
      'Need something not in our standard catalogue? We can source specific pieces or custom quantities for unique event requirements.',
    detail: 'Subject to availability and lead times. Discussed during the quote process.',
  },
  {
    icon: Star,
    title: 'Branded Hospitality Builds',
    description:
      'We design and build complete branded hospitality environments — from bar builds and reception areas to full lounge spaces with custom finishes.',
    detail: 'Available for corporate clients, brand activations, and partner-brand events.',
  },
]

const process = [
  { step: '01', title: 'Enquire', description: 'Submit a quote request or reach out via WhatsApp or email to discuss your event.' },
  { step: '02', title: 'Quote', description: 'We issue a formal, itemised quote based on your event requirements, location and dates.' },
  { step: '03', title: 'Confirm', description: 'Once the quote is approved, we confirm booking with a deposit and delivery coordination.' },
  { step: '04', title: 'Deliver', description: 'Our team handles delivery, setup and strike — leaving you free to focus on the event.' },
]

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="Our Offering"
        title="More than furniture rental"
        subtitle="Been There Group provides end-to-end event furniture solutions — from catalogue browsing through to delivery, setup, styling and collection."
      />

      {/* Services Grid */}
      <section style={{ padding: '80px 0', backgroundColor: '#FAFAF8', flex: 1 }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '2px',
              backgroundColor: '#E8E4DC',
            }}
          >
            {services.map(({ icon: Icon, title, description, detail }) => (
              <div
                key={title}
                style={{
                  backgroundColor: '#FAFAF8',
                  padding: '40px 36px',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: '#F2F0EB',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px',
                  }}
                >
                  <Icon size={20} style={{ color: '#8B7355' }} />
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: '22px',
                    fontWeight: 400,
                    color: '#2C2C2A',
                    marginBottom: '12px',
                  }}
                >
                  {title}
                </h3>
                <p style={{ fontSize: '14px', color: '#6B6560', lineHeight: 1.75, marginBottom: '12px' }}>
                  {description}
                </p>
                <p style={{ fontSize: '12px', color: '#A8926F', fontStyle: 'italic', lineHeight: 1.6 }}>
                  {detail}
                </p>
              </div>
            ))}
          </div>

          {/* Process */}
          <div
            style={{
              marginTop: '80px',
              padding: '60px 48px',
              backgroundColor: '#F2F0EB',
              border: '1px solid #D8D4CC',
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <span className="section-label">How It Works</span>
              <h2
                style={{
                  fontFamily: 'var(--font-cormorant), Georgia, serif',
                  fontSize: 'clamp(28px, 3vw, 40px)',
                  fontWeight: 300,
                  color: '#2C2C2A',
                }}
              >
                From enquiry to event day
              </h2>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '32px',
              }}
            >
              {process.map((p) => (
                <div key={p.step} style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-cormorant), Georgia, serif',
                      fontSize: '52px',
                      fontWeight: 300,
                      color: '#D8D4CC',
                      marginBottom: '12px',
                      lineHeight: 1,
                    }}
                  >
                    {p.step}
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-cormorant), Georgia, serif',
                      fontSize: '20px',
                      fontWeight: 400,
                      color: '#2C2C2A',
                      marginBottom: '8px',
                    }}
                  >
                    {p.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#6B6560', lineHeight: 1.7 }}>{p.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center', marginTop: '64px' }}>
            <h2
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 'clamp(28px, 3.5vw, 44px)',
                fontWeight: 300,
                color: '#2C2C2A',
                marginBottom: '16px',
              }}
            >
              Ready to get started?
            </h2>
            <p style={{ fontSize: '15px', color: '#6B6560', maxWidth: '440px', margin: '0 auto 32px', lineHeight: 1.7 }}>
              Browse our catalogue, build your quote, or contact us directly to discuss your event requirements.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/quote-basket/request" className="btn-primary">
                Request a Quote <ArrowRight size={16} />
              </Link>
              <Link href="/rentals" className="btn-outline">
                Browse Rentals
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
