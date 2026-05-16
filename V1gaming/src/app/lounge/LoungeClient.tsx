"use client";

import { motion } from "framer-motion";
import { Crown, Users, GlassWater, Volume2, MonitorPlay } from "lucide-react";
import Link from "next/link";

export default function LoungeClient() {
  const features = [
    { icon: <Crown className="w-6 h-6 text-[#FF006E]" />, text: "Plush Leather Recliners" },
    { icon: <MonitorPlay className="w-6 h-6 text-[#FF006E]" />, text: "85-inch 4K HDR Displays" },
    { icon: <Volume2 className="w-6 h-6 text-[#FF006E]" />, text: "Immersive Surround Sound" },
    { icon: <Users className="w-6 h-6 text-[#FF006E]" />, text: "Private Atmosphere" },
    { icon: <GlassWater className="w-6 h-6 text-[#FF006E]" />, text: "Dedicated Snack Service" },
  ];

  const bookingOptions = [
    { title: "Small Squad", capacity: "2-4 Players", desc: "Perfect for intimate gaming sessions." },
    { title: "Full Party", capacity: "5-8 Players", desc: "Ideal for birthday celebrations and tournaments." },
    { title: "Private Event", capacity: "Max Capacity", desc: "Book the entire lounge for yourself." },
  ];

  return (
    <main className="min-h-screen pb-24 relative overflow-hidden bg-[#000000] selection:bg-[#FF006E]/30">
      {/* Hero */}
      <section className="relative w-full h-[60vh] flex items-center justify-center pt-20 border-b border-white/5">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-30 mix-blend-luminosity"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/80 to-transparent"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-[#FF006E]/50 bg-[#FF006E]/10 text-[#FF006E] text-xs font-bold uppercase tracking-widest"
          >
            <Crown className="w-4 h-4" /> The Ultimate Premium Experience
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
            className="text-5xl md:text-7xl lg:text-8xl font-heading font-black mb-6 text-white uppercase tracking-tighter drop-shadow-[0_0_20px_rgba(255,0,110,0.3)]"
          >
            VIP <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF006E] to-purple-500">LOUNGE</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
            className="text-gray-300 max-w-2xl mx-auto text-lg"
          >
            Step away from the main floor. The VIP Lounge is designed for groups and players who demand the utmost luxury and privacy.
          </motion.p>
        </div>
      </section>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 items-stretch">
          {/* Pricing & CTA */}
          <div className="flex flex-col gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-8 flex flex-col justify-center items-center text-center border-t-4 border-[#FF006E]"
            >
              <h2 className="text-2xl font-heading font-black text-white uppercase mb-2">Private Lounge PS5</h2>
              <div className="text-4xl font-heading font-black text-[#FF006E] mb-1 drop-shadow-[0_0_15px_rgba(255,0,110,0.4)]">₹400<span className="text-lg text-gray-500">/hr</span></div>
              <p className="text-gray-400 font-medium uppercase tracking-widest text-xs mb-6">1 Player (₹200/hr each for 4 Players)</p>
              
              <Link href="/booking?zone=Pvt%20Lounge" className="w-full py-3 bg-[#FF006E] hover:bg-[#FF006E]/90 text-white font-heading font-bold uppercase tracking-widest text-sm rounded-xl transition-all shadow-[0_0_20px_rgba(255,0,110,0.4)] hover:shadow-[0_0_30px_rgba(255,0,110,0.6)]">
                Reserve Private Lounge
              </Link>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-8 flex flex-col justify-center items-center text-center border-t-4 border-[#9D00FF]"
            >
              <h2 className="text-2xl font-heading font-black text-white uppercase mb-2">Celebrations Lounge (Game + OTT)</h2>
              <div className="text-4xl font-heading font-black text-[#9D00FF] mb-1 drop-shadow-[0_0_15px_rgba(157,0,255,0.4)]">₹3,000<span className="text-lg text-gray-500">/hr</span></div>
              <p className="text-gray-400 font-medium uppercase tracking-widest text-xs mb-6">+ ₹2,000 Add-on Hrs (Up to 12 Person)</p>
              
              <Link href="/booking?zone=Celebrations%20Lounge" className="w-full py-3 bg-[#9D00FF] hover:bg-[#9D00FF]/90 text-white font-heading font-bold uppercase tracking-widest text-sm rounded-xl transition-all shadow-[0_0_20px_rgba(157,0,255,0.4)] hover:shadow-[0_0_30px_rgba(157,0,255,0.6)]">
                Reserve Celebrations Lounge
              </Link>
            </motion.div>
          </div>

          {/* Features */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-panel p-10 flex flex-col justify-center"
          >
            <h3 className="text-2xl font-heading font-black text-white uppercase mb-6 border-b border-white/10 pb-4">Lounge Features</h3>
            <ul className="space-y-6">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-4 text-gray-200 font-medium text-lg">
                  <div className="p-2 bg-[#FF006E]/10 rounded-lg">{feature.icon}</div>
                  <span>{feature.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Group Booking Options */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-black text-white uppercase mb-4">Group Booking Options</h2>
          <p className="text-gray-400">Tailored packages for every squad size.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bookingOptions.map((opt, idx) => (
            <div key={idx} className="relative h-64 md:h-80 rounded-2xl overflow-hidden group border border-white/10 hover:border-[#FF006E]/40 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a0f] to-[#0a0a0a] z-0"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/40 to-transparent z-10"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF006E]/5 rounded-full blur-2xl"></div>
              
              <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                <h3 className="text-2xl font-heading font-black text-white uppercase mb-1">{opt.title}</h3>
                <div className="text-[#FF006E] font-bold text-sm uppercase tracking-wider mb-3">{opt.capacity}</div>
                <p className="text-gray-400 text-sm">{opt.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
