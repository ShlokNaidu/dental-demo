"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Counter } from "@/components/animations/Counter";
import { Calendar, PhoneCall, ShieldCheck, MapPin, Star, Award } from "lucide-react";
import { CLINIC_PHONE, DOCTOR_NAME } from "@/lib/utils/constants";

export const HeroSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const cleanPhone = CLINIC_PHONE.replace(/[^\d]/g, "");
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    "Hi, I would like to book an appointment at Smile Care Dental Clinic"
  )}`;

  return (
    <section className="relative overflow-hidden pt-10 pb-20 md:pt-16 md:pb-28 bg-gradient-to-b from-accent-light/60 via-background to-background">
      {/* Background Soft Ambient Light */}
      <div className="absolute top-0 right-0 w-1/2 h-96 bg-teal-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-amber-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Location & Accreditation Tag */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-stone-200 shadow-sm text-xs sm:text-sm font-medium text-stone-700 mb-6"
        >
          <MapPin className="w-4 h-4 text-accent" />
          <span>Scheme 54, Vijay Nagar, Indore</span>
          <span className="text-stone-300">•</span>
          <span className="text-amber-700 font-semibold flex items-center gap-1">
            <Award className="w-3.5 h-3.5" /> ISO Certified Clinic
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Copy Column */}
          <div className="lg:col-span-7 space-y-6">
            <motion.h1
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.12 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-charcoal leading-tight"
            >
              Painless, Modern Dental Care in{" "}
              <span className="custom-highlight text-accent">
                Vijay Nagar, Indore
              </span>
            </motion.h1>

            <motion.p
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.22 }}
              className="text-lg sm:text-xl text-charcoal-muted leading-relaxed max-w-2xl"
            >
              Led by <strong className="text-charcoal font-semibold">{DOCTOR_NAME}</strong>. From painless root canals to digital braces, reserve your appointment online in under 60 seconds or message our WhatsApp team.
            </motion.p>

            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.32, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              <Link href="/book/smile-care-indore">
                <Button size="lg" className="w-full sm:w-auto gap-2 text-base font-bold">
                  <Calendar className="w-5 h-5" />
                  Book Appointment
                </Button>
              </Link>
              <a href={waUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2 border-emerald-600 text-emerald-700 hover:bg-emerald-600 hover:text-white font-semibold">
                  <PhoneCall className="w-5 h-5" />
                  WhatsApp Us Live
                </Button>
              </a>
            </motion.div>

            {/* Trust Badges Staggered Last */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.42 }}
              className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-stone-600 pt-4 border-t border-stone-200/60"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-accent" />
                <span>100% Painless Tech</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-accent" />
                <span>Instant Confirmation</span>
              </div>
              <div className="flex items-center gap-1.5 font-bold text-charcoal">
                <div className="flex text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                </div>
                <span>4.9 / 5 (500+ Reviews)</span>
              </div>
            </motion.div>
          </div>

          {/* Hero Photography Visual Card - Right Slide Entrance */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.25, ease: "easeOut" }}
            className="lg:col-span-5"
          >
            <div className="relative bg-white rounded-3xl p-3 shadow-2xl border border-stone-200">
              <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden mb-4">
                <Image
                  src="/images/clinic-interior.png"
                  alt="Smile Care Dental Clinic Interior Indore"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 right-3 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-emerald-700 border border-emerald-200">
                  Open Today • 10 AM - 8 PM
                </div>
              </div>

              <div className="px-4 pb-3 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-base text-charcoal">Smile Care Dental Clinic</h3>
                    <p className="text-xs text-stone-500">{DOCTOR_NAME} • Senior Dental Surgeon</p>
                  </div>
                  <Link href="/book/smile-care-indore">
                    <span className="px-3 py-1.5 rounded-xl bg-accent text-white text-xs font-bold hover:bg-accent-hover transition-colors">
                      Book Slot →
                    </span>
                  </Link>
                </div>

                {/* Animated Counters */}
                <div className="grid grid-cols-2 gap-3 text-center pt-2 border-t border-stone-100">
                  <div className="p-2.5 bg-stone-50 rounded-xl">
                    <div className="text-lg font-bold text-accent">
                      <Counter value={5000} suffix="+" />
                    </div>
                    <div className="text-[11px] text-stone-500">Patients Treated</div>
                  </div>
                  <div className="p-2.5 bg-stone-50 rounded-xl">
                    <div className="text-lg font-bold text-accent">
                      <Counter value={15} suffix="+ Yrs" />
                    </div>
                    <div className="text-[11px] text-stone-500">Clinical Experience</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
