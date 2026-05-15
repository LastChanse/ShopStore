import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import AppLayout from './components/AppLayout.tsx';
import CatalogPage from './pages/CatalogPage.tsx';
import ProductPage from './pages/ProductPage.tsx';
import FavoritesPage from './pages/FavoritesPage.tsx';
import CartPage from './pages/CartPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import HomePage from "./pages/HomePage.tsx";

// Цвета из макета Figma: оранжевый акцент, бежевый фон
const theme = {
  token: {
    colorPrimary: '#FF6B2B',
    colorBgContainer: '#ffffff',
    colorBgLayout: '#F5F0E8',
    borderRadius: 8,
    fontFamily: "'Nunito', 'Segoe UI', sans-serif",
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