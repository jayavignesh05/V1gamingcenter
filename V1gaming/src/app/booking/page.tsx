import type { Metadata } from "next";
import { Suspense } from "react";
import Reservation from "@/components/Reservation/Reservation";

export const metadata: Metadata = {
  title: "Book Your Gaming Station — Reserve Now",
  description:
    "Reserve your premium station at V1 Gaming Center, Chennai. Book PS5 & PS4 Zones, VR, Simulation, Celebrations Lounge (birthday parties, gaming tournaments) or OTT Lounge (watch live sports, cricket matches, private movie screenings). Choose your date & time slot for instant online booking.",
  keywords: [
    "book gaming station Chennai",
    "gaming reservation Chennai",
    "PS5 booking Kalpalayam Chennai",
    "VR gaming booking Chennai",
    "online gaming center booking Chennai",
    "reserve gaming lounge Chennai",
    "birthday party lounge Chennai booking",
    "OTT lounge booking Chennai",
    "watch live cricket match lounge Chennai",
    "private movie screening Chennai cafe",
    "celebrations lounge booking V1"
  ],
  alternates: { canonical: "/booking" },
  openGraph: {
    title: "Book Your Station | V1 Gaming Center Chennai",
    description:
      "Online booking for PS5, PS4, VR, Simulation & VIP Lounge gaming sessions at V1 Gaming Center, Kalpalayam, Chennai-600099.",
    url: "https://www.v1gamingcenter.com/booking",
  },
};

export default function Booking() {
  return (
    <main className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto selection:bg-[#DC2626]/30">
      <div className="text-center mb-8 relative z-10">
        <h1 className="text-4xl md:text-5xl font-heading font-black mb-3 uppercase text-white drop-shadow-[0_0_20px_rgba(220,38,38,0.2)]">
          RESERVE YOUR <span className="text-[#DC2626]">STATION</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto font-medium text-sm">
          Select your zone, date, and preferred time slot below.
        </p>
      </div>
      <Suspense fallback={null}>
        <Reservation />
      </Suspense>
    </main>
  );
}

