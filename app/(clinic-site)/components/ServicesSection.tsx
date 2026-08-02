"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { CLINIC_SERVICES } from "@/lib/utils/constants";

// Service-specific photograph direction — no generic icons
const SERVICE_VISUALS: Record<string, { bg: string; label: string }> = {
  "Teeth Cleaning": {
    bg: "linear-gradient(135deg, #0D9488 0%, #0F766E 40%, #115E59 100%)",
    label: "Scaling & Polishing",
  },
  "Root Canal Treatment": {
    bg: "linear-gradient(135deg, #1C1917 0%, #292524 40%, #44403C 100%)",
    label: "Painless Endodontics",
  },
  "Dental Braces Consultation": {
    bg: "linear-gradient(135deg, #D97706 0%, #B45309 40%, #78350F 100%)",
    label: "Orthodontic Planning",
  },
  "Comprehensive Checkup": {
    bg: "linear-gradient(135deg, #1E3A5F 0%, #1E40AF 40%, #1D4ED8 100%)",
    label: "Full Oral Exam",
  },
};

// SVG icons — actual dental/medical, not sparkle
const SERVICE_ICONS: Record<string, React.ReactNode> = {
  "Teeth Cleaning": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" strokeLinecap="round"/>
      <path d="M8 12s1.5 2 4 2 4-2 4-2" strokeLinecap="round"/>
      <path d="M9 9h.01M15 9h.01" strokeLinecap="round"/>
    </svg>
  ),
  "Root Canal Treatment": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <path d="M12 3c-1.2 5.4-3 7.5-3 11a3 3 0 0 0 6 0c0-3.5-1.8-5.6-3-11Z" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 14c0 0-1.5.5-2 2M15 14c0 0 1.5.5 2 2" strokeLinecap="round"/>
    </svg>
  ),
  "Dental Braces Consultation": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <rect x="3" y="10" width="18" height="4" rx="2" strokeLinecap="round"/>
      <circle cx="8" cy="12" r="1" fill="currentColor"/>
      <circle cx="12" cy="12" r="1" fill="currentColor"/>
      <circle cx="16" cy="12" r="1" fill="currentColor"/>
      <path d="M8 12 L12 12 L16 12" strokeLinecap="round"/>
    </svg>
  ),
  "Comprehensive Checkup": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" strokeLinecap="round"/>
    </svg>
  ),
};

export const ServicesSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="services"
      className="py-24"
      style={{ background: "var(--bg-surface)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Section header */}
        <ScrollReveal className="mb-16">
          <p className="label-caps text-gold mb-3">Transparent Pricing & Care</p>
          <h2 className="text-display-md text-ivory mb-4">What We Treat</h2>
          <p style={{ color: "var(--stone-400)" }} className="text-lg max-w-xl leading-relaxed">
            Upfront pricing, zero hidden costs. Reserve your slot online or via WhatsApp.
          </p>
        </ScrollReveal>

        {/* Service cards — photography-led */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CLINIC_SERVICES.map((service, index) => {
            const visual = SERVICE_VISUALS[service.name] ?? SERVICE_VISUALS["Comprehensive Checkup"];
            const icon = SERVICE_ICONS[service.name];
            return (
              <ScrollReveal key={service.name} delay={index * 0.1}>
                <motion.div
                  className="card-dark rounded-2xl overflow-hidden group cursor-pointer h-full flex flex-col"
                  whileHover={shouldReduceMotion ? {} : { y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
                >
                  {/* Visual panel — gradient + icon (no sparkle) */}
                  <div
                    className="relative h-48 flex items-center justify-center"
                    style={{ background: visual.bg }}
                  >
                    <div className="text-white/80 group-hover:text-white group-hover:scale-110 transition-transform duration-300">
                      {icon}
                    </div>
                    <div className="absolute bottom-3 left-4">
                      <span className="label-caps text-white/60">{visual.label}</span>
                    </div>
                    {/* Subtle teal left accent on hover */}
                    <div
                      className="absolute left-0 top-0 bottom-0 w-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: "var(--teal)" }}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-ivory mb-2 leading-snug" style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: "-0.02em" }}>
                        {service.name}
                      </h3>
                      <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--stone-400)" }}>
                        {service.description}
                      </p>
                    </div>

                    <div>
                      {/* Price & duration */}
                      <div className="flex items-center justify-between mb-4 pb-4" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                        <span className="text-2xl font-extrabold text-teal" style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: "-0.03em" }}>
                          ₹{service.price}
                        </span>
                        {service.duration && (
                          <span className="label-caps" style={{ color: "var(--stone-600)" }}>{service.duration}</span>
                        )}
                      </div>

                      {/* Book CTA — gold text-only */}
                      <Link
                        href={`/book/smile-care-indore?service=${encodeURIComponent(service.name)}`}
                        className="flex items-center justify-end gap-1.5 text-gold font-bold text-sm group-hover:gap-2.5 transition-all duration-200"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        Book this service
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
