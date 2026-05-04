'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useQuoteBasket } from '@/context/QuoteBasketContext'
import { ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

const eventTypes = [
  'Corporate Conference',
  'Brand Activation',
  'Gala Dinner',
  'Wedding',
  'Cocktail Reception',
  'Private Party',
  'Exhibition / Trade Show',
  'Product Launch',
  'Award Ceremony',
  'Other',
]

const cities = [
  'Johannesburg',
  'Pretoria',
  'Midrand',
  'Sandton',
  'Centurion',
  'Soweto',
  'Randburg',
  'Fourways',
  'Other Gauteng',
]

export default function QuoteRequestPage() {
  const { items, clearBasket } = useQuoteBasket()
  const [formState, setFormState] = useState<FormState>('idle')
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    venue: '',
    city: '',
    eventLocation: '',
    deliveryRequired: false,
    setupStrikeRequired: false,
    stylingRequired: false,
    notes: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (items.length === 0) {
      setError('Please add at least one item to your quote basket before submitting.')
      return
    }
    setFormState('submitting')
    setError('')

    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, items }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Something went wrong. Please try again.')
      }

      setFormState('success')
      clearBasket()
    } catch (err: any) {
      setError(err.message)
      setFormState('error')
    }
  }

  if (formState === 'success') {
    return (
      <section style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px', backgroundColor: '#FAFAF8' }}>
        <div style={{ textAlign: 'center', maxWidth: '480px' }}>
          <CheckCircle size={56} style={{ color: '#8B7355', margin: '0 auto 24px', display: 'block' }} />
          <h1
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: '40px',
              fontWeight: 300,
              color: '#2C2C2A',
              marginBottom: '16px',
            }}
          >
            Quote Request Submitted
          </h1>
          <p style={{ fontSize: '15px', color: '#6B6560', lineHeight: 1.75, marginBottom: '32px' }}>
            Thank you. Our team will review your requirements and issue a formal, itemised quote within 24 hours. We'll be in touch at the email address provided.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/rentals" className="btn-primary">Continue Browsing</Link>
            <Link href="/" className="btn-outline">Back to Home</Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      {/* Hero */}
      <section
        style={{
          backgroundColor: '#F2F0EB',
          paddingTop: '56px',
          paddingBottom: '48px',
          borderBottom: '1px solid #D8D4CC',
        }}
      >
        <div className="container">
          <Link href="/quote-basket" className="btn-ghost" style={{ marginBottom: '20px' }}>
            <ArrowLeft size={14} /> Back to Quote Basket
          </Link>
          <span className="section-label">Step 2 of 2</span>
          <h1
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(32px, 4vw, 52px)',
              fontWeight: 300,
              color: '#2C2C2A',
              marginBottom: '8px',
            }}
          >
            Request a Quote
          </h1>
          <p style={{ fontSize: '15px', color: '#6B6560', maxWidth: '520px', lineHeight: 1.7 }}>
            Provide your event details below. Our team will review your requirements and issue a formal, itemised quote.
          </p>
        </div>
      </section>

      <section style={{ padding: '48px 0 80px', flex: 1, backgroundColor: '#FAFAF8' }}>
        <div className="container">
          {items.length === 0 && (
            <div
              style={{
                padding: '20px 24px',
                backgroundColor: '#FFF8F0',
                border: '1px solid #F0D9C0',
                marginBottom: '32px',
                display: 'flex',
                gap: '12px',
                alignItems: 'flex-start',
              }}
            >
              <AlertCircle size={18} style={{ color: '#8B7355', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <p style={{ fontSize: '14px', color: '#2C2C2A', fontWeight: 500, marginBottom: '4px' }}>
                  Your quote basket is empty
                </p>
                <p style={{ fontSize: '13px', color: '#6B6560' }}>
                  You can still submit an enquiry, or <Link href="/rentals" style={{ color: '#8B7355' }}>browse the catalogue</Link> to add items first.
                </p>
              </div>
            </div>
          )}

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '48px',
              alignItems: 'start',
            }}
          >
            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px', gridColumn: 'span 2' }}>
              {/* Contact details */}
              <div
                style={{
                  backgroundColor: '#fff',
                  border: '1px solid #E8E4DC',
                  padding: '32px',
                }}
              >
                <h2
                  style={{
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: '22px',
                    fontWeight: 400,
                    color: '#2C2C2A',
                    marginBottom: '24px',
                    paddingBottom: '16px',
                    borderBottom: '1px solid #E8E4DC',
                  }}
                >
                  Contact Details
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="fullName">Full Name *</label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      value={form.fullName}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Your full name"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="companyName">Company Name</label>
                    <input
                      id="companyName"
                      name="companyName"
                      type="text"
                      value={form.companyName}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Optional"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Email Address *</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="phone">Phone Number *</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="+27 ..."
                    />
                  </div>
                </div>
              </div>

              {/* Event details */}
              <div
                style={{
                  backgroundColor: '#fff',
                  border: '1px solid #E8E4DC',
                  padding: '32px',
                }}
              >
                <h2
                  style={{
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: '22px',
                    fontWeight: 400,
                    color: '#2C2C2A',
                    marginBottom: '24px',
                    paddingBottom: '16px',
                    borderBottom: '1px solid #E8E4DC',
                  }}
                >
                  Event Details
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="eventType">Event Type *</label>
                    <select
                      id="eventType"
                      name="eventType"
                      required
                      value={form.eventType}
                      onChange={handleChange}
                      className="form-input"
                    >
                      <option value="">Select event type</option>
                      {eventTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="eventDate">Event Date *</label>
                    <input
                      id="eventDate"
                      name="eventDate"
                      type="date"
                      required
                      value={form.eventDate}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="venue">Venue Name</label>
                    <input
                      id="venue"
                      name="venue"
                      type="text"
                      value={form.venue}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Venue or location name"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="city">City / Area *</label>
                    <select
                      id="city"
                      name="city"
                      required
                      value={form.city}
                      onChange={handleChange}
                      className="form-input"
                    >
                      <option value="">Select city</option>
                      {cities.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group" style={{ gridColumn: 'span 2' }}>
                    <label className="form-label" htmlFor="eventLocation">Full Event Address / Location</label>
                    <input
                      id="eventLocation"
                      name="eventLocation"
                      type="text"
                      value={form.eventLocation}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Street address or location details"
                    />
                  </div>
                </div>
              </div>

              {/* Services */}
              <div
                style={{
                  backgroundColor: '#fff',
                  border: '1px solid #E8E4DC',
                  padding: '32px',
                }}
              >
                <h2
                  style={{
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: '22px',
                    fontWeight: 400,
                    color: '#2C2C2A',
                    marginBottom: '8px',
                  }}
                >
                  Additional Services
                </h2>
                <p style={{ fontSize: '13px', color: '#6B6560', marginBottom: '20px' }}>
                  Select any additional services you'd like quoted alongside the furniture.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[
                    { name: 'deliveryRequired', label: 'Delivery & Collection', description: 'We handle transport of all furniture to and from your event.' },
                    { name: 'setupStrikeRequired', label: 'Setup & Strike', description: 'Our crew will set up and pack down all furniture on the day.' },
                    { name: 'stylingRequired', label: 'Styling Support', description: 'Event layout planning and on-site styling guidance from our team.' },
                  ].map((svc) => (
                    <label
                      key={svc.name}
                      style={{
                        display: 'flex',
                        gap: '16px',
                        alignItems: 'flex-start',
                        cursor: 'pointer',
                        padding: '16px',
                        border: '1px solid',
                        borderColor: form[svc.name as keyof typeof form] ? '#8B7355' : '#E8E4DC',
                        backgroundColor: form[svc.name as keyof typeof form] ? '#FFF8F2' : 'transparent',
                        transition: 'all 0.2s',
                      }}
                    >
                      <input
                        type="checkbox"
                        name={svc.name}
                        checked={form[svc.name as keyof typeof form] as boolean}
                        onChange={handleChange}
                        style={{ marginTop: '2px', accentColor: '#8B7355', width: '16px', height: '16px', flexShrink: 0 }}
                      />
                      <div>
                        <p style={{ fontSize: '14px', fontWeight: 500, color: '#2C2C2A', marginBottom: '2px' }}>
                          {svc.label}
                        </p>
                        <p style={{ fontSize: '13px', color: '#6B6560' }}>{svc.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div
                style={{
                  backgroundColor: '#fff',
                  border: '1px solid #E8E4DC',
                  padding: '32px',
                }}
              >
                <div className="form-group">
                  <label className="form-label" htmlFor="notes">Additional Notes or Requirements</label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={4}
                    value={form.notes}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Tell us anything else we should know about your event, specific requirements, or questions..."
                    style={{ resize: 'vertical' }}
                  />
                </div>
              </div>

              {/* Selected items summary */}
              {items.length > 0 && (
                <div
                  style={{
                    backgroundColor: '#F2F0EB',
                    border: '1px solid #D8D4CC',
                    padding: '24px',
                  }}
                >
                  <h3
                    style={{
                      fontSize: '14px',
                      fontWeight: 500,
                      color: '#2C2C2A',
                      marginBottom: '12px',
                      letterSpacing: '0.04em',
                    }}
                  >
                    Items in your quote ({items.length})
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {items.map((item) => (
                      <div
                        key={item.productId}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          fontSize: '13px',
                          color: '#6B6560',
                        }}
                      >
                        <span>{item.productName}</span>
                        <span>×{item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Error */}
              {(formState === 'error' || error) && (
                <div
                  style={{
                    padding: '16px 20px',
                    backgroundColor: '#FEF2F2',
                    border: '1px solid #FECACA',
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'flex-start',
                  }}
                >
                  <AlertCircle size={16} style={{ color: '#DC2626', flexShrink: 0 }} />
                  <p style={{ fontSize: '13px', color: '#DC2626' }}>{error || 'An error occurred. Please try again.'}</p>
                </div>
              )}

              {/* Submit */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={formState === 'submitting'}
                  style={{ opacity: formState === 'submitting' ? 0.7 : 1, cursor: formState === 'submitting' ? 'not-allowed' : 'pointer' }}
                >
                  {formState === 'submitting' ? 'Submitting...' : 'Submit Quote Request'}
                </button>
                <Link href="/quote-basket" className="btn-outline">
                  <ArrowLeft size={14} />
                  Back to Basket
                </Link>
              </div>

              <p style={{ fontSize: '12px', color: '#A8926F', fontStyle: 'italic' }}>
                By submitting this form you agree to be contacted by the Been There Group team regarding your quote request.
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
