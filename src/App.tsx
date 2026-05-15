import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import AppLayout from './components/AppLayout/AppLayout';
import CatalogPage from './pages/CatalogPage/CatalogPage';
import ProductPage from './pages/ProductPage/ProductPage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import CartPage from './pages/CartPage/CartPage';
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from "./pages/HomePage/HomePage.tsx";

const theme = {
  token: {
    colorPrimary: '#FF385C',
    colorBgContainer: '#ffffff',
    colorBgLayout: '#f7f7f7',
    borderRadius: 12,
  },
};

export default function App() {
  return (
    <ConfigProvider theme={theme}>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <AppLayout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/catalog" element={<CatalogPage />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/login" element={<LoginPage />} />
              </Routes>
            </AppLayout>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </ConfigProvider>
  );
}