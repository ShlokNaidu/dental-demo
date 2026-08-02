"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Calendar, PhoneCall, ShieldCheck, Sparkles } from "lucide-react";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 bg-gradient-to-b from-accent-light/50 via-background to-background">
      {/* Background Soft Floating Blob */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.3, 0.45, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-teal-200/40 blur-3xl pointer-events-none"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Announcement Tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-muted text-accent text-xs sm:text-sm font-medium mb-6 border border-accent/20"
        >
          <Sparkles className="w-4 h-4" />
          <span>Indore's Premier WhatsApp-Automated Dental Care</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Copy Column */}
          <div className="lg:col-span-7 space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-charcoal leading-tight"
            >
              Painless, Modern Dental Care in{" "}
              <span className="text-accent underline decoration-accent/30 underline-offset-8">
                Vijay Nagar, Indore
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="text-lg sm:text-xl text-charcoal-muted leading-relaxed max-w-2xl"
            >
              Experience gentle treatment with state-of-the-art technology. From root canals to braces, book your appointment instantly online or directly through WhatsApp.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              <Link href="/book/smile-care-indore">
                <Button size="lg" className="w-full sm:w-auto gap-2">
                  <Calendar className="w-5 h-5" />
                  Book Appointment
                </Button>
              </Link>
              <a
                href="https://wa.me/919876543210?text=Hi%2C%20I%20would%20like%20to%20book%20an%20appointment"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2">
                  <PhoneCall className="w-5 h-5" />
                  WhatsApp Us Live
                </Button>
              </a>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-stone-500 pt-4"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-accent" />
                <span>100% Painless Tech</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-accent" />
                <span>Instant Confirmation</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-accent" />
                <span>4.9★ Patient Rating</span>
              </div>
            </motion.div>
          </div>

          {/* Hero Image / Visual Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-5"
          >
            <div className="relative bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-stone-200/80 space-y-6">
              <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                <div>
                  <h3 className="font-bold text-lg text-charcoal">Smile Care Dental Clinic</h3>
                  <p className="text-xs text-stone-500">Scheme 54, Vijay Nagar, Indore</p>
                </div>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-success-light text-success">
                  Open Today
                </span>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-accent-light/40 rounded-2xl border border-accent/10 flex items-start gap-3">
                  <div className="p-2 bg-accent text-white rounded-xl">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-charcoal">Automated Booking Available</h4>
                    <p className="text-xs text-stone-600">
                      Book online in 30 seconds or message our WhatsApp bot 24/7.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-3 bg-stone-50 rounded-xl">
                    <div className="text-xl font-bold text-accent">5,000+</div>
                    <div className="text-xs text-stone-500">Patients Treated</div>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-xl">
                    <div className="text-xl font-bold text-accent">15+ Yrs</div>
                    <div className="text-xs text-stone-500">Clinical Experience</div>
                  </div>
                </div>
              </div>

              <Link href="/book/smile-care-indore" className="block">
                <Button variant="secondary" className="w-full">
                  Check Available Slots →
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
