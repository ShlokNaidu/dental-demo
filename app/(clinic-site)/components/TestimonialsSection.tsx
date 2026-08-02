"use client";

import React from "react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Card } from "@/components/ui/Card";
import { Star, Quote } from "lucide-react";
import { DOCTOR_NAME } from "@/lib/utils/constants";

export const TestimonialsSection: React.FC = () => {
  const reviews = [
    {
      name: "Priya Sharma",
      location: "Vijay Nagar, Indore",
      rating: 5,
      treatment: "Root Canal Treatment",
      quote:
        `I was terrified of getting a root canal, but ${DOCTOR_NAME} and her team made it completely painless. The WhatsApp booking was super quick and easy too!`,
    },
    {
      name: "Rajesh Verma",
      location: "Palasia, Indore",
      rating: 5,
      treatment: "Teeth Cleaning",
      quote:
        `Clean, hygienic clinic with very polite staff. I booked my appointment online with ${DOCTOR_NAME} in under a minute and got immediate WhatsApp confirmation.`,
    },
    {
      name: "Ananya Joshi",
      location: "Saket Nagar, Indore",
      rating: 5,
      treatment: "Braces Consultation",
      quote:
        `Super transparent prices! ${DOCTOR_NAME} didn't try to upsell anything unnecessary. Great experience overall for my alignment consultation.`,
    },
  ];

  return (
    <section className="py-20 bg-stone-50/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-sm font-bold tracking-wider text-accent uppercase">
            Patient Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal">
            What Our Patients Say
          </h2>
          <p className="text-charcoal-muted">
            Read real feedback from patients who experienced our gentle dental care in Indore.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <ScrollReveal key={rev.name} delay={idx * 0.1}>
              <Card className="h-full flex flex-col justify-between p-6 border-stone-200">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <Quote className="w-6 h-6 text-stone-300" />
                  </div>
                  <p className="text-stone-700 italic text-sm leading-relaxed">
                    "{rev.quote}"
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-100">
                  <h4 className="font-bold text-charcoal text-sm">{rev.name}</h4>
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span>{rev.location}</span>
                    <span className="text-accent font-semibold">{rev.treatment}</span>
                  </div>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
