import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const quotes = await prisma.quoteRequest.findMany({
      include: {
        items: {
          include: { product: { select: { name: true, category: { select: { name: true } } } } },
        },
      },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(quotes)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch quotes' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      fullName,
      companyName,
      email,
      phone,
      eventType,
      eventDate,
      venue,
      city,
      eventLocation,
      deliveryRequired,
      setupStrikeRequired,
      stylingRequired,
      notes,
      items,
    } = body

    if (!fullName || !email || !phone || !eventType || !eventDate || !city) {
      return NextResponse.json({ error: 'Required fields are missing.' }, { status: 400 })
    }

    const quote = await prisma.quoteRequest.create({
      data: {
        fullName,
        companyName: companyName || null,
        email,
        phone,
        eventType,
        eventDate,
        venue: venue || null,
        city,
        eventLocation: eventLocation || null,
        deliveryRequired: Boolean(deliveryRequired),
        setupStrikeRequired: Boolean(setupStrikeRequired),
        stylingRequired: Boolean(stylingRequired),
        notes: notes || null,
        status: 'new',
        items: items && items.length > 0
          ? {
              create: items.map((item: any) => ({
                productId: item.productId,
                quantity: item.quantity,
                productName: item.productName,
              })),
            }
          : undefined,
      },
      include: { items: true },
    })

    return NextResponse.json({ success: true, quoteId: quote.id }, { status: 201 })
  } catch (err) {
    console.error('Quote submission error:', err)
    return NextResponse.json({ error: 'Failed to submit quote request. Please try again.' }, { status: 500 })
  }
}
