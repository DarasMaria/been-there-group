interface SectionHeaderProps {
  label?: string
  title: string
  subtitle?: string
  centered?: boolean
  action?: React.ReactNode
}

export default function SectionHeader({ label, title, subtitle, centered = false, action }: SectionHeaderProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: centered ? 'column' : 'row',
        alignItems: centered ? 'center' : 'flex-end',
        justifyContent: 'space-between',
        marginBottom: '40px',
        gap: '16px',
        textAlign: centered ? 'center' : 'left',
      }}
    >
      <div>
        {label && <span className="section-label">{label}</span>}
        <h2
          style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: 'clamp(28px, 3.5vw, 44px)',
            fontWeight: 300,
            color: '#2C2C2A',
            margin: 0,
            marginBottom: subtitle ? '8px' : 0,
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            style={{
              fontSize: '15px',
              color: '#6B6560',
              maxWidth: '520px',
              margin: centered ? '0 auto' : 0,
              lineHeight: 1.7,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
      {action && <div style={{ flexShrink: 0 }}>{action}</div>}
    </div>
  )
}
