import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage } from '@/components/LegalPage';
import { COMPANY_NAME, REGISTERED_ADDRESS, SUPPORT_EMAIL } from '@/lib/contact';

export const metadata: Metadata = {
  title: 'Terms & Conditions | OccasionOrbit',
  description: 'The terms for using OccasionOrbit to book and perform at events.',
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms & Conditions">
      <p>
        These terms govern your use of the OccasionOrbit app and website, operated by{' '}
        {COMPANY_NAME}, {REGISTERED_ADDRESS} (&ldquo;OccasionOrbit&rdquo;, &ldquo;we&rdquo;). By
        creating an account or making a booking, you agree to them.
      </p>

      <h2>The service</h2>
      <p>
        OccasionOrbit is a platform that connects customers organising events
        (&ldquo;Hosts&rdquo;) with singers, musicians, bands and other performers
        (&ldquo;Artists&rdquo;) across India. We facilitate discovery, booking, communication and
        payment.
      </p>

      <h2>Accounts</h2>
      <ul>
        <li>You must be 18 or older and provide accurate information.</li>
        <li>You sign in with your mobile number and are responsible for activity on your account.</li>
        <li>We may suspend accounts that break these terms or misuse the platform.</li>
      </ul>

      <h2>Bookings and payments</h2>
      <ul>
        <li>A booking is confirmed only after the Artist accepts it and the required payment is made.</li>
        <li>
          Prices are shown in Indian Rupees (INR) and include applicable taxes unless stated
          otherwise.
        </li>
        <li>
          You pay a 50% advance or the full amount up front; any balance must be paid before the
          event. Online payments are processed by Razorpay, subject to its terms.
        </li>
        <li>
          Cancellations and refunds follow our{' '}
          <Link href="/refund-policy/">Refund &amp; Cancellation Policy</Link>.
        </li>
      </ul>

      <h2>Host responsibilities</h2>
      <ul>
        <li>Provide accurate event details, a safe venue and any permissions the event requires.</li>
        <li>Treat Artists with respect and arrange agreed facilities such as sound and power.</li>
      </ul>

      <h2>Artist responsibilities</h2>
      <ul>
        <li>Keep your profile, media and availability accurate and your own.</li>
        <li>Arrive on time and perform as agreed in the booking.</li>
        <li>Upload only content you have the rights to use.</li>
      </ul>

      <h2>Acceptable use</h2>
      <p>
        Do not use OccasionOrbit for anything unlawful, abusive, fraudulent or misleading, or to take
        payment for a platform booking outside the platform. Do not interfere with the security or
        operation of the service.
      </p>

      <h2>Content</h2>
      <p>
        You keep ownership of content you upload, and grant us a licence to display it on
        OccasionOrbit to operate and promote the service. We may remove content that breaks these
        terms.
      </p>

      <h2>Liability</h2>
      <p>
        Artists are independent performers, not our employees. We work to verify Artists and resolve
        disputes, but to the extent the law allows, our liability for any booking is limited to the
        amount you paid through OccasionOrbit for that booking.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of India. Disputes are subject to the exclusive
        jurisdiction of the courts at Varanasi, Uttar Pradesh.
      </p>

      <h2>Changes and contact</h2>
      <p>
        We may update these terms and will post the new version here. Questions? Write to{' '}
        <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> or see{' '}
        <Link href="/contact/">Contact Us</Link>.
      </p>
    </LegalPage>
  );
}
