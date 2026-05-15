import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { useCart } from '../../contexts/CartContext';
import type { Product } from '../../data/products';

export default function ProductCard({ product }: { product: Product }) {
  const { toggleFavorite, isFavorite } = useCart();
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
  const fav = isFavorite(product.id);

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col">
      <Link to={`/product/${product.id}`} className="relative block pt-[100%] bg-gray-100">
        <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-cover" />
        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-[#FF385C] text-white text-xs font-semibold px-2 py-0.5 rounded-md">
            -{discount}%
          </span>
        )}
      </Link>

      <div className="p-3 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-1">
          <Link to={`/product/${product.id}`} className="text-sm font-medium text-gray-800 no-underline line-clamp-2 flex-1 mr-1">{product.name}</Link>
          <Button
            type="text"
            size="small"
            icon={fav ? <HeartFilled style={{ color: '#FF385C' }} /> : <HeartOutlined />}
            onClick={() => toggleFavorite(product.id)}
            className="flex-shrink-0 -mr-1"
          />
        </div>

        <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
          <span className="text-yellow-500">★</span> {product.rating}
          <span className="text-gray-400">({product.reviews})</span>
        </div>

        <div className="flex items-baseline gap-2 mt-auto">
          <span className="text-lg font-bold text-[#FF385C]">{product.price} ₽</span>
          {product.oldPrice && (
            <span className="text-xs text-gray-400 line-through">{product.oldPrice} ₽</span>
          )}
        </div>
      </div>
    </div>
  );
}