# B2B Wholesale Platform

A modern, enterprise-grade wholesale ordering platform built with Next.js, React, and Tailwind CSS.

## Features

### For Customers
- **Product Catalog** - Browse 2,500+ products across multiple categories
- **Smart Search & Filtering** - Filter by category and search products
- **Tiered Wholesale Pricing** - Volume-based discounts applied automatically
- **Shopping Cart** - Add products with custom quantities
- **Order Management** - Track your orders and history
- **Responsive Design** - Works seamlessly on desktop and mobile

### For Administrators
- **Dashboard** - View key business metrics at a glance
- **Product Management** - Add, edit, and manage inventory
- **Order Management** - Track all customer orders and statuses
- **Customer Management** - Monitor customer accounts and spending
- **Analytics** - Real-time insights into business performance

## Getting Started

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd my-project
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── page.tsx              # Landing page
│   ├── layout.tsx            # Root layout
│   ├── products/
│   │   └── page.tsx          # Product catalog
│   ├── cart/
│   │   └── page.tsx          # Shopping cart
│   ├── about/
│   │   └── page.tsx          # About page
│   ├── admin/
│   │   ├── layout.tsx        # Admin sidebar layout
│   │   ├── page.tsx          # Admin dashboard
│   │   ├── products/
│   │   ├── orders/
│   │   └── customers/
│   └── globals.css           # Global styles
├── components/
│   ├── header.tsx            # Navigation header
│   ├── product-card.tsx      # Product card component
│   └── ui/                   # shadcn/ui components
├── lib/
│   ├── mock-data.ts          # Mock product data
│   ├── cart-context.tsx      # Shopping cart state management
│   └── utils.ts              # Utility functions
└── public/                   # Static assets
```

## Key Features Explained

### Wholesale Pricing
Products have tiered pricing that automatically adjusts based on order quantity:
```
Premium Office Chair:
- 1-9 units: $250
- 10-49 units: $200
- 50-99 units: $175
- 100+ units: $150
```

### Cart Management
The shopping cart is managed through React Context and persisted in localStorage:
- Add products with automatic price calculation
- Update quantities with real-time pricing
- Remove items from cart
- View order summary with total

### Admin Dashboard
Comprehensive admin panel with:
- Real-time business metrics
- Product inventory tracking
- Order status management
- Customer relationship insights

## Technologies Used

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality UI components
- **Lucide React** - Icon library
- **TypeScript** - Type safety
- **Context API** - State management

## Features to Add (Future Enhancement)

- Database integration (Supabase/Neon)
- User authentication & authorization
- Payment processing (Stripe)
- Email notifications
- Advanced analytics
- Bulk pricing negotiations
- RFQ (Request for Quote) system
- Multi-warehouse inventory
- API integration for ERP systems

## Development

### Build for Production
```bash
npm run build
npm start
```

### Code Quality
```bash
npm run lint
```

## Color Scheme

The application uses a professional blue color scheme with:
- **Primary Color**: Professional blue for main actions and highlights
- **Secondary Color**: Light blue for backgrounds and hover states
- **Accent Color**: Darker blue for emphasis
- **Neutral Colors**: White, grays for text and backgrounds

## Responsive Design

The platform is fully responsive and optimized for:
- Mobile devices (320px+)
- Tablets (768px+)
- Desktops (1024px+)

## Notes

- This is a mock implementation with simulated data
- Cart data persists in localStorage (client-side only)
- Ready for backend integration with databases and APIs
- All components follow accessibility best practices

## License

MIT
