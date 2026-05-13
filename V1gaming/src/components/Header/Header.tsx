"use client";

import { motion } from "framer-motion";
import { Gamepad2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Reservation", path: "/#booking" },
    { name: "Shop/Cafe", path: "/shop" },
    { name: "Inquiry", path: "/inquiry" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 cursor-pointer group">
            <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/30 group-hover:bg-cyan-500/20 transition-colors">
              <Gamepad2 className="w-6 h-6 text-cyan-400" />
            </div>
            <span className="font-bold text-xl tracking-wider text-white">
              CYBER<span className="text-cyan-400">HUB</span>
            </span>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.path}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.path ? "text-cyan-400" : "text-gray-300 hover:text-cyan-400"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <Link
            href="/#booking"
            className="hidden md:flex items-center justify-center px-6 py-2.5 font-bold text-black bg-cyan-400 rounded-lg hover:bg-cyan-300 transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)]"
          >
            Live Status
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
