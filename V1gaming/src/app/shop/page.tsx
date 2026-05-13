"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ShopPage() {
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Controllers", "Peripherals", "Drinks", "Snacks"];

  const items = [
    { name: "Monster Energy", category: "Drinks", price: "₹150", image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80", type: "cafe" },
    { name: "Red Bull", category: "Drinks", price: "₹120", image: "https://images.unsplash.com/photo-1579888944880-d98341245702?auto=format&fit=crop&q=80", type: "cafe" },
    { name: "Doritos Nacho Cheese", category: "Snacks", price: "₹50", image: "https://images.unsplash.com/photo-1600952841320-db92ec4047ca?auto=format&fit=crop&q=80", type: "cafe" },
    { name: "Cold Brew Coffee", category: "Drinks", price: "₹200", image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&q=80", type: "cafe" },
    { name: "Pro Gaming Mouse", category: "Peripherals", price: "₹4,990", image: "https://images.unsplash.com/photo-1527814050087-15494d402377?auto=format&fit=crop&q=80", type: "gear" },
    { name: "Mechanical Keyboard", category: "Peripherals", price: "₹8,490", image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80", type: "gear" },
    { name: "Wireless Headset", category: "Peripherals", price: "₹12,990", image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80", type: "gear" },
    { name: "Custom DualSense", category: "Controllers", price: "₹6,490", image: "https://upload.wikimedia.org/wikipedia/commons/4/4c/PlayStation_5_DualSense_controller_transparent_background.png", type: "gear" },
  ];

  const filteredItems = filter === "All" ? items : items.filter(i => i.category === filter);

  return (
    <main className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto selection:bg-yellow-400/30">
      <div className="text-center mb-16 relative z-10">
        <h1 className="text-5xl md:text-7xl font-heading font-black mb-4 uppercase text-white drop-shadow-[0_0_20px_rgba(250,204,21,0.2)]">
          CAFE & <span className="text-yellow-400">GEAR SHOP</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto font-medium">
          Fuel up for your next match or upgrade your setup with our premium selection.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wider transition-all ${
              filter === cat 
                ? "bg-yellow-400 text-black shadow-[0_0_15px_rgba(250,204,21,0.4)]" 
                : "bg-[#111111] border border-white/10 text-gray-400 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <AnimatePresence>
          {filteredItems.map((item, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              key={item.name}
              className="glass-card flex flex-col group"
            >
              <div className="relative aspect-square overflow-hidden bg-[#000000] p-6">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className={`w-full h-full ${item.type === "gear" ? "object-contain" : "object-cover"} group-hover:scale-110 transition-transform duration-500`} 
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-2 py-1 text-xs font-bold uppercase rounded-md ${item.type === "cafe" ? "bg-orange-500 text-white" : "bg-purple-500 text-white"}`}>
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-heading font-black text-white uppercase mb-1">{item.name}</h3>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xl font-bold text-yellow-400">{item.price}</span>
                  <button className="px-4 py-2 border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black rounded-lg text-xs font-bold uppercase tracking-wider transition-all">
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </main>
  );
}
