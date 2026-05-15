import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import FAB from "@/components/FAB/FAB";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "V1 Gaming Center",
  description: "Elite Esports and Gaming Center",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} antialiased dark scroll-smooth`}>
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-[#000000] text-gray-200 font-sans noise-bg">
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
