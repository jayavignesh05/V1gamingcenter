"use client";

import { motion } from "framer-motion";
import { Crown, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function Lounge() {
  const perks = [
    "Plush leather recliners",
    "Massive 85-inch 4K HDR displays",
    "Surround sound home theater system",
    "Private atmosphere for groups",
    "Dedicated VIP service & snacks"
  ];

  return (
    <section id="lounge" className="py-24 relative z-10 bg-[#050505] overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-yellow-500/5 to-transparent blur-3xl pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left: Text */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 space-y-8"
          >
            <div>
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-none border border-[#FF007F]/50 bg-[#FF007F]/10 text-[#FF007F] text-xs font-mono uppercase tracking-widest backdrop-blur-sm">
                <Crown className="w-4 h-4" /> VIP Experience
              </div>
              <h2 className="text-4xl md:text-6xl font-black mb-6 text-white uppercase tracking-tighter">
                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF007F] to-[#39FF14]">Lounge</span> Experience
              </h2>
            </div>
            
            <p className="text-gray-300 text-lg leading-relaxed">
              Step away from the main floor and into our exclusive VIP Lounge. Designed for 
              groups and players who demand the utmost comfort and privacy. Whether it's a 
              squad session, a private tournament, or just kicking back with friends, the 
              Lounge delivers luxury.
            </p>

            <ul className="space-y-4 pt-4">
              {perks.map((perk, idx) => (
                <motion.li 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * idx }}
                  className="flex items-center gap-3 text-gray-300 font-mono text-sm"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#FF007F] flex-shrink-0" />
                  <span>{perk}</span>
                </motion.li>
              ))}
            </ul>

            <div className="pt-8">
              <Link href="/booking" className="inline-flex items-center justify-center px-10 py-5 font-black uppercase tracking-widest text-black bg-[#FF007F] rounded-none hover:bg-[#FF007F]/90 transition-all shadow-[0_0_30px_rgba(255,0,127,0.4)] hover:shadow-[0_0_40px_rgba(255,0,127,0.6)]">
                Check Lounge Availability
              </Link>
            </div>
          </motion.div>

          {/* Right: Graphic / Visual representation */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <div className="relative aspect-video rounded-none border border-[#FF007F]/20 bg-black overflow-hidden flex items-center justify-center shadow-[0_0_50px_rgba(255,0,127,0.1)] group">
              <div className="absolute inset-0 bg-[url('/images/viplounge.jpg')] bg-cover bg-center opacity-30 group-hover:opacity-50 transition-opacity duration-700 mix-blend-luminosity"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              <Crown className="w-24 h-24 text-[#FF007F]/50 relative z-10" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
