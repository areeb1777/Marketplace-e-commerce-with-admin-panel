import React from 'react';
import Image from 'next/image';

const FeaturesSection: React.FC = () => {
  return (
    <div className="w-full h-auto bg-white py-10 md:py-20 px-6 md:px-20">
      <div className="text-[#2a254b] text-2xl  leading-[33.60px] text-center mb-10 md:mb-6">
        What makes our brand different
      </div>
      <div className="hidden md:flex flex-col md:flex-row md:justify-between md:items-start gap-8 md:gap-6">
        <div className="flex flex-col items-start gap-4 md:w-1/4">
          <div className="flex items-center">
            <Image src="/icons/delivery.svg" alt="Delivery Icon" width={24} height={24} />
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-[#2a254b] text-xl  leading-7">
              Next day as standard
            </div>
            <div className="text-[#2a254b] text-base  leading-normal">
              Order before 3pm and get your order the next day as standard
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start gap-4 md:w-1/4">
          <div className="flex items-center">
            <Image src="/icons/checkmark.svg" alt="Checkmark Icon" width={24} height={24} />
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-[#2a254b] text-xl  leading-7">
              Made by true artisans
            </div>
            <div className="text-[#2a254b] text-base  leading-normal">
              Handmade crafted goods made with real passion and craftsmanship
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start gap-4 md:w-1/4">
          <div className="flex items-center">
            <Image src="/icons/purchase.svg" alt="Purchase Icon" width={24} height={24} />
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-[#2a254b] text-xl  leading-7">
              Unbeatable prices
            </div>
            <div className="text-[#2a254b] text-base  leading-normal">
              For our materials and quality you won’t find better prices anywhere
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start gap-4 md:w-1/4">
          <div className="flex items-center">
            <Image src="/icons/sprout.svg" alt="Sprout Icon" width={24} height={24} />
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-[#2a254b] text-xl  leading-7">
              Recycled packaging
            </div>
            <div className="text-[#2a254b] text-base  leading-normal">
              We use 100% recycled packaging to ensure our footprint is manageable
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex flex-col items-center gap-9 p-6">
        <div className="w-full max-w-[385px] h-auto bg-white flex flex-col justify-center items-start gap-9">
          <div className="flex flex-col gap-4">
            <div className="flex items-center">
              <Image src="/icons/delivery.svg" alt="Delivery Icon" width={24} height={24} />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-[#2a254b] text-base  leading-snug">
                Next day as standard
              </div>
              <div className="text-[#2a254b] text-sm  leading-[21px]">
                Order before 3pm and get your order the next day as standard
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center">
              <Image src="/icons/checkmark.svg" alt="Checkmark Icon" width={24} height={24} />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-[#2a254b] text-base  leading-snug">
                Made by true artisans
              </div>
              <div className="text-[#2a254b] text-sm  leading-[21px]">
                Handmade crafted goods made with real passion and craftsmanship
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center">
              <Image src="/icons/purchase.svg" alt="Purchase Icon" width={24} height={24} />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-[#2a254b] text-base  leading-snug">
                Unbeatable prices
              </div>
              <div className="text-[#2a254b] text-sm  leading-[21px]">
                For our materials and quality you won’t find better prices anywhere
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center">
              <Image src="/icons/sprout.svg" alt="Sprout Icon" width={24} height={24} />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-[#2a254b] text-base  leading-snug">
                Recycled packaging
              </div>
              <div className="text-[#2a254b] text-sm  leading-[21px]">
                We use 100% recycled packaging to ensure our footprint is manageable
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
