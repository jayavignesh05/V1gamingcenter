"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Gaming Zones", path: "/zones" },
    { name: "VIP Lounge", path: "/lounge" },
    { name: "Sales & Service", path: "/sales-service" },
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
          <Link href="/" className="flex items-center gap-1 cursor-pointer group z-50" onClick={() => setIsMobileMenuOpen(false)}>
            <Image
              src="/images/V1logo.png"
              alt="V1 Gaming Logo"
              width={56}
              height={56}
              className="h-12 w-12 object-contain group-hover:opacity-90 transition-opacity flex-shrink-0"
              priority
            />
            <span className="font-heading font-black text-lg sm:text-xl tracking-wider text-white uppercase leading-none">
              V1<span className="text-[#DC2626]">gaming</span><span className="text-gray-400 font-semibold">cafe</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.path}
                className={`text-sm font-semibold tracking-wide uppercase transition-all hover:-translate-y-0.5 ${
                  pathname === link.path ? "text-[#DC2626] drop-shadow-[0_0_10px_rgba(220,38,38,0.5)]" : "text-gray-400 hover:text-[#DC2626]"
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
              className="hidden sm:flex items-center justify-center px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-heading font-bold uppercase tracking-wider text-white bg-[#DC2626] rounded-full hover:bg-[#DC2626]/90 transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)]"
            >
              Book Station
            </Link>
            
            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-[#DC2626] transition-colors"
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
                        ? "text-[#DC2626] drop-shadow-[0_0_10px_rgba(220,38,38,0.5)]" 
                        : "text-gray-400 hover:text-[#DC2626]"
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
                  className="flex items-center justify-center w-full px-6 py-3 font-heading font-bold uppercase tracking-wider text-white bg-[#DC2626] rounded-lg shadow-[0_0_20px_rgba(220,38,38,0.4)]"
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
