import React from "react";
import Tracking from "@/components/Tracking";
import TopNav from "@/components/TopNavbar";
import Footer from "@/components/Footer";

const TrackingPage: React.FC = () => {
  const user = true;

  return (
    <div className="flex flex-col gap-5">
      <TopNav />
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Track Your Shipment
        </h1>
        {user ? (
          <Tracking />
        ) : (
          <p className="text-center text-red-500">
            Please sign in to track your order.
          </p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default TrackingPage;
