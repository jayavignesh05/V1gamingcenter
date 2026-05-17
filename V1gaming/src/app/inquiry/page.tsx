import type { Metadata } from "next";
import InquiryForm from "@/components/InquiryForm/InquiryForm";

export const metadata: Metadata = {
  title: "Contact Us — Inquiries & Group Bookings",
  description:
    "Have a question or want to plan a group event? Contact V1 Gaming Center at 98, Red Hills Road, Kalpalayam, Chennai-600099. We handle corporate events, birthday parties, and LAN tournaments.",
  keywords: [
    "contact gaming center Chennai",
    "gaming center inquiry Chennai",
    "group gaming event Chennai",
    "corporate gaming event Chennai",
    "LAN tournament Chennai",
    "V1 Gaming contact",
  ],
  alternates: { canonical: "/inquiry" },
  openGraph: {
    title: "Contact Us | V1 Gaming Center Chennai",
    description:
      "Reach out for group bookings, corporate events, or general inquiries at V1 Gaming Center, Kalpalayam, Chennai-600099.",
    url: "https://www.v1gamingcafe.com/inquiry",
  },
};

export default function Inquiry() {
  return (
    <main className="min-h-screen pt-20">
      <InquiryForm />
    </main>
  );
}
