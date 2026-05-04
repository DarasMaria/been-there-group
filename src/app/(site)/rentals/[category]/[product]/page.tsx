'use client'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Plus, Check, ArrowRight, Ruler, Package, Palette, Users, ArrowLeft } from 'lucide-react'
import { useQuoteBasket } from '@/context/QuoteBasketContext'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import { parseJsonArray } from '@/lib/utils'

interface ProductPageProps {
  params: Promise<{ category: string; product: string }>
}

async function getProduct(categorySlug: string, productSlug: string) {
  const res = await fetch(`/api/products/${productSlug}`, { cache: 'no-store' })
  if (!res.ok) return null
  return res.json()
}

export default function ProductPage({ params }: ProductPageProps) {
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)
  const [slugs, setSlugs] = useState({ category: '', product: '' })
  const { addItem, isInBasket } = useQuoteBasket()

  useEffect(() => {
    params.then(async ({ category, product: productSlug }) => {
      setSlugs({ category, product: productSlug })
      const data = await getProduct(category, productSlug)
      setProduct(data)
      setLoading(false)
    })
  }, [params])

  if (loading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              border: '2px solid #E8E4DC',
              borderTopColor: '#8B7355',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 16px',
            }}
          />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <p style={{ fontSize: '14px', color: '#6B6560' }}>Loading...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '20px' }}>
        <h1 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '36px', fontWeight: 300 }}>Product not found</h1>
        <Link href="/rentals" className="btn-primary">Back to Catalogue</Link>
      </div>
    )
  }

  const inBasket = isInBasket(product.id)
  const images = product.images?.length > 0 ? product.images : [{ url: '/images/placeholder.jpg', alt: product.name }]
  const styleTags = parseJsonArray(product.styleTags)
  const eventTypes = parseJsonArray(product.eventTypes)

  const specs = [
    { icon: Ruler, label: 'Dimensions', value: product.dimensions },
    { icon: Package, label: 'Material', value: product.material },
    { icon: Palette, label: 'Colour', value: product.colour },
    { icon: Users, label: 'Seating Capacity', value: product.seatingCapacity ? `${product.seatingCapacity} persons` : null },
  ].filter((s) => s.value)

  return (
    <>
      {/* Breadcrumb */}
      <div style={{ backgroundColor: '#F2F0EB', borderBottom: '1px solid #D8D4CC', padding: '16px 0' }}>
        <div className="container">
          <nav style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '12px', color: '#6B6560' }}>
            <Link href="/" style={{ color: '#6B6560', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <Link href="/rentals" style={{ color: '#6B6560', textDecoration: 'none' }}>Rentals</Link>
            <span>/</span>
            <Link href={`/rentals/${slugs.category}`} style={{ color: '#6B6560', textDecoration: 'none' }}>
              {product.category?.name}
            </Link>
            <span>/</span>
            <span style={{ color: '#2C2C2A' }}>{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Layout */}
      <section style={{ padding: '48px 0 80px', backgroundColor: '#FAFAF8', flex: 1 }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '64px',
              alignItems: 'start',
            }}
          >
            {/* Images */}
            <div>
              {/* Main image */}
              <div
                style={{
                  position: 'relative',
                  aspectRatio: '4/3',
                  backgroundColor: '#F2F0EB',
                  marginBottom: '12px',
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={images[activeImage]?.url || '/images/placeholder.jpg'}
                  alt={images[activeImage]?.alt || product.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  unoptimized
                />
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {images.map((img: any, i: number) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      style={{
                        width: '72px',
                        height: '72px',
                        position: 'relative',
                        overflow: 'hidden',
                        border: i === activeImage ? '2px solid #8B7355' : '2px solid transparent',
                        padding: 0,
                        cursor: 'pointer',
                        backgroundColor: '#F2F0EB',
                      }}
                    >
                      <Image src={img.url} alt={img.alt || ''} fill style={{ objectFit: 'cover' }} unoptimized />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div>
              <p style={{ fontSize: '12px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8B7355', marginBottom: '8px' }}>
                {product.category?.name}
              </p>
              <h1
                style={{
                  fontFamily: 'var(--font-cormorant), Georgia, serif',
                  fontSize: 'clamp(32px, 4vw, 48px)',
                  fontWeight: 300,
                  color: '#2C2C2A',
                  marginBottom: '16px',
                  lineHeight: 1.15,
                }}
              >
                {product.name}
              </h1>

              {product.description && (
                <p style={{ fontSize: '15px', color: '#6B6560', lineHeight: 1.8, marginBottom: '28px' }}>
                  {product.description}
                </p>
              )}

              {/* Price on request */}
              <div
                style={{
                  padding: '16px 20px',
                  backgroundColor: '#F2F0EB',
                  border: '1px solid #D8D4CC',
                  marginBottom: '28px',
                  fontSize: '14px',
                  color: '#6B6560',
                  fontStyle: 'italic',
                }}
              >
                Price on request — Official quotes are issued based on event requirements, location and dates.
              </div>

              {/* Specs */}
              {specs.length > 0 && (
                <div style={{ marginBottom: '28px' }}>
                  <h3
                    style={{
                      fontSize: '12px',
                      fontWeight: 500,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: '#6B6560',
                      marginBottom: '16px',
                    }}
                  >
                    Specifications
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {specs.map(({ icon: Icon, label, value }) => (
                      <div key={label} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        <Icon size={14} style={{ color: '#A8926F', marginTop: '2px', flexShrink: 0 }} />
                        <div>
                          <span style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#A8926F', display: 'block' }}>
                            {label}
                          </span>
                          <span style={{ fontSize: '14px', color: '#2C2C2A' }}>{value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {styleTags.length > 0 && (
                <div style={{ marginBottom: '28px' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {styleTags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                    {product.indoor && <span className="tag">Indoor</span>}
                    {product.outdoor && <span className="tag">Outdoor</span>}
                  </div>
                </div>
              )}

              {/* Event types */}
              {eventTypes.length > 0 && (
                <div style={{ marginBottom: '32px' }}>
                  <p style={{ fontSize: '12px', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#A8926F', marginBottom: '8px' }}>
                    Suited for
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {eventTypes.map((type) => (
                      <span
                        key={type}
                        style={{
                          padding: '4px 12px',
                          border: '1px solid #D8D4CC',
                          fontSize: '12px',
                          color: '#6B6560',
                          textTransform: 'capitalize',
                        }}
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button
                  onClick={() =>
                    addItem({
                      productId: product.id,
                      productName: product.name,
                      categoryName: product.category?.name || '',
                      imageUrl: images[0]?.url,
                      slug: product.slug,
                      categorySlug: product.category?.slug || '',
                    })
                  }
                  className="btn-primary"
                  style={{ justifyContent: 'center', backgroundColor: inBasket ? '#8B7355' : '#2C2C2A' }}
                >
                  {inBasket ? (
                    <>
                      <Check size={16} />
                      Added to Quote Basket
                    </>
                  ) : (
                    <>
                      <Plus size={16} />
                      Add to Quote
                    </>
                  )}
                </button>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <Link href="/rentals" className="btn-outline" style={{ flex: 1, justifyContent: 'center' }}>
                    <ArrowLeft size={14} />
                    Continue Browsing
                  </Link>
                  <Link href="/quote-basket" className="btn-outline" style={{ flex: 1, justifyContent: 'center' }}>
                    View Basket
                    <ArrowRight size={14} />
                  </Link>
                </div>

                <WhatsAppButton
                  message={`Hi, I'm interested in the ${product.name} for an event. Could you provide more information?`}
                  style={{ justifyContent: 'center' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
