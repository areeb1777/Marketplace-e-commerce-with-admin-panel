'use client';
import React, { ReactNode } from "react";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "@/context/CartContext";

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preload" href="/images/room.png" as="image" />
        <link rel="preload" href="/images/poplar-sofa.png" as="image" />
      </head>
      <body className="antialiased">
        <Toaster />
        <NextUIProvider>
          <CartProvider>{children}</CartProvider>
        </NextUIProvider>
      </body>
    </html>
  );
};

export default RootLayout;
