"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ImageOnly from "@/components/ImageOnly";
import Filters from "@/components/Filters";
import ProductListing from "@/components/ProductsListing";
import { getAllProducts, getProductsByCategory } from "@/sanity/lib/getData";
import TopNav from "@/components/TopNavbar";
import Footer from "@/components/Footer";

const ProductsPage = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (category) {
        const productsByCategory = await getProductsByCategory(category);
        setProducts(productsByCategory);
      } else {
        const allProducts = await getAllProducts();
        setProducts(allProducts);
      }
    };

    fetchProducts();
  }, [category]);

  const handleProductsChange = (filteredProducts) => {
    setProducts(filteredProducts);
  };

  return (
    <div>
      <TopNav />
      <ImageOnly />
      <Filters onProductsChange={handleProductsChange} />
      <ProductListing allProducts={products} />
      <Footer />
    </div>
  );
};

export default ProductsPage;
