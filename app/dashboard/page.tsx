"use client";

import React, { useEffect, useState } from "react";
import { StatsCards } from "./components/StatsCards";
import { LiveBookingsFeed } from "./components/LiveBookingsFeed";
import { FollowUpQueue } from "./components/FollowUpQueue";
import { Booking } from "@/types";

export default function DashboardMainPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [stats, setStats] = useState({
    bookingsToday: 0,
    bookingsThisWeek: 0,
    botHandledCount: 0,
    humanHandoffCount: 0,
    avgResponseTimeSec: 0.8,
  });

  useEffect(() => {
    fetch("/api/bookings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          if (data.bookings) setBookings(data.bookings);
          if (data.stats) setStats(data.stats);
        }
      })
      .catch((err) => console.error("Error loading dashboard data:", err));
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal">
          Clinic Operations & Realtime Feed
        </h1>
        <p className="text-sm text-stone-500 mt-1">
          Monitor incoming WhatsApp and website bookings live for Smile Care Dental Clinic.
        </p>
      </div>

      {/* Dynamic Stats Cards */}
      <StatsCards
        bookingsToday={stats.bookingsToday}
        bookingsThisWeek={stats.bookingsThisWeek}
        botHandledCount={stats.botHandledCount}
        humanHandoffCount={stats.humanHandoffCount}
        avgResponseTimeSec={stats.avgResponseTimeSec}
      />

      {/* Main Grid Feed + Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7">
          <LiveBookingsFeed initialBookings={bookings} />
        </div>
        <div className="lg:col-span-5">
          <FollowUpQueue />
        </div>
      </div>
    </div>
  );
}
