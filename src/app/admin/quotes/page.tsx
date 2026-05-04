'use client'

import { useEffect, useState } from 'react'
import { ChevronDown, ChevronRight, Download, RefreshCw } from 'lucide-react'

type QuoteStatus = 'new' | 'reviewing' | 'quoted' | 'confirmed' | 'declined'

const statusOptions: QuoteStatus[] = ['new', 'reviewing', 'quoted', 'confirmed', 'declined']

const statusColors: Record<QuoteStatus, { bg: string; color: string }> = {
  new: { bg: '#FFF3E0', color: '#E65100' },
  reviewing: { bg: '#E3F2FD', color: '#1565C0' },
  quoted: { bg: '#E8F5E9', color: '#2E7D32' },
  confirmed: { bg: '#F3E5F5', color: '#6A1B9A' },
  declined: { bg: '#F2F0EB', color: '#6B6560' },
}

export default function AdminQuotesPage() {
  const [quotes, setQuotes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [filter, setFilter] = useState<QuoteStatus | 'all'>('all')

  const load = async () => {
    setLoading(true)
    const res = await fetch('/api/quotes')
    const data = await res.json()
    setQuotes(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const updateStatus = async (id: string, status: QuoteStatus) => {
    await fetch(`/api/quotes/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    setQuotes((prev) => prev.map((q) => q.id === id ? { ...q, status } : q))
  }

  const exportCSV = () => {
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Company', 'Event Type', 'Event Date', 'City', 'Venue', 'Delivery', 'Setup/Strike', 'Styling', 'Items', 'Status', 'Submitted']
    const rows = quotes.map((q) => [
      q.id,
      q.fullName,
      q.email,
      q.phone,
      q.companyName || '',
      q.eventType,
      q.eventDate,
      q.city,
      q.venue || '',
      q.deliveryRequired ? 'Yes' : 'No',
      q.setupStrikeRequired ? 'Yes' : 'No',
      q.stylingRequired ? 'Yes' : 'No',
      q.items.map((i: any) => `${i.productName}×${i.quantity}`).join('; '),
      q.status,
      new Date(q.createdAt).toISOString(),
    ])
    const csv = [headers, ...rows].map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `btg-quotes-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const filtered = filter === 'all' ? quotes : quotes.filter((q) => q.status === filter)

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '24px', fontWeight: 400, color: '#2C2C2A', marginBottom: '4px' }}>
            Quote Requests
          </h1>
          <p style={{ fontSize: '13px', color: '#6B6560' }}>{quotes.length} total requests</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={load} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', border: '1px solid #D8D4CC', background: '#fff', cursor: 'pointer', fontSize: '12px', color: '#6B6560' }}>
            <RefreshCw size={13} />
            Refresh
          </button>
          <button onClick={exportCSV} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', backgroundColor: '#2C2C2A', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 500, letterSpacing: '0.04em' }}>
            <Download size={13} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Filter */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {(['all', ...statusOptions] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            style={{
              padding: '6px 14px',
              fontSize: '12px',
              border: '1px solid',
              borderColor: filter === s ? '#2C2C2A' : '#D8D4CC',
              backgroundColor: filter === s ? '#2C2C2A' : '#fff',
              color: filter === s ? '#fff' : '#6B6560',
              cursor: 'pointer',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            {s === 'all' ? `All (${quotes.length})` : `${s} (${quotes.filter((q) => q.status === s).length})`}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#6B6560', backgroundColor: '#fff', border: '1px solid #E8E4DC' }}>
          Loading...
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#6B6560', backgroundColor: '#fff', border: '1px solid #E8E4DC' }}>
          No quote requests found.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {filtered.map((q) => {
            const isOpen = expanded === q.id
            const sc = statusColors[q.status as QuoteStatus] || statusColors.new
            return (
              <div key={q.id} style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC', overflow: 'hidden' }}>
                {/* Header row */}
                <button
                  onClick={() => setExpanded(isOpen ? null : q.id)}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    borderBottom: isOpen ? '1px solid #F2F0EB' : 'none',
                  }}
                >
                  {isOpen ? <ChevronDown size={15} style={{ color: '#8B7355', flexShrink: 0 }} /> : <ChevronRight size={15} style={{ color: '#A8926F', flexShrink: 0 }} />}

                  <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '200px 160px 120px 100px 80px auto', gap: '12px', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 500, color: '#2C2C2A' }}>{q.fullName}</div>
                      <div style={{ fontSize: '12px', color: '#6B6560' }}>{q.email}</div>
                    </div>
                    <div style={{ fontSize: '13px', color: '#6B6560' }}>{q.eventType}</div>
                    <div style={{ fontSize: '13px', color: '#6B6560' }}>{q.eventDate}</div>
                    <div style={{ fontSize: '13px', color: '#6B6560' }}>{q.city}</div>
                    <div style={{ fontSize: '13px', color: '#6B6560' }}>{q.items?.length || 0} items</div>
                    <span style={{ display: 'inline-block', padding: '3px 10px', fontSize: '10px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', backgroundColor: sc.bg, color: sc.color }}>
                      {q.status}
                    </span>
                  </div>

                  <div style={{ fontSize: '11px', color: '#A8926F', flexShrink: 0 }}>
                    {new Date(q.createdAt).toLocaleDateString('en-ZA')}
                  </div>
                </button>

                {/* Expanded */}
                {isOpen && (
                  <div style={{ padding: '24px 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
                    {/* Contact */}
                    <div>
                      <h4 style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#A8926F', marginBottom: '12px' }}>Contact</h4>
                      <div style={{ fontSize: '13px', color: '#6B6560', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <div><strong style={{ color: '#2C2C2A' }}>Name:</strong> {q.fullName}</div>
                        {q.companyName && <div><strong style={{ color: '#2C2C2A' }}>Company:</strong> {q.companyName}</div>}
                        <div><strong style={{ color: '#2C2C2A' }}>Email:</strong> <a href={`mailto:${q.email}`} style={{ color: '#8B7355' }}>{q.email}</a></div>
                        <div><strong style={{ color: '#2C2C2A' }}>Phone:</strong> <a href={`tel:${q.phone}`} style={{ color: '#8B7355' }}>{q.phone}</a></div>
                      </div>
                    </div>

                    {/* Event */}
                    <div>
                      <h4 style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#A8926F', marginBottom: '12px' }}>Event Details</h4>
                      <div style={{ fontSize: '13px', color: '#6B6560', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <div><strong style={{ color: '#2C2C2A' }}>Type:</strong> {q.eventType}</div>
                        <div><strong style={{ color: '#2C2C2A' }}>Date:</strong> {q.eventDate}</div>
                        <div><strong style={{ color: '#2C2C2A' }}>City:</strong> {q.city}</div>
                        {q.venue && <div><strong style={{ color: '#2C2C2A' }}>Venue:</strong> {q.venue}</div>}
                        {q.eventLocation && <div><strong style={{ color: '#2C2C2A' }}>Address:</strong> {q.eventLocation}</div>}
                      </div>
                    </div>

                    {/* Services */}
                    <div>
                      <h4 style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#A8926F', marginBottom: '12px' }}>Services Requested</h4>
                      <div style={{ fontSize: '13px', color: '#6B6560', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <div>Delivery: <strong style={{ color: q.deliveryRequired ? '#2E7D32' : '#2C2C2A' }}>{q.deliveryRequired ? 'Yes' : 'No'}</strong></div>
                        <div>Setup & Strike: <strong style={{ color: q.setupStrikeRequired ? '#2E7D32' : '#2C2C2A' }}>{q.setupStrikeRequired ? 'Yes' : 'No'}</strong></div>
                        <div>Styling Support: <strong style={{ color: q.stylingRequired ? '#2E7D32' : '#2C2C2A' }}>{q.stylingRequired ? 'Yes' : 'No'}</strong></div>
                        {q.notes && (
                          <div style={{ marginTop: '8px', padding: '10px', backgroundColor: '#F2F0EB', fontSize: '12px' }}>
                            <strong style={{ color: '#2C2C2A', display: 'block', marginBottom: '4px' }}>Notes:</strong>
                            {q.notes}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Items */}
                    <div>
                      <h4 style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#A8926F', marginBottom: '12px' }}>Furniture Items ({q.items?.length || 0})</h4>
                      {q.items?.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          {q.items.map((item: any) => (
                            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#6B6560', padding: '4px 0', borderBottom: '1px solid #F2F0EB' }}>
                              <span>{item.productName}</span>
                              <span style={{ fontWeight: 500, color: '#2C2C2A' }}>×{item.quantity}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p style={{ fontSize: '13px', color: '#A8926F', fontStyle: 'italic' }}>No items selected</p>
                      )}
                    </div>

                    {/* Status management */}
                    <div style={{ gridColumn: '1 / -1', borderTop: '1px solid #F2F0EB', paddingTop: '16px', display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '12px', fontWeight: 500, color: '#6B6560' }}>Update Status:</span>
                      {statusOptions.map((s) => {
                        const c = statusColors[s]
                        return (
                          <button
                            key={s}
                            onClick={() => updateStatus(q.id, s)}
                            style={{
                              padding: '6px 14px',
                              fontSize: '11px',
                              fontWeight: 600,
                              letterSpacing: '0.06em',
                              textTransform: 'uppercase',
                              backgroundColor: q.status === s ? '#2C2C2A' : c.bg,
                              color: q.status === s ? '#fff' : c.color,
                              border: '1px solid',
                              borderColor: q.status === s ? '#2C2C2A' : 'transparent',
                              cursor: 'pointer',
                            }}
                          >
                            {s}
                          </button>
                        )
                      })}

                      <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
                        <a
                          href={`mailto:${q.email}?subject=Re: Your Furniture Rental Quote Request`}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '8px 16px',
                            backgroundColor: '#2C2C2A',
                            color: '#fff',
                            textDecoration: 'none',
                            fontSize: '12px',
                            fontWeight: 500,
                          }}
                        >
                          Reply by Email
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
