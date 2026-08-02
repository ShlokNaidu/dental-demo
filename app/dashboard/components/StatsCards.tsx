"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { Calendar, TrendingUp, Bot, Clock } from "lucide-react";

interface StatsCardsProps {
  bookingsToday?: number;
  bookingsThisWeek?: number;
  botHandledCount?: number;
  humanHandoffCount?: number;
  avgResponseTimeSec?: number;
}

export const StatsCards: React.FC<StatsCardsProps> = ({
  bookingsToday = 0,
  bookingsThisWeek = 0,
  botHandledCount = 0,
  humanHandoffCount = 0,
  avgResponseTimeSec = 0.8,
}) => {
  const stats = [
    {
      label: "Bookings Today",
      value: bookingsToday.toString(),
      subtext: bookingsToday > 0 ? `${bookingsToday} confirmed today` : "No bookings yet today",
      icon: Calendar,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      label: "Bookings This Week",
      value: bookingsThisWeek.toString(),
      subtext: bookingsThisWeek > 0 ? `${bookingsThisWeek} total this week` : "Week total tracking live",
      icon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Bot vs Human Handoff",
      value: `${botHandledCount} / ${humanHandoffCount}`,
      subtext: humanHandoffCount > 0 ? `${humanHandoffCount} urgent callbacks` : "0 emergency handoffs",
      icon: Bot,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      label: "Avg Bot Latency",
      value: `${avgResponseTimeSec}s`,
      subtext: "Instant automated reply",
      icon: Clock,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label} hoverable={false} className="p-5 border-stone-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-500 uppercase">{stat.label}</span>
              <div className={`p-2.5 rounded-xl ${stat.bgColor} ${stat.color}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-extrabold text-charcoal">{stat.value}</div>
              <div className="text-xs text-stone-500 mt-1">{stat.subtext}</div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
