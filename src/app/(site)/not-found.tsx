import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function NotFound() {
  return (
    <section
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px',
        backgroundColor: '#FAFAF8',
        minHeight: '60vh',
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: '480px' }}>
        <div
          style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: '120px',
            fontWeight: 300,
            color: '#E8E4DC',
            lineHeight: 1,
            marginBottom: '24px',
          }}
        >
          404
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: '36px',
            fontWeight: 400,
            color: '#2C2C2A',
            marginBottom: '12px',
          }}
        >
          Page not found
        </h1>
        <p style={{ fontSize: '15px', color: '#6B6560', lineHeight: 1.7, marginBottom: '32px' }}>
          The page you're looking for doesn't exist or may have moved. Try browsing our catalogue or returning to the homepage.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" className="btn-primary">
            Back to Home <ArrowRight size={16} />
          </Link>
          <Link href="/rentals" className="btn-outline">
            Browse Catalogue
          </Link>
        </div>
      </div>
    </section>
  )
}
