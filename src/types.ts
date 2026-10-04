export type CategoryId =
  | 'discounted-deals'
  | 'pizza-deals'
  | 'burger'
  | 'grilled-burger'
  | 'smash-burger'
  | 'wrap-roll'
  | 'broast-wings'
  | 'pizza'
  | 'desi-tarka'
  | 'desi-thali'
  | 'fries'
  | 'sandwich'
  | 'pasta'
  | 'dessert';

export interface Category {
  id: CategoryId;
  name: string;
  tagline?: string;
  iconName: string;
}

export interface VariantOption {
  label: string; // e.g. "Small (7\")", "Medium (10\")", "Half", "Full", "6 Pcs", "12 Pcs"
  price: number;
}

export interface MenuItem {
  id: string;
  categoryId: CategoryId;
  name: string;
  description?: string;
  ingredients?: string[];
  price?: number; // Base single price if no variants
  variants?: VariantOption[]; // If has sizes (Small/Med/Large, Half/Full, etc.)
  image: string;
  badge?: string; // 'Bestseller', 'Hot Deal', 'Chef Special', 'Spicy'
  servings?: string; // e.g., '1 Person', '2 Persons'
  hasExtraToppings?: boolean; // for pizzas
}

export interface CartItem {
  id: string; // unique cart line item id (item.id + variant + extraToppings)
  menuItemId: string;
  name: string;
  category: string;
  selectedVariant?: VariantOption;
  selectedTopping?: { name: string; price: number };
  unitPrice: number;
  quantity: number;
  itemNotes?: string;
  image: string;
}

export interface CustomerOrderData {
  orderId: string;
  customerName: string;
  customerPhone: string;
  deliveryType: 'delivery' | 'takeaway';
  deliveryArea: string; // e.g., 'Jinnah Garden' or 'Other Islamabad Area'
  address: string;
  notes?: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  grandTotal: number;
  createdAt: string;
}
