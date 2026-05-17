import type { Metadata } from "next";
import GamingZonesClient from "./GamingZonesClient";

export const metadata: Metadata = {
  title: "Gaming Zones — PS5, PS4, VR, Simulation & Lounges",
  description:
    "Explore V1 Gaming Center's premium zones: PS5 & PS4 Zones, VR, Simulation, Celebrations Lounge (ideal for birthday parties & gaming events), and OTT Lounge (perfect for live sports match viewing & private movie screenings) in Kalpalayam, Chennai.",
  keywords: [
    "PS5 gaming zone Chennai",
    "PS4 gaming zone Chennai",
    "VR gaming zone Chennai",
    "simulation gaming Chennai",
    "gaming zones Kalpalayam Chennai",
    "esports zones Chennai",
    "gaming station prices Chennai",
    "celebrations lounge Chennai birthday party",
    "OTT lounge Chennai live cricket",
    "private movie screening hall Chennai",
    "gaming birthday party Kalpalayam"
  ],
  alternates: { canonical: "/zones" },
  openGraph: {
    title: "Gaming Zones | V1 Gaming Center Chennai",
    description:
      "PS5, PS4, VR & Simulation gaming zones — book your arena at V1 Gaming Center, Kalpalayam, Chennai-600099.",
    url: "https://www.v1gamingcenter.com/zones",
  },
};

export default function GamingZonesPage() {
  return <GamingZonesClient />;
}
