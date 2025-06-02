import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Noise-Cancelling Headphones',
    price: 299.99,
    description: 'Premium wireless headphones with active noise cancellation, 30-hour battery life, and superior sound quality.',
    image: 'headphones.webp',
    category: 'Electronics',
    rating: 4.5,
    reviews: [
      {
        id: 'r1',
        userId: 'u1',
        userName: 'John Doe',
        rating: 5,
        comment: 'Best headphones I\'ve ever owned!',
        date: '2024-03-15',
      },
    ],
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    price: 199.99,
    description: 'Track your fitness goals with this advanced smartwatch featuring heart rate monitoring, GPS, and sleep tracking.',
    image: 'watch.webp',
    category: 'Electronics',
    rating: 4.3,
    reviews: [
      {
        id: 'r2',
        userId: 'u2',
        userName: 'Jane Smith',
        rating: 4,
        comment: 'Great features for the price',
        date: '2024-03-14',
      },
    ],
  },
  {
    id: '3',
    name: 'Premium Coffee Maker',
    price: 159.99,
    description: 'Programmable coffee maker with built-in grinder, thermal carafe, and multiple brew strength options.',
    image: 'coffee_machine.webp',
    category: 'Home & Kitchen',
    rating: 4.7,
    reviews: [
      {
        id: 'r3',
        userId: 'u3',
        userName: 'Mike Johnson',
        rating: 5,
        comment: 'Makes perfect coffee every time!',
        date: '2024-03-13',
      },
    ],
  },
  {
    id: '4',
    name: 'Ergonomic Office Chair',
    price: 249.99,
    description: 'Comfortable office chair with adjustable lumbar support, armrests, and breathable mesh back.',
    image: 'chair.webp',
    category: 'Furniture',
    rating: 4.4,
    reviews: [
      {
        id: 'r4',
        userId: 'u4',
        userName: 'Sarah Wilson',
        rating: 4,
        comment: 'Very comfortable for long work hours',
        date: '2024-03-12',
      },
    ],
  },
]; 