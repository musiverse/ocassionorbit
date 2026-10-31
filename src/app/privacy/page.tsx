import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage } from '@/components/LegalPage';
import { COMPANY_NAME, REGISTERED_ADDRESS, SUPPORT_EMAIL } from '@/lib/contact';

export const metadata: Metadata = {
  title: 'Privacy Policy | OccasionOrbit',
  description: 'What personal data OccasionOrbit collects, why, and your choices.',
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>
        This policy explains how {COMPANY_NAME} (&ldquo;OccasionOrbit&rdquo;, &ldquo;we&rdquo;)
        collects, uses and protects personal data when you use the OccasionOrbit app and website. It
        is published under the Information Technology Act, 2000 and the Digital Personal Data
        Protection Act, 2023.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li>
          <strong>Account details:</strong> your mobile number (used to sign in with a one-time
          password), name, email address and profile photo.
        </li>
        <li>
          <strong>Booking details:</strong> event type, date, venue address, guest information and
          notes you add to a booking.
        </li>
        <li>
          <strong>Artist profiles:</strong> for performers, stage name, genres, languages, bio,
          photos, videos and the cities you perform in.
        </li>
        <li>
          <strong>Messages:</strong> chats with artists, Customer Care and Event Managers inside the
          app.
        </li>
        <li>
          <strong>Payment information:</strong> payment status, amount and transaction reference.
          Card, UPI and bank details are entered directly with Razorpay; we never see or store them.
        </li>
        <li>
          <strong>Device data:</strong> device model, app version and a notification token so we can
          send booking updates.
        </li>
      </ul>

      <h2>How we use it</h2>
      <ul>
        <li>To create your account and verify your phone number.</li>
        <li>To match you with artists, manage bookings and process payments and refunds.</li>
        <li>To send booking, payment and chat notifications.</li>
        <li>To provide customer support and resolve disputes.</li>
        <li>To prevent fraud and meet legal, tax and accounting obligations.</li>
      </ul>
      <p>We do not sell your personal data or use it for third-party advertising.</p>

      <h2>Who we share it with</h2>
      <ul>
        <li>
          <strong>The other side of a booking:</strong> the artist sees the event details they need
          to perform; you see the artist&apos;s public profile.
        </li>
        <li>
          <strong>Service providers</strong> who process data on our behalf: Google Firebase (phone
          sign-in), Razorpay (payments), OneSignal (notifications) and Amazon Web Services (hosting
          and storage, in India).
        </li>
        <li>
          <strong>Authorities</strong>, when required by law or to protect the rights and safety of
          our users.
        </li>
      </ul>

      <h2>Retention</h2>
      <p>
        We keep your data while your account is active. Booking and payment records are kept for up
        to 8 years to meet tax and accounting law. Other data is deleted or anonymised within 90 days
        of account deletion.
      </p>

      <h2>Security</h2>
      <p>
        Data is encrypted in transit (HTTPS) and stored on access-controlled servers. No system is
        perfectly secure, but we take reasonable measures to protect your information.
      </p>

      <h2>Your rights</h2>
      <p>
        You can access and correct your profile in the app, withdraw consent, or ask us to delete
        your account and data by writing to <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
        We respond within 30 days.
      </p>

      <h2>Children</h2>
      <p>
        OccasionOrbit is not intended for anyone under 18. Bookings must be made by an adult.
      </p>

      <h2>Changes</h2>
      <p>
        We will post updates on this page and, for significant changes, notify you in the app.
      </p>

      <h2>Grievance Officer</h2>
      <p>
        Grievance Officer, {COMPANY_NAME}
        <br />
        {REGISTERED_ADDRESS}
        <br />
        <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
      </p>
      <p>
        See <Link href="/contact/">Contact Us</Link> for other ways to reach us.
      </p>
    </LegalPage>
  );
}
