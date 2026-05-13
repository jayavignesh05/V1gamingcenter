"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Gaming Zones", path: "/zones" },
    { name: "VIP Lounge", path: "/lounge" },
    { name: "Sales & Service", path: "/sales-service" },
    { name: "Cafe & Shop", path: "/shop" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#000000]/80 backdrop-blur-xl border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 cursor-pointer group">
            <div className="p-2 bg-[#00FF41]/10 rounded-xl border border-[#00FF41]/30 group-hover:bg-[#00FF41]/20 transition-colors">
              <Gamepad2 className="w-6 h-6 text-[#00FF41]" />
            </div>
            <span className="font-heading font-black text-xl sm:text-2xl tracking-widest text-white uppercase">
              CYBER<span className="text-[#00FF41]">HUB</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.path}
                className={`text-sm font-semibold tracking-wide uppercase transition-all hover:-translate-y-0.5 ${
                  pathname === link.path ? "text-[#00FF41] drop-shadow-[0_0_10px_rgba(0,255,65,0.5)]" : "text-gray-400 hover:text-[#00FF41]"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link
              href="/booking"
              className="hidden md:flex items-center justify-center px-6 py-2.5 font-heading font-bold uppercase tracking-wider text-[#000000] bg-[#00FF41] rounded-full hover:bg-[#00FF41]/90 transition-all shadow-[0_0_20px_rgba(0,255,65,0.4)] hover:shadow-[0_0_30px_rgba(0,255,65,0.6)]"
            >
              Book Your Station
            </Link>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 text-gray-400 hover:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-[#111111] border-b border-white/10"
          >
            <div className="px-4 pt-4 pb-6 space-y-4 flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-bold tracking-wider uppercase transition-colors ${
                    pathname === link.path ? "bg-[#00FF41]/10 text-[#00FF41]" : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/booking"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-4 flex items-center justify-center px-6 py-3 font-heading font-bold uppercase tracking-wider text-[#000000] bg-[#00FF41] rounded-xl shadow-[0_0_15px_rgba(0,255,65,0.3)]"
              >
                Book Your Station
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
