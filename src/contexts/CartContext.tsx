import { createContext, useContext, useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: { id: number; name: string; price: number; image: string }, size: string, color: string) => void;
  removeFromCart: (itemId: number, size: string, color: string) => void;
  updateQuantity: (itemId: number, size: string, color: string, newQuantity: number) => void;
  toggleFavorite: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
  cartCount: number;
  cartTotal: number;
  favoritesCount: number;
  favorites: number[];
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};

// ── ключи localStorage ────────────────────────────────────────────────────────
const cartKey = (email: string | null) => `cart_${email ?? 'guest'}`;
const favKey      = (email: string | null) => `favorites_${email ?? 'guest'}`;

const loadJSON = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
};

const mergeCart = (base: CartItem[], incoming: CartItem[]): CartItem[] => {
  const result = [...base];
  for (const item of incoming) {
    const idx = result.findIndex(
      r => r.id === item.id && r.size === item.size && r.color === item.color
    );
    if (idx >= 0) result[idx] = { ...result[idx], quantity: result[idx].quantity + item.quantity };
    else result.push(item);
  }
  return result;
};

// ── провайдер ─────────────────────────────────────────────────────────────────
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const email = user?.email ?? null;

  const [cartItems, setCartItems] = useState<CartItem[]>(() => loadJSON(cartKey(email), []));
  const [favorites, setFavorites]    = useState<number[]>(() => loadJSON(favKey(email), []));

  // Отслеживаем предыдущий email для обнаружения смены пользователя
  const prevEmailRef = useRef<string | null>(email);

  useEffect(() => {
    const prev = prevEmailRef.current;
    if (email === prev) return;

    if (email !== null) {
      // ── Вход ──────────────────────────────────────────────────────────────
      // Корзина: мержим гостевую в пользовательскую
      const guestCart = loadJSON<CartItem[]>(cartKey(null), []);
      const userCart  = loadJSON<CartItem[]>(cartKey(email), []);
      const merged = mergeCart(userCart, guestCart);
      setCartItems(merged);
      localStorage.setItem(cartKey(email), JSON.stringify(merged));
      localStorage.setItem(cartKey(null), JSON.stringify([])); // очищаем гостевую

      // Избранное: у каждого пользователя своё, гостевое не переносим
      const userFavs = loadJSON<number[]>(favKey(email), []);
      setFavorites(userFavs);

    } else {
      // ── Выход ─────────────────────────────────────────────────────────────
      // Возвращаем гостевые данные (корзина пользователя уже сохранена эффектом ниже)
      setCartItems(loadJSON(cartKey(null), []));
      setFavorites(loadJSON(favKey(null), []));
    }

    prevEmailRef.current = email;
  }, [email]);

  // Сохраняем корзину при изменении
  useEffect(() => {
    localStorage.setItem(cartKey(email), JSON.stringify(cartItems));
  }, [cartItems, email]);

  // Сохраняем избранное при изменении
  useEffect(() => {
    localStorage.setItem(favKey(email), JSON.stringify(favorites));
  }, [favorites, email]);

  // ── actions ───────────────────────────────────────────────────────────────
  const addToCart = (
    product: { id: number; name: string; price: number; image: string },
    size: string,
    color: string,
  ) => {
    setCartItems(prev => {
      const existing = prev.find(
        item => item.id === product.id && item.size === size && item.color === color
      );
      if (existing) {
        return prev.map(item =>
          item.id === existing.id && item.size === size && item.color === color
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, size, color, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: number, size: string, color: string) => {
    setCartItems(prev =>
      prev.filter(item => !(item.id === itemId && item.size === size && item.color === color))
    );
  };

  const updateQuantity = (itemId: number, size: string, color: string, newQuantity: number) => {
    if (newQuantity <= 0) { removeFromCart(itemId, size, color); return; }
    setCartItems(prev =>
      prev.map(item =>
        item.id === itemId && item.size === size && item.color === color
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const toggleFavorite = (productId: number) => {
    setFavorites(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const isFavorite = (productId: number) => favorites.includes(productId);

  const clearCart = () => setCartItems([]);

  const cartCount  = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal  = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems, addToCart, removeFromCart, updateQuantity, clearCart,
      toggleFavorite, isFavorite,
      cartCount, cartTotal,
      favoritesCount: favorites.length, favorites,
    }}>
      {children}
    </CartContext.Provider>
  );
};