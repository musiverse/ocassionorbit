import { InquiryForm } from "@/components/InquiryForm";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/contact";
export const metadata = { title: "Join as an artist | OccasionOrbit" };
export default function ArtistPage() {
  return (
    <main id="main-content" className="wrap page-main form-page">
      <p className="eyebrow gold">For artists</p>
      <h1>
        Your talent.
        <br />
        <em>A new connection.</em>
      </h1>
      <p className="page-intro">
        Introduce yourself and share a performance link. Our team can discuss
        opportunities and the next steps with you.
      </p>
      <InquiryForm kind="artist" />
      <p className="contact-note">
        Questions? <a href={PHONE_TEL}>Call {PHONE_DISPLAY}</a>
      </p>
    </main>
  );
}
