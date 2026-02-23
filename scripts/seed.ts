import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { categories, products, wholesalePrices, users } from '../lib/db/schema';

async function seed() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set. Please create a .env.local file.');
  }

  const sql = neon(process.env.DATABASE_URL);
  const db = drizzle(sql);

  console.log('🌱 Seeding database...\n');

  // ── Seed Categories ──────────────────────────────────────────────────────

  console.log('📁 Inserting categories...');
  const categoryData = [
    { name: 'Coques & Étuis', slug: 'coques-etuis' },
    { name: 'Chargeurs', slug: 'chargeurs' },
    { name: 'Câbles', slug: 'cables' },
    { name: 'Protections Écran', slug: 'protections-ecran' },
    { name: 'Audio', slug: 'audio' },
    { name: 'Supports', slug: 'supports' },
    { name: 'Batteries', slug: 'batteries' },
  ];

  const insertedCategories = await db
    .insert(categories)
    .values(categoryData)
    .returning();

  const categoryMap = new Map(insertedCategories.map((c) => [c.name, c.id]));
  console.log(`  ✅ ${insertedCategories.length} categories inserted\n`);

  // ── Seed Products ────────────────────────────────────────────────────────

  console.log('📦 Inserting products...');
  const productData = [
    {
      name: 'Coque iPhone 15 Pro Max Silicone Premium',
      slug: 'coque-iphone-15-pro-max-silicone-premium',
      categoryId: categoryMap.get('Coques & Étuis')!,
      description:
        'Coque en silicone souple avec revêtement microfibre intérieur. Protection anti-choc certifiée MIL-STD-810G. Disponible en 12 coloris tendance.',
      image:
        'https://images.unsplash.com/photo-1601593346740-925612772716?w=600&h=600&fit=crop',
      basePrice: '8.50',
      stock: 5000,
      minOrder: 20,
      badge: 'Best-seller',
      tiers: [
        { quantity: 50, price: '6.80' },
        { quantity: 200, price: '5.50' },
        { quantity: 500, price: '4.20' },
      ],
    },
    {
      name: 'Chargeur Rapide USB-C 65W GaN',
      slug: 'chargeur-rapide-usb-c-65w-gan',
      categoryId: categoryMap.get('Chargeurs')!,
      description:
        'Chargeur compact GaN 65W avec technologie de charge rapide PD 3.0. Compatible iPhone, Samsung, MacBook. Design ultra-compact et pliable.',
      image:
        'https://images.unsplash.com/photo-1610792516307-ea5acd9c3b00?w=600&h=600&fit=crop',
      basePrice: '15.00',
      stock: 3000,
      minOrder: 10,
      badge: 'Nouveau',
      tiers: [
        { quantity: 30, price: '12.00' },
        { quantity: 100, price: '9.50' },
        { quantity: 300, price: '7.80' },
      ],
    },
    {
      name: 'Câble Lightning Tressé Nylon 2m',
      slug: 'cable-lightning-tresse-nylon-2m',
      categoryId: categoryMap.get('Câbles')!,
      description:
        'Câble Lightning vers USB-C en nylon tressé haute résistance. Charge rapide 20W et synchronisation de données. Certifié MFi.',
      image:
        'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&h=600&fit=crop',
      basePrice: '5.50',
      stock: 10000,
      minOrder: 25,
      badge: null,
      tiers: [
        { quantity: 50, price: '4.20' },
        { quantity: 200, price: '3.30' },
        { quantity: 1000, price: '2.50' },
      ],
    },
    {
      name: 'Protection Écran Verre Trempé Samsung S24',
      slug: 'protection-ecran-verre-trempe-samsung-s24',
      categoryId: categoryMap.get('Protections Écran')!,
      description:
        'Verre trempé 9H anti-rayures avec application facile par cadre guide. Traitement oléophobe anti-traces. Lot de 3 pièces.',
      image:
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop',
      basePrice: '4.00',
      stock: 15000,
      minOrder: 50,
      badge: 'Volume',
      tiers: [
        { quantity: 100, price: '3.00' },
        { quantity: 500, price: '2.20' },
        { quantity: 2000, price: '1.60' },
      ],
    },
    {
      name: 'Écouteurs Bluetooth TWS Pro',
      slug: 'ecouteurs-bluetooth-tws-pro',
      categoryId: categoryMap.get('Audio')!,
      description:
        'Écouteurs sans fil avec réduction de bruit active ANC. Autonomie 8h + 32h boîtier. Bluetooth 5.3, codec AAC/SBC. Résistance IPX5.',
      image:
        'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=600&h=600&fit=crop',
      basePrice: '22.00',
      stock: 2000,
      minOrder: 10,
      badge: 'Populaire',
      tiers: [
        { quantity: 20, price: '17.50' },
        { quantity: 100, price: '14.00' },
        { quantity: 300, price: '11.50' },
      ],
    },
    {
      name: 'Support Voiture Magnétique MagSafe',
      slug: 'support-voiture-magnetique-magsafe',
      categoryId: categoryMap.get('Supports')!,
      description:
        'Support voiture magnétique compatible MagSafe avec fixation aération. Rotation 360°, aimants N52 ultra-puissants. Installation sans outils.',
      image:
        'https://images.unsplash.com/photo-1544441893-675973e31985?w=600&h=600&fit=crop',
      basePrice: '9.00',
      stock: 4000,
      minOrder: 15,
      badge: null,
      tiers: [
        { quantity: 30, price: '7.20' },
        { quantity: 100, price: '5.80' },
        { quantity: 500, price: '4.50' },
      ],
    },
    {
      name: 'Power Bank 20000mAh Charge Rapide',
      slug: 'power-bank-20000mah-charge-rapide',
      categoryId: categoryMap.get('Batteries')!,
      description:
        'Batterie externe 20000mAh avec charge rapide 22.5W. Double sortie USB-C + USB-A. Affichage LED du niveau de charge. Design fin et élégant.',
      image:
        'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&h=600&fit=crop',
      basePrice: '18.00',
      stock: 0,
      minOrder: 10,
      badge: null,
      tiers: [
        { quantity: 20, price: '14.50' },
        { quantity: 80, price: '12.00' },
        { quantity: 200, price: '9.80' },
      ],
    },
    {
      name: 'Coque Samsung Galaxy S24 Ultra Transparente',
      slug: 'coque-samsung-galaxy-s24-ultra-transparente',
      categoryId: categoryMap.get('Coques & Étuis')!,
      description:
        'Coque transparente anti-jaunissement avec protection coin renforcé. Technologie Air Cushion anti-choc. Ultra-fine 1.2mm.',
      image:
        'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&h=600&fit=crop',
      basePrice: '6.00',
      stock: 8000,
      minOrder: 25,
      badge: null,
      tiers: [
        { quantity: 50, price: '4.50' },
        { quantity: 200, price: '3.50' },
        { quantity: 1000, price: '2.50' },
      ],
    },
    {
      name: 'Chargeur Sans Fil Qi2 15W',
      slug: 'chargeur-sans-fil-qi2-15w',
      categoryId: categoryMap.get('Chargeurs')!,
      description:
        'Pad de charge sans fil Qi2 15W avec ventilateur intégré. Compatible MagSafe, base antidérapante. Indicateur LED de charge.',
      image:
        'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=600&fit=crop',
      basePrice: '12.00',
      stock: 3500,
      minOrder: 15,
      badge: 'Tendance',
      tiers: [
        { quantity: 30, price: '9.50' },
        { quantity: 100, price: '7.80' },
        { quantity: 500, price: '6.00' },
      ],
    },
    {
      name: 'Câble USB-C vers USB-C 100W 2m',
      slug: 'cable-usb-c-vers-usb-c-100w-2m',
      categoryId: categoryMap.get('Câbles')!,
      description:
        'Câble USB-C 100W en nylon tressé avec connecteurs renforcés. Transfert données 480Mbps. Compatible charge rapide PD/QC.',
      image:
        'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=600&fit=crop',
      basePrice: '4.50',
      stock: 12000,
      minOrder: 30,
      badge: null,
      tiers: [
        { quantity: 50, price: '3.50' },
        { quantity: 200, price: '2.80' },
        { quantity: 1000, price: '2.00' },
      ],
    },
    {
      name: 'Support Bureau Téléphone Ajustable',
      slug: 'support-bureau-telephone-ajustable',
      categoryId: categoryMap.get('Supports')!,
      description:
        'Support de bureau en aluminium CNC avec angle ajustable 0-45°. Base antidérapante en silicone. Compatible 4.7" à 13" pouces.',
      image:
        'https://images.unsplash.com/photo-1586105449897-20b5efeb3233?w=600&h=600&fit=crop',
      basePrice: '7.50',
      stock: 6000,
      minOrder: 15,
      badge: null,
      tiers: [
        { quantity: 30, price: '5.80' },
        { quantity: 100, price: '4.50' },
        { quantity: 500, price: '3.50' },
      ],
    },
    {
      name: 'Film Hydrogel Universel Découpable',
      slug: 'film-hydrogel-universel-decoupable',
      categoryId: categoryMap.get('Protections Écran')!,
      description:
        'Film hydrogel auto-cicatrisant découpable. Compatible tous modèles via machine de découpe. Lot de 50 films. Transparence 99.9%.',
      image:
        'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&h=600&fit=crop',
      basePrice: '35.00',
      stock: 0,
      minOrder: 5,
      badge: 'Pro',
      tiers: [
        { quantity: 10, price: '28.00' },
        { quantity: 50, price: '22.00' },
        { quantity: 200, price: '18.00' },
      ],
    },
  ];

  for (const product of productData) {
    const { tiers, ...productFields } = product;

    const [insertedProduct] = await db
      .insert(products)
      .values(productFields)
      .returning();

    if (tiers.length > 0) {
      await db.insert(wholesalePrices).values(
        tiers.map((tier) => ({
          productId: insertedProduct.id,
          quantity: tier.quantity,
          price: tier.price,
        }))
      );
    }

    console.log(`  ✅ ${insertedProduct.name}`);
  }
  console.log(`\n  📦 ${productData.length} products inserted\n`);

  // ── Seed Demo User ───────────────────────────────────────────────────────

  console.log('👤 Inserting demo user...');
  const [demoUser] = await db
    .insert(users)
    .values({
      name: 'Rochdi Demo',
      email: 'demo@wholesale-platform.com',
      company: 'Demo Company',
      role: 'admin',
    })
    .returning();

  console.log(`  ✅ Demo user created: ${demoUser.email}\n`);

  console.log('🎉 Seeding complete!\n');
  process.exit(0);
}

seed().catch((error) => {
  console.error('❌ Seeding failed:', error);
  process.exit(1);
});
