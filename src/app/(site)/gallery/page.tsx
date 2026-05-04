import PageHero from '@/components/ui/PageHero'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Gallery',
  description: 'Browse our gallery of premium event furniture in real event settings.',
}

const placeholderItems = [
  { label: 'Lounge Setup — Corporate Conference', aspect: 'wide' },
  { label: 'Cocktail Area — Gala Dinner', aspect: 'tall' },
  { label: 'Bar Build — Brand Activation', aspect: 'standard' },
  { label: 'Lounge Vignette — Wedding Reception', aspect: 'standard' },
  { label: 'Outdoor Setup — Garden Event', aspect: 'wide' },
  { label: 'Reception Area — Corporate Event', aspect: 'tall' },
  { label: 'Cocktail Setting — Product Launch', aspect: 'standard' },
  { label: 'Styled Lounge — Private Function', aspect: 'standard' },
  { label: 'Full Floor — Awards Ceremony', aspect: 'wide' },
]

export default function GalleryPage() {
  return (
    <>
      <PageHero
        label="Gallery"
        title="Furniture in context"
        subtitle="A selection of Been There Group furniture in real event settings. Photography will be updated as events are completed."
      />

      <section style={{ padding: '64px 0 80px', backgroundColor: '#FAFAF8', flex: 1 }}>
        <div className="container">
          {/* Notice */}
          <div
            style={{
              padding: '20px 24px',
              backgroundColor: '#F2F0EB',
              border: '1px solid #D8D4CC',
              marginBottom: '40px',
              fontSize: '14px',
              color: '#6B6560',
              borderLeft: '3px solid #A8926F',
            }}
          >
            Our gallery is being built out as events are delivered. Real event photography will be added here progressively. In the meantime, browse our catalogue to see individual product photography.
          </div>

          {/* Gallery grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '8px',
            }}
          >
            {placeholderItems.map((item, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: '#E8E4DC',
                  aspectRatio: item.aspect === 'wide' ? '16/9' : item.aspect === 'tall' ? '3/4' : '4/3',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '24px',
                  textAlign: 'center',
                  gridColumn: item.aspect === 'wide' ? 'span 2' : 'span 1',
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: '#D8D4CC',
                    marginBottom: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                    <rect width="18" height="14" rx="1" fill="#C8C4BC" />
                    <circle cx="5" cy="5" r="2" fill="#B8B4AC" />
                    <path d="M0 10l4-4 4 4 3-5 7 9H0z" fill="#B8B4AC" />
                  </svg>
                </div>
                <p style={{ fontSize: '12px', color: '#6B6560', letterSpacing: '0.04em', lineHeight: 1.5 }}>
                  {item.label}
                </p>
                <p style={{ fontSize: '11px', color: '#A8926F', marginTop: '4px', fontStyle: 'italic' }}>
                  Photography coming soon
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center', marginTop: '64px' }}>
            <h3
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: '28px',
                fontWeight: 400,
                color: '#2C2C2A',
                marginBottom: '12px',
              }}
            >
              Browse the full catalogue
            </h3>
            <p style={{ fontSize: '14px', color: '#6B6560', marginBottom: '24px', maxWidth: '380px', margin: '0 auto 24px' }}>
              See individual product photography across all categories in our full catalogue.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/rentals" className="btn-primary">
                Browse Catalogue <ArrowRight size={16} />
              </Link>
              <Link href="/catalogue" className="btn-outline">
                Download Lookbook
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
