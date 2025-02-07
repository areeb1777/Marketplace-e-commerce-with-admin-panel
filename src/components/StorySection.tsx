import React from "react";
import Image from 'next/image';

const FeaturesSection: React.FC = () => {
  return (
    <div className="w-full h-auto bg-white py-10 px-4">
      {/* Mobile View */}
      <div className="md:hidden bg-white">
        <div className="text-black text-xl   leading-7 w-full mb-4">
          From a studio in London to a global brand with<br />over 400 outlets
        </div>
        <div className="text-black text-sm   leading-[21px] w-full mb-4">
          When we started Avion, the idea was simple. Make high quality furniture affordable and available for the mass market. Handmade, and lovingly crafted furniture and homeware is what we live, breathe and design so our Chelsea boutique become the hotbed for the London interior design community.
        </div>
        <div className="bg-[#f9f9f9] border px-8 py-4 w-full mb-4">
          <div className="text-black text-base text-center   leading-normal">
            Get in touch
          </div>
        </div>
        <div className="relative w-full h-[358px] mb-4">
          <Image src="/images/room.png" alt="Furniture Image" layout="fill" objectFit="cover" />
        </div>
      </div>

      {/* Desktop and Tablet View */}
      <div className="hidden md:flex max-w-6xl mx-auto flex-col md:flex-row items-start md:items-center gap-8">
        <div className="flex-1">
          <div className="text-black text-lg md:text-2xl  leading-6 md:leading-9  mb-4">
            From a studio in London to a global brand with over 400 outlets
          </div>
          <div className="text-black text-xs md:text-sm   leading-5 md:leading-6 mb-6">
            When we started Avion, the idea was simple. Make high quality furniture affordable and available for the mass market. Handmade, and lovingly crafted furniture and homeware is what we live, breathe and design so our Chelsea boutique become the hotbed for the London interior design community.
          </div>
          <button className="w-full md:w-auto px-8 py-4 bg-[#f9f9f9] border text-black text-sm   leading-normal">
            Get in touch
          </button>
        </div>
        <div className="flex-1 relative w-full h-[320px] md:h-[450px]">
          <Image src="/images/room.png" alt="Furniture Image" layout="fill" objectFit="cover" />
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
