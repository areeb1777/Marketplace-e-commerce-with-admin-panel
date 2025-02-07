"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import BlockContent from "@sanity/block-content-to-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const serializers = {
  types: {
    block: (props: any) => {
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

const ShoppingBasket: React.FC = () => {
  const { state, dispatch } = useCart();

  const removeFromCart = (id: string) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
    toast.info('Product removed from cart!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const updateCart = (item: any, quantity: number) => {
    if (quantity > 0) {
      dispatch({
        type: "UPDATE_CART",
        payload: { ...item, quantity },
      });
      toast.info(`Product quantity updated to ${quantity}!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const getTotalPrice = () => {
    return state.cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="w-full h-auto relative bg-[#f9f9f9] py-10 px-4 md:py-20 md:px-20">
      <h1 className="text-[#2a254b] text-2xl md:text-4xl leading-tight text-center md:text-left mb-8">
        Your shopping cart
      </h1>
      <div className="hidden md:flex justify-between text-[#2a254b] text-sm mb-5">
        <span className="w-1/2">Product</span>
        <span className="w-1/4">Quantity</span>
        <span className="w-1/4">Total</span>
      </div>
      {state.cart.length === 0 ? (
        <p className="text-center text-[#2a254b] text-lg">
          Your cart is empty.
        </p>
      ) : (
        <div>
          {state.cart.map((item) => (
            <div
              key={item._id}
              className="flex flex-col md:flex-row justify-between items-center my-4 py-4 border-b border-[#eae8f4]"
            >
              <div className="flex items-center gap-4 w-full md:w-1/2">
                <Link href={`/products/${item.slug.current}`}>
                  {item.featureImage && item.featureImage.asset ? (
                    <div className="w-24 h-24 relative">
                      <Image
                        src={item.featureImage.asset.url}
                        alt={item.title}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg shadow-md"
                      />
                    </div>
                  ) : (
                    <div className="w-24 h-24 relative">
                      <Image
                        src="/images/fallback-image.png"
                        alt="Fallback Image"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg shadow-md"
                      />
                    </div>
                  )}
                </Link>
                <div className="flex flex-col">
                  <h2 className="text-[#2a254b] text-lg md:text-xl font-bold">
                    {item.title}
                  </h2>
                  <div className="text-[#2a254b] text-sm leading-tight mb-2">
                    <BlockContent blocks={item.description} serializers={serializers} />
                  </div>
                  <span className="text-[#2a254b] text-base font-semibold">
                    £{item.price}
                  </span>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0 w-full md:w-1/2 justify-between">
                <div className="flex items-center border px-4 py-3 bg-[#f9f9f9] rounded-lg shadow-md">
                  <button
                    onClick={() => {
                      if (item.quantity > 1) {
                        updateCart(item, item.quantity - 1);
                      } else {
                        removeFromCart(item._id);
                      }
                    }}
                    className="text-[#000000] font-bold"
                  >
                    -
                  </button>
                  <span className="text-[#2a254b] mx-4">{item.quantity}</span>
                  <button
                    onClick={() => updateCart(item, item.quantity + 1)}
                    className="text-[#000000] font-bold"
                  >
                    +
                  </button>
                </div>
                <span className="text-[#2a254b] text-lg font-semibold">
                  £{item.price * item.quantity}
                </span>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="py-2 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-500 transition duration-300"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="flex flex-col md:flex-row justify-between items-center mt-8">
            <div className="text-[#4e4c92] text-xl font-semibold">Subtotal</div>
            <div className="text-[#2a254b] text-2xl font-bold">
              £{getTotalPrice()}
            </div>
            <div className="text-[#4e4c92] text-sm mt-2 md:mt-0">
              Taxes and shipping are calculated at checkout
            </div>
            <Link href="/checkout">
              <button className="px-8 py-4 bg-[#2a254b] text-white text-base mt-4 md:mt-0 rounded-lg shadow-md hover:bg-[#211f2d] transition duration-300">
                Go to checkout
              </button>
            </Link>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default ShoppingBasket;
