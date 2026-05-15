export interface Product {
  id: number;
  name: string;
  category: 'men' | 'women' | 'kids';
  price: number;
  oldPrice?: number;
  image: string;
  sizes: string[];
  colors: string[];
  description: string;
  rating: number;
  reviews: number;
  brand: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Футболка UZcotton мужская',
    category: 'men',
    price: 1051,
    oldPrice: 1699,
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['белый', 'синий'],
    description: 'Футболка из хлопка с круглым вырезом. Удобная и практичная.',
    rating: 4.9,
    reviews: 567,
    brand: 'UZcotton'
  },
  {
    id: 2,
    name: 'Платье женское летнее',
    category: 'women',
    price: 2499,
    oldPrice: 3999,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['красный', 'зеленый'],
    description: 'Легкое летнее платье из натурального хлопка. Идеально для жаркой погоды.',
    rating: 4.7,
    reviews: 328,
    brand: 'Zarina'
  },
  {
    id: 3,
    name: 'Костюм детский спортивный',
    category: 'kids',
    price: 1899,
    oldPrice: 2799,
    image: 'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=400&h=400&fit=crop',
    sizes: ['104', '110', '116', '122'],
    colors: ['синий', 'серый'],
    description: 'Удобный спортивный костюм для активных игр.',
    rating: 4.8,
    reviews: 215,
    brand: 'Acoola'
  },
  {
    id: 4,
    name: 'Джинсы мужские прямые',
    category: 'men',
    price: 3299,
    oldPrice: 4999,
    image: 'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=400&h=400&fit=crop',
    sizes: ['30', '32', '34', '36'],
    colors: ['синий', 'черный'],
    description: 'Классические прямые джинсы из плотного денима.',
    rating: 4.6,
    reviews: 142,
    brand: 'Wrangler'
  },
  {
    id: 5,
    name: 'Блузка женская офисная',
    category: 'women',
    price: 1799,
    oldPrice: 2499,
    image: 'https://images.unsplash.com/photo-1594226801341-41427b4e5c22?w=400&h=400&fit=crop',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['белый', 'голубой'],
    description: 'Элегантная блузка для офиса из шелковистой ткани.',
    rating: 4.5,
    reviews: 89,
    brand: 'Ostin'
  },
  {
    id: 6,
    name: 'Кроссовки детские',
    category: 'kids',
    price: 2199,
    oldPrice: 3499,
    image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400&h=400&fit=crop',
    sizes: ['28', '29', '30', '31', '32'],
    colors: ['черный', 'розовый'],
    description: 'Легкие кроссовки для бега и прогулок.',
    rating: 4.8,
    reviews: 376,
    brand: 'Reebok'
  }
];