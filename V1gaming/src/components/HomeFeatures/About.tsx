"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-24 relative z-10 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left: Image */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <div className="relative aspect-video lg:aspect-square rounded-none overflow-hidden border border-[#39FF14]/20 shadow-[0_0_50px_rgba(57,255,20,0.15)] group">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#39FF14]/20 to-transparent z-10 mix-blend-overlay"></div>
              <Image
                src="/hero_bg.png"
                alt="V1GAMING Center"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 mix-blend-luminosity"
              />
            </div>
          </motion.div>

          {/* Right: Text */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 space-y-8"
          >
            <div>
              <div className="inline-block mb-4 px-4 py-1.5 rounded-none border border-[#39FF14]/50 bg-[#39FF14]/10 text-[#39FF14] text-xs font-mono uppercase tracking-widest backdrop-blur-sm">
                About Us // Core
              </div>
              <h2 className="text-4xl md:text-6xl font-black mb-6 text-white uppercase tracking-tighter">
                The Pinnacle of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#39FF14] to-[#00FFFF]">Gaming</span>
              </h2>
            </div>
            
            <p className="text-gray-300 text-lg leading-relaxed">
              Founded on the belief that gaming is more than just a hobby—it's a lifestyle. 
              At V1gaming, we've crafted an environment where professional e-sports athletes 
              and casual gamers alike can experience the ultimate setup.
            </p>
            
            <p className="text-gray-400 text-lg leading-relaxed">
              Equipped with cutting-edge PCs featuring RTX 4090s, high-refresh-rate monitors, 
              and premium PS5 stations, we ensure zero bottlenecks. Add to that a vibrant 
              community and a dedicated staff, and you get a destination that elevates your game.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10">
              <div>
                <h4 className="text-4xl font-black text-white mb-2 font-mono drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">50<span className="text-[#FF007F]">+</span></h4>
                <p className="text-[#FF007F] font-mono text-sm uppercase tracking-wider">Premium Stations</p>
              </div>
              <div>
                <h4 className="text-4xl font-black text-white mb-2 font-mono drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">24<span className="text-[#39FF14]">/</span>7</h4>
                <p className="text-[#39FF14] font-mono text-sm uppercase tracking-wider">Always Open</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
