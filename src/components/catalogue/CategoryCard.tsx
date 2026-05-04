import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import type { CategoryWithCount } from '@/types'

interface CategoryCardProps {
  category: CategoryWithCount
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const imageSrc = category.imageUrl || `/images/category-${category.slug}.jpg`

  return (
    <Link
      href={`/rentals/${category.slug}`}
      className="card-hover"
      style={{
        display: 'block',
        position: 'relative',
        overflow: 'hidden',
        textDecoration: 'none',
        aspectRatio: '3/4',
        backgroundColor: '#F2F0EB',
      }}
    >
      <Image
        src={imageSrc}
        alt={category.name}
        fill
        style={{ objectFit: 'cover' }}
        unoptimized
      />
      <div className="image-overlay" />

      {/* Content */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '24px',
          color: '#fff',
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: '22px',
            fontWeight: 400,
            margin: 0,
            marginBottom: '4px',
          }}
        >
          {category.name}
        </h3>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontSize: '12px', opacity: 0.75 }}>
            {category._count.products} pieces
          </span>
          <ArrowRight size={16} style={{ opacity: 0.8 }} />
        </div>
      </div>
    </Link>
  )
}
