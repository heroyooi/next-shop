'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import styles from './page.module.scss';

type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, 'products'));
      const fetchedProducts: Product[] = snapshot.docs.map((doc) => {
        const data = doc.data() as Omit<Product, 'id'>;
        return {
          id: doc.id,
          ...data,
        };
      });

      setProducts(fetchedProducts);
    };

    fetchData();
  }, []);

  return (
    <main className={styles.container}>
      <section className={styles.banner}>
        <h1>🛍️ Next 쇼핑몰에 오신 걸 환영합니다!</h1>
      </section>

      <section className={styles.productList}>
        <h2>🔥 인기 상품</h2>
        <ul>
          {products.map((product) => (
            <li key={product.id} className={styles.productItem}>
              <img src={product.imageUrl} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.price.toLocaleString()}원</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
