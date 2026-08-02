"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { Calendar, TrendingUp, Bot, AlertTriangle, Clock } from "lucide-react";

interface StatsCardsProps {
  bookingsToday?: number;
  bookingsThisWeek?: number;
  botHandledCount?: number;
  humanHandoffCount?: number;
  avgResponseTimeSec?: number;
}

export const StatsCards: React.FC<StatsCardsProps> = ({
  bookingsToday = 8,
  bookingsThisWeek = 42,
  botHandledCount = 124,
  humanHandoffCount = 3,
  avgResponseTimeSec = 1.2,
}) => {
  const stats = [
    {
      label: "Bookings Today",
      value: bookingsToday.toString(),
      subtext: "+25% vs yesterday",
      icon: Calendar,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      label: "Bookings This Week",
      value: bookingsThisWeek.toString(),
      subtext: "On track for record week",
      icon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Bot vs Human Handoff",
      value: `${botHandledCount} / ${humanHandoffCount}`,
      subtext: "97.6% automated resolution",
      icon: Bot,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      label: "Avg Bot Latency",
      value: `${avgResponseTimeSec}s`,
      subtext: "Instant WhatsApp reply",
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
