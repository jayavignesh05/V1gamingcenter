import Hero from "@/components/Hero/Hero";
import Reservation from "@/components/Reservation/Reservation";

export default function Home() {
  return (
    <main className="min-h-screen relative selection:bg-cyan-500/30">
      <Hero />
      <div id="booking" className="pt-20 pb-20 scroll-mt-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Reserve Your <span className="text-cyan-400">Station</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto px-4">Reserve your spot at the ultimate gaming destination. Select your date, preferred station, and time slot.</p>
        </div>
        <Reservation />
      </div>
    </main>
  );
}
