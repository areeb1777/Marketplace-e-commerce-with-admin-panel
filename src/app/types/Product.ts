// src/types/Product.ts
export interface Product {
  _id: string;
  name: string;
  title: string;
  shortDescription: string;
  description: string;
  price: number;
  salePrice: number;
  image?: {
    asset: {
      _id: string;
      url: string;
    };
  };
  featureImage?: {
    asset: {
      _id: string;
      url: string;
    };
  };
  additionalImages?: {
    asset: {
      _id: string;
      url: string;
    };
  }[];
  slug: {
    current: string;
  };

  height: string;
  width: string;
  depth: string;
  features: string[];
  stock: number;
  quantity: number;
  category: {
    name: string;
  };
  brand: {
    name: string;
  };
  orders: number;
  _createdAt: string;
  _updatedAt: string;
}
