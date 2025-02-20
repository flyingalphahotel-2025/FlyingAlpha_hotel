import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import EgoisticNavbar from "@/components/Utils/EgoisticNavbar";
import EgoisticFooter from "@/components/Utils/EgoisticFooter";
import ogImage from '../../public/Hotels/BedRoom3.jpg'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Flying Alpha - Book Luxury Hotels & Resorts",
  description: "Experience luxury and comfort with Flying Alpha. Book your stay at top-rated hotels and resorts with exclusive offers, complimentary breakfast, and free Wi-Fi. Enjoy seamless booking and great savings!",
  keywords: [
    "luxury hotels",
    "hotel booking",
    "resort booking",
    "luxury resorts",
    "book hotels online",
    "hotel deals",
    "complimentary breakfast",
    "free Wi-Fi hotels",
    "Flying Alpha",
    "affordable luxury stays",
    "best hotel offers",
  ],
  openGraph: {
    title: "Flying Alpha - Book Luxury Hotels & Resorts",
    description: "Experience luxury and comfort with Flying Alpha. Book your stay at top-rated hotels and resorts with exclusive offers, complimentary breakfast, and free Wi-Fi.",
    url: "https://www.flyingalpha.in/",
    siteName: "Flying Alpha",
    images: [
      {
        url: ogImage.src, 
        width: 1200,
        height: 630,
        alt: "Flying Alpha - Luxury Hotel Booking",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <EgoisticNavbar/>
        {children}
        <EgoisticFooter/>
      </body>
    </html>
  );
}
