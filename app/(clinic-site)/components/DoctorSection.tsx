"use client";

import React from "react";
import Image from "next/image";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { DOCTOR_BIO, DOCTOR_EXPERIENCE, DOCTOR_NAME, DOCTOR_TITLE } from "@/lib/utils/constants";

export const DoctorSection: React.FC = () => {
  return (
    <section
      id="doctor"
      className="py-24"
      style={{ background: "var(--bg-surface)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Doctor Portrait — full-bleed, no card frame */}
          <ScrollReveal direction="left" delay={0.1} className="lg:col-span-5 relative">
            <div className="relative overflow-hidden rounded-2xl aspect-[3/4]">
              <Image
                src="/images/doctor-portrait.png"
                alt={`${DOCTOR_NAME} — Senior Dental Surgeon, Vijay Nagar Indore`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
              {/* Bottom gradient overlay */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 img-overlay-dark pointer-events-none" />

              {/* Glassmorphism credential chip */}
              <div className="absolute bottom-6 left-6 right-6 glass rounded-xl px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full" style={{ background: "var(--gold)" }} />
                  <div>
                    <div className="text-ivory font-bold text-sm" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
                      {DOCTOR_EXPERIENCE}
                    </div>
                    <div className="label-caps mt-0.5" style={{ color: "var(--stone-400)" }}>
                      Vijay Nagar, Indore
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Credentials — right side */}
          <ScrollReveal direction="right" delay={0.2} className="lg:col-span-7 space-y-8">
            <div>
              <p className="label-caps text-teal mb-4">Meet Our Lead Surgeon</p>
              <h2 className="text-display-md text-ivory mb-3">{DOCTOR_NAME}</h2>
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold"
                style={{
                  background: "var(--gold-dim)",
                  color: "var(--gold)",
                  border: "1px solid rgba(217,119,6,0.3)",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></svg>
                {DOCTOR_TITLE}
              </div>
            </div>

            <p className="text-lg leading-relaxed" style={{ color: "var(--stone-400)" }}>
              {DOCTOR_BIO}
            </p>

            {/* Specialties — horizontal rule list */}
            <div className="space-y-4 pt-2">
              {[
                {
                  label: "Painless Root Canal",
                  detail: "Single-sitting rotary endodontics with zero post-treatment discomfort.",
                  accent: "var(--teal)",
                },
                {
                  label: "Orthodontics & Aligners",
                  detail: "Certified invisible clear aligner provider and ceramic braces specialist.",
                  accent: "var(--gold)",
                },
              ].map((spec) => (
                <div
                  key={spec.label}
                  className="flex gap-4 py-4"
                  style={{ borderTop: "1px solid var(--border-subtle)" }}
                >
                  <div className="w-1 self-stretch rounded-full flex-shrink-0" style={{ background: spec.accent }} />
                  <div>
                    <div
                      className="font-bold text-ivory text-base mb-1"
                      style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
                    >
                      {spec.label}
                    </div>
                    <div className="text-sm" style={{ color: "var(--stone-400)" }}>{spec.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
