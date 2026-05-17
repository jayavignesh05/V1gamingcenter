"use client";

import { Gamepad2, Zap, Car, Glasses, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function GamingZonesClient() {
  const zones = [
    {
      tab: "PS5",
      title: "PS5 Zone",
      price: "₹199",
      period: "hour",
      image: "/images/ps5.jpg",
      description: "Next-gen immersive gameplay. Special team rate of ₹150/hr for 4+ players.",
      specs: [
        "PlayStation 5 Console (Slim/Pro)",
        "65-inch LG OLED 4K HDR TVs (120Hz)",
        "DualSense Wireless Controllers",
        "Pulse 3D Wireless Over-Ear Headset"
      ],
      icon: <Gamepad2 className="w-5 h-5" />,
      color: "#DC2626", // Red
      glowClass: "hover:shadow-[0_0_35px_rgba(220,38,38,0.3)] hover:border-[#DC2626]/50",
      btnClass: "bg-[#DC2626] hover:bg-[#DC2626]/90 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)]",
      badges: ["4K OLED 120Hz", "DualSense Haptics", "Co-Op"],
      accentColor: "from-[#DC2626]/20 via-transparent to-transparent",
      badgeColor: "border-[#DC2626]/30 text-[#FF4444] bg-[#DC2626]/10",
      iconBg: "bg-[#DC2626]/10 border-[#DC2626]/30 text-[#FF4444]",
    },
    {
      tab: "PS4",
      title: "PS4 Zone",
      price: "₹149",
      period: "hour",
      image: "/images/ps4.jpg",
      description: "Budget-friendly classic multiplayer gaming. Special team rate of ₹100/hr for 4+ players.",
      specs: [
        "PlayStation 4 Pro Console",
        "55-inch HDR Gaming Displays",
        "DualShock 4 Wireless Controllers",
        "Massive Local & Online Game Library"
      ],
      icon: <Zap className="w-5 h-5" />,
      color: "#FF006E", // Pink
      glowClass: "hover:shadow-[0_0_35px_rgba(255,0,110,0.3)] hover:border-[#FF006E]/50",
      btnClass: "bg-[#FF006E] hover:bg-[#FF006E]/90 text-white shadow-[0_0_20px_rgba(255,0,110,0.4)] hover:shadow-[0_0_30px_rgba(255,0,110,0.6)]",
      badges: ["PS4 Pro", "Massive Library", "Retro Hits"],
      accentColor: "from-[#FF006E]/20 via-transparent to-transparent",
      badgeColor: "border-[#FF006E]/30 text-[#FF3385] bg-[#FF006E]/10",
      iconBg: "bg-[#FF006E]/10 border-[#FF006E]/30 text-[#FF3385]",
    },
    {
      tab: "Simulation",
      title: "Simulation Zone",
      price: "₹350",
      period: "hour",
      image: "/images/simulation.jpg",
      description: "Immersive direct-drive racing and high-fidelity flight simulation rigs.",
      specs: [
        "Fanatec Direct Drive Steering Wheels",
        "Next Level Racing Motion Simulator Seats",
        "49-inch Curved Ultra-wide Monitors",
        "Thrustmaster Pro Flight Yoke Systems"
      ],
      icon: <Car className="w-5 h-5" />,
      color: "#FFB000", // Gold/Orange
      glowClass: "hover:shadow-[0_0_35px_rgba(255,176,0,0.3)] hover:border-[#FFB000]/50",
      btnClass: "bg-[#FFB000] hover:bg-[#FFB000]/90 text-black shadow-[0_0_20px_rgba(255,176,0,0.4)] hover:shadow-[0_0_30px_rgba(255,176,0,0.6)]",
      badges: ["Direct Drive", "Motion Rig", "Ultra-wide"],
      accentColor: "from-[#FFB000]/20 via-transparent to-transparent",
      badgeColor: "border-[#FFB000]/30 text-[#FFB000] bg-[#FFB000]/10",
      iconBg: "bg-[#FFB000]/10 border-[#FFB000]/30 text-[#FFB000]",
    },
    {
      tab: "VR",
      title: "VR Zone",
      price: "₹200",
      period: "hour",
      image: "/images/viplounge.jpg",
      description: "Step into another dimension with full-motion 3D virtual reality setups.",
      specs: [
        "Meta Quest 3 & PlayStation VR2 Headsets",
        "Kat VR Omnidirectional Treadmills",
        "Haptic Feedback Chest Vests",
        "Curated Library of Multiplayer VR Games"
      ],
      icon: <Glasses className="w-5 h-5" />,
      color: "#9D00FF", // Purple
      glowClass: "hover:shadow-[0_0_35px_rgba(157,0,255,0.3)] hover:border-[#9D00FF]/50",
      btnClass: "bg-[#9D00FF] hover:bg-[#9D00FF]/90 text-white shadow-[0_0_20px_rgba(157,0,255,0.4)] hover:shadow-[0_0_30px_rgba(157,0,255,0.6)]",
      badges: ["Meta Quest 3", "Kat VR Treadmill", "Full Haptics"],
      accentColor: "from-[#9D00FF]/20 via-transparent to-transparent",
      badgeColor: "border-[#9D00FF]/30 text-[#B84DFF] bg-[#9D00FF]/10",
      iconBg: "bg-[#9D00FF]/10 border-[#9D00FF]/30 text-[#B84DFF]",
    }
  ];

  return (
    <main className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto selection:bg-[#DC2626]/30 relative overflow-hidden">
      {/* Background Glow Elements */}
      <div className="absolute top-[10%] left-[5%] w-[350px] h-[350px] rounded-full bg-[#DC2626]/5 blur-[120px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute top-[35%] right-[5%] w-[450px] h-[450px] rounded-full bg-[#9D00FF]/5 blur-[150px] pointer-events-none -z-10" style={{ animationDelay: "2s" }} />
      <div className="absolute bottom-[10%] left-[20%] w-[400px] h-[400px] rounded-full bg-[#FFB000]/5 blur-[130px] pointer-events-none -z-10 animate-pulse" style={{ animationDelay: "4s" }} />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-16 relative z-10"
      >
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-gray-300 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-pulse" />
          Pro-Gaming Battlegrounds
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black mb-4 uppercase text-white tracking-tight drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
          CHOOSE YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DC2626] via-[#FF006E] to-[#9D00FF]">ARENA</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto font-medium text-base sm:text-lg">
          Engineered for peak performance. Experience lag-free esports setups, immersive direct-drive racing, and high-fidelity virtual reality.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto relative z-10">
        {zones.map((zone, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.12 }}
            className={`relative flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#111111] to-[#060606] border border-white/10 rounded-3xl transition-all duration-500 group ${zone.glowClass} hover:-translate-y-2.5`}
            style={{ "--card-color": zone.color } as React.CSSProperties}
          >
            {/* Top accent glow overlay */}
            <div className={`absolute top-0 inset-x-0 h-40 bg-gradient-to-b ${zone.accentColor} opacity-50 pointer-events-none z-10 transition-opacity duration-500 group-hover:opacity-100`} />

            <div>
              {/* Image banner */}
              <div className="relative w-full">
                <div className="relative h-56 w-full overflow-hidden rounded-t-[22px]">
                  <img 
                    src={zone.image} 
                    alt={zone.title} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-112 opacity-65 group-hover:opacity-85"
                  />
                  {/* Visual overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-transparent z-10" />
                  
                  {/* Floating price badge */}
                  <div className="absolute top-4 right-4 z-20 px-3.5 py-1.5 rounded-full bg-black/85 border border-white/15 backdrop-blur-md flex items-baseline gap-0.5 shadow-lg">
                    <span className="font-heading font-black text-white text-xl tracking-tight">{zone.price}</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">/{zone.period}</span>
                  </div>
                </div>
                
                {/* Floating category icon */}
                <div className={`absolute -bottom-6 left-6 z-20 w-12 h-12 rounded-2xl flex items-center justify-center border backdrop-blur-xl shadow-lg transition-transform duration-500 group-hover:scale-110 ${zone.iconBg}`}>
                  {zone.icon}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 pt-9 flex flex-col">
                {/* Badges list */}
                <div className="flex flex-wrap gap-1.5 mb-3.5">
                  {zone.badges.map((badge, bIdx) => (
                    <span 
                      key={bIdx} 
                      className={`px-2 py-0.5 rounded-md border text-[9px] font-black uppercase tracking-wider ${zone.badgeColor}`}
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                <h2 className="text-2xl font-heading font-black text-white uppercase tracking-tight mb-2 transition-colors duration-300 group-hover:text-[var(--card-color)]">
                  {zone.title}
                </h2>
                
                <p className="text-gray-400 text-xs leading-relaxed mb-6 font-medium">
                  {zone.description}
                </p>

                {/* Specs section */}
                <div className="border-t border-white/5 pt-5 mb-8">
                  <span className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-4">
                    Rig Configuration & features
                  </span>
                  <ul className="space-y-3">
                    {zone.specs.map((spec, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs font-semibold text-gray-300 leading-normal">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" style={{ color: zone.color }} />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Book Now Button */}
            <div className="p-6 pt-0 mt-auto">
              <Link 
                href={`/booking?zone=${encodeURIComponent(zone.tab)}`}
                className={`w-full py-4 rounded-xl font-heading font-black uppercase tracking-widest text-center transition-all flex items-center justify-center gap-2 group-hover:scale-[1.02] active:scale-[0.98] ${zone.btnClass}`}
              >
                BOOK STATION <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
