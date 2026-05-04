import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const category = url.searchParams.get('category')
  const featured = url.searchParams.get('featured')

  try {
    const products = await prisma.product.findMany({
      where: {
        active: true,
        ...(category ? { category: { slug: category } } : {}),
        ...(featured === 'true' ? { featured: true } : {}),
      },
      include: {
        category: { select: { id: true, name: true, slug: true } },
        images: { orderBy: { order: 'asc' } },
      },
      orderBy: [{ featured: 'desc' }, { name: 'asc' }],
    })
    return NextResponse.json(products)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const product = await prisma.product.create({
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description,
        categoryId: body.categoryId,
        dimensions: body.dimensions,
        material: body.material,
        colour: body.colour,
        seatingCapacity: body.seatingCapacity ? Number(body.seatingCapacity) : null,
        styleTags: body.styleTags ? JSON.stringify(body.styleTags) : null,
        indoor: Boolean(body.indoor),
        outdoor: Boolean(body.outdoor),
        eventTypes: body.eventTypes ? JSON.stringify(body.eventTypes) : null,
        featured: Boolean(body.featured),
        active: true,
      },
    })
    return NextResponse.json(product, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}
