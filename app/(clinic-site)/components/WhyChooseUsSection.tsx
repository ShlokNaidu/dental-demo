"use client";

import React from "react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Card } from "@/components/ui/Card";
import { Award, Cpu, HeartHandshake, ShieldCheck } from "lucide-react";

export const WhyChooseUsSection: React.FC = () => {
  const pillars = [
    {
      icon: ShieldCheck,
      title: "Strict Sterilization & Hygiene",
      description: "Class-B autoclave sterilization protocol for every instrument. Your health & safety are our highest priorities.",
    },
    {
      icon: Cpu,
      title: "Advanced 3D Technology",
      description: "Low-radiation digital X-rays and intraoral 3D scanning for accurate diagnosis with minimal discomfort.",
    },
    {
      icon: HeartHandshake,
      title: "Painless Treatment Approach",
      description: "Computerized local anesthesia and gentle techniques designed specifically to ease dental anxiety.",
    },
    {
      icon: Award,
      title: "15+ Years Clinical Excellence",
      description: "Led by senior dental surgeons trained in modern implantology, orthodontics, and restorative dentistry.",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-sm font-semibold tracking-wider text-accent uppercase">
            The Smile Care Difference
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal">
            Why Patients in Indore Trust Us
          </h2>
          <p className="text-charcoal-muted">
            We combine high-tech dentistry with a warm, patient-first approach to make every visit stress-free.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <ScrollReveal key={pillar.title} delay={idx * 0.1}>
                <Card className="h-full space-y-4 p-6 border-stone-200/60">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-charcoal">{pillar.title}</h3>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </Card>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
