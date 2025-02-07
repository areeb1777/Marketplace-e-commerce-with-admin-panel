import { createClient } from 'next-sanity';
import toast from 'react-hot-toast';
import { Router } from 'next/router';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2021-10-21',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN!,
});

export const deleteProduct = async (id: string, mutate: () => void) => {
  const confirmDelete = window.confirm('Are you sure you want to delete this product?');
  if (confirmDelete) {
    try {
      await client.delete(id);
      toast.success('Product deleted successfully!');
      mutate();
    } catch (err) {
      toast.error('Failed to delete product');
    }
  }
};

export const editProduct = (router: Router, product: any) => {
  router.push(`/admin/products/form?productId=${product._id}`);
};
