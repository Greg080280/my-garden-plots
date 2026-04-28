import { veg, tools, landPhotos } from "@/assets";

export type Region = "Chișinău" | "Cahul" | "Bălți" | "Orhei" | "Ungheni" | "Soroca";

export interface Land {
  id: string;
  name: string;
  region: Region;
  village: string;
  pricePerAre: number; // MDL / ar / sezon
  totalPlots: number;
  availablePlots: number;
  size: number; // hectares
  photo: string;
  gallery: string[];
  description: string;
  coords: [number, number];
  features: string[];
  farmer: string;
}

export interface Plot {
  id: string;
  code: string; // L1, L2…
  area: number; // ari
  reserved: boolean;
}

export interface Culture {
  id: string;
  name: string;
  icon: string;
  pricePerAre: number;
  cycleDays: number;
  yieldKgPerAre: number;
  description: string;
}

export interface Service {
  id: string;
  name: string;
  icon: string;
  price: number;
  unit: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  category: "Răsaduri" | "Semințe" | "Unelte" | "Îngrășăminte";
  price: number;
  icon: string;
  description: string;
}

export interface Reservation {
  id: string;
  landId: string;
  plotId: string;
  cultures: { cultureId: string; area: number }[];
  services: string[];
  status: "Rezervat" | "Pregătit" | "Plantat" | "În creștere" | "Recoltat";
  createdAt: string;
}

// ───── Lands ──────────────────────────────────────────────────────────────
export const LANDS: Land[] = [
  {
    id: "valea-trandafirilor",
    name: "Valea Trandafirilor",
    region: "Orhei",
    village: "Brănești",
    pricePerAre: 320,
    totalPlots: 15,
    availablePlots: 8,
    size: 2.4,
    photo: landPhotos[0],
    gallery: [landPhotos[0], landPhotos[2], landPhotos[5]],
    description:
      "Un teren însorit pe versantul de sud, cu pământ negru și apă din izvor. Perfect pentru roșii, ardei și cartofi.",
    coords: [47.3853, 28.825],
    features: ["Apă din izvor", "Sol cernoziom", "Acces auto", "Gard împrejmuit"],
    farmer: "Domnul Vasile",
  },
  {
    id: "gradina-bunicii",
    name: "Grădina Bunicii",
    region: "Ungheni",
    village: "Cornești",
    pricePerAre: 280,
    totalPlots: 12,
    availablePlots: 4,
    size: 1.8,
    photo: landPhotos[2],
    gallery: [landPhotos[2], landPhotos[4], landPhotos[1]],
    description:
      "Un loc liniștit cu paturi de legume ridicate, lângă o livadă de meri. Aici totul crește singur, parcă.",
    coords: [47.213, 27.8],
    features: ["Paturi ridicate", "Livadă alături", "Casă de unelte", "Compost natural"],
    farmer: "Doamna Maria",
  },
  {
    id: "campul-cu-maci",
    name: "Câmpul cu Maci",
    region: "Cahul",
    village: "Roșu",
    pricePerAre: 240,
    totalPlots: 20,
    availablePlots: 15,
    size: 3.5,
    photo: landPhotos[5],
    gallery: [landPhotos[5], landPhotos[3], landPhotos[0]],
    description:
      "Câmpie deschisă, soare din zori până-n seară. Loc generos pentru cartofi, porumb și floarea-soarelui.",
    coords: [45.91, 28.2],
    features: ["Câmp deschis", "Tractor disponibil", "Sistem irigare", "Depozit recoltă"],
    farmer: "Domnul Petru",
  },
  {
    id: "via-de-sub-deal",
    name: "Via de sub Deal",
    region: "Soroca",
    village: "Cosăuți",
    pricePerAre: 360,
    totalPlots: 10,
    availablePlots: 2,
    size: 1.2,
    photo: landPhotos[3],
    gallery: [landPhotos[3], landPhotos[5], landPhotos[2]],
    description:
      "Lângă vie, cu vedere spre Nistru. Pământ rodnic, vânt blând, ideal pentru zarzavaturi delicate.",
    coords: [48.16, 28.3],
    features: ["Vedere la Nistru", "Vie alături", "Vânt blând", "Sol bogat"],
    farmer: "Doamna Elena",
  },
  {
    id: "livada-veche",
    name: "Livada Veche",
    region: "Bălți",
    village: "Sîngerei",
    pricePerAre: 260,
    totalPlots: 18,
    availablePlots: 11,
    size: 2.8,
    photo: landPhotos[1],
    gallery: [landPhotos[1], landPhotos[4], landPhotos[0]],
    description:
      "Pământ proaspăt arat, gata pentru semănat. O livadă de pruni veghează peste loturi.",
    coords: [47.65, 28.0],
    features: ["Recent arat", "Pruni alături", "Apă pe loc", "Lumină plină"],
    farmer: "Domnul Ion",
  },
  {
    id: "gradina-de-langa-rau",
    name: "Grădina de lângă Râu",
    region: "Chișinău",
    village: "Vadul lui Vodă",
    pricePerAre: 380,
    totalPlots: 16,
    availablePlots: 6,
    size: 2.0,
    photo: landPhotos[4],
    gallery: [landPhotos[4], landPhotos[2], landPhotos[0]],
    description:
      "Aproape de Chișinău, lângă apă. Loturi mici și prietenoase, perfecte pentru începători.",
    coords: [47.083, 29.083],
    features: ["Aproape de oraș", "Apă din râu", "Loturi mici", "Pentru începători"],
    farmer: "Domnul Andrei",
  },
];

export const buildPlots = (land: Land): Plot[] =>
  Array.from({ length: land.totalPlots }, (_, i) => ({
    id: `${land.id}-p${i + 1}`,
    code: `L${i + 1}`,
    area: 0.5 + ((i * 7) % 6) * 0.25,
    reserved: i >= land.availablePlots,
  }));

// ───── Cultures ────────────────────────────────────────────────────────────
export const CULTURES: Culture[] = [
  { id: "tomatoes", name: "Roșii", icon: veg.tomatoes, pricePerAre: 180, cycleDays: 110, yieldKgPerAre: 250, description: "Roșii de grădină, dulci și parfumate." },
  { id: "cucumbers", name: "Castraveți", icon: veg.cucumber, pricePerAre: 150, cycleDays: 70, yieldKgPerAre: 200, description: "Castraveți crocanți pentru salate și murat." },
  { id: "peppers", name: "Ardei", icon: veg.pepper, pricePerAre: 170, cycleDays: 100, yieldKgPerAre: 180, description: "Ardei gras, dulce, pentru toată vara." },
  { id: "potatoes", name: "Cartofi", icon: veg.potato, pricePerAre: 90, cycleDays: 90, yieldKgPerAre: 280, description: "Cartofi pentru iarnă, cu coajă subțire." },
  { id: "carrots", name: "Morcovi", icon: veg.carrot, pricePerAre: 110, cycleDays: 80, yieldKgPerAre: 220, description: "Morcovi dulci, buni cruzi sau gătiți." },
  { id: "cabbage", name: "Varză", icon: veg.cabbage, pricePerAre: 100, cycleDays: 95, yieldKgPerAre: 350, description: "Varză albă, pentru murat și sarmale." },
  { id: "eggplant", name: "Vinete", icon: veg.eggplant, pricePerAre: 200, cycleDays: 110, yieldKgPerAre: 160, description: "Vinete lucioase pentru zacuscă și salate." },
  { id: "onions", name: "Ceapă", icon: veg.onion, pricePerAre: 80, cycleDays: 100, yieldKgPerAre: 200, description: "Ceapă galbenă, baza oricărei bucătării." },
  { id: "corn", name: "Porumb", icon: veg.corn, pricePerAre: 70, cycleDays: 120, yieldKgPerAre: 300, description: "Porumb dulce pentru fiert și păstrat." },
  { id: "beets", name: "Sfeclă", icon: veg.beet, pricePerAre: 95, cycleDays: 100, yieldKgPerAre: 250, description: "Sfeclă roșie, pentru borș și salate." },
  { id: "radish", name: "Ridichi", icon: veg.radish, pricePerAre: 60, cycleDays: 35, yieldKgPerAre: 150, description: "Ridichi de primăvară, picante și fragede." },
  { id: "leeks", name: "Praz", icon: veg.leek, pricePerAre: 130, cycleDays: 130, yieldKgPerAre: 180, description: "Praz aromat, pentru supe și mâncăruri." },
];

// ───── Services ───────────────────────────────────────────────────────────
export const SERVICES: Service[] = [
  { id: "tilling", name: "Arat & săpat", icon: tools.shovel, price: 250, unit: "lot", description: "Pregătim pământul cu sapa și plugul." },
  { id: "planting", name: "Plantare", icon: tools.trowel, price: 180, unit: "lot", description: "Plantăm răsadurile alese, rând lângă rând." },
  { id: "watering", name: "Udat regulat", icon: tools.wateringcan2, price: 120, unit: "săpt.", description: "Udăm de două ori pe săptămână, dimineața." },
  { id: "weeding", name: "Plivit", icon: tools.glove, price: 90, unit: "vizită", description: "Curățăm de buruieni cu mâna și sapa mică." },
  { id: "pruning", name: "Curățat plante", icon: tools.pruners, price: 100, unit: "vizită", description: "Tăiem ce e în plus, ca să crească ce trebuie." },
  { id: "harvesting", name: "Recoltat", icon: tools.bag, price: 200, unit: "lot", description: "Strângem recolta și o pregătim pentru tine." },
];

// ───── Marketplace ───────────────────────────────────────────────────────
export const PRODUCTS: Product[] = [
  { id: "p1", name: "Răsad de roșii (10 buc.)", category: "Răsaduri", price: 80, icon: veg.tomatoes, description: "Răsaduri sănătoase, gata de plantat." },
  { id: "p2", name: "Răsad de ardei (10 buc.)", category: "Răsaduri", price: 75, icon: veg.pepper, description: "Soi dulce, pentru sezon lung." },
  { id: "p3", name: "Răsad de vinete (8 buc.)", category: "Răsaduri", price: 90, icon: veg.eggplant, description: "Vinete lucioase, productive." },
  { id: "p4", name: "Răsad de varză (12 buc.)", category: "Răsaduri", price: 60, icon: veg.cabbage, description: "Varză albă, pentru toamnă." },
  { id: "p5", name: "Semințe de morcov", category: "Semințe", price: 25, icon: veg.carrot, description: "Plic 5g, soi tradițional." },
  { id: "p6", name: "Semințe de castraveți", category: "Semințe", price: 30, icon: veg.cucumber, description: "Soi crocant pentru murat." },
  { id: "p7", name: "Semințe de porumb dulce", category: "Semințe", price: 35, icon: veg.corn, description: "Pentru fiert, dulce și fraged." },
  { id: "p8", name: "Sapă mică de mână", category: "Unelte", price: 220, icon: tools.trowel, description: "Coadă de lemn, lamă oțel." },
  { id: "p9", name: "Stropitoare 5L", category: "Unelte", price: 280, icon: tools.wateringcan2, description: "Pentru udat copilărește de simplu." },
  { id: "p10", name: "Mănuși de grădină", category: "Unelte", price: 95, icon: tools.glove, description: "Pentru mâini blânde la lucru." },
  { id: "p11", name: "Compost natural 25kg", category: "Îngrășăminte", price: 150, icon: tools.bag, description: "Hrană pentru pământul tău." },
  { id: "p12", name: "Cenușă de lemn 5kg", category: "Îngrășăminte", price: 60, icon: tools.bag, description: "Bună pentru roșii și cartofi." },
];

// ───── Testimonials ──────────────────────────────────────────────────────
export const TESTIMONIALS = [
  { name: "Ana din Chișinău", quote: "Aveam dor de pământ. Acum am un lot al meu, fără să plec din oraș. Și legumele mele sunt cele mai dulci.", veg: veg.tomatoes },
  { name: "Mihai și Nina", quote: "Copilul nostru știe acum cum crește varza. Asta n-are preț. Mulțumim, MyGarden.", veg: veg.cabbage },
  { name: "Doamna Vera", quote: "M-am întors la grădinărit la 62 de ani, fără sapă, fără bătături. Fermierul Vasile face totul, eu doar aleg ce plantăm.", veg: veg.carrot },
];

// ───── Tasks (farmer dashboard) ──────────────────────────────────────────
export const TODAY_TASKS = [
  { id: "t1", title: "Udat lot L3 — Valea Trandafirilor", icon: tools.wateringcan2, done: false },
  { id: "t2", title: "Plivit lot L7 — Grădina Bunicii", icon: tools.glove, done: false },
  { id: "t3", title: "Plantat răsaduri ardei — L2", icon: tools.trowel, done: true },
  { id: "t4", title: "Recoltat castraveți — L9", icon: tools.bag, done: false },
  { id: "t5", title: "Tăiat lăstari roșii — L5", icon: tools.pruners, done: false },
];

// ───── Mock current user reservations ───────────────────────────────────
export const MY_RESERVATIONS: Reservation[] = [
  {
    id: "r1",
    landId: "valea-trandafirilor",
    plotId: "valea-trandafirilor-p3",
    cultures: [
      { cultureId: "tomatoes", area: 1.0 },
      { cultureId: "cucumbers", area: 0.5 },
      { cultureId: "carrots", area: 0.5 },
    ],
    services: ["tilling", "planting", "watering"],
    status: "În creștere",
    createdAt: "2026-03-12",
  },
];
