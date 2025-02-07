"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { AiOutlineSearch } from "react-icons/ai";

interface TrackingInfo {
  status: string;
  lastLocation: string;
  expectedDelivery: string;
}

const Tracking: React.FC = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTrackingNumber(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://api.ship24.com/tracking?trackingNumber=${trackingNumber}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_SHIP24_API_KEY}`,
          },
        }
      );
      const data: TrackingInfo = await response.json();
      setTrackingInfo(data);
    } catch (error) {
      console.error("Error fetching tracking info:", error);
    }
  };

  return (
    <div className="tracking-container bg-gray-100 p-4 rounded-lg shadow-md max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
        Track Your Order
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4 text-center">
        <div className="relative">
          <AiOutlineSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            value={trackingNumber}
            onChange={handleChange}
            placeholder="Enter your tracking number"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md bg-white text-black focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="flex items-center justify-center px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mx-auto"
        >
          Track
        </button>
      </form>
      {trackingInfo && (
        <div className="tracking-info mt-6 bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Tracking Information:
          </h3>
          <pre className="text-gray-600">
            {JSON.stringify(trackingInfo, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default Tracking;
