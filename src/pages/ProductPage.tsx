import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, message } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { products } from '../data/products.ts';
import { useCart } from '../contexts/CartContext.tsx';

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleFavorite, isFavorite } = useCart();
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');

  const product = products.find(p => p.id === Number(id));
  if (!product) return <div className="text-center py-10"><h2>Товар не найден</h2><Button onClick={() => navigate('/catalog')}>В каталог</Button></div>;

  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
  const fav = isFavorite(product.id);

  const handleAdd = () => {
    if (!size || !color) { message.warning('Выберите размер и цвет'); return; }
    addToCart(product, size, color);
    message.success('Добавлено в корзину!');
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-1/2">
        <img src={product.image} alt={product.name} className="w-full rounded-2xl object-cover" />
      </div>
      <div className="md:w-1/2">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h1>
        <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
          <span className="text-yellow-500">★</span> {product.rating} ({product.reviews} отзывов) | Бренд: {product.brand}
        </div>
        <div className="flex items-baseline gap-3 mb-6">
          <span className="text-3xl font-bold text-[#FF385C]">{product.price} ₽</span>
          {product.oldPrice && <span className="text-gray-400 line-through">{product.oldPrice} ₽</span>}
          {discount > 0 && <span className="bg-[#FF385C] text-white text-xs px-2 py-0.5 rounded">-{discount}%</span>}
        </div>

        <div className="mb-4">
          <h4 className="font-medium text-gray-700 mb-2">Размер</h4>
          <div className="flex gap-2 flex-wrap">
            {product.sizes.map(s => (
              <Button key={s} type={size === s ? 'primary' : 'default'} onClick={() => setSize(s)} className={size === s ? 'bg-[#FF385C] border-[#FF385C]' : ''}>{s}</Button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h4 className="font-medium text-gray-700 mb-2">Цвет</h4>
          <div className="flex gap-2 flex-wrap">
            {product.colors.map(c => (
              <Button key={c} type={color === c ? 'primary' : 'default'} onClick={() => setColor(c)} className={color === c ? 'bg-[#FF385C] border-[#FF385C]' : ''}>{c}</Button>
            ))}
          </div>
        </div>

        <div className="flex gap-3 mb-6">
          <Button type="primary" size="large" className="bg-[#FF385C] border-[#FF385C] hover:bg-[#e0314f] font-medium" onClick={handleAdd}>Добавить в корзину</Button>
          <Button size="large" icon={fav ? <HeartFilled style={{ color: '#FF385C' }} /> : <HeartOutlined />} onClick={() => toggleFavorite(product.id)}>
            {fav ? 'В избранном' : 'В избранное'}
          </Button>
        </div>

        <div className="border-t pt-4">
          <h4 className="font-medium text-gray-700 mb-1">Описание</h4>
          <p className="text-gray-500">{product.description}</p>
        </div>
      </div>
    </div>
  );
}