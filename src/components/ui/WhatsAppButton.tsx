'use client'

import { MessageCircle } from 'lucide-react'

interface WhatsAppButtonProps {
  message?: string
  className?: string
  style?: React.CSSProperties
}

export default function WhatsAppButton({ message, className, style }: WhatsAppButtonProps) {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '27000000000'
  const text = encodeURIComponent(message || "Hi, I'd like to enquire about furniture rental for an event.")
  const url = `https://wa.me/${number}?text=${text}`

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: '#25D366',
        color: '#fff',
        padding: '14px 24px',
        fontSize: '13px',
        fontWeight: 500,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        textDecoration: 'none',
        transition: 'background-color 0.2s',
        ...style,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1ebe5d')}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#25D366')}
    >
      <MessageCircle size={16} />
      Enquire on WhatsApp
    </a>
  )
}
