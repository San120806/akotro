'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const isAuth = localStorage.getItem('adminAuth');
    if (!isAuth) {
      router.push('/admin/login');
    } else {
      // Redirect to products page
      router.push('/admin/products');
    }
  }, [router]);

  return null;
}
