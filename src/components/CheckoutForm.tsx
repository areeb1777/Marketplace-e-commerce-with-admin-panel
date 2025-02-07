import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import { useCart } from "../context/CartContext";
import Link from "next/link";
import Image, { ImageLoader } from "next/image";
import {
  FaShoppingCart,
  FaUser,
  FaEnvelope,
  FaAddressCard,
  FaCreditCard,
} from "react-icons/fa";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { state } = useCart();
  const { cart } = state;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements || cart.length === 0) {
      console.error("Stripe.js has not loaded yet or cart is empty.");
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      console.error("CardElement not found.");
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error("Error creating payment method:", error);
      return;
    }

    console.log("PaymentMethod:", paymentMethod);

    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: cart.map((product) => ({
          name: product.title,
          image: encodeURI(product.featureImage?.asset.url || ""),
          price: product.price,
          quantity: product.quantity,
        })),
      }),
    });

    if (!res.ok) {
      console.error("Failed to create checkout session:", await res.text());
      return;
    }

    const data = await res.json();

    const { error: redirectToCheckoutError } = await stripe.redirectToCheckout({
      sessionId: data.id,
    });

    if (redirectToCheckoutError) {
      console.error(
        "Error redirecting to checkout:",
        redirectToCheckoutError.message
      );
    }
  };

  const customImageLoader: ImageLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-8 bg-white shadow-2xl rounded-lg"
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        <FaShoppingCart className="inline-block mr-2" /> Secure Checkout
      </h2>
      <div className="mb-6">
        {cart.map((product) => (
          <div key={product._id} className="mb-4 flex items-center">
            <Link href={`/products/${product.slug.current}`}>
              <div className="relative w-20 h-20 mr-4">
                <Image
                  src={
                    product.featureImage
                      ? product.featureImage.asset.url
                      : "/images/default-image.jpg"
                  }
                  alt={product.title}
                  loader={customImageLoader}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                  quality={75}
                  placeholder="blur"
                  blurDataURL="/images/default-image.jpg"
                />
              </div>
            </Link>
            <div className="flex flex-col">
              <p className="text-lg font-semibold text-gray-700">
                {product.title}
              </p>
              <p className="text-lg text-gray-500">
                ${(product.price / 100).toFixed(2)} x {product.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Billing and Card Details */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <FaUser className="inline-block mr-2" /> Full Name
        </label>
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <FaEnvelope className="inline-block mr-2" /> Email Address
        </label>
        <input
          type="email"
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <FaAddressCard className="inline-block mr-2" /> Billing Address
        </label>
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm mb-2 focus:outline-none focus:border-blue-500"
          placeholder="Street Address"
          required
        />
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm mb-2 focus:outline-none focus:border-blue-500"
          placeholder="City"
          required
        />
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm mb-2 focus:outline-none focus:border-blue-500"
          placeholder="State/Province/Region"
          required
        />
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm mb-2 focus:outline-none focus:border-blue-500"
          placeholder="Zip/Postal Code"
          required
        />
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
          placeholder="Country"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <FaCreditCard className="inline-block mr-2" /> Card Details
        </label>
        <div className="p-3 border border-gray-300 rounded-lg shadow-sm focus-within:border-blue-500">
          <CardElement
            className="focus:outline-none"
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        disabled={!stripe}
      >
        Pay Now
      </button>
    </form>
  );
};

const WrappedCheckoutForm: React.FC = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default WrappedCheckoutForm;
