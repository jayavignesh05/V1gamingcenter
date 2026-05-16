import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import FAB from "@/components/FAB/FAB";
import Script from "next/script";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://www.v1gamingcenter.com";
const SITE_NAME = "V1 Gaming Center";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  /* ── Core ── */
  title: {
    default: "V1 Gaming Center | #1 Esports & Gaming Lounge in Chennai",
    template: "%s | V1 Gaming Center Chennai",
  },
  description:
    "V1 Gaming Center — Chennai's premier esports lounge in Kalpalayam. PS5 Zone, PS4 Zone, VR Zone, Simulation Rigs & exclusive VIP Lounge at 98, Red Hills Road, Chennai-600099. Book your gaming session today!",
  keywords: [
    "gaming center Chennai",
    "esports lounge Chennai",
    "PS5 gaming Chennai",
    "PS4 gaming Chennai",
    "VR gaming Chennai",
    "gaming cafe Kalpalayam",
    "gaming lounge Kalpalayam Chennai",
    "gaming lounge Red Hills Road Chennai",
    "esports cafe Chennai",
    "simulation gaming Chennai",
    "V1 Gaming",
    "V1 Gaming Center",
    "book gaming station Chennai",
    "premium gaming lounge",
    "VIP gaming lounge Chennai",
  ],
  authors: [{ name: "V1 Gaming Center", url: SITE_URL }],
  creator: "V1 Gaming Center",
  publisher: "V1 Gaming Center",

  /* ── Canonical & Robots ── */
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  /* ── Open Graph ── */
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "V1 Gaming Center | #1 Esports & Gaming Lounge in Chennai",
    description:
      "Chennai's most premium gaming lounge — PS5, PS4, VR, Simulation Rigs & VIP Lounge at 98, Red Hills Road, Kalpalayam, Chennai-600099. Book your station now!",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "V1 Gaming Center Chennai — Premium Esports Lounge",
      },
    ],
  },

  /* ── Twitter / X Card ── */
  twitter: {
    card: "summary_large_image",
    title: "V1 Gaming Center | #1 Esports Lounge in Chennai",
    description:
      "PS5, PS4, VR & Simulation gaming at Kalpalayam, Chennai. Book your station today!",
    images: ["/images/og-image.jpg"],
    creator: "@V1GamingCenter",
    site: "@V1GamingCenter",
  },

  /* ── App / PWA ── */
  applicationName: SITE_NAME,
  category: "Entertainment",

  /* ── Verification (add your codes here) ── */
  verification: {
    google: "YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE",
    // bing: "YOUR_BING_VERIFICATION_CODE",
  },
};

/* ── JSON-LD Structured Data: LocalBusiness ── */
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "EntertainmentBusiness"],
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/images/og-image.jpg`,
  image: `${SITE_URL}/images/og-image.jpg`,
  description:
    "V1 Gaming Center is Chennai's #1 premium esports and gaming lounge located at 98, Red Hills Road, Kalpalayam, Chennai-600099. We offer PS5, PS4, VR, Simulation, and VIP Lounge experiences.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "98, Red Hills Road, Kalpalayam",
    addressLocality: "Chennai",
    addressRegion: "Tamil Nadu",
    postalCode: "600099",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 13.1437,
    longitude: 80.2459,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",
      ],
      opens: "10:00",
      closes: "23:00",
    },
  ],
  priceRange: "₹₹",
  servesCuisine: [],
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "PS5 Zone", value: true },
    { "@type": "LocationFeatureSpecification", name: "PS4 Zone", value: true },
    { "@type": "LocationFeatureSpecification", name: "VR Zone", value: true },
    { "@type": "LocationFeatureSpecification", name: "Simulation Zone", value: true },
    { "@type": "LocationFeatureSpecification", name: "VIP Lounge", value: true },
    { "@type": "LocationFeatureSpecification", name: "High-Speed WiFi", value: true },
    { "@type": "LocationFeatureSpecification", name: "Online Booking", value: true },
  ],
  sameAs: [
    "https://www.instagram.com/v1gamingcenter",
    "https://www.facebook.com/v1gamingcenter",
  ],
  telephone: "+91-9092095300",
  hasMap: `https://www.google.com/maps/search/V1+Gaming+Center+Kalpalayam+Chennai`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} antialiased dark scroll-smooth`}>
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Theme color for browser UI */}
        <meta name="theme-color" content="#DC2626" />
        <meta name="msapplication-TileColor" content="#000000" />

        {/* Geo tags for local SEO */}
        <meta name="geo.region" content="IN-TN" />
        <meta name="geo.placename" content="Kalpalayam, Chennai" />
        <meta name="geo.position" content="13.1437;80.2459" />
        <meta name="ICBM" content="13.1437, 80.2459" />

        {/* JSON-LD Structured Data */}
        <Script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
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
