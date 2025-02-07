"use client";

import React from "react";

interface DescriptionProps {
  data: { [key: string]: any };
  handleData: (key: string, value: any) => void;
}

const Description: React.FC<DescriptionProps> = ({ data, handleData }) => {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleData("product-description", event.target.value);
  };

  return (
    <section className="flex-1 flex flex-col gap-3 bg-white border p-6 rounded-xl shadow-md">
      <h1 className="font-semibold text-lg">Description</h1>
      <div className="flex flex-col gap-1">
        <label
          className="text-gray-600 text-sm font-medium"
          htmlFor="product-description"
        >
          Product Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="product-description"
          name="product-description"
          placeholder="Enter detailed description..."
          className="border px-4 py-2 rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-300"
          rows={10}
          onChange={handleChange}
          value={data["product-description"] || ""}
        />
      </div>
    </section>
  );
};

export default Description;
