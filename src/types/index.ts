export interface BasketItem {
  productId: string
  productName: string
  categoryName: string
  quantity: number
  imageUrl?: string
  slug: string
  categorySlug: string
}

export interface QuoteFormData {
  fullName: string
  companyName: string
  email: string
  phone: string
  eventType: string
  eventDate: string
  venue: string
  city: string
  eventLocation: string
  deliveryRequired: boolean
  setupStrikeRequired: boolean
  stylingRequired: boolean
  notes: string
}

export interface ProductWithCategory {
  id: string
  name: string
  slug: string
  description: string | null
  categoryId: string
  category: {
    id: string
    name: string
    slug: string
  }
  dimensions: string | null
  material: string | null
  colour: string | null
  seatingCapacity: number | null
  styleTags: string | null
  indoor: boolean
  outdoor: boolean
  eventTypes: string | null
  featured: boolean
  active: boolean
  images: Array<{
    id: string
    url: string
    alt: string | null
    order: number
  }>
}

export interface CategoryWithCount {
  id: string
  name: string
  slug: string
  description: string | null
  imageUrl: string | null
  order: number
  active: boolean
  _count: { products: number }
}
