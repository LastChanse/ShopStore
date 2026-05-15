import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';
import { products } from '../data/products.ts';
import ProductCard from '../components/ProductCard.tsx';
import WeatherWidget from '../components/WeatherWidget.tsx';

// Секция с заголовком и ссылкой "Все ..."
function SectionHeader({ title, linkLabel, to }: { title: string; linkLabel: string; to: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
      <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1A1A1A', margin: 0 }}>{title}</h2>
      <Link
        to={to}
        style={{ color: '#FF6B2B', fontWeight: 600, fontSize: 14, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}
      >
        {linkLabel} <ArrowRightOutlined style={{ fontSize: 12 }} />
      </Link>
    </div>
  );
}

// Горизонтальная сетка карточек (4 в ряд)
function ProductRow({ items }: { items: ReturnType<typeof products.filter> }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
      {items.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}

export default function HomePage() {
  const discounted = useMemo(() => products.filter(p => p.oldPrice).slice(0, 4), []);
  const newest = useMemo(() => [...products].sort((a, b) => b.id - a.id).slice(0, 4), []);
  const recent = useMemo(() => products.slice(4, 8), []);

  return (
    <div style={{ background: '#F5F0E8', minHeight: '100vh' }}>

      <div
        style={{
          background: 'linear-gradient(135deg, #FFF8F0 0%, #FFE8D6 100%)',
          borderRadius: 16,
          padding: '24px 32px',
          marginBottom: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          border: '1px solid #F0E0CC',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div>
          <div style={{ fontSize: 13, color: '#FF6B2B', fontWeight: 600, marginBottom: 4 }}>
            Специальное предложение
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 900, color: '#1A1A1A', margin: 0, lineHeight: 1.2 }}>
            Доставка бесплатно<br />от 1000 ₽
          </h1>
        </div>
      <div style={{ marginBottom: 24, maxWidth: 320 }}>
        <WeatherWidget />
      </div>
      </div>

      <section style={{ marginBottom: 36 }}>
        <SectionHeader title="Акции" linkLabel="Все акции" to="/catalog" />
        <ProductRow items={discounted} />
      </section>

      <section style={{ marginBottom: 36 }}>
        <SectionHeader title="Новинки" linkLabel="Все новинки" to="/catalog" />
        <ProductRow items={newest} />
      </section>

      <section style={{ marginBottom: 36 }}>
        <SectionHeader title="Покупали раньше" linkLabel="Все покупки" to="/catalog" />
        <ProductRow items={recent} />
      </section>

      <section style={{ marginBottom: 36 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1A1A1A', marginBottom: 16 }}>
          Специальные предложения
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div
            style={{
              background: 'linear-gradient(135deg, #FFE0CC 0%, #FFCBA8 100%)',
              borderRadius: 16,
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              minHeight: 140,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 800, color: '#333', lineHeight: 1.3 }}>
              Оформите карту<br />«Северяночка»
            </div>
            <div style={{ fontSize: 13, color: '#666' }}>
              И получайте бонусы при покупке<br />в магазинах и на сайте
            </div>
            <span style={{ position: 'absolute', right: 16, bottom: 16, fontSize: 40 }}>💳</span>
          </div>

          <div
            style={{
              background: 'linear-gradient(135deg, #D6F0D6 0%, #B8E8B8 100%)',
              borderRadius: 16,
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              minHeight: 140,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 800, color: '#333', lineHeight: 1.3 }}>
              Покупайте<br />акционные товары
            </div>
            <div style={{ fontSize: 13, color: '#666' }}>
              И получайте вдвое больше<br />бонусов
            </div>
            <span style={{ position: 'absolute', right: 16, bottom: 16, fontSize: 40 }}>🧺</span>
          </div>
        </div>
      </section>

    </div>
  );
}