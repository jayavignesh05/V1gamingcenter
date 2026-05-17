"use client";

import { Wrench, MonitorSmartphone, Settings, ShieldCheck, ShoppingBag, ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

export default function SalesService() {
  const sales = [
    { 
      title: "PS5 Console & Accessories", 
      image: "/images/ps5.jpg",
      desc: "Buy brand new or certified pre-owned PS5 Consoles, DualSense Wireless Controllers, Pulse 3D Audio Headsets, and other official Sony accessories.",
      whatsappQuery: "Hi V1 Gaming Cafe, I am looking to buy a PS5 Console or related PS5 accessories. Please share availability and best prices."
    },
    { 
      title: "PS4 Console & Accessories", 
      image: "/images/ps4.jpg",
      desc: "Buy certified pre-owned PS4 Slim or Pro Consoles, DualShock 4 Wireless Controllers, charging docks, and classic ecosystem accessories.",
      whatsappQuery: "Hi V1 Gaming Cafe, I am looking to buy a PS4 Console or related PS4 accessories. Please share availability and best prices."
    },
  ];

  const services = [
    { 
      title: "Console Deep Clean", 
      desc: "Thermal paste replacement, heatsink clearing, and full internal dust removal to resolve loud fan issues.", 
      icon: <Settings className="w-6 h-6 text-[#00D4FF]" /> 
    },
    { 
      title: "Controller Repair", 
      desc: "Stick drift fix, analog replacement, sticky button fixing, and replacement batteries for DualSense & DS4.", 
      icon: <Wrench className="w-6 h-6 text-[#00D4FF]" /> 
    },
    { 
      title: "Disc Drive Fix", 
      desc: "Laser lens calibration & replacement, mechanical alignment, and resolve disc feeding or reading issues.", 
      icon: <MonitorSmartphone className="w-6 h-6 text-[#00D4FF]" /> 
    },
    { 
      title: "OS & Warranty", 
      desc: "Software corruption repairs, system reinstalls, hard drive upgrades, and official warranty advisory services.", 
      icon: <ShieldCheck className="w-6 h-6 text-[#00D4FF]" /> 
    },
  ];

  return (
    <main className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto selection:bg-[#00D4FF]/30 relative overflow-hidden">
      {/* Background ambient glows (Static for lag-free rendering) */}
      <div className="absolute top-[10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-[#DC2626]/5 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#00D4FF]/5 blur-[150px] pointer-events-none -z-10" />

      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-20 relative z-10"
      >
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-gray-300 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-pulse" />
          Hardware & Professional repairs
        </div>
        <h1 className="text-5xl md:text-7xl font-heading font-black mb-4 uppercase text-white tracking-tight drop-shadow-[0_0_30px_rgba(0,212,255,0.15)]">
          SALES & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] to-blue-500">SERVICE</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto font-medium text-base sm:text-lg">
          Your elite destination for console hardware purchases, premium accessories, and superfast, professional diagnostic repair services in Chennai.
        </p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-16 relative z-10">
        
        {/* ==================== SALES SECTION ==================== */}
        <motion.div 
          initial={{ opacity: 0, x: -32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="w-full lg:w-1/2 flex flex-col gap-8"
        >
          {/* Section title */}
          <div>
            <div className="mb-6 border-b border-white/10 pb-4 flex items-center justify-between">
              <h2 className="text-3xl font-heading font-black text-white uppercase flex items-center gap-3">
                <span className="w-3 h-8 bg-[#DC2626] rounded-sm shadow-[0_0_15px_rgba(220,38,38,0.5)]"></span> Hardware Sales
              </h2>
              <ShoppingBag className="w-6 h-6 text-gray-500" />
            </div>
            
            <p className="text-sm text-gray-400 font-medium leading-relaxed">
              We sell brand new and certified pre-owned PlayStation consoles along with all official accessories and custom add-ons. Select an ecosystem below to chat with us:
            </p>
          </div>

          {/* Ecosystem Cards (Premium Responsive Landscape Layout) */}
          <div className="flex flex-col gap-8">
            {sales.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-gradient-to-b from-[#111111] to-[#060606] border border-white/10 rounded-2xl overflow-hidden flex flex-col md:flex-row transition-all duration-500 ease-out group hover:border-[#DC2626]/50 hover:shadow-[0_0_30px_rgba(220,38,38,0.25)] hover:-translate-y-1.5 transform-gpu will-change-transform"
              >
                {/* Product Image banner with local covers */}
                <div className="relative h-48 md:h-auto md:w-2/5 overflow-hidden border-b md:border-b-0 md:border-r border-white/5 bg-[#090909] flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#111111] via-transparent to-transparent z-10" />
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-108 transition-all duration-500 ease-out" 
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-xl font-heading font-black text-white uppercase mb-2 group-hover:text-[#DC2626] transition-colors leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-xs leading-relaxed mb-6 font-medium">
                      {item.desc}
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-white/5 mt-auto">
                    <div className="text-[#00D4FF] font-heading font-black text-xs uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-pulse" />
                      Contact for Pricing
                    </div>
                    <a 
                      href={`https://wa.me/919092095300?text=${encodeURIComponent(item.whatsappQuery)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-6 py-3 bg-[#25D366] hover:bg-[#25D366]/90 text-white rounded-xl font-heading font-bold text-xs uppercase tracking-widest text-center transition-all duration-300 hover:shadow-[0_0_15px_rgba(37,211,102,0.4)] flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <FaWhatsapp className="w-4.5 h-4.5" /> Inquire on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ==================== SERVICE SECTION ==================== */}
        <motion.div 
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="w-full lg:w-1/2 flex flex-col"
        >
          <div className="mb-8 border-b border-white/10 pb-4">
            <h2 className="text-3xl font-heading font-black text-white uppercase flex items-center gap-3">
              <span className="w-3 h-8 bg-[#00D4FF] rounded-sm shadow-[0_0_15px_rgba(0,212,255,0.5)]"></span> Repair Center
            </h2>
          </div>

          <div className="space-y-4 mb-10">
            {services.map((svc, idx) => (
              <div 
                key={idx} 
                className="glass-panel p-5 flex flex-col sm:flex-row items-start sm:items-center gap-6 group hover:border-[#00D4FF]/40 hover:shadow-[0_0_20px_rgba(0,212,255,0.15)] transition-all duration-300 transform-gpu will-change-transform"
              >
                <div className="p-3 bg-[#000000] rounded-xl border border-white/5 group-hover:border-[#00D4FF]/30 transition-colors">
                  {svc.icon}
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-heading font-black text-white uppercase tracking-tight mb-1">{svc.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">{svc.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Glowing WhatsApp support card */}
          <div className="glass-card p-8 border-t-4 border-[#25D366] shadow-[0_0_30px_rgba(37,211,102,0.05)] hover:shadow-[0_0_40px_rgba(37,211,102,0.15)] transition-all duration-500 rounded-2xl bg-gradient-to-b from-[#111111] to-[#060606] relative overflow-hidden transform-gpu will-change-transform">
            {/* WhatsApp Accent Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[#25D366]/5 blur-3xl pointer-events-none" />

            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center border border-[#25D366]/20">
                <FaWhatsapp className="w-6 h-6 text-[#25D366]" />
              </div>
              <div>
                <h3 className="text-2xl font-heading font-black text-white uppercase tracking-tight">Instant Service Helpline</h3>
                <p className="text-xs text-[#25D366] font-bold uppercase tracking-wider">Online & Responsive</p>
              </div>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed mb-6 font-medium">
              Have questions about repair turnaround times, pricing, or custom hardware troubleshooting? Chat directly with our diagnostics experts on WhatsApp for instant assistance!
            </p>

            <a 
              href="https://wa.me/919092095300?text=Hi%20V1%20Gaming%20Cafe%2C%20I%20have%20an%20inquiry%20regarding%20my%20console%2Fcontroller%20repair%20service."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 bg-[#25D366] hover:bg-[#25D366]/90 text-white font-heading font-black uppercase tracking-widest text-sm rounded-xl transition-all shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_30px_rgba(37,211,102,0.5)] hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
            >
              <FaWhatsapp className="w-5 h-5 animate-bounce" /> Chat on WhatsApp <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

      </div>
    </main>
  );
}
