import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import ProductCard from '@/components/catalogue/ProductCard'
import type { ProductWithCategory } from '@/types'
import { ArrowRight, ShoppingBag } from 'lucide-react'

export async function generateStaticParams() {
  const categories = await prisma.category.findMany({ where: { active: true }, select: { slug: true } })
  return categories.map((c) => ({ category: c.slug }))
}

export async function generateMetadata(props: { params: Promise<{ category: string }> }) {
  const { category: categorySlug } = await props.params
  const category = await prisma.category.findUnique({ where: { slug: categorySlug } })
  if (!category) return { title: 'Not Found' }
  return {
    title: category.name,
    description: category.description || `Browse our ${category.name} rental range.`,
  }
}

export default async function CategoryPage(props: { params: Promise<{ category: string }> }) {
  const { category: categorySlug } = await props.params

  const category = await prisma.category.findUnique({
    where: { slug: categorySlug, active: true },
    include: {
      products: {
        where: { active: true },
        include: { category: true, images: { orderBy: { order: 'asc' } } },
        orderBy: [{ featured: 'desc' }, { name: 'asc' }],
      },
    },
  })

  if (!category) notFound()

  const allCategories = await prisma.category.findMany({
    where: { active: true },
    orderBy: { order: 'asc' },
    select: { id: true, name: true, slug: true },
  })

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
          {/* Breadcrumb */}
          <nav style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '24px', fontSize: '12px', color: '#6B6560' }}>
            <Link href="/" style={{ color: '#6B6560', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <Link href="/rentals" style={{ color: '#6B6560', textDecoration: 'none' }}>Rentals</Link>
            <span>/</span>
            <span style={{ color: '#2C2C2A' }}>{category.name}</span>
          </nav>

          <span className="section-label">Rental Category</span>
          <h1
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(36px, 5vw, 60px)',
              fontWeight: 300,
              color: '#2C2C2A',
              marginBottom: '12px',
            }}
          >
            {category.name}
          </h1>
          {category.description && (
            <p style={{ fontSize: '16px', color: '#6B6560', maxWidth: '520px', lineHeight: 1.7 }}>
              {category.description}
            </p>
          )}
          <p style={{ fontSize: '13px', color: '#A8926F', marginTop: '16px' }}>
            {category.products.length} piece{category.products.length !== 1 ? 's' : ''} available · Price on request
          </p>
        </div>
      </section>

      <section style={{ padding: '48px 0', flex: 1, backgroundColor: '#FAFAF8' }}>
        <div className="container">
          {/* Category nav */}
          <div
            style={{
              display: 'flex',
              overflowX: 'auto',
              gap: '4px',
              marginBottom: '40px',
              paddingBottom: '4px',
            }}
          >
            {allCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/rentals/${cat.slug}`}
                style={{
                  padding: '8px 16px',
                  fontSize: '12px',
                  letterSpacing: '0.04em',
                  whiteSpace: 'nowrap',
                  textDecoration: 'none',
                  backgroundColor: cat.slug === categorySlug ? '#2C2C2A' : '#F2F0EB',
                  color: cat.slug === categorySlug ? '#fff' : '#6B6560',
                  transition: 'all 0.2s',
                  border: '1px solid',
                  borderColor: cat.slug === categorySlug ? '#2C2C2A' : '#E8E4DC',
                }}
              >
                {cat.name}
              </Link>
            ))}
          </div>

          {/* Products */}
          {category.products.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '24px',
              }}
            >
              {(category.products as ProductWithCategory[]).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '80px 24px' }}>
              <p style={{ fontSize: '16px', color: '#6B6560', marginBottom: '20px' }}>
                Products coming soon. Contact us to discuss your requirements.
              </p>
              <Link href="/contact" className="btn-primary">Contact Us</Link>
            </div>
          )}

          {/* CTA */}
          <div
            style={{
              marginTop: '64px',
              padding: '48px',
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
                  fontSize: '26px',
                  fontWeight: 400,
                  color: '#2C2C2A',
                  marginBottom: '8px',
                }}
              >
                Ready to add to your quote?
              </h3>
              <p style={{ fontSize: '14px', color: '#6B6560' }}>
                Add pieces to your Quote Basket and submit a formal quote request.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/quote-basket" className="btn-primary">
                <ShoppingBag size={16} />
                View Quote Basket
              </Link>
              <Link href="/rentals" className="btn-outline">
                Continue Browsing <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
