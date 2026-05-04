interface PageHeroProps {
  label?: string
  title: string
  subtitle?: string
  centered?: boolean
  light?: boolean
}

export default function PageHero({ label, title, subtitle, centered = false, light = false }: PageHeroProps) {
  return (
    <section
      style={{
        backgroundColor: light ? '#FAFAF8' : '#F2F0EB',
        paddingTop: '72px',
        paddingBottom: '64px',
        borderBottom: '1px solid #D8D4CC',
      }}
    >
      <div className="container" style={{ textAlign: centered ? 'center' : 'left' }}>
        {label && <span className="section-label">{label}</span>}
        <h1
          style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: 'clamp(36px, 5vw, 60px)',
            fontWeight: 300,
            color: '#2C2C2A',
            margin: 0,
            marginBottom: subtitle ? '16px' : 0,
            maxWidth: centered ? 'none' : '700px',
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            style={{
              fontSize: '16px',
              color: '#6B6560',
              maxWidth: centered ? '600px' : '520px',
              margin: centered ? '0 auto' : 0,
              lineHeight: 1.7,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
