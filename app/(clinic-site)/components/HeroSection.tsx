"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Counter } from "@/components/animations/Counter";
import { CLINIC_PHONE, DOCTOR_NAME } from "@/lib/utils/constants";

export const HeroSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const cleanPhone = CLINIC_PHONE.replace(/[^\d]/g, "");
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    "Hi, I would like to book an appointment at Smile Care Dental Clinic"
  )}`;

  // Parallax: photo moves at -15% of scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const photoY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ["0%", "0%"] : ["0%", "-15%"]
  );

  // Stagger delays
  const eyebrow  = { opacity: 0, y: 12 };
  const line1    = { opacity: 0, y: 20 };
  const line2    = { opacity: 0, y: 20 };
  const sub      = { opacity: 0, y: 16 };
  const ctaAnim  = { opacity: 0, scale: 0.94 };
  const meta     = { opacity: 0, y: 8 };
  const photoAnim= { opacity: 0, x: 40 };

  const baseTransition = (delay: number) => ({
    duration: 0.5,
    delay,
    ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
  });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex overflow-hidden"
      style={{ background: "var(--bg-base)" }}
    >
      {/* ─── LEFT: Content Panel ─────────────────────────────── */}
      <div className="relative z-10 flex flex-col justify-center w-full lg:w-1/2 px-8 sm:px-12 lg:px-16 xl:px-20 py-24 lg:py-0">

        {/* Eyebrow */}
        <motion.p
          className="label-caps text-teal mb-6"
          initial={shouldReduceMotion ? {} : eyebrow}
          animate={{ opacity: 1, y: 0 }}
          transition={baseTransition(0.05)}
        >
          Smile Care Dental Clinic · Vijay Nagar, Indore
        </motion.p>

        {/* Headline — 2 lines, massive scale */}
        <div className="mb-6 space-y-0">
          <motion.div
            className="text-display-2xl text-ivory block"
            initial={shouldReduceMotion ? {} : line1}
            animate={{ opacity: 1, y: 0 }}
            transition={baseTransition(0.12)}
          >
            Your Smile.
          </motion.div>
          <motion.div
            className="text-display-2xl block"
            style={{ color: "var(--teal)" }}
            initial={shouldReduceMotion ? {} : line2}
            animate={{ opacity: 1, y: 0 }}
            transition={baseTransition(0.20)}
          >
            Our Life's Work.
          </motion.div>
        </div>

        {/* Subheadline */}
        <motion.p
          className="text-lg leading-relaxed mb-10 max-w-md"
          style={{ color: "var(--stone-400)" }}
          initial={shouldReduceMotion ? {} : sub}
          animate={{ opacity: 1, y: 0 }}
          transition={baseTransition(0.28)}
        >
          Led by <span className="text-ivory font-semibold">{DOCTOR_NAME}</span>, BDS, MDS — painless root canals,
          digital braces, and comprehensive care. Book in under 60 seconds.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mb-10"
          initial={shouldReduceMotion ? {} : ctaAnim}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...baseTransition(0.36), type: "spring", stiffness: 220, damping: 18 }}
        >
          <Link href="/book/smile-care-indore">
            <button className="btn-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/></svg>
              Book Appointment
            </button>
          </Link>
          <a href={waUrl} target="_blank" rel="noopener noreferrer">
            <button className="btn-ghost">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
              WhatsApp Us
            </button>
          </a>
        </motion.div>

        {/* Location meta — plain inline, no badge */}
        <motion.p
          className="label-caps"
          style={{ color: "var(--stone-600)" }}
          initial={shouldReduceMotion ? {} : meta}
          animate={{ opacity: 1, y: 0 }}
          transition={baseTransition(0.44)}
        >
          📍 Scheme 54, Vijay Nagar, Indore &nbsp;·&nbsp; Mon–Sat 10 AM – 8 PM &nbsp;·&nbsp; Sun Closed
        </motion.p>
      </div>

      {/* ─── RIGHT: Full-bleed Photography ──────────────────── */}
      <motion.div
        className="hidden lg:block absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden"
        initial={shouldReduceMotion ? {} : photoAnim}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Parallax wrapper */}
        <motion.div
          className="absolute inset-0"
          style={{ y: photoY, scale: 1.1 }}
        >
          <Image
            src="/images/clinic-interior.png"
            alt="Smile Care Dental Clinic — Premium interior, Vijay Nagar Indore"
            fill
            className="object-cover"
            priority
            sizes="50vw"
          />
          {/* Dark gradient left edge — blends photo into dark panel */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0F1117] to-transparent pointer-events-none" />
          {/* Bottom gradient */}
          <div className="absolute inset-x-0 bottom-0 h-40 img-overlay-dark pointer-events-none" />
        </motion.div>

        {/* Glassmorphism chip — bottom-left of photo */}
        <motion.div
          className="absolute bottom-10 left-8 glass rounded-2xl px-5 py-4 z-10"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={baseTransition(0.5)}
        >
          <div className="flex items-center gap-5">
            <div className="text-center">
              <div className="text-2xl font-extrabold text-teal font-display tracking-tight">
                <Counter value={5000} suffix="+" />
              </div>
              <div className="label-caps mt-1" style={{ color: "var(--stone-400)" }}>Patients Treated</div>
            </div>
            <div className="w-px h-10 self-center" style={{ background: "var(--border-subtle)" }} />
            <div className="text-center">
              <div className="text-2xl font-extrabold text-teal font-display tracking-tight">
                <Counter value={15} suffix="+ Yrs" />
              </div>
              <div className="label-caps mt-1" style={{ color: "var(--stone-400)" }}>Experience</div>
            </div>
          </div>
        </motion.div>

        {/* Open status chip — top-right */}
        <div className="absolute top-8 right-8 glass rounded-full px-4 py-2 z-10">
          <span className="label-caps text-emerald-400">● Open Today · 10 AM – 8 PM</span>
        </div>
      </motion.div>

      {/* Mobile: photo strip below content */}
      <div className="absolute inset-x-0 bottom-0 h-48 lg:hidden overflow-hidden">
        <Image
          src="/images/clinic-interior.png"
          alt="Smile Care Dental Clinic"
          fill
          className="object-cover object-top"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F1117] to-transparent pointer-events-none" />
      </div>
    </section>
  );
};
