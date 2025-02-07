import React from "react";
import Image from 'next/image';

const AboutFeaturesSection: React.FC = () => {
  return (
    <div className="w-full h-auto bg-white py-10 px-4">
      {/* Mobile View */}
      <div className="md:hidden flex flex-col items-center gap-9 p-6">
        <div className="relative w-full h-[300px] mb-4">
          <Image 
            src="/images/about-feature-section.png" 
            alt="Furniture Image" 
            layout="fill" 
            objectFit="cover" 
          />
        </div>
        <div className="text-[#2a254b] text-xl   leading-7 w-full mb-4 text-left">
          Our service isn’t just personal, it’s actually<br />hyper personally exquisite
        </div>
        <div className="text-[#505876] text-sm   leading-[21px] w-full mb-4">
          When we started Avion, the idea was simple. Make high quality furniture affordable and available for the mass market. Handmade, and lovingly crafted furniture and homeware is what we live, breathe and design so our Chelsea boutique become the hotbed for the London interior design community.
        </div>
        <div className="bg-[#f9f9f9] border px-8 py-4 w-full mb-4">
          <div className="text-[#2a254b] text-base text-center   leading-normal">
            Get in touch
          </div>
        </div>
      </div>

      {/* Desktop and Tablet View */}
      <div className="hidden md:flex max-w-6xl mx-auto flex-col md:flex-row items-start md:items-center gap-8">
        <div className="relative w-full md:w-1/2 h-[300px] md:h-[450px]">
          <Image 
            src="/images/about-feature-section.png" 
            alt="Furniture Image" 
            layout="fill" 
            objectFit="cover" 
          />
        </div>
        <div className="flex-1 flex flex-col justify-center items-start p-8 bg-white">
          <div className="text-[#2a254b] text-lg md:text-2xl  leading-6 md:leading-9  mb-4">
            Our service isn’t just personal, it’s actually<br />hyper personally exquisite
          </div>
          <div className="text-[#505876] text-xs md:text-sm   leading-5 md:leading-6 mb-6">
            When we started Avion, the idea was simple. Make high quality furniture affordable and available for the mass market. Handmade, and lovingly crafted furniture and homeware is what we live, breathe and design so our Chelsea boutique become the hotbed for the London interior design community.
          </div>
          <button className="w-full md:w-auto px-8 py-4 bg-[#f9f9f9] border text-[#2a254b] text-sm  leading-normal ">
            Get in touch
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutFeaturesSection;
