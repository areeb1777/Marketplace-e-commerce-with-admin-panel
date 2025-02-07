import React from "react";
import AboutPageHeader from "@/components/AboutPageHeaders";
import BrandStorySection from "@/components/StorySection";
import AboutFeaturesSection from "@/components/AboutFeatureSection";
import FeaturesSection from "@/components/Features";
import AboutEmailSignUp from "@/components/AboutEmailSignUp";

const About: React.FC = () => {
  return (
    <div>
      <AboutPageHeader />
      <BrandStorySection />
      <AboutFeaturesSection />
      <FeaturesSection />
      <AboutEmailSignUp />
    </div>
  );
};

export default About;
