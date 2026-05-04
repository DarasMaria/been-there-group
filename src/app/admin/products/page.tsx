import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Plus, Eye, EyeOff, Star } from 'lucide-react'
import { parseJsonArray } from '@/lib/utils'

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: {
      category: { select: { name: true, slug: true } },
      images: { orderBy: { order: 'asc' }, take: 1 },
    },
    orderBy: [{ category: { order: 'asc' } }, { name: 'asc' }],
  })

  const categories = await prisma.category.findMany({
    where: { active: true },
    orderBy: { order: 'asc' },
  })

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '24px', fontWeight: 400, color: '#2C2C2A', marginBottom: '4px' }}>
            Products
          </h1>
          <p style={{ fontSize: '13px', color: '#6B6560' }}>{products.length} products total</p>
        </div>
        <Link
          href="/admin/products/new"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '10px 18px',
            backgroundColor: '#2C2C2A',
            color: '#fff',
            textDecoration: 'none',
            fontSize: '13px',
            fontWeight: 500,
          }}
        >
          <Plus size={14} />
          Add Product
        </Link>
      </div>

      <div style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #E8E4DC', backgroundColor: '#FAFAF8' }}>
              {['Product', 'Category', 'Material', 'Colour', 'Featured', 'Status'].map((h) => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#A8926F' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((p) => {
              const tags = parseJsonArray(p.styleTags).slice(0, 2)
              return (
                <tr key={p.id} style={{ borderBottom: '1px solid #F2F0EB', opacity: p.active ? 1 : 0.5 }}>
                  <td style={{ padding: '14px 16px' }}>
                    <Link
                      href={`/admin/products/${p.slug}`}
                      style={{ fontSize: '14px', fontWeight: 500, color: '#2C2C2A', textDecoration: 'none' }}
                    >
                      {p.name}
                    </Link>
                    {tags.length > 0 && (
                      <div style={{ display: 'flex', gap: '4px', marginTop: '4px', flexWrap: 'wrap' }}>
                        {tags.map((t) => (
                          <span key={t} style={{ fontSize: '10px', padding: '2px 6px', backgroundColor: '#F2F0EB', color: '#6B6560' }}>{t}</span>
                        ))}
                      </div>
                    )}
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: '13px', color: '#6B6560' }}>
                    <Link href={`/rentals/${p.category.slug}`} style={{ color: '#8B7355', textDecoration: 'none' }}>
                      {p.category.name}
                    </Link>
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: '13px', color: '#6B6560' }}>{p.material?.split(',')[0] || '—'}</td>
                  <td style={{ padding: '14px 16px', fontSize: '13px', color: '#6B6560' }}>{p.colour || '—'}</td>
                  <td style={{ padding: '14px 16px' }}>
                    {p.featured && <Star size={14} style={{ color: '#8B7355' }} />}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: p.active ? '#2E7D32' : '#6B6560' }}>
                      {p.active ? <Eye size={12} /> : <EyeOff size={12} />}
                      {p.active ? 'Active' : 'Hidden'}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
