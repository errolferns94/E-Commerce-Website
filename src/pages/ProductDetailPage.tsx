import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { products } from '../data/products';
import { addToCart } from '../store/cartSlice';
import { StarIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';
import { getImageUrl } from '../utils/imageUtils';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
        <button
          onClick={() => navigate('/products')}
          className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          Back to Products
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="bg-white rounded-lg shadow-soft">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <button
                onClick={() => navigate('/products')}
                className="text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                Products
              </button>
            </li>
            <li>
              <span className="text-sm text-gray-500">/</span>
            </li>
            <li>
              <span className="text-sm font-medium text-gray-900">
                {product.name}
              </span>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="aspect-w-4 aspect-h-3 bg-gray-200 rounded-lg overflow-hidden">
            <img
              src={getImageUrl(product.image)}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div>
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                <p className="mt-1 text-sm text-gray-500">{product.category}</p>
              </div>
              <p className="text-3xl font-bold text-primary-600">${product.price}</p>
            </div>
            
            <div className="mt-6">
              <h2 className="text-lg font-medium text-gray-900">Description</h2>
              <p className="mt-2 text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            <div className="mt-6">
              <div className="flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <StarIcon
                      key={index}
                      className={`h-5 w-5 ${
                        index < Math.floor(product.rating)
                          ? 'text-yellow-400'
                          : 'text-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-3 text-sm text-gray-500">
                  {product.rating} out of 5 stars ({product.reviews.length} reviews)
                </span>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="mt-8 w-full flex items-center justify-center rounded-md bg-primary-600 px-8 py-4 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              <ShoppingCartIcon className="h-6 w-6 mr-2" />
              Add to Cart
            </button>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Customer Reviews</h2>
          <div className="grid gap-8">
            {product.reviews.map((review) => (
              <div
                key={review.id}
                className="bg-gray-50 rounded-lg p-6 shadow-soft"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{review.userName}</h3>
                    <p className="text-sm text-gray-500">{review.date}</p>
                  </div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, index) => (
                      <StarIcon
                        key={index}
                        className={`h-4 w-4 ${
                          index < review.rating ? 'text-yellow-400' : 'text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-4 text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage; 