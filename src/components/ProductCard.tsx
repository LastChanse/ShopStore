import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { HeartOutlined, HeartFilled, ShoppingCartOutlined } from '@ant-design/icons';
import { useCart } from '../contexts/CartContext.tsx';
import type { Product } from '../data/products.ts';

// Рендерит звёздочки как в макете
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" style={{ fontSize: 13 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} style={{ color: i <= Math.round(rating) ? '#FF6B2B' : '#DDD' }}>★</span>
      ))}
    </div>
  );
}

export default function ProductCard({ product }: { product: Product }) {
  const { toggleFavorite, isFavorite, addToCart } = useCart();
  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;
  const fav = isFavorite(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    // Добавляем с первым доступным размером/цветом или дефолтными
    const size = product.sizes?.[0] ?? 'One size';
    const color = product.colors?.[0] ?? 'Стандартный';
    addToCart(product, size, color);
  };

  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 12,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #EDE8DF',
        transition: 'box-shadow 0.2s',
      }}
      className="hover:shadow-md"
    >
      <Link to={`/product/${product.id}`} style={{ position: 'relative', display: 'block' }}>
        <div style={{ paddingTop: '100%', background: '#F9F6F1', position: 'relative' }}>
          <img
            src={product.image}
            alt={product.name}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          {discount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: 8,
                left: 8,
                background: '#FF6B2B',
                color: '#fff',
                fontSize: 11,
                fontWeight: 700,
                padding: '2px 7px',
                borderRadius: 6,
              }}
            >
              -{discount}%
            </span>
          )}
          <button
            onClick={(e) => { e.preventDefault(); toggleFavorite(product.id); }}
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              background: '#fff',
              border: 'none',
              borderRadius: '50%',
              width: 30,
              height: 30,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
            }}
          >
            {fav
              ? <HeartFilled style={{ color: '#FF6B2B', fontSize: 15 }} />
              : <HeartOutlined style={{ color: '#aaa', fontSize: 15 }} />
            }
          </button>
        </div>
      </Link>

      <div style={{ padding: '10px 12px 12px', display: 'flex', flexDirection: 'column', flex: 1, gap: 4 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: '#222' }}>
            {product.price} ₽
          </span>
          {product.oldPrice && (
            <span style={{ fontSize: 12, color: '#aaa', textDecoration: 'line-through' }}>
              {product.oldPrice} ₽
            </span>
          )}
        </div>

        <Link
          to={`/product/${product.id}`}
          style={{
            fontSize: 13,
            color: '#333',
            textDecoration: 'none',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.4,
            flex: 1,
          }}
        >
          {product.name}
        </Link>

        <StarRating rating={product.rating} />

        <Button
          onClick={handleAddToCart}
          style={{
            marginTop: 6,
            background: 'transparent',
            border: '1.5px solid #FF6B2B',
            color: '#FF6B2B',
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 13,
            height: 34,
            width: '100%',
            transition: 'all 0.15s',
          }}
          icon={<ShoppingCartOutlined />}
          className="hover:bg-[#FF6B2B] hover:text-white"
        >
          В корзину
        </Button>
      </div>
    </div>
  );
}