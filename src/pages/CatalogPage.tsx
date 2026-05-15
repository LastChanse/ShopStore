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
      case 'price-asc': result.sort((a,b) => a.price - b.price); break;
      case 'price-desc': result.sort((a,b) => b.price - a.price); break;
      case 'rating': result.sort((a,b) => b.rating - a.rating); break;
    }
    return result;
  }, [debouncedSearch, category, sort]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Каталог товаров</h1>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Input
          placeholder="Поиск товаров..."
          prefix={<SearchOutlined className="text-gray-400" />}
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="sm:w-72"
          size="large"
        />
        <Select value={category} onChange={setCategory} placeholder="Категория" size="large" className="w-40" allowClear>
          <Option value="">Все</Option>
          <Option value="women">Женщины</Option>
          <Option value="men">Мужчины</Option>
          <Option value="kids">Дети</Option>
        </Select>
        <Select value={sort} onChange={setSort} size="large" className="w-48">
          <Option value="default">По умолчанию</Option>
          <Option value="price-asc">Цена: по возрастанию</Option>
          <Option value="price-desc">Цена: по убыванию</Option>
          <Option value="rating">По рейтингу</Option>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <Empty description="Товары не найдены" className="mt-10" />
      ) : (
        <>
          <p className="text-gray-500 mb-4">Найдено: {filtered.length}</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </>
      )}
    </div>
  );
}