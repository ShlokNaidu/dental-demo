"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { CLINIC_ADDRESS, CLINIC_HOURS, CLINIC_NAME, CLINIC_PHONE, DEFAULT_CLINIC_ID } from "@/lib/utils/constants";
import { Bot, Save, CheckCircle2, RefreshCw } from "lucide-react";

export default function ClinicSettingsPage() {
  const [clinicName, setClinicName] = useState<string>(CLINIC_NAME);
  const [address, setAddress] = useState<string>(CLINIC_ADDRESS);
  const [phone, setPhone] = useState<string>(CLINIC_PHONE);
  const [hours, setHours] = useState<string>(CLINIC_HOURS);
  const [systemPrompt, setSystemPrompt] = useState<string>(
    "You are an intelligent, polite, and reassuring AI assistant for Smile Care Dental Clinic in Vijay Nagar, Indore. Answer patient logistics questions accurately based on prices: Cleaning (₹800), Root Canal (₹3500), Braces Consultation (₹500), Checkup (₹300). Hours are Mon-Sat 10 AM - 8 PM. Keep answers concise and helpful."
  );

  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  useEffect(() => {
    // Fetch clinic settings from API
    fetch(`/api/clinics/${DEFAULT_CLINIC_ID}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.clinic) {
          setClinicName(data.clinic.name);
          setAddress(data.clinic.address);
          setPhone(data.clinic.phone);
          setHours(data.clinic.hours);
          setSystemPrompt(data.clinic.system_prompt);
        }
      })
      .catch((err) => console.error("Error fetching clinic settings:", err));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSavedSuccess(false);

    try {
      const response = await fetch(`/api/clinics/${DEFAULT_CLINIC_ID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: clinicName,
          address,
          phone,
          hours,
          system_prompt: systemPrompt,
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
      }
    } catch (err) {
      console.error("Failed to save clinic prompt settings:", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal">
          Clinic FAQ & AI Prompt Editor
        </h1>
        <p className="text-sm text-stone-500 mt-1">
          Customize hours, services, and FAQ rules that feed directly into your Groq WhatsApp AI Chatbot.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <Card hoverable={false} className="p-6 space-y-6 border-stone-200">
          <h3 className="font-bold text-lg text-charcoal pb-3 border-b border-stone-100">
            Clinic Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Clinic Name"
              value={clinicName}
              onChange={(e) => setClinicName(e.target.value)}
            />
            <Input
              label="Contact Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Input
              label="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Input
              label="Clinic Operating Hours"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
            />
          </div>
        </Card>

        <Card hoverable={false} className="p-6 space-y-6 border-stone-200">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-accent" />
              <h3 className="font-bold text-lg text-charcoal">Groq AI System Prompt Instruction</h3>
            </div>
            <span className="text-xs text-purple-700 bg-purple-100 font-semibold px-2.5 py-1 rounded-full">
              Model: llama-3.1-8b-instant
            </span>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-stone-600 uppercase">
              System Instruction Text (Used for all automated FAQ responses)
            </label>
            <textarea
              rows={6}
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              className="w-full p-4 rounded-xl border border-stone-300 text-sm text-charcoal bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent font-mono leading-relaxed"
            />
            <p className="text-xs text-stone-500">
              Changes saved here immediately update the AI chatbot prompt without needing code redeployment.
            </p>
          </div>
        </Card>

        <div className="flex items-center justify-between pt-4">
          {savedSuccess ? (
            <div className="inline-flex items-center gap-2 text-success font-semibold text-sm bg-success-light px-4 py-2 rounded-xl">
              <CheckCircle2 className="w-4 h-4" />
              <span>Groq AI Prompt Settings Saved Successfully!</span>
            </div>
          ) : (
            <div />
          )}

          <Button type="submit" disabled={isSaving} className="gap-2">
            {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{isSaving ? "Saving Settings..." : "Save Settings"}</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
