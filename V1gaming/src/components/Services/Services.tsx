"use client";

import { motion } from "framer-motion";
import { Cpu, MonitorSmartphone, Coffee, ShoppingBag } from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: <Cpu className="w-8 h-8 text-cyan-400" />,
      title: "Pro Gaming Zone",
      desc: "Experience unmatched FPS. Powered by RTX 4090s, i9 processors, and 360Hz displays. The ultimate battle station.",
      delay: 0.1,
    },
    {
      icon: <MonitorSmartphone className="w-8 h-8 text-violet-400" />,
      title: "Console Lounge",
      desc: "Relax on premium recliners with PS5 setups connected to 65-inch 4K OLED TVs. Perfect for co-op or solo campaigns.",
      delay: 0.2,
    },
    {
      icon: <Coffee className="w-8 h-8 text-amber-400" />,
      title: "Cafe & Chill",
      desc: "Stay fueled with our artisanal coffee, energy drinks, and gourmet snacks delivered right to your desk.",
      delay: 0.3,
    },
    {
      icon: <ShoppingBag className="w-8 h-8 text-green-400" />,
      title: "Hardware Sales",
      desc: "Upgrade your own setup. Browse our curated 'Gear Shop' for premium gaming mice, keyboards, and headsets.",
      delay: 0.4,
    },
  ];

  return (
    <section id="services" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">Experience</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Not just a gaming center. We provide the highest tier of hardware combined with unparalleled comfort and service.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((svc, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: svc.delay, duration: 0.5 }}
              className="glass-card p-8 group hover:-translate-y-2 transition-all duration-300"
            >
              <div className="mb-6 p-4 bg-[#0A0A0A]/50 rounded-2xl inline-block border border-white/5 group-hover:border-white/10 transition-colors">
                {svc.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{svc.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{svc.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
