'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import BlockContent from '@sanity/block-content-to-react';
import { ProductClientProps } from '@/app/types/ProductClientProps'; 
import { urlFor } from '@/sanity/lib/image';
import { useCart } from '@/context/CartContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const serializers = {
  types: {
    block: (props: { node: { style: string }, children: React.ReactNode }) => {
      switch (props.node.style) {
        case 'h1':
          return <h1>{props.children}</h1>;
        case 'h2':
          return <h2>{props.children}</h2>;
        case 'h3':
          return <h3>{props.children}</h3>;
        case 'h4':
          return <h4>{props.children}</h4>;
        case 'blockquote':
          return <blockquote>{props.children}</blockquote>;
        default:
          return <p>{props.children}</p>;
      }
    },
  },
};

const ProductClient: React.FC<ProductClientProps> = ({ product }) => {
  const { dispatch } = useCart();
  const [quantity, setQuantity] = useState(1);

  const addToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        ...product,
        quantity,
      }
    });
    toast.success('Product added to cart!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const imageUrl = product.featureImage ? urlFor(product.featureImage).url() : '';
  const additionalImageUrls = product.additionalImages ? product.additionalImages.map(img => urlFor(img).url()) : [];

  return (
    <div className="bg-white min-h-screen flex flex-col items-center p-6">
      <div className="max-w-6xl w-full bg-gray-100 p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-6 text-center text-black">{product.title}</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            {imageUrl && (
              <div className="relative h-96">
                <Image
                  src={imageUrl}
                  alt={product.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="object-cover rounded-lg"
                />
              </div>
            )}
            <div className="flex mt-4 gap-2 justify-center">
              {additionalImageUrls.slice(0, 3).map((url, index) => (
                <div key={index} className="relative w-1/3 h-24 cursor-pointer">
                  <Image
                    src={url}
                    alt={`${product.title} Thumbnail ${index + 1}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-between text-black">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Description</h2>
              <div className="text-lg mb-6">
                <BlockContent blocks={product.description} serializers={serializers} />
              </div>
              <h3 className="text-xl font-medium mb-2">Dimensions</h3>
              <ul className="list-disc list-inside text-lg mb-6">
                <li>Height: {product.height} cm</li>
                <li>Width: {product.width} cm</li>
                <li>Depth: {product.depth} cm</li>
              </ul>
              <h3 className="text-xl font-medium mb-2">Features</h3>
              <ul className="list-disc list-inside text-lg mb-6">
                {product.features && product.features.map((feature, index) => (
                  typeof feature === 'string' ? <li key={index}>{feature}</li> : null
                ))}
              </ul>
            </div>
            <div className="mt-6">
              <p className="text-3xl font-bold mb-4">Price: £{product.price}</p>
              <div className="flex items-center mb-6">
                <button 
                  onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                  className="px-4 py-2 bg-gray-300 text-black font-semibold rounded-l-lg"
                >
                  -
                </button>
                <input 
                  type="text"
                  value={quantity}
                  readOnly
                  className="w-12 text-center text-xl font-semibold border-t border-b"
                />
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 bg-gray-300 text-black font-semibold rounded-r-lg"
                >
                  +
                </button>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={addToCart}
                  className="flex-1 py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition duration-300"
                >
                  Add to Cart
                </button>
                <button className="flex-1 py-3 px-6 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-500 transition duration-300">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductClient;
