"use client";

import React from "react";
import { Booking } from "@/types";
import { Calendar, Clock, Phone, User, MessageSquare, Globe } from "lucide-react";

interface BookingCardProps {
  booking: Booking;
}

export const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  return (
    <div className="p-4 rounded-xl border border-stone-200 bg-white hover:border-accent/40 transition-all shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-accent-muted flex items-center justify-center text-accent font-bold text-xs">
            {booking.patient_name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h4 className="font-bold text-charcoal text-sm">{booking.patient_name}</h4>
            <div className="flex items-center gap-1 text-xs text-stone-500">
              <Phone className="w-3 h-3" />
              <span>{booking.patient_phone}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
              booking.source === "WHATSAPP"
                ? "bg-emerald-100 text-emerald-800"
                : "bg-teal-100 text-teal-800"
            }`}
          >
            {booking.source === "WHATSAPP" ? (
              <>
                <MessageSquare className="w-3 h-3" /> WhatsApp
              </>
            ) : (
              <>
                <Globe className="w-3 h-3" /> Web Widget
              </>
            )}
          </span>
        </div>
      </div>

      <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center justify-between text-xs text-stone-600 gap-2">
        <div className="font-medium text-accent">{booking.service_name}</div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-stone-400" />
            {booking.booking_date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-stone-400" />
            {booking.booking_time}
          </span>
        </div>
      </div>
    </div>
  );
};
