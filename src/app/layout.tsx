import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { SiteFooter } from "@/components/SiteFooter";
import { Footer } from "@/components/Footer";
import { WaveformBackground } from "@/components/WaveformBackground";
import { RibbonSweep } from "@/components/RibbonSweep";
const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  metadataBase: new URL("https://occasionorbit.com"),
  openGraph: {
    type: "website",
    siteName: "OccasionOrbit",
    title: "OccasionOrbit | Your occasion. Our artists. One great night.",
    description: "Discover live music for weddings, celebrations, and events. Find your sound with OccasionOrbit.",
    locale: "en_IN",
    images: [{
      url: "/social/occasionorbit-preview.jpg",
      width: 1200,
      height: 630,
      alt: "OccasionOrbit’s 3D photo gallery with glowing number-filled music sculptures",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "OccasionOrbit | One great night",
    description: "Your occasion. Our artists. Live music for the moments that matter.",
    images: ["/social/occasionorbit-preview.jpg"],
  },
  title: "OccasionOrbit | Live music for your occasion",
  description:
    "Plan live music for weddings, corporate events, and private celebrations. Explore performance styles and ask OccasionOrbit for artist availability and a tailored quote.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.variable} ${playfair.variable}`}>
      <body>
        <WaveformBackground />
        <RibbonSweep />
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Navbar />
        {children}
        <Footer />
        <SiteFooter />
      </body>
    </html>
  );
}
