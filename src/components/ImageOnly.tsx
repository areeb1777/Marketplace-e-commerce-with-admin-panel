import React from 'react';
import Image from 'next/image';

const ImageOnly: React.FC = () => {
  return (
    <div className="relative w-full bg-white">
      <Image 
        src="/images/image-only.png"
        alt="Background"
        width={1440}
        height={400}
        objectFit="cover"
        quality={100}
      />
    </div>
  );
};

export default ImageOnly;
