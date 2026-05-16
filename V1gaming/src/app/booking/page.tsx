import { Suspense } from "react";
import Reservation from "@/components/Reservation/Reservation";

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

