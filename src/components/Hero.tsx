import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <div className="w-full h-auto bg-white py-10 md:py-20 px-6 md:px-20">
      {/* Desktop View */}
      <div className="hidden md:flex relative bg-[#2a254b] flex-row justify-between items-center md:h-[550px]">
        <div className="relative z-10 w-1/2 px-20 py-20 flex flex-col justify-center">
          <div className="w-full max-w-[500px] text-white text-[32px] leading-[44.8px] mb-10">
            The furniture brand for the future, with timeless designs
          </div>
          <div className="text-white text-lg leading-[27px] mb-10">
            A new era in eco friendly furniture with Avelon, the French luxury retail brand
            <br />
            with nice fonts, tasteful colors and a beautiful way to display things digitally
            <br />
            using modern web technologies.
          </div>
          <div className="w-auto px-8 py-4 bg-[#f9f9f9]/20 justify-center items-center inline-flex cursor-pointer">
            <Link href="/products">
              <div className="text-white text-base leading-normal">
                View collection
              </div>
            </Link>
          </div>
        </div>
        <div className="relative w-1/2 h-[490px]">
          <Image
            src="/images/chair-right.png"
            alt="Furniture"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden w-full max-w-[390px] h-auto bg-[#2a254b] px-6 pt-10 pb-6 flex flex-col justify-end items-start gap-20">
        <div className="w-full max-w-[342px] text-white text-[32px] leading-[44.8px] font-['Clash Display']">
          The furniture brand for the future, with timeless designs
        </div>
        <div className="flex flex-col justify-start items-start gap-8">
          <div className="w-full max-w-[342px] text-white text-lg leading-[27px]">
            A new era in eco friendly furniture with Avelon, the French luxury retail brand
            <br />
            with nice fonts, tasteful colors and a beautiful way to display things digitally
            <br />
            using modern web technologies.
          </div>
          <div className="w-full max-w-[342px] px-8 py-4 bg-[#f9f9f9]/20 justify-center items-center inline-flex cursor-pointer">
            <Link href="/products">
              <div className="text-white text-base leading-normal">
                View collection
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
