// Types based on Nuvemshop API
export interface Order {
  id: number;
  number: string;
  created_at: string;
  updated_at: string;
  completed_at: string;
  customer: Customer;
  products: OrderProduct[];
  total: string;
  subtotal: string;
  discount: string;
  status: 'open' | 'closed' | 'cancelled';
  payment_status: 'authorized' | 'pending' | 'paid' | 'partially_paid' | 'abandoned' | 'refunded' | 'partially_refunded' | 'cancelled';
  shipping_status: string;
  total_paid_by_customer: string;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  identification: string;
  total_spent: string;
  total_spent_currency: string;
  last_order_id: number;
  created_at: string;
  updated_at: string;
  default_address?: Address;
  extra?: Record<string, any>;
  contato?: string; // WhatsApp do cliente
}

export interface Product {
  id: number;
  name: Record<string, string>;
  description: Record<string, string>;
  categories: Category[];
  brand: string;
  published: boolean;
  variants: ProductVariant[];
  tags: string;
  created_at: string;
  updated_at: string;
}

export interface ProductVariant {
  id: number;
  product_id: number;
  price: string;
  promotional_price: string;
  stock: number;
  sku: string;
  cost: string;
  values: Array<Record<string, string>>;
}

export interface OrderProduct {
  id: number;
  product_id: number;
  variant_id: number;
  name: string;
  price: string;
  quantity: number;
}

export interface Category {
  id: number;
  name: Record<string, string>;
  description: Record<string, string>;
}

export interface Address {
  address: string;
  city: string;
  country: string;
  province: string;
  zipcode: string;
}

// Analytics Types
export interface CustomerAnalytics {
  id: number;
  name: string;
  email: string;
  whatsapp?: string; // WhatsApp do cliente
  totalSpent: number;
  orderCount: number;
  avgOrderValue: number;
  lastOrderDate: string;
  daysSinceLastOrder: number;
  customerLifetimeValue: number;
  segment: 'VIP' | 'Regular' | 'New' | 'Inactive';
}

export interface ProductAnalytics {
  id: number;
  name: string;
  totalSales: number;
  totalQuantity: number;
  avgPrice: number;
  margin?: number;
  category: string;
  rank: number;
}

export interface DashboardMetrics {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  avgOrderValue: number;
  period: string;
}