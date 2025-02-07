"use client";

import React from "react";
import { useRouter } from "next/navigation";

const AccessDenied = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-lg text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-6">
          This page is only for admins. You do not have the necessary permissions to view this page. If you believe this is an error, please contact the administrator.
        </p>
        <button
          onClick={handleGoBack}
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default AccessDenied;
