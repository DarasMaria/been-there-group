'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Plus, Check } from 'lucide-react'
import { useQuoteBasket } from '@/context/QuoteBasketContext'
import type { ProductWithCategory } from '@/types'
import { parseJsonArray } from '@/lib/utils'

interface ProductCardProps {
  product: ProductWithCategory
  aspectRatio?: string
}

export default function ProductCard({ product, aspectRatio = '4/3' }: ProductCardProps) {
  const { addItem, isInBasket } = useQuoteBasket()
  const inBasket = isInBasket(product.id)
  const imageSrc = product.images[0]?.url || '/images/placeholder.jpg'
  const tags = parseJsonArray(product.styleTags).slice(0, 1)

  return (
    <div className="catalogue-card">
      {/* Name row — no category label */}
      <div style={{ marginBottom: '12px' }}>
        <Link
          href={`/rentals/${product.category.slug}/${product.slug}`}
          className="catalogue-card-name"
        >
          {product.name}
        </Link>
      </div>

      {/* Image */}
      <Link
        href={`/rentals/${product.category.slug}/${product.slug}`}
        className="catalogue-img-wrap"
        style={{
          position: 'relative',
          aspectRatio,
          backgroundColor: '#F2F0EB',
          display: 'block',
        }}
      >
        <Image
          src={imageSrc}
          alt={product.name}
          fill
          style={{ objectFit: 'cover' }}
          unoptimized
        />
        {product.featured && (
          <span
            style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              backgroundColor: '#8B7355',
              color: '#fff',
              fontSize: '9px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '3px 8px',
            }}
          >
            Featured
          </span>
        )}
      </Link>

      {/* Footer: tags + quote button */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '12px',
          gap: '8px',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', flex: 1, minWidth: 0 }}>
          {product.colour && <span className="tag">{product.colour}</span>}
          {tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
          {product.outdoor && <span className="tag">Outdoor</span>}
        </div>

        <button
          onClick={() =>
            addItem({
              productId: product.id,
              productName: product.name,
              categoryName: product.category.name,
              imageUrl: imageSrc,
              slug: product.slug,
              categorySlug: product.category.slug,
            })
          }
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '7px 12px',
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            backgroundColor: inBasket ? '#8B7355' : '#2C2C2A',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease',
            flexShrink: 0,
            fontFamily: 'inherit',
          }}
        >
          {inBasket ? (
            <><Check size={10} />Added</>
          ) : (
            <><Plus size={10} />Quote</>
          )}
        </button>
      </div>
    </div>
  )
}
