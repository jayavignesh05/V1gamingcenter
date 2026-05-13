import { Gamepad2, Camera, PlayCircle, MapPin, Mail, Phone } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#111111] border-t border-white/5 pt-16 pb-8 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Gamepad2 className="w-8 h-8 text-[#00FF41]" />
              <span className="font-heading font-black text-2xl tracking-widest text-white uppercase">
                CYBER<span className="text-[#00FF41]">HUB</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm font-medium mb-6">
              The ultimate premium esports lounge and gaming center in Chennai.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-[#000000] flex items-center justify-center text-gray-400 hover:text-[#00FF41] hover:shadow-[0_0_15px_rgba(0,255,65,0.3)] transition-all">
                <Camera className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#000000] flex items-center justify-center text-gray-400 hover:text-[#FF006E] hover:shadow-[0_0_15px_rgba(255,0,110,0.3)] transition-all">
                <PlayCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-black text-white uppercase mb-6 tracking-widest">Quick Links</h4>
            <ul className="space-y-3">
              {["Home", "Gaming Zones", "VIP Lounge", "Sales & Service", "Cafe & Shop"].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-gray-400 hover:text-[#00FF41] text-sm font-medium transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Find Us */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="font-heading font-black text-white uppercase mb-6 tracking-widest">Find Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400 text-sm font-medium">
                <MapPin className="w-5 h-5 text-[#00D4FF] flex-shrink-0" />
                <span>123 Gaming Street, T Nagar,<br />Chennai, Tamil Nadu 600017</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm font-medium">
                <Phone className="w-5 h-5 text-[#00FF41] flex-shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm font-medium">
                <Mail className="w-5 h-5 text-[#FF006E] flex-shrink-0" />
                <span>hello@cyberhub.in</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium text-gray-500">
          <p>&copy; {new Date().getFullYear()} CyberHub Gaming Center. All rights reserved.</p>
          <p className="flex items-center gap-2">Built with passion for gamers <Gamepad2 className="w-4 h-4 text-[#FF006E]" /></p>
        </div>
      </div>
    </footer>
  );
}
