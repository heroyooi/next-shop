'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useCartStore } from '@/store/cartStore';

type Product = {
  name: string;
  price: number;
  imageUrl: string;
};

export default function ProductDetailClient({ id }: { id: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, 'products', id);
      const snapshot = await getDoc(docRef);

      if (snapshot.exists()) {
        setProduct(snapshot.data() as Product);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div>로딩 중...</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <img
        src={product.imageUrl}
        alt={product.name}
        width={300}
        style={{ borderRadius: '10px' }}
      />
      <h1>{product.name}</h1>
      <p>{product.price.toLocaleString()}원</p>
      <button
        onClick={() =>
          addToCart({
            id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
          })
        }
        style={{ marginTop: '1rem' }}
      >
        🛒 장바구니에 담기
      </button>
    </div>
  );
}
