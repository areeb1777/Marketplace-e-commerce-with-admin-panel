"use client";

import React from "react";
import Link from "next/link";
import TopNav from "@/components/TopNavbar";
import Footer from "@/components/Footer";

const SuccessPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-5">
      <TopNav />
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-6 text-center">Order Success!</h1>
        <p className="text-center mb-4">
          Your order has been placed successfully.
        </p>
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
            Thank You!
          </h2>
          <p className="text-center">
            We appreciate your business. You will receive an email confirmation
            shortly.
          </p>
          <div className="text-center mt-6">
            <Link href="/products">
              <button className="inline-block py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 transition duration-300">
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SuccessPage;
