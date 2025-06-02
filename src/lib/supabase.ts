import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || '';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database tables
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inventory_count: number;
  created_at: string;
  updated_at: string;
}

export interface Inventory {
  id: string;
  product_id: string;
  quantity: number;
  low_stock_threshold: number;
  created_at: string;
  updated_at: string;
}

export interface InventoryTransaction {
  id: string;
  product_id: string;
  quantity_change: number;
  transaction_type: 'restock' | 'purchase' | 'adjustment';
  notes: string;
  created_at: string;
}

// Inventory management functions
export const inventoryService = {
  // Get current inventory for a product
  async getProductInventory(productId: string) {
    const { data, error } = await supabase
      .from('inventory')
      .select('*')
      .eq('product_id', productId)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Update inventory quantity
  async updateInventory(productId: string, quantityChange: number, transactionType: 'restock' | 'purchase' | 'adjustment', notes: string = '') {
    // Start a transaction
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Unauthorized');

    // Get current inventory
    const { data: currentInventory, error: inventoryError } = await supabase
      .from('inventory')
      .select('quantity')
      .eq('product_id', productId)
      .single();

    if (inventoryError) throw inventoryError;

    const newQuantity = (currentInventory?.quantity || 0) + quantityChange;
    if (newQuantity < 0) throw new Error('Insufficient inventory');

    // Update inventory
    const { error: updateError } = await supabase
      .from('inventory')
      .update({ quantity: newQuantity })
      .eq('product_id', productId);

    if (updateError) throw updateError;

    // Record transaction
    const { error: transactionError } = await supabase
      .from('inventory_transactions')
      .insert({
        product_id: productId,
        quantity_change: quantityChange,
        transaction_type: transactionType,
        notes
      });

    if (transactionError) throw transactionError;

    return { success: true, newQuantity };
  },

  // Check if product is in stock
  async checkStock(productId: string, requestedQuantity: number = 1) {
    const { data, error } = await supabase
      .from('inventory')
      .select('quantity, low_stock_threshold')
      .eq('product_id', productId)
      .single();

    if (error) throw error;

    return {
      inStock: data.quantity >= requestedQuantity,
      isLowStock: data.quantity <= data.low_stock_threshold,
      availableQuantity: data.quantity
    };
  },

  // Get low stock products
  async getLowStockProducts() {
    const { data, error } = await supabase
      .rpc('get_low_stock_products');

    if (error) throw error;
    return data;
  },

  // Get inventory transaction history
  async getTransactionHistory(productId: string) {
    const { data, error } = await supabase
      .from('inventory_transactions')
      .select('*')
      .eq('product_id', productId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }
}; 