"use client";

import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { CLINIC_SERVICES, CLINIC_NAME } from "@/lib/utils/constants";
import { isValidBookingDate, isValidBookingTime, isValidPhoneNumber } from "@/lib/utils/validators";
import { CheckCircle2, ChevronLeft, Calendar, Clock, User, Phone, Stethoscope, MessageCircle } from "lucide-react";

type BookingStep = 1 | 2 | 3 | 4 | 5; // 1: Service, 2: Date, 3: Time, 4: Patient Info, 5: Success

export default function BookingWidgetPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const clinicSlug = (params?.clinicSlug as string) || "smile-care-indore";

  const initialService = searchParams?.get("service") || "";

  const [step, setStep] = useState<BookingStep>(1);
  const [selectedService, setSelectedService] = useState<string>(initialService);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [patientName, setPatientName] = useState<string>("");
  const [patientPhone, setPatientPhone] = useState<string>("");

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    if (initialService) {
      const exists = CLINIC_SERVICES.some((s) => s.name.toLowerCase() === initialService.toLowerCase());
      if (exists) {
        setSelectedService(initialService);
      }
    }
  }, [initialService]);

  const availableTimeSlots = [
    "10:00 AM",
    "11:30 AM",
    "02:00 PM",
    "04:30 PM",
    "06:00 PM",
    "07:15 PM",
  ];

  const handleNextStep = async () => {
    setErrorMsg("");

    if (step === 1) {
      if (!selectedService) {
        setErrorMsg("Please select a dental service to proceed.");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!isValidBookingDate(selectedDate)) {
        setErrorMsg("Please select a valid date (today or future date).");
        return;
      }
      setStep(3);
    } else if (step === 3) {
      if (!isValidBookingTime(selectedTime)) {
        setErrorMsg("Please select a valid time slot.");
        return;
      }
      setStep(4);
    } else if (step === 4) {
      if (!patientName || patientName.trim().length < 2) {
        setErrorMsg("Please enter your full name.");
        return;
      }
      if (!isValidPhoneNumber(patientPhone)) {
        setErrorMsg("Please enter a valid 10-digit phone number.");
        return;
      }

      setIsSubmitting(true);
      try {
        const response = await fetch("/api/send-booking", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            clinicId: clinicSlug,
            patientName,
            patientPhone,
            serviceName: selectedService,
            bookingDate: selectedDate,
            bookingTime: selectedTime,
            source: "WEB_WIDGET",
          }),
        });

        const data = await response.json();
        if (response.ok && data.success) {
          setStep(5);
        } else {
          setErrorMsg(data.error || "Failed to confirm booking. Please try again.");
        }
      } catch (err) {
        console.error("Booking submission error:", err);
        setErrorMsg("Network error submitting appointment. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handlePrevStep = () => {
    setErrorMsg("");
    if (step > 1 && step < 5) {
      setStep((prev) => (prev - 1) as BookingStep);
    }
  };

  const getStepProgress = () => {
    return Math.min(((step - 1) / 4) * 100, 100);
  };

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col justify-center items-center p-4 sm:p-6">
      <div className="w-full max-w-xl">
        {/* Header Branding */}
        <div className="text-center mb-6 space-y-1">
          <div className="inline-flex items-center gap-2 text-accent font-bold text-lg">
            <Stethoscope className="w-5 h-5" />
            <span>{CLINIC_NAME}</span>
          </div>
          <p className="text-xs text-stone-500">Fast Online & WhatsApp Booking • Vijay Nagar, Indore</p>
        </div>

        {/* Card Container */}
        <Card hoverable={false} className="p-6 sm:p-8 relative overflow-hidden bg-white shadow-xl">
          {/* Progress Bar */}
          {step < 5 && (
            <div className="w-full bg-stone-100 h-1.5 rounded-full mb-8 overflow-hidden">
              <div
                className="bg-accent h-full transition-all duration-300 ease-out"
                style={{ width: `${getStepProgress()}%` }}
              />
            </div>
          )}

          {errorMsg && (
            <div className="mb-6 p-3 bg-error-light text-error text-xs font-medium rounded-xl border border-error/20">
              {errorMsg}
            </div>
          )}

          <AnimatePresence mode="wait">
            {/* STEP 1: Select Service */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-bold text-charcoal">Select Treatment Service</h2>
                  <p className="text-xs text-stone-500 mt-1">Choose the service you need for your dental appointment.</p>
                </div>

                <div className="space-y-3">
                  {CLINIC_SERVICES.map((s) => {
                    const isSelected = selectedService === s.name;
                    return (
                      <div
                        key={s.name}
                        onClick={() => setSelectedService(s.name)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? "border-accent bg-accent-light/50 ring-2 ring-accent/30"
                            : "border-stone-200 hover:border-stone-300 bg-white"
                        }`}
                      >
                        <div>
                          <h4 className="font-bold text-charcoal text-sm">{s.name}</h4>
                          <p className="text-xs text-stone-500">{s.description}</p>
                        </div>
                        <div className="text-right">
                          <span className="font-extrabold text-accent text-base">₹{s.price}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <Button onClick={handleNextStep} className="w-full">
                  Continue to Select Date →
                </Button>
              </motion.div>
            )}

            {/* STEP 2: Select Date */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <button
                    onClick={handlePrevStep}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-stone-500 hover:text-charcoal mb-2"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back to Services
                  </button>
                  <h2 className="text-2xl font-bold text-charcoal">Select Appointment Date</h2>
                  <p className="text-xs text-stone-500 mt-1">Chosen service: {selectedService}</p>
                </div>

                <div className="space-y-4">
                  <Input
                    label="Appointment Date"
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedDate(new Date().toISOString().split("T")[0])}
                      className="px-3 py-1.5 text-xs bg-stone-100 hover:bg-stone-200 text-charcoal rounded-lg font-medium"
                    >
                      Today
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const tomorrow = new Date();
                        tomorrow.setDate(tomorrow.getDate() + 1);
                        setSelectedDate(tomorrow.toISOString().split("T")[0]);
                      }}
                      className="px-3 py-1.5 text-xs bg-stone-100 hover:bg-stone-200 text-charcoal rounded-lg font-medium"
                    >
                      Tomorrow
                    </button>
                  </div>
                </div>

                <Button onClick={handleNextStep} className="w-full">
                  Continue to Select Time →
                </Button>
              </motion.div>
            )}

            {/* STEP 3: Select Time */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <button
                    onClick={handlePrevStep}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-stone-500 hover:text-charcoal mb-2"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back to Date
                  </button>
                  <h2 className="text-2xl font-bold text-charcoal">Select Time Slot</h2>
                  <p className="text-xs text-stone-500 mt-1">Date: {selectedDate}</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {availableTimeSlots.map((time) => {
                    const isSelected = selectedTime === time;
                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`p-3 rounded-xl border text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                          isSelected
                            ? "border-accent bg-accent text-white shadow-md shadow-accent/20"
                            : "border-stone-200 bg-white text-charcoal hover:border-stone-300"
                        }`}
                      >
                        <Clock className="w-4 h-4" />
                        <span>{time}</span>
                      </button>
                    );
                  })}
                </div>

                <Button onClick={handleNextStep} className="w-full">
                  Continue to Patient Details →
                </Button>
              </motion.div>
            )}

            {/* STEP 4: Patient Info */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <button
                    onClick={handlePrevStep}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-stone-500 hover:text-charcoal mb-2"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back to Time
                  </button>
                  <h2 className="text-2xl font-bold text-charcoal">Patient Information</h2>
                  <p className="text-xs text-stone-500 mt-1">Enter details to receive WhatsApp confirmation.</p>
                </div>

                <div className="space-y-4">
                  <Input
                    label="Full Name"
                    placeholder="e.g. Ramesh Kumar"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                  />

                  <Input
                    label="WhatsApp Mobile Number"
                    placeholder="e.g. 9876543210"
                    type="tel"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                  />
                </div>

                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1 text-stone-600">
                  <div className="font-bold text-charcoal mb-1">Booking Summary:</div>
                  <div>• Service: <span className="font-semibold">{selectedService}</span></div>
                  <div>• Date & Time: <span className="font-semibold">{selectedDate} at {selectedTime}</span></div>
                </div>

                <Button onClick={handleNextStep} disabled={isSubmitting} className="w-full">
                  {isSubmitting ? "Confirming Booking..." : "Confirm & Send WhatsApp Ticket"}
                </Button>
              </motion.div>
            )}

            {/* STEP 5: Success Confirmation */}
            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="text-center py-6 space-y-6"
              >
                <div className="w-16 h-16 bg-success-light text-success rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-charcoal">Booking Confirmed!</h2>
                  <p className="text-sm text-stone-600 max-w-sm mx-auto">
                    We've sent a WhatsApp confirmation ticket to <span className="font-bold text-charcoal">{patientPhone}</span>.
                  </p>
                </div>

                <div className="p-5 bg-accent-light/40 border border-accent/20 rounded-2xl text-left text-xs space-y-2 max-w-sm mx-auto">
                  <div className="flex items-center gap-2 font-bold text-accent text-sm mb-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Ticket Details</span>
                  </div>
                  <div><span className="text-stone-500">Patient:</span> <span className="font-semibold">{patientName}</span></div>
                  <div><span className="text-stone-500">Service:</span> <span className="font-semibold">{selectedService}</span></div>
                  <div><span className="text-stone-500">Date & Time:</span> <span className="font-semibold">{selectedDate} @ {selectedTime}</span></div>
                  <div><span className="text-stone-500">Location:</span> Smile Care Dental Clinic, Vijay Nagar, Indore</div>
                </div>

                <div className="pt-2">
                  <Button onClick={() => setStep(1)} variant="outline" className="w-full">
                    Book Another Appointment
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </div>
    </div>
  );
}
