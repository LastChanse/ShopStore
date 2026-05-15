import { createContext, useContext, useState, useEffect} from 'react';
import type {ReactNode} from 'react';

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
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToCart = (product: { id: number; name: string; price: number; image: string }, size: string, color: string) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id && item.size === size && item.color === color);
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
    setCartItems(prev => prev.filter(item => !(item.id === itemId && item.size === size && item.color === color)));
  };

  const updateQuantity = (itemId: number, size: string, color: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId, size, color);
      return;
    }
    setCartItems(prev => prev.map(item =>
      item.id === itemId && item.size === size && item.color === color
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]);
  };

  const isFavorite = (productId: number) => favorites.includes(productId);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      toggleFavorite,
      isFavorite,
      cartCount,
      cartTotal,
      favoritesCount: favorites.length,
      favorites,
    }}>
      {children}
    </CartContext.Provider>
  );
};