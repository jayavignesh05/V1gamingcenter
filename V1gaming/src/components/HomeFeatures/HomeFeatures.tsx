"use client";

import { motion } from "framer-motion";
import { Gamepad2, ShoppingCart, MonitorPlay, Crown, ArrowRight } from "lucide-react";
import Link from "next/link";

const features = [
  {
    title: "Gaming Stations",
    description: "Book your high-end PC or PS5 station for ultimate performance.",
    icon: <MonitorPlay className="w-8 h-8 text-[#39FF14]" />,
    href: "/booking",
    color: "from-[#39FF14]/10 to-black",
    borderColor: "border-[#39FF14]/30",
    hoverColor: "group-hover:text-[#39FF14]",
    glow: "group-hover:shadow-[0_0_30px_rgba(57,255,20,0.2)]",
  },
  {
    title: "VIP Lounge",
    description: "Reserve our exclusive lounge for private gaming and chill sessions.",
    icon: <Crown className="w-8 h-8 text-[#FF007F]" />,
    href: "/booking",
    color: "from-[#FF007F]/10 to-black",
    borderColor: "border-[#FF007F]/30",
    hoverColor: "group-hover:text-[#FF007F]",
    glow: "group-hover:shadow-[0_0_30px_rgba(255,0,127,0.2)]",
  },
  {
    title: "Our Services",
    description: "Explore all the premium services and repairs we offer.",
    icon: <Gamepad2 className="w-8 h-8 text-[#00FFFF]" />,
    href: "/services",
    color: "from-[#00FFFF]/10 to-black",
    borderColor: "border-[#00FFFF]/30",
    hoverColor: "group-hover:text-[#00FFFF]",
    glow: "group-hover:shadow-[0_0_30px_rgba(0,255,255,0.2)]",
  },
  {
    title: "Store & Cafe",
    description: "Shop for gaming gear, components, or grab a quick bite.",
    icon: <ShoppingCart className="w-8 h-8 text-yellow-400" />,
    href: "/shop",
    color: "from-yellow-400/10 to-black",
    borderColor: "border-yellow-400/30",
    hoverColor: "group-hover:text-yellow-400",
    glow: "group-hover:shadow-[0_0_30px_rgba(255,255,0,0.2)]",
  },
];

export default function HomeFeatures() {
  return (
    <section className="py-24 relative z-10 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* About Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24 max-w-3xl mx-auto"
        >
          <div className="inline-block mb-4 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-gray-300 text-sm font-medium backdrop-blur-sm">
            About Us
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">CYBER HUB</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            We are the ultimate destination for gamers and tech enthusiasts. 
            Experience unparalleled gaming performance with our top-tier PC and PS5 setups. 
            Whether you are looking to compete in e-sports, relax in our VIP Lounge, 
            or hang out at our premium cafe, we have everything you need for the perfect session.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Link key={feature.title} href={feature.href}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`h-full group p-8 rounded-none bg-gradient-to-br ${feature.color} border ${feature.borderColor} backdrop-blur-xl transition-all duration-300 relative overflow-hidden ${feature.glow}`}
              >
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors z-0" />
                <div className="relative z-10">
                  <div className="mb-6 p-4 bg-black/80 rounded-none inline-block border border-white/10 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className={`text-2xl font-black uppercase tracking-wider text-white mb-3 transition-colors ${feature.hoverColor}`}>
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-8 font-mono">
                    {feature.description}
                  </p>
                  <div className="flex items-center text-sm font-mono font-bold text-white/50 group-hover:text-white transition-colors uppercase tracking-widest">
                    Enter <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
