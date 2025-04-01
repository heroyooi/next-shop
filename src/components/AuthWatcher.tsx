'use client';

import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { loadCartFromFirestore } from '@/lib/firebase';
import { useCartStore } from '@/store/cartStore';

export default function AuthWatcher() {
  const setItems = useCartStore((state) => state.setItems);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const loaded = await loadCartFromFirestore();
        setItems(loaded);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setItems]);

  if (loading) return null;
  return null;
}
