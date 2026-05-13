"use client";

import { ShoppingBag } from "lucide-react";
import Image from "next/image";

export default function CafeAndGear() {
  const gearItems = [
    { name: "PlayStation 5 Console", price: "₹49,990", image: "/ps5.png" },
    { name: "PS5 DualSense Controller", price: "₹5,990", image: "/ps5-controller.png" },
    { name: "PlayStation 4 Console", price: "₹29,990", image: "/ps4.png" },
    { name: "PS4 DualShock Controller", price: "₹4,299", image: "/ps4-controller.png" },
  ];

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in duration-500 space-y-12 mb-12">
      {/* Gear Section */}
      <section>
        <h2 className="text-3xl font-bold flex items-center gap-3 mb-8">
          <ShoppingBag className="text-cyan-400" /> Gear Shop
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {gearItems.map((item, idx) => (
            <div key={idx} className="glass-card flex flex-col sm:flex-row overflow-hidden group">
              <div className="sm:w-2/5 h-48 sm:h-auto relative bg-[#050505] flex items-center justify-center">
                {/* Fallback styling in case image is missing */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-600 text-xs font-mono">
                  Image placeholder
                </div>
                <Image 
                  src={item.image} 
                  alt={item.name} 
                  fill 
                  className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 z-10" 
                />
              </div>
              <div className="p-6 sm:w-3/5 flex flex-col justify-center z-20 bg-[#0A0A0A]/80 backdrop-blur-sm sm:bg-transparent">
                <h4 className="text-xl font-bold text-white mb-2">{item.name}</h4>
                <p className="text-gray-400 text-sm mb-6">Premium PlayStation consoles and accessories available for purchase in-store.</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="font-mono text-2xl font-bold text-cyan-400">{item.price}</span>
                  <button className="border border-cyan-500/50 hover:bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-lg font-medium transition-all text-sm">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
