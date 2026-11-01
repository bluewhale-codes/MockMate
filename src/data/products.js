// Central product catalogue — update names, prices, categories and images here.
// Set `price: null` to show an "Enquire" state instead of a price.
const placeholder = (label) =>
  `https://placehold.co/480x480/F8F2E7/064B38?text=${encodeURIComponent(label)}&font=playfair-display`

export const CATEGORIES = ['All', 'Cleaners', 'Bathroom', 'Accessories', 'Personal Care']

export const PRODUCTS = [
  { id: 1, name: 'Floor Cleaner',            category: 'Cleaners',      description: 'Deep cleaning and long-lasting shine',   price: 149, image:'https://res.cloudinary.com/dycjjaxsk/image/upload/v1793556174/Gemini_Generated_Image_tq1j6tq1j6tq1j6t_rgtj0y.png' },
  { id: 2, name: 'Glass Cleaner',            category: 'Cleaners',      description: 'Crystal-clear shine',                    price: 129, image: 'https://res.cloudinary.com/dycjjaxsk/image/upload/v1793556189/Gemini_Generated_Image_dei77ndei77ndei7_iicurv.png' },
  { id: 3, name: 'Toilet Cleaner',           category: 'Bathroom',      description: 'Removes tough stains',                   price: 119, image: 'https://res.cloudinary.com/dycjjaxsk/image/upload/v1793556173/Gemini_Generated_Image_92llu992llu992ll_1_nadxon.png' },
  { id: 4, name: 'Tile Cleaner',             category: 'Cleaners',      description: 'Sparkling tiles, every time',            price: 139, image: 'https://res.cloudinary.com/dycjjaxsk/image/upload/v1793556170/Gemini_Generated_Image_gebftrgebftrgebf_uxgp91.png' },
  { id: 5, name: 'Hard Water Stain Remover', category: 'Bathroom',      description: 'Removes tough hard-water stains',        price: 169, image: 'https://res.cloudinary.com/dycjjaxsk/image/upload/v1793556170/Gemini_Generated_Image_gebftrgebftrgebf_uxgp91.png' },
  { id: 6, name: 'Flush Tablets',            category: 'Bathroom',      description: 'Keeps your toilet fresh',                price: 99,  image: 'https://res.cloudinary.com/dycjjaxsk/image/upload/v1793556170/Gemini_Generated_Image_gebftrgebftrgebf_uxgp91.png' },
  { id: 7, name: 'Microfibre Cloth',         category: 'Accessories',   description: 'Super absorbent and lint-free',          price: 79,  image: 'https://res.cloudinary.com/dycjjaxsk/image/upload/v1793556170/Gemini_Generated_Image_gebftrgebftrgebf_uxgp91.png' },
  { id: 8, name: 'Plastic Restorer',         category: 'Accessories',   description: 'Restores and protects plastic surfaces', price: 189, image: 'https://res.cloudinary.com/dycjjaxsk/image/upload/v1793556170/Gemini_Generated_Image_gebftrgebftrgebf_uxgp91.png' },
  { id: 9, name: 'Handwash',     category: 'Personal Care', description: 'Gentle care for your hands',             price: 109, image: 'https://res.cloudinary.com/dycjjaxsk/image/upload/v1793556170/Gemini_Generated_Image_gebftrgebftrgebf_uxgp91.png' },
]

export const formatPrice = (price) => (price == null ? 'Enquire' : `₹${price}`)