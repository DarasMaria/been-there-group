'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Trash2, Eye, EyeOff } from 'lucide-react'
import { slugify } from '@/lib/utils'

interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  categoryId: string
  dimensions: string | null
  material: string | null
  colour: string | null
  seatingCapacity: number | null
  styleTags: string | null
  eventTypes: string | null
  indoor: boolean
  outdoor: boolean
  featured: boolean
  active: boolean
}

export default function EditProductPage(props: { params: Promise<{ slug: string }> }) {
  const router = useRouter()
  const [slug, setSlug] = useState('')
  const [categories, setCategories] = useState<any[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({
    name: '',
    slug: '',
    description: '',
    categoryId: '',
    dimensions: '',
    material: '',
    colour: '',
    seatingCapacity: '',
    styleTags: '',
    eventTypes: '',
    indoor: true,
    outdoor: false,
    featured: false,
    active: true,
  })

  useEffect(() => {
    props.params.then(({ slug: s }) => {
      setSlug(s)
      Promise.all([
        fetch(`/api/products/${s}`).then((r) => r.json()),
        fetch('/api/categories').then((r) => r.json()),
      ]).then(([product, cats]: [Product, any[]]) => {
        setCategories(cats)
        setForm({
          name: product.name,
          slug: product.slug,
          description: product.description ?? '',
          categoryId: product.categoryId,
          dimensions: product.dimensions ?? '',
          material: product.material ?? '',
          colour: product.colour ?? '',
          seatingCapacity: product.seatingCapacity?.toString() ?? '',
          styleTags: product.styleTags ? JSON.parse(product.styleTags).join(', ') : '',
          eventTypes: product.eventTypes ? JSON.parse(product.eventTypes).join(', ') : '',
          indoor: product.indoor,
          outdoor: product.outdoor,
          featured: product.featured,
          active: product.active,
        })
        setLoading(false)
      })
    })
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
      ...(name === 'name' ? { slug: slugify(value) } : {}),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch(`/api/products/${slug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          styleTags: form.styleTags ? form.styleTags.split(',').map((t) => t.trim()) : [],
          eventTypes: form.eventTypes ? form.eventTypes.split(',').map((t) => t.trim()) : [],
          seatingCapacity: form.seatingCapacity ? Number(form.seatingCapacity) : null,
        }),
      })
      if (res.ok) {
        const updated = await res.json()
        router.push(`/admin/products/${updated.slug}`)
      }
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Archive this product? It will be hidden from the catalogue but not permanently deleted.')) return
    setDeleting(true)
    try {
      await fetch(`/api/products/${slug}`, { method: 'DELETE' })
      router.push('/admin/products')
    } finally {
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200px', color: '#6B6560', fontSize: '14px' }}>
        Loading product...
      </div>
    )
  }

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <Link href="/admin/products" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#6B6560', textDecoration: 'none', marginBottom: '12px' }}>
          <ArrowLeft size={14} /> Back to Products
        </Link>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '24px', fontWeight: 400, color: '#2C2C2A' }}>
            Edit: {form.name}
          </h1>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Link
              href={`/rentals/${categories.find(c => c.id === form.categoryId)?.slug ?? ''}/${form.slug}`}
              target="_blank"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 14px', border: '1px solid #E8E4DC', backgroundColor: '#fff', color: '#6B6560', textDecoration: 'none', fontSize: '13px' }}
            >
              <Eye size={13} /> View Page
            </Link>
            <button
              onClick={handleDelete}
              disabled={deleting}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 14px', border: '1px solid #E8E4DC', backgroundColor: '#fff', color: '#C0392B', cursor: 'pointer', fontSize: '13px', opacity: deleting ? 0.6 : 1 }}
            >
              <Trash2 size={13} /> {deleting ? 'Archiving...' : 'Archive'}
            </button>
          </div>
        </div>
      </div>

      {!form.active && (
        <div style={{ marginBottom: '16px', padding: '12px 16px', backgroundColor: '#FFF8E1', border: '1px solid #FFE082', fontSize: '13px', color: '#7A5400', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <EyeOff size={14} />
          This product is currently hidden from the catalogue.
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC', padding: '32px', maxWidth: '720px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div className="form-group" style={{ gridColumn: 'span 2' }}>
            <label className="form-label">Product Name *</label>
            <input name="name" type="text" required value={form.name} onChange={handleChange} className="form-input" />
          </div>

          <div className="form-group">
            <label className="form-label">Slug *</label>
            <input name="slug" type="text" required value={form.slug} onChange={handleChange} className="form-input" />
          </div>

          <div className="form-group">
            <label className="form-label">Category *</label>
            <select name="categoryId" required value={form.categoryId} onChange={handleChange} className="form-input">
              <option value="">Select category</option>
              {categories.map((c: any) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group" style={{ gridColumn: 'span 2' }}>
            <label className="form-label">Description</label>
            <textarea name="description" rows={3} value={form.description} onChange={handleChange} className="form-input" style={{ resize: 'vertical' }} />
          </div>

          <div className="form-group">
            <label className="form-label">Dimensions</label>
            <input name="dimensions" type="text" value={form.dimensions} onChange={handleChange} className="form-input" placeholder="e.g. 210cm W × 88cm D × 78cm H" />
          </div>

          <div className="form-group">
            <label className="form-label">Material</label>
            <input name="material" type="text" value={form.material} onChange={handleChange} className="form-input" />
          </div>

          <div className="form-group">
            <label className="form-label">Colour</label>
            <input name="colour" type="text" value={form.colour} onChange={handleChange} className="form-input" />
          </div>

          <div className="form-group">
            <label className="form-label">Seating Capacity</label>
            <input name="seatingCapacity" type="number" value={form.seatingCapacity} onChange={handleChange} className="form-input" min="1" />
          </div>

          <div className="form-group">
            <label className="form-label">Style Tags (comma-separated)</label>
            <input name="styleTags" type="text" value={form.styleTags} onChange={handleChange} className="form-input" placeholder="e.g. modern, luxe, minimal" />
          </div>

          <div className="form-group">
            <label className="form-label">Event Types (comma-separated)</label>
            <input name="eventTypes" type="text" value={form.eventTypes} onChange={handleChange} className="form-input" placeholder="e.g. wedding, corporate, gala" />
          </div>

          <div style={{ display: 'flex', gap: '20px', gridColumn: 'span 2', flexWrap: 'wrap' }}>
            <label style={{ display: 'flex', gap: '8px', alignItems: 'center', cursor: 'pointer', fontSize: '14px', color: '#2C2C2A' }}>
              <input name="indoor" type="checkbox" checked={form.indoor} onChange={handleChange} style={{ accentColor: '#8B7355' }} />
              Indoor
            </label>
            <label style={{ display: 'flex', gap: '8px', alignItems: 'center', cursor: 'pointer', fontSize: '14px', color: '#2C2C2A' }}>
              <input name="outdoor" type="checkbox" checked={form.outdoor} onChange={handleChange} style={{ accentColor: '#8B7355' }} />
              Outdoor
            </label>
            <label style={{ display: 'flex', gap: '8px', alignItems: 'center', cursor: 'pointer', fontSize: '14px', color: '#2C2C2A' }}>
              <input name="featured" type="checkbox" checked={form.featured} onChange={handleChange} style={{ accentColor: '#8B7355' }} />
              Featured
            </label>
            <label style={{ display: 'flex', gap: '8px', alignItems: 'center', cursor: 'pointer', fontSize: '14px', color: '#2C2C2A' }}>
              <input name="active" type="checkbox" checked={form.active} onChange={handleChange} style={{ accentColor: '#8B7355' }} />
              Active (visible in catalogue)
            </label>
          </div>
        </div>

        <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
          <button type="submit" disabled={submitting} className="btn-primary" style={{ opacity: submitting ? 0.7 : 1 }}>
            {submitting ? 'Saving...' : 'Save Changes'}
          </button>
          <Link href="/admin/products" className="btn-outline">Cancel</Link>
        </div>
      </form>
    </div>
  )
}
