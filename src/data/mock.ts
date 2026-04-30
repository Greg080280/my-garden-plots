import { veg, tools, landPhotos } from "@/assets";

// ───────── Geography ─────────
export type Region =
  | "Dubăsari"
  | "Orhei"
  | "Călărași"
  | "Chișinău"
  | "Cahul"
  | "Bălți"
  | "Ungheni"
  | "Soroca";

// ───────── Core types ─────────
export interface Land {
  id: string;
  name: string;
  region: Region;
  village: string;
  /** MDL per ar per sezon */
  pricePerAre: number;
  totalPlots: number;
  availablePlots: number;
  size: number; // hectares
  photo: string;
  gallery: string[];
  description: string;
  coords: [number, number];
  features: string[];
  /** id of farmer user */
  farmerId: string;
}

export interface Plot {
  id: string;
  landId: string;
  code: string;
  area: number; // ari
  status: "available" | "reserved" | "maintenance";
}

export interface Culture {
  id: string;
  name: string;
  category: "Legume" | "Verdețuri" | "Rădăcinoase" | "Cereale" | "Fructe";
  icon: string;
  pricePerAre: number;
  cycleDays: number;
  yieldKgPerAre: number;
  season: "Primăvară" | "Vară" | "Toamnă";
  description: string;
}

export interface Service {
  id: string;
  name: string;
  icon: string;
  price: number; // MDL
  unit: string;
  description: string;
  /** id of farmer offering it */
  farmerId: string;
}

export interface Product {
  id: string;
  name: string;
  category: "Răsaduri" | "Semințe" | "Unelte" | "Îngrășăminte";
  price: number; // MDL
  icon: string;
  description: string;
  stock: number;
  farmerId: string;
}

export type ReservationStatus = "Rezervat" | "Arat" | "Plantat" | "În creștere" | "Recoltat";
export interface ReservationCulture { cultureId: string; area: number }
export interface ReservationServiceOrder {
  serviceId: string;
  scheduledFor: string;
  status: "În așteptare" | "În lucru" | "Finalizat";
}

export interface Reservation {
  id: string;
  clientId: string;
  landId: string;
  plotId: string;
  cultures: ReservationCulture[];
  services: ReservationServiceOrder[];
  status: ReservationStatus;
  /** ISO date when status last advanced */
  stageDates: Partial<Record<ReservationStatus, string>>;
  season: string; // "2026"
  createdAt: string;
  totalPrice: number;
}

export interface Company {
  id: string;
  farmerId: string;
  name: string;
  description: string;
  region: Region;
  verified: boolean;
  joinedAt: string;
}

export interface ProductOrder {
  id: string;
  clientId: string;
  productId: string;
  qty: number;
  total: number;
  status: "În așteptare" | "Confirmată" | "Expediată" | "Livrată";
  createdAt: string;
}

export interface Task {
  id: string;
  farmerId: string;
  serviceId: string;
  plotId: string;
  landId: string;
  clientId: string;
  scheduledFor: string;
  status: "În așteptare" | "În lucru" | "Finalizat";
}

export interface ActivityEvent {
  id: string;
  at: string;
  kind: "reservation" | "order" | "service" | "user" | "land";
  message: string;
}

// ───────── Companies ─────────
export const COMPANIES: Company[] = [
  { id: "c-agrosat", farmerId: "u-ion", name: "AgroSat",
    description: "Familia Popescu cultivă cu drag pământ pe Nistru, de două generații. Loturi pentru roșii, ardei și verdețuri.",
    region: "Dubăsari", verified: true, joinedAt: "2025-02-14" },
  { id: "c-gradinabio", farmerId: "u-maria", name: "Grădina Bio",
    description: "Producție 100% bio, fără chimicale. Specializați pe legume rădăcinoase și culturi de toamnă.",
    region: "Orhei", verified: true, joinedAt: "2025-04-03" },
  { id: "c-codrufarm", farmerId: "u-petru", name: "Codru Farm",
    description: "Loturi spațioase la marginea Codrilor, pentru cei care vor să crească mult, în voie. Tractor și sistem irigare.",
    region: "Călărași", verified: false, joinedAt: "2025-05-22" },
];

export const findCompanyByFarmer = (farmerId: string) =>
  COMPANIES.find(c => c.farmerId === farmerId);

// ───────── Lands (5 across Dubăsari, Orhei, Călărași) ─────────
export const LANDS: Land[] = [
  {
    id: "l-lunca-nistrului",
    name: "Lunca Nistrului",
    region: "Dubăsari",
    village: "Coșnița",
    pricePerAre: 320, totalPlots: 16, availablePlots: 4, size: 2.4,
    photo: landPhotos[0],
    gallery: [landPhotos[0], landPhotos[2], landPhotos[5]],
    description: "Pământ negru pe malul Nistrului, însorit toată ziua. Apă din izvor, vânt blând dinspre apă.",
    coords: [47.205, 29.105],
    features: ["Sol cernoziom", "Apă din izvor", "Acces auto", "Gard împrejmuit"],
    farmerId: "u-ion",
  },
  {
    id: "l-valea-trandafirilor",
    name: "Valea Trandafirilor",
    region: "Dubăsari",
    village: "Molovata",
    pricePerAre: 290, totalPlots: 14, availablePlots: 9, size: 1.8,
    photo: landPhotos[1],
    gallery: [landPhotos[1], landPhotos[4], landPhotos[2]],
    description: "Versant blând, pe deal, perfect pentru cartofi, varză și ceapă. Familia Popescu îngrijește totul.",
    coords: [47.255, 29.082],
    features: ["Versant sudic", "Tractor disponibil", "Casă de unelte", "Compost natural"],
    farmerId: "u-ion",
  },
  {
    id: "l-gradina-bunicii",
    name: "Grădina Bunicii",
    region: "Orhei",
    village: "Brănești",
    pricePerAre: 280, totalPlots: 12, availablePlots: 3, size: 1.5,
    photo: landPhotos[2],
    gallery: [landPhotos[2], landPhotos[0], landPhotos[3]],
    description: "Paturi ridicate, lângă o livadă de meri, totul cultivat bio. Locul preferat pentru verdețuri.",
    coords: [47.385, 28.825],
    features: ["100% bio", "Paturi ridicate", "Livadă alături", "Compost propriu"],
    farmerId: "u-maria",
  },
  {
    id: "l-livada-veche",
    name: "Livada Veche",
    region: "Orhei",
    village: "Susleni",
    pricePerAre: 260, totalPlots: 18, availablePlots: 11, size: 2.8,
    photo: landPhotos[4],
    gallery: [landPhotos[4], landPhotos[1], landPhotos[5]],
    description: "Pământ proaspăt arat, gata de semănat. Pruni veghează peste loturi, copiii pot alerga liber.",
    coords: [47.435, 28.972],
    features: ["Recent arat", "Pruni alături", "Apă pe loc", "Pentru familii"],
    farmerId: "u-maria",
  },
  {
    id: "l-codrii-bahmut",
    name: "Codrii Bahmut",
    region: "Călărași",
    village: "Bahmut",
    pricePerAre: 240, totalPlots: 20, availablePlots: 13, size: 3.5,
    photo: landPhotos[5],
    gallery: [landPhotos[5], landPhotos[3], landPhotos[0]],
    description: "Câmp deschis la marginea Codrilor, soare din zori până-n seară. Loc generos pentru cartofi și porumb.",
    coords: [47.275, 28.302],
    features: ["Câmp deschis", "Sistem irigare", "Tractor", "Depozit recoltă"],
    farmerId: "u-petru",
  },
];

export const findLand = (id: string) => LANDS.find(l => l.id === id);
export const landsByFarmer = (farmerId: string) => LANDS.filter(l => l.farmerId === farmerId);

// ───────── Plots ─────────
export const buildPlots = (land: Land): Plot[] =>
  Array.from({ length: land.totalPlots }, (_, i) => ({
    id: `${land.id}-p${i + 1}`,
    landId: land.id,
    code: `L${i + 1}`,
    area: 0.5 + ((i * 7) % 6) * 0.25,
    status: i >= land.availablePlots ? "reserved" : i === land.availablePlots ? "maintenance" : "available",
  }));

export const ALL_PLOTS: Plot[] = LANDS.flatMap(buildPlots);
export const findPlot = (id: string) => ALL_PLOTS.find(p => p.id === id);

// ───────── Cultures (12 — admin-managed catalog) ─────────
export const CULTURES: Culture[] = [
  { id: "tomatoes",  name: "Roșii",     category: "Legume",      icon: veg.tomatoes,  pricePerAre: 180, cycleDays: 110, yieldKgPerAre: 250, season: "Vară",       description: "Roșii de grădină, dulci și parfumate." },
  { id: "cucumbers", name: "Castraveți", category: "Legume",     icon: veg.cucumber,  pricePerAre: 150, cycleDays: 70,  yieldKgPerAre: 200, season: "Vară",       description: "Castraveți crocanți pentru salate și murat." },
  { id: "peppers",   name: "Ardei",     category: "Legume",      icon: veg.pepper,    pricePerAre: 170, cycleDays: 100, yieldKgPerAre: 180, season: "Vară",       description: "Ardei gras, dulce, pentru toată vara." },
  { id: "potatoes",  name: "Cartofi",   category: "Rădăcinoase", icon: veg.potato,    pricePerAre: 90,  cycleDays: 90,  yieldKgPerAre: 280, season: "Primăvară",  description: "Cartofi pentru iarnă, cu coajă subțire." },
  { id: "carrots",   name: "Morcovi",   category: "Rădăcinoase", icon: veg.carrot,    pricePerAre: 110, cycleDays: 80,  yieldKgPerAre: 220, season: "Primăvară",  description: "Morcovi dulci, buni cruzi sau gătiți." },
  { id: "cabbage",   name: "Varză",     category: "Legume",      icon: veg.cabbage,   pricePerAre: 100, cycleDays: 95,  yieldKgPerAre: 350, season: "Toamnă",     description: "Varză albă, pentru murat și sarmale." },
  { id: "eggplant",  name: "Vinete",    category: "Legume",      icon: veg.eggplant,  pricePerAre: 200, cycleDays: 110, yieldKgPerAre: 160, season: "Vară",       description: "Vinete lucioase pentru zacuscă și salate." },
  { id: "onions",    name: "Ceapă",     category: "Legume",      icon: veg.onion,     pricePerAre: 80,  cycleDays: 100, yieldKgPerAre: 200, season: "Primăvară",  description: "Ceapă galbenă, baza oricărei bucătării." },
  { id: "corn",      name: "Porumb",    category: "Cereale",     icon: veg.corn,      pricePerAre: 70,  cycleDays: 120, yieldKgPerAre: 300, season: "Vară",       description: "Porumb dulce pentru fiert și păstrat." },
  { id: "beets",     name: "Sfeclă",    category: "Rădăcinoase", icon: veg.beet,      pricePerAre: 95,  cycleDays: 100, yieldKgPerAre: 250, season: "Toamnă",     description: "Sfeclă roșie, pentru borș și salate." },
  { id: "radish",    name: "Ridichi",   category: "Rădăcinoase", icon: veg.radish,    pricePerAre: 60,  cycleDays: 35,  yieldKgPerAre: 150, season: "Primăvară",  description: "Ridichi de primăvară, picante și fragede." },
  { id: "leeks",     name: "Praz",      category: "Verdețuri",   icon: veg.leek,      pricePerAre: 130, cycleDays: 130, yieldKgPerAre: 180, season: "Toamnă",     description: "Praz aromat, pentru supe și mâncăruri." },
];
export const findCulture = (id: string) => CULTURES.find(c => c.id === id);

// ───────── Services (per farmer) ─────────
export const SERVICES: Service[] = [
  { id: "s-tilling-ion",    farmerId: "u-ion",   name: "Arat & săpat",   icon: tools.shovel,        price: 250, unit: "lot",     description: "Pregătim pământul cu sapa și plugul." },
  { id: "s-planting-ion",   farmerId: "u-ion",   name: "Plantare răsaduri", icon: tools.trowel,    price: 180, unit: "lot",     description: "Plantăm răsadurile alese, rând lângă rând." },
  { id: "s-watering-ion",   farmerId: "u-ion",   name: "Udat regulat",   icon: tools.wateringcan2,  price: 120, unit: "săpt.",   description: "Udăm de două ori pe săptămână, dimineața." },
  { id: "s-weeding-maria",  farmerId: "u-maria", name: "Plivit cu mâna", icon: tools.glove,         price: 90,  unit: "vizită",  description: "Curățăm de buruieni cu mâna și sapa mică." },
  { id: "s-pruning-maria",  farmerId: "u-maria", name: "Curățat plante", icon: tools.pruners,       price: 100, unit: "vizită",  description: "Tăiem ce e în plus, ca să crească ce trebuie." },
  { id: "s-bio-maria",      farmerId: "u-maria", name: "Tratament bio",  icon: tools.sprayer,       price: 140, unit: "vizită",  description: "Tratamente naturale, fără chimicale." },
  { id: "s-tilling-petru",  farmerId: "u-petru", name: "Arat cu tractor", icon: tools.shovel,       price: 320, unit: "lot",     description: "Arat profund cu tractor pentru loturi mari." },
  { id: "s-harvest-petru",  farmerId: "u-petru", name: "Recoltat",       icon: tools.bag,           price: 200, unit: "lot",     description: "Strângem recolta și o pregătim pentru tine." },
];
export const servicesByFarmer = (farmerId: string) => SERVICES.filter(s => s.farmerId === farmerId);
export const findService = (id: string) => SERVICES.find(s => s.id === id);

// ───────── Products (marketplace) ─────────
export const PRODUCTS: Product[] = [
  { id: "p1",  farmerId: "u-ion",   name: "Răsad de roșii (10 buc.)",     category: "Răsaduri",    price: 80,  icon: veg.tomatoes,    description: "Răsaduri sănătoase, gata de plantat.", stock: 45 },
  { id: "p2",  farmerId: "u-ion",   name: "Răsad de ardei (10 buc.)",     category: "Răsaduri",    price: 75,  icon: veg.pepper,      description: "Soi dulce, pentru sezon lung.",         stock: 32 },
  { id: "p3",  farmerId: "u-maria", name: "Răsad de vinete (8 buc.)",     category: "Răsaduri",    price: 90,  icon: veg.eggplant,    description: "Vinete lucioase, productive.",          stock: 18 },
  { id: "p4",  farmerId: "u-maria", name: "Răsad de varză (12 buc.)",     category: "Răsaduri",    price: 60,  icon: veg.cabbage,     description: "Varză albă, pentru toamnă.",            stock: 0 },
  { id: "p5",  farmerId: "u-maria", name: "Semințe de morcov 5g",         category: "Semințe",     price: 25,  icon: veg.carrot,      description: "Soi tradițional moldovenesc.",          stock: 60 },
  { id: "p6",  farmerId: "u-ion",   name: "Semințe de castraveți",        category: "Semințe",     price: 30,  icon: veg.cucumber,    description: "Soi crocant pentru murat.",             stock: 24 },
  { id: "p7",  farmerId: "u-petru", name: "Semințe porumb dulce",         category: "Semințe",     price: 35,  icon: veg.corn,        description: "Pentru fiert, dulce și fraged.",        stock: 8 },
  { id: "p8",  farmerId: "u-petru", name: "Sapă mică de mână",            category: "Unelte",      price: 220, icon: tools.trowel,    description: "Coadă de lemn, lamă oțel.",             stock: 14 },
  { id: "p9",  farmerId: "u-ion",   name: "Stropitoare 5L",               category: "Unelte",      price: 280, icon: tools.wateringcan2, description: "Pentru udat copilărește de simplu.",  stock: 7 },
  { id: "p10", farmerId: "u-maria", name: "Mănuși de grădină",            category: "Unelte",      price: 95,  icon: tools.glove,     description: "Pentru mâini blânde la lucru.",         stock: 26 },
  { id: "p11", farmerId: "u-maria", name: "Compost natural 25kg",         category: "Îngrășăminte", price: 150, icon: tools.bag,      description: "Hrană pentru pământul tău.",            stock: 22 },
  { id: "p12", farmerId: "u-petru", name: "Cenușă de lemn 5kg",           category: "Îngrășăminte", price: 60,  icon: tools.bag,      description: "Bună pentru roșii și cartofi.",         stock: 0 },
];
export const findProduct = (id: string) => PRODUCTS.find(p => p.id === id);
export const productsByFarmer = (farmerId: string) => PRODUCTS.filter(p => p.farmerId === farmerId);

// ───────── Reservations ─────────
export const RESERVATIONS: Reservation[] = [
  {
    id: "r-ana-l7",
    clientId: "u-ana",
    landId: "l-lunca-nistrului",
    plotId: "l-lunca-nistrului-p7",
    cultures: [
      { cultureId: "tomatoes", area: 1.0 },
      { cultureId: "cucumbers", area: 0.5 },
      { cultureId: "carrots", area: 0.5 },
    ],
    services: [
      { serviceId: "s-tilling-ion",  scheduledFor: "2026-04-05", status: "Finalizat" },
      { serviceId: "s-planting-ion", scheduledFor: "2026-04-18", status: "Finalizat" },
      { serviceId: "s-watering-ion", scheduledFor: "2026-05-02", status: "În lucru" },
    ],
    status: "În creștere",
    stageDates: { "Rezervat": "2026-03-12", "Arat": "2026-04-05", "Plantat": "2026-04-18", "În creștere": "2026-05-01" },
    season: "2026", createdAt: "2026-03-12", totalPrice: 1450,
  },
  {
    id: "r-mihai-l3",
    clientId: "u-mihai",
    landId: "l-valea-trandafirilor",
    plotId: "l-valea-trandafirilor-p3",
    cultures: [
      { cultureId: "potatoes", area: 1.5 },
      { cultureId: "onions", area: 0.5 },
    ],
    services: [
      { serviceId: "s-tilling-ion",  scheduledFor: "2026-04-10", status: "Finalizat" },
      { serviceId: "s-planting-ion", scheduledFor: "2026-04-22", status: "În așteptare" },
    ],
    status: "Plantat",
    stageDates: { "Rezervat": "2026-03-20", "Arat": "2026-04-10", "Plantat": "2026-04-22" },
    season: "2026", createdAt: "2026-03-20", totalPrice: 920,
  },
  {
    id: "r-elena-l2",
    clientId: "u-elena",
    landId: "l-gradina-bunicii",
    plotId: "l-gradina-bunicii-p2",
    cultures: [
      { cultureId: "leeks", area: 0.5 },
      { cultureId: "radish", area: 0.5 },
    ],
    services: [
      { serviceId: "s-weeding-maria", scheduledFor: "2026-05-08", status: "În așteptare" },
      { serviceId: "s-bio-maria",     scheduledFor: "2026-05-12", status: "În așteptare" },
    ],
    status: "Arat",
    stageDates: { "Rezervat": "2026-03-28", "Arat": "2026-04-25" },
    season: "2026", createdAt: "2026-03-28", totalPrice: 680,
  },
  {
    id: "r-ana-l1",
    clientId: "u-ana",
    landId: "l-codrii-bahmut",
    plotId: "l-codrii-bahmut-p1",
    cultures: [{ cultureId: "corn", area: 2.0 }],
    services: [{ serviceId: "s-tilling-petru", scheduledFor: "2025-09-12", status: "Finalizat" }],
    status: "Recoltat",
    stageDates: { "Rezervat": "2025-04-01", "Arat": "2025-04-15", "Plantat": "2025-04-30", "În creștere": "2025-06-10", "Recoltat": "2025-09-22" },
    season: "2025", createdAt: "2025-04-01", totalPrice: 1180,
  },
];
export const reservationsByClient = (clientId: string) => RESERVATIONS.filter(r => r.clientId === clientId);
export const reservationsByFarmer = (farmerId: string) =>
  RESERVATIONS.filter(r => landsByFarmer(farmerId).some(l => l.id === r.landId));

/** Convenience: the "current" client user's primary reservation. */
export const MY_RESERVATIONS = reservationsByClient("u-ana");

// ───────── Tasks (derived from active service orders, plus a few manual) ─────────
export const TASKS: Task[] = [
  { id: "t1", farmerId: "u-ion",   serviceId: "s-watering-ion",  plotId: "l-lunca-nistrului-p7",   landId: "l-lunca-nistrului",   clientId: "u-ana",   scheduledFor: "2026-05-02", status: "În lucru" },
  { id: "t2", farmerId: "u-ion",   serviceId: "s-planting-ion",  plotId: "l-valea-trandafirilor-p3", landId: "l-valea-trandafirilor", clientId: "u-mihai", scheduledFor: "2026-05-02", status: "În așteptare" },
  { id: "t3", farmerId: "u-ion",   serviceId: "s-watering-ion",  plotId: "l-lunca-nistrului-p9",   landId: "l-lunca-nistrului",   clientId: "u-mihai", scheduledFor: "2026-05-02", status: "În așteptare" },
  { id: "t4", farmerId: "u-ion",   serviceId: "s-tilling-ion",   plotId: "l-valea-trandafirilor-p5", landId: "l-valea-trandafirilor", clientId: "u-elena", scheduledFor: "2026-05-03", status: "În așteptare" },
  { id: "t5", farmerId: "u-maria", serviceId: "s-weeding-maria", plotId: "l-gradina-bunicii-p2",   landId: "l-gradina-bunicii",   clientId: "u-elena", scheduledFor: "2026-05-08", status: "În așteptare" },
  { id: "t6", farmerId: "u-maria", serviceId: "s-bio-maria",     plotId: "l-gradina-bunicii-p2",   landId: "l-gradina-bunicii",   clientId: "u-elena", scheduledFor: "2026-05-12", status: "În așteptare" },
  { id: "t7", farmerId: "u-petru", serviceId: "s-tilling-petru", plotId: "l-codrii-bahmut-p4",     landId: "l-codrii-bahmut",     clientId: "u-mihai", scheduledFor: "2026-05-09", status: "În așteptare" },
];
export const tasksByFarmer = (farmerId: string) => TASKS.filter(t => t.farmerId === farmerId);

// ───────── Product orders ─────────
export const PRODUCT_ORDERS: ProductOrder[] = [
  { id: "po1", clientId: "u-ana",   productId: "p1",  qty: 2, total: 160, status: "Livrată",     createdAt: "2026-03-30" },
  { id: "po2", clientId: "u-ana",   productId: "p9",  qty: 1, total: 280, status: "Livrată",     createdAt: "2026-04-02" },
  { id: "po3", clientId: "u-ana",   productId: "p11", qty: 1, total: 150, status: "Expediată",   createdAt: "2026-04-28" },
  { id: "po4", clientId: "u-mihai", productId: "p7",  qty: 3, total: 105, status: "Confirmată",  createdAt: "2026-04-29" },
  { id: "po5", clientId: "u-elena", productId: "p10", qty: 2, total: 190, status: "În așteptare", createdAt: "2026-05-01" },
];
export const ordersByClient = (clientId: string) => PRODUCT_ORDERS.filter(o => o.clientId === clientId);
export const ordersByFarmer = (farmerId: string) =>
  PRODUCT_ORDERS.filter(o => productsByFarmer(farmerId).some(p => p.id === o.productId));

// ───────── Activity feed ─────────
export const ACTIVITY: ActivityEvent[] = [
  { id: "a1", at: "2026-05-02 09:14", kind: "service",     message: "Ion a marcat „Udat L7” ca în lucru — Lunca Nistrului" },
  { id: "a2", at: "2026-05-01 18:02", kind: "reservation", message: "Elena a rezervat lotul L2 — Grădina Bunicii" },
  { id: "a3", at: "2026-05-01 16:45", kind: "order",       message: "Ana a comandat Compost natural 25kg de la Grădina Bio" },
  { id: "a4", at: "2026-04-30 11:20", kind: "user",        message: "Cont nou: Mihai Țurcanu (client)" },
  { id: "a5", at: "2026-04-29 14:08", kind: "land",        message: "Ion a actualizat fotografiile pentru Lunca Nistrului" },
  { id: "a6", at: "2026-04-28 10:30", kind: "service",     message: "Maria a finalizat „Plivit” pe lotul L4 — Livada Veche" },
  { id: "a7", at: "2026-04-27 09:00", kind: "reservation", message: "Mihai a rezervat lotul L3 — Valea Trandafirilor" },
];

// ───────── Testimonials (kept from before) ─────────
export const TESTIMONIALS = [
  { name: "Ana din Chișinău", quote: "Aveam dor de pământ. Acum am un lot al meu, fără să plec din oraș. Și legumele mele sunt cele mai dulci.", veg: veg.tomatoes },
  { name: "Mihai și Nina",     quote: "Copilul nostru știe acum cum crește varza. Asta n-are preț. Mulțumim, MyGarden.", veg: veg.cabbage },
  { name: "Doamna Elena",      quote: "M-am întors la grădinărit la 62 de ani, fără sapă, fără bătături. Fermierul Ion face totul, eu doar aleg ce plantăm.", veg: veg.carrot },
];

/** Quick MDL formatter. */
export const mdl = (n: number) =>
  `${n.toLocaleString("ro-MD", { maximumFractionDigits: 0 })} MDL`;

// Legacy alias
export const TODAY_TASKS = TASKS.filter(t => t.farmerId === "u-ion").map(t => ({
  id: t.id,
  title: `${findService(t.serviceId)?.name} — ${findLand(t.landId)?.name}`,
  icon: findService(t.serviceId)?.icon ?? tools.bag,
  done: t.status === "Finalizat",
}));
