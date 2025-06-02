import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../store';
import { removeFromCart, updateQuantity } from '../store/cartSlice';
import { TrashIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { getImageUrl } from '../utils/imageUtils';

const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const { items, total } = useSelector((state: RootState) => state.cart);

  const handleQuantityChange = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ productId, quantity }));
  };

  const handleRemoveItem = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-gray-900">Your cart is empty</h2>
        <p className="mt-4 text-gray-500">
          Add some products to your cart to continue shopping.
        </p>
        <Link
          to="/products"
          className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <div className="bg-white shadow-soft rounded-lg overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {items.map((item) => (
                <li key={item.product.id} className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-24 h-24 rounded-md overflow-hidden">
                      <img
                        src={getImageUrl(item.product.image)}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-6 flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            <Link
                              to={`/products/${item.product.id}`}
                              className="hover:text-primary-600"
                            >
                              {item.product.name}
                            </Link>
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            ${item.product.price}
                          </p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center border border-gray-200 rounded-md">
                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  item.product.id,
                                  item.quantity - 1
                                )
                              }
                              className="p-2 hover:bg-gray-50"
                            >
                              <MinusIcon className="h-4 w-4 text-gray-400" />
                            </button>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) =>
                                handleQuantityChange(
                                  item.product.id,
                                  parseInt(e.target.value)
                                )
                              }
                              className="w-12 text-center border-x border-gray-200 py-1 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  item.product.id,
                                  item.quantity + 1
                                )
                              }
                              className="p-2 hover:bg-gray-50"
                            >
                              <PlusIcon className="h-4 w-4 text-gray-400" />
                            </button>
                          </div>
                          <button
                            onClick={() => handleRemoveItem(item.product.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="lg:col-span-4">
          <div className="bg-white shadow-soft rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
            <div className="mt-6 space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span className="text-gray-900">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between">
                  <span className="text-lg font-medium text-gray-900">Total</span>
                  <span className="text-lg font-medium text-primary-600">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
              <Link
                to="/checkout"
                className="mt-6 w-full flex items-center justify-center rounded-md bg-primary-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage; 