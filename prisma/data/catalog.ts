// Seed catalog for BuyWise AI. Real, representative products across categories
// with multi-store offers and AI-style review analyses. Prices in whole INR.

export interface SeedOffer {
  store: string; // store slug
  price: number;
  mrp?: number;
  deliveryDays?: number;
  cashback?: number;
  couponCode?: string;
  official?: boolean;
}

export interface SeedReview {
  summary: string;
  verdict: string;
  pros: string[];
  cons: string[];
  praises: string[];
  complaints: string[];
  longTerm: string;
  buy: string[];
  avoid: string[];
  fake: number; // 0-100 estimate
  fakeConfidence: number; // 0-1
  analyzed: number;
}

type ScoreKey =
  | "ai"
  | "performance"
  | "battery"
  | "display"
  | "camera"
  | "value"
  | "build"
  | "repair";

export interface SeedProduct {
  slug: string;
  name: string;
  category: string; // category slug
  brand: string; // brand slug
  short: string;
  description: string;
  specs: Record<string, string>;
  scores: Partial<Record<ScoreKey, number>>;
  rating: number;
  reviewCount: number;
  warrantyMonths: number;
  releaseDate: string; // ISO date
  offers: SeedOffer[];
  review: SeedReview;
}

export const catalog: SeedProduct[] = [
  {
    slug: "apple-macbook-air-13-m3",
    name: "Apple MacBook Air 13\" (M3)",
    category: "laptops",
    brand: "apple",
    short: "Featherlight, silent, and superb battery — the default premium ultrabook.",
    description:
      "The M3 MacBook Air pairs Apple's fast, efficient M3 chip with a gorgeous Liquid Retina display in a fanless 1.24kg chassis. Excellent for coding, writing and everyday work with all-day battery.",
    specs: {
      Processor: "Apple M3 (8-core)",
      RAM: "8GB unified",
      Storage: "256GB SSD",
      Display: "13.6\" Liquid Retina, 2560x1664",
      Weight: "1.24 kg",
      Battery: "Up to 18 hours",
      OS: "macOS",
    },
    scores: { ai: 91, performance: 88, battery: 95, display: 90, value: 78, build: 95, repair: 30 },
    rating: 4.7,
    reviewCount: 2140,
    warrantyMonths: 12,
    releaseDate: "2024-03-08",
    offers: [
      { store: "apple", price: 99900, mrp: 114900, deliveryDays: 3, official: true },
      { store: "amazon", price: 94990, mrp: 114900, deliveryDays: 2, cashback: 2000 },
      { store: "flipkart", price: 95499, mrp: 114900, deliveryDays: 3 },
      { store: "croma", price: 97900, mrp: 114900, deliveryDays: 4 },
    ],
    review: {
      summary:
        "Owners love the silent, cool operation and class-leading battery. The main gripe is the 8GB base memory and limited ports.",
      verdict:
        "The best thin-and-light for most people — as long as 8GB RAM fits your workflow.",
      pros: ["Outstanding battery life", "Silent, fanless", "Premium build", "Great display"],
      cons: ["8GB base RAM", "Only two Thunderbolt ports", "Pricey upgrades"],
      praises: ["Battery lasts all day", "Runs cool and quiet", "Fantastic keyboard and trackpad"],
      complaints: ["8GB feels tight for heavy multitasking", "256GB fills up fast"],
      longTerm: "After a year, owners report the battery holds up well and macOS updates keep it smooth.",
      buy: ["Students and professionals", "Anyone wanting the best battery life", "Light coding and web dev"],
      avoid: ["Heavy VMs or large datasets on 8GB", "Gamers"],
      fake: 8,
      fakeConfidence: 0.72,
      analyzed: 2140,
    },
  },
  {
    slug: "asus-rog-strix-g16-2024",
    name: "ASUS ROG Strix G16 (2024)",
    category: "laptops",
    brand: "asus",
    short: "A hard-hitting 1080p gaming laptop with RTX 4060 and a 165Hz panel.",
    description:
      "Intel Core i7 14th-gen paired with an RTX 4060 and a fast 16\" 165Hz display. Strong thermals and a roomy keyboard make it a great all-round gaming and creator machine.",
    specs: { Processor: "Intel Core i7-14650HX", GPU: "RTX 4060 8GB", RAM: "16GB DDR5", Storage: "1TB SSD", Display: "16\" 165Hz IPS", Weight: "2.5 kg" },
    scores: { ai: 86, performance: 92, battery: 55, display: 82, value: 80, build: 78 },
    rating: 4.5,
    reviewCount: 890,
    warrantyMonths: 12,
    releaseDate: "2024-02-15",
    offers: [
      { store: "asus", price: 149990, mrp: 169990, deliveryDays: 5, official: true },
      { store: "amazon", price: 142990, mrp: 169990, deliveryDays: 2, cashback: 4000 },
      { store: "flipkart", price: 144999, mrp: 169990, deliveryDays: 3 },
    ],
    review: {
      summary: "Reviewers praise the strong 1080p gaming performance and cooling; battery life and weight are the trade-offs.",
      verdict: "Excellent value gaming laptop if you can live with the bulk and short battery.",
      pros: ["Great 1080p gaming", "165Hz display", "Good cooling", "Solid keyboard"],
      cons: ["Heavy", "Mediocre battery", "Fans get loud under load"],
      praises: ["Runs demanding games smoothly", "Stays cool", "Bright fast screen"],
      complaints: ["Battery drains fast", "Heavy to carry daily"],
      longTerm: "Owners report reliable thermals after a year with occasional repaste for peak temps.",
      buy: ["Gamers on a budget", "Students in CS/creative fields", "1080p high-refresh gaming"],
      avoid: ["Frequent travellers", "Anyone needing long battery"],
      fake: 12,
      fakeConfidence: 0.68,
      analyzed: 890,
    },
  },
  {
    slug: "dell-inspiron-15-5530",
    name: "Dell Inspiron 15 5530",
    category: "laptops",
    brand: "dell",
    short: "A dependable everyday coding laptop with a bright display and comfy keyboard.",
    description:
      "Intel Core i5 13th-gen with 16GB RAM and a 15.6\" FHD screen — a reliable workhorse for web development, study and office work under a modest budget.",
    specs: { Processor: "Intel Core i5-1334U", RAM: "16GB DDR4", Storage: "512GB SSD", Display: "15.6\" FHD", Weight: "1.65 kg", Battery: "Up to 9 hours" },
    scores: { ai: 79, performance: 74, battery: 72, display: 72, value: 88, build: 74, repair: 62 },
    rating: 4.3,
    reviewCount: 1560,
    warrantyMonths: 12,
    releaseDate: "2023-08-20",
    offers: [
      { store: "dell", price: 64990, mrp: 78000, deliveryDays: 5, official: true },
      { store: "amazon", price: 61990, mrp: 78000, deliveryDays: 2, cashback: 1500 },
      { store: "flipkart", price: 62499, mrp: 78000, deliveryDays: 3 },
      { store: "croma", price: 63990, mrp: 78000, deliveryDays: 4 },
    ],
    review: {
      summary: "A well-rounded budget laptop; owners like the 16GB RAM and keyboard, and note the average battery and plasticky build.",
      verdict: "Great value for coding and everyday work under 70k.",
      pros: ["16GB RAM at this price", "Comfortable keyboard", "Upgradable storage"],
      cons: ["Average battery", "Plastic chassis", "Dim-ish display"],
      praises: ["Handles multitasking well", "Keyboard is comfortable for long sessions"],
      complaints: ["Battery is just okay", "Screen could be brighter"],
      longTerm: "Owners find it holds up for 2-3 years of daily coding with an SSD/RAM upgrade path.",
      buy: ["Students learning to code", "Budget-conscious professionals", "Home and office work"],
      avoid: ["Heavy gaming", "Those wanting a premium metal build"],
      fake: 15,
      fakeConfidence: 0.6,
      analyzed: 1560,
    },
  },
  {
    slug: "lenovo-loq-15-2024",
    name: "Lenovo LOQ 15 (2024)",
    category: "laptops",
    brand: "lenovo",
    short: "Affordable RTX 4050 gaming under 80k with a 144Hz screen.",
    description:
      "A value gaming laptop with an RTX 4050, 12th-gen Core i5 and a 15.6\" 144Hz display — solid 1080p gaming and light creator work without breaking 80k.",
    specs: { Processor: "Intel Core i5-12450HX", GPU: "RTX 4050 6GB", RAM: "16GB DDR5", Storage: "512GB SSD", Display: "15.6\" 144Hz", Weight: "2.4 kg" },
    scores: { ai: 82, performance: 84, battery: 58, display: 78, value: 86, build: 72 },
    rating: 4.4,
    reviewCount: 1120,
    warrantyMonths: 12,
    releaseDate: "2024-01-10",
    offers: [
      { store: "lenovo", price: 79990, mrp: 95000, deliveryDays: 5, official: true },
      { store: "amazon", price: 77990, mrp: 95000, deliveryDays: 2, cashback: 2500 },
      { store: "flipkart", price: 78499, mrp: 95000, deliveryDays: 3 },
    ],
    review: {
      summary: "Reviewers call it the best value gaming laptop under 80k; battery and speakers are the compromises.",
      verdict: "The pick for budget 1080p gaming under 80k.",
      pros: ["RTX 4050 value", "144Hz display", "Good cooling"],
      cons: ["Weak speakers", "Short battery", "Basic webcam"],
      praises: ["Runs modern games at high settings", "Cool under load"],
      complaints: ["Battery life is short", "Speakers are tinny"],
      longTerm: "Reliable after a year; owners suggest adding RAM for heavier creator workloads.",
      buy: ["Budget gamers", "Students wanting a GPU", "1080p gaming under 80k"],
      avoid: ["Travellers needing battery", "Audiophiles relying on laptop speakers"],
      fake: 14,
      fakeConfidence: 0.63,
      analyzed: 1120,
    },
  },
  {
    slug: "apple-iphone-15",
    name: "Apple iPhone 15",
    category: "smartphones",
    brand: "apple",
    short: "Dynamic Island, USB-C and a superb 48MP camera in a durable frame.",
    description:
      "The iPhone 15 brings USB-C, the Dynamic Island and a 48MP main camera with excellent video. Reliable performance and long software support make it a safe long-term buy.",
    specs: { Display: "6.1\" OLED 60Hz", Chip: "A16 Bionic", Camera: "48MP + 12MP UW", Battery: "3349 mAh", Storage: "128GB", OS: "iOS" },
    scores: { ai: 89, performance: 90, battery: 78, display: 84, camera: 88, value: 74, build: 90 },
    rating: 4.6,
    reviewCount: 5230,
    warrantyMonths: 12,
    releaseDate: "2023-09-22",
    offers: [
      { store: "apple", price: 69900, mrp: 79900, deliveryDays: 2, official: true },
      { store: "amazon", price: 65999, mrp: 79900, deliveryDays: 1, cashback: 3000 },
      { store: "flipkart", price: 65499, mrp: 79900, deliveryDays: 2 },
      { store: "croma", price: 67999, mrp: 79900, deliveryDays: 3 },
    ],
    review: {
      summary: "Owners love the cameras and longevity; the 60Hz screen and slow charging are the common complaints.",
      verdict: "A dependable flagship with best-in-class support — if 60Hz doesn't bother you.",
      pros: ["Excellent cameras", "USB-C at last", "Long software support"],
      cons: ["60Hz display", "Slow charging", "128GB base"],
      praises: ["Photos and video are fantastic", "Feels fast and reliable"],
      complaints: ["Screen is only 60Hz", "Charging is slow vs Android"],
      longTerm: "Holds value and gets ~5 years of iOS updates; battery health stays strong with care.",
      buy: ["iOS users", "Camera-first buyers", "Long-term owners"],
      avoid: ["High-refresh gamers", "Fast-charging fans"],
      fake: 10,
      fakeConfidence: 0.7,
      analyzed: 5230,
    },
  },
  {
    slug: "nothing-phone-2a",
    name: "Nothing Phone (2a)",
    category: "smartphones",
    brand: "nothing",
    short: "A striking sub-25k phone with clean software and a smooth 120Hz OLED.",
    description:
      "Distinctive Glyph design, a bright 120Hz OLED and clean Nothing OS make the Phone (2a) a standout under 25k with dependable day-long battery.",
    specs: { Display: "6.7\" OLED 120Hz", Chip: "Dimensity 7200 Pro", Camera: "50MP + 50MP UW", Battery: "5000 mAh", Storage: "128GB", OS: "Nothing OS" },
    scores: { ai: 80, performance: 78, battery: 84, display: 85, camera: 76, value: 90, build: 76 },
    rating: 4.4,
    reviewCount: 3110,
    warrantyMonths: 12,
    releaseDate: "2024-03-05",
    offers: [
      { store: "flipkart", price: 23999, mrp: 27999, deliveryDays: 2 },
      { store: "amazon", price: 24499, mrp: 27999, deliveryDays: 1, cashback: 1000 },
      { store: "croma", price: 24999, mrp: 27999, deliveryDays: 3 },
    ],
    review: {
      summary: "Praised for design, display and clean software; camera in low light and no telephoto are the trade-offs.",
      verdict: "One of the best-looking and smoothest phones under 25k.",
      pros: ["Great 120Hz OLED", "Clean, fast software", "Strong battery"],
      cons: ["Average low-light photos", "No telephoto", "Glyph is niche"],
      praises: ["Display is superb for the price", "Software feels premium and clean"],
      complaints: ["Low-light camera is average", "Gets warm while gaming"],
      longTerm: "Nothing's update cadence is solid; owners report smooth performance after months of use.",
      buy: ["Budget buyers wanting style", "Clean-software fans", "Day-long battery seekers"],
      avoid: ["Pro photographers", "Heavy gamers wanting flagship speed"],
      fake: 18,
      fakeConfidence: 0.58,
      analyzed: 3110,
    },
  },
  {
    slug: "samsung-galaxy-s24",
    name: "Samsung Galaxy S24",
    category: "smartphones",
    brand: "samsung",
    short: "Compact flagship with a brilliant 120Hz display and 7 years of updates.",
    description:
      "A pocketable flagship with a bright 120Hz AMOLED, capable triple cameras, Galaxy AI features and an industry-leading 7 years of OS updates.",
    specs: { Display: "6.2\" AMOLED 120Hz", Chip: "Exynos 2400", Camera: "50MP + 12MP UW + 10MP tele", Battery: "4000 mAh", Storage: "256GB", OS: "One UI" },
    scores: { ai: 88, performance: 86, battery: 76, display: 90, camera: 85, value: 76, build: 88 },
    rating: 4.5,
    reviewCount: 4180,
    warrantyMonths: 12,
    releaseDate: "2024-01-24",
    offers: [
      { store: "samsung", price: 74999, mrp: 79999, deliveryDays: 2, official: true },
      { store: "amazon", price: 69999, mrp: 79999, deliveryDays: 1, cashback: 3000 },
      { store: "flipkart", price: 70999, mrp: 79999, deliveryDays: 2 },
    ],
    review: {
      summary: "Loved for its compact size, display and long update promise; battery and Exynos heat are the debates.",
      verdict: "The best compact Android flagship, with unmatched update longevity.",
      pros: ["Superb display", "7 years of updates", "Great cameras", "Compact"],
      cons: ["Average battery", "Exynos runs warm", "Slow-ish charging"],
      praises: ["Screen is gorgeous and bright", "Perfect size for one hand"],
      complaints: ["Battery could be bigger", "Warms up during gaming"],
      longTerm: "With 7 years of updates it's a genuine long-term flagship; battery degrades gracefully.",
      buy: ["Compact-phone fans", "Long-term Android owners", "Display-first buyers"],
      avoid: ["Heavy users needing 2-day battery", "Fast-charging enthusiasts"],
      fake: 11,
      fakeConfidence: 0.66,
      analyzed: 4180,
    },
  },
  {
    slug: "google-pixel-8a",
    name: "Google Pixel 8a",
    category: "smartphones",
    brand: "google",
    short: "The camera and AI king of the mid-range with 7 years of updates.",
    description:
      "Pixel 8a delivers class-leading computational photography, clean Android with helpful AI features, and a 120Hz OLED — all backed by 7 years of updates.",
    specs: { Display: "6.1\" OLED 120Hz", Chip: "Tensor G3", Camera: "64MP + 13MP UW", Battery: "4492 mAh", Storage: "128GB", OS: "Pixel Android" },
    scores: { ai: 90, performance: 80, battery: 78, display: 82, camera: 90, value: 85, build: 80 },
    rating: 4.5,
    reviewCount: 2760,
    warrantyMonths: 12,
    releaseDate: "2024-05-14",
    offers: [
      { store: "flipkart", price: 48999, mrp: 52999, deliveryDays: 2 },
      { store: "amazon", price: 47999, mrp: 52999, deliveryDays: 1, cashback: 2000 },
      { store: "croma", price: 49999, mrp: 52999, deliveryDays: 3 },
    ],
    review: {
      summary: "Reviewers rave about the camera and software; Tensor heat and slow charging are the known trade-offs.",
      verdict: "The smartest mid-range camera phone you can buy.",
      pros: ["Best-in-class camera", "Clean AI-rich software", "7 years of updates"],
      cons: ["Tensor runs warm", "Slow charging", "128GB base"],
      praises: ["Point-and-shoot photos are superb", "Software is clean and clever"],
      complaints: ["Gets warm under load", "Charging is slow"],
      longTerm: "Long update support makes it a durable pick; camera stays a highlight for years.",
      buy: ["Camera lovers on a mid budget", "Clean-Android fans", "AI-feature seekers"],
      avoid: ["Mobile gamers", "Those who charge in a hurry"],
      fake: 13,
      fakeConfidence: 0.64,
      analyzed: 2760,
    },
  },
  {
    slug: "sony-wf-1000xm5",
    name: "Sony WF-1000XM5",
    category: "audio",
    brand: "sony",
    short: "Best-in-class noise cancellation and sound in a compact earbud.",
    description:
      "Sony's flagship earbuds deliver top-tier active noise cancellation, rich sound and excellent call quality in a smaller, lighter design.",
    specs: { Type: "TWS ANC earbuds", Battery: "8h + 16h case", ANC: "Yes, adaptive", Codec: "LDAC, AAC, SBC", Waterproof: "IPX4" },
    scores: { ai: 90, performance: 88, battery: 80, value: 74, build: 82 },
    rating: 4.6,
    reviewCount: 3420,
    warrantyMonths: 12,
    releaseDate: "2023-07-24",
    offers: [
      { store: "amazon", price: 18990, mrp: 24990, deliveryDays: 1, cashback: 1000 },
      { store: "flipkart", price: 19499, mrp: 24990, deliveryDays: 2 },
      { store: "croma", price: 20990, mrp: 24990, deliveryDays: 3 },
    ],
    review: {
      summary: "Owners call the ANC and sound class-leading; the price and easily-lost small buds are the gripes.",
      verdict: "The earbuds to beat for noise cancellation and travel.",
      pros: ["Excellent ANC", "Great sound", "Superb call quality"],
      cons: ["Expensive", "Small buds easy to misplace"],
      praises: ["Silences flights and commutes", "Balanced, detailed audio"],
      complaints: ["Premium price", "Case is a touch bulky"],
      longTerm: "Battery holds up well over a year; firmware updates keep improving them.",
      buy: ["Frequent travellers", "ANC seekers", "Audio quality first"],
      avoid: ["Tight budgets", "Those wanting the smallest case"],
      fake: 9,
      fakeConfidence: 0.71,
      analyzed: 3420,
    },
  },
  {
    slug: "boat-airdopes-progear",
    name: "boAt Airdopes ProGear",
    category: "audio",
    brand: "boat",
    short: "Wallet-friendly earbuds with big battery and punchy bass.",
    description:
      "Affordable TWS earbuds with long battery life, low-latency gaming mode and a bass-forward sound that suits casual listening on a tight budget.",
    specs: { Type: "TWS earbuds", Battery: "10h + 40h case", ANC: "ENx calls", Latency: "Low-latency mode", Waterproof: "IPX5" },
    scores: { ai: 66, performance: 60, battery: 88, value: 92, build: 62 },
    rating: 4.1,
    reviewCount: 8900,
    warrantyMonths: 12,
    releaseDate: "2024-01-05",
    offers: [
      { store: "amazon", price: 1499, mrp: 4990, deliveryDays: 1 },
      { store: "flipkart", price: 1399, mrp: 4990, deliveryDays: 2 },
    ],
    review: {
      summary: "Great value for the price with long battery; audiophiles note the heavy bass and plasticky feel.",
      verdict: "Superb budget pick if you want battery and bass over refinement.",
      pros: ["Very affordable", "Long battery", "Fun bassy sound"],
      cons: ["No real ANC", "Bass-heavy tuning", "Plastic build"],
      praises: ["Lasts for days on a charge", "Loud and punchy"],
      complaints: ["Muddy mids for some", "Fit can be loose"],
      longTerm: "At this price they're near-disposable, but many last a year of daily use.",
      buy: ["Tight budgets", "Bass lovers", "Backup/gym earbuds"],
      avoid: ["Audiophiles", "Serious ANC seekers"],
      fake: 34,
      fakeConfidence: 0.52,
      analyzed: 8900,
    },
  },
  {
    slug: "sony-zv-e10",
    name: "Sony ZV-E10",
    category: "cameras",
    brand: "sony",
    short: "A beginner-friendly mirrorless built for video and vlogging.",
    description:
      "An APS-C mirrorless camera with a flip-out screen, great autofocus and interchangeable lenses — ideal for beginners moving up from a phone, especially for video.",
    specs: { Sensor: "24.2MP APS-C", Video: "4K30 / 1080p120", Screen: "Flip-out touchscreen", AF: "Real-time Eye AF", Mount: "Sony E", Weight: "343 g" },
    scores: { ai: 84, performance: 82, display: 78, camera: 87, value: 82, build: 76 },
    rating: 4.5,
    reviewCount: 1980,
    warrantyMonths: 24,
    releaseDate: "2021-07-30",
    offers: [
      { store: "amazon", price: 65990, mrp: 74990, deliveryDays: 2, cashback: 2000 },
      { store: "flipkart", price: 66499, mrp: 74990, deliveryDays: 3 },
      { store: "croma", price: 67990, mrp: 74990, deliveryDays: 4 },
    ],
    review: {
      summary: "Beginners love the autofocus and flip screen for video; rolling shutter and no viewfinder are the caveats.",
      verdict: "A top first mirrorless for content creators and vloggers.",
      pros: ["Excellent autofocus", "Flip-out screen", "Interchangeable lenses"],
      cons: ["No viewfinder", "Rolling shutter in video", "Kit lens is basic"],
      praises: ["Eye AF just works", "Great for vlogging and video"],
      complaints: ["No EVF for bright sun", "Rolling shutter on fast pans"],
      longTerm: "Lenses carry forward to future bodies, making it a smart entry into the Sony system.",
      buy: ["Beginners upgrading from phones", "Vloggers and creators", "Photo + video hybrids"],
      avoid: ["Sports shooters needing an EVF", "Pros needing full-frame"],
      fake: 12,
      fakeConfidence: 0.65,
      analyzed: 1980,
    },
  },
  {
    slug: "canon-eos-r50",
    name: "Canon EOS R50",
    category: "cameras",
    brand: "canon",
    short: "A tiny, easy mirrorless with a viewfinder and great colours.",
    description:
      "A compact APS-C mirrorless with an electronic viewfinder, beginner-friendly guided UI and Canon's pleasing colour science — a great all-round first camera.",
    specs: { Sensor: "24.2MP APS-C", Video: "4K30 (uncropped)", Screen: "Vari-angle touchscreen", AF: "Dual Pixel CMOS AF II", Mount: "Canon RF", Weight: "375 g" },
    scores: { ai: 83, performance: 80, display: 80, camera: 85, value: 80, build: 78 },
    rating: 4.5,
    reviewCount: 1440,
    warrantyMonths: 24,
    releaseDate: "2023-02-08",
    offers: [
      { store: "amazon", price: 67990, mrp: 74995, deliveryDays: 2 },
      { store: "flipkart", price: 68499, mrp: 74995, deliveryDays: 3 },
      { store: "croma", price: 69990, mrp: 74995, deliveryDays: 4 },
    ],
    review: {
      summary: "Praised for its EVF, colours and guided modes; limited RF-S lenses and single card slot are noted.",
      verdict: "The friendliest first mirrorless if you want a viewfinder.",
      pros: ["Has a viewfinder", "Great colours", "Beginner guided UI"],
      cons: ["Few native RF-S lenses", "Single card slot", "Small grip"],
      praises: ["Colours look great out of camera", "EVF helps in bright light"],
      complaints: ["Lens selection is limited", "Grip is small for big hands"],
      longTerm: "Canon's RF lens lineup keeps growing, improving the upgrade path over time.",
      buy: ["Beginners wanting a viewfinder", "Travel and family photography", "Canon colour fans"],
      avoid: ["Those needing lots of native lenses now", "Dual-slot pros"],
      fake: 10,
      fakeConfidence: 0.67,
      analyzed: 1440,
    },
  },
  {
    slug: "bosch-series-6-front-load-7kg",
    name: "Bosch Series 6 Front Load 7kg",
    category: "appliances",
    brand: "bosch",
    short: "A quiet, efficient front-load washer with excellent wash quality.",
    description:
      "A 7kg front-load washing machine with an efficient inverter motor, anti-vibration design and a wide range of programs — quiet, gentle on clothes and water-efficient.",
    specs: { Capacity: "7 kg", Type: "Front load", "Spin Speed": "1200 RPM", Rating: "5 star", Motor: "Inverter (quiet)", Programs: "15" },
    scores: { ai: 85, performance: 86, value: 80, build: 88 },
    rating: 4.5,
    reviewCount: 2620,
    warrantyMonths: 24,
    releaseDate: "2023-04-12",
    offers: [
      { store: "croma", price: 34990, mrp: 44990, deliveryDays: 4 },
      { store: "reliance-digital", price: 33990, mrp: 44990, deliveryDays: 5 },
      { store: "amazon", price: 34490, mrp: 44990, deliveryDays: 3 },
      { store: "vijay-sales", price: 34990, mrp: 44990, deliveryDays: 4 },
    ],
    review: {
      summary: "Owners praise the quiet operation and wash quality; longer cycle times and price are the trade-offs.",
      verdict: "One of the best 7kg front loaders for wash quality and reliability.",
      pros: ["Very quiet", "Excellent wash quality", "Water efficient"],
      cons: ["Longer cycles", "Premium price", "No Wi-Fi"],
      praises: ["Barely hear it running", "Clothes come out genuinely clean"],
      complaints: ["Cycles take a while", "Costs more than rivals"],
      longTerm: "Bosch reliability is a highlight; owners report years of trouble-free use.",
      buy: ["Families wanting quiet washes", "Reliability seekers", "Apartments"],
      avoid: ["Those needing the fastest cycles", "Rock-bottom budgets"],
      fake: 16,
      fakeConfidence: 0.55,
      analyzed: 2620,
    },
  },
  {
    slug: "apple-ipad-10th-gen",
    name: "Apple iPad (10th gen)",
    category: "tablets",
    brand: "apple",
    short: "A colourful, capable everyday tablet for media, notes and light work.",
    description:
      "The 10th-gen iPad brings a 10.9\" Liquid Retina display, USB-C and the A14 chip — a versatile tablet for streaming, browsing, notes and casual creativity.",
    specs: { Display: "10.9\" Liquid Retina", Chip: "A14 Bionic", Storage: "64GB", Battery: "Up to 10 hours", Ports: "USB-C", OS: "iPadOS" },
    scores: { ai: 82, performance: 80, battery: 85, display: 82, value: 78, build: 88 },
    rating: 4.5,
    reviewCount: 3050,
    warrantyMonths: 12,
    releaseDate: "2022-10-26",
    offers: [
      { store: "apple", price: 34900, mrp: 39900, deliveryDays: 2, official: true },
      { store: "amazon", price: 30990, mrp: 39900, deliveryDays: 1, cashback: 1500 },
      { store: "flipkart", price: 31499, mrp: 39900, deliveryDays: 2 },
    ],
    review: {
      summary: "Loved for the screen and battery; 64GB base storage and first-gen Pencil support are the niggles.",
      verdict: "The everyday iPad most people should buy for media and notes.",
      pros: ["Great display", "Long battery", "USB-C"],
      cons: ["64GB base", "Awkward Pencil support", "No laminated screen"],
      praises: ["Perfect for streaming and reading", "Battery easily lasts the day"],
      complaints: ["64GB fills quickly", "Pencil pairing is clunky"],
      longTerm: "iPads get long software support; this stays useful for years as a media tablet.",
      buy: ["Media and browsing", "Students taking notes", "Casual creativity"],
      avoid: ["Pro creative workloads", "Those needing lots of storage"],
      fake: 12,
      fakeConfidence: 0.63,
      analyzed: 3050,
    },
  },
  {
    slug: "apple-watch-se-2",
    name: "Apple Watch SE (2nd gen)",
    category: "wearables",
    brand: "apple",
    short: "The best-value Apple Watch for fitness, notifications and safety.",
    description:
      "Apple Watch SE covers the essentials — accurate fitness and heart tracking, notifications, crash and fall detection — at the most accessible price in the lineup.",
    specs: { Display: "Retina OLED", Sizes: "40/44mm", Battery: "Up to 18 hours", Sensors: "Heart rate, accelerometer", GPS: "Yes", OS: "watchOS" },
    scores: { ai: 83, performance: 82, battery: 70, display: 80, value: 86, build: 85 },
    rating: 4.6,
    reviewCount: 4110,
    warrantyMonths: 12,
    releaseDate: "2022-09-16",
    offers: [
      { store: "apple", price: 29900, mrp: 29900, deliveryDays: 2, official: true },
      { store: "amazon", price: 26999, mrp: 29900, deliveryDays: 1, cashback: 1000 },
      { store: "flipkart", price: 27499, mrp: 29900, deliveryDays: 2 },
    ],
    review: {
      summary: "Owners love the value and fitness features; the daily charging and no always-on display are noted.",
      verdict: "The Apple Watch to buy unless you need the always-on display.",
      pros: ["Great value", "Accurate fitness tracking", "Safety features"],
      cons: ["No always-on display", "Daily charging", "No blood oxygen"],
      praises: ["Nails the essentials", "Seamless with iPhone"],
      complaints: ["Needs charging daily", "Misses always-on screen"],
      longTerm: "watchOS updates keep it current for years; battery holds up with daily charging.",
      buy: ["First-time smartwatch buyers", "Fitness and notifications", "iPhone owners on a budget"],
      avoid: ["Always-on display seekers", "Multi-day battery fans"],
      fake: 11,
      fakeConfidence: 0.64,
      analyzed: 4110,
    },
  },
];
