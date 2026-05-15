import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { products } from '../data/products.ts';
import ProductCard from '../components/ProductCard.tsx';
import WeatherWidget from '../components/WeatherWidget.tsx';

const categories = [
  { key: '', label: 'Все' },
  { key: 'women', label: 'Женщины' },
  { key: 'men', label: 'Мужчины' },
  { key: 'kids', label: 'Дети' },
];

export default function HomePage() {
  const [active, setActive] = useState('');

  const filtered = useMemo(() => {
    const base = active ? products.filter(p => p.category === active) : products;
    return base.slice(0, 6);
  }, [active]);

  return (
    <div>
      {/* Баннер */}
      <div className="bg-gradient-to-r from-pink-100 to-pink-200 rounded-2xl p-6 md:p-10 mb-8 flex flex-col md:flex-row items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-2">Летняя распродажа</h1>
          <p className="text-gray-600 mb-4">Скидки до 50% на новую коллекцию</p>
          <Link to="/catalog"><Button type="primary" size="large" className="bg-[#FF385C] border-[#FF385C] hover:bg-[#e0314f] font-medium">Смотреть все</Button></Link>
        </div>
        <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400" alt="" className="w-48 h-48 object-cover rounded-xl mt-4 md:mt-0 hidden md:block" />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Сайдбар */}
        <aside className="lg:w-[250px] flex-shrink-0">
          <WeatherWidget />
          <div className="mt-4 bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold text-gray-700 mb-3">Категории</h3>
            <div className="flex flex-col gap-1">
              {categories.map(c => (
                <Button
                  key={c.key}
                  type={active === c.key ? 'primary' : 'text'}
                  onClick={() => setActive(c.key)}
                  className={`text-left justify-start ${active === c.key ? 'bg-[#FF385C] border-[#FF385C]' : 'text-gray-600 hover:text-[#FF385C]'}`}
                  block
                >
                  {c.label}
                </Button>
              ))}
            </div>
          </div>
        </aside>

        {/* Товары */}
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            {active ? categories.find(c => c.key === active)?.label : 'Популярные товары'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
          <div className="text-center mt-6">
            <Link to="/catalog"><Button className="border-[#FF385C] text-[#FF385C] hover:text-white hover:bg-[#FF385C]">Все товары</Button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}