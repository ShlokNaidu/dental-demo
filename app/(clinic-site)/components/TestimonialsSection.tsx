"use client";

import React from "react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { DOCTOR_NAME } from "@/lib/utils/constants";

const REVIEWS = [
  {
    name: "Priya Sharma",
    initials: "PS",
    location: "Vijay Nagar, Indore",
    rating: 5,
    treatment: "Root Canal",
    quote: `I was terrified of getting a root canal, but ${DOCTOR_NAME} and her team made it completely painless. The WhatsApp booking was super quick too!`,
  },
  {
    name: "Rajesh Verma",
    initials: "RV",
    location: "Palasia, Indore",
    rating: 5,
    treatment: "Teeth Cleaning",
    quote: `Clean, hygienic clinic with very polite staff. Booked with ${DOCTOR_NAME} in under a minute and got immediate confirmation.`,
  },
  {
    name: "Ananya Joshi",
    initials: "AJ",
    location: "Saket Nagar, Indore",
    rating: 5,
    treatment: "Braces Consultation",
    quote: `Super transparent prices. ${DOCTOR_NAME} didn't upsell anything. Great experience overall for my alignment consultation.`,
  },
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section
      className="py-24"
      style={{ background: "var(--bg-elevated)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal className="mb-16">
          <p className="label-caps text-gold mb-3">Patient Stories</p>
          <h2 className="text-display-md text-ivory">What Our Patients Say</h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev, idx) => (
            <ScrollReveal key={rev.name} delay={idx * 0.1}>
              <div
                className="card-dark rounded-2xl p-8 h-full flex flex-col justify-between"
              >
                {/* Stars */}
                <div>
                  <div className="flex gap-1 mb-6">
                    {[...Array(rev.rating)].map((_, i) => (
                      <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#D97706"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    ))}
                  </div>

                  {/* Large decorative quote mark */}
                  <div
                    className="text-6xl font-black mb-2 leading-none select-none"
                    style={{ color: "var(--teal)", fontFamily: "Georgia, serif", opacity: 0.5 }}
                  >
                    "
                  </div>

                  <p className="text-base italic leading-relaxed mb-6" style={{ color: "var(--stone-400)" }}>
                    {rev.quote}
                  </p>
                </div>

                {/* Attribution */}
                <div className="flex items-center gap-3 pt-6" style={{ borderTop: "1px solid var(--border-subtle)" }}>
                  {/* Initials avatar */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{ background: "var(--teal-dim)", color: "var(--teal)" }}
                  >
                    {rev.initials}
                  </div>
                  <div>
                    <div className="text-ivory font-bold text-sm" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
                      {rev.name}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="label-caps" style={{ color: "var(--stone-600)" }}>{rev.location}</span>
                      <span className="label-caps" style={{ color: "var(--teal)" }}>· {rev.treatment}</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
