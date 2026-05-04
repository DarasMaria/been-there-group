import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Package } from 'lucide-react'

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { order: 'asc' },
    include: {
      _count: { select: { products: { where: { active: true } } } },
    },
  })

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '24px', fontWeight: 400, color: '#2C2C2A', marginBottom: '4px' }}>
          Categories
        </h1>
        <p style={{ fontSize: '13px', color: '#6B6560' }}>{categories.length} categories</p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '16px',
        }}
      >
        {categories.map((cat) => (
          <div
            key={cat.id}
            style={{
              backgroundColor: '#fff',
              border: '1px solid #E8E4DC',
              padding: '24px',
              opacity: cat.active ? 1 : 0.6,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#F2F0EB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Package size={18} style={{ color: '#8B7355' }} />
              </div>
              <span style={{ fontSize: '11px', color: cat.active ? '#2E7D32' : '#6B6560', fontWeight: 500 }}>
                {cat.active ? 'Active' : 'Hidden'}
              </span>
            </div>

            <h3 style={{ fontSize: '16px', fontWeight: 500, color: '#2C2C2A', marginBottom: '4px' }}>
              {cat.name}
            </h3>
            <p style={{ fontSize: '12px', color: '#A8926F', marginBottom: '8px' }}>
              /{cat.slug}
            </p>
            {cat.description && (
              <p style={{ fontSize: '13px', color: '#6B6560', lineHeight: 1.6, marginBottom: '12px' }}>
                {cat.description}
              </p>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid #F2F0EB' }}>
              <span style={{ fontSize: '12px', color: '#6B6560' }}>
                {cat._count.products} active product{cat._count.products !== 1 ? 's' : ''}
              </span>
              <Link
                href={`/rentals/${cat.slug}`}
                target="_blank"
                style={{ fontSize: '12px', color: '#8B7355', textDecoration: 'none' }}
              >
                View →
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '32px', padding: '20px 24px', backgroundColor: '#F2F0EB', border: '1px solid #D8D4CC', fontSize: '13px', color: '#6B6560' }}>
        <strong style={{ color: '#2C2C2A' }}>Note:</strong> Category management is currently available via database seeding. Full CMS editing for categories will be available in a future update.
      </div>
    </div>
  )
}
