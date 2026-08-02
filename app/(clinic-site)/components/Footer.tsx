import React from "react";
import Link from "next/link";
import { CLINIC_ADDRESS, CLINIC_PHONE, DOCTOR_NAME } from "@/lib/utils/constants";

export const Footer: React.FC = () => {
  return (
    <footer style={{ background: "var(--bg-elevated)", borderTop: "1px solid var(--border-subtle)", color: "var(--stone-400)" }} className="py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="w-2 h-6 rounded-sm" style={{ background: "var(--teal)" }} />
              <span className="text-ivory font-bold text-lg" style={{ fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: "-0.02em" }}>
                Smile Care Dental Clinic
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm">
              Painless, gentle, and transparent dental treatments in Vijay Nagar, Indore. Led by {DOCTOR_NAME}, Senior Dental Surgeon.
            </p>
            <div className="text-xs space-y-1.5" style={{ color: "var(--stone-600)" }}>
              <div>📍 {CLINIC_ADDRESS}</div>
              <div>📞 {CLINIC_PHONE}</div>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <h4 className="font-semibold text-ivory text-sm" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>Navigation</h4>
            <ul className="space-y-2 text-sm">
              {[
                ["Home", "/"],
                ["Services & Pricing", "#services"],
                ["Our Dentist", "#doctor"],
                ["Clinic Location", "#location"],
                ["Book Online", "/book/smile-care-indore"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="hover:text-ivory transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Owner */}
          <div className="space-y-3">
            <h4 className="font-semibold text-ivory text-sm" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>Clinic Owner</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/dashboard" className="hover:text-ivory transition-colors" style={{ color: "var(--teal)" }}>
                  Live Clinic Dashboard →
                </Link>
              </li>
              <li>
                <Link href="/dashboard/settings" className="hover:text-ivory transition-colors">
                  AI FAQ Settings
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs gap-4"
          style={{ borderTop: "1px solid var(--border-subtle)", color: "var(--stone-600)" }}
        >
          <p>© {new Date().getFullYear()} Smile Care Dental Clinic. All rights reserved.</p>
          <p style={{ color: "var(--stone-600)" }}>Vijay Nagar, Indore, MP 452010</p>
        </div>
      </div>
    </footer>
  );
};
