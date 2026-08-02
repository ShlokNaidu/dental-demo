"use client";

import React, { useState } from "react";
import { HumanFollowUpFlag } from "@/types";
import { AlertTriangle, CheckCircle, PhoneCall, Clock } from "lucide-react";

interface FollowUpQueueProps {
  initialFlags?: HumanFollowUpFlag[];
}

export const FollowUpQueue: React.FC<FollowUpQueueProps> = ({ initialFlags = [] }) => {
  const [flags, setFlags] = useState<HumanFollowUpFlag[]>(
    initialFlags.length > 0
      ? initialFlags
      : [
          {
            id: "flag-1",
            phone_number: "+91 98765 11223",
            patient_name: "Vikram Malhotra",
            reason: 'Medical keywords detected: "severe pain and swelling near upper molar"',
            original_message: "Doctor I have severe pain and swelling near my upper molar since last night. Please help!",
            status: "PENDING",
            created_at: new Date().toISOString(),
          },
        ]
  );

  const handleResolve = (id: string) => {
    setFlags((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status: "RESOLVED" } : f))
    );
  };

  const pendingFlags = flags.filter((f) => f.status === "PENDING");

  return (
    <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg text-charcoal flex items-center gap-2">
            <span>Human Call-Back Queue</span>
            {pendingFlags.length > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-error-light text-error text-xs font-bold">
                {pendingFlags.length} Urgent
              </span>
            )}
          </h3>
          <p className="text-xs text-stone-500">Messages flagged for emergency or clinical callback.</p>
        </div>
      </div>

      <div className="space-y-3">
        {flags.length === 0 ? (
          <div className="text-center py-8 text-stone-400 text-sm">
            No medical follow-up flags pending.
          </div>
        ) : (
          flags.map((flag) => (
            <div
              key={flag.id}
              className={`p-4 rounded-xl border transition-all ${
                flag.status === "PENDING"
                  ? "border-amber-300 bg-amber-50/40"
                  : "border-stone-200 bg-stone-50 opacity-60"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <AlertTriangle
                      className={`w-4 h-4 ${
                        flag.status === "PENDING" ? "text-amber-600" : "text-stone-400"
                      }`}
                    />
                    <span className="font-bold text-sm text-charcoal">
                      {flag.patient_name || flag.phone_number}
                    </span>
                    <span className="text-xs text-stone-500">({flag.phone_number})</span>
                  </div>

                  <p className="text-xs text-stone-700 font-medium italic">
                    "{flag.original_message}"
                  </p>

                  <div className="text-[11px] text-stone-500">{flag.reason}</div>
                </div>

                <div>
                  {flag.status === "PENDING" ? (
                    <button
                      onClick={() => handleResolve(flag.id)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1 shadow-sm transition-colors"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Mark Called</span>
                    </button>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs text-emerald-700 font-semibold bg-emerald-100 px-2.5 py-1 rounded-full">
                      <CheckCircle className="w-3.5 h-3.5" /> Resolved
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
