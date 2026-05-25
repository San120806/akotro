# Akotro E-Commerce App - Quick Start Guide

## 🎯 Project Overview

Your Akotro e-commerce app has been successfully created! It's a full-stack application featuring:
- Beautiful, responsive homepage matching your Figma design
- Product browsing and shopping cart
- Secure checkout with Razorpay payments
- Admin panel for managing products
- MongoDB database integration
- Ready to deploy on Vercel
- Embeddable in Wix via iframe

## 📁 What's Been Built

### Frontend Pages
- **Homepage** (`/`) - Main landing page with hero, products, stats, testimonials
- **Shop** (`/shop`) - Browse all products with filtering
- **Product Detail** (`/product/[id]`) - Individual product page
- **Cart** (`/cart`) - Shopping cart management
- **Checkout** (`/checkout`) - Order placement with Razorpay payment

### Admin Panel
- **Admin Login** (`/admin/login`) - Password-protected login
- **Product Management** (`/admin/products`) - CRUD operations for products

### API Endpoints
- `GET/POST /api/products` - Get all products / Create new product
- `GET/PUT/DELETE /api/products/[id]` - Individual product operations
- `POST /api/orders` - Create order
- `POST /api/orders/verify` - Verify Razorpay payment

## 🚀 Getting Started

### Step 1: Configure Environment Variables

Update `.env.local` with your credentials:

```env
# MongoDB Atlas (https://www.mongodb.com/cloud/atlas)
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/akotro

# Razorpay (https://razorpay.com)
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxx
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx

# Admin (change this to something secure)
ADMIN_PASSWORD=admin123
NEXT_PUBLIC_ADMIN_PASSWORD=admin123

# API
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Step 2: Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Step 3: Test the App

#### User Flow
1. Go to homepage
2. Click on a product or visit `/shop`
3. Add products to cart
4. Go to `/cart` to review items
5. Click "Proceed to Checkout"
6. Fill shipping details
7. Complete payment with test Razorpay credentials

#### Admin Panel
1. Go to `/admin/login`
2. Enter password: `admin123`
3. Add/edit/delete products
4. Products will appear on homepage

## 🔐 Admin Credentials

**Default Password:** `admin123`

⚠️ **Before Deployment:** Change this to a secure password!

## 🎨 Customize Your App

### Colors & Branding
- **Hero Section**: Edit [app/components/HeroSection.tsx](app/components/HeroSection.tsx)
- **Color scheme**: Yellow (#FBBF24) and Red (#DC2626)
- **Logo**: Update in [app/components/Header.tsx](app/components/Header.tsx)

### Product Categories
Available categories:
- `pencils`
- `pens`
- `erasers`
- `accessories`

Add more in [app/admin/products/page.tsx](app/admin/products/page.tsx)

### Content Updates
- Homepage text: Edit component files in `app/components/`
- Product descriptions: Add via admin panel
- Navigation links: Update `app/components/Header.tsx`

## 🗄️ Database Setup

### MongoDB Atlas Setup
1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Create database user
4. Get connection string
5. Paste in `.env.local` as `MONGODB_URI`

### Test Data
Add test products via admin panel:
- Name: "Eco-Friendly Pencil"
- Price: 50
- Category: "pencils"
- Stock: 100
- Image: URL to product image

## 💳 Razorpay Setup

### Get Test Credentials
1. Sign up at [razorpay.com](https://razorpay.com)
2. Go to Settings → API Keys
3. Copy Key ID and Key Secret (Test mode)
4. Add to `.env.local`

### Test Payments
Use these test card numbers:
- **Visa**: 4111 1111 1111 1111
- **Mastercard**: 5555 5555 5555 4444
- **Expiry**: Any future date
- **CVV**: Any 3 digits

## 🌐 Deploy to Vercel

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/akotro
git push -u origin main
```

### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select your GitHub repository
4. Add environment variables:
   - `MONGODB_URI`
   - `RAZORPAY_KEY_ID`
   - `RAZORPAY_KEY_SECRET`
   - `NEXT_PUBLIC_RAZORPAY_KEY_ID`
   - `ADMIN_PASSWORD`
   - `NEXT_PUBLIC_ADMIN_PASSWORD`
5. Click "Deploy"

Your app will be live at: `https://akotro.vercel.app`

## 📱 Embed in Wix

### Add to Your Wix Site
1. In Wix Editor, add an "Embed" element
2. Choose "Embed a Custom Element"
3. Paste this code:

```html
<iframe 
  src="https://your-vercel-app-url.vercel.app" 
  width="100%" 
  height="800" 
  frameborder="0"
  allow="payment"
  style="border: none;"
></iframe>
```

4. Adjust height as needed
5. Publish your site

## 📊 Project Structure

```
akotro/
├── app/
│   ├── components/       # Reusable UI components
│   ├── api/             # Backend API routes
│   ├── admin/           # Admin pages
│   ├── shop/            # Shop page
│   ├── product/         # Product detail
│   ├── cart/            # Shopping cart
│   ├── checkout/        # Checkout page
│   └── page.tsx         # Homepage
├── models/              # MongoDB schemas
├── lib/                 # Utilities
├── public/              # Static files
├── .env.local           # Environment variables
└── package.json         # Dependencies
```

## 🔧 Useful Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run production build locally
npm run start

# Run linter
npm run lint

# Format code
npm run format (if prettier is installed)
```

## 📝 Adding Products

### Method 1: Admin Panel (Recommended)
1. Go to `/admin/login`
2. Enter password: `admin123`
3. Click "+ ADD NEW PRODUCT"
4. Fill in product details
5. Click "CREATE PRODUCT"

### Method 2: Direct API
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Eco Pencil",
    "price": 50,
    "description": "Made from recycled paper",
    "category": "pencils",
    "stock": 100,
    "image": "https://example.com/pencil.jpg",
    "adminPassword": "admin123"
  }'
```

## ⚡ Performance Tips

1. **Images**: Use high-quality but optimized images
2. **Database**: Index frequently searched fields
3. **Caching**: Vercel automatically caches static content
4. **API**: Keep API responses small

## 🐛 Troubleshooting

### MongoDB Connection Error
- Check `MONGODB_URI` format
- Verify IP is whitelisted in MongoDB Atlas
- Check database user credentials

### Razorpay Payment Fails
- Use test credentials (not live)
- Check key IDs are correct
- Verify payment gateway is enabled

### Admin Login Fails
- Check password is exactly: `admin123`
- Try clearing browser cache
- Verify `.env.local` has correct password

### Products Not Showing
- Check MongoDB is connected
- Verify products are added via admin
- Check browser console for errors

## 🆘 Need Help?

- **Next.js Docs**: https://nextjs.org/docs
- **MongoDB Docs**: https://docs.mongodb.com
- **Razorpay Docs**: https://razorpay.com/docs
- **Vercel Docs**: https://vercel.com/docs

## ✅ Pre-Launch Checklist

- [ ] Updated admin password
- [ ] MongoDB Atlas configured
- [ ] Razorpay credentials added
- [ ] Test payment successful
- [ ] Product images optimized
- [ ] Homepage content updated
- [ ] Footer links configured
- [ ] Email templates ready (optional)
- [ ] Deployed to Vercel
- [ ] Embedded in Wix (if needed)
- [ ] SSL certificate active
- [ ] Analytics configured (optional)

## 🚀 Next Steps

1. Customize colors and branding
2. Add your products
3. Test complete checkout flow
4. Deploy to Vercel
5. Connect to Wix
6. Monitor and iterate

---

**Your e-commerce app is ready to go! 🎉**

Questions? Check the README.md for more details.
