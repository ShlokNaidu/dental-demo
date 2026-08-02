import React from "react";
import Link from "next/link";
import { CLINIC_ADDRESS, CLINIC_PHONE, DOCTOR_NAME } from "@/lib/utils/constants";
import { Stethoscope } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal-dark text-stone-300 py-12 border-t border-stone-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1 */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-2 text-white font-bold text-xl">
              <Stethoscope className="w-6 h-6 text-accent" />
              <span>Smile Care Dental Clinic</span>
            </div>
            <p className="text-sm text-stone-400 max-w-md leading-relaxed">
              Painless, gentle, and transparent dental treatments in Vijay Nagar, Indore. Led by {DOCTOR_NAME}, Senior Dental Surgeon.
            </p>
            <div className="text-xs text-stone-400 space-y-1">
              <div>📍 {CLINIC_ADDRESS}</div>
              <div>📞 {CLINIC_PHONE}</div>
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white text-sm">Navigation</h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li><Link href="/" className="hover:text-accent transition-colors">Home</Link></li>
              <li><Link href="#services" className="hover:text-accent transition-colors">Services & Pricing</Link></li>
              <li><Link href="#doctor" className="hover:text-accent transition-colors">Our Dentist</Link></li>
              <li><Link href="#location" className="hover:text-accent transition-colors">Clinic Location</Link></li>
              <li><Link href="/book/smile-care-indore" className="hover:text-accent transition-colors">Book Online</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white text-sm">Clinic Owner</h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <Link href="/dashboard" className="text-accent hover:underline font-medium">
                  Live Clinic Dashboard →
                </Link>
              </li>
              <li>
                <Link href="/dashboard/settings" className="hover:text-stone-200 transition-colors">
                  AI FAQ Settings
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Smile Care Dental Clinic. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
