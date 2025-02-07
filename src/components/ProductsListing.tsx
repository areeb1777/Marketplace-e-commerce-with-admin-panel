import React from "react";
import Link from "next/link";
import Image, { ImageLoader } from "next/image";

interface Product {
  _id: string;
  name: string;
  title: string;
  price: number;
  featureImage: { asset: { url: string } } | null;
  slug: { current: string } | null;
}

const DEFAULT_IMAGE = "/images/default-image.jpg";

const customImageLoader: ImageLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

const ProductListing: React.FC<{ allProducts: Product[] }> = ({
  allProducts,
}) => {
  return (
    <div className="product-listing w-full h-auto bg-white py-10 md:py-20 px-6 md:px-20">
      <div className="product-grid grid grid-cols-2 md:grid-cols-3 gap-8">
        {allProducts.map((product) => {
          const imageUrl = product.featureImage?.asset?.url || DEFAULT_IMAGE;

          return (
            <div
              key={product._id}
              className="product-item flex flex-col items-start gap-4 w-full"
            >
              <div
                className="product-image-container w-full relative"
                style={{ paddingTop: "100%" }}
              >
                <Link href={`/products/${product.slug?.current ?? ""}`}>
                  <div className="absolute top-0 left-0 w-full h-full cursor-pointer">
                    <Image
                      src={imageUrl}
                      alt={product.title || "Product image"}
                      loader={customImageLoader}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                      className="rounded-lg"
                      quality={75}
                      placeholder="blur"
                      blurDataURL={DEFAULT_IMAGE}
                      onError={(e) => {
                        e.currentTarget.src = DEFAULT_IMAGE;
                      }}
                    />
                  </div>
                </Link>
              </div>
              <div className="product-name text-[#2a254b] text-xl leading-7">
                {product.title}
              </div>
              <div className="product-price text-[#2a254b] text-lg leading-[27px]">
                £{product.price}
              </div>
            </div>
          );
        })}
      </div>
      <div className="view-collection flex justify-center mt-10">
        <Link href="/products">
          <div className="px-8 py-4 bg-[#f9f9f9] border text-[#2a254b] text-base leading-normal cursor-pointer hover:bg-[#e6e6e6] transition duration-300">
            View collection
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductListing;
