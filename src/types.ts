export interface Variant {
  type: "color" | "size";
  options: string[];
}

export interface Department {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  price: number; // This is the final discounted price
  originalPrice: number; // The pre-discount price
  discount: number; // Percentage value (e.g., 20 for 20%)
  category: string;
  subCategory: string;
  department?: Department;
  image: string;
  images?: string[]; // Array for multiple product images
  description: string;
  stock: number;
  isBestseller?: boolean;
  isCustomizable?: boolean;
  badge?: string;
  stat?: string;
  variants?: Variant[];
}

export interface SubCategory {
  id: string;
  name: string;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  subCategories: SubCategory[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  customName?: string;
}

export interface Address {
  id: string;
  label: string;
  isCampus: boolean;
  hostelName?: string;
  roomNumber?: string;
  fullAddress?: string;
  city?: string;
  pincode?: string;
  isDefault: boolean;
}

export interface UserProfile {
  userId: string;
  name: string;
  email: string;
  phone: string;
  hostel: string;
  club: string;
  loyaltyPoints: number;
  savedDesigns: string[];
  addresses: Address[];
}
