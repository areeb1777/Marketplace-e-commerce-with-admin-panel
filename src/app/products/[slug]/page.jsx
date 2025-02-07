import React from 'react';
import { client } from '@/sanity/lib/client';
import ProductClient from './ProductClient';

const fetchProduct = async (slug) => {
  const query = `*[_type == "product" && slug.current == $slug][0] {
    _id,
    title,
    description,
    price,
    featureImage {
      asset-> {
        _id,
        url
      }
    },
    additionalImages[] {
      asset-> {
        _id,
        url
      }
    },
    slug,
    height,
    width,
    depth,
    features,
    quantity,
    category -> { name },
    _createdAt,
    _updatedAt
  }`;

  const product = await client.fetch(query, { slug });
  return product;
};

const ProductPage = async ({ params }) => {
  const { slug } = params;
  const product = await fetchProduct(slug);

  console.log('Fetched Product:', product);

  if (!product) {
    return <div>Product not found</div>;
  }

  return <ProductClient product={product} />;
};

export async function generateStaticParams() {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }`;

  const products = await client.fetch(query);
  return products
    .filter(product => product.slug && product.slug.current)
    .map((product) => ({
      params: { slug: product.slug.current },
    }));
}

export default ProductPage;
