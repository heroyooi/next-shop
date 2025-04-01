import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { notFound } from 'next/navigation';

type Product = {
  name: string;
  price: number;
  imageUrl: string;
};

type Props = {
  params: { id: string };
};

export default async function ProductDetailPage({ params }: Props) {
  const docRef = doc(db, 'products', params.id);
  const snapshot = await getDoc(docRef);
  console.log('📦 상품 데이터:', snapshot.exists(), snapshot.data(), params.id);

  if (!snapshot.exists()) {
    return notFound();
  }

  const product = snapshot.data() as Product;

  return (
    <div style={{ padding: '2rem' }}>
      <img
        src={product.imageUrl}
        alt={product.name}
        style={{ width: '300px', borderRadius: '10px' }}
      />
      <h1>{product.name}</h1>
      <p>{product.price.toLocaleString()}원</p>
    </div>
  );
}
