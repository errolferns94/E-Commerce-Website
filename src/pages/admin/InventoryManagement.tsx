import React, { useEffect, useState } from 'react';
import { supabase, inventoryService, Product, Inventory, InventoryTransaction } from '../../lib/supabase';
import { PlusIcon, MinusIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { getImageUrl } from '../../utils/imageUtils';

interface ProductWithInventory extends Product {
  inventory: Inventory;
  transactions: InventoryTransaction[];
}

const InventoryManagement: React.FC = () => {
  const [products, setProducts] = useState<ProductWithInventory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<ProductWithInventory | null>(null);
  const [quantity, setQuantity] = useState('');
  const [notes, setNotes] = useState('');
  const [transactionType, setTransactionType] = useState<'restock' | 'adjustment'>('restock');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      // Get products with their inventory
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select(`
          *,
          inventory (*)
        `);

      if (productsError) throw productsError;

      // Get transactions for all products
      const { data: transactionsData, error: transactionsError } = await supabase
        .from('inventory_transactions')
        .select('*')
        .order('created_at', { ascending: false });

      if (transactionsError) throw transactionsError;

      // Combine the data
      const productsWithData = productsData.map((product: any) => ({
        ...product,
        inventory: product.inventory[0],
        transactions: transactionsData.filter((t: InventoryTransaction) => t.product_id === product.id)
      }));

      setProducts(productsWithData);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInventoryUpdate = async () => {
    if (!selectedProduct || !quantity) return;

    try {
      const quantityChange = transactionType === 'restock' 
        ? Math.abs(parseInt(quantity))
        : parseInt(quantity);

      await inventoryService.updateInventory(
        selectedProduct.id,
        quantityChange,
        transactionType,
        notes
      );

      // Reload products to get updated data
      await loadProducts();
      
      // Reset form
      setQuantity('');
      setNotes('');
      setSelectedProduct(null);
    } catch (error) {
      console.error('Error updating inventory:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Inventory Management
          </h2>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Product List */}
        <div className="lg:col-span-8">
          <div className="bg-white shadow-soft rounded-lg">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Current Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={getImageUrl(product.image)}
                              alt={product.name}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {product.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {product.category}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {product.inventory.quantity}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {product.inventory.quantity <= product.inventory.low_stock_threshold ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Low Stock
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            In Stock
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          onClick={() => setSelectedProduct(product)}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Update Inventory Form */}
        <div className="lg:col-span-4">
          <div className="bg-white shadow-soft rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">
              {selectedProduct ? 'Update Inventory' : 'Select a Product'}
            </h3>
            {selectedProduct ? (
              <form onSubmit={(e) => { e.preventDefault(); handleInventoryUpdate(); }}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Transaction Type
                    </label>
                    <select
                      value={transactionType}
                      onChange={(e) => setTransactionType(e.target.value as 'restock' | 'adjustment')}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="restock">Restock</option>
                      <option value="adjustment">Adjustment</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Quantity
                    </label>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Notes
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Update Inventory
                  </button>
                </div>
              </form>
            ) : (
              <p className="text-gray-500 text-sm">
                Select a product from the list to update its inventory.
              </p>
            )}
          </div>

          {/* Transaction History */}
          {selectedProduct && (
            <div className="mt-6 bg-white shadow-soft rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Recent Transactions
              </h3>
              <div className="space-y-4">
                {selectedProduct.transactions.slice(0, 5).map((transaction) => (
                  <div
                    key={transaction.id}
                    className="border-l-4 border-primary-500 pl-4 py-2"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {transaction.transaction_type === 'restock' ? 'Restocked' : 'Adjusted'}:{' '}
                          {transaction.quantity_change > 0 ? '+' : ''}
                          {transaction.quantity_change}
                        </p>
                        {transaction.notes && (
                          <p className="text-sm text-gray-500 mt-1">
                            {transaction.notes}
                          </p>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">
                        {new Date(transaction.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InventoryManagement; 