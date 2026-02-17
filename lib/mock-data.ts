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
    name: 'Chaise de Bureau Premium',
    category: 'Mobilier',
    description: 'Chaise de bureau ergonomique avec support lombaire',
    image: 'https://images.unsplash.com/photo-1563769132-7cebb319f0d8?w=500&h=500&fit=crop',
    basePrice: 250,
    wholesalePrices: [
      { quantity: 10, price: 200 },
      { quantity: 50, price: 175 },
      { quantity: 100, price: 150 },
    ],
    stock: 500,
    minOrder: 5,
  },
  {
    id: '2',
    name: 'Lampe LED de Bureau',
    category: 'Éclairage',
    description: 'Lampe de bureau LED réglable avec chargement USB',
    image: 'https://images.unsplash.com/photo-1565636192335-14375bc22cef?w=500&h=500&fit=crop',
    basePrice: 45,
    wholesalePrices: [
      { quantity: 20, price: 35 },
      { quantity: 100, price: 28 },
      { quantity: 500, price: 22 },
    ],
    stock: 1000,
    minOrder: 10,
  },
  {
    id: '3',
    name: 'Clavier et Souris sans Fil',
    category: 'Technologie',
    description: 'Ensemble complet clavier sans fil avec souris',
    image: 'https://images.unsplash.com/photo-1587829191301-db59d26e6c94?w=500&h=500&fit=crop',
    basePrice: 75,
    wholesalePrices: [
      { quantity: 15, price: 60 },
      { quantity: 50, price: 50 },
      { quantity: 200, price: 40 },
    ],
    stock: 800,
    minOrder: 5,
  },
  {
    id: '4',
    name: 'Bureau Assis-Debout Électrique',
    category: 'Mobilier',
    description: 'Cadre de bureau électrique réglable en hauteur',
    image: 'https://images.unsplash.com/photo-1534161456212-d4c3b4840f0d?w=500&h=500&fit=crop',
    basePrice: 400,
    wholesalePrices: [
      { quantity: 5, price: 350 },
      { quantity: 20, price: 300 },
      { quantity: 50, price: 250 },
    ],
    stock: 300,
    minOrder: 2,
  },
  {
    id: '5',
    name: 'Support Bras Double Écran',
    category: 'Accessoires',
    description: 'Support double écran articulé avec articulation complète',
    image: 'https://images.unsplash.com/photo-1593642632505-fc3e9f88e20b?w=500&h=500&fit=crop',
    basePrice: 80,
    wholesalePrices: [
      { quantity: 20, price: 65 },
      { quantity: 100, price: 55 },
      { quantity: 300, price: 45 },
    ],
    stock: 600,
    minOrder: 5,
  },
  {
    id: '6',
    name: 'Clavier Mécanique Ergonomique',
    category: 'Technologie',
    description: 'Clavier mécanique ergonomique divisé',
    image: 'https://images.unsplash.com/photo-1595225476942-cebab75a1dfe?w=500&h=500&fit=crop',
    basePrice: 120,
    wholesalePrices: [
      { quantity: 10, price: 95 },
      { quantity: 50, price: 80 },
      { quantity: 150, price: 65 },
    ],
    stock: 400,
    minOrder: 5,
  },
  {
    id: '7',
    name: 'Tapis de Souris Professionnel',
    category: 'Accessoires',
    description: 'Grand tapis de souris avec surface de friction optimale',
    image: 'https://images.unsplash.com/photo-1587829191301-db59d26e6c94?w=500&h=500&fit=crop',
    basePrice: 35,
    wholesalePrices: [
      { quantity: 30, price: 25 },
      { quantity: 100, price: 20 },
      { quantity: 500, price: 15 },
    ],
    stock: 0,
    minOrder: 10,
  },
  {
    id: '8',
    name: 'Chaise Gamer Ergonomique',
    category: 'Mobilier',
    description: 'Chaise gamer premium avec support complet du corps',
    image: 'https://images.unsplash.com/photo-1563769132-7cebb319f0d8?w=500&h=500&fit=crop',
    basePrice: 280,
    wholesalePrices: [
      { quantity: 5, price: 240 },
      { quantity: 15, price: 200 },
      { quantity: 30, price: 180 },
    ],
    stock: 0,
    minOrder: 3,
  },
];

export const CATEGORIES = ['Tous', 'Mobilier', 'Technologie', 'Éclairage', 'Accessoires'];

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
