import { client } from './client';
import { fetchLatestProducts, fetchPopularProducts, fetchAllProducts, fetchProductsByCategory } from '../lib/fetch';
import { Product } from '@/app/types/Product';

export const getCategories = async () => {
  const query = `*[_type == "category"]{_id, name}`;
  return await client.fetch(query);
};

export const getLatestProducts = async (): Promise<Product[]> => {
  return await fetchLatestProducts();
};

export const getPopularProducts = async (): Promise<Product[]> => {
  return await fetchPopularProducts();
};

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const data = await fetchAllProducts();
    console.log('Fetched Products:', data);
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const getProductsByCategory = async (categoryName: string): Promise<Product[]> => {
  try {
    const data = await fetchProductsByCategory(categoryName);
    console.log('Fetched Products by Category:', data);
    return data;
  } catch (error) {
    console.error(`Error fetching products by category (${categoryName}):`, error);
    return [];
  }
};
