import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { ArrowRight, CheckCircle, Truck, Settings, Palette, Star } from 'lucide-react'
import type { CategoryWithCount, ProductWithCategory } from '@/types'
import CategoryCard from '@/components/catalogue/CategoryCard'
import ProductCard from '@/components/catalogue/ProductCard'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

async function getHomeData() {
  const [categories, featuredProducts] = await Promise.all([
    prisma.category.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
      include: { _count: { select: { products: { where: { active: true } } } } },
      take: 6,
    }),
    prisma.product.findMany({
      where: { featured: true, active: true },
      include: { category: true, images: { orderBy: { order: 'asc' } } },
      take: 6,
    }),
  ])
  return { categories, featuredProducts }
}

const services = [
  { icon: Truck, title: 'Delivery & Collection', description: 'White-glove delivery and collection across the Gauteng events market.' },
  { icon: Settings, title: 'Setup & Strike', description: 'Professional on-site installation and pack-down by our experienced crew.' },
  { icon: Palette, title: 'Styling Support', description: 'Expert event layout planning and styling support for complex productions.' },
  { icon: Star, title: 'Custom Sourcing', description: 'Bespoke furniture and branded hospitality builds for unique event requirements.' },
]

const steps = [
  { number: '01', title: 'Browse Inventory', description: 'Explore our curated catalogue of premium event furniture across all categories.' },
  { number: '02', title: 'Build Your Quote', description: 'Add your selected pieces to the Quote Basket with required quantities.' },
  { number: '03', title: 'Submit Enquiry', description: 'Complete the quote request form with your event details and requirements.' },
  { number: '04', title: 'Receive Your Quote', description: 'Our team reviews your requirements and issues a formal, itemised quote.' },
]

export default async function HomePage() {
  const { categories, featuredProducts } = await getHomeData()

  return (
    <>
      {/* Hero */}
      <section
        style={{
          minHeight: 'calc(100vh - 72px)',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#F2F0EB',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D8D4CC' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            opacity: 0.5,
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '80px', paddingBottom: '80px' }}>
          <div style={{ maxWidth: '760px' }}>
            <span className="section-label">Gauteng Events Market</span>
            <h1
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 'clamp(44px, 6.5vw, 88px)',
                fontWeight: 300,
                lineHeight: 1.05,
                color: '#2C2C2A',
                marginBottom: '28px',
                letterSpacing: '-0.02em',
              }}
            >
              Premium event<br />
              furniture rental<br />
              <em style={{ fontStyle: 'italic', color: '#8B7355' }}>for beautiful spaces</em>
            </h1>
            <p
              style={{
                fontSize: '17px',
                color: '#6B6560',
                maxWidth: '500px',
                lineHeight: 1.75,
                marginBottom: '40px',
              }}
            >
              Curated furniture rental for corporates, agencies, venues and private clients. Delivered with professional execution.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
              <Link href="/rentals" className="btn-primary">
                Browse Rentals
                <ArrowRight size={16} />
              </Link>
              <Link href="/quote-basket/request" className="btn-outline">
                Build Your Quote
              </Link>
            </div>

            {/* Trust signals */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', marginTop: '48px' }}>
              {['Event Planners & Agencies', 'Corporate Clients', 'Venues & Private Clients'].map((tag) => (
                <div key={tag} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle size={14} style={{ color: '#8B7355', flexShrink: 0 }} />
                  <span style={{ fontSize: '13px', color: '#6B6560' }}>{tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative side element */}
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: '40%',
            backgroundImage: 'url(/images/hero-placeholder.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'none',
          }}
          className="hero-image"
        />
      </section>

      {/* Featured Categories */}
      <section style={{ padding: '80px 0', backgroundColor: '#FAFAF8' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '40px' }}>
            <div>
              <span className="section-label">Rental Catalogue</span>
              <h2 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 300, color: '#2C2C2A', margin: 0 }}>
                Browse by category
              </h2>
            </div>
            <Link href="/rentals" className="btn-ghost">
              View all <ArrowRight size={14} />
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '16px',
            }}
          >
            {(categories as CategoryWithCount[]).map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Value Prop */}
      <section style={{ padding: '80px 0', backgroundColor: '#F2F0EB', borderTop: '1px solid #D8D4CC', borderBottom: '1px solid #D8D4CC' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '48px',
              alignItems: 'center',
            }}
          >
            <div>
              <span className="section-label">Why Been There Group</span>
              <h2
                style={{
                  fontFamily: 'var(--font-cormorant), Georgia, serif',
                  fontSize: 'clamp(28px, 3.5vw, 44px)',
                  fontWeight: 300,
                  color: '#2C2C2A',
                  marginBottom: '20px',
                }}
              >
                Premium furniture.<br />Professional execution.
              </h2>
              <p style={{ fontSize: '15px', color: '#6B6560', lineHeight: 1.8, marginBottom: '28px' }}>
                We serve event planners, corporate clients, agencies, venues and private clients across Gauteng — bringing premium furniture rental and end-to-end operational support to every event we touch.
              </p>
              <p style={{ fontSize: '15px', color: '#6B6560', lineHeight: 1.8 }}>
                Pricing is event-specific. We don't publish rates online. Instead, we issue a formal, itemised quote based on your exact requirements.
              </p>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px',
              }}
            >
              {[
                { label: 'Premium Catalogue', desc: 'Curated range spanning lounge, cocktail, bar and reception furniture.' },
                { label: 'Gauteng-wide', desc: 'Serving the full Gauteng events market from a single professional operation.' },
                { label: 'Full-service', desc: 'Delivery, setup, strike and styling support — all available in one quote.' },
                { label: 'Price on Request', desc: 'No online pricing. Every quote is personalised to your event requirements.' },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    padding: '24px',
                    backgroundColor: '#fff',
                    border: '1px solid #E8E4DC',
                  }}
                >
                  <h3
                    style={{
                      fontFamily: 'var(--font-cormorant), Georgia, serif',
                      fontSize: '18px',
                      fontWeight: 500,
                      color: '#2C2C2A',
                      margin: '0 0 8px',
                    }}
                  >
                    {item.label}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#6B6560', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section style={{ padding: '80px 0', backgroundColor: '#FAFAF8' }}>
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '40px' }}>
              <div>
                <span className="section-label">Featured Pieces</span>
                <h2 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 300, color: '#2C2C2A', margin: 0 }}>
                  Selected from our collection
                </h2>
              </div>
              <Link href="/rentals" className="btn-ghost">
                Full catalogue <ArrowRight size={14} />
              </Link>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '24px',
              }}
            >
              {(featuredProducts as ProductWithCategory[]).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Services Snapshot */}
      <section style={{ padding: '80px 0', backgroundColor: '#2C2C2A' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={{ display: 'block', fontSize: '11px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#A8926F', marginBottom: '12px' }}>
              What We Offer
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 'clamp(28px, 3.5vw, 44px)',
                fontWeight: 300,
                color: '#FAFAF8',
                margin: '0 auto',
              }}
            >
              More than furniture rental
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '32px',
            }}
          >
            {services.map(({ icon: Icon, title, description }) => (
              <div key={title} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    backgroundColor: 'rgba(139,115,85,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                  }}
                >
                  <Icon size={22} style={{ color: '#A8926F' }} />
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: '20px',
                    fontWeight: 400,
                    color: '#FAFAF8',
                    marginBottom: '10px',
                  }}
                >
                  {title}
                </h3>
                <p style={{ fontSize: '13px', color: 'rgba(232,228,220,0.65)', lineHeight: 1.7 }}>
                  {description}
                </p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link
              href="/services"
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
                transition: 'all 0.2s',
              }}
            >
              View All Services <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: '80px 0', backgroundColor: '#FAFAF8', borderTop: '1px solid #D8D4CC' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="section-label">The Process</span>
            <h2
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 'clamp(28px, 3.5vw, 44px)',
                fontWeight: 300,
                color: '#2C2C2A',
                margin: 0,
              }}
            >
              How it works
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '32px',
            }}
          >
            {steps.map((step) => (
              <div key={step.number} style={{ position: 'relative' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: '60px',
                    fontWeight: 300,
                    color: '#E8E4DC',
                    lineHeight: 1,
                    marginBottom: '16px',
                  }}
                >
                  {step.number}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: '22px',
                    fontWeight: 400,
                    color: '#2C2C2A',
                    marginBottom: '10px',
                  }}
                >
                  {step.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#6B6560', lineHeight: 1.7 }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section style={{ padding: '80px 0', backgroundColor: '#F2F0EB', borderTop: '1px solid #D8D4CC' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '32px' }}>
            <div>
              <span className="section-label">Gallery</span>
              <h2 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 300, color: '#2C2C2A', margin: 0 }}>
                Furniture in context
              </h2>
            </div>
            <Link href="/gallery" className="btn-ghost">
              View gallery <ArrowRight size={14} />
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gridTemplateRows: 'repeat(2, 240px)',
              gap: '8px',
            }}
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                style={{
                  backgroundColor: '#D8D4CC',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gridColumn: i === 1 ? 'span 2' : 'span 1',
                  gridRow: i === 1 ? 'span 2' : 'span 1',
                }}
              >
                <span style={{ fontSize: '12px', color: '#6B6560', letterSpacing: '0.06em' }}>
                  {i === 1 ? 'Event photography coming soon' : ''}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Catalogue */}
      <section style={{ padding: '80px 0', backgroundColor: '#fff', borderTop: '1px solid #D8D4CC', borderBottom: '1px solid #D8D4CC' }}>
        <div className="container">
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '48px',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <span className="section-label">Catalogue & Lookbook</span>
              <h2
                style={{
                  fontFamily: 'var(--font-cormorant), Georgia, serif',
                  fontSize: 'clamp(28px, 3.5vw, 42px)',
                  fontWeight: 300,
                  color: '#2C2C2A',
                  marginBottom: '12px',
                }}
              >
                Download our catalogue
              </h2>
              <p style={{ fontSize: '15px', color: '#6B6560', maxWidth: '420px', lineHeight: 1.7 }}>
                Get the full Been There Group product catalogue and lookbook. Browse the complete range offline and share with your planning team.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
              <Link href="/catalogue" className="btn-primary">
                Download Catalogue
                <ArrowRight size={16} />
              </Link>
              <p style={{ fontSize: '12px', color: '#A8926F', fontStyle: 'italic' }}>
                No sign-up required
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote CTA */}
      <section style={{ padding: '96px 0', backgroundColor: '#F2F0EB' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-label">Ready to plan?</span>
          <h2
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(32px, 5vw, 64px)',
              fontWeight: 300,
              color: '#2C2C2A',
              marginBottom: '20px',
            }}
          >
            Build your quote today
          </h2>
          <p
            style={{
              fontSize: '16px',
              color: '#6B6560',
              maxWidth: '480px',
              margin: '0 auto 40px',
              lineHeight: 1.7,
            }}
          >
            Browse our catalogue, add the pieces you need, and submit a formal quote request. Our team follows up within 24 hours.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            <Link href="/quote-basket/request" className="btn-primary">
              Request a Quote
              <ArrowRight size={16} />
            </Link>
            <Link href="/rentals" className="btn-outline">
              Browse Rentals
            </Link>
          </div>
        </div>
      </section>

      {/* Contact / WhatsApp CTA */}
      <section style={{ padding: '64px 0', backgroundColor: '#FAFAF8', borderTop: '1px solid #D8D4CC' }}>
        <div className="container">
          <div
            style={{
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
                  fontSize: '26px',
                  fontWeight: 400,
                  color: '#2C2C2A',
                  marginBottom: '6px',
                }}
              >
                Prefer to talk it through?
              </h3>
              <p style={{ fontSize: '14px', color: '#6B6560' }}>
                Our team is available via WhatsApp or email for any enquiries.
              </p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <WhatsAppButton />
              <Link href="/contact" className="btn-outline">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
