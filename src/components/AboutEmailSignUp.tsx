"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const AboutEmailSignUp: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="relative w-full h-[444px] bg-[#f9f9f9] flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/about-email-sign-up.png"
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
      </div>

      {/* Desktop View */}
      <div className="relative z-10 hidden md:flex flex-col items-center text-center px-4">
        <h1 className="text-white text-3xl md:text-5xl leading-snug">
          Join the club and get the benefits
        </h1>
        <p className="text-white text-lg md:text-xl mt-4 max-w-2xl ">
          Sign up for our newsletter and receive exclusive offers on new ranges,
          sales, pop-up stores, and more.
        </p>

        {/* Icons List */}
        <div className="flex flex-wrap justify-center mt-6 gap-9 text-white text-base md:text-lg ">
          <div className="flex items-center gap-2">
            <Image
              src="/icons/aboutcheckmark.svg"
              alt="Checkmark Icon"
              width={16}
              height={16}
            />
            <span>Exclusive offers</span>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src="/icons/aboutcheckmark.svg"
              alt="Checkmark Icon"
              width={16}
              height={16}
            />
            <span>Free events</span>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src="/icons/aboutcheckmark.svg"
              alt="Checkmark Icon"
              width={16}
              height={16}
            />
            <span>Large discounts</span>
          </div>
        </div>

        {/* Email Input */}
        <div className="flex flex-col md:flex-row items-center mt-10 w-full max-w-lg">
          <div className="flex w-full h-14 bg-white overflow-hidden">
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
      </div>

      {/* Mobile View */}
      <div className="relative z-10 flex flex-col items-start md:hidden px-4">
        <h1 className="text-white text-3xl leading-snug text-left">
          Join the club and get the benefits
        </h1>
        <div className="flex flex-col items-start mt-4 text-white text-lg  space-y-2 text-left">
          <span>Sign up for our newsletter and receive exclusive offers</span>
          <span>on new ranges, sales, pop-up stores, and more.</span>
        </div>

        {/* Icons List */}
        <div className="flex flex-col items-start mt-6 text-white text-base  space-y-2">
          <div className="flex items-center gap-2">
            <Image
              src="/icons/aboutcheckmark.svg"
              alt="Checkmark Icon"
              width={16}
              height={16}
            />
            <span>Exclusive offers</span>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src="/icons/aboutcheckmark.svg"
              alt="Checkmark Icon"
              width={16}
              height={16}
            />
            <span>Free events</span>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src="/icons/aboutcheckmark.svg"
              alt="Checkmark Icon"
              width={16}
              height={16}
            />
            <span>Large discounts</span>
          </div>
        </div>

        {/* Email Input */}
        <div className="flex items-start mt-10 w-full">
          <div className="flex w-full h-14 bg-white  overflow-hidden">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-grow pl-8 pr-4 bg-transparent text-[#2a254b] placeholder-opacity-60 text-base  outline-none"
            />
          </div>
          <button className="h-14 px-8 bg-[#2a254b] text-white text-base  flex-shrink-0">
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutEmailSignUp;
