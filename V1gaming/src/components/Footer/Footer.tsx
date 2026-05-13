"use client";

import { Gamepad2, MapPin } from "lucide-react";
import { FaInstagram as Instagram, FaYoutube as Youtube } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-16 pb-8 relative z-10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
                <Gamepad2 className="w-6 h-6 text-cyan-400" />
              </div>
              <span className="font-bold text-xl tracking-wider text-white">
                CYBER<span className="text-cyan-400">HUB</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              The premier gaming destination in Chennai. Experience top-tier hardware, amazing food, and a vibrant community.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 hover:text-pink-500 transition-colors text-gray-400">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 hover:text-red-500 transition-colors text-gray-400">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors">Home</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors">Services</Link></li>
              <li><Link href="/booking" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors">Reservation</Link></li>
              <li><Link href="/inquiry" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Location */}
          <div>
            <h4 className="text-white font-bold mb-6 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-400" /> Find Us
            </h4>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              123 Gaming Street, T Nagar,<br />
              Chennai, Tamil Nadu 600017
            </p>
            {/* Google Maps Embed placeholder */}
            <div className="w-full h-32 bg-[#1A1A1A] rounded-lg overflow-hidden border border-white/10 relative group">
               <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.8650450532454!2d80.2311494!3d13.0442654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52665671f25b1b%3A0xc3cf020584ef775a!2sT.%20Nagar%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="opacity-70 group-hover:opacity-100 transition-opacity"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center text-gray-500 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} CyberHub Gaming Center. All rights reserved.</p>
          <p>Built with Next.js & TiDB</p>
        </div>
      </div>
    </footer>
  );
}
