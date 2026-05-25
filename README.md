# Akotro - Eco-Friendly E-Commerce Platform

A modern, full-stack e-commerce application built with Next.js, MongoDB, and Razorpay for sustainable eco-friendly products.

## 🚀 Features

### User Features
- ✅ Browse products by category
- ✅ Product search and filtering
- ✅ Shopping cart management
- ✅ Secure checkout with Razorpay integration
- ✅ Order history and tracking
- ✅ Responsive design optimized for mobile and desktop

### Admin Features
- ✅ Admin dashboard with authentication
- ✅ Add, edit, and delete products
- ✅ Manage product categories
- ✅ Track inventory/stock
- ✅ View orders and sales

### Technical Features
- ✅ Next.js 15+ with App Router
- ✅ TypeScript for type safety
- ✅ MongoDB Atlas for database
- ✅ Razorpay payment gateway integration
- ✅ Tailwind CSS for styling
- ✅ Fully responsive design
- ✅ Vercel deployment ready
- ✅ Wix iframe embedding compatible

## 📋 Tech Stack

- **Frontend**: Next.js (React), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB Atlas
- **Payments**: Razorpay
- **Hosting**: Vercel
- **Authentication**: Simple password-based (admin)

## 🛠️ Installation & Setup

### 1. Prerequisites
- Node.js 16+ installed
- npm or yarn package manager
- MongoDB Atlas account
- Razorpay account

### 2. Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```env
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id

# Admin
ADMIN_PASSWORD=admin123
NEXT_PUBLIC_ADMIN_PASSWORD=admin123

# API
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
akotro/
├── app/
│   ├── components/        # Reusable UI components
│   ├── api/              # API routes
│   ├── admin/            # Admin pages
│   ├── shop/             # Shop page
│   ├── product/          # Product detail page
│   ├── cart/             # Shopping cart
│   ├── checkout/         # Checkout & payment
│   ├── page.tsx          # Homepage
│   └── layout.tsx        # App layout
├── models/               # MongoDB schemas
├── lib/                  # Utilities
├── public/               # Static assets
├── .env.local            # Environment variables
└── package.json
```

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables
5. Deploy

## 🔗 Embedding in Wix

To embed this app in a Wix website using an iframe:

```html
<iframe 
  src="https://your-vercel-app.vercel.app" 
  width="100%" 
  height="800" 
  frameborder="0"
  allow="payment"
></iframe>
```

## 📄 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/[id]` - Get product by ID
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/[id]` - Update product (admin only)
- `DELETE /api/products/[id]` - Delete product (admin only)

### Orders
- `POST /api/orders` - Create order
- `POST /api/orders/verify` - Verify Razorpay payment

## 🔐 Admin Panel

Access at `/admin/login`

**Default credentials:**
- Password: `admin123`

## 💳 Payment Integration

Razorpay supported methods:
- Credit/Debit Cards
- UPI
- Digital Wallets
- Net Banking
- BNPL

## 📱 Responsive Design

Fully optimized for mobile, tablet, and desktop.

## 🎨 Design Features

- Modern yellow and red color scheme
- Clean, minimalist design
- High-quality product images
- Smooth animations
- Accessible UI

---

**Built with ❤️ for sustainability**
