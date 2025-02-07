import React from "react";
import Link from "next/link";
import Image from "next/image";

const DEFAULT_IMAGE = "/images/default-image.jpg";

interface Product {
  _id: string;
  title: string;
  price: number;
  slug: {
    current: string;
  };
  featureImage?: {
    asset?: {
      url?: string;
    };
  };
}

const ListingsSection: React.FC<{ latestProducts: Product[] }> = ({
  latestProducts,
}) => {
  return (
    <div className="w-full h-auto relative bg-white py-10 md:py-20 px-6 md:px-20">
      <div className="text-[#2a254b] text-[32px] mb-10 md:mb-20">
        New Ceramics
      </div>
      <div className="flex flex-wrap justify-center md:justify-between gap-8 md:flex-nowrap">
        {latestProducts.map((product) => {
          const imageUrl = product.featureImage?.asset?.url || DEFAULT_IMAGE;
          const productSlug = product.slug?.current;

          return (
            <div
              key={product._id}
              className="flex flex-col items-start gap-4 w-[163px] md:w-[305px]"
            >
              <div className="w-full relative pb-[125%]">
                {productSlug ? (
                  <Link href={`/products/${productSlug}`}>
                    <div className="absolute top-0 left-0 w-full h-full cursor-pointer">
                      <Image
                        src={imageUrl}
                        alt={product.title || "Product image"}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Link>
                ) : (
                  <div className="absolute top-0 left-0 w-full h-full cursor-not-allowed">
                    <Image
                      src={imageUrl}
                      alt={product.title || "Product image"}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </div>
                )}
              </div>
              <div className="text-[#2a254b] text-xl leading-7">
                {product.title}
              </div>
              <div className="text-[#2a254b] text-lg leading-[27px]">
                £{product.price}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center mt-10">
        <Link href="/products" passHref>
          <div className="px-8 py-4 bg-[#f9f9f9] border text-[#2a254b] text-base leading-normal cursor-pointer hover:bg-[#e6e6e6] transition duration-300">
            View collection
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ListingsSection;
