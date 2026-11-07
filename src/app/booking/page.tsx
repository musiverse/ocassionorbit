import { Suspense } from "react";
import { BookingInquiry } from "@/components/BookingInquiry";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/contact";
export const metadata = { title: "Plan an event | OccasionOrbit" };
export default function BookingPage() {
  return (
    <main id="main-content" className="wrap page-main form-page">
      <p className="eyebrow gold">For event hosts</p>
      <h1>
        Let’s make it
        <br />
        <em>unforgettable.</em>
      </h1>
      <p className="page-intro">
        Tell us about your occasion. We’ll discuss service options, availability,
        and pricing with you.
      </p>
      <Suspense fallback={<p>Loading enquiry form…</p>}><BookingInquiry /></Suspense>
      <p className="contact-note">
        Prefer a conversation? <a href={PHONE_TEL}>Call {PHONE_DISPLAY}</a>
      </p>
    </main>
  );
}
