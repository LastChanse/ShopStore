import { Link } from 'react-router-dom';
import { Button, Empty } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useCart } from '../contexts/CartContext.tsx';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (!cartItems.length) {
    return (
      <div style={{ textAlign: 'center', paddingTop: 60 }}>
        <Empty description="Корзина пуста" />
        <Link to="/catalog">
          <Button
            type="primary"
            style={{ marginTop: 16, background: '#FF6B2B', borderColor: '#FF6B2B' }}
          >
            Продолжить покупки
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 800, color: '#1A1A1A', marginBottom: 24 }}>Корзина</h1>
      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12, minWidth: 320 }}>
          {cartItems.map((item, i) => (
            <div
              key={`${item.id}-${item.size}-${item.color}-${i}`}
              style={{
                background: '#fff',
                borderRadius: 12,
                padding: '16px',
                display: 'flex',
                gap: 16,
                alignItems: 'center',
                border: '1px solid #EDE8DF',
              }}
            >
              <img src={item.image} alt="" style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: '#1A1A1A', marginBottom: 4 }}>{item.name}</div>
                <div style={{ fontSize: 12, color: '#888' }}>Размер: {item.size}, Цвет: {item.color}</div>
                <div style={{ color: '#FF6B2B', fontWeight: 700, marginTop: 4 }}>{item.price} ₽</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Button
                  size="small"
                  style={{ borderColor: '#FF6B2B', color: '#FF6B2B' }}
                  onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                >
                  −
                </Button>
                <span style={{ width: 24, textAlign: 'center', fontWeight: 600 }}>{item.quantity}</span>
                <Button
                  size="small"
                  style={{ borderColor: '#FF6B2B', color: '#FF6B2B' }}
                  onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                >
                  +
                </Button>
              </div>
              <div style={{ fontWeight: 700, color: '#1A1A1A', width: 80, textAlign: 'right' }}>
                {item.price * item.quantity} ₽
              </div>
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={() => removeFromCart(item.id, item.size, item.color)}
              />
            </div>
          ))}
        </div>

        <div
          style={{
            width: 280,
            background: '#fff',
            borderRadius: 12,
            padding: '24px',
            border: '1px solid #EDE8DF',
            position: 'sticky',
            top: 80,
          }}
        >
          <div style={{ fontSize: 16, fontWeight: 700, color: '#1A1A1A', marginBottom: 16 }}>Итого</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, fontWeight: 800, marginBottom: 20 }}>
            <span>Сумма</span>
            <span style={{ color: '#FF6B2B' }}>{cartTotal} ₽</span>
          </div>
          <Button
            type="primary"
            block
            size="large"
            style={{ background: '#FF6B2B', borderColor: '#FF6B2B', height: 48, fontWeight: 700, borderRadius: 8 }}
          >
            Оформить заказ
          </Button>
          {cartTotal < 1000 && (
            <div style={{ marginTop: 12, fontSize: 12, color: '#888', textAlign: 'center' }}>
              До бесплатной доставки: {1000 - cartTotal} ₽
            </div>
          )}
        </div>
      </div>
    </div>
  );
}