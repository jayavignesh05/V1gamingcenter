"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Gamepad2, Loader2, Zap, CheckCircle2, AlertCircle, Users, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { decryptClient, encryptClient } from "@/lib/crypto";

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
  const [selectedSlots, setSelectedSlots] = useState<{ type: string; time: string }[]>([]);
  const [players, setPlayers] = useState(1);
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<"PS5" | "PS4" | "Simulation" | "VR" | "Pvt Lounge" | "Cele Lounge">("PS5");

  useEffect(() => {
    const zone = searchParams.get("zone");
    const validTabs = ["PS5", "PS4", "Simulation", "VR", "Pvt Lounge", "Cele Lounge"];
    if (zone && validTabs.includes(zone)) {
      setActiveTab(zone as any);
    }
  }, [searchParams]);
  
  const [ps5Slots, setPs5Slots] = useState<Slot[]>([]);
  const [ps4Slots, setPs4Slots] = useState<Slot[]>([]);
  const [simulationSlots, setSimulationSlots] = useState<Slot[]>([]);
  const [vrSlots, setVrSlots] = useState<Slot[]>([]);
  const [pvtLoungeSlots, setPvtLoungeSlots] = useState<Slot[]>([]);
  const [celeLoungeSlots, setCeleLoungeSlots] = useState<Slot[]>([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fetchError, setFetchError] = useState<string | null>(null);

  const fetchReservations = async (date: string) => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const res = await fetch(`/api/reservations?date=${date}`);

      // Try to decrypt error body for better error messages
      if (!res.ok) {
        try {
          const errEnvelope = await res.json();
          const errData = await decryptClient<{ error: string }>(errEnvelope.d);
          throw new Error(errData.error || `Server error ${res.status}`);
        } catch {
          throw new Error(`Failed to load slots (HTTP ${res.status})`);
        }
      }

      const envelope = await res.json();
      const data = await decryptClient<Record<string, string>[]>(envelope.d);
      
      const ps5: Slot[] = DEFAULT_SLOTS.map(time => ({ time, status: "available" }));
      const ps4: Slot[] = DEFAULT_SLOTS.map(time => ({ time, status: "available" }));
      const simulation: Slot[] = DEFAULT_SLOTS.map(time => ({ time, status: "available" }));
      const vr: Slot[] = DEFAULT_SLOTS.map(time => ({ time, status: "available" }));
      const pvtLounge: Slot[] = DEFAULT_SLOTS.map(time => ({ time, status: "available" }));
      const celeLounge: Slot[] = DEFAULT_SLOTS.map(time => ({ time, status: "available" }));
      
      data.forEach((booking: Record<string, string>) => {
        if (booking.console_id === "PS5") {
          const slot = ps5.find(s => s.time === booking.time_slot);
          if (slot) slot.status = "busy";
        } else if (booking.console_id === "PS4") {
          const slot = ps4.find(s => s.time === booking.time_slot);
          if (slot) slot.status = "busy";
        } else if (booking.console_id === "Simulation") {
          const slot = simulation.find(s => s.time === booking.time_slot);
          if (slot) slot.status = "busy";
        } else if (booking.console_id === "VR") {
          const slot = vr.find(s => s.time === booking.time_slot);
          if (slot) slot.status = "busy";
        } else if (booking.console_id === "Pvt Lounge") {
          const slot = pvtLounge.find(s => s.time === booking.time_slot);
          if (slot) slot.status = "busy";
        } else if (booking.console_id === "Cele Lounge") {
          const slot = celeLounge.find(s => s.time === booking.time_slot);
          if (slot) slot.status = "busy";
        }
      });
      
      setPs5Slots(ps5);
      setPs4Slots(ps4);
      setSimulationSlots(simulation);
      setVrSlots(vr);
      setPvtLoungeSlots(pvtLounge);
      setCeleLoungeSlots(celeLounge);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Could not load slot availability";
      console.error("fetchReservations error:", msg);
      setFetchError(msg);
      // Do NOT fall back to all-available — keep slots empty so user can't accidentally book
      setPs5Slots([]);
      setPs4Slots([]);
      setSimulationSlots([]);
      setVrSlots([]);
      setPvtLoungeSlots([]);
      setCeleLoungeSlots([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations(selectedDate);
    setSelectedSlots([]);
    setPlayers(1);
  }, [selectedDate, activeTab]);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const getPrice = (type: string, numPlayers: number, numHours: number) => {
    if (numHours === 0) return 0;

    // Pricing: first hour rate + (extra hours × add-on rate)
    // This gives: PS5 1hr=₹199, 2hr=₹399, 3hr=₹599 etc.
    if (type === "PS5") {
      if (numPlayers === 1) {
        return 199 + (numHours - 1) * 200;
      } else {
        // 4-player rate: ₹150/player/hr
        return numPlayers * (150 * numHours);
      }
    } else if (type === "PS4") {
      if (numPlayers === 1) {
        return 149 + (numHours - 1) * 150;
      } else {
        // 4-player rate: ₹100/player/hr
        return numPlayers * (100 * numHours);
      }
    } else if (type === "Pvt Lounge") {
      if (numPlayers === 1) {
        return 400 + (numHours - 1) * 400;
      } else {
        return numPlayers * (200 * numHours);
      }
    } else if (type === "Cele Lounge") {
      // 1st hour: ₹3000, add-on hours: ₹2000 each
      return 3000 + (numHours - 1) * 2000;
    } else if (type === "Simulation") {
      return 350 * numPlayers * numHours;
    } else if (type === "VR") {
      return 200 * numPlayers * numHours;
    }

    return 0;
  };


  const handleSlotClick = (type: string, time: string, status: string) => {
    if (status === "available") {
      setSelectedSlots(prev => {
        const exists = prev.find(s => s.time === time && s.type === type);
        if (exists) {
          return prev.filter(s => !(s.time === time && s.type === type));
        } else {
          return [...prev, { type, time }];
        }
      });
    }
  };

  const handleReservation = async () => {
    if (selectedSlots.length === 0) return;
    if (!customerName.trim() || !phoneNumber.trim()) {
      setToast({ message: "Please enter your Name and Phone Number.", type: "error" });
      return;
    }

    setIsSubmitting(true);
    try {
      // Encrypt the entire payload before sending
      const encryptedBody = await encryptClient({
        customer_name: customerName,
        phone_number: phoneNumber,
        booking_date: selectedDate,
        time_slots: selectedSlots.map(s => s.time),
        console_id: activeTab,
        players: players
      });

      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ d: encryptedBody }),
      });
      
      const envelope = await res.json();
      const data = await decryptClient<{ success?: boolean; error?: string; message?: string }>(envelope.d);

      // ── Handle race condition: slot was booked by someone else just before confirm ──
      if (res.status === 409) {
        // Refresh the slot grid so the newly-booked slot shows as BOOKED
        await fetchReservations(selectedDate);

        // Find which of the selected slots are now taken (parse from error message)
        const takenTimesRaw = data.error?.replace("Slots already booked: ", "") ?? "";
        const takenTimes = takenTimesRaw.split(", ").map(t => t.trim());

        // Remove taken slots from the user's current selection
        setSelectedSlots(prev => prev.filter(s => !takenTimes.includes(s.time)));

        setToast({
          message: `⚠️ Sorry! ${takenTimes.join(", ")} was just booked by someone else. Please pick another slot.`,
          type: "error",
        });
        return;
      }

      if (!res.ok) throw new Error(data.error || "Failed to make reservation");
      
      setToast({ message: "✅ Booking Confirmed! See you at V1 Gaming!", type: "success" });
      setCustomerName("");
      setPhoneNumber("");
      setSelectedSlots([]);
      setPlayers(1);
      fetchReservations(selectedDate);
    } catch (err: unknown) {
      const error = err as Error;
      setToast({ message: error.message || "An error occurred", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };


  const currentSlots = activeTab === "PS5" ? ps5Slots : activeTab === "PS4" ? ps4Slots : activeTab === "Simulation" ? simulationSlots : activeTab === "VR" ? vrSlots : activeTab === "Pvt Lounge" ? pvtLoungeSlots : celeLoungeSlots;

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full animate-in fade-in duration-700 relative">
      
      {/* Toast Notification */}
      {toast && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          exit={{ opacity: 0, y: -20 }}
          className={`fixed top-24 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl border backdrop-blur-md font-medium text-white ${
            toast.type === 'success' 
              ? 'bg-[#DC2626]/20 border-[#DC2626]/50 shadow-[0_0_30px_rgba(220,38,38,0.3)]' 
              : 'bg-red-500/20 border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.3)]'
          }`}
        >
          {toast.type === 'success' ? <CheckCircle2 className="text-[#DC2626] w-6 h-6" /> : <AlertCircle className="text-red-400 w-6 h-6" />}
          {toast.message}
        </motion.div>
      )}

      {/* Main Booking Area */}
      <div className="w-full lg:w-2/3 glass-panel p-5 sm:p-8 relative min-h-[500px]">
        {/* Header & Date Picker */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b border-white/10 pb-6 gap-6">
          <h3 className="text-2xl font-heading font-black text-white uppercase tracking-widest flex items-center gap-2">
            <Zap className="w-6 h-6 text-[#DC2626]" /> Select Slot
          </h3>
          <div className="relative w-full sm:w-auto">
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              onKeyDown={(e) => e.preventDefault()}
              onClick={(e) => (e.target as HTMLInputElement & { showPicker?: () => void }).showPicker?.()}
              className="w-full bg-[#111111] border border-white/10 rounded-xl p-3 pr-10 text-white focus:outline-none focus:border-[#DC2626] font-medium cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#DC2626] pointer-events-none" />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {["PS5", "PS4", "Simulation", "VR", "Pvt Lounge", "Cele Lounge"].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-3 font-heading font-bold uppercase text-sm rounded-xl transition-all ${
                activeTab === tab 
                  ? "bg-[#DC2626] text-white shadow-[0_0_15px_rgba(220,38,38,0.4)]" 
                  : "bg-[#111111] border border-white/5 text-gray-400 hover:text-white hover:border-[#DC2626]/50"
              }`}
            >
              {tab} Zone
            </button>
          ))}
        </div>

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#111111]/80 backdrop-blur-sm z-10 rounded-2xl">
            <Loader2 className="w-12 h-12 text-[#DC2626] animate-spin" />
          </div>
        )}

        {/* Fetch Error Banner */}
        {!isLoading && fetchError && (
          <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
            <AlertCircle className="w-12 h-12 text-red-500" />
            <div>
              <p className="text-red-400 font-bold text-base mb-1">Could not load slot availability</p>
              <p className="text-gray-500 text-sm">{fetchError}</p>
            </div>
            <button
              onClick={() => fetchReservations(selectedDate)}
              className="mt-2 px-6 py-2.5 bg-[#DC2626] hover:bg-[#b91c1c] text-white font-heading font-bold uppercase tracking-widest text-sm rounded-xl transition-all shadow-[0_0_15px_rgba(220,38,38,0.3)]"
            >
              Retry
            </button>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4">
          {currentSlots.map((slot, index) => {
            const isAvailable = slot.status === "available";
            const isSelected = selectedSlots.some(s => s.time === slot.time && s.type === activeTab);
            
            return (
              <button
                key={`${activeTab}-${index}`}
                disabled={!isAvailable}
                onClick={() => handleSlotClick(activeTab, slot.time, slot.status)}
                className={`py-3 px-2 font-bold text-sm rounded-xl transition-all border flex flex-col items-center justify-center gap-1 ${
                  isAvailable
                    ? isSelected
                      ? "bg-[#16a34a]/20 border-[#22c55e] text-[#22c55e] shadow-[0_0_20px_rgba(34,197,94,0.5)] scale-105"
                      : "bg-[#111111] border-[#22c55e]/30 text-[#22c55e] hover:border-[#22c55e] hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] cursor-pointer"
                    : "bg-[#0A0A0A] border-white/5 text-gray-600 cursor-not-allowed opacity-60"
                }`}
              >
                <span className={!isAvailable ? "line-through text-xs" : ""}>{slot.time}</span>
                {!isAvailable && (
                  <span className="text-[9px] font-black uppercase tracking-widest bg-red-900/50 text-red-400 px-1.5 py-0.5 rounded-md border border-red-800/50">
                    Booked
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Booking Summary Sidebar */}
      <div className="w-full lg:w-1/3">
        <div className="glass-panel p-6 sm:p-8 sticky top-24 lg:top-28">
          <h3 className="text-xl font-heading font-black text-white uppercase mb-6 border-b border-white/10 pb-4">
            Booking Summary
          </h3>
          
          {selectedSlots.length > 0 ? (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400 font-medium">Zone</span>
                  <span className="text-white font-bold">{activeTab} Zone</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400 font-medium">Date</span>
                  <span className="text-white font-bold">{selectedDate}</span>
                </div>
                <div className="flex flex-col gap-2 text-sm">
                  <span className="text-gray-400 font-medium">Selected Slots</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedSlots.map((s, i) => (
                      <span key={i} className="px-2 py-1 bg-[#00D4FF]/20 text-[#00D4FF] rounded-md text-xs font-bold border border-[#00D4FF]/30">
                        {s.time}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-col gap-3 pt-4">
                  <span className="text-gray-400 font-medium flex items-center gap-2"><Users className="w-4 h-4" /> Select Number of Players</span>
                  <div className="flex flex-wrap items-center gap-2 bg-[#111111] p-2 rounded-xl border border-white/10">
                    {Array.from({ length: activeTab === "Cele Lounge" ? 12 : 4 }, (_, i) => i + 1).map(num => (
                      <button
                        key={num}
                        onClick={() => setPlayers(num)}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold transition-all ${players === num ? "bg-[#00D4FF] text-[#000000] shadow-[0_0_15px_rgba(0,212,255,0.4)]" : "text-gray-400 hover:text-white hover:bg-white/5 border border-white/5"}`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
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
                  <span className="text-gray-400 font-medium">Total ({selectedSlots.length} {selectedSlots.length === 1 ? 'Hour' : 'Hours'})</span>
                  <span className="text-4xl font-heading font-black text-[#DC2626]">₹{getPrice(activeTab, players, selectedSlots.length)}</span>
                </div>
                <button 
                  onClick={handleReservation}
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#DC2626] hover:bg-[#b91c1c] text-white font-heading font-black uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] flex justify-center items-center gap-2 active:scale-95"
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
