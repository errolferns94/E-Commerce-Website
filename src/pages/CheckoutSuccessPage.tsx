import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const CheckoutSuccessPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto text-center">
      <div className="bg-white shadow-soft rounded-lg p-8">
        <div className="flex flex-col items-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
            <CheckCircleIcon className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="mt-6 text-3xl font-bold text-gray-900">
            Order Confirmed!
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
          <p className="mt-2 text-gray-500">
            You will receive an email confirmation shortly.
          </p>
          <div className="mt-8 space-y-4">
            <Link
              to="/products"
              className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:mx-2"
            >
              Continue Shopping
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:mx-2"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccessPage; 