import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-soft sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  E-Shop
                </span>
              </Link>
              <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
                <Link
                  to="/"
                  className="text-gray-700 hover:text-primary-600 inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 border-transparent hover:border-primary-600 transition-colors duration-200"
                >
                  Home
                </Link>
                <Link
                  to="/products"
                  className="text-gray-700 hover:text-primary-600 inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 border-transparent hover:border-primary-600 transition-colors duration-200"
                >
                  Products
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <Link
                to="/cart"
                className="group p-2 relative text-gray-600 hover:text-primary-600 transition-colors duration-200"
              >
                <ShoppingCartIcon
                  className="h-6 w-6"
                  aria-hidden="true"
                />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary-600 flex items-center justify-center text-xs font-medium text-white">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <footer className="bg-white shadow-soft mt-auto">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">About Us</h3>
              <p className="text-gray-600">
                We offer the best products with exceptional quality and customer service.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/products" className="text-gray-600 hover:text-primary-600 transition-colors duration-200">
                    Products
                  </Link>
                </li>
                <li>
                  <Link to="/cart" className="text-gray-600 hover:text-primary-600 transition-colors duration-200">
                    Cart
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact</h3>
              <p className="text-gray-600">
                Email: support@eshop.com<br />
                Phone: (555) 123-4567
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-center text-gray-500 text-sm">
              © 2024 E-Shop. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 