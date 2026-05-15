import { useState, useMemo } from 'react';
import { Input, Select, Empty } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { products } from '../data/products.ts';
import ProductCard from '../components/ProductCard.tsx';
import { useDebounce } from '../hooks/useDebounce.ts';

const { Option } = Select;

export default function CatalogPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('default');
  const debouncedSearch = useDebounce(search, 300);

  const filtered = useMemo(() => {
    let result = [...products];
    if (debouncedSearch) {
      const s = debouncedSearch.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(s) || p.brand.toLowerCase().includes(s));
    }
    if (category) result = result.filter(p => p.category === category);
    switch (sort) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
    }
    return result;
  }, [debouncedSearch, category, sort]);

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 800, color: '#1A1A1A', marginBottom: 20 }}>Каталог товаров</h1>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 12,
          marginBottom: 24,
          background: '#fff',
          borderRadius: 12,
          padding: '16px',
          border: '1px solid #EDE8DF',
        }}
      >
        <Input
          placeholder="Поиск товаров..."
          prefix={<SearchOutlined style={{ color: '#aaa' }} />}
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: 280, borderRadius: 8, borderColor: '#E0D8CC' }}
          size="large"
        />
        <Select
          value={category}
          onChange={setCategory}
          placeholder="Категория"
          size="large"
          style={{ width: 160, borderRadius: 8 }}
          allowClear
        >
          <Option value="">Все</Option>
          <Option value="women">Женщины</Option>
          <Option value="men">Мужчины</Option>
          <Option value="kids">Дети</Option>
        </Select>
        <Select
          value={sort}
          onChange={setSort}
          size="large"
          style={{ width: 200, borderRadius: 8 }}
        >
          <Option value="default">По умолчанию</Option>
          <Option value="price-asc">Цена: по возрастанию</Option>
          <Option value="price-desc">Цена: по убыванию</Option>
          <Option value="rating">По рейтингу</Option>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <Empty description="Товары не найдены" style={{ marginTop: 40 }} />
      ) : (
        <>
          <p style={{ color: '#888', marginBottom: 16, fontSize: 14 }}>Найдено: {filtered.length}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </>
      )}
    </div>
  );
}