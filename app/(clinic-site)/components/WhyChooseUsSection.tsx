"use client";

import React from "react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

const PILLARS = [
  {
    number: "01",
    title: "Strict Sterilization",
    description: "Class-B autoclave sterilization for every instrument. Your safety is non-negotiable.",
    accent: "var(--teal)",
  },
  {
    number: "02",
    title: "Advanced 3D Technology",
    description: "Low-radiation digital X-rays and intraoral 3D scanning for precise, comfortable diagnosis.",
    accent: "var(--teal)",
  },
  {
    number: "03",
    title: "Zero Anxiety Protocol",
    description: "Computerized anesthesia and a calm, patient-first approach — designed to ease every fear.",
    accent: "var(--gold)",
  },
  {
    number: "04",
    title: "15+ Years Excellence",
    description: "Senior surgeons trained in modern implantology, orthodontics, and restorative dentistry.",
    accent: "var(--gold)",
  },
];

export const WhyChooseUsSection: React.FC = () => {
  return (
    <section
      className="py-24"
      style={{ background: "var(--bg-base)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <ScrollReveal className="mb-16 max-w-2xl">
          <p className="label-caps text-teal mb-3">The Smile Care Difference</p>
          <h2 className="text-display-md text-ivory mb-4">
            Why Patients in Indore Trust Us
          </h2>
          <p style={{ color: "var(--stone-400)" }} className="text-lg leading-relaxed">
            High-tech dentistry with a warm, patient-first approach. Every visit, stress-free.
          </p>
        </ScrollReveal>

        {/* Pillars — numbered list style, not icon-in-box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ border: "1px solid var(--border-subtle)", borderRadius: "16px", overflow: "hidden" }}>
          {PILLARS.map((pillar, idx) => (
            <ScrollReveal key={pillar.title} delay={idx * 0.1}>
              <div
                className="group p-8 relative overflow-hidden transition-colors duration-300"
                style={{
                  background: "var(--bg-elevated)",
                  borderRight: idx % 2 === 0 ? "1px solid var(--border-subtle)" : "none",
                  borderBottom: idx < 2 ? "1px solid var(--border-subtle)" : "none",
                }}
              >
                {/* Number */}
                <div
                  className="text-7xl font-black mb-6 leading-none select-none transition-colors duration-300"
                  style={{
                    fontFamily: "'Hanken Grotesk', sans-serif",
                    color: "var(--bg-elevated-hi)",
                    letterSpacing: "-0.04em",
                  }}
                >
                  {pillar.number}
                </div>

                {/* Accent line */}
                <div
                  className="w-10 h-0.5 mb-5 transition-all duration-300 group-hover:w-16"
                  style={{ background: pillar.accent }}
                />

                <h3
                  className="text-xl font-bold text-ivory mb-3 leading-snug"
                  style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: "-0.02em" }}
                >
                  {pillar.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--stone-400)" }}>
                  {pillar.description}
                </p>

                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at 30% 50%, ${pillar.accent}08, transparent 65%)`,
                  }}
                />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
