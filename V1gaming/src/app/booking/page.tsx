import Reservation from "@/components/Reservation/Reservation";

export default function Booking() {
  return (
    <main className="min-h-screen pt-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Reserve Your <span className="text-cyan-400">Station</span></h1>
        <p className="text-gray-400 max-w-2xl mx-auto">Reserve your spot at the ultimate gaming destination. Select your date, preferred station, and time slot.</p>
      </div>
      <Reservation />
    </main>
  );
}
