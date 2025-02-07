"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const EmailSignUp: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="w-full h-auto bg-[#f9f9f9] py-10 lg:py-16 xl:py-20 2xl:py-24 px-6 lg:px-12 xl:px-20 2xl:px-24">
      <div className="w-full max-w-[1440px] mx-auto bg-white p-8 lg:px-[351px] lg:pt-[68px] lg:pb-[54px] flex flex-col justify-center items-center gap-12 lg:gap-[72px]">
        <div className="flex flex-col justify-start items-center gap-4 w-full lg:w-auto">
          <div className="text-center text-[#2a254b] text-xl lg:text-4xl leading-7 lg:leading-[50.40px]">
            Join the club and get the benefits
          </div>
          <div className="text-center text-[#2a254b] text-sm lg:text-base leading-[21px] lg:leading-normal w-full lg:w-[470px]">
            Sign up for our newsletter and receive exclusive offers on new
            ranges, sales, pop-up stores, and more.
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden md:flex flex-col md:flex-row items-center mt-6 w-full max-w-lg">
          <div className="flex w-full md:flex-grow h-14 bg-[#f9f9f9] overflow-hidden">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-grow pl-8 pr-4 bg-transparent text-[#2a254b] placeholder-opacity-60 text-base  outline-none"
            />
          </div>
          <button className="w-full md:w-auto h-14 px-8 bg-[#2a254b] text-white text-base  flex-shrink-0">
            Sign up
          </button>
        </div>

        {/* Mobile View */}
        <div className="flex md:hidden mt-6 w-full max-w-lg">
          <div className="flex flex-grow h-14 bg-[#f9f9f9] overflow-hidden">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-grow pl-4 pr-4 bg-transparent text-[#2a254b] placeholder-opacity-60 text-base  outline-none"
            />
          </div>
          <button className="h-14 px-4 bg-[#2a254b] text-white text-base  flex-shrink-0">
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(EmailSignUp), { ssr: false });
