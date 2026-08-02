"use client";

import React from "react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Card } from "@/components/ui/Card";
import { CLINIC_ADDRESS, CLINIC_HOURS, CLINIC_PHONE } from "@/lib/utils/constants";
import { Clock, MapPin, Phone, MessageSquare } from "lucide-react";

export const LocationSection: React.FC = () => {
  return (
    <section id="location" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-sm font-semibold tracking-wider text-accent uppercase">
            Visit Our Clinic
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal">
            Location & Working Hours
          </h2>
          <p className="text-charcoal-muted">
            Conveniently located in Scheme 54, Vijay Nagar, Indore with dedicated parking.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Info Card */}
          <ScrollReveal className="lg:col-span-5 space-y-6">
            <Card className="p-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-accent/10 text-accent rounded-xl">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-charcoal text-lg">Address</h3>
                  <p className="text-sm text-stone-600 mt-1">{CLINIC_ADDRESS}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-accent/10 text-accent rounded-xl">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-charcoal text-lg">Clinic Hours</h3>
                  <p className="text-sm text-stone-600 mt-1">{CLINIC_HOURS}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-accent/10 text-accent rounded-xl">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-charcoal text-lg">Phone & WhatsApp</h3>
                  <p className="text-sm text-stone-600 mt-1">{CLINIC_PHONE}</p>
                </div>
              </div>

              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center gap-3 text-emerald-800 text-xs font-medium">
                <MessageSquare className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>WhatsApp AI Assistant active 24/7 for automated instant booking.</span>
              </div>
            </Card>
          </ScrollReveal>

          {/* Map Embed Frame */}
          <ScrollReveal className="lg:col-span-7 h-full min-h-[380px]">
            <div className="w-full h-full min-h-[380px] rounded-3xl overflow-hidden shadow-lg border border-stone-200">
              <iframe
                title="Smile Care Dental Clinic Vijay Nagar Indore Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14717.391662584105!2d75.8856!3d22.7533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396302af403406fb%3A0x5b3310065095368a!2sVijay%20Nagar%2C%20Indore%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "380px" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
