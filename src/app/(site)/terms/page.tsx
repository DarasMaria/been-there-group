import PageHero from '@/components/ui/PageHero'
import Link from 'next/link'

export const metadata = {
  title: 'Terms & Rental Policy',
  description: 'Been There Group rental terms, booking conditions and rental policy.',
}

const sections = [
  {
    title: 'Booking Confirmation',
    content: [
      'A booking is only confirmed upon receipt of a signed quote and deposit payment.',
      'Verbal or email acceptance of a quote does not constitute a confirmed booking.',
      'Availability is not guaranteed until a deposit is received and a booking confirmation is issued.',
      'Quotes are valid for 7 days from the date of issue unless otherwise stated.',
    ],
  },
  {
    title: 'Payment Terms',
    content: [
      'A 50% deposit is required to confirm all bookings.',
      'The remaining 50% balance is due 7 days before the event date.',
      'First-time clients may be required to pay in full upfront.',
      'Payment accepted via EFT. Banking details provided on invoice.',
      'Bookings not paid by the due date may be released without notice.',
    ],
  },
  {
    title: 'Cancellation Policy',
    content: [
      'Cancellations made more than 14 days before the event: full deposit refund.',
      'Cancellations made 8–14 days before the event: 50% deposit retained.',
      'Cancellations made 0–7 days before the event: full deposit forfeited.',
      'Cancellations of confirmed bookings after final payment: no refund, unless an alternative date can be agreed.',
      'Been There Group reserves the right to cancel a booking in exceptional circumstances, with a full refund issued.',
    ],
  },
  {
    title: 'Damage, Loss & Replacement',
    content: [
      'The client is responsible for all hired furniture from the time of delivery to the time of collection.',
      'Any damage, breakage, soiling or loss will be assessed and invoiced at the full replacement or repair cost.',
      'Furniture must be kept in a supervised area when not in use during the hire period.',
      'Stains, burns, tears, structural damage and missing items will all be assessed as chargeable.',
      'Been There Group reserves the right to invoice for damage costs up to 30 days after the event.',
    ],
  },
  {
    title: 'Delivery & Collection',
    content: [
      'Delivery and collection dates and times are agreed in writing as part of the booking process.',
      'The client must ensure safe and suitable access to the venue for delivery vehicles and crew.',
      'Delivery pricing is quoted based on event location and quantity of furniture ordered.',
      'Failed deliveries due to access issues, incorrect information or venue restrictions may be charged at the client\'s cost.',
      'All furniture remains the property of Been There Group during the hire period.',
    ],
  },
  {
    title: 'Setup & Strike',
    content: [
      'Setup and strike services are available as an optional add-on service, quoted separately.',
      'The client must provide accurate venue access times and any relevant venue regulations.',
      'Crew timing is coordinated in advance and any changes must be communicated with a minimum of 48 hours notice.',
      'Been There Group is not liable for delays caused by third parties, venue restrictions or incorrect information provided by the client.',
    ],
  },
  {
    title: 'Product Condition',
    content: [
      'All furniture is supplied in clean, event-ready condition.',
      'Minor cosmetic wear consistent with rental use may be present on older pieces.',
      'Any concerns about the condition of a piece upon delivery must be reported within 2 hours.',
      'Product photography and descriptions are for reference — slight variations in colour or finish may occur due to manufacturing batches and photography conditions.',
    ],
  },
  {
    title: 'Responsibility During Hire',
    content: [
      'The client assumes full responsibility for all hired items from delivery to collection.',
      'The client is responsible for ensuring all items are protected from weather, theft, and accidental damage.',
      'Items must not be moved offsite or sub-hired to third parties without written consent from Been There Group.',
      'Been There Group is not liable for any personal injury, property damage or losses arising from the use of hired furniture.',
    ],
  },
  {
    title: 'Quote Validity & Pricing',
    content: [
      'All quotes are valid for 7 days from the date of issue.',
      'Pricing is subject to change after the quote validity period.',
      'Final pricing is based on event specifics including location, quantity, dates, and services required.',
      'Been There Group reserves the right to adjust pricing for events significantly different from what was initially described.',
    ],
  },
]

export default function TermsPage() {
  return (
    <>
      <PageHero
        label="Rental Policy"
        title="Terms & Conditions"
        subtitle="These terms govern all rental bookings with Been There Group. Please read carefully before confirming a booking."
      />

      <section style={{ padding: '64px 0 80px', backgroundColor: '#FAFAF8', flex: 1 }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '240px 1fr',
              gap: '64px',
              alignItems: 'start',
            }}
          >
            {/* Sidebar nav */}
            <div style={{ position: 'sticky', top: '88px' }} className="terms-sidebar">
              <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#A8926F', marginBottom: '16px' }}>
                Sections
              </p>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {sections.map((s) => (
                  <a
                    key={s.title}
                    href={`#${s.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                    className="terms-nav-link"
                  >
                    {s.title}
                  </a>
                ))}
              </nav>
            </div>

            {/* Content */}
            <div>
              {sections.map((section) => (
                <div
                  key={section.title}
                  id={section.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                  style={{ marginBottom: '48px', scrollMarginTop: '96px' }}
                >
                  <h2
                    style={{
                      fontFamily: 'var(--font-cormorant), Georgia, serif',
                      fontSize: '26px',
                      fontWeight: 400,
                      color: '#2C2C2A',
                      marginBottom: '20px',
                      paddingBottom: '12px',
                      borderBottom: '1px solid #E8E4DC',
                    }}
                  >
                    {section.title}
                  </h2>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {section.content.map((item, i) => (
                      <li key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        <span style={{ color: '#D8D4CC', fontSize: '16px', fontWeight: 300, flexShrink: 0, marginTop: '1px' }}>—</span>
                        <span style={{ fontSize: '14px', color: '#6B6560', lineHeight: 1.8 }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div
                style={{
                  padding: '24px',
                  backgroundColor: '#F2F0EB',
                  border: '1px solid #D8D4CC',
                  marginTop: '16px',
                }}
              >
                <p style={{ fontSize: '13px', color: '#6B6560', lineHeight: 1.8, marginBottom: '12px' }}>
                  <strong style={{ color: '#2C2C2A' }}>Note:</strong> These terms may be updated from time to time. By proceeding with a booking, the client acknowledges acceptance of the current terms as displayed on this page and as confirmed in writing at the time of booking.
                </p>
                <p style={{ fontSize: '12px', color: '#A8926F' }}>
                  Last updated: {new Date().getFullYear()}
                </p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '40px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/faq" className="btn-outline">View FAQ</Link>
            <Link href="/contact" className="btn-ghost">Contact Us →</Link>
          </div>
        </div>
      </section>

      <style>{`
        .terms-nav-link {
          font-size: 13px;
          color: #6B6560;
          text-decoration: none;
          padding: 6px 0;
          border-bottom: 1px solid #F2F0EB;
          transition: color 0.2s;
          display: block;
        }
        .terms-nav-link:hover { color: #2C2C2A; }
        @media (max-width: 768px) {
          .terms-sidebar { display: none; }
        }
      `}</style>
    </>
  )
}
