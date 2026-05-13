import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import FAB from "@/components/FAB/FAB";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "V1 Gaming Center",
  description: "Premium Gaming Center and Cafe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased dark`}>
      <body className="min-h-full flex flex-col bg-[#0A0A0A] text-gray-200 font-sans">
        <Header />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
        <FAB />
      </body>
    </html>
  );
}
