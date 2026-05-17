import { FaWhatsapp } from "react-icons/fa";

export default function FAB() {
  return (
    <a 
      href="https://wa.me/919092095300?text=Hi%20V1%20Gaming%20Cafe%2C%20I%20have%20an%20inquiry%20regarding%20booking%2Fservices."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 p-4 bg-[#25D366] hover:bg-[#25D366]/90 text-white rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] hover:-translate-y-1 transition-all duration-300 z-50 flex items-center justify-center group"
      aria-label="Contact on WhatsApp"
    >
      <FaWhatsapp className="w-6 h-6" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 ease-in-out font-heading font-bold text-sm uppercase tracking-wider">
        Chat with us
      </span>
    </a>
  );
}
