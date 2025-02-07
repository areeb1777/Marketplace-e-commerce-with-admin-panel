"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { placeOrder } from '@/app/api/order';

const OrderPlacement: React.FC = () => {
  const [orderDetails, setOrderDetails] = useState({
    productName: '',
    quantity: 1,
    customerName: '',
    customerEmail: '',
  });
  const router = useRouter();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setOrderDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const order = await placeOrder(orderDetails);
    const queryParams = new URLSearchParams({
      productName: order.productName,
      quantity: order.quantity.toString(),
      trackingNumber: order.trackingNumber,
    }).toString();
    router.push(`/success?${queryParams}`);
  };

  return (
    <div className="order-placement-container bg-gray-100 p-4 rounded-lg shadow-md max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Place Your Order</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="productName"
          value={orderDetails.productName}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="number"
          name="quantity"
          value={orderDetails.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          name="customerName"
          value={orderDetails.customerName}
          onChange={handleChange}
          placeholder="Customer Name"
          className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="email"
          name="customerEmail"
          value={orderDetails.customerEmail}
          onChange={handleChange}
          placeholder="Customer Email"
          className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="flex items-center justify-center px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default OrderPlacement;
