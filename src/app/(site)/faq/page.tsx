'use client'

import { useState } from 'react'
import Link from 'next/link'
import PageHero from '@/components/ui/PageHero'
import { ChevronDown, ArrowRight } from 'lucide-react'

const faqs = [
  {
    question: 'How do I request a quote?',
    answer:
      'Browse our catalogue at /rentals and add the pieces you need to your Quote Basket. Then go to "Request a Quote", fill in your event details, and submit the form. Our team will issue a formal, itemised quote within 24 hours. You can also contact us directly via WhatsApp or email.',
  },
  {
    question: 'Do you show pricing online?',
    answer:
      'No — and this is by design. Every quote is based on your specific event: the pieces selected, quantities, event date, location, and any services required (delivery, setup, styling). We issue a formal, itemised quote for every enquiry.',
  },
  {
    question: 'Do you offer delivery?',
    answer:
      'Yes. We offer delivery and collection across the Gauteng events market. Delivery pricing is quoted based on your event location and the quantity of furniture ordered. Delivery is a separate line item on your quote.',
  },
  {
    question: 'Do you offer setup and strike?',
    answer:
      'Yes. Our professional crew can set up and arrange all hired furniture at your venue before your event, and pack it all down and remove it after. Setup and strike is quoted separately and can be added to any rental booking.',
  },
  {
    question: 'How far in advance should I book?',
    answer:
      'We recommend submitting your quote request at least 2 weeks before your event. For larger productions, weddings or peak-season events, 4–6 weeks is advisable. Rush bookings may be accommodated subject to availability — contact us directly to discuss.',
  },
  {
    question: 'Do you work with event planners and agencies?',
    answer:
      'Absolutely. Event planners, production companies and advertising agencies are among our primary clients. We\'re set up to work efficiently with professional event teams — formal quoting, clear communication and reliable logistics.',
  },
  {
    question: 'Do you cater for corporate events?',
    answer:
      'Yes. We serve corporate marketing teams, in-house events departments and brand activation teams. Our furniture range, service offering and quoting process are all designed to meet corporate standards.',
  },
  {
    question: 'Can you assist with styling support?',
    answer:
      'Yes. We offer event layout planning and on-site styling guidance as an optional service. This is particularly popular for weddings, brand activations and high-end corporate functions. Let us know when submitting your quote request.',
  },
  {
    question: 'What happens if an item is damaged?',
    answer:
      'Clients are responsible for all hired furniture during the hire period. Any damage, breakage or loss will be assessed and invoiced at replacement or repair cost. We recommend keeping furniture in a supervised area when not in event use.',
  },
  {
    question: 'Which areas do you service?',
    answer:
      'We currently serve the Gauteng events market, including Johannesburg, Sandton, Midrand, Pretoria, Centurion and surrounding areas. For events outside Gauteng, please contact us directly to discuss.',
  },
  {
    question: 'Is there a minimum order?',
    answer:
      'We don\'t display a minimum order requirement. For very small orders, delivery logistics may affect the feasibility of a booking — this is something we\'ll discuss during the quoting process.',
  },
  {
    question: 'How long is a quote valid?',
    answer:
      'Quotes are valid for 7 days from the date of issue. After this period, pricing and availability are subject to change. We recommend confirming your booking promptly to secure your items and date.',
  },
]

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ borderBottom: '1px solid #E8E4DC' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          padding: '22px 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          gap: '16px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: '20px',
            fontWeight: 400,
            color: '#2C2C2A',
            flex: 1,
          }}
        >
          {question}
        </span>
        <ChevronDown
          size={20}
          style={{
            color: '#8B7355',
            flexShrink: 0,
            transform: open ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.25s ease',
            marginTop: '2px',
          }}
        />
      </button>
      {open && (
        <div style={{ paddingBottom: '22px' }}>
          <p style={{ fontSize: '14px', color: '#6B6560', lineHeight: 1.8, maxWidth: '680px' }}>
            {answer}
          </p>
        </div>
      )}
    </div>
  )
}

export default function FAQPage() {
  return (
    <>
      <PageHero
        label="Frequently Asked Questions"
        title="Common questions answered"
        subtitle="Everything you need to know about renting furniture from Been There Group."
      />

      <section style={{ padding: '64px 0 80px', backgroundColor: '#FAFAF8', flex: 1 }}>
        <div className="container">
          <div style={{ maxWidth: '800px' }}>
            {faqs.map((faq) => (
              <FaqItem key={faq.question} {...faq} />
            ))}
          </div>

          <div
            style={{
              marginTop: '64px',
              padding: '40px',
              backgroundColor: '#F2F0EB',
              border: '1px solid #D8D4CC',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '24px',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-cormorant), Georgia, serif',
                  fontSize: '24px',
                  fontWeight: 400,
                  color: '#2C2C2A',
                  marginBottom: '6px',
                }}
              >
                Still have questions?
              </h3>
              <p style={{ fontSize: '14px', color: '#6B6560' }}>
                Our team is happy to help. Reach out via WhatsApp, email or the contact form.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn-primary">
                Contact Us <ArrowRight size={14} />
              </Link>
              <Link href="/quote-basket/request" className="btn-outline">
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
