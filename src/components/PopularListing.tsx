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

const PopularListingsSection: React.FC<{ popularProducts: Product[] }> = ({
  popularProducts,
}) => {
  return (
    <div className="w-full h-auto bg-white py-10 lg:py-16 xl:py-20 2xl:py-24 px-6 lg:px-12 xl:px-20 2xl:px-24">
      <div className="text-[#2a254b] text-[32px] lg:text-[36px] xl:text-[40px] 2xl:text-[44px] mb-10 lg:mb-16 xl:mb-20 2xl:mb-24">
        Our popular products
      </div>
      <div className="flex flex-col lg:flex-row justify-center gap-8 lg:gap-10 xl:gap-12 2xl:gap-16">
        {popularProducts.map((product, index) => {
          const imageUrl = product.featureImage?.asset?.url || DEFAULT_IMAGE;

          return (
            <div
              key={product._id}
              className={`flex flex-col items-center gap-4 ${
                index === 0
                  ? "lg:w-[600px] xl:w-[700px] 2xl:w-[800px]"
                  : "lg:w-[250px] xl:w-[300px] 2xl:w-[350px]"
              }`}
              style={{ height: "400px" }}
            >
              <div className="w-full h-full flex justify-center relative">
                <Link href={`/products/${product.slug?.current ?? ""}`} passHref>
                  <div className="absolute top-0 left-0 w-full h-full cursor-pointer">
                    <Image
                      src={imageUrl}
                      alt={product.title || "Product image"}
                      layout="fill"
                      objectFit="cover"
                      className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>
              </div>
              <div className="text-[#2a254b] text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl leading-7 text-center lg:text-left">
                {product.title}
              </div>
              <div className="text-[#2a254b] text-lg lg:text-xl xl:text-2xl 2xl:text-3xl leading-[27px] text-center lg:text-left">
                £{product.price}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center mt-10 lg:mt-16 xl:mt-20 2xl:mt-24">
        <Link href="/products">
          <div className="px-8 lg:px-12 xl:px-16 2xl:px-20 py-4 bg-[#f9f9f9] border text-[#2a254b] text-base lg:text-lg xl:text-xl 2xl:text-2xl leading-normal cursor-pointer">
            View collection
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PopularListingsSection;
