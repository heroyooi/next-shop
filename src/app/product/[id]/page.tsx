import ProductDetailClient from './ProductDetailClient';

type Props = {
  params: { id: string };
};

export default function ProductDetailPage({ params }: Props) {
  return <ProductDetailClient id={params.id} />;
}
