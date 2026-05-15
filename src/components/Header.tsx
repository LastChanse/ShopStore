import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Badge, Dropdown, Input } from 'antd';
import {
  HeartOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  SearchOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext.tsx';
import { useCart } from '../contexts/CartContext.tsx';
import AuthModal from './AuthModal.tsx';

export default function Header() {
  const [modalOpen, setModalOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { cartCount, favoritesCount } = useCart();
  const navigate = useNavigate();

  const userMenuItems = [
    {
      key: 'favorites',
      label: <Link to="/favorites" className="text-gray-700">Избранное</Link>,
      icon: <HeartOutlined />,
    },
    {
      key: 'logout',
      label: 'Выйти',
      onClick: () => { logout(); navigate('/'); },
    },
  ];

  return (
    <header style={{ background: '#fff', borderBottom: '1px solid #E8E0D0' }} className="sticky top-0 z-50 shadow-sm">
      <div className="max-w-[1200px] mx-auto px-4 h-16 flex items-center gap-4">

        <Link to="/" className="flex items-center gap-2 no-underline flex-shrink-0">
          <span style={{ fontSize: 28 }}>🐧</span>
          <span style={{ color: '#FF6B2B', fontWeight: 800, fontSize: 18, letterSpacing: '-0.5px', lineHeight: 1 }}>
            СЕВЕРЯНОЧКА
          </span>
        </Link>

        <Link to="/catalog">
          <Button
            icon={<UnorderedListOutlined />}
            style={{
              background: '#FF6B2B',
              borderColor: '#FF6B2B',
              color: '#fff',
              fontWeight: 600,
              borderRadius: 8,
              flexShrink: 0,
            }}
          >
            Каталог
          </Button>
        </Link>

        <div className="flex-1 max-w-[480px]">
          <Input
            placeholder="Найти товар"
            prefix={<SearchOutlined style={{ color: '#aaa' }} />}
            style={{ borderRadius: 8, borderColor: '#E0D8CC', background: '#FAF7F2' }}
            size="large"
          />
        </div>

        <div className="flex items-center gap-5 ml-auto flex-shrink-0">

          <Link to="/favorites" className="flex flex-col items-center gap-0.5 no-underline text-gray-600 hover:text-[#FF6B2B]">
            <Badge count={favoritesCount} size="small">
              <HeartOutlined style={{ fontSize: 22 }} />
            </Badge>
            <span style={{ fontSize: 11 }}>Избранное</span>
          </Link>

          <Link to="/cart" className="flex flex-col items-center gap-0.5 no-underline text-gray-600 hover:text-[#FF6B2B]">
            <Badge count={cartCount} size="small">
              <ShoppingCartOutlined style={{ fontSize: 22 }} />
            </Badge>
            <span style={{ fontSize: 11 }}>Корзина</span>
          </Link>

          {isAuthenticated ? (
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <button
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#FF6B2B',
                  fontWeight: 600,
                  fontSize: 13,
                }}
              >
                <UserOutlined style={{ fontSize: 22, color: '#FF6B2B' }} />
                <span style={{ fontSize: 11 }}>{user?.name}</span>
              </button>
            </Dropdown>
          ) : (
            <button
              onClick={() => setModalOpen(true)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#888',
              }}
            >
              <UserOutlined style={{ fontSize: 22 }} />
              <span style={{ fontSize: 11 }}>Войти</span>
            </button>
          )}
        </div>
      </div>

      <AuthModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </header>
  );
}