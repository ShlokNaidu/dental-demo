import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smile Care Dental Clinic | Painless Dental Care in Indore",
  description:
    "Smile Care Dental Clinic offers expert dental care in Vijay Nagar, Indore. Book root canals, teeth cleaning, braces consultations & dental checkups online or via WhatsApp.",
  keywords: [
    "Dental Clinic Indore",
    "Dentist Vijay Nagar",
    "Teeth Cleaning Indore",
    "Root Canal Treatment",
    "Dental Braces",
    "WhatsApp Booking Dentist",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-accent selection:text-white">
        {children}
      </body>
    </html>
  );
}
