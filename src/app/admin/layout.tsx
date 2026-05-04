'use client'

import Link from 'next/link'
import { LayoutDashboard, Package, Tags, FileText, ExternalLink } from 'lucide-react'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/quotes', label: 'Quote Requests', icon: FileText },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/categories', label: 'Categories', icon: Tags },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F2F0EB' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: '240px',
          backgroundColor: '#2C2C2A',
          padding: '0',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Brand */}
        <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(232,228,220,0.1)' }}>
          <Link
            href="/admin"
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '14px',
              fontWeight: 400,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: '#FAFAF8',
              textDecoration: 'none',
              display: 'block',
            }}
          >
            BTG Admin
          </Link>
          <p style={{ fontSize: '11px', color: 'rgba(232,228,220,0.4)', marginTop: '2px' }}>
            Been There Group
          </p>
        </div>

        {/* Nav */}
        <nav style={{ padding: '16px 0', flex: 1 }}>
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 20px',
                fontSize: '13px',
                color: 'rgba(232,228,220,0.7)',
                textDecoration: 'none',
                transition: 'all 0.15s',
                borderLeft: '2px solid transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#FAFAF8'
                e.currentTarget.style.backgroundColor = 'rgba(232,228,220,0.05)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(232,228,220,0.7)'
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              <Icon size={15} />
              {label}
            </Link>
          ))}
        </nav>

        {/* Bottom */}
        <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(232,228,220,0.1)' }}>
          <Link
            href="/"
            target="_blank"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '12px',
              color: 'rgba(232,228,220,0.4)',
              textDecoration: 'none',
            }}
          >
            <ExternalLink size={12} />
            View Website
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, overflowY: 'auto', padding: '32px' }}>
        {children}
      </main>
    </div>
  )
}
