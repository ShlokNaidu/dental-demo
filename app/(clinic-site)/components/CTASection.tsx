"use client";

import React from "react";
import Link from "next/link";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { Calendar, MessageCircle } from "lucide-react";

export const CTASection: React.FC = () => {
  return (
    <section className="py-20 bg-accent text-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
        <ScrollReveal className="space-y-4 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Ready for a Healthier, Brighter Smile?
          </h2>
          <p className="text-accent-muted text-lg sm:text-xl font-light">
            Book your consultation now. Instant online confirmation or automated WhatsApp booking available 24/7.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2} className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link href="/book/smile-care-indore">
            <Button size="lg" className="bg-white text-accent hover:bg-stone-100 shadow-xl gap-2 font-bold">
              <Calendar className="w-5 h-5" />
              Book Appointment Now
            </Button>
          </Link>
          <a
            href="https://wa.me/919876543210?text=Hi%2C%20I%20want%20to%20schedule%20a%20dental%20appointment"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 gap-2">
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </Button>
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
};
