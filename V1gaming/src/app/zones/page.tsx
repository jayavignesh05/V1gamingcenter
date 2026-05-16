"use client";

import { Gamepad2, Zap, Car, Glasses } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function GamingZones() {
  const zones = [
    {
      tab: "PS5",
      title: "PS5 Zone",
      price: "₹199/hr",
      description: "Next-gen immersive gameplay. (₹150/hr for 4 Players)",
      specs: ["PlayStation 5 Console", "65-inch 4K OLED HDR TVs", "DualSense Wireless Controllers", "Pulse 3D Wireless Headset"],
      icon: <Gamepad2 className="w-12 h-12 text-[#DC2626]" />,
      color: "border-[#DC2626]",
      bg: "hover:bg-[#DC2626]/5",
      btn: "bg-[#DC2626] hover:bg-[#DC2626]/90 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)]",
    },
    {
      tab: "PS4",
      title: "PS4 Zone",
      price: "₹149/hr",
      description: "Budget-friendly classic gaming. (₹100/hr for 4 Players)",
      specs: ["PlayStation 4 Pro Console", "55-inch 4K Displays", "DualShock 4 Controllers", "Massive Classic Game Library"],
      icon: <Zap className="w-12 h-12 text-[#FF006E]" />,
      color: "border-[#FF006E]",
      bg: "hover:bg-[#FF006E]/5",
      btn: "bg-[#FF006E] hover:bg-[#FF006E]/90 text-white shadow-[0_0_20px_rgba(255,0,110,0.4)]",
    },
    {
      tab: "Simulation",
      title: "Simulation Zone",
      price: "₹350/hr",
      description: "Immersive racing and flight simulation rigs.",
      specs: ["Direct Drive Steering Wheels", "Motion Simulator Seats", "Ultra-wide Curved Monitors", "Pro Flight Yoke Systems"],
      icon: <Car className="w-12 h-12 text-[#FFB000]" />,
      color: "border-[#FFB000]",
      bg: "hover:bg-[#FFB000]/5",
      btn: "bg-[#FFB000] hover:bg-[#FFB000]/90 text-black shadow-[0_0_20px_rgba(255,176,0,0.4)]",
    },
    {
      tab: "VR",
      title: "VR Zone",
      price: "₹200/hr",
      description: "Full-motion virtual reality experience.",
      specs: ["Meta Quest 3 / PSVR 2", "Haptic Feedback Suits", "Omnidirectional Treadmills", "Extensive VR Game Library"],
      icon: <Glasses className="w-12 h-12 text-[#9D00FF]" />,
      color: "border-[#9D00FF]",
      bg: "hover:bg-[#9D00FF]/5",
      btn: "bg-[#9D00FF] hover:bg-[#9D00FF]/90 text-white shadow-[0_0_20px_rgba(157,0,255,0.4)]",
    }
  ];

  return (
    <main className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto selection:bg-[#DC2626]/30">
      <div className="text-center mb-16 relative z-10">
        <h1 className="text-5xl md:text-7xl font-heading font-black mb-4 uppercase text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
          GAMING <span className="text-[#00D4FF]">ZONES</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto font-medium">
          Choose your battleground. From immersive 4K OLED PS5 setups to full-motion VR experiences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {zones.map((zone, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`glass-card p-8 flex flex-col justify-between ${zone.bg} border-t-4 ${zone.color}`}
          >
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-[#000000] rounded-xl border border-white/5 shadow-inner">
                  {zone.icon}
                </div>
                <div className="text-right">
                  <span className="block text-2xl font-heading font-black text-white">{zone.price}</span>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Per Hour</span>
                </div>
              </div>
              
              <h2 className="text-3xl font-heading font-black text-white uppercase mb-2">{zone.title}</h2>
              <p className="text-gray-400 text-sm mb-6">{zone.description}</p>
              
              <ul className="space-y-3 mb-8">
                {zone.specs.map((spec, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium text-gray-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/50"></span> {spec}
                  </li>
                ))}
              </ul>
            </div>
            
            <Link 
              href={`/booking?zone=${encodeURIComponent(zone.tab)}`}
              className={`w-full py-4 rounded-xl font-heading font-bold uppercase tracking-widest text-center transition-all ${zone.btn}`}
            >
              BOOK NOW
            </Link>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
