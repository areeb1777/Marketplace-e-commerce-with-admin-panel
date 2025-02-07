// src/sanity/fetch.ts
import { client } from "./client";
import { Product } from "@/app/types/Product";

export const fetchLatestProducts = async (): Promise<Product[]> => {
  const query = `*[_type == "product"] | order(_createdAt desc)[0...4] {
    _id,
    title,
    shortDescription,
    slug {
      current
    },
    price,
    salePrice,
    featureImage{
      asset->{
        _id,
        url
      }
    },
    additionalImages[]{
      asset->{
        _id,
        url
      }
    },
    description,
    width,
    height,
    depth,
    features,
    stock,
    category->{name},
    brand->{name},
    _createdAt,
    _updatedAt
  }`;

  return await client.fetch(query);
};

export const fetchPopularProducts = async (): Promise<Product[]> => {
  const query = `*[_type == "product"] | order(_createdAt desc)[4...7] {
  _id,
  title,
  shortDescription,
  slug {
    current
  },
  price,
  salePrice,
  featureImage{
    asset->{
      _id,
      url
    }
  },
  additionalImages[]{
    asset->{
      _id,
      url
    }
  },
  description,
  width,
  height,
  depth,
  features,
  stock,
  category->{name},
  brand->{name},
  _createdAt,
  _updatedAt
}
`;

  return await client.fetch(query);
};

export const fetchAllProducts = async (): Promise<Product[]> => {
  const query = `*[_type == "product"] | order(title asc) {
  _id,
  title,
  shortDescription,
  slug {
    current
  },
  price,
  salePrice,
  featureImage{
    asset->{
      _id,
      url
    }
  },
  additionalImages[]{
    asset->{
      _id,
      url
    }
  },
  description,
  width,
  height,
  depth,
  features,
  stock,
  category->{name},
  brand->{name},
  _createdAt,
  _updatedAt
}
`;

  return await client.fetch(query);
};

export const fetchProductsByCategory = async (
  categoryName: string
): Promise<Product[]> => {
  const query = `*[_type == "product" && category->name == $categoryName] | order(_createdAt desc) {
    _id,
    title,
    shortDescription,
    slug {
      current
    },
    price,
    salePrice,
    featureImage{
      asset->{
        _id,
        url
      }
    },
    additionalImages[]{
      asset->{
        _id,
        url
      }
    },
    description,
    width,
    height,
    depth,
    features,
    stock,
    category->{name},
    brand->{name},
    _createdAt,
    _updatedAt
  }`;

  return await client.fetch(query, { categoryName });
};
