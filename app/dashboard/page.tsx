import React from "react";
import { StatsCards } from "./components/StatsCards";
import { LiveBookingsFeed } from "./components/LiveBookingsFeed";
import { FollowUpQueue } from "./components/FollowUpQueue";

export default function DashboardMainPage() {
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

      {/* Stats Cards Section */}
      <StatsCards />

      {/* Main Grid Feed + Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7">
          <LiveBookingsFeed />
        </div>
        <div className="lg:col-span-5">
          <FollowUpQueue />
        </div>
      </div>
    </div>
  );
}
