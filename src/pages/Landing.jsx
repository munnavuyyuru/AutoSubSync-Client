import React from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorks from "@/components/HowItWorks";
import LanguagesSection from "@/components/LanguagesSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Landing = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <LanguagesSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Landing;
