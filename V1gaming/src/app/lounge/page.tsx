import type { Metadata } from "next";
import LoungeClient from "./LoungeClient";

export const metadata: Metadata = {
  title: "VIP Lounge — Private Gaming & Celebration Rooms",
  description:
    "Book V1 Gaming Center's exclusive VIP Lounge at 98, Red Hills Road, Kalpalayam, Chennai-600099. Private PS5 gaming, 85-inch 4K HDR displays, plush recliners, Celebrations Lounge (₹3,000/hr) for up to 12 guests.",
  keywords: [
    "VIP gaming lounge Chennai",
    "private gaming room Chennai",
    "celebration gaming lounge Chennai",
    "Celebrations Lounge Chennai",
    "private PS5 room Chennai",
    "gaming birthday party Chennai",
    "group gaming room Kalpalayam Chennai",
  ],
  alternates: { canonical: "/lounge" },
  openGraph: {
    title: "VIP Lounge | V1 Gaming Center Chennai",
    description:
      "Private gaming experience with 85-inch 4K displays, recliners & surround sound. Perfect for celebrations & corporate events.",
    url: "https://www.v1gamingcafe.com/lounge",
  },
};

export default function LoungePage() {
  return <LoungeClient />;
}
