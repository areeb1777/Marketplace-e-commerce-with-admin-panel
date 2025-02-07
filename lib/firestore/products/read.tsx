"use client";

import React, { useState, useEffect } from "react";
import useSWR from "swr";
import Image from "next/image";
import { fetcher } from "../../../src/sanity/lib/utils/fetcher";
import { createClient } from "next-sanity";
import { ChevronLeft, ChevronRight } from "lucide-react";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2021-10-21",
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN!,
});

const fetchProductsQuery = (page: number, pageSize: number) => `
  *[_type == "product"] | order(_createdAt desc) [${page * pageSize}...${(page + 1) * pageSize}] {
    _id, title, shortDescription, price, salePrice, stock, orders, "featureImage": featureImage.asset->url, description
  }
`;

const ReadProducts = () => {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 5;

  const { data, error, isLoading, mutate } = useSWR(fetchProductsQuery(page, pageSize), fetcher);

  useEffect(() => {
    const fetchTotalCount = async () => {
      const totalCountQuery = `count(*[_type == "product"])`;
      const totalCount = await client.fetch(totalCountQuery);
      setTotalPages(Math.ceil(totalCount / pageSize));
    };
    fetchTotalCount();
  }, [pageSize]);

  if (error) return <div>Failed to load products: {error}</div>;
  if (isLoading) return <div>Loading...</div>;

  const handleNextPage = () => {
    if (page < totalPages - 1) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 0) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handlePageClick = (pageIndex: number) => {
    setPage(pageIndex);
  };

  return (
    <div className="flex-1 bg-white rounded-xl p-5 w-full">
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-transparent">
          <thead className="bg-white">
            <tr>
              <th className="py-2 w-1/12">SN</th>
              <th className="py-2 w-1/12">Image</th>
              <th className="py-2 w-2/12">Title</th>
              <th className="py-2 w-2/12">Price</th>
              <th className="py-2 w-1/12">Stock</th>
              <th className="py-2 w-1/12">Orders</th>
              <th className="py-2 w-1/12">Status</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((product: any, index: number) => {
              const availableStock = product.stock - (product.orders || 0);
              return (
                <tr key={product._id} className="text-center bg-white h-20">
                  <td className="border px-2 py-2">{index + 1 + page * pageSize}</td>
                  <td className="border px-2 py-2">
                    {product.featureImage && (
                      <Image
                        src={product.featureImage}
                        alt={product.title}
                        width={60}
                        height={60}
                        className="rounded-lg object-cover mx-auto"
                      />
                    )}
                  </td>
                  <td className="border px-2 py-2">{product.title}</td>
                  <td className="border px-2 py-2">
                    <div className="flex items-center justify-center">
                      <span className="line-through mr-2">£{product.price}</span>
                      <span className="font-semibold">£{product.salePrice}</span>
                    </div>
                  </td>
                  <td className="border px-2 py-2">{availableStock}</td>
                  <td className="border px-2 py-2">{product.orders || 0}</td>
                  <td className="border px-2 py-2">
                    {availableStock <= 0 ? (
                      <span className="text-red-500 bg-red-100 font-semibold py-1 px-3 rounded whitespace-nowrap">
                        Out of Stock
                      </span>
                    ) : (
                      <span className="text-green-500 bg-green-100 font-semibold py-1 px-3 rounded whitespace-nowrap">
                        Available
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
          <button
            onClick={handlePrevPage}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded flex items-center mb-2 sm:mb-0"
            disabled={page === 0}
          >
            <ChevronLeft size={20} />
            Previous
          </button>
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageClick(index)}
                className={`px-3 py-2 rounded ${page === index ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <button
            onClick={handleNextPage}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded flex items-center"
            disabled={page === totalPages - 1}
          >
            Next
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReadProducts;
