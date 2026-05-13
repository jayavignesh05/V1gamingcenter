import { MessageCircle } from "lucide-react";

export default function FAB() {
  return (
    <button 
      className="fixed bottom-6 right-6 p-4 bg-green-500 hover:bg-green-400 text-white rounded-full shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] hover:-translate-y-1 transition-all duration-300 z-50 flex items-center justify-center group"
      aria-label="Contact on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 ease-in-out font-medium">
        Chat with us
      </span>
    </button>
  );
}
