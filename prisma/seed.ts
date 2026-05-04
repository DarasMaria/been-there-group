import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const PLACEHOLDER = '/images/placeholder.jpg'
const img = (slug: string) => `/images/products/${slug}.jpg`

const catImg = (slug: string) => `/images/categories/${slug}.jpg`

const categories = [
  { name: '3 Seater Couches',         slug: '3-seater-couches',        description: 'Elegant three-seater sofas for lounge and event seating areas.',                 order: 1, imageUrl: catImg('3-seater-couches') },
  { name: '2 Seater Couches',         slug: '2-seater-couches',        description: 'Refined two-seater sofas perfect for intimate event settings.',                  order: 2, imageUrl: catImg('2-seater-couches') },
  { name: '1 Seater Chairs',          slug: '1-seater-chairs',         description: 'Statement armchairs and single seaters for flexible event layouts.',             order: 3, imageUrl: catImg('1-seater-chairs') },
  { name: 'Coffee & Side Tables',     slug: 'coffee-side-tables',      description: 'Curated coffee and side tables to complement any lounge setup.',                  order: 4, imageUrl: catImg('coffee-side-tables') },
  { name: 'Benches',                  slug: 'benches',                  description: 'Versatile benches for events requiring flexible seating arrangements.',          order: 5, imageUrl: catImg('benches') },
  { name: 'Ottomans',                 slug: 'ottomans',                 description: 'Upholstered ottomans that double as seating or accent pieces.',                  order: 6, imageUrl: catImg('ottomans') },
  { name: 'Cocktail Tables',          slug: 'cocktail-tables',         description: 'High-top cocktail tables for standing receptions and networking events.',        order: 7, imageUrl: catImg('cocktail-tables') },
  { name: 'Cocktail Chairs',          slug: 'cocktail-chairs',         description: 'Bar-height seating designed for cocktail and reception events.',                 order: 8, imageUrl: catImg('cocktail-chairs') },
  { name: 'Bar & Reception Counters', slug: 'bar-reception-counters',  description: 'Premium bar and reception counter units for branded hospitality setups.',        order: 9, imageUrl: catImg('bar-reception-counters') },
]

const productsByCategory: Record<string, Array<{
  name: string; slug: string; description: string; imageUrl: string
  dimensions: string; material: string; colour: string
  seatingCapacity?: number; styleTags: string[]; indoor: boolean
  outdoor: boolean; eventTypes: string[]; featured: boolean
}>> = {

  '3-seater-couches': [
    {
      name: 'Alpine 3 Seater',
      slug: 'alpine-3-seater',
      imageUrl: img('alpine-3-seater'),
      description: 'A generous three-seater with softly flared arms, loose cushions and a solid timber base. The yellow accent cushion adds a playful warmth to any lounge setup.',
      dimensions: '220cm W × 92cm D × 82cm H',
      material: 'Linen blend upholstery, solid timber frame',
      colour: 'Cream / natural',
      seatingCapacity: 3,
      styleTags: ['classic', 'warm', 'relaxed'],
      indoor: true, outdoor: false,
      eventTypes: ['wedding', 'corporate', 'private', 'brand activation'],
      featured: true,
    },
    {
      name: 'Mist 3 Seater',
      slug: 'mist-3-seater',
      imageUrl: img('mist-3-seater'),
      description: 'A clean front-facing three-seater in light grey with structured lines and six dark tapered wooden legs. Understated and endlessly versatile.',
      dimensions: '215cm W × 88cm D × 78cm H',
      material: 'Fabric upholstery, dark timber legs',
      colour: 'Light grey',
      seatingCapacity: 3,
      styleTags: ['minimalist', 'structured', 'modern'],
      indoor: true, outdoor: false,
      eventTypes: ['corporate', 'wedding', 'private', 'exhibition'],
      featured: true,
    },
    {
      name: 'Wave 3 Seater',
      slug: 'wave-3-seater',
      imageUrl: img('wave-3-seater'),
      description: 'A sculptural bouclé three-seater with an organic wavy backrest and soft rounded arms. Adds an editorial quality to any event space.',
      dimensions: '218cm W × 90cm D × 84cm H',
      material: 'Bouclé fabric, solid wood feet',
      colour: 'Ivory white',
      seatingCapacity: 3,
      styleTags: ['sculptural', 'organic', 'editorial'],
      indoor: true, outdoor: false,
      eventTypes: ['wedding', 'brand activation', 'private', 'editorial'],
      featured: true,
    },
    {
      name: 'Noir Bubble 3 Seater',
      slug: 'noir-bubble-3-seater',
      imageUrl: img('noir-bubble-3-seater'),
      description: 'A bold statement piece in black leather with deeply rounded bubble cushions and curved sides. Commands attention at gala and brand activation events.',
      dimensions: '210cm W × 95cm D × 75cm H',
      material: 'Premium faux leather, metal base',
      colour: 'Matte black',
      seatingCapacity: 3,
      styleTags: ['bold', 'statement', 'dark'],
      indoor: true, outdoor: false,
      eventTypes: ['gala', 'brand activation', 'corporate', 'private'],
      featured: true,
    },
  ],

  '2-seater-couches': [
    {
      name: 'Como 2 Seater',
      slug: 'como-2-seater',
      imageUrl: img('como-2-seater'),
      description: 'A contemporary two-seater with a tight cushioned back and sleek angled black metal legs. Clean and confident in any modern event setting.',
      dimensions: '155cm W × 88cm D × 78cm H',
      material: 'Fabric upholstery, powder-coated steel legs',
      colour: 'Cream',
      seatingCapacity: 2,
      styleTags: ['modern', 'clean', 'minimal'],
      indoor: true, outdoor: false,
      eventTypes: ['corporate', 'brand activation', 'private'],
      featured: true,
    },
    {
      name: 'Boucle 2 Seater',
      slug: 'boucle-2-seater',
      imageUrl: img('boucle-2-seater'),
      description: 'A plush white bouclé loveseat with generously rounded cushions and small round wooden legs. Soft and inviting with a contemporary European feel.',
      dimensions: '148cm W × 90cm D × 80cm H',
      material: 'Bouclé fabric, solid wood legs',
      colour: 'Ivory white',
      seatingCapacity: 2,
      styleTags: ['textured', 'cosy', 'european'],
      indoor: true, outdoor: false,
      eventTypes: ['wedding', 'private', 'brand activation', 'editorial'],
      featured: true,
    },
    {
      name: 'Channel Loveseat',
      slug: 'channel-loveseat',
      imageUrl: img('channel-loveseat'),
      description: 'A channel-stitched armless two-seater in warm olive fabric. The leggy stance and relaxed silhouette make it ideal for boho and garden-style events.',
      dimensions: '142cm W × 84cm D × 82cm H',
      material: 'Woven fabric, round solid wood legs',
      colour: 'Olive / sand',
      seatingCapacity: 2,
      styleTags: ['organic', 'textured', 'relaxed'],
      indoor: true, outdoor: false,
      eventTypes: ['wedding', 'private', 'garden party'],
      featured: false,
    },
    {
      name: 'Hampton 2 Seater',
      slug: 'hampton-2-seater',
      imageUrl: img('hampton-2-seater'),
      description: 'A classic tufted two-seater with cylindrical bolster cushions on each arm and dark tapered wooden legs. Timeless elegance for formal event settings.',
      dimensions: '158cm W × 85cm D × 80cm H',
      material: 'Fabric upholstery, solid timber legs',
      colour: 'Cream / ivory',
      seatingCapacity: 2,
      styleTags: ['classic', 'tufted', 'formal'],
      indoor: true, outdoor: false,
      eventTypes: ['wedding', 'corporate', 'gala', 'private'],
      featured: false,
    },
    {
      name: 'Slim 2 Seater',
      slug: 'slim-2-seater',
      imageUrl: img('slim-2-seater'),
      description: 'A low-profile two-seater with a long sleek silhouette and fine angled black metal legs. Sophisticated minimalism that works across all event styles.',
      dimensions: '168cm W × 82cm D × 70cm H',
      material: 'Fabric upholstery, powder-coated steel legs',
      colour: 'Cream / off-white',
      seatingCapacity: 2,
      styleTags: ['minimalist', 'sleek', 'low-profile'],
      indoor: true, outdoor: false,
      eventTypes: ['corporate', 'brand activation', 'exhibition', 'private'],
      featured: false,
    },
    {
      name: 'Boucle Chaise Set',
      slug: 'boucle-chaise-set',
      imageUrl: img('boucle-chaise-set'),
      description: 'A channel-stitched bouclé two-seater with an integrated chaise and detached ottoman on gold legs. A luxe lounge centrepiece for any upscale event.',
      dimensions: '200cm W × 90cm D × 78cm H (+ ottoman)',
      material: 'Bouclé fabric, gold-finish metal legs',
      colour: 'Cream bouclé',
      seatingCapacity: 2,
      styleTags: ['luxe', 'statement', 'lounge'],
      indoor: true, outdoor: false,
      eventTypes: ['wedding', 'gala', 'private', 'brand activation'],
      featured: true,
    },
  ],

  '1-seater-chairs': [
    {
      name: 'Boucle Swivel Chair',
      slug: 'boucle-swivel-chair',
      imageUrl: img('boucle-swivel-chair'),
      description: 'A barrel-back bouclé armchair on a polished gold swivel base. The ideal statement accent chair for lounge vignettes at weddings and activations.',
      dimensions: '78cm W × 80cm D × 76cm H',
      material: 'Bouclé fabric, brushed gold swivel base',
      colour: 'Cream bouclé',
      seatingCapacity: 1,
      styleTags: ['statement', 'luxe', 'swivel'],
      indoor: true, outdoor: false,
      eventTypes: ['wedding', 'brand activation', 'private', 'gala'],
      featured: true,
    },
    {
      name: 'Velvet Accent Chair',
      slug: 'velvet-accent-chair',
      imageUrl: PLACEHOLDER,
      description: 'A statement accent chair in rich jewel-tone velvet. Perfect as a focal piece or paired with other lounge furniture.',
      dimensions: '75cm W × 78cm D × 85cm H',
      material: 'Velvet upholstery, brass-finish legs',
      colour: 'Dusty rose',
      seatingCapacity: 1,
      styleTags: ['statement', 'luxe', 'bold'],
      indoor: true, outdoor: false,
      eventTypes: ['wedding', 'editorial', 'private', 'brand activation'],
      featured: false,
    },
    {
      name: 'Ghost Chair',
      slug: 'ghost-chair',
      imageUrl: PLACEHOLDER,
      description: 'The iconic transparent polycarbonate chair. A versatile classic that works across event styles and colour schemes.',
      dimensions: '56cm W × 55cm D × 91cm H',
      material: 'Polycarbonate',
      colour: 'Clear',
      seatingCapacity: 1,
      styleTags: ['modern', 'versatile', 'iconic'],
      indoor: true, outdoor: false,
      eventTypes: ['wedding', 'corporate', 'private', 'exhibition'],
      featured: false,
    },
  ],

  'coffee-side-tables': [
    {
      name: 'Noir Coffee Set',
      slug: 'noir-coffee-set',
      imageUrl: img('noir-coffee-set'),
      description: 'A striking duo of round coffee tables with warm wood tops and matte black cylindrical bases. Sold as a nesting set — large and small — for a curated lounge look.',
      dimensions: 'Large: 80cm Ø × 38cm H  /  Small: 50cm Ø × 52cm H',
      material: 'Solid wood top, powder-coated steel base',
      colour: 'Natural wood / matte black',
      styleTags: ['modern', 'statement', 'duo'],
      indoor: true, outdoor: false,
      eventTypes: ['corporate', 'brand activation', 'private', 'gala'],
      featured: true,
    },
    {
      name: 'Marble Top Coffee Table',
      slug: 'marble-top-coffee-table',
      imageUrl: PLACEHOLDER,
      description: 'A refined rectangular coffee table with a white marble top and brushed gold base. Elevates any lounge setting.',
      dimensions: '110cm L × 60cm W × 42cm H',
      material: 'Natural marble, brushed brass base',
      colour: 'White marble / gold',
      styleTags: ['luxe', 'marble', 'statement'],
      indoor: true, outdoor: false,
      eventTypes: ['wedding', 'corporate', 'gala', 'private'],
      featured: false,
    },
  ],

  'benches': [
    {
      name: 'Timber Frame Bench',
      slug: 'timber-frame-bench',
      imageUrl: img('timber-frame-bench'),
      description: 'A long cream-upholstered bench set within an open dark timber frame. The exposed joinery gives it a considered, artisan quality suited to premium events.',
      dimensions: '160cm L × 48cm W × 50cm H',
      material: 'Cream fabric upholstery, dark solid timber frame',
      colour: 'Cream / dark walnut',
      seatingCapacity: 3,
      styleTags: ['artisan', 'refined', 'open-frame'],
      indoor: true, outdoor: false,
      eventTypes: ['wedding', 'corporate', 'private'],
      featured: true,
    },
    {
      name: 'Upholstered Velvet Bench',
      slug: 'upholstered-velvet-bench',
      imageUrl: PLACEHOLDER,
      description: 'A long upholstered bench in deep teal velvet with a solid timber frame. Ideal for ceremony seating or lounge accents.',
      dimensions: '150cm L × 45cm W × 48cm H',
      material: 'Velvet upholstery, solid timber legs',
      colour: 'Teal',
      seatingCapacity: 3,
      styleTags: ['plush', 'colourful', 'elegant'],
      indoor: true, outdoor: false,
      eventTypes: ['wedding', 'private', 'corporate'],
      featured: false,
    },
  ],

  'ottomans': [
    {
      name: 'Hoop Ottoman',
      slug: 'hoop-ottoman',
      imageUrl: img('hoop-ottoman'),
      description: 'A cream bouclé drum ottoman encircled by a sculptural wooden hoop frame. Doubles beautifully as a coffee table or a statement seating piece.',
      dimensions: '65cm Ø × 48cm H',
      material: 'Bouclé fabric, solid timber hoop frame',
      colour: 'Cream bouclé',
      seatingCapacity: 1,
      styleTags: ['sculptural', 'textured', 'artisan'],
      indoor: true, outdoor: false,
      eventTypes: ['wedding', 'brand activation', 'private', 'editorial'],
      featured: true,
    },
    {
      name: 'Round Bouclé Ottoman',
      slug: 'round-boucle-ottoman',
      imageUrl: PLACEHOLDER,
      description: 'A generous round ottoman in textured bouclé fabric. Functions beautifully as a coffee table, extra seating, or centrepiece.',
      dimensions: '90cm Ø × 42cm H',
      material: 'Bouclé fabric, solid timber base',
      colour: 'Cream bouclé',
      seatingCapacity: 2,
      styleTags: ['textured', 'round', 'neutral'],
      indoor: true, outdoor: false,
      eventTypes: ['wedding', 'private', 'corporate', 'brand activation'],
      featured: false,
    },
  ],

  'cocktail-tables': [
    {
      name: 'Timber Poseur Table',
      slug: 'timber-poseur-table',
      imageUrl: img('timber-poseur-table'),
      description: 'A tall round cocktail table with a solid wood top and an elegant H-frame timber base. Adds a warm, natural quality to cocktail and networking setups.',
      dimensions: '65cm Ø × 110cm H',
      material: 'Solid timber top and base',
      colour: 'Natural walnut',
      styleTags: ['natural', 'warm', 'artisan'],
      indoor: true, outdoor: false,
      eventTypes: ['wedding', 'cocktail', 'corporate', 'private'],
      featured: true,
    },
    {
      name: 'Poseur Table – White',
      slug: 'poseur-table-white',
      imageUrl: PLACEHOLDER,
      description: 'A classic high-top poseur table in gloss white. The go-to cocktail table for professional event setups.',
      dimensions: '60cm Ø × 110cm H',
      material: 'MDF top, powder-coated steel base',
      colour: 'Gloss white',
      styleTags: ['classic', 'clean', 'versatile'],
      indoor: true, outdoor: true,
      eventTypes: ['corporate', 'wedding', 'cocktail', 'exhibition'],
      featured: false,
    },
    {
      name: 'Marble Cocktail Table',
      slug: 'marble-cocktail-table',
      imageUrl: PLACEHOLDER,
      description: 'A premium high-top with a genuine marble top and brushed gold pedestal. A statement piece for luxury events.',
      dimensions: '65cm Ø × 110cm H',
      material: 'Marble top, brushed brass pedestal',
      colour: 'White marble / gold',
      styleTags: ['luxe', 'marble', 'premium'],
      indoor: true, outdoor: false,
      eventTypes: ['wedding', 'gala', 'private', 'corporate'],
      featured: false,
    },
  ],

  'cocktail-chairs': [
    {
      name: 'Tolix Bar Stool – White',
      slug: 'tolix-bar-stool-white',
      imageUrl: PLACEHOLDER,
      description: 'The iconic French industrial bar stool in gloss white. Stackable and durable for high-volume events.',
      dimensions: '43cm W × 44cm D × 76cm H (seat)',
      material: 'Powder-coated steel',
      colour: 'Gloss white',
      seatingCapacity: 1,
      styleTags: ['industrial', 'stackable', 'classic'],
      indoor: true, outdoor: true,
      eventTypes: ['corporate', 'cocktail', 'brand activation'],
      featured: true,
    },
    {
      name: 'Velvet Bar Stool',
      slug: 'velvet-bar-stool',
      imageUrl: PLACEHOLDER,
      description: 'A contemporary upholstered bar stool in deep midnight blue velvet. Elevates any cocktail reception setup.',
      dimensions: '45cm W × 45cm D × 80cm H (seat)',
      material: 'Velvet seat, brushed brass frame',
      colour: 'Midnight blue',
      seatingCapacity: 1,
      styleTags: ['luxe', 'velvet', 'modern'],
      indoor: true, outdoor: false,
      eventTypes: ['wedding', 'gala', 'cocktail', 'corporate'],
      featured: false,
    },
  ],

  'bar-reception-counters': [
    {
      name: 'Fluted Bar Counter',
      slug: 'fluted-bar-counter',
      imageUrl: img('fluted-bar-counter'),
      description: 'A striking straight bar counter finished in crisp white fluted panelling. The vertical grooves add texture and architectural interest to any branded bar setup.',
      dimensions: '200cm L × 55cm W × 110cm H',
      material: 'MDF with fluted white finish, aluminium trim',
      colour: 'White / grey fluted',
      styleTags: ['architectural', 'textured', 'premium'],
      indoor: true, outdoor: false,
      eventTypes: ['corporate', 'wedding', 'brand activation', 'gala'],
      featured: true,
    },
    {
      name: 'White Bar Counter',
      slug: 'white-bar-counter-straight',
      imageUrl: PLACEHOLDER,
      description: 'A clean, professional straight bar counter in gloss white. Perfect for branded hospitality builds.',
      dimensions: '200cm L × 50cm W × 110cm H',
      material: 'MDF with gloss finish, aluminium trims',
      colour: 'Gloss white',
      styleTags: ['professional', 'branded', 'clean'],
      indoor: true, outdoor: false,
      eventTypes: ['corporate', 'brand activation', 'wedding', 'exhibition'],
      featured: false,
    },
    {
      name: 'Black Bar Counter – Corner Unit',
      slug: 'black-bar-counter-corner',
      imageUrl: PLACEHOLDER,
      description: 'A matte black L-shaped bar counter for larger hospitality setups.',
      dimensions: '200cm + 100cm L × 50cm W × 110cm H',
      material: 'MDF with matte lacquer, aluminium trims',
      colour: 'Matte black',
      styleTags: ['statement', 'dark', 'large-format'],
      indoor: true, outdoor: false,
      eventTypes: ['gala', 'corporate', 'brand activation'],
      featured: false,
    },
  ],
}

async function main() {
  console.log('Seeding database...')

  await prisma.quoteItem.deleteMany()
  await prisma.quoteRequest.deleteMany()
  await prisma.productImage.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.adminUser.deleteMany()

  await prisma.adminUser.create({
    data: {
      email: process.env.ADMIN_EMAIL || 'admin@beentheregroup.co.za',
      password: process.env.ADMIN_PASSWORD || 'admin123',
      name: 'Been There Admin',
    },
  })

  for (const cat of categories) {
    const category = await prisma.category.create({ data: cat })
    console.log(`Created category: ${category.name}`)

    const products = productsByCategory[cat.slug] || []
    for (const p of products) {
      const product = await prisma.product.create({
        data: {
          name: p.name,
          slug: p.slug,
          description: p.description,
          categoryId: category.id,
          dimensions: p.dimensions,
          material: p.material,
          colour: p.colour,
          seatingCapacity: p.seatingCapacity,
          styleTags: JSON.stringify(p.styleTags),
          indoor: p.indoor,
          outdoor: p.outdoor,
          eventTypes: JSON.stringify(p.eventTypes),
          featured: p.featured,
          active: true,
        },
      })

      await prisma.productImage.create({
        data: { productId: product.id, url: p.imageUrl, alt: product.name, order: 0 },
      })

      console.log(`  Created product: ${product.name}`)
    }
  }

  console.log('Seeding complete.')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
