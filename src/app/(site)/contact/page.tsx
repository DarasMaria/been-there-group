'use client'

import { useState } from 'react'
import PageHero from '@/components/ui/PageHero'
import { Mail, Phone, MessageCircle, MapPin, Clock, CheckCircle } from 'lucide-react'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import Link from 'next/link'

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 800))
    setSent(true)
    setSubmitting(false)
  }

  return (
    <>
      <PageHero
        label="Get in Touch"
        title="Contact us"
        subtitle="We'd love to hear about your event. Reach out via the form, WhatsApp, or email."
      />

      <section style={{ padding: '64px 0 80px', backgroundColor: '#FAFAF8', flex: 1 }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '64px',
              alignItems: 'start',
            }}
          >
            {/* Contact info */}
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-cormorant), Georgia, serif',
                  fontSize: '26px',
                  fontWeight: 400,
                  color: '#2C2C2A',
                  marginBottom: '32px',
                }}
              >
                How to reach us
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '40px' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '40px', height: '40px', backgroundColor: '#F2F0EB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MessageCircle size={18} style={{ color: '#8B7355' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#A8926F', marginBottom: '4px' }}>WhatsApp</p>
                    <p style={{ fontSize: '15px', color: '#2C2C2A', marginBottom: '4px' }}>Preferred for quick enquiries</p>
                    <WhatsAppButton style={{ padding: '8px 16px', fontSize: '12px', marginTop: '8px' }} />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '40px', height: '40px', backgroundColor: '#F2F0EB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Mail size={18} style={{ color: '#8B7355' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#A8926F', marginBottom: '4px' }}>Email</p>
                    <a
                      href="mailto:quotes@beentheregroup.co.za"
                      style={{ fontSize: '15px', color: '#2C2C2A', textDecoration: 'none' }}
                    >
                      quotes@beentheregroup.co.za
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '40px', height: '40px', backgroundColor: '#F2F0EB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MapPin size={18} style={{ color: '#8B7355' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#A8926F', marginBottom: '4px' }}>Service Area</p>
                    <p style={{ fontSize: '15px', color: '#2C2C2A' }}>Gauteng — Johannesburg, Sandton, Pretoria, Midrand, Centurion & surrounding areas</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '40px', height: '40px', backgroundColor: '#F2F0EB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Clock size={18} style={{ color: '#8B7355' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#A8926F', marginBottom: '4px' }}>Response Time</p>
                    <p style={{ fontSize: '15px', color: '#2C2C2A' }}>Within 24 hours for quote requests</p>
                    <p style={{ fontSize: '13px', color: '#6B6560' }}>Monday – Friday, 8am – 5pm</p>
                  </div>
                </div>
              </div>

              {/* Quote prompt */}
              <div
                style={{
                  padding: '24px',
                  backgroundColor: '#F2F0EB',
                  border: '1px solid #D8D4CC',
                  borderLeft: '3px solid #8B7355',
                }}
              >
                <p style={{ fontSize: '14px', fontWeight: 500, color: '#2C2C2A', marginBottom: '6px' }}>
                  Planning an event?
                </p>
                <p style={{ fontSize: '13px', color: '#6B6560', marginBottom: '16px', lineHeight: 1.7 }}>
                  For furniture rental enquiries, the fastest route is to browse our catalogue, add items to your Quote Basket, and submit a formal quote request.
                </p>
                <Link href="/quote-basket/request" className="btn-primary" style={{ padding: '10px 20px', fontSize: '12px' }}>
                  Request a Quote →
                </Link>
              </div>
            </div>

            {/* Contact form */}
            <div>
              {sent ? (
                <div style={{ textAlign: 'center', padding: '64px 32px', backgroundColor: '#fff', border: '1px solid #E8E4DC' }}>
                  <CheckCircle size={48} style={{ color: '#8B7355', margin: '0 auto 20px', display: 'block' }} />
                  <h3
                    style={{
                      fontFamily: 'var(--font-cormorant), Georgia, serif',
                      fontSize: '28px',
                      fontWeight: 400,
                      color: '#2C2C2A',
                      marginBottom: '12px',
                    }}
                  >
                    Message received
                  </h3>
                  <p style={{ fontSize: '14px', color: '#6B6560', lineHeight: 1.7 }}>
                    Thank you for getting in touch. Our team will respond within 24 hours.
                  </p>
                </div>
              ) : (
                <div
                  style={{
                    backgroundColor: '#fff',
                    border: '1px solid #E8E4DC',
                    padding: '36px',
                  }}
                >
                  <h2
                    style={{
                      fontFamily: 'var(--font-cormorant), Georgia, serif',
                      fontSize: '24px',
                      fontWeight: 400,
                      color: '#2C2C2A',
                      marginBottom: '24px',
                    }}
                  >
                    Send a message
                  </h2>

                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div className="form-group">
                        <label className="form-label" htmlFor="name">Name *</label>
                        <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} className="form-input" />
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="email">Email *</label>
                        <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} className="form-input" />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="phone">Phone</label>
                      <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} className="form-input" />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="subject">Subject *</label>
                      <input id="subject" name="subject" type="text" required value={form.subject} onChange={handleChange} className="form-input" placeholder="e.g. Quote enquiry, general question..." />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="message">Message *</label>
                      <textarea id="message" name="message" rows={5} required value={form.message} onChange={handleChange} className="form-input" style={{ resize: 'vertical' }} />
                    </div>

                    <button type="submit" className="btn-primary" disabled={submitting} style={{ opacity: submitting ? 0.7 : 1, cursor: submitting ? 'not-allowed' : 'pointer' }}>
                      {submitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
