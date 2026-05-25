# Akotro API Documentation

## Base URL
- **Development**: `http://localhost:3000`
- **Production**: `https://your-vercel-app.vercel.app`

## Authentication
- Admin endpoints require `adminPassword` in request body
- Default password: `admin123` (Change before deployment!)

---

## Products API

### Get All Products
```
GET /api/products
```
**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Eco-Friendly Pencil",
      "price": 50,
      "description": "Made from 100% recycled paper",
      "image": "https://example.com/pencil.jpg",
      "category": "pencils",
      "stock": 100,
      "featured": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### Get Single Product
```
GET /api/products/:id
```
**Response:** Same as above (single product)

### Create Product (Admin Only)
```
POST /api/products
Content-Type: application/json

{
  "name": "Eco Pen",
  "description": "Sustainable pen made from recycled materials",
  "price": 75,
  "image": "https://example.com/pen.jpg",
  "category": "pens",
  "stock": 50,
  "featured": false,
  "adminPassword": "admin123"
}
```
**Response:**
```json
{
  "success": true,
  "data": { "product object" }
}
```

### Update Product (Admin Only)
```
PUT /api/products/:id
Content-Type: application/json

{
  "name": "Updated Eco Pen",
  "price": 80,
  "stock": 45,
  "adminPassword": "admin123"
}
```

### Delete Product (Admin Only)
```
DELETE /api/products/:id
Content-Type: application/json

{
  "adminPassword": "admin123"
}
```

### Categories
Supported product categories:
- `pencils`
- `pens`
- `erasers`
- `accessories`

---

## Orders API

### Create Order
```
POST /api/orders
Content-Type: application/json

{
  "products": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Eco Pencil",
      "price": 50,
      "quantity": 2
    }
  ],
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "customerPhone": "9876543210",
  "shippingAddress": {
    "street": "123 Main St",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400001",
    "country": "India"
  },
  "totalAmount": 150
}
```
**Response:**
```json
{
  "success": true,
  "data": {
    "orderId": "507f1f77bcf86cd799439012",
    "razorpayOrderId": "order_1234567890",
    "amount": 15000,
    "currency": "INR"
  }
}
```

### Verify Payment
```
POST /api/orders/verify
Content-Type: application/json

{
  "razorpayOrderId": "order_1234567890",
  "razorpayPaymentId": "pay_1234567890",
  "razorpaySignature": "9ef4dffbfd84f1318f6739a3ce19f9d85851857ae648f114332d8401e0949a"
}
```
**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "status": "completed",
    "razorpayPaymentId": "pay_1234567890"
  }
}
```

---

## Error Responses

### Unauthorized (401)
```json
{
  "success": false,
  "error": "Unauthorized"
}
```

### Not Found (404)
```json
{
  "success": false,
  "error": "Product not found"
}
```

### Bad Request (400)
```json
{
  "success": false,
  "error": "Invalid payment signature"
}
```

### Server Error (500)
```json
{
  "success": false,
  "error": "Failed to fetch products"
}
```

---

## Request Examples

### Using cURL

#### Get all products
```bash
curl -X GET http://localhost:3000/api/products
```

#### Create product
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Eco Pencil",
    "price": 50,
    "description": "Made from recycled paper",
    "image": "https://example.com/pencil.jpg",
    "category": "pencils",
    "stock": 100,
    "adminPassword": "admin123"
  }'
```

#### Update product
```bash
curl -X PUT http://localhost:3000/api/products/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "stock": 80,
    "adminPassword": "admin123"
  }'
```

#### Delete product
```bash
curl -X DELETE http://localhost:3000/api/products/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "adminPassword": "admin123"
  }'
```

### Using JavaScript/Fetch

#### Get all products
```javascript
fetch('http://localhost:3000/api/products')
  .then(res => res.json())
  .then(data => console.log(data));
```

#### Create product
```javascript
fetch('http://localhost:3000/api/products', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Eco Pencil',
    price: 50,
    description: 'Made from recycled paper',
    image: 'https://example.com/pencil.jpg',
    category: 'pencils',
    stock: 100,
    adminPassword: 'admin123'
  })
})
  .then(res => res.json())
  .then(data => console.log(data));
```

#### Create order
```javascript
fetch('http://localhost:3000/api/orders', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    products: [
      { _id: '507f1f77bcf86cd799439011', name: 'Eco Pencil', price: 50, quantity: 2 }
    ],
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    customerPhone: '9876543210',
    shippingAddress: {
      street: '123 Main St',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      country: 'India'
    },
    totalAmount: 150
  })
})
  .then(res => res.json())
  .then(data => console.log(data));
```

---

## Data Types

### Product Object
```javascript
{
  _id: ObjectId,           // MongoDB ID
  name: String,            // Product name
  description: String,     // Product description
  price: Number,           // Price in INR
  image: String,           // Image URL
  category: String,        // Category (pencils, pens, erasers, accessories)
  stock: Number,           // Available quantity
  featured: Boolean,       // Featured on homepage
  createdAt: Date,         // Creation timestamp
  updatedAt: Date          // Last update timestamp
}
```

### Order Object
```javascript
{
  _id: ObjectId,           // MongoDB ID
  customerName: String,    // Customer name
  customerEmail: String,   // Customer email
  customerPhone: String,   // Customer phone
  products: Array,         // Array of products ordered
  totalAmount: Number,     // Total order amount
  razorpayOrderId: String, // Razorpay order ID
  razorpayPaymentId: String, // Razorpay payment ID (after payment)
  status: String,          // Order status (pending, completed, failed)
  shippingAddress: Object, // Shipping address
  createdAt: Date          // Order creation timestamp
}
```

---

## Rate Limiting
Currently, there is no rate limiting implemented. For production, consider adding:
- API key authentication
- Rate limiting middleware
- Request throttling

---

## Versioning
Current API Version: **v1**

No versioning in URL yet. Consider adding `/api/v1/` prefix for future versions.

---

## Security Notes

⚠️ **Important for Production:**
1. Change `ADMIN_PASSWORD` from default `admin123`
2. Use proper authentication (JWT, OAuth, etc.)
3. Enable HTTPS
4. Add rate limiting
5. Validate all inputs
6. Use environment variables for sensitive data
7. Add CORS restrictions
8. Implement API key authentication

---

## Support

For API issues:
1. Check your environment variables
2. Verify MongoDB connection
3. Check browser console for errors
4. Review error response messages
5. Check Vercel logs if deployed
