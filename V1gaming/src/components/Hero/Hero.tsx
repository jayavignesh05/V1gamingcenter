"use client";

import Image from "next/image";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0 bg-black">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#39FF14]/20 rounded-full blur-[120px] animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FF007F]/20 rounded-full blur-[120px] animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div className="absolute inset-0 bg-[url('/images/ps5.jpg')] bg-cover bg-center opacity-20 mix-blend-luminosity"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/80 to-black"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-16 flex flex-col items-center">
        <motion.div 
          animate={{ y: [0, -15, 0] }} 
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="mb-8 opacity-80"
        >
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/PlayStation_5_DualSense_controller_transparent_background.png" alt="DualSense" className="h-48 drop-shadow-[0_0_30px_rgba(57,255,20,0.4)]" />
        </motion.div>

        <div className="inline-block mb-4 px-4 py-1.5 rounded-none border border-[#FF007F]/50 bg-[#FF007F]/10 text-[#FF007F] font-mono text-xs uppercase tracking-[0.2em] backdrop-blur-md">
          Next-Gen PS5 & Classic PS4 Zone
        </div>
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-6 text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] leading-none uppercase mix-blend-difference">
          DOMINATE <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#39FF14] to-[#FF007F]">THE CONSOLE</span>
        </h1>
        <Link href="/booking" className="group relative inline-flex items-center justify-center px-10 py-5 font-black text-black bg-[#39FF14] rounded-none overflow-hidden transition-all hover:scale-105 shadow-[0_0_30px_rgba(57,255,20,0.6)] focus:outline-none uppercase tracking-widest text-lg">
          <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-72 group-hover:h-72 opacity-20"></span>
          <span className="relative flex items-center gap-3">
            RESERVE YOUR RIG <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </span>
        </Link>
      </div>
    </section>
  );
}
