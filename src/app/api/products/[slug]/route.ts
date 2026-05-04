import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(_req: Request, props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  try {
    const product = await prisma.product.findUnique({
      where: { slug, active: true },
      include: {
        category: { select: { id: true, name: true, slug: true } },
        images: { orderBy: { order: 'asc' } },
      },
    })
    if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(product)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 })
  }
}

export async function PATCH(request: Request, props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  try {
    const body = await request.json()
    const product = await prisma.product.update({
      where: { slug },
      data: {
        name: body.name,
        description: body.description,
        dimensions: body.dimensions,
        material: body.material,
        colour: body.colour,
        seatingCapacity: body.seatingCapacity ? Number(body.seatingCapacity) : null,
        styleTags: body.styleTags ? JSON.stringify(body.styleTags) : undefined,
        indoor: body.indoor !== undefined ? Boolean(body.indoor) : undefined,
        outdoor: body.outdoor !== undefined ? Boolean(body.outdoor) : undefined,
        eventTypes: body.eventTypes ? JSON.stringify(body.eventTypes) : undefined,
        featured: body.featured !== undefined ? Boolean(body.featured) : undefined,
        active: body.active !== undefined ? Boolean(body.active) : undefined,
      },
    })
    return NextResponse.json(product)
  } catch {
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
  }
}

export async function DELETE(_req: Request, props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  try {
    await prisma.product.update({ where: { slug }, data: { active: false } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }
}
