'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react'
import { useQuoteBasket } from '@/context/QuoteBasketContext'

export default function QuoteBasketPage() {
  const { items, totalItems, removeItem, updateQuantity, clearBasket } = useQuoteBasket()

  return (
    <>
      {/* Header */}
      <section
        style={{
          backgroundColor: '#F2F0EB',
          paddingTop: '56px',
          paddingBottom: '48px',
          borderBottom: '1px solid #D8D4CC',
        }}
      >
        <div className="container">
          <span className="section-label">Your Selections</span>
          <h1
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 300,
              color: '#2C2C2A',
              marginBottom: '8px',
            }}
          >
            Quote Basket
          </h1>
          <p style={{ fontSize: '14px', color: '#6B6560' }}>
            {totalItems > 0
              ? `${totalItems} item${totalItems !== 1 ? 's' : ''} selected — review your selections and submit a quote request.`
              : 'Your quote basket is empty.'}
          </p>
        </div>
      </section>

      <section style={{ padding: '48px 0 80px', backgroundColor: '#FAFAF8', flex: 1 }}>
        <div className="container">
          {items.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '80px 24px',
                backgroundColor: '#F2F0EB',
                border: '1px solid #E8E4DC',
              }}
            >
              <ShoppingBag size={48} style={{ color: '#D8D4CC', margin: '0 auto 20px', display: 'block' }} />
              <h2
                style={{
                  fontFamily: 'var(--font-cormorant), Georgia, serif',
                  fontSize: '28px',
                  fontWeight: 400,
                  color: '#2C2C2A',
                  marginBottom: '12px',
                }}
              >
                Your basket is empty
              </h2>
              <p style={{ fontSize: '15px', color: '#6B6560', marginBottom: '28px', maxWidth: '400px', margin: '0 auto 28px' }}>
                Browse our catalogue to add furniture pieces to your quote request.
              </p>
              <Link href="/rentals" className="btn-primary">
                Browse Rentals
                <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '40px',
                alignItems: 'start',
              }}
            >
              {/* Items list */}
              <div style={{ gridColumn: 'span 2' }}>
                {/* Important notice */}
                <div
                  style={{
                    backgroundColor: '#fff',
                    border: '1px solid #E8E4DC',
                    padding: '16px 20px',
                    marginBottom: '24px',
                    fontSize: '13px',
                    color: '#6B6560',
                    borderLeft: '3px solid #8B7355',
                  }}
                >
                  <strong style={{ color: '#2C2C2A' }}>No pricing shown.</strong> All furniture is priced on request. Submit your quote to receive an official, itemised quote from our team.
                </div>

                {/* Header row */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 120px 40px',
                    gap: '16px',
                    padding: '12px 0',
                    borderBottom: '1px solid #D8D4CC',
                    fontSize: '11px',
                    fontWeight: 500,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#6B6560',
                  }}
                >
                  <span>Item</span>
                  <span style={{ textAlign: 'center' }}>Quantity</span>
                  <span />
                </div>

                {/* Items */}
                {items.map((item) => (
                  <div
                    key={item.productId}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 120px 40px',
                      gap: '16px',
                      padding: '20px 0',
                      borderBottom: '1px solid #E8E4DC',
                      alignItems: 'center',
                    }}
                  >
                    {/* Product info */}
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <div
                        style={{
                          width: '72px',
                          height: '72px',
                          flexShrink: 0,
                          backgroundColor: '#F2F0EB',
                          position: 'relative',
                          overflow: 'hidden',
                        }}
                      >
                        {item.imageUrl && (
                          <Image
                            src={item.imageUrl}
                            alt={item.productName}
                            fill
                            style={{ objectFit: 'cover' }}
                            unoptimized
                          />
                        )}
                      </div>
                      <div>
                        <p style={{ fontSize: '11px', color: '#8B7355', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '4px' }}>
                          {item.categoryName}
                        </p>
                        <Link
                          href={`/rentals/${item.categorySlug}/${item.slug}`}
                          style={{
                            fontFamily: 'var(--font-cormorant), Georgia, serif',
                            fontSize: '18px',
                            fontWeight: 400,
                            color: '#2C2C2A',
                            textDecoration: 'none',
                          }}
                        >
                          {item.productName}
                        </Link>
                        <p style={{ fontSize: '12px', color: '#A8926F', fontStyle: 'italic', marginTop: '4px' }}>
                          Price on request
                        </p>
                      </div>
                    </div>

                    {/* Quantity */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        style={{
                          width: '28px',
                          height: '28px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '1px solid #D8D4CC',
                          backgroundColor: 'transparent',
                          cursor: item.quantity <= 1 ? 'not-allowed' : 'pointer',
                          opacity: item.quantity <= 1 ? 0.4 : 1,
                        }}
                      >
                        <Minus size={12} />
                      </button>
                      <span style={{ minWidth: '24px', textAlign: 'center', fontSize: '15px', fontWeight: 500 }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        style={{
                          width: '28px',
                          height: '28px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '1px solid #D8D4CC',
                          backgroundColor: 'transparent',
                          cursor: 'pointer',
                        }}
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item.productId)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#D8D4CC',
                        padding: '4px',
                        display: 'flex',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#2C2C2A')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#D8D4CC')}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}

                {/* Actions row */}
                <div style={{ display: 'flex', gap: '12px', marginTop: '20px', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                  <button
                    onClick={clearBasket}
                    style={{
                      fontSize: '13px',
                      color: '#6B6560',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      padding: 0,
                    }}
                  >
                    Clear all items
                  </button>
                  <Link href="/rentals" className="btn-ghost">
                    ← Continue browsing
                  </Link>
                </div>
              </div>

              {/* Summary panel */}
              <div
                style={{
                  backgroundColor: '#fff',
                  border: '1px solid #E8E4DC',
                  padding: '32px',
                  position: 'sticky',
                  top: '88px',
                }}
              >
                <h2
                  style={{
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: '24px',
                    fontWeight: 400,
                    color: '#2C2C2A',
                    marginBottom: '20px',
                  }}
                >
                  Quote Summary
                </h2>

                <div style={{ borderTop: '1px solid #E8E4DC', paddingTop: '16px', marginBottom: '20px' }}>
                  {items.map((item) => (
                    <div
                      key={item.productId}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        padding: '8px 0',
                        borderBottom: '1px solid #F2F0EB',
                        fontSize: '13px',
                      }}
                    >
                      <span style={{ color: '#2C2C2A', flex: 1, paddingRight: '8px' }}>{item.productName}</span>
                      <span style={{ color: '#6B6560', flexShrink: 0 }}>×{item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '24px',
                    fontSize: '13px',
                  }}
                >
                  <span style={{ color: '#6B6560' }}>Pricing</span>
                  <span style={{ color: '#8B7355', fontStyle: 'italic' }}>On request</span>
                </div>

                <p
                  style={{
                    fontSize: '12px',
                    color: '#6B6560',
                    lineHeight: 1.6,
                    marginBottom: '20px',
                    fontStyle: 'italic',
                  }}
                >
                  Submit your event details below and our team will issue an official, itemised quote within 24 hours.
                </p>

                <Link href="/quote-basket/request" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Request a Quote
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
