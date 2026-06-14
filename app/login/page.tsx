'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (data.success) {
        router.push('/');
        router.refresh();
      } else {
        setError(data.error || 'Invalid email or password.');
      }
    } catch {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffde8] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/">
            <img src="/images/akotrofaviconlogo.png" alt="Akotro" className="h-14 w-auto mx-auto" />
          </Link>
          <h1 className="text-3xl font-black text-gray-900 mt-4">Welcome back</h1>
          <p className="text-gray-500 text-sm mt-1">Sign in to your account</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          {error && <div className="mb-5 p-4 bg-red-50 text-red-700 text-sm rounded-lg font-medium">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:border-[#880808] focus:ring-1 focus:ring-[#880808] bg-white" />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:border-[#880808] focus:ring-1 focus:ring-[#880808] bg-white" />
            </div>

            <button type="submit" disabled={isLoading} className="w-full bg-[#880808] text-white py-3 rounded-lg font-bold text-sm hover:bg-[#5a0505] transition-colors shadow-md mt-2">
              {isLoading ? 'Signing in...' : 'SIGN IN'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don&apos;t have an account? <Link href="/signup" className="text-[#880808] font-bold hover:underline">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
