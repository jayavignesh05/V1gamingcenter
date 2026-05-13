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
          <Link href="/" className="flex items-center gap-2 sm:gap-3 cursor-pointer group z-50" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="p-1.5 sm:p-2 bg-[#00FF41]/10 rounded-xl border border-[#00FF41]/30 group-hover:bg-[#00FF41]/20 transition-colors">
              <Gamepad2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#00FF41]" />
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

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-3 sm:gap-4 z-50">
            <Link
              href="/booking"
              className="hidden sm:flex items-center justify-center px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-heading font-bold uppercase tracking-wider text-[#000000] bg-[#00FF41] rounded-full hover:bg-[#00FF41]/90 transition-all shadow-[0_0_20px_rgba(0,255,65,0.4)] hover:shadow-[0_0_30px_rgba(0,255,65,0.6)]"
            >
              Book Station
            </Link>
            
            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-[#00FF41] transition-colors"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-[#0A0A0A]/95 backdrop-blur-3xl border-b border-white/10 shadow-2xl"
          >
            <nav className="flex flex-col px-4 sm:px-6 py-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                >
                  <Link
                    href={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block py-4 text-sm sm:text-base font-semibold tracking-wide uppercase transition-colors border-b border-white/5 ${
                      pathname === link.path 
                        ? "text-[#00FF41] drop-shadow-[0_0_10px_rgba(0,255,65,0.5)]" 
                        : "text-gray-400 hover:text-[#00FF41]"
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: navLinks.length * 0.05 + 0.1 }}
                className="mt-6 sm:hidden pb-4"
              >
                <Link
                  href="/booking"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center w-full px-6 py-3 font-heading font-bold uppercase tracking-wider text-[#000000] bg-[#00FF41] rounded-lg shadow-[0_0_20px_rgba(0,255,65,0.4)]"
                >
                  Book Your Station
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
