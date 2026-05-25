'use client';

import { useState, FormEvent } from 'react';

interface Props {
  onClose: () => void;
}

const PRODUCT_TYPES = [
  'Newspaper Pencils',
  'Brown Paper Pens',
  'Plantable Seed Pencils',
  'Color Paper Pencils',
  'Mixed Stationery Pack',
  'Custom / Branded Stationery',
  'Other',
];

export default function BulkOrderModal({ onClose }: Props) {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', organization: '',
    productType: '', quantity: '', message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const set = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/bulk-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setStatus(data.success ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#A40000] text-white px-6 py-5 rounded-t-2xl">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-black">Bulk & Corporate Orders</h2>
              <p className="text-white/70 text-sm mt-0.5">Tell us what you need — we'll get back within 24 hrs</p>
            </div>
            <button onClick={onClose} className="text-white/70 hover:text-white text-2xl leading-none mt-0.5">×</button>
          </div>
        </div>

        <div className="p-6">
          {status === 'success' ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">Request Received! </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Thank you for reaching out. Our team will review your requirement and get back to you within <strong>24 hours</strong>.
              </p>
              <button
                onClick={onClose}
                className="mt-6 bg-[#A40000] text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-red-800 transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Full Name *</label>
                  <input required value={form.name} onChange={e => set('name', e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-black focus:border-[#A40000] focus:ring-1 focus:ring-[#A40000] bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Phone *</label>
                  <input required type="tel" value={form.phone} onChange={e => set('phone', e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-black focus:border-[#A40000] focus:ring-1 focus:ring-[#A40000] bg-white" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Email Address *</label>
                <input required type="email" value={form.email} onChange={e => set('email', e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-black focus:border-[#A40000] focus:ring-1 focus:ring-[#A40000] bg-white" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Organisation / Company</label>
                <input value={form.organization} onChange={e => set('organization', e.target.value)}
                  placeholder="e.g. Acme Corp, School Name..."
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-black focus:border-[#A40000] focus:ring-1 focus:ring-[#A40000] bg-white" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Product Type *</label>
                  <select required value={form.productType} onChange={e => set('productType', e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-black focus:border-[#A40000] focus:ring-1 focus:ring-[#A40000] bg-white">
                    <option value="">Select...</option>
                    {PRODUCT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Quantity Required *</label>
                  <input required type="number" min="50" value={form.quantity} onChange={e => set('quantity', e.target.value)}
                    placeholder="Min. 50 units"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-black focus:border-[#A40000] focus:ring-1 focus:ring-[#A40000] bg-white" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Additional Requirements</label>
                <textarea value={form.message} onChange={e => set('message', e.target.value)} rows={3}
                  placeholder="Custom branding, delivery timeline, specific colours, etc."
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-black focus:border-[#A40000] focus:ring-1 focus:ring-[#A40000] bg-white resize-none" />
              </div>

              {status === 'error' && (
                <p className="text-red-600 text-sm font-medium">Something went wrong. Please try again.</p>
              )}

              <button type="submit" disabled={status === 'loading'}
                className="w-full bg-[#A40000] text-white py-3 rounded-lg font-bold text-sm hover:bg-red-800 transition-colors shadow-md disabled:opacity-60">
                {status === 'loading' ? 'Submitting...' : 'SUBMIT BULK ORDER REQUEST →'}
              </button>

              <p className="text-center text-xs text-gray-400">Our team will contact you within 24 hours</p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
