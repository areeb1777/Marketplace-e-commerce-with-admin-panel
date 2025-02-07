'use client';
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const WorkInProgress: React.FC = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back(); // Use router.back() to go to the previous page
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="relative w-64 h-64 mx-auto mb-8">
          <Image 
            src="/images/work-in-progress.png"
            alt="Work in Progress"
            fill
            style={{ objectFit: 'contain' }}
          />
        </div>
        <h1 className="text-4xl font-bold mb-2">Work in Progress</h1>
        <p className="text-gray-600 mb-8">This page is currently under construction. Please check back later!</p>
        <button 
          onClick={handleGoBack} 
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    </main>
  );
};

export default WorkInProgress;
