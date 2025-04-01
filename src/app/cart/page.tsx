'use client';

import { useCartStore } from '@/store/cartStore';

export default function CartPage() {
  const {
    items,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCartStore();

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🛒 장바구니</h1>

      {items.length === 0 ? (
        <p>장바구니가 비어있어요.</p>
      ) : (
        <>
          <ul>
            {items.map((item) => (
              <li key={item.id} style={{ marginBottom: '1rem' }}>
                <img src={item.imageUrl} alt={item.name} width={80} />
                <p>{item.name}</p>
                <p>{item.price.toLocaleString()}원</p>
                <div>
                  <button onClick={() => decreaseQuantity(item.id)}>-</button>
                  <span style={{ margin: '0 1rem' }}>{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.id)}>+</button>
                </div>
                <p>소계: {(item.price * item.quantity).toLocaleString()}원</p>
                <button onClick={() => removeFromCart(item.id)}>삭제</button>
              </li>
            ))}
          </ul>
          <hr />
          <p>
            <strong>총합:</strong> {totalPrice.toLocaleString()}원
          </p>
          <button onClick={clearCart}>장바구니 비우기</button>
        </>
      )}
    </div>
  );
}
