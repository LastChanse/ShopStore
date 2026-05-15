import { Link } from 'react-router-dom';
import { Button, Empty } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useCart } from '../../contexts/CartContext';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (!cartItems.length) {
    return (
      <div className="text-center py-10">
        <Empty description="Корзина пуста" />
        <Link to="/catalog"><Button type="primary" className="mt-4 bg-[#FF385C]">Продолжить покупки</Button></Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Корзина</h1>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-4">
          {cartItems.map((item, i) => (
            <div key={`${item.id}-${item.size}-${item.color}-${i}`} className="bg-white rounded-xl p-4 flex gap-4 shadow-sm">
              <img src={item.image} alt="" className="w-20 h-20 object-cover rounded-lg" />
              <div className="flex-1">
                <h3 className="font-medium text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-500">Размер: {item.size}, Цвет: {item.color}</p>
                <span className="text-[#FF385C] font-semibold">{item.price} ₽</span>
              </div>
              <div className="flex items-center gap-2">
                <Button size="small" onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}>-</Button>
                <span className="font-medium w-6 text-center">{item.quantity}</span>
                <Button size="small" onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}>+</Button>
              </div>
              <div className="font-bold text-gray-800 w-20 text-right">{item.price * item.quantity} ₽</div>
              <Button type="text" danger icon={<DeleteOutlined />} onClick={() => removeFromCart(item.id, item.size, item.color)} />
            </div>
          ))}
        </div>
        <div className="lg:w-72">
          <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
            <h3 className="font-semibold text-gray-700 mb-4">Итого</h3>
            <div className="flex justify-between text-lg font-bold mb-4">
              <span>Сумма</span>
              <span className="text-[#FF385C]">{cartTotal} ₽</span>
            </div>
            <Button type="primary" block size="large" className="bg-[#FF385C] border-[#FF385C] h-12 font-medium">Оформить заказ</Button>
          </div>
        </div>
      </div>
    </div>
  );
}