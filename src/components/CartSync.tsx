'use client';

import { useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { saveCartToFirestore } from '@/lib/firebase';
import { useCartStore } from '@/store/cartStore';

export default function CartSync() {
  const items = useCartStore((state) => state.items);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      saveCartToFirestore(items);
    }
  }, [items]);

  return null;
}
