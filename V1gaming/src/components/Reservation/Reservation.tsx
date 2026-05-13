"use client";

import { useState, useEffect } from "react";
import { Calendar, Monitor, Gamepad2, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Slot {
  time: string;
  status: "available" | "busy";
}

const DEFAULT_SLOTS = [
  "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", 
  "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
  "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM"
];

export default function Reservation() {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [selectedSlot, setSelectedSlot] = useState<{ type: string; time: string } | null>(null);
  
  const [pcSlots, setPcSlots] = useState<Slot[]>([]);
  const [ps5Slots, setPs5Slots] = useState<Slot[]>([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const fetchReservations = async (date: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/reservations?date=${date}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      
      const pc: Slot[] = DEFAULT_SLOTS.map(time => ({ time, status: "available" }));
      const ps5: Slot[] = DEFAULT_SLOTS.map(time => ({ time, status: "available" }));
      
      data.forEach((booking: any) => {
        if (booking.console_id === "PC") {
          const slot = pc.find(s => s.time === booking.time_slot);
          if (slot) slot.status = "busy";
        } else if (booking.console_id === "PS5") {
          const slot = ps5.find(s => s.time === booking.time_slot);
          if (slot) slot.status = "busy";
        }
      });
      
      setPcSlots(pc);
      setPs5Slots(ps5);
    } catch (err) {
      console.error(err);
      // Fallback
      setPcSlots(DEFAULT_SLOTS.map(time => ({ time, status: "available" })));
      setPs5Slots(DEFAULT_SLOTS.map(time => ({ time, status: "available" })));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations(selectedDate);
  }, [selectedDate]);

  const handleSlotClick = (type: string, time: string, status: string) => {
    if (status === "available") {
      setSelectedSlot({ type, time });
      setCustomerName("");
      setPhoneNumber("");
    }
  };

  const handleReservation = async () => {
    if (!customerName.trim() || !phoneNumber.trim() || !selectedSlot) {
      alert("Please enter your name and phone number.");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: customerName,
          phone_number: phoneNumber,
          booking_date: selectedDate,
          time_slot: selectedSlot.time,
          console_id: selectedSlot.type,
        }),
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to make reservation");
      
      alert("Reservation successful!");
      setSelectedSlot(null);
      fetchReservations(selectedDate);
    } catch (err: any) {
      alert(err.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-in fade-in zoom-in duration-500">
      <div className="glass-panel p-6 sm:p-10 mb-8 max-w-5xl mx-auto relative min-h-[500px]">
        <div className="flex flex-col mb-8">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-cyan-400" />
            Select Date
          </h3>
          <input
            type="date"
            className="w-full md:w-1/3 bg-[#0A0A0A] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-400 transition-colors"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-[#050505]/50 backdrop-blur-sm z-10 rounded-2xl">
            <Loader2 className="w-10 h-10 text-cyan-400 animate-spin" />
          </div>
        ) : null}

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 opacity-100 transition-opacity">
          {/* Left: PC Slots */}
          <div>
            <div className="flex items-center gap-3 mb-6 pb-2 border-b border-white/10">
              <Monitor className="w-6 h-6 text-cyan-400" />
              <h3 className="text-2xl font-bold">PC Slots</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {pcSlots.map((slot, index) => (
                <button
                  key={`pc-${index}`}
                  disabled={slot.status === "busy"}
                  onClick={() => handleSlotClick("PC", slot.time, slot.status)}
                  className={`py-3 px-2 rounded-lg font-medium text-sm transition-all duration-300 border ${
                    slot.status === "available"
                      ? "bg-[#1F2937]/50 border-cyan-500/30 text-cyan-50 hover:bg-cyan-500/20 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                      : "bg-[#0A0A0A]/50 border-white/5 text-gray-600 cursor-not-allowed opacity-50"
                  }`}
                >
                  {slot.time}
                </button>
              ))}
            </div>
          </div>

          {/* Right: PS5 Slots */}
          <div>
            <div className="flex items-center gap-3 mb-6 pb-2 border-b border-white/10">
              <Gamepad2 className="w-6 h-6 text-violet-400" />
              <h3 className="text-2xl font-bold">PS5 Slots</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {ps5Slots.map((slot, index) => (
                <button
                  key={`ps5-${index}`}
                  disabled={slot.status === "busy"}
                  onClick={() => handleSlotClick("PS5", slot.time, slot.status)}
                  className={`py-3 px-2 rounded-lg font-medium text-sm transition-all duration-300 border ${
                    slot.status === "available"
                      ? "bg-[#1F2937]/50 border-violet-500/30 text-violet-50 hover:bg-violet-500/20 hover:border-violet-400 hover:shadow-[0_0_15px_rgba(139,92,246,0.4)]"
                      : "bg-[#0A0A0A]/50 border-white/5 text-gray-600 cursor-not-allowed opacity-50"
                  }`}
                >
                  {slot.time}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Confirmation Popup */}
        <AnimatePresence>
          {selectedSlot && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute inset-0 z-20 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm rounded-2xl"
            >
              <div className="bg-[#111] border border-white/10 rounded-xl p-8 max-w-sm w-full shadow-2xl relative">
                <button 
                  onClick={() => !isSubmitting && setSelectedSlot(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white"
                  disabled={isSubmitting}
                >
                  <X className="w-5 h-5" />
                </button>
                <h4 className="text-xl font-bold mb-6">Reservation Details</h4>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">Your Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe"
                      className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-400"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-400"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-4 mb-8 bg-[#050505] p-4 rounded-lg border border-white/5">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-400">Station</span>
                    <span className="font-bold text-white">{selectedSlot.type}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-400">Time</span>
                    <span className="font-bold text-white">{selectedSlot.time}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-400">Price</span>
                    <span className="font-bold text-cyan-400">₹200 / hr</span>
                  </div>
                </div>
                
                <button 
                  className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:bg-cyan-500/50 text-black py-3 rounded-lg font-bold transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] flex justify-center items-center gap-2"
                  onClick={handleReservation}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Processing...
                    </>
                  ) : (
                    "Request Reservation"
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
