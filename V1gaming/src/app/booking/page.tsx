import Reservation from "@/components/Reservation/Reservation";

export default function Booking() {
  return (
    <main className="min-h-screen pt-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto selection:bg-[#00FF41]/30">
      <div className="text-center mb-12 relative z-10">
        <h1 className="text-5xl md:text-7xl font-heading font-black mb-4 uppercase text-white drop-shadow-[0_0_20px_rgba(0,255,65,0.2)]">
          RESERVE YOUR <span className="text-[#00FF41]">STATION</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto font-medium">
          Select your zone, date, and preferred time slot below.
        </p>
      </div>
      <Reservation />
    </main>
  );
}
