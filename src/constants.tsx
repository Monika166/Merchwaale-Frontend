import type { Product, Category, Department } from "./types";

export const DEPARTMENTS: Department[] = [
  { id: "cse", name: "CSE & IT" },
  { id: "ece", name: "ECE & EE" },
  { id: "mech", name: "Mechanical" },
  { id: "civil", name: "Civil & Architecture" },
];

export const CATEGORIES: Category[] = [
  {
    id: "apparel",
    name: "Apparel",
    description: "Premium campus fashion designed for comfort and style.",
    image:
      "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&q=80&w=1200",
    subCategories: [
      { id: "graphic-tees", name: "Graphic T-Shirts" },
      { id: "hoodies", name: "Hooded Sweatshirts" },
      { id: "headwear", name: "Caps & Headwear" },
    ],
  },
  {
    id: "Freshers",
    name: "Freshers Kits",
    description: "Everything a first-year student needs from day one.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200",
    subCategories: [
      { id: "hostel-kits", name: "Hostel Starter Kits" },
      { id: "lab-kits", name: "Lab & Workshop Kits" },
      { id: "welcome-bundles", name: "Welcome Bundles" },
    ],
  },
  {
    id: "essentials",
    name: "Daily Essentials",
    description: "Reliable essentials for hostel and everyday campus life.",
    image:
      "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?auto=format&fit=crop&q=80&w=1200",
    subCategories: [
      { id: "bottles", name: "Water Bottles" },
      { id: "totes", name: "Tote Bags" },
      { id: "backpacks", name: "Backpacks" },
    ],
  },
  {
    id: "academic",
    name: "Academic Supplies",
    description: "High-quality academic tools for engineering students.",
    image:
      "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&q=80&w=1200",
    subCategories: [
      { id: "notebooks", name: "Notebooks" },
      { id: "diaries", name: "Academic Diaries" },
      { id: "pens", name: "Writing Instruments" },
    ],
  },
  {
    id: "electronics",
    name: "Electronics & Utilities",
    description: "Practical tech accessories for student life.",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1200",
    subCategories: [
      { id: "drives", name: "USB Drives" },
      { id: "power", name: "Power Banks" },
      { id: "lamps", name: "Desk Lamps" },
      { id: "boards", name: "Extension Boards" },
    ],
  },
  {
    id: "official",
    name: "Official College Merchandise",
    description: "Authentic NIT Patna branded merchandise.",
    image:
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=1200",
    subCategories: [
      { id: "logo-apparel", name: "Logo Apparel" },
      { id: "alumni", name: "Alumni Collection" },
      { id: "accessories", name: "Badges & Lanyards" },
    ],
  },
];

export const PRODUCTS: Product[] = [
  /* ===================== FRESHERS → HOSTEL KITS ===================== */
  {
    id: "hostel-kit-1",
    name: "Complete Hostel Starter Kit",
    price: 2699,
    originalPrice: 3999,
    discount: 33,
    category: "Freshers",
    subCategory: "hostel-kits",
    image:
      "https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1582582429416-05c8b55b7a1a?auto=format&fit=crop&q=80&w=1200",
    ],
    description: "Bedsheets, pillow, bucket, mug, laundry bag and basics.",
    stock: 25,
    isBestseller: true,
    badge: "Best Value",
  },
  {
    id: "hostel-kit-2",
    name: "Essential Hostel Comfort Kit",
    price: 1999,
    originalPrice: 2999,
    discount: 34,
    category: "Freshers",
    subCategory: "hostel-kits",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&q=80&w=1200",
    ],
    description: "Lightweight kit for daily hostel needs.",
    stock: 30,
  },

  /* ===================== FRESHERS → LAB KITS ===================== */
  {
    id: "lab-kit-1",
    name: "Engineering Lab Starter Pack",
    price: 1799,
    originalPrice: 2399,
    discount: 25,
    category: "Freshers",
    subCategory: "lab-kits",
    image:
      "https://images.unsplash.com/photo-1581092334651-ddf26d9b8f13?auto=format&fit=crop&q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&q=80&w=1200",
    ],
    description: "Lab coat, goggles, drawing sheets, record notebook.",
    stock: 40,
    badge: "Mandatory",
  },
  {
    id: "lab-kit-2",
    name: "Workshop & Practical Kit",
    price: 1599,
    originalPrice: 2199,
    discount: 27,
    category: "Freshers",
    subCategory: "lab-kits",
    image:
      "https://images.unsplash.com/photo-1582719478148-d3f7fa1c0f3e?auto=format&fit=crop&q=80&w=1200",
    images: [],
    description: "Basic tools and safety accessories for workshops.",
    stock: 35,
  },

  /* ===================== FRESHERS → WELCOME BUNDLES ===================== */
  {
    id: "welcome-1",
    name: "Official NITP Welcome Bundle",
    price: 1999,
    originalPrice: 2999,
    discount: 33,
    category: "Freshers",
    subCategory: "welcome-bundles",
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=1200",
    images: [],
    description: "College hoodie, logo tee and satin lanyard.",
    stock: 30,
    isCustomizable: true,
    badge: "Top Pick",
  },
  {
    id: "welcome-2",
    name: "Freshers Premium Welcome Kit",
    price: 2299,
    originalPrice: 3299,
    discount: 30,
    category: "Freshers",
    subCategory: "welcome-bundles",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=1200",
    images: [],
    description: "Exclusive first-year merchandise bundle.",
    stock: 20,
  },

  /* ===================== APPAREL → GRAPHIC TEES ===================== */
  {
    id: "tee-1",
    name: "Code Mode Oversized Tee",
    price: 649,
    originalPrice: 999,
    discount: 35,
    category: "apparel",
    subCategory: "graphic-tees",
    department: DEPARTMENTS[0],
    image:
      "https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&q=80&w=1200",
    images: [],
    description: "Oversized cotton tee for coders.",
    stock: 20,
    isCustomizable: true,
    variants: [
      { type: "color", options: ["Black", "White"] },
      { type: "size", options: ["S", "M", "L", "XL"] },
    ],
  },
  {
    id: "tee-2",
    name: "Debug Life Graphic T-Shirt",
    price: 599,
    originalPrice: 899,
    discount: 33,
    category: "apparel",
    subCategory: "graphic-tees",
    department: DEPARTMENTS[0],
    image:
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&q=80&w=1200",
    images: [],
    description: "Minimal typography tee for tech students.",
    stock: 25,
  },

  /* ===================== APPAREL → HOODIES ===================== */
  {
    id: "hoodie-1",
    name: "NIT Patna Signature Hoodie",
    price: 1399,
    originalPrice: 1799,
    discount: 22,
    category: "apparel",
    subCategory: "hoodies",
    image:
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&q=80&w=1200",
    images: [],
    description: "Warm fleece hoodie with college branding.",
    stock: 35,
    isCustomizable: true,
  },
  {
    id: "hoodie-2",
    name: "Classic Campus Hoodie",
    price: 1299,
    originalPrice: 1699,
    discount: 24,
    category: "apparel",
    subCategory: "hoodies",
    image:
      "https://images.unsplash.com/photo-1618354691229-88d47f285158?auto=format&fit=crop&q=80&w=1200",
    images: [],
    description: "Everyday hoodie for winters.",
    stock: 40,
  },

  /* ===================== ELECTRONICS → POWER BANKS ===================== */
  {
    id: "power-1",
    name: "10000mAh Fast Charge Power Bank",
    price: 999,
    originalPrice: 1499,
    discount: 33,
    category: "electronics",
    subCategory: "power",
    image:
      "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?auto=format&fit=crop&q=80&w=1200",
    images: [],
    description: "Compact fast charging power bank.",
    stock: 50,
  },
  {
    id: "power-2",
    name: "20000mAh Dual Output Power Bank",
    price: 1499,
    originalPrice: 2199,
    discount: 32,
    category: "electronics",
    subCategory: "power",
    image:
      "https://images.unsplash.com/photo-1602526432604-029a709e131c?auto=format&fit=crop&q=80&w=1200",
    images: [],
    description: "High capacity power bank for long days.",
    stock: 30,
  },
];
