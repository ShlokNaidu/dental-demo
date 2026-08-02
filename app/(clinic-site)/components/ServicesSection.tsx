"use client";

import React from "react";
import Link from "next/link";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CLINIC_SERVICES } from "@/lib/utils/constants";
import { Sparkles, ArrowRight, Clock, Tag } from "lucide-react";

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-stone-50/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-sm font-semibold tracking-wider text-accent uppercase">
            Transparent Pricing & Care
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal">
            Our Dental Services & Treatments
          </h2>
          <p className="text-charcoal-muted">
            We believe in upfront pricing with zero hidden costs. Choose your service and reserve your preferred time slot online.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CLINIC_SERVICES.map((service, index) => (
            <ScrollReveal key={service.id || service.name} delay={index * 0.1}>
              <Card className="h-full flex flex-col justify-between p-6">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-accent-muted flex items-center justify-center text-accent">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-charcoal mb-1">{service.name}</h3>
                    <p className="text-sm text-stone-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-stone-100 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-accent font-bold text-2xl">
                      <Tag className="w-4 h-4" />
                      <span>₹{service.price}</span>
                    </div>
                    {service.duration && (
                      <div className="flex items-center gap-1 text-xs text-stone-500">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{service.duration}</span>
                      </div>
                    )}
                  </div>

                  <Link href={`/book/smile-care-indore?service=${encodeURIComponent(service.name)}`} className="block">
                    <Button variant="outline" size="sm" className="w-full gap-2 text-xs">
                      <span>Book Service</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
