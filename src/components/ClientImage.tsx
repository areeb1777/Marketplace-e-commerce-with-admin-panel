'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ClientImageProps {
  src: string;
  alt: string;
  fallbackSrc: string;
  className?: string;
  priority?: boolean;
}

const ClientImage: React.FC<ClientImageProps> = ({ src, alt, fallbackSrc, className, priority }) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      className={className}
      onError={() => setImgSrc(fallbackSrc)}
      layout="fill"
      objectFit="cover"
      priority={priority}
    />
  );
};

export default ClientImage;
