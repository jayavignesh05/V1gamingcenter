"use client";

import { Wrench, MonitorSmartphone, Settings, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function SalesService() {
  const sales = [
    { title: "PS5 Console", price: "₹49,990", image: "https://upload.wikimedia.org/wikipedia/commons/4/4c/PlayStation_5_DualSense_controller_transparent_background.png" }, // Using dualsense as placeholder for PS5 gear
    { title: "PS4 Pro Console", price: "₹29,990", image: "https://upload.wikimedia.org/wikipedia/commons/4/4c/PlayStation_5_DualSense_controller_transparent_background.png" },
    { title: "DualSense Controller", price: "₹5,990", image: "https://upload.wikimedia.org/wikipedia/commons/4/4c/PlayStation_5_DualSense_controller_transparent_background.png" },
    { title: "DualShock 4", price: "₹4,299", image: "https://upload.wikimedia.org/wikipedia/commons/4/4c/PlayStation_5_DualSense_controller_transparent_background.png" },
  ];

  const services = [
    { title: "Console Deep Clean", desc: "Thermal paste replacement and dust removal.", time: "2-4 Hours", icon: <Settings className="w-8 h-8 text-[#00D4FF]" /> },
    { title: "Controller Repair", desc: "Stick drift fix, button replacement, battery swap.", time: "1-2 Hours", icon: <Wrench className="w-8 h-8 text-[#00D4FF]" /> },
    { title: "Disc Drive Fix", desc: "Laser replacement and mechanical repairs.", time: "24 Hours", icon: <MonitorSmartphone className="w-8 h-8 text-[#00D4FF]" /> },
    { title: "OS & Warranty", desc: "Software rebuild and official warranty assistance.", time: "48 Hours", icon: <ShieldCheck className="w-8 h-8 text-[#00D4FF]" /> },
  ];

  return (
    <main className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto selection:bg-[#00D4FF]/30">
      <div className="text-center mb-16 relative z-10">
        <h1 className="text-5xl md:text-7xl font-heading font-black mb-4 uppercase text-white drop-shadow-[0_0_20px_rgba(0,212,255,0.2)]">
          SALES & <span className="text-[#00D4FF]">SERVICE</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto font-medium">
          Your one-stop destination for PlayStation hardware, accessories, and professional repair services.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-16">
        
        {/* SALES SECTION */}
        <div className="w-full lg:w-1/2">
          <div className="mb-8 border-b border-white/10 pb-4">
            <h2 className="text-3xl font-heading font-black text-white uppercase flex items-center gap-3">
              <span className="w-3 h-8 bg-[#DC2626] rounded-sm"></span> Hardware Sales
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {sales.map((item, idx) => (
              <div key={idx} className="bg-[#111111] rounded-2xl p-1 shadow-[0_0_15px_rgba(0,255,65,0.05)] hover:shadow-[0_0_20px_rgba(0,255,65,0.2)] transition-shadow group">
                <div className="bg-[#111111] border border-white/5 h-full rounded-2xl p-6 flex flex-col items-center text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#DC2626]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <img src={item.image} alt={item.title} className="h-24 object-contain mb-6 drop-shadow-xl group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-heading font-bold text-white uppercase mb-2">{item.title}</h3>
                  <div className="text-[#DC2626] font-bold text-xl mb-4">{item.price}</div>
                  <button className="w-full py-2 border border-[#DC2626] text-[#DC2626] hover:bg-[#DC2626]/10 rounded-lg font-bold text-sm uppercase tracking-wider transition-colors relative z-10">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SERVICE SECTION */}
        <div className="w-full lg:w-1/2">
          <div className="mb-8 border-b border-white/10 pb-4">
            <h2 className="text-3xl font-heading font-black text-white uppercase flex items-center gap-3">
              <span className="w-3 h-8 bg-[#00D4FF] rounded-sm"></span> Repair Center
            </h2>
          </div>

          <div className="space-y-4 mb-8">
            {services.map((svc, idx) => (
              <div key={idx} className="glass-panel p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6 group hover:border-[#00D4FF]/50 transition-colors">
                <div className="p-3 bg-[#000000] rounded-xl border border-white/5 group-hover:shadow-[0_0_15px_rgba(0,212,255,0.2)] transition-shadow">
                  {svc.icon}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-xl font-heading font-black text-white uppercase">{svc.title}</h3>
                    <span className="px-2 py-1 bg-[#00D4FF]/10 text-[#00D4FF] text-xs font-bold rounded-md whitespace-nowrap">
                      {svc.time}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">{svc.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="glass-card p-8 border-t-4 border-[#00D4FF]">
            <h3 className="text-2xl font-heading font-black text-white uppercase mb-4">Book a Service Appointment</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Your Name" className="w-full bg-[#000000] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#00D4FF]" />
              <input type="text" placeholder="Device & Issue Description" className="w-full bg-[#000000] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#00D4FF]" />
              <button className="w-full py-4 bg-[#00D4FF] hover:bg-[#00D4FF]/90 text-black font-heading font-bold uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(0,212,255,0.4)]">
                Submit Request
              </button>
            </form>
          </div>
        </div>

      </div>
    </main>
  );
}
