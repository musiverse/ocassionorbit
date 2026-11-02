import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage } from '@/components/LegalPage';
import { COMPANY_NAME, SUPPORT_EMAIL } from '@/lib/contact';

export const metadata: Metadata = {
  title: 'Delete Your Account | OccasionOrbit',
  description: 'How to delete your OccasionOrbit account and what data is removed.',
};

const requestMailto = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
  'Delete my OccasionOrbit account',
)}&body=${encodeURIComponent(
  'Please delete my OccasionOrbit account.\n\nRegistered mobile number: \nName on the account: ',
)}`;

export default function DeleteAccountPage() {
  return (
    <LegalPage title="Delete Your Account">
      <p>
        You can delete your OccasionOrbit account (app by {COMPANY_NAME}) at any time, either in
        the app or by sending us a request.
      </p>

      <h2>Option 1: In the app</h2>
      <ul>
        <li>Open the OccasionOrbit app and sign in.</li>
        <li>
          Go to <strong>My Profile</strong> and tap <strong>Delete Account</strong>.
        </li>
        <li>Confirm. You are signed out and your account is closed immediately.</li>
      </ul>

      <h2>Option 2: Request by email</h2>
      <p>
        If you no longer have the app, email{' '}
        <a href={requestMailto}>{SUPPORT_EMAIL}</a> from any address with the subject
        &ldquo;Delete my OccasionOrbit account&rdquo; and include the mobile number you signed in
        with. We may contact you on that number to confirm the request is yours, then close the
        account within 7 days and email you when it is done.
      </p>

      <h2>What is deleted</h2>
      <ul>
        <li>Your account is closed at once and your mobile number can no longer be used to sign in to it.</li>
        <li>Artist profiles, photos and videos are removed from the app and search.</li>
        <li>
          Your name, email, profile photo, chat messages and other personal data are permanently
          deleted or anonymised within 90 days.
        </li>
      </ul>

      <h2>What we keep, and for how long</h2>
      <ul>
        <li>
          Booking, payment and invoice records are kept for up to <strong>8 years</strong>, as
          required by Indian tax and accounting law, and then deleted.
        </li>
        <li>
          If a booking is disputed, related records are kept until the dispute is resolved.
        </li>
      </ul>
      <p>
        See our <Link href="/privacy/">Privacy Policy</Link> for more on how we handle your data.
      </p>
    </LegalPage>
  );
}
