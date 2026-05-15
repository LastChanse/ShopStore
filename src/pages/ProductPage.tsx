import { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button, message } from 'antd';
import { HeartOutlined, HeartFilled, ShoppingCartOutlined } from '@ant-design/icons';
import { products } from '../data/products.ts';
import { useCart } from '../contexts/CartContext.tsx';
import ProductCard from '../components/ProductCard.tsx';

interface Review {
  author: string;
  rating: number;
  text: string;
  date: string;
}

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span style={{ fontSize: size }}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= Math.round(rating) ? '#FF6B2B' : '#DDD' }}>★</span>
      ))}
    </span>
  );
}

function StarPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <span style={{ fontSize: 24, cursor: 'pointer' }}>
      {[1,2,3,4,5].map(i => (
        <span
          key={i}
          style={{ color: i <= (hovered || value) ? '#FF6B2B' : '#DDD' }}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(i)}
        >★</span>
      ))}
    </span>
  );
}

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleFavorite, isFavorite } = useCart();

  const product = products.find(p => p.id === Number(id));

  const [reviews, setReviews] = useState<Review[]>([
    { author: 'Татьяна', rating: 5, text: 'Отличный товар, очень доволен покупкой!', date: '22.02.2020' },
    { author: 'Мария',   rating: 3, text: 'Среднее качество, есть варианты лучше.',  date: '22.02.2020' },
  ]);
  const [newRating, setNewRating] = useState(0);
  const [newText, setNewText]     = useState('');

  const related = useMemo(() => {
    if (!product) return [];
    return products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);
  }, [product]);

  const discounted = useMemo(() => products.filter(p => p.oldPrice).slice(0, 4), []);

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: 60 }}>
        <h2>Товар не найден</h2>
        <Button onClick={() => navigate('/catalog')}>В каталог</Button>
      </div>
    );
  }

  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
  const fav = isFavorite(product.id);
  const avgRating = reviews.length
    ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
    : 0;

  const handleAdd = () => {
    const size  = product.sizes?.[0]  ?? 'One size';
    const color = product.colors?.[0] ?? 'Стандартный';
    addToCart(product, size, color);
    message.success('Добавлено в корзину!');
  };

  const handleReview = () => {
    if (!newRating) { message.warning('Поставьте оценку'); return; }
    if (!newText.trim()) { message.warning('Напишите отзыв'); return; }
    const today = new Date().toLocaleDateString('ru-RU');
    setReviews(prev => [...prev, { author: 'Вы', rating: newRating, text: newText.trim(), date: today }]);
    setNewRating(0);
    setNewText('');
    message.success('Отзыв добавлен!');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>

      <div style={{ fontSize: 13, color: '#888', display: 'flex', gap: 6, alignItems: 'center' }}>
        <Link to="/" style={{ color: '#888', textDecoration: 'none' }}>Главная</Link>
        <span>›</span>
        <Link to="/catalog" style={{ color: '#888', textDecoration: 'none' }}>Каталог</Link>
        <span>›</span>
        <span style={{ color: '#333' }}>{product.name}</span>
      </div>

      <h1 style={{ fontSize: 20, fontWeight: 800, color: '#1A1A1A', margin: '-32px 0 0' }}>
        {product.name}
      </h1>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '-36px 0 0', flexWrap: 'wrap' }}>
        <StarRating rating={product.rating} size={16} />
        <span style={{ fontSize: 13, color: '#888' }}>{reviews.length} отзыва</span>
        <button
          onClick={() => toggleFavorite(product.id)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, color: fav ? '#FF6B2B' : '#888', fontSize: 13 }}
        >
          {fav ? <HeartFilled /> : <HeartOutlined />}
          {fav ? 'В избранном' : 'В избранное'}
        </button>
      </div>

      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>

        <div style={{ flex: '0 0 380px', maxWidth: 380, position: 'relative' }}>
          {discount > 0 && (
            <span style={{
              position: 'absolute', top: 12, left: 12, zIndex: 1,
              background: '#FF6B2B', color: '#fff', fontSize: 13, fontWeight: 700,
              padding: '3px 10px', borderRadius: 6,
            }}>
              -{discount}%
            </span>
          )}
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '100%', borderRadius: 12, objectFit: 'cover', border: '1px solid #EDE8DF' }}
          />
        </div>

        <div style={{ flex: 1, minWidth: 260, display: 'flex', flexDirection: 'column', gap: 16 }}>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
            {product.oldPrice && (
              <span style={{ fontSize: 16, color: '#aaa', textDecoration: 'line-through' }}>
                {product.oldPrice} ₽
              </span>
            )}
            <span style={{ fontSize: 30, fontWeight: 900, color: '#1A1A1A' }}>
              {product.price} ₽
            </span>
          </div>

          <Button
            onClick={handleAdd}
            size="large"
            icon={<ShoppingCartOutlined />}
            style={{
              background: '#FF6B2B',
              borderColor: '#FF6B2B',
              color: '#fff',
              borderRadius: 8,
              height: 52,
              fontSize: 16,
              fontWeight: 700,
              width: '100%',
            }}
          >
            В корзину
          </Button>

          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #EDE8DF', overflow: 'hidden', marginTop: 8 }}>
            {[
              ['Бренд', product.brand],
              ['Категория', product.category === 'women' ? 'Женщины' : product.category === 'men' ? 'Мужчины' : 'Дети'],
              ['Рейтинг', `${product.rating} / 5`],
              ...(product.sizes?.length ? [['Размеры', product.sizes.join(', ')]] : []),
              ...(product.colors?.length ? [['Цвета', product.colors.join(', ')]] : []),
            ].map(([label, value], i) => (
              <div
                key={label}
                style={{
                  display: 'flex',
                  borderBottom: i < 4 ? '1px solid #F0EBE3' : 'none',
                  padding: '10px 16px',
                }}
              >
                <span style={{ flex: 1, color: '#888', fontSize: 13 }}>{label}</span>
                <span style={{ flex: 1, color: '#1A1A1A', fontSize: 13, fontWeight: 600 }}>{value}</span>
              </div>
            ))}
          </div>

          {product.description && (
            <p style={{ fontSize: 13, color: '#666', lineHeight: 1.6, margin: 0 }}>
              {product.description}
            </p>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: '#1A1A1A', marginBottom: 16 }}>
            С этим товаром покупают
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      <section>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: '#1A1A1A', marginBottom: 20 }}>Отзывы</h2>

        <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>

          <div style={{ minWidth: 160 }}>
            <div style={{ fontSize: 36, fontWeight: 900, color: '#1A1A1A' }}>{avgRating.toFixed(1)}</div>
            <StarRating rating={avgRating} size={18} />
            <div style={{ fontSize: 12, color: '#888', marginTop: 4 }}>из 5</div>
            <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
              {[5,4,3,2,1].map(star => {
                const count = reviews.filter(r => r.rating === star).length;
                return (
                  <div key={star} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
                    <span style={{ width: 8, color: '#888' }}>{star}</span>
                    <div style={{ flex: 1, height: 6, background: '#EDE8DF', borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{
                        width: reviews.length ? `${(count / reviews.length) * 100}%` : '0%',
                        height: '100%', background: '#FF6B2B', borderRadius: 3,
                      }} />
                    </div>
                    <span style={{ width: 8, color: '#888' }}>{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ flex: 1, minWidth: 280, display: 'flex', flexDirection: 'column', gap: 20 }}>
            {reviews.map((r, i) => (
              <div key={i} style={{ borderBottom: '1px solid #F0EBE3', paddingBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%', background: '#F0EBE3',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: '#888',
                  }}>
                    {r.author[0]}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: '#1A1A1A' }}>{r.author}</div>
                    <div style={{ fontSize: 11, color: '#aaa' }}>{r.date}</div>
                  </div>
                </div>
                <StarRating rating={r.rating} size={13} />
                <p style={{ margin: '6px 0 0', fontSize: 13, color: '#444', lineHeight: 1.5 }}>{r.text}</p>
              </div>
            ))}

            <div style={{ paddingTop: 8 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A', marginBottom: 8 }}>Ваша оценка</div>
              <StarPicker value={newRating} onChange={setNewRating} />
              <textarea
                value={newText}
                onChange={e => setNewText(e.target.value)}
                placeholder="Отзыв"
                rows={3}
                style={{
                  display: 'block', width: '100%', marginTop: 12,
                  border: '1px solid #DDD', borderRadius: 8, padding: '10px 12px',
                  fontSize: 13, resize: 'vertical', fontFamily: 'inherit', outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
              <Button
                onClick={handleReview}
                style={{
                  marginTop: 12,
                  background: '#FFB899', borderColor: '#FFB899',
                  color: '#FF6B2B', fontWeight: 700, borderRadius: 8, height: 40,
                }}
              >
                Отправить отзыв
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: '#1A1A1A', margin: 0 }}>Акции</h2>
          <Link to="/catalog" style={{ color: '#FF6B2B', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
            Все акции ›
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {discounted.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

    </div>
  );
}