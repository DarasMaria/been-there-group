import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { FileText, Package, Tags, TrendingUp } from 'lucide-react'

async function getDashboardStats() {
  const [totalQuotes, newQuotes, totalProducts, totalCategories] = await Promise.all([
    prisma.quoteRequest.count(),
    prisma.quoteRequest.count({ where: { status: 'new' } }),
    prisma.product.count({ where: { active: true } }),
    prisma.category.count({ where: { active: true } }),
  ])
  return { totalQuotes, newQuotes, totalProducts, totalCategories }
}

async function getRecentQuotes() {
  return prisma.quoteRequest.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: { items: true },
  })
}

function StatCard({ icon: Icon, label, value, sub, href, urgent }: any) {
  return (
    <Link
      href={href}
      style={{
        backgroundColor: '#fff',
        border: `1px solid ${urgent && value > 0 ? '#F0D9C0' : '#E8E4DC'}`,
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        textDecoration: 'none',
        transition: 'box-shadow 0.2s',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ width: '36px', height: '36px', backgroundColor: '#F2F0EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={16} style={{ color: urgent && value > 0 ? '#8B7355' : '#A8926F' }} />
        </div>
        {urgent && value > 0 && (
          <span style={{ fontSize: '10px', fontWeight: 600, backgroundColor: '#8B7355', color: '#fff', padding: '2px 8px', letterSpacing: '0.06em' }}>
            ACTION
          </span>
        )}
      </div>
      <div>
        <div style={{ fontSize: '32px', fontWeight: 300, fontFamily: 'Georgia, serif', color: '#2C2C2A', lineHeight: 1 }}>
          {value}
        </div>
        <div style={{ fontSize: '13px', fontWeight: 500, color: '#6B6560', marginTop: '4px' }}>{label}</div>
        {sub && <div style={{ fontSize: '12px', color: '#A8926F', marginTop: '2px' }}>{sub}</div>}
      </div>
    </Link>
  )
}

export default async function AdminDashboard() {
  const { totalQuotes, newQuotes, totalProducts, totalCategories } = await getDashboardStats()
  const recentQuotes = await getRecentQuotes()

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '28px', fontWeight: 400, color: '#2C2C2A', marginBottom: '4px' }}>
          Dashboard
        </h1>
        <p style={{ fontSize: '14px', color: '#6B6560' }}>
          Been There Group admin panel
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '40px' }}>
        <StatCard icon={FileText} label="New Quote Requests" value={newQuotes} sub="Awaiting review" href="/admin/quotes" urgent />
        <StatCard icon={TrendingUp} label="Total Quote Requests" value={totalQuotes} href="/admin/quotes" />
        <StatCard icon={Package} label="Active Products" value={totalProducts} href="/admin/products" />
        <StatCard icon={Tags} label="Categories" value={totalCategories} href="/admin/categories" />
      </div>

      {/* Recent quotes */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #E8E4DC', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 500, color: '#2C2C2A' }}>Recent Quote Requests</h2>
          <Link href="/admin/quotes" style={{ fontSize: '12px', color: '#8B7355', textDecoration: 'none' }}>
            View all →
          </Link>
        </div>

        {recentQuotes.length === 0 ? (
          <div style={{ padding: '40px 24px', textAlign: 'center', color: '#6B6560', fontSize: '14px' }}>
            No quote requests yet.
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #F2F0EB' }}>
                {['Client', 'Event Type', 'Event Date', 'City', 'Items', 'Status', 'Submitted'].map((h) => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#A8926F' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentQuotes.map((q) => (
                <tr key={q.id} style={{ borderBottom: '1px solid #F2F0EB' }}>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontSize: '14px', fontWeight: 500, color: '#2C2C2A' }}>{q.fullName}</div>
                    <div style={{ fontSize: '12px', color: '#6B6560' }}>{q.email}</div>
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: '13px', color: '#6B6560' }}>{q.eventType}</td>
                  <td style={{ padding: '14px 16px', fontSize: '13px', color: '#6B6560' }}>{q.eventDate}</td>
                  <td style={{ padding: '14px 16px', fontSize: '13px', color: '#6B6560' }}>{q.city}</td>
                  <td style={{ padding: '14px 16px', fontSize: '13px', color: '#6B6560' }}>{q.items.length}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '3px 10px',
                        fontSize: '11px',
                        fontWeight: 500,
                        letterSpacing: '0.04em',
                        backgroundColor: q.status === 'new' ? '#FFF3E0' : q.status === 'quoted' ? '#E8F5E9' : '#F2F0EB',
                        color: q.status === 'new' ? '#E65100' : q.status === 'quoted' ? '#2E7D32' : '#6B6560',
                      }}
                    >
                      {q.status.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: '12px', color: '#A8926F' }}>
                    {new Date(q.createdAt).toLocaleDateString('en-ZA')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
