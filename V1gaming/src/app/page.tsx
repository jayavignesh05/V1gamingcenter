"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MonitorPlay, Gamepad2, Crown, Coffee, ArrowRight } from "lucide-react";

export default function Home() {
  const stats = [
    { value: "50+", label: "Stations" },
    { value: "PC & PS5", label: "Zones" },
    { value: "24/7", label: "Open" },
    { value: "T Nagar", label: "Chennai" },
  ];

  const services = [
    { title: "PC Gaming Zone", icon: <MonitorPlay className="w-8 h-8 text-[#00D4FF]" />, href: "/zones", border: "hover:border-[#00D4FF] hover:shadow-[0_0_20px_rgba(0,212,255,0.4)]" },
    { title: "PS5 & PS4 Zone", icon: <Gamepad2 className="w-8 h-8 text-[#00FF41]" />, href: "/zones", border: "hover:border-[#00FF41] hover:shadow-[0_0_20px_rgba(0,255,65,0.4)]" },
    { title: "VIP Lounge", icon: <Crown className="w-8 h-8 text-[#FF006E]" />, href: "/lounge", border: "hover:border-[#FF006E] hover:shadow-[0_0_20px_rgba(255,0,110,0.4)]" },
    { title: "Cafe & Gear Shop", icon: <Coffee className="w-8 h-8 text-yellow-400" />, href: "/shop", border: "hover:border-yellow-400 hover:shadow-[0_0_20px_rgba(250,204,21,0.4)]" },
  ];

  return (
    <main className="min-h-screen relative selection:bg-[#00FF41]/30">
      {/* Hero Section */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0 bg-[#000000]">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00FF41]/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00D4FF]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "2s" }}></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-30 mix-blend-luminosity"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#000000]/80 to-[#000000]"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl lg:text-9xl font-heading font-black tracking-tighter mb-6 text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] leading-none uppercase"
          >
            LEVEL UP <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF41] via-[#00D4FF] to-[#FF006E]">YOUR GAME</span>
          </motion.h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-3xl mx-auto font-medium tracking-wide">
            The Ultimate Premium Esports Lounge in Chennai.
          </p>
          <Link href="/booking" className="group relative inline-flex items-center justify-center px-10 py-5 font-heading font-bold text-[#000000] bg-[#00FF41] rounded-full overflow-hidden transition-all hover:scale-105 shadow-[0_0_30px_rgba(0,255,65,0.6)] focus:outline-none uppercase tracking-widest text-lg">
            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-72 group-hover:h-72 opacity-20"></span>
            <span className="relative flex items-center gap-3">
              BOOK YOUR STATION
            </span>
          </Link>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative z-10 border-y border-white/10 bg-[#111111]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x divide-white/10">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center px-4">
                <div className="text-3xl md:text-4xl font-heading font-black text-white mb-1 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">{stat.value}</div>
                <div className="text-sm font-semibold text-[#00FF41] uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative z-10 py-24 bg-[#000000]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-black mb-4 text-white uppercase">Choose Your <span className="text-[#00D4FF]">Arena</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Experience the highest tier of competitive gaming.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => (
              <Link href={service.href} key={idx} className={`glass-card p-8 flex flex-col items-center text-center group ${service.border}`}>
                <div className="mb-6 p-4 bg-[#000000]/80 rounded-2xl border border-white/5 group-hover:scale-110 transition-transform shadow-inner">
                  {service.icon}
                </div>
                <h3 className="text-xl font-heading font-black uppercase text-white mb-2">{service.title}</h3>
                <div className="mt-4 flex items-center text-sm font-bold text-gray-500 group-hover:text-white transition-colors uppercase">
                  Explore <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* VIP Lounge Teaser */}
      <section className="relative z-10 py-24 bg-[#111111] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2 space-y-6">
            <div className="inline-block px-4 py-1 rounded-full border border-[#FF006E]/50 bg-[#FF006E]/10 text-[#FF006E] text-xs font-bold uppercase tracking-widest">
              Exclusive Access
            </div>
            <h2 className="text-4xl md:text-6xl font-heading font-black text-white uppercase leading-tight">
              THE VIP <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF006E] to-purple-500">LOUNGE</span>
            </h2>
            <ul className="space-y-3 font-medium text-gray-300">
              <li className="flex items-center gap-3"><span className="text-[#FF006E]">•</span> Plush Leather Recliners</li>
              <li className="flex items-center gap-3"><span className="text-[#FF006E]">•</span> Massive 85-inch 4K HDR Displays</li>
              <li className="flex items-center gap-3"><span className="text-[#FF006E]">•</span> Immersive Surround Sound</li>
              <li className="flex items-center gap-3"><span className="text-[#FF006E]">•</span> Private Atmosphere & Custom Catering</li>
            </ul>
            <div className="pt-4">
              <Link href="/lounge" className="inline-block px-8 py-4 bg-[#FF006E] text-white font-heading font-bold uppercase tracking-widest rounded-full hover:bg-[#FF006E]/90 transition-all shadow-[0_0_20px_rgba(255,0,110,0.4)]">
                Discover The Lounge
              </Link>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(255,0,110,0.1)]">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-50 mix-blend-luminosity hover:opacity-80 transition-opacity duration-500"></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
