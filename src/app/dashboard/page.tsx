'use client';
import React from "react";
import { useRouter } from "next/navigation";

const Dashboard: React.FC = () => {
  const router = useRouter();

  const handleNavigateToAdmin = () => {
    router.push("/admin");
  };

  const handleNavigateToHome = () => {
    router.push("/");
  };

  // Dummy role for demonstration purposes. Replace this with actual role logic if needed.
  const role = "admin"; // or "user" based on your condition

  return (
    <main className="min-h-screen bg-gray-100 p-10 flex items-center justify-center">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <p className="text-gray-600 mb-6">
          {role === "admin" ? "Are you an admin? You can manage settings here." : "Are you not an admin? You can go to Home."}
        </p>
        <div className="space-x-4">
          <button
            onClick={handleNavigateToAdmin}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Admin Panel
          </button>
          <button
            onClick={handleNavigateToHome}
            className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition duration-200"
          >
            Home
          </button>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
