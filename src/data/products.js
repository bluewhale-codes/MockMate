// Central product catalogue — update names, prices, categories and images here.
// Set `price: null` to show an "Enquire" state instead of a price.

const placeholder = (label) =>
  `https://placehold.co/480x480/F8F2E7/064B38?text=${encodeURIComponent(label)}&font=playfair-display`

export const CATEGORIES = ['All', 'Cleaners', 'Bathroom', 'Accessories', 'Personal Care']

export const PRODUCTS = [
  {
    id: 1,
    name: 'Floor Cleaner',
    category: 'Cleaners',
    description: 'Deep cleaning and long-lasting shine',
    longDescription:
      'Our premium floor cleaner penetrates deep into surfaces to lift dirt, grime and stubborn stains. Leaves a long-lasting shine with a fresh fragrance. Safe for tiles, marble and wooden floors.',
    price: 149,
    mrp: 199,
    rating: 4.7,
    reviews: 238,
    tag: 'Best Seller',
    image: 'https://res.cloudinary.com/dycjjaxsk/image/upload/v1793556174/Gemini_Generated_Image_tq1j6tq1j6tq1j6t_rgtj0y.png',
    gallery: [
      'https://res.cloudinary.com/dycjjaxsk/image/upload/v1793556174/Gemini_Generated_Image_tq1j6tq1j6tq1j6t_rgtj0y.png',
      'https://placehold.co/480x480/F8F2E7/064B38?text=Floor+Cleaner+Back&font=playfair-display',
      'https://placehold.co/480x480/F8F2E7/064B38?text=In+Use&font=playfair-display',
    ],
  },
  {
    id: 2,
    name: 'Glass Cleaner',
    category: 'Cleaners',
    description: 'Crystal-clear shine',
    longDescription:
      'Streak-free formula that makes windows, mirrors and glass surfaces crystal clear. Anti-fog and dust-repellent for a clean that lasts longer.',
    price: 129,
    mrp: 159,
    rating: 4.5,
    reviews: 154,
    tag: 'Best Product',
    image: 'https://res.cloudinary.com/dycjjaxsk/image/upload/v1793556189/Gemini_Generated_Image_dei77ndei77ndei7_iicurv.png',
    gallery: [
      'https://res.cloudinary.com/dycjjaxsk/image/upload/v1793556189/Gemini_Generated_Image_dei77ndei77ndei7_iicurv.png',
      'https://placehold.co/480x480/F8F2E7/064B38?text=Glass+Cleaner+Back&font=playfair-display',
    ],
  },
  {
    id: 3,
    name: 'Toilet Cleaner',
    category: 'Bathroom',
    description: 'Removes tough stains',
    longDescription:
      'Powerful germ-killing formula that removes tough stains, limescale and odour. Thick liquid clings to the bowl for a deep, hygienic clean.',
    price: 119,
    mrp: 149,
    rating: 4.6,
    reviews: 312,
    tag: 'Best Seller',
    image: 'https://res.cloudinary.com/dycjjaxsk/image/upload/v1793556173/Gemini_Generated_Image_92llu992llu992ll_1_nadxon.png',
    gallery: [
      'https://res.cloudinary.com/dycjjaxsk/image/upload/v1793556173/Gemini_Generated_Image_92llu992llu992ll_1_nadxon.png',
      'https://placehold.co/480x480/F8F2E7/064B38?text=Toilet+Cleaner+Back&font=playfair-display',
    ],
  },
  {
    id: 4,
    name: 'Tile Cleaner',
    category: 'Cleaners',
    description: 'Sparkling tiles, every time',
    longDescription:
      'Restores the original shine of wall and floor tiles. Removes grime, soap scum and dullness without damaging the surface.',
    price: 139,
    mrp: 179,
    rating: 4.4,
    reviews: 98,
    tag: null,
    image: 'https://res.cloudinary.com/dycjjaxsk/image/upload/v1793556170/Gemini_Generated_Image_gebftrgebftrgebf_uxgp91.png',
    gallery: [
      'https://res.cloudinary.com/dycjjaxsk/image/upload/v1793556170/Gemini_Generated_Image_gebftrgebftrgebf_uxgp91.png',
    ],
  },
  {
    id: 5,
    name: 'Hard Water Stain Remover',
    category: 'Bathroom',
    description: 'Removes tough hard-water stains',
    longDescription:
      'Specially formulated to dissolve hard-water deposits, white marks and rust stains from taps, showers, tiles and glass.',
    price: 169,
    mrp: 219,
    rating: 4.8,
    reviews: 187,
    tag: 'Best Product',
    image: 'https://res.cloudinary.com/dycjjaxsk/image/upload/v1793556170/Gemini_Generated_Image_gebftrgebftrgebf_uxgp91.png',
    gallery: [
      'https://res.cloudinary.com/dycjjaxsk/image/upload/v1793556170/Gemini_Generated_Image_gebftrgebftrgebf_uxgp91.png',
    ],
  },
  {
    id: 6,
    name: 'Flush Tablets',
    category: 'Bathroom',
    description: 'Keeps your toilet fresh',
    longDescription:
      'Drop-in tablets that clean, deodorise and freshen with every flush. One tablet lasts up to 15 days.',
    price: 99,
    mrp: 129,
    rating: 4.3,
    reviews: 76,
    tag: 'New',
    image: 'https://res.cloudinary.com/dycjjaxsk/image/upload/v1793556170/Gemini_Generated_Image_gebftrgebftrgebf_uxgp91.png',
    gallery: [
      'https://res.cloudinary.com/dycjjaxsk/image/upload/v1793556170/Gemini_Generated_Image_gebftrgebftrgebf_uxgp91.png',
    ],
  },
  {
    id: 7,
    name: 'Microfibre Cloth',
    category: 'Accessories',
    description: 'Super absorbent and lint-free',
    longDescription:
      'Ultra-soft microfibre that absorbs 5x its weight in water. Lint-free, scratch-free and machine washable.',
    price: 79,
    mrp: 99,
    rating: 4.6,
    reviews: 245,
    tag: null,
    image: 'https://res.cloudinary.com/dycjjaxsk/image/upload/v1793556170/Gemini_Generated_Image_gebftrgebftrgebf_uxgp91.png',
    gallery: [
      'https://res.cloudinary.com/dycjjaxsk/image/upload/v1793556170/Gemini_Generated_Image_gebftrgebftrgebf_uxgp91.png',
    ],
  },
  {
    id: 8,
    name: 'Plastic Restorer',
    category: 'Accessories',
    description: 'Restores and protects plastic surfaces',
    longDescription:
      'Brings faded, dull plastic back to life. Adds UV protection to prevent future fading on car trims, furniture and appliances.',
    price: 189,
    mrp: 249,
    rating: 4.5,
    reviews: 63,
    tag: null,
    image: 'https://res.cloudinary.com/dycjjaxsk/image/upload/v1793556170/Gemini_Generated_Image_gebftrgebftrgebf_uxgp91.png',
    gallery: [
      'https://res.cloudinary.com/dycjjaxsk/image/upload/v1793556170/Gemini_Generated_Image_gebftrgebftrgebf_uxgp91.png',
    ],
  },
  {
    id: 9,
    name: 'Handwash',
    category: 'Personal Care',
    description: 'Gentle care for your hands',
    longDescription:
      'pH-balanced handwash with moisturising agents. Kills 99.9% of germs while keeping skin soft and fresh.',
    price: 109,
    mrp: 139,
    rating: 4.7,
    reviews: 402,
    tag: 'Best Seller',
    image: 'https://res.cloudinary.com/dycjjaxsk/image/upload/v1793556170/Gemini_Generated_Image_gebftrgebftrgebf_uxgp91.png',
    gallery: [
      'https://res.cloudinary.com/dycjjaxsk/image/upload/v1793556170/Gemini_Generated_Image_gebftrgebftrgebf_uxgp91.png',
    ],
  },
]

export const formatPrice = (price) => (price == null ? 'Enquire' : `₹${price}`)

export const discountPercent = (product) =>
  product.price != null && product.mrp != null && product.mrp > product.price
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0