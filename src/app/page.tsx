// src/app/home/page.tsx
import React from "react";
import EmailSignUp from "@/components/EmailSignUp";
import FeaturesSection from "@/components/Features";
import HeroSection from "@/components/Hero";
import ListingsSection from "@/components/Listing";
import PopularListingsSection from "@/components/PopularListing";
import BrandStorySection from "@/components/StorySection";
import { getLatestProducts, getPopularProducts } from "@/sanity/lib/getData";
import TopNav from "@/components/TopNavbar";
import Footer from "@/components/Footer";

const Home: React.FC = async () => {
  const latestProducts = await getLatestProducts();
  const popularProducts = await getPopularProducts();

  return (
    <div>
      <TopNav />
      <HeroSection />
      <FeaturesSection />
      <ListingsSection latestProducts={latestProducts} />
      <PopularListingsSection popularProducts={popularProducts} />
      <EmailSignUp />
      <BrandStorySection />
      <Footer />
    </div>
  );
};

export default Home;
