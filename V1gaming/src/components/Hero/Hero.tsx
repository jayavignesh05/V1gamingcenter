import Image from "next/image";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero_bg.png"
          alt="Premium Gaming Setup"
          fill
          className="object-cover opacity-40 mix-blend-luminosity"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
        <div className="inline-block mb-4 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-medium backdrop-blur-sm">
          Next-Gen Gaming Experience
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white drop-shadow-lg">
          CYBER <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">HUB</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          Immerse yourself in peak performance. Premium PS5 and high-end PC setups paired with an artisanal cafe experience.
        </p>
        <Link href="#booking" className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-black bg-cyan-400 rounded-lg overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] focus:outline-none">
          <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
          <span className="relative flex items-center gap-2">
            Book Now <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>
      </div>
    </section>
  );
}
