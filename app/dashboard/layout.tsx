import React from "react";
import Link from "next/link";
import { Stethoscope, LayoutDashboard, Settings, ExternalLink } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-stone-100/70 text-charcoal">
      {/* Top Admin Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="flex items-center gap-2 font-bold text-lg text-charcoal">
              <div className="p-1.5 bg-accent text-white rounded-lg">
                <Stethoscope className="w-5 h-5" />
              </div>
              <span>Smile Care Clinic Admin</span>
            </Link>

            <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-stone-600">
              <Link
                href="/dashboard"
                className="px-3 py-2 rounded-lg hover:bg-stone-100 text-charcoal flex items-center gap-1.5"
              >
                <LayoutDashboard className="w-4 h-4 text-accent" />
                Live Feed & Stats
              </Link>
              <Link
                href="/dashboard/settings"
                className="px-3 py-2 rounded-lg hover:bg-stone-100 text-stone-600 flex items-center gap-1.5"
              >
                <Settings className="w-4 h-4 text-stone-500" />
                AI Prompt Settings
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-stone-200 hover:border-stone-300 font-semibold text-stone-700 bg-white"
            >
              <span>View Live Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </div>
  );
}
