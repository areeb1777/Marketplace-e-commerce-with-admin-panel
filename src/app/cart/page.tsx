import React from "react";
import ShoppingBasket from "@/components/ShoppingBasket";
import TopNav from "@/components/TopNavbar";
import Footer from "@/components/Footer";

const Cart: React.FC = () => {
  return (
    <div>
      <TopNav />
      <ShoppingBasket />
      <Footer />
    </div>
  );
};

export default Cart;
