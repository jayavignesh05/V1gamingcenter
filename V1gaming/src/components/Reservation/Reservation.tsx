"use client";

import { useState, useEffect } from "react";
import { Gamepad2, Loader2, Zap } from "lucide-react";
import { motion } from "framer-motion";

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
  const [selectedSlot, setSelectedSlot] = useState<{ type: string; time: string; price: number } | null>(null);
  
  const [activeTab, setActiveTab] = useState<"PC" | "PS5" | "PS4" | "Lounge">("PC");
  
  const [pcSlots, setPcSlots] = useState<Slot[]>([]);
  const [ps5Slots, setPs5Slots] = useState<Slot[]>([]);
  const [ps4Slots, setPs4Slots] = useState<Slot[]>([]);
  const [loungeSlots, setLoungeSlots] = useState<Slot[]>([]);
  
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
      const ps4: Slot[] = DEFAULT_SLOTS.map(time => ({ time, status: "available" }));
      const lounge: Slot[] = DEFAULT_SLOTS.map(time => ({ time, status: "available" }));
      
      data.forEach((booking: any) => {
        if (booking.console_id === "PC") {
          const slot = pc.find(s => s.time === booking.time_slot);
          if (slot) slot.status = "busy";
        } else if (booking.console_id === "PS5") {
          const slot = ps5.find(s => s.time === booking.time_slot);
          if (slot) slot.status = "busy";
        } else if (booking.console_id === "PS4") {
          const slot = ps4.find(s => s.time === booking.time_slot);
          if (slot) slot.status = "busy";
        } else if (booking.console_id === "Lounge") {
          const slot = lounge.find(s => s.time === booking.time_slot);
          if (slot) slot.status = "busy";
        }
      });
      
      setPcSlots(pc);
      setPs5Slots(ps5);
      setPs4Slots(ps4);
      setLoungeSlots(lounge);
    } catch (err) {
      console.error(err);
      setPcSlots(DEFAULT_SLOTS.map(time => ({ time, status: "available" })));
      setPs5Slots(DEFAULT_SLOTS.map(time => ({ time, status: "available" })));
      setPs4Slots(DEFAULT_SLOTS.map(time => ({ time, status: "available" })));
      setLoungeSlots(DEFAULT_SLOTS.map(time => ({ time, status: "available" })));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations(selectedDate);
    setSelectedSlot(null);
  }, [selectedDate, activeTab]);

  const getPrice = (type: string) => {
    if (type === "PC") return 80;
    if (type === "PS5") return 100;
    if (type === "PS4") return 60;
    return 500;
  };

  const handleSlotClick = (type: string, time: string, status: string) => {
    if (status === "available") {
      setSelectedSlot({ type, time, price: getPrice(type) });
    }
  };

  const handleReservation = async () => {
    if (!selectedSlot) return;
    if (!customerName.trim() || !phoneNumber.trim()) {
      alert("Please enter your Name and Phone Number.");
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
      
      alert("Payment successful! Reservation Confirmed.");
      setCustomerName("");
      setPhoneNumber("");
      setSelectedSlot(null);
      fetchReservations(selectedDate);
    } catch (err: any) {
      alert(err.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentSlots = activeTab === "PC" ? pcSlots : activeTab === "PS5" ? ps5Slots : activeTab === "PS4" ? ps4Slots : loungeSlots;

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl mx-auto animate-in fade-in duration-700">
      
      {/* Main Booking Area */}
      <div className="w-full lg:w-2/3 glass-panel p-6 sm:p-10 relative min-h-[600px]">
        {/* Header & Date Picker */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b border-white/10 pb-6 gap-6">
          <h3 className="text-2xl font-heading font-black text-white uppercase tracking-widest flex items-center gap-2">
            <Zap className="w-6 h-6 text-[#00FF41]" /> Select Slot
          </h3>
          <div className="w-full sm:w-auto">
            <input
              type="date"
              className="w-full bg-[#111111] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#00FF41] font-medium"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {["PC", "PS5", "PS4", "Lounge"].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-3 font-heading font-bold uppercase text-sm rounded-xl transition-all ${
                activeTab === tab 
                  ? "bg-[#00FF41] text-[#000000] shadow-[0_0_15px_rgba(0,255,65,0.4)]" 
                  : "bg-[#111111] border border-white/5 text-gray-400 hover:text-white hover:border-[#00FF41]/50"
              }`}
            >
              {tab} Zone
            </button>
          ))}
        </div>

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#111111]/80 backdrop-blur-sm z-10 rounded-2xl">
            <Loader2 className="w-12 h-12 text-[#00FF41] animate-spin" />
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
          {currentSlots.map((slot, index) => {
            const isAvailable = slot.status === "available";
            const isSelected = selectedSlot?.time === slot.time && selectedSlot?.type === activeTab;
            
            return (
              <button
                key={`${activeTab}-${index}`}
                disabled={!isAvailable}
                onClick={() => handleSlotClick(activeTab, slot.time, slot.status)}
                className={`py-4 px-2 font-bold text-sm rounded-xl transition-all border flex items-center justify-center ${
                  isAvailable
                    ? isSelected
                      ? "bg-[#00D4FF]/20 border-[#00D4FF] text-[#00D4FF] shadow-[0_0_20px_rgba(0,212,255,0.5)] scale-105"
                      : "bg-[#111111] border-[#00FF41]/30 text-white shadow-[inset_0_0_10px_rgba(0,255,65,0.1)] hover:border-[#00FF41] hover:shadow-[0_0_15px_rgba(0,255,65,0.3)]"
                    : "bg-[#111111]/50 border-red-500/20 text-red-500/40 cursor-not-allowed"
                }`}
              >
                {slot.time}
              </button>
            );
          })}
        </div>
      </div>

      {/* Booking Summary Sidebar */}
      <div className="w-full lg:w-1/3">
        <div className="glass-panel p-8 sticky top-24">
          <h3 className="text-xl font-heading font-black text-white uppercase mb-6 border-b border-white/10 pb-4">
            Booking Summary
          </h3>
          
          {selectedSlot ? (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400 font-medium">Zone</span>
                  <span className="text-white font-bold">{selectedSlot.type} Zone</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400 font-medium">Date</span>
                  <span className="text-white font-bold">{selectedDate}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400 font-medium">Time</span>
                  <span className="text-[#00D4FF] font-bold">{selectedSlot.time}</span>
                </div>
              </div>
              
              <div className="space-y-3 pt-4 border-t border-white/10">
                <input 
                  type="text" 
                  placeholder="Your Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-[#111111] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#00D4FF] text-sm"
                />
                <input 
                  type="tel" 
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full bg-[#111111] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#00D4FF] text-sm"
                />
              </div>

              <div className="pt-6 border-t border-white/10">
                <div className="flex justify-between items-end mb-6">
                  <span className="text-gray-400 font-medium">Total</span>
                  <span className="text-4xl font-heading font-black text-[#00FF41]">₹{selectedSlot.price}</span>
                </div>
                <button 
                  onClick={handleReservation}
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#00D4FF] hover:bg-[#00D4FF]/90 text-[#000000] font-heading font-black uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(0,212,255,0.4)] flex justify-center items-center gap-2"
                >
                  {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</> : "Confirm & Pay"}
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center h-48 text-center opacity-50">
              <Gamepad2 className="w-12 h-12 text-gray-500 mb-4" />
              <p className="text-sm font-medium text-gray-400">Select a time slot to view your summary.</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
