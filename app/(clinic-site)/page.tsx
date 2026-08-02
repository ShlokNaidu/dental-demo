import React from "react";
import { HeroSection } from "./components/HeroSection";
import { ServicesSection } from "./components/ServicesSection";
import { DoctorSection } from "./components/DoctorSection";
import { WhyChooseUsSection } from "./components/WhyChooseUsSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { LocationSection } from "./components/LocationSection";
import { CTASection } from "./components/CTASection";
import { Footer } from "./components/Footer";
import { FloatingChatbotWidget } from "./components/FloatingChatbotWidget";

export default function DemoClinicHomePage() {
  return (
    <main className="min-h-screen bg-background relative">
      <HeroSection />
      <ServicesSection />
      <DoctorSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <LocationSection />
      <CTASection />
      <Footer />
      <FloatingChatbotWidget />
    </main>
  );
}
