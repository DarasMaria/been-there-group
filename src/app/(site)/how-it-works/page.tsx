import Link from 'next/link'
import PageHero from '@/components/ui/PageHero'
import { ArrowRight, Clock, FileText, CheckCircle, Calendar, Package, Truck } from 'lucide-react'

export const metadata = {
  title: 'How It Works',
  description: 'Learn how to rent furniture from Been There Group — from browsing to delivery.',
}

const steps = [
  {
    number: '01',
    icon: Package,
    title: 'Browse the Catalogue',
    description:
      'Explore our full range of premium event furniture across all categories — couches, chairs, tables, ottomans, cocktail furniture and bar units.',
    tip: 'Filter by category, style or event type to find the right pieces.',
  },
  {
    number: '02',
    icon: FileText,
    title: 'Build Your Quote Basket',
    description:
      'Add the pieces you want to your Quote Basket, adjusting quantities as needed. You can add from multiple categories in one request.',
    tip: 'No pricing is shown online. Your Quote Basket is for selections only.',
  },
  {
    number: '03',
    icon: Calendar,
    title: 'Submit Your Event Details',
    description:
      'Complete the quote request form with your event type, date, venue, city, and any services you require — delivery, setup, strike or styling support.',
    tip: 'The more detail you provide, the more accurate your quote will be.',
  },
  {
    number: '04',
    icon: CheckCircle,
    title: 'Receive Your Formal Quote',
    description:
      'Our team reviews your requirements and issues a formal, itemised quote within 24 hours. Pricing is based on your event specifics — location, quantity, dates and services.',
    tip: 'Quote validity is 7 days from date of issue.',
  },
  {
    number: '05',
    icon: Truck,
    title: 'Confirm Booking & Coordinate Delivery',
    description:
      'Once you accept the quote and pay the deposit, we coordinate delivery timing, access requirements and setup with you directly.',
    tip: 'We recommend booking at least 2 weeks in advance for standard events.',
  },
  {
    number: '06',
    icon: CheckCircle,
    title: 'Enjoy Your Event',
    description:
      'Our team delivers, sets up, and is available if you need anything. After your event, we collect and pack down everything — leaving your venue clear.',
    tip: 'Strike timing is agreed in advance based on your venue\'s access requirements.',
  },
]

const policies = [
  {
    title: 'Lead Times',
    content:
      'We recommend submitting quote requests at least 2 weeks before your event. For larger productions or peak season, 4–6 weeks is advised. Rush bookings are considered subject to availability.',
  },
  {
    title: 'Booking Confirmation',
    content:
      'A booking is only confirmed once a signed quote and deposit payment are received. Verbal or written acceptance alone does not guarantee availability.',
  },
  {
    title: 'Payment Terms',
    content:
      'A 50% deposit is required to confirm booking. The remaining 50% is due 7 days before the event date. Full payment may be required for first-time clients.',
  },
  {
    title: 'Damage Policy',
    content:
      'Clients are responsible for furniture during the hire period. Any damage, breakage or loss will be assessed and invoiced at replacement cost. We recommend securing furniture in a designated area when not in use.',
  },
]

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        label="The Process"
        title="How it works"
        subtitle="From browsing our catalogue to furniture on your event floor — here's exactly how the Been There Group rental process works."
      />

      {/* Steps */}
      <section style={{ padding: '80px 0', backgroundColor: '#FAFAF8', flex: 1 }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div
                  key={step.number}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '80px 1fr',
                    gap: '32px',
                    padding: '40px 0',
                    borderBottom: index < steps.length - 1 ? '1px solid #E8E4DC' : 'none',
                    alignItems: 'flex-start',
                  }}
                >
                  {/* Number */}
                  <div style={{ textAlign: 'center' }}>
                    <div
                      style={{
                        width: '56px',
                        height: '56px',
                        backgroundColor: '#F2F0EB',
                        border: '1px solid #D8D4CC',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 8px',
                      }}
                    >
                      <Icon size={20} style={{ color: '#8B7355' }} />
                    </div>
                    <span
                      style={{
                        fontFamily: 'var(--font-cormorant), Georgia, serif',
                        fontSize: '13px',
                        color: '#A8926F',
                        fontWeight: 400,
                      }}
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-cormorant), Georgia, serif',
                        fontSize: '26px',
                        fontWeight: 400,
                        color: '#2C2C2A',
                        marginBottom: '12px',
                      }}
                    >
                      {step.title}
                    </h3>
                    <p style={{ fontSize: '15px', color: '#6B6560', lineHeight: 1.8, marginBottom: '12px' }}>
                      {step.description}
                    </p>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <Clock size={13} style={{ color: '#A8926F', marginTop: '2px', flexShrink: 0 }} />
                      <p style={{ fontSize: '13px', color: '#A8926F', fontStyle: 'italic', lineHeight: 1.6 }}>
                        {step.tip}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Policies */}
      <section style={{ padding: '80px 0', backgroundColor: '#F2F0EB', borderTop: '1px solid #D8D4CC' }}>
        <div className="container">
          <div style={{ marginBottom: '48px' }}>
            <span className="section-label">Good to Know</span>
            <h2
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 'clamp(28px, 3.5vw, 44px)',
                fontWeight: 300,
                color: '#2C2C2A',
              }}
            >
              Booking & policy essentials
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px',
            }}
          >
            {policies.map((policy) => (
              <div
                key={policy.title}
                style={{
                  backgroundColor: '#fff',
                  padding: '28px',
                  border: '1px solid #E8E4DC',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: '20px',
                    fontWeight: 400,
                    color: '#2C2C2A',
                    marginBottom: '12px',
                  }}
                >
                  {policy.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#6B6560', lineHeight: 1.8 }}>{policy.content}</p>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '40px', flexWrap: 'wrap' }}>
            <Link href="/terms" className="btn-outline">
              View Full Rental Policy
            </Link>
            <Link href="/faq" className="btn-ghost">
              FAQ <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 0', backgroundColor: '#FAFAF8', borderTop: '1px solid #D8D4CC' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 300,
              color: '#2C2C2A',
              marginBottom: '16px',
            }}
          >
            Ready to start planning?
          </h2>
          <p style={{ fontSize: '15px', color: '#6B6560', maxWidth: '440px', margin: '0 auto 32px', lineHeight: 1.7 }}>
            Browse our catalogue, build a quote basket, and submit your event details. We'll have a formal quote to you within 24 hours.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/rentals" className="btn-primary">
              Browse Catalogue <ArrowRight size={16} />
            </Link>
            <Link href="/contact" className="btn-outline">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  )
}
