import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import ProductCard from '@/components/catalogue/ProductCard'
import type { CategoryWithCount, ProductWithCategory } from '@/types'

// Cycles through ratios so adjacent cards vary naturally in height
const ASPECT_RATIOS = ['4/3', '3/4', '1/1', '4/3', '3/4', '5/4', '1/1', '3/4']
function getAspectRatio(index: number) {
  return ASPECT_RATIOS[index % ASPECT_RATIOS.length]
}

export const metadata = {
  title: 'Rentals & Catalogue',
  description: 'Browse our full range of premium event furniture available for rental in Gauteng.',
}

async function getCatalogueData(categorySlug?: string) {
  const [categories, products, totalCount] = await Promise.all([
    prisma.category.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
      include: { _count: { select: { products: { where: { active: true } } } } },
    }),
    prisma.product.findMany({
      where: {
        active: true,
        ...(categorySlug ? { category: { slug: categorySlug } } : {}),
      },
      include: { category: true, images: { orderBy: { order: 'asc' } } },
      orderBy: [{ featured: 'desc' }, { name: 'asc' }],
    }),
    prisma.product.count({ where: { active: true } }),
  ])
  return { categories, products, totalCount }
}

export default async function RentalsPage(props: {
  searchParams: Promise<{ category?: string }>
}) {
  const searchParams = await props.searchParams
  const { category } = searchParams
  const { categories, products, totalCount } = await getCatalogueData(category)

  return (
    <>
      {/* ── Hero headline ─────────────────────────────────────────── */}
      <section
        style={{
          padding: '88px 0 56px',
          backgroundColor: '#FAFAF8',
          textAlign: 'center',
        }}
      >
        <div className="container">
          <span className="section-label" style={{ display: 'block', marginBottom: '20px' }}>
            Browse the Collection
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(34px, 5vw, 60px)',
              fontWeight: 400,
              color: '#1A1A1A',
              maxWidth: '680px',
              margin: '0 auto',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
            }}
          >
            Premium event furniture,<br />designed to be remembered.
          </h1>
        </div>
      </section>

      {/* ── Category filter tiles ─────────────────────────────────── */}
      <section style={{ backgroundColor: '#FAFAF8', paddingBottom: '56px' }}>
        <div className="container">
          <p
            style={{
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#6B6560',
              marginBottom: '16px',
            }}
          >
            Filter by Category
          </p>

          <div className="filter-tiles-row">
            {/* All tile */}
            <Link
              href="/rentals"
              className={`filter-tile${!category ? ' active' : ''}`}
            >
              <div
                style={{
                  aspectRatio: '16/9',
                  backgroundColor: '#2C2C2A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span
                  style={{
                    fontSize: '10px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.5)',
                  }}
                >
                  All
                </span>
              </div>
              <div className="filter-tile-label">
                <span className="filter-tile-name">All Pieces</span>
                <span className="filter-tile-count">{totalCount}</span>
              </div>
            </Link>

            {/* One tile per category */}
            {(categories as CategoryWithCount[]).map((cat) => {
              const isActive = category === cat.slug
              const imgSrc = cat.imageUrl || `/images/category-${cat.slug}.jpg`
              return (
                <Link
                  key={cat.slug}
                  href={isActive ? '/rentals' : `/rentals?category=${cat.slug}`}
                  className={`filter-tile${isActive ? ' active' : ''}`}
                >
                  <div
                    style={{
                      position: 'relative',
                      aspectRatio: '16/9',
                      overflow: 'hidden',
                      backgroundColor: '#E8E4DC',
                    }}
                  >
                    <Image
                      src={imgSrc}
                      alt={cat.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      unoptimized
                    />
                  </div>
                  <div className="filter-tile-label">
                    <span className="filter-tile-name">{cat.name}</span>
                    <span className="filter-tile-count">{cat._count.products}</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Products grid ─────────────────────────────────────────── */}
      <section style={{ backgroundColor: '#FAFAF8', padding: '0 0 100px' }}>
        <div className="container">
          <p
            style={{
              fontSize: '13px',
              color: '#6B6560',
              marginBottom: '36px',
              letterSpacing: '0.01em',
            }}
          >
            Showing {products.length} of {totalCount} piece{totalCount !== 1 ? 's' : ''} ↓
          </p>

          {products.length > 0 ? (
            <div className="catalogue-masonry">
              {(products as ProductWithCategory[]).map((product, index) => (
                <div key={product.id} className="catalogue-masonry-item">
                  <ProductCard product={product} aspectRatio={getAspectRatio(index)} />
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '80px 24px' }}>
              <p
                style={{
                  fontFamily: 'var(--font-cormorant), Georgia, serif',
                  fontSize: '28px',
                  fontWeight: 400,
                  color: '#6B6560',
                  marginBottom: '24px',
                }}
              >
                No pieces found for this selection.
              </p>
              <Link href="/rentals" className="btn-outline">
                Clear filters
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
