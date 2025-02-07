"use client";

import React from "react";
import { useBrands } from "../../../../../../lib/firestore/brands/read";
import { useCategories } from "../../../../../../lib/firestore/categories/read";

interface Brand {
  _id: string;
  name: string;
}

interface Category {
  _id: string;
  name: string;
}

interface BasicDetailsProps {
  data: { [key: string]: any };
  handleData: (key: string, value: any) => void;
}

const BasicDetails: React.FC<BasicDetailsProps> = ({ data, handleData }) => {
  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    handleData(event.target.name, event.target.value);
  };

  const { data: brands } = useBrands();
  const { data: categories } = useCategories();

  return (
    <section className="flex-1 flex flex-col gap-3 bg-white rounded-xl p-4 border">
      <h1 className="font-semibold">Basic Details</h1>

      {/* Product Name */}
      <div className="flex flex-col gap-1">
        <label className="text-gray-500 text-xs" htmlFor="product-title">
          Product Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter Title"
          id="product-title"
          name="product-title"
          onChange={handleChange}
          className="border px-4 py-2 rounded-lg w-full outline-none"
          required
          value={data["product-title"] || ""}
        />
      </div>

      {/* Product Slug */}
      <div className="flex flex-col gap-1">
        <label className="text-gray-500 text-xs" htmlFor="product-slug">
          Product Slug <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter Slug"
          id="product-slug"
          name="product-slug"
          onChange={handleChange}
          className="border px-4 py-2 rounded-lg w-full outline-none"
          required
          value={data["product-slug"] || ""}
        />
      </div>

      {/* Short Description */}
      <div className="flex flex-col gap-1">
        <label
          className="text-gray-500 text-xs"
          htmlFor="product-short-description"
        >
          Short Description <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter Short Description"
          id="product-short-description"
          name="product-short-description"
          onChange={handleChange}
          className="border px-4 py-2 rounded-lg w-full outline-none"
          required
          value={data["product-short-description"] || ""}
        />
      </div>

      {/* Brand */}
      <div className="flex flex-col gap-1">
        <label className="text-gray-500 text-xs" htmlFor="product-brand">
          Brand <span className="text-red-500">*</span>
        </label>
        <select
          id="product-brand"
          name="product-brand"
          onChange={handleChange}
          className="border px-4 py-2 rounded-lg w-full outline-none"
          required
          value={data["product-brand"] || ""}
        >
          <option value="">Select Brand</option>
          {brands?.map((item: Brand) => (
            <option value={item._id} key={item._id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {/* Category */}
      <div className="flex flex-col gap-1">
        <label className="text-gray-500 text-xs" htmlFor="product-category">
          Category <span className="text-red-500">*</span>
        </label>
        <select
          id="product-category"
          name="product-category"
          onChange={handleChange}
          className="border px-4 py-2 rounded-lg w-full outline-none"
          required
          value={data["product-category"] || ""}
        >
          <option value="">Select Category</option>
          {categories?.map((item: Category) => (
            <option value={item._id} key={item._id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {/* Stock */}
      <div className="flex flex-col gap-1">
        <label className="text-gray-500 text-xs" htmlFor="product-stock">
          Stock <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          placeholder="Enter Stock"
          id="product-stock"
          name="product-stock"
          onChange={handleChange}
          className="border px-4 py-2 rounded-lg w-full outline-none"
          required
          value={data["product-stock"] || ""}
        />
      </div>

      {/* Price */}
      <div className="flex flex-col gap-1">
        <label className="text-gray-500 text-xs" htmlFor="product-price">
          Price <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          placeholder="Enter Price"
          id="product-price"
          name="product-price"
          onChange={handleChange}
          className="border px-4 py-2 rounded-lg w-full outline-none"
          required
          value={data["product-price"] || ""}
        />
      </div>

      {/* Sale Price */}
      <div className="flex flex-col gap-1">
        <label className="text-gray-500 text-xs" htmlFor="product-sale-price">
          Sale Price <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          placeholder="Enter Sale Price"
          id="product-sale-price"
          name="product-sale-price"
          onChange={handleChange}
          className="border px-4 py-2 rounded-lg w-full outline-none"
          required
          value={data["product-sale-price"] || ""}
        />
      </div>

      {/* Dimensions */}
      <div className="flex flex-col gap-1">
        <label className="text-gray-500 text-xs" htmlFor="product-width">
          Width <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          placeholder="Enter Width"
          id="product-width"
          name="product-width"
          onChange={handleChange}
          className="border px-4 py-2 rounded-lg w-full outline-none"
          required
          value={data["product-width"] || ""}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-gray-500 text-xs" htmlFor="product-height">
          Height <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          placeholder="Enter Height"
          id="product-height"
          name="product-height"
          onChange={handleChange}
          className="border px-4 py-2 rounded-lg w-full outline-none"
          required
          value={data["product-height"] || ""}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-gray-500 text-xs" htmlFor="product-depth">
          Depth <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          placeholder="Enter Depth"
          id="product-depth"
          name="product-depth"
          onChange={handleChange}
          className="border px-4 py-2 rounded-lg w-full outline-none"
          required
          value={data["product-depth"] || ""}
        />
      </div>

      {/* Features */}
      <div className="flex flex-col gap-1">
        <label className="text-gray-500 text-xs" htmlFor="product-features">
          Features <span className="text-red-500">*</span>
        </label>
        <textarea
          placeholder="Enter Features"
          id="product-features"
          name="product-features"
          onChange={handleChange}
          className="border px-4 py-2 rounded-lg w-full outline-none"
          required
          value={data["product-features"] || ""}
          rows={4}
        />
      </div>

      {/* Orders */}
      <div className="flex flex-col gap-1">
        <label className="text-gray-500 text-xs" htmlFor="product-orders">
          Orders
        </label>
        <input
          type="number"
          placeholder="Enter Orders"
          id="product-orders"
          name="product-orders"
          onChange={handleChange}
          className="border px-4 py-2 rounded-lg w-full outline-none"
          value={data["product-orders"] || ""}
        />
      </div>
    </section>
  );
};

export default BasicDetails;
