/**
 * MyGarden — TypeScript types derived from the final DB schema (v4).
 * Mirrors the 14 backend tables (Laravel/MySQL). Field names, ENUM values
 * and FK conventions match the schema document exactly.
 *
 * Conventions:
 *  - All IDs: bigint UNSIGNED → `number` (use `string` if you serialize as bigint)
 *  - Money / decimals → `number` (decimal(10,2) on backend)
 *  - Timestamps → ISO 8601 strings
 *  - Foreign keys: `<singular>_id` (Laravel convention)
 */

// ─────────────────────────────────────────────────────────────
// ENUMs (§5)
// ─────────────────────────────────────────────────────────────
export type UserRole = "client" | "farmer" | "admin";

export type PlotStatus = "available" | "reserved" | "maintenance";

export type ReservationStatus = "pending" | "active" | "completed" | "cancelled";
export type PaymentStatus = "pending" | "paid" | "refunded";

export type PlotCultureStatus =
  | "planned" | "planted" | "growing" | "ready" | "harvested";

export type ServiceOrderStatus =
  | "pending" | "scheduled" | "in_progress" | "done" | "cancelled";

export type ServiceUnit = "fixed" | "per_m2" | "per_hour" | "per_month";

export type ProductOrderStatus =
  | "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";

export type CultureDifficulty = "easy" | "medium" | "hard";

/** Polymorphic target for `reviews.reviewable_type`. */
export type ReviewableType = "company" | "product" | "land";

// ─────────────────────────────────────────────────────────────
// Shared base
// ─────────────────────────────────────────────────────────────
export type ID = number;
export type ISODate = string;       // 'YYYY-MM-DD'
export type ISODateTime = string;   // ISO 8601

export interface Timestamps {
  created_at: ISODateTime;
  updated_at: ISODateTime;
}

// ─────────────────────────────────────────────────────────────
// 1. users
// ─────────────────────────────────────────────────────────────
export interface User extends Timestamps {
  id: ID;
  name: string;                     // varchar(255)
  email: string;                    // varchar(255), unique
  email_verified_at: ISODateTime | null;
  password: string;                 // hashed
  remember_token: string | null;
  phone: string | null;             // varchar(20)
  avatar: string | null;            // url
  role: UserRole;
  is_approved: boolean;
  is_active: boolean;
  last_login_at: ISODateTime | null;
}

// ─────────────────────────────────────────────────────────────
// 2. companies (1:1 with users — UNIQUE user_id)
// ─────────────────────────────────────────────────────────────
export interface Company extends Timestamps {
  id: ID;
  user_id: ID;                      // UNIQUE
  name: string;
  slug: string;
  tax_id: string | null;
  logo: string | null;              // url
  contact_email: string | null;
  contact_phone: string | null;
  contact_address: string | null;
  is_verified: boolean;
  verified_at: ISODateTime | null;
  rating: number;                   // decimal(3,2)
  total_reviews: number;
}

// ─────────────────────────────────────────────────────────────
// 3. lands (owned by a user/farmer)
// ─────────────────────────────────────────────────────────────
export interface Land extends Timestamps {
  id: ID;
  user_id: ID;
  name: string;
  slug: string;
  region: string;
  city: string | null;
  address: string | null;
  lat: number;                      // decimal(10,7)
  lng: number;                      // decimal(10,7) — was 'long' (reserved)
  total_area_m2: number;
  price_m2: number;                 // decimal(10,2) — was 'price'
  description: string | null;
  is_active: boolean;
  is_featured: boolean;
  views_count: number;
}

// ─────────────────────────────────────────────────────────────
// 4. plots (subdivisions of a land)
// ─────────────────────────────────────────────────────────────
export interface Plot extends Timestamps {
  id: ID;
  land_id: ID;                      // singular_id (Laravel)
  plot_number: string;              // varchar(20) — "L1", "A-15"
  area_m2: number;                  // decimal(10,2)
  status: PlotStatus;
  description: string | null;
  has_irrigation: boolean;
}

// ─────────────────────────────────────────────────────────────
// 5. cultures (catalog of plantable crops)
// ─────────────────────────────────────────────────────────────
export interface Culture extends Timestamps {
  id: ID;
  name: string;
  slug: string;
  image: string | null;             // varchar(255), single URL
  difficulty: CultureDifficulty;
  description: string | null;
  is_active: boolean;
}

// ─────────────────────────────────────────────────────────────
// 6. reservations (a user reserves a plot for a season)
//    UNIQUE (user_id, plot_id, season_year)
// ─────────────────────────────────────────────────────────────
export interface Reservation extends Timestamps {
  id: ID;
  user_id: ID;
  plot_id: ID;
  season_year: number;              // e.g. 2026
  status: ReservationStatus;
  payment_status: PaymentStatus;
  total_price: number;              // decimal(10,2)
  notes: string | null;
  cancelled_at: ISODateTime | null;
  cancellation_reason: string | null;
}

// ─────────────────────────────────────────────────────────────
// 7. plot_cultures (pivot: what's planted in a reserved plot)
// ─────────────────────────────────────────────────────────────
export interface PlotCulture extends Timestamps {
  id: ID;
  reservation_id: ID;
  culture_id: ID;
  area_m2: number;                  // decimal(10,2)
  planting_season: string | null;   // was 'plating_season'
  planting_date: ISODate | null;    // was 'plating_date'
  expected_yield_kg: number | null; // decimal(10,2)
  actual_yield_kg: number | null;   // was 'actual_yeld_kg'
  harvested_at: ISODateTime | null;
  status: PlotCultureStatus;
  notes: string | null;
}

// ─────────────────────────────────────────────────────────────
// 8. services (offered by companies)
// ─────────────────────────────────────────────────────────────
export interface Service extends Timestamps {
  id: ID;
  company_id: ID;
  name: string;
  description: string | null;       // text
  image: string | null;             // url
  unit: ServiceUnit;
  price: number;                    // decimal(10,2)
  duration_hours: number | null;
  is_active: boolean;
}

// ─────────────────────────────────────────────────────────────
// 9. service_orders (formerly servic_orders — typo fixed)
// ─────────────────────────────────────────────────────────────
export interface ServiceOrder extends Timestamps {
  id: ID;
  reservation_id: ID;
  service_id: ID;
  status: ServiceOrderStatus;
  scheduled_date: ISODate | null;
  completed_at: ISODateTime | null;
  total_price: number;              // decimal(10,2)
  notes: string | null;
  farmer_notes: string | null;
}

// ─────────────────────────────────────────────────────────────
// 10. products (marketplace inventory)
// ─────────────────────────────────────────────────────────────
export interface Product extends Timestamps {
  id: ID;
  company_id: ID;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  category: string;
  price: number;                    // decimal(10,2)
  quantity: number;                 // int UN, >= 0
  is_active: boolean;
}

// ─────────────────────────────────────────────────────────────
// 11. product_orders (marketplace purchases)
// ─────────────────────────────────────────────────────────────
export interface ProductOrder extends Timestamps {
  id: ID;
  user_id: ID;
  product_id: ID;
  quantity: number;                 // int UN
  unit_price: number;               // snapshot at purchase
  total_price: number;
  status: ProductOrderStatus;
  shipping_address: string | null;
}

// ─────────────────────────────────────────────────────────────
// 12. cart_items (user's cart — UNIQUE (user_id, product_id))
// ─────────────────────────────────────────────────────────────
export interface CartItem extends Timestamps {
  id: ID;
  user_id: ID;
  product_id: ID;
  quantity: number;                 // int UN
}

// ─────────────────────────────────────────────────────────────
// 13. reviews (polymorphic — companies/products/lands)
//    rating BETWEEN 1 AND 5
// ─────────────────────────────────────────────────────────────
export interface Review extends Timestamps {
  id: ID;
  user_id: ID;
  reviewable_type: ReviewableType;
  reviewable_id: ID;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string | null;
}

// ─────────────────────────────────────────────────────────────
// 14. notifications (bell in navbar)
// ─────────────────────────────────────────────────────────────
export interface Notification extends Timestamps {
  id: ID;
  user_id: ID;
  type: string;
  title: string;
  message: string;
  data: Record<string, unknown> | null;
  is_read: boolean;
  read_at: ISODateTime | null;
}

// ─────────────────────────────────────────────────────────────
// Convenience: map of all tables (handy for typed clients)
// ─────────────────────────────────────────────────────────────
export interface DBTables {
  users: User;
  companies: Company;
  lands: Land;
  plots: Plot;
  cultures: Culture;
  reservations: Reservation;
  plot_cultures: PlotCulture;
  services: Service;
  service_orders: ServiceOrder;
  products: Product;
  product_orders: ProductOrder;
  cart_items: CartItem;
  reviews: Review;
  notifications: Notification;
}

export type TableName = keyof DBTables;
