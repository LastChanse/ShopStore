import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Badge, Dropdown, Space } from 'antd';
import { HeartOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import AuthModal from '../AuthModal/AuthModal';

export default function Header() {
  const [modalOpen, setModalOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { cartCount, favoritesCount } = useCart();
  const navigate = useNavigate();

  const items = [
    { key: 'favorites', label: <Link to="/favorites" className="text-gray-700">Избранное</Link>, icon: <HeartOutlined /> },
    { key: 'logout', label: 'Выйти', onClick: () => { logout(); navigate('/'); } },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-[1200px] mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-[#FF385C] no-underline">Стиль</Link>

        <nav className="hidden sm:flex items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-[#FF385C] font-medium no-underline">Главная</Link>
          <Link to="/catalog" className="text-gray-700 hover:text-[#FF385C] font-medium no-underline">Каталог</Link>
        </nav>

        <Space size="large">
          <Badge count={favoritesCount} size="small" offset={[-2, 2]}>
            <Link to="/favorites" className="text-gray-700 hover:text-[#FF385C] text-xl">
              <HeartOutlined />
            </Link>
          </Badge>

          <Badge count={cartCount} size="small" offset={[-2, 2]}>
            <Link to="/cart" className="text-gray-700 hover:text-[#FF385C] text-xl">
              <ShoppingCartOutlined />
            </Link>
          </Badge>

          {isAuthenticated ? (
            <Dropdown menu={{ items }} placement="bottomRight">
              <Button shape="circle" icon={<UserOutlined />} className="border-gray-300 text-gray-700" />
            </Dropdown>
          ) : (
            <Button type="primary" className="bg-[#FF385C] border-[#FF385C] hover:bg-[#e0314f]" onClick={() => setModalOpen(true)}>
              Войти
            </Button>
          )}
        </Space>
      </div>
      <AuthModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </header>
  );
}