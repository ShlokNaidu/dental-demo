import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://democlinicautomation.vercel.app"),
  title: "Smile Care Dental Clinic | Painless Dental Care in Vijay Nagar, Indore",
  description:
    "Smile Care Dental Clinic offers expert dental care in Vijay Nagar, Indore. Book root canals, teeth cleaning, braces consultations & dental checkups online or via WhatsApp — instant confirmation.",
  keywords: [
    "Dental Clinic Indore",
    "Dentist Vijay Nagar",
    "Teeth Cleaning Indore",
    "Root Canal Treatment",
    "Dental Braces",
    "WhatsApp Booking Dentist",
    "Dr Ananya Mehta",
    "Painless Root Canal Indore",
  ],
  openGraph: {
    title: "Smile Care Dental Clinic | Painless Dental Care in Indore",
    description:
      "Expert dental care led by Dr. Ananya Mehta in Vijay Nagar, Indore. Book instantly online or via WhatsApp 24/7.",
    url: "https://democlinicautomation.vercel.app",
    siteName: "Smile Care Dental Clinic",
    images: [
      {
        url: "/images/clinic-interior.png",
        width: 1200,
        height: 630,
        alt: "Smile Care Dental Clinic — Premium Interior, Vijay Nagar Indore",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Smile Care Dental Clinic | Painless Dental Care in Indore",
    description: "Expert dental care by Dr. Ananya Mehta. Book instantly online or WhatsApp 24/7.",
    images: ["/images/clinic-interior.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
