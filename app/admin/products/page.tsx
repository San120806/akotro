'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  image: string;
}

export default function AdminProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'pencils',
    stock: '',
    image: '',
  });

  useEffect(() => {
    checkAuth();
    fetchProducts();
  }, []);

  const checkAuth = () => {
    const isAuth = localStorage.getItem('adminAuth');
    if (!isAuth) {
      router.push('/admin/login');
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      adminPassword: 'admin123',
    };

    try {
      if (editingId) {
        // Update product
        const response = await fetch(`/api/products/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const data = await response.json();
        if (data.success) {
          alert('Product updated successfully');
          fetchProducts();
          setShowForm(false);
          setEditingId(null);
          setFormData({ name: '', description: '', price: '', category: 'pencils', stock: '', image: '' });
        }
      } else {
        // Create product
        const response = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const data = await response.json();
        if (data.success) {
          alert('Product created successfully');
          fetchProducts();
          setShowForm(false);
          setFormData({ name: '', description: '', price: '', category: 'pencils', stock: '', image: '' });
        }
      }
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product');
    }
  };

  const handleEdit = (product: Product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      stock: product.stock.toString(),
      image: product.image,
    });
    setEditingId(product._id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminPassword: 'admin123' }),
      });

      const data = await response.json();
      if (data.success) {
        alert('Product deleted successfully');
        fetchProducts();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    router.push('/admin/login');
  };

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-black text-white py-4 px-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Akotro Admin Panel</h1>
          <p className="text-sm text-gray-400">Manage Products</p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-[#880808] px-4 py-2 rounded font-bold hover:bg-[#6b0606]"
        >
          LOGOUT
        </button>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        {/* Action Buttons */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditingId(null);
              setFormData({ name: '', description: '', price: '', category: 'pencils', stock: '', image: '' });
            }}
            className="bg-green-600 text-white px-6 py-2 rounded font-bold hover:bg-green-700"
          >
            {showForm ? 'CANCEL' : '+ ADD NEW PRODUCT'}
          </button>
          <Link href="/">
            <button className="bg-blue-600 text-white px-6 py-2 rounded font-bold hover:bg-blue-700">
              VIEW STOREFRONT
            </button>
          </Link>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-bold mb-6">
              {editingId ? 'EDIT PRODUCT' : 'ADD NEW PRODUCT'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Product Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Price (₹)"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>

              <textarea
                name="description"
                placeholder="Product Description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />

              <div className="grid grid-cols-3 gap-4">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                >
                  <option value="pencils">Pencils</option>
                  <option value="pens">Pens</option>
                  <option value="erasers">Erasers</option>
                  <option value="accessories">Accessories</option>
                </select>
                <input
                  type="number"
                  name="stock"
                  placeholder="Stock Quantity"
                  value={formData.stock}
                  onChange={handleInputChange}
                  className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
                <input
                  type="url"
                  name="image"
                  placeholder="Image URL"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700"
              >
                {editingId ? 'UPDATE PRODUCT' : 'CREATE PRODUCT'}
              </button>
            </form>
          </div>
        )}

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold">PRODUCTS ({products.length})</h2>
          </div>

          {products.length === 0 ? (
            <div className="p-6 text-center text-gray-600">
              No products yet. Click "Add New Product" to get started.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-bold">NAME</th>
                    <th className="px-6 py-3 text-left text-sm font-bold">PRICE</th>
                    <th className="px-6 py-3 text-left text-sm font-bold">CATEGORY</th>
                    <th className="px-6 py-3 text-left text-sm font-bold">STOCK</th>
                    <th className="px-6 py-3 text-left text-sm font-bold">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product._id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex gap-3 items-center">
                          <img
                            src={product.image || 'https://via.placeholder.com/50'}
                            alt={product.name}
                            className="w-10 h-10 object-cover rounded"
                          />
                          <span className="font-medium">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">₹{product.price}</td>
                      <td className="px-6 py-4 capitalize">{product.category}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="text-blue-600 hover:text-blue-800 font-bold text-sm"
                        >
                          EDIT
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="text-[#880808] hover:text-red-800 font-bold text-sm"
                        >
                          DELETE
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
