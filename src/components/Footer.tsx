import Link from "next/link";
import { Logo } from "./Logo";
import { PHONE_DISPLAY, PHONE_TEL, PHONE_WHATSAPP } from "@/lib/contact";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <Link href="/" aria-label="OccasionOrbit home">
            <Logo size="sm" />
          </Link>
          <p>Live music for the moments that matter.</p>
        </div>
        <nav aria-label="Footer navigation">
          <Link href="/events">Explore performances</Link>
          <Link href="/booking">Plan an event</Link>
          <Link href="/artists">Join as an artist</Link>
          <Link href="/#faq">Frequently asked questions</Link>
        </nav>
        <div>
          <p className="eyebrow gold">Let’s talk music</p>
          <a href={PHONE_TEL}>{PHONE_DISPLAY}</a>
          <a href={PHONE_WHATSAPP} target="_blank" rel="noopener noreferrer">
            Chat on WhatsApp ↗
          </a>
          <p>Share your city to check artist availability.</p>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <span>© {new Date().getFullYear()} OccasionOrbit</span>
        <span>Availability and pricing confirmed with our team.</span>
      </div>
    </footer>
  );
}
