"use client";

import React from "react";
import Image from "next/image";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Card } from "@/components/ui/Card";
import { DOCTOR_BIO, DOCTOR_EXPERIENCE, DOCTOR_NAME, DOCTOR_TITLE } from "@/lib/utils/constants";
import { Award, CheckCircle2, GraduationCap, Stethoscope, Sparkles } from "lucide-react";

export const DoctorSection: React.FC = () => {
  return (
    <section id="doctor" className="py-20 bg-stone-50/70">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Doctor Portrait Image - Reveals from Left */}
          <ScrollReveal direction="left" delay={0.1} className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
              <Image
                src="/images/doctor-portrait.png"
                alt={`${DOCTOR_NAME} - Lead Dentist in Indore`}
                width={600}
                height={700}
                className="w-full h-auto object-cover rounded-2xl"
              />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-stone-200 flex items-center gap-3">
                <div className="p-2.5 bg-gold text-white rounded-xl">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-sm text-charcoal">{DOCTOR_EXPERIENCE}</div>
                  <div className="text-xs text-stone-500">Vijay Nagar, Indore</div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Doctor Credentials & Bio - Reveals from Right */}
          <ScrollReveal direction="right" delay={0.2} className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-sm font-bold tracking-wider text-accent uppercase flex items-center gap-1.5">
                <Stethoscope className="w-4 h-4" />
                <span>Meet Our Lead Surgeon</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal">
                {DOCTOR_NAME}
              </h2>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-light text-gold-dark text-sm font-bold border border-gold/20">
                <GraduationCap className="w-4 h-4" />
                <span>{DOCTOR_TITLE}</span>
              </div>
            </div>

            <p className="text-stone-700 text-base leading-relaxed">
              {DOCTOR_BIO}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <Card hoverable={false} className="p-4 bg-white border-stone-200/80 space-y-2">
                <div className="flex items-center gap-2 text-accent font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Painless Root Canal Specialist</span>
                </div>
                <p className="text-xs text-stone-500">
                  Single-sitting rotary endodontics with zero post-treatment discomfort.
                </p>
              </Card>

              <Card hoverable={false} className="p-4 bg-white border-stone-200/80 space-y-2">
                <div className="flex items-center gap-2 text-gold font-bold text-sm">
                  <Sparkles className="w-4 h-4" />
                  <span>Orthodontics & Aligners</span>
                </div>
                <p className="text-xs text-stone-500">
                  Certified provider for invisible clear aligners and modern aesthetic ceramic braces.
                </p>
              </Card>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
