"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Booking } from "@/types";
import { createClient } from "@/lib/supabase/client";
import { BookingCard } from "./BookingCard";
import { Sparkles, Activity } from "lucide-react";

interface LiveBookingsFeedProps {
  initialBookings?: Booking[];
}

export const LiveBookingsFeed: React.FC<LiveBookingsFeedProps> = ({ initialBookings = [] }) => {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [isLiveConnected, setIsLiveConnected] = useState<boolean>(false);

  useEffect(() => {
    // Fetch initial list from API if empty
    if (bookings.length === 0) {
      fetch("/api/bookings")
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.bookings) {
            setBookings(data.bookings);
          }
        })
        .catch((err) => console.error("Error fetching bookings:", err));
    }

    // Connect Supabase Realtime
    const supabase = createClient();
    const channel = supabase
      .channel("realtime_bookings_channel")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "bookings",
        },
        (payload) => {
          console.log("Realtime new booking received:", payload.new);
          const newBooking = payload.new as Booking;
          setBookings((prev) => [newBooking, ...prev]);
        }
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          setIsLiveConnected(true);
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg text-charcoal flex items-center gap-2">
            <span>Live Bookings Feed</span>
            <Sparkles className="w-4 h-4 text-accent" />
          </h3>
          <p className="text-xs text-stone-500">Real-time incoming appointments from Web Widget and WhatsApp.</p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{isLiveConnected ? "Realtime Active" : "Connecting..."}</span>
        </div>
      </div>

      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
        <AnimatePresence initial={false}>
          {bookings.length === 0 ? (
            <div className="text-center py-12 text-stone-400 text-sm">
              <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <span>No bookings recorded yet. New appointments will appear live.</span>
            </div>
          ) : (
            bookings.map((booking) => (
              <motion.div
                key={booking.id || `${booking.patient_phone}-${booking.created_at}`}
                initial={{ opacity: 0, y: -20, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <BookingCard booking={booking} />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
