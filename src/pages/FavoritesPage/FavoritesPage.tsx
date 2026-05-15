import { Link } from 'react-router-dom';
import { Button, Empty } from 'antd';
import { products } from '../../data/products';
import { useCart } from '../../contexts/CartContext';
import ProductCard from '../../components/ProductCard/ProductCard';

export default function FavoritesPage() {
  const { favorites } = useCart();
  const favProducts = products.filter(p => favorites.includes(p.id));

  if (!favProducts.length) {
    return (
      <div className="text-center py-10">
        <Empty description="В избранном пусто" />
        <Link to="/catalog"><Button type="primary" className="mt-4 bg-[#FF385C]">Перейти в каталог</Button></Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Избранное ({favProducts.length})</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {favProducts.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}