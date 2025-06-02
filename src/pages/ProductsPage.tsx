import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { products } from '../data/products';
import { addToCart } from '../store/cartSlice';
import { StarIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';
import { getImageUrl } from '../utils/imageUtils';

const ProductsPage: React.FC = () => {
  const dispatch = useDispatch();

  const handleAddToCart = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      dispatch(addToCart(product));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Our Products</h1>
        <div className="flex gap-4">
          <select className="bg-white border border-gray-300 rounded-md py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Home & Kitchen</option>
            <option>Furniture</option>
          </select>
          <select className="bg-white border border-gray-300 rounded-md py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
            <option>Sort by: Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Rating</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="group relative bg-white rounded-lg shadow-soft overflow-hidden transform transition duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="aspect-w-4 aspect-h-3 bg-gray-200 group-hover:opacity-75">
              <img
                src={getImageUrl(product.image)}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-primary-600">
                    <Link to={`/products/${product.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                </div>
                <p className="text-lg font-medium text-primary-600">
                  ${product.price}
                </p>
              </div>
              <div className="mt-2 flex items-center">
                {[...Array(5)].map((_, index) => (
                  <StarIcon
                    key={index}
                    className={`h-4 w-4 ${
                      index < Math.floor(product.rating)
                        ? 'text-yellow-400'
                        : 'text-gray-200'
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-500">
                  ({product.reviews.length})
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                {product.description}
              </p>
              <button
                onClick={() => handleAddToCart(product.id)}
                className="mt-4 w-full flex items-center justify-center rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                <ShoppingCartIcon className="h-5 w-5 mr-2" />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage; 