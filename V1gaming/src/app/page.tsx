"use client";

import { motion, type Transition } from "framer-motion";
import Link from "next/link";
import { Car, Gamepad2, Crown, ArrowRight, Wifi, Monitor, Users, Star, Clock, CalendarCheck, CheckCircle } from "lucide-react";

const easeCustom = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: easeCustom, delay } satisfies Transition,
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.9, ease: "easeOut" as const, delay } satisfies Transition,
});

export default function Home() {
  
  const services = [
    { title: "Simulation Zone", icon: <Car className="w-8 h-8 text-[#00D4FF]" />, image: "/images/simulation.jpg", href: "/zones?zone=Simulation", desc: "Full-motion racing & flight sims", border: "hover:border-[#00D4FF] hover:shadow-[0_0_20px_rgba(0,212,255,0.3)]" },
    { title: "PS5 Zone", icon: <Gamepad2 className="w-8 h-8 text-[#DC2626]" />, image: "/images/ps5.jpg", href: "/zones?zone=PS5", desc: "4K OLED screens, DualSense haptics", border: "hover:border-[#DC2626] hover:shadow-[0_0_20px_rgba(220,38,38,0.3)]" },
    { title: "PS4 Zone", icon: <Gamepad2 className="w-8 h-8 text-[#FFD700]" />, image: "/images/ps4.jpg", href: "/zones?zone=PS4", desc: "Competitive PS4 Pro setups", border: "hover:border-[#FFD700] hover:shadow-[0_0_20px_rgba(255,215,0,0.3)]" },
    { title: "VIP Lounge", icon: <Crown className="w-8 h-8 text-[#FF006E]" />, image: "/images/viplounge.jpg", href: "/lounge", desc: "Private rooms, 85\" displays", border: "hover:border-[#FF006E] hover:shadow-[0_0_20px_rgba(255,0,110,0.3)]" },
  ];

  const features = [
    { icon: <Monitor className="w-7 h-7 text-[#00D4FF]" />, title: "Premium Displays", desc: "4K OLED & HDR screens on every station for crystal-clear visuals.", color: "#00D4FF" },
    { icon: <Wifi className="w-7 h-7 text-[#DC2626]" />, title: "High-Speed Internet", desc: "Dedicated fiber connection — zero lag, zero excuses.", color: "#DC2626" },
    { icon: <Users className="w-7 h-7 text-[#FF006E]" />, title: "Group Bookings", desc: "Private rooms for parties, corporate events, and LAN nights.", color: "#FF006E" },
    { icon: <Star className="w-7 h-7 text-[#FFD700]" />, title: "Premium Gear", desc: "DualSense controllers, racing wheels, VR headsets — all included.", color: "#FFD700" },
  ];

  const steps = [
    { icon: <CalendarCheck className="w-8 h-8 text-[#DC2626]" />, step: "01", title: "Pick a Date & Zone", desc: "Choose your preferred date and gaming zone — PS5, Simulation, VR, or VIP Lounge." },
    { icon: <Clock className="w-8 h-8 text-[#00D4FF]" />, step: "02", title: "Select Your Slot", desc: "Pick from available time slots. Multi-hour sessions supported." },
    { icon: <CheckCircle className="w-8 h-8 text-[#22c55e]" />, step: "03", title: "Confirm & Play", desc: "Confirm your booking and show up — your station will be ready and waiting." },
  ];

  return (
    <main className="min-h-screen relative selection:bg-[#DC2626]/30">

      {/* ── HERO ── */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
        <motion.div {...fadeIn(0)} className="absolute inset-0 z-0 bg-[#000000]">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#DC2626]/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00D4FF]/10 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-[url('/hero_bg.png')] bg-cover bg-center opacity-25 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#000000]/70 to-[#000000]" />
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
          <motion.div {...fadeUp(0.1)} className="mb-5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#DC2626]/40 bg-[#DC2626]/10 text-[#DC2626] text-xs font-bold uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] animate-pulse" />
            Chennai&apos;s #1 Esports Lounge
          </motion.div>

          <motion.h1 {...fadeUp(0.25)} className="text-[2.5rem] leading-[0.9] xs:text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-heading font-black tracking-tighter mb-5 text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] uppercase px-2">
            LEVEL UP <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DC2626] via-[#FF4444] to-[#FF006E]">YOUR GAME</span>
          </motion.h1>

          <motion.p {...fadeUp(0.45)} className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto font-medium tracking-wide">
            The Ultimate Premium Esports Lounge in Chennai.
          </motion.p>

          <motion.div {...fadeUp(0.6)}>
            <Link href="/booking" className="group relative inline-flex items-center justify-center px-10 py-5 font-heading font-bold text-white bg-[#DC2626] rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(220,38,38,0.5)] hover:shadow-[0_0_50px_rgba(220,38,38,0.8)] uppercase tracking-widest text-lg">
              <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-80 group-hover:h-80 opacity-10" />
              <span className="relative flex items-center gap-3">BOOK YOUR STATION <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
            </Link>
          </motion.div>

          <motion.div {...fadeIn(1.2)} className="mt-16 flex flex-col items-center gap-2">
            <span className="text-gray-600 text-xs uppercase tracking-widest font-medium">Scroll to explore</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }} className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5">
              <div className="w-1 h-2 rounded-full bg-white/40" />
            </motion.div>
          </motion.div>
        </div>
      </section>


      {/* ── WHY V1? FEATURES ── */}
      <section className="relative z-10 py-20 bg-[#000000]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-heading font-black mb-4 text-white uppercase">Why <span className="text-[#DC2626]">V1 Gaming cafe?</span></h2>
            <p className="text-gray-400 max-w-xl mx-auto">Everything engineered for the ultimate gaming experience.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card p-7 flex flex-col gap-4 group"
                style={{ "--hover-color": f.color } as React.CSSProperties}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center border border-white/10 bg-[#000000]/60 group-hover:scale-110 transition-transform duration-300">
                  {f.icon}
                </div>
                <h3 className="font-heading font-black text-white uppercase text-base">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section className="relative z-10 py-20 bg-[#0A0A0A] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-heading font-black mb-4 text-white uppercase">Choose Your <span className="text-[#00D4FF]">Arena</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Experience the highest tier of competitive gaming.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.12 }}>
                <Link href={service.href} className={`glass-card relative h-[400px] flex flex-col group ${service.border} overflow-hidden`}>
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/40 to-transparent" />
                  </div>
                  
                  <div className="relative z-10 p-8 mt-auto flex flex-col items-start text-left">
                    <div className="mb-4 p-3 bg-[#000000]/80 rounded-xl border border-white/5 group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-heading font-black uppercase text-white mb-2">{service.title}</h3>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">{service.desc}</p>
                    <div className="flex items-center text-sm font-bold text-gray-500 group-hover:text-white transition-colors uppercase">
                      Explore <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="relative z-10 py-20 bg-[#000000] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-heading font-black mb-4 text-white uppercase">How It <span className="text-[#DC2626]">Works</span></h2>
            <p className="text-gray-400 max-w-xl mx-auto">Book your session in 3 simple steps.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* connecting line */}
            <div className="hidden md:block absolute top-12 left-1/3 right-1/3 h-px bg-gradient-to-r from-transparent via-[#DC2626]/40 to-transparent" />

            {steps.map((s, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="relative flex flex-col items-center text-center gap-4 p-8 glass-panel">
                <div className="w-16 h-16 rounded-2xl bg-[#000000] border border-white/10 flex items-center justify-center">
                  {s.icon}
                </div>
                <span className="text-5xl font-heading font-black text-white/5 absolute top-4 right-6 select-none">{s.step}</span>
                <h3 className="font-heading font-black text-white uppercase text-base">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRENDING TITLES ── */}
      <section className="relative z-10 py-20 bg-[#000000] border-t border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-4xl md:text-5xl font-heading font-black text-white uppercase mb-2">Epic <span className="text-[#DC2626]">Titles</span></h2>
              <p className="text-gray-400">Play the latest and greatest blockbusters on our pro stations.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <Link href="/zones" className="text-[#DC2626] font-bold uppercase tracking-widest text-sm flex items-center gap-2 hover:gap-3 transition-all">
                View All Zones <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: "FC 24", img: "/images/FC24.avif" },
              { name: "Spider-Man 2", img: "/images/spiderman2.webp" },
              { name: "God of War", img: "/images/godofwar.avif" },
              { name: "GTA V", img: "/images/GTA5.webp" },
              { name: "Mortal Kombat 1", img: "/images/motralkombat.webp" },
              { name: "Call of Duty", img: "/images/callofduty.webp" }
            ].map((game, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10">
                <img src={game.img} alt={game.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-60 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <span className="text-white font-heading font-bold text-xs uppercase tracking-wider">{game.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VIP LOUNGE TEASER ── */}
      <section className="relative z-10 py-24 bg-[#111111] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: easeCustom }} className="w-full lg:w-1/2 space-y-6">
            <div className="inline-block px-4 py-1 rounded-full border border-[#FF006E]/50 bg-[#FF006E]/10 text-[#FF006E] text-xs font-bold uppercase tracking-widest">Exclusive Access</div>
            <h2 className="text-4xl md:text-6xl font-heading font-black text-white uppercase leading-tight">
              THE VIP <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF006E] to-purple-500">LOUNGE</span>
            </h2>
            <ul className="space-y-3 font-medium text-gray-300">
              {["Plush Leather Recliners", "Massive 85-inch 4K HDR Displays", "Immersive Surround Sound", "Private Atmosphere & Custom Catering"].map((item, i) => (
                <motion.li key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }} className="flex items-center gap-3">
                  <span className="text-[#FF006E]">•</span> {item}
                </motion.li>
              ))}
            </ul>
            <div className="pt-4">
              <Link href="/lounge" className="inline-block px-8 py-4 bg-[#FF006E] text-white font-heading font-bold uppercase tracking-widest rounded-full hover:bg-[#FF006E]/90 hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_20px_rgba(255,0,110,0.4)]">
                Discover The Lounge
              </Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: easeCustom, delay: 0.1 }} className="w-full lg:w-1/2">
            <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(255,0,110,0.15)]">
              <div className="absolute inset-0 bg-[url('/images/viplounge.jpg')] bg-cover bg-center opacity-70 hover:opacity-90 transition-opacity duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/60 to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="relative z-10 py-24 bg-[#000000] border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero_bg.png')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/80 via-transparent to-[#000000]/80" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#DC2626]/10 rounded-full blur-[120px]" />

        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: easeCustom }} className="relative z-10 max-w-3xl mx-auto text-center px-4">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-heading font-black text-white uppercase tracking-tighter mb-4 leading-none">
            READY TO <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DC2626] to-[#FF006E]">PLAY?</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg mb-10">Book your station now and experience gaming like never before.</p>
          <Link href="/booking" className="group inline-flex items-center gap-3 px-8 sm:px-12 py-4 sm:py-5 bg-[#DC2626] text-white font-heading font-black uppercase tracking-widest rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(220,38,38,0.5)] hover:shadow-[0_0_60px_rgba(220,38,38,0.8)] text-base sm:text-lg">
            Book Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </section>

    </main>
  );
}
