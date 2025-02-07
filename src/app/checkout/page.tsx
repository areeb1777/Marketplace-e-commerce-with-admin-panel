'use client';

import React from 'react';
import CheckoutForm from '@/components/CheckoutForm';
import TopNav from '@/components/TopNavbar';
import Footer from '@/components/Footer';

const CheckoutPage: React.FC = () => {
  return (
    <div>
      <TopNav />
      <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <CheckoutForm />
    </div>
    <Footer />
    </div>
  );
};

export default CheckoutPage;
