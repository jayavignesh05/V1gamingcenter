"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Gamepad2, Loader2, Zap, CheckCircle2, AlertCircle, Users, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { decryptClient, encryptClient } from "@/lib/crypto";

interface Slot {
  time: string;
  status: "available" | "busy" | "past";
}

const DEFAULT_SLOTS = [
  "10:00 AM – 11:00 AM", "11:00 AM – 12:00 PM", "12:00 PM – 01:00 PM", "01:00 PM – 02:00 PM",
  "02:00 PM – 03:00 PM", "03:00 PM – 04:00 PM", "04:00 PM – 05:00 PM", "05:00 PM – 06:00 PM",
  "06:00 PM – 07:00 PM", "07:00 PM – 08:00 PM", "08:00 PM – 09:00 PM", "09:00 PM – 10:00 PM", "10:00 PM – 11:00 PM"
];

/** Stations per zone — names shown to user */
const ZONE_STATIONS: Record<string, string[]> = {
  PS5:                 ["Station 1", "Station 2", "Station 3"],
  PS4:                 ["Station 1", "Station 2", "Station 3", "Station 4"],
  Simulation:          ["Station 1", "Station 2"],
  VR:                  ["Station 1", "Station 2", "Station 3"],
  "Pvt Lounge":        ["Station 1"],
  "Celebrations Lounge": ["Station 1"],
  "OTT Lounge":        ["Station 1"],
};

// IST = UTC+5:30 — use this instead of toISOString() which returns UTC
const getISTDateString = (): string => {
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000; // 5 hrs 30 min in ms
  const istDate = new Date(now.getTime() + istOffset);
  return istDate.toISOString().split("T")[0];
};

export default function Reservation() {
  const [selectedDate, setSelectedDate] = useState<string>(getISTDateString());
  const [selectedSlots, setSelectedSlots] = useState<{ type: string; time: string }[]>([]);
  const [players, setPlayers] = useState(1);
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<"PS5" | "PS4" | "Simulation" | "VR" | "Pvt Lounge" | "Celebrations Lounge" | "OTT Lounge">("PS5");

  useEffect(() => {
    const zone = searchParams.get("zone");
    const validTabs = ["PS5", "PS4", "Simulation", "VR", "Pvt Lounge", "Celebrations Lounge", "OTT Lounge"];
    if (zone && validTabs.includes(zone)) {
      setActiveTab(zone as any);
    }
  }, [searchParams]);
  
  // allBookings[zone][station] = Set of booked time strings
  const [allBookings, setAllBookings] = useState<Record<string, Record<string, Set<string>>>>({});
  const [selectedStation, setSelectedStation] = useState<string>("Station 1");
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [fetchError, setFetchError] = useState<string | null>(null);

  const validateName = (val: string): string => {
    const v = val.trim();
    if (!v) return "Name is required.";
    if (v.length < 2) return "Name must be at least 2 characters.";
    if (!/^[a-zA-Z\s.]{2,50}$/.test(v)) return "Only letters and spaces allowed.";
    return "";
  };

  const validatePhone = (val: string): string => {
    const v = val.trim().replace(/\s/g, "");
    if (!v) return "Phone number is required.";
    if (!/^[6-9]\d{9}$/.test(v)) return "Enter valid 10-digit Indian mobile (starts 6-9).";
    return "";
  };

  // Returns true if the slot range's start time has already passed (IST)
  const isPastSlot = (date: string, slotTime: string): boolean => {
    const today = getISTDateString();
    if (date !== today) return false;

    const now = new Date();
    // slotTime is "10:00 AM – 11:00 AM" — extract start
    const startTime = slotTime.split(" – ")[0].trim();
    const [timePart, meridiem] = startTime.split(" ");
    let [hours, minutes] = timePart.split(":").map(Number);
    if (meridiem === "PM" && hours !== 12) hours += 12;
    if (meridiem === "AM" && hours === 12) hours = 0;

    const slotDate = new Date();
    slotDate.setHours(hours, minutes, 0, 0);
    return now >= slotDate;
  };

  const fetchReservations = async (date: string) => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const res = await fetch(`/api/reservations?date=${date}`);

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

      // Build per-zone per-station booked time sets
      const bookings: Record<string, Record<string, Set<string>>> = {};
      Object.keys(ZONE_STATIONS).forEach(zone => {
        bookings[zone] = {};
        ZONE_STATIONS[zone].forEach(st => { bookings[zone][st] = new Set(); });
      });

      data.forEach((booking: Record<string, string>) => {
        const z = booking.console_id;
        const s = booking.station_id;
        const t = booking.time_slot;
        if (bookings[z]?.[s]) bookings[z][s].add(t);
      });

      setAllBookings(bookings);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Could not load slot availability";
      console.error("fetchReservations error:", msg);
      setFetchError(msg);
      setAllBookings({});
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations(selectedDate);
    setSelectedSlots([]);
    setPlayers(1);
    setSelectedStation("Station 1"); // reset station on date/zone change
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
    } else if (type === "Celebrations Lounge") {
      // 1st hour: ₹3000, add-on hours: ₹2000 each
      return 3000 + (numHours - 1) * 2000;
    } else if (type === "OTT Lounge") {
      // Premium movie & gaming lounge: ₹250 flat per hour
      return 250 * numHours;
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
    // "past" and "busy" slots — do nothing (button is disabled anyway)
  };

  const handleReservation = async () => {
    if (selectedSlots.length === 0) return;
    const nErr = validateName(customerName);
    const pErr = validatePhone(phoneNumber);
    setNameError(nErr);
    setPhoneError(pErr);
    if (nErr || pErr) return;

    setIsSubmitting(true);
    try {
      // Encrypt the entire payload before sending
      const encryptedBody = await encryptClient({
        customer_name: customerName,
        phone_number: phoneNumber,
        booking_date: selectedDate,
        time_slots: selectedSlots.map(s => s.time),
        console_id: activeTab,
        station_id: selectedStation,
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


  // Compute current station's slots dynamically from allBookings
  const currentSlots: Slot[] = DEFAULT_SLOTS.map(time => {
    if (isPastSlot(selectedDate, time)) return { time, status: "past" };
    const isBooked = allBookings[activeTab]?.[selectedStation]?.has(time) ?? false;
    return { time, status: isBooked ? "busy" : "available" };
  });

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
              min={getISTDateString()}
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
          {["PS5", "PS4", "Simulation", "VR", "Pvt Lounge", "Celebrations Lounge", "OTT Lounge"].map((tab) => (
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

        {/* ── Station Picker ── */}
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Select Station</p>
          <div className="flex flex-wrap gap-2">
            {(ZONE_STATIONS[activeTab] ?? []).map(station => {
              const allSlotsBooked = DEFAULT_SLOTS.every(
                t => isPastSlot(selectedDate, t) || (allBookings[activeTab]?.[station]?.has(t) ?? false)
              );
              const isActiveStation = selectedStation === station;
              return (
                <button
                  key={station}
                  onClick={() => { setSelectedStation(station); setSelectedSlots([]); }}
                  className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl border transition-all duration-200 ${
                    isActiveStation
                      ? "bg-[#00D4FF]/20 border-[#00D4FF] text-[#00D4FF] shadow-[0_0_12px_rgba(0,212,255,0.3)]"
                      : allSlotsBooked
                        ? "bg-[#0a0a0a] border-red-900/30 text-gray-600 opacity-40 cursor-not-allowed"
                        : "bg-[#111111] border-white/10 text-gray-400 hover:border-[#00D4FF]/50 hover:text-[#00D4FF] cursor-pointer"
                  }`}
                >
                  {activeTab} {station}
                  {allSlotsBooked && <span className="ml-1 text-[8px]">FULL</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Small non-blocking warning if API failed */}
        {!isLoading && fetchError && (
          <div className="flex items-center justify-between gap-3 mb-4 px-3 py-2.5 bg-yellow-900/20 border border-yellow-700/30 rounded-xl">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-yellow-500 flex-shrink-0" />
              <span className="text-xs text-yellow-400 font-medium">
                Could not load live data — availability may not be accurate.
              </span>
            </div>
            <button
              onClick={() => fetchReservations(selectedDate)}
              className="text-[10px] font-black uppercase tracking-widest text-yellow-400 border border-yellow-700/50 px-2.5 py-1 rounded-lg hover:bg-yellow-900/40 transition-all flex-shrink-0"
            >
              Retry
            </button>
          </div>
        )}

        {/* Skeleton grid while loading — blocks interaction */}
        {isLoading ? (
          <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4">
            {Array.from({ length: 13 }).map((_, i) => (
              <div
                key={i}
                className="py-4 px-3 rounded-2xl border border-white/5 bg-[#0d0d0d] flex flex-col items-center justify-center gap-2 animate-pulse"
              >
                <div className="h-3 w-16 bg-white/10 rounded-full" />
                <div className="h-2 w-2 bg-white/5 rounded-full" />
                <div className="h-2.5 w-14 bg-white/5 rounded-full" />
              </div>
            ))}
          </div>
        ) : (
        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4">
          {currentSlots.map((slot, index) => {
            const isAvailable = slot.status === "available";
            const isPast     = slot.status === "past";
            const isBusy     = slot.status === "busy";
            const isSelected = selectedSlots.some(s => s.time === slot.time && s.type === activeTab);
            
            return (
              <button
                key={`${activeTab}-${index}`}
                disabled={!isAvailable}
                onClick={() => handleSlotClick(activeTab, slot.time, slot.status)}
                className={`relative py-4 px-3 rounded-2xl transition-all duration-200 border flex flex-col items-center justify-center gap-1.5 overflow-hidden group ${
                  isSelected
                    ? "bg-[#16a34a]/20 border-[#22c55e] shadow-[0_0_24px_rgba(34,197,94,0.45)] scale-[1.04]"
                    : isAvailable
                      ? "bg-[#0d0d0d] border-[#22c55e]/20 hover:border-[#22c55e]/70 hover:bg-[#0f1f0f] hover:shadow-[0_0_16px_rgba(34,197,94,0.2)] cursor-pointer"
                      : isPast
                        ? "bg-[#080808] border-white/5 cursor-not-allowed opacity-35"
                        : "bg-[#0d0808] border-red-900/20 cursor-not-allowed opacity-50"
                }`}
              >
                {/* Selected glow ring */}
                {isSelected && (
                  <span className="absolute inset-0 rounded-2xl border border-[#22c55e]/40 animate-pulse pointer-events-none" />
                )}

                {/* Start time */}
                <span className={`text-sm font-black tracking-wide font-heading ${
                  isSelected ? "text-[#22c55e]" :
                  isAvailable ? "text-[#22c55e] group-hover:text-[#4ade80]" :
                  "text-gray-600 line-through"
                }`}>
                  {slot.time.split(" – ")[0]}
                </span>

                {/* Arrow divider */}
                <span className={`text-[10px] font-bold ${
                  isAvailable ? "text-[#22c55e]/50" : "text-gray-700"
                }`}>↓</span>

                {/* End time */}
                <span className={`text-[11px] font-semibold ${
                  isSelected ? "text-[#22c55e]/80" :
                  isAvailable ? "text-[#22c55e]/60 group-hover:text-[#22c55e]/80" :
                  "text-gray-700 line-through"
                }`}>
                  {slot.time.split(" – ")[1]}
                </span>

                {/* Status badge */}
                {isPast && (
                  <span className="mt-1 text-[8px] font-black uppercase tracking-widest bg-white/5 text-gray-600 px-2 py-0.5 rounded-full border border-white/10">
                    PAST
                  </span>
                )}
                {isBusy && (
                  <span className="mt-1 text-[8px] font-black uppercase tracking-widest bg-red-950/60 text-red-500 px-2 py-0.5 rounded-full border border-red-800/40">
                    FULL
                  </span>
                )}
                {isSelected && (
                  <span className="mt-1 text-[8px] font-black uppercase tracking-widest bg-[#22c55e]/20 text-[#22c55e] px-2 py-0.5 rounded-full border border-[#22c55e]/40">
                    ✓ SELECTED
                  </span>
                )}
              </button>
            );
          })}
        </div>
        )}
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
                  <span className="text-gray-400 font-medium">Station</span>
                  <span className="text-[#00D4FF] font-bold">{activeTab} {selectedStation}</span>
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
                    {Array.from({ length: activeTab === "Celebrations Lounge" ? 12 : activeTab === "OTT Lounge" ? 8 : 4 }, (_, i) => i + 1).map(num => (
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
                {/* Name Input */}
                <div className="flex flex-col gap-1">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={customerName}
                    maxLength={50}
                    onChange={(e) => {
                      // allow only letters and spaces
                      const val = e.target.value.replace(/[^a-zA-Z\s.]/g, "");
                      setCustomerName(val);
                      setNameError(validateName(val));
                    }}
                    className={`w-full bg-[#111111] border rounded-xl p-3 text-white focus:outline-none text-sm transition-colors ${
                      nameError ? "border-red-500 focus:border-red-400" : "border-white/10 focus:border-[#00D4FF]"
                    }`}
                  />
                  {nameError && <p className="text-red-400 text-xs font-medium pl-1">{nameError}</p>}
                </div>

                {/* Phone Input */}
                <div className="flex flex-col gap-1">
                  <input
                    type="tel"
                    placeholder="10-digit Mobile Number"
                    value={phoneNumber}
                    maxLength={10}
                    onChange={(e) => {
                      // allow only digits
                      const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                      setPhoneNumber(val);
                      setPhoneError(validatePhone(val));
                    }}
                    className={`w-full bg-[#111111] border rounded-xl p-3 text-white focus:outline-none text-sm transition-colors ${
                      phoneError ? "border-red-500 focus:border-red-400" : "border-white/10 focus:border-[#00D4FF]"
                    }`}
                  />
                  {phoneError && <p className="text-red-400 text-xs font-medium pl-1">{phoneError}</p>}
                </div>
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
                  {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</> : "Confirm Reservation"}
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
