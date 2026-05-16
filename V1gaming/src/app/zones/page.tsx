import type { Metadata } from "next";
import GamingZonesClient from "./GamingZonesClient";

export const metadata: Metadata = {
  title: "Gaming Zones — PS5, PS4, VR & Simulation",
  description:
    "Explore V1 Gaming Center's premium zones: PS5 Zone (₹199/hr), PS4 Zone (₹149/hr), VR Zone (₹200/hr), and Simulation Zone (₹350/hr) at 98, Red Hills Road, Kalpalayam, Chennai-600099.",
  keywords: [
    "PS5 gaming zone Chennai",
    "PS4 gaming zone Chennai",
    "VR gaming zone Chennai",
    "simulation gaming Chennai",
    "gaming zones Kalpalayam Chennai",
    "esports zones Chennai",
    "gaming station prices Chennai",
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
