export type ProductCategory = 
  | 'todos'
  | 'prenatal'
  | 'colorear'
  | 'agendas'
  | 'libreria'
  | 'souvenirs'
  | 'packaging';

export interface CustomizationOptionItem {
  id: string;
  label: string;
  priceDelta: number;
}

export interface CustomizationConfig {
  themes?: string[];
  coverFinishes?: CustomizationOptionItem[];
  foilOptions?: CustomizationOptionItem[];
  bindingColors?: string[];
  hasNameInput?: boolean;
  hasThemeInput?: boolean;
  hasDedicationInput?: boolean;
  defaultTheme?: string;
}

export interface ProductSpecs {
  dimensions?: string;
  pages?: string;
  paperType?: string;
  cover?: string;
  extras?: string[];
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  gallery?: string[];
  description: string;
  specs: ProductSpecs;
  isCustomizable: boolean;
  customization?: CustomizationConfig;
  tags: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  isFeatured?: boolean;
  minOrder?: number;
}

export interface CartCustomization {
  name?: string;
  theme?: string;
  finish?: string;
  foil?: string;
  binding?: string;
  dedication?: string;
  additionalNotes?: string;
  extraPrice: number;
}

export interface CartItem {
  cartItemId: string;
  product: Product;
  quantity: number;
  customization?: CartCustomization;
  unitPrice: number;
}

export interface CategoryData {
  id: ProductCategory;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  badge?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  comment: string;
  productName: string;
  rating: number;
  date: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  tag: string;
}

export interface WorkshopStep {
  step: string;
  title: string;
  description: string;
  icon: string;
}
