"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MessageSquare } from "lucide-react";

export default function InquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hi V1gaming!%0A%0AMy name is ${formData.name}.%0APhone: ${formData.phone}%0A%0A${formData.message}`;
    // Use an example number for WhatsApp link
    window.open(`https://wa.me/919876543210?text=${text}`, "_blank");
  };

  return (
    <section id="inquiry" className="py-24 relative z-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-panel p-8 sm:p-12 relative overflow-hidden"
        >
          {/* Decorative glow */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-green-500/10 blur-3xl rounded-full pointer-events-none"></div>

          <div className="text-center mb-10 relative z-10">
            <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
              <MessageSquare className="text-green-400" /> Have Questions?
            </h2>
            <p className="text-gray-400">
              Planning a birthday party, esports tournament, or bulk booking? Send us a quick message directly on WhatsApp.
            </p>
          </div>

          <form onSubmit={handleWhatsAppSubmit} className="space-y-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#0A0A0A]/80 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[#0A0A0A]/80 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">What's on your mind?</label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-[#0A0A0A]/80 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-green-500 transition-colors resize-none"
                placeholder="I want to book the entire PS5 section for 4 hours..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1DA851] text-white font-bold py-4 rounded-lg transition-all shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_30px_rgba(37,211,102,0.5)] transform hover:-translate-y-1"
            >
              <Send className="w-5 h-5" />
              Send to WhatsApp
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
