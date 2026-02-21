export const FALLBACK_IMAGE = '/fallback-product.svg';

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  basePrice: number;
  wholesalePrices: {
    quantity: number;
    price: number;
  }[];
  stock: number;
  minOrder: number;
  badge?: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  company: string;
  role: 'customer' | 'admin';
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Coque iPhone 15 Pro Max Silicone Premium',
    category: 'Coques & Étuis',
    description: 'Coque en silicone souple avec revêtement microfibre intérieur. Protection anti-choc certifiée MIL-STD-810G. Disponible en 12 coloris tendance.',
    image: 'https://images.unsplash.com/photo-1601593346740-925612772716?w=600&h=600&fit=crop',
    basePrice: 8.50,
    wholesalePrices: [
      { quantity: 50, price: 6.80 },
      { quantity: 200, price: 5.50 },
      { quantity: 500, price: 4.20 },
    ],
    stock: 5000,
    minOrder: 20,
    badge: 'Best-seller',
  },
  {
    id: '2',
    name: 'Chargeur Rapide USB-C 65W GaN',
    category: 'Chargeurs',
    description: 'Chargeur compact GaN 65W avec technologie de charge rapide PD 3.0. Compatible iPhone, Samsung, MacBook. Design ultra-compact et pliable.',
    image: 'https://images.unsplash.com/photo-1610792516307-ea5acd9c3b00?w=600&h=600&fit=crop',
    basePrice: 15.00,
    wholesalePrices: [
      { quantity: 30, price: 12.00 },
      { quantity: 100, price: 9.50 },
      { quantity: 300, price: 7.80 },
    ],
    stock: 3000,
    minOrder: 10,
    badge: 'Nouveau',
  },
  {
    id: '3',
    name: 'Câble Lightning Tressé Nylon 2m',
    category: 'Câbles',
    description: 'Câble Lightning vers USB-C en nylon tressé haute résistance. Charge rapide 20W et synchronisation de données. Certifié MFi.',
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&h=600&fit=crop',
    basePrice: 5.50,
    wholesalePrices: [
      { quantity: 50, price: 4.20 },
      { quantity: 200, price: 3.30 },
      { quantity: 1000, price: 2.50 },
    ],
    stock: 10000,
    minOrder: 25,
  },
  {
    id: '4',
    name: 'Protection Écran Verre Trempé Samsung S24',
    category: 'Protections Écran',
    description: 'Verre trempé 9H anti-rayures avec application facile par cadre guide. Traitement oléophobe anti-traces. Lot de 3 pièces.',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop',
    basePrice: 4.00,
    wholesalePrices: [
      { quantity: 100, price: 3.00 },
      { quantity: 500, price: 2.20 },
      { quantity: 2000, price: 1.60 },
    ],
    stock: 15000,
    minOrder: 50,
    badge: 'Volume',
  },
  {
    id: '5',
    name: 'Écouteurs Bluetooth TWS Pro',
    category: 'Audio',
    description: 'Écouteurs sans fil avec réduction de bruit active ANC. Autonomie 8h + 32h boîtier. Bluetooth 5.3, codec AAC/SBC. Résistance IPX5.',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=600&h=600&fit=crop',
    basePrice: 22.00,
    wholesalePrices: [
      { quantity: 20, price: 17.50 },
      { quantity: 100, price: 14.00 },
      { quantity: 300, price: 11.50 },
    ],
    stock: 2000,
    minOrder: 10,
    badge: 'Populaire',
  },
  {
    id: '6',
    name: 'Support Voiture Magnétique MagSafe',
    category: 'Supports',
    description: 'Support voiture magnétique compatible MagSafe avec fixation aération. Rotation 360°, aimants N52 ultra-puissants. Installation sans outils.',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=600&h=600&fit=crop',
    basePrice: 9.00,
    wholesalePrices: [
      { quantity: 30, price: 7.20 },
      { quantity: 100, price: 5.80 },
      { quantity: 500, price: 4.50 },
    ],
    stock: 4000,
    minOrder: 15,
  },
  {
    id: '7',
    name: 'Power Bank 20000mAh Charge Rapide',
    category: 'Batteries',
    description: 'Batterie externe 20000mAh avec charge rapide 22.5W. Double sortie USB-C + USB-A. Affichage LED du niveau de charge. Design fin et élégant.',
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&h=600&fit=crop',
    basePrice: 18.00,
    wholesalePrices: [
      { quantity: 20, price: 14.50 },
      { quantity: 80, price: 12.00 },
      { quantity: 200, price: 9.80 },
    ],
    stock: 0,
    minOrder: 10,
  },
  {
    id: '8',
    name: 'Coque Samsung Galaxy S24 Ultra Transparente',
    category: 'Coques & Étuis',
    description: 'Coque transparente anti-jaunissement avec protection coin renforcé. Technologie Air Cushion anti-choc. Ultra-fine 1.2mm.',
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&h=600&fit=crop',
    basePrice: 6.00,
    wholesalePrices: [
      { quantity: 50, price: 4.50 },
      { quantity: 200, price: 3.50 },
      { quantity: 1000, price: 2.50 },
    ],
    stock: 8000,
    minOrder: 25,
  },
  {
    id: '9',
    name: 'Chargeur Sans Fil Qi2 15W',
    category: 'Chargeurs',
    description: 'Pad de charge sans fil Qi2 15W avec ventilateur intégré. Compatible MagSafe, base antidérapante. Indicateur LED de charge.',
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=600&fit=crop',
    basePrice: 12.00,
    wholesalePrices: [
      { quantity: 30, price: 9.50 },
      { quantity: 100, price: 7.80 },
      { quantity: 500, price: 6.00 },
    ],
    stock: 3500,
    minOrder: 15,
    badge: 'Tendance',
  },
  {
    id: '10',
    name: 'Câble USB-C vers USB-C 100W 2m',
    category: 'Câbles',
    description: 'Câble USB-C 100W en nylon tressé avec connecteurs renforcés. Transfert données 480Mbps. Compatible charge rapide PD/QC.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=600&fit=crop',
    basePrice: 4.50,
    wholesalePrices: [
      { quantity: 50, price: 3.50 },
      { quantity: 200, price: 2.80 },
      { quantity: 1000, price: 2.00 },
    ],
    stock: 12000,
    minOrder: 30,
  },
  {
    id: '11',
    name: 'Support Bureau Téléphone Ajustable',
    category: 'Supports',
    description: 'Support de bureau en aluminium CNC avec angle ajustable 0-45°. Base antidérapante en silicone. Compatible 4.7" à 13" pouces.',
    image: 'https://images.unsplash.com/photo-1586105449897-20b5efeb3233?w=600&h=600&fit=crop',
    basePrice: 7.50,
    wholesalePrices: [
      { quantity: 30, price: 5.80 },
      { quantity: 100, price: 4.50 },
      { quantity: 500, price: 3.50 },
    ],
    stock: 6000,
    minOrder: 15,
  },
  {
    id: '12',
    name: 'Film Hydrogel Universel Découpable',
    category: 'Protections Écran',
    description: 'Film hydrogel auto-cicatrisant découpable. Compatible tous modèles via machine de découpe. Lot de 50 films. Transparence 99.9%.',
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&h=600&fit=crop',
    basePrice: 35.00,
    wholesalePrices: [
      { quantity: 10, price: 28.00 },
      { quantity: 50, price: 22.00 },
      { quantity: 200, price: 18.00 },
    ],
    stock: 0,
    minOrder: 5,
    badge: 'Pro',
  },
];

export const CATEGORIES = [
  'Tous',
  'Coques & Étuis',
  'Chargeurs',
  'Câbles',
  'Protections Écran',
  'Audio',
  'Supports',
  'Batteries',
];

export const getWholesalePrice = (product: Product, quantity: number): number => {
  let price = product.basePrice;

  for (let i = product.wholesalePrices.length - 1; i >= 0; i--) {
    if (quantity >= product.wholesalePrices[i].quantity) {
      price = product.wholesalePrices[i].price;
      break;
    }
  }

  return price;
};
