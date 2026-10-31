import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage } from '@/components/LegalPage';
import { COMPANY_NAME, SUPPORT_EMAIL } from '@/lib/contact';

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy | OccasionOrbit',
  description: 'How cancellations and refunds work for artist bookings on OccasionOrbit.',
};

export default function RefundPolicyPage() {
  return (
    <LegalPage title="Refund & Cancellation Policy">
      <p>
        This policy applies to artist and performer bookings made through the OccasionOrbit app and
        website, operated by {COMPANY_NAME}. &ldquo;Event date&rdquo; means the date and start time
        of the performance in your booking.
      </p>

      <h2>How payment works</h2>
      <ul>
        <li>You send a booking request; nothing is charged until the artist accepts it.</li>
        <li>
          Once accepted, you pay either a 50% advance (with the balance due before the event) or the
          full amount up front. Payments are processed securely by Razorpay. Some bookings can be
          paid in cash where offered in the app.
        </li>
      </ul>

      <h2>Cancellation by you</h2>
      <p>You can cancel a booking from the app or by contacting us. Refunds depend on notice:</p>
      <ul>
        <li>
          <strong>More than 7 days before the event date:</strong> full refund of everything you
          have paid.
        </li>
        <li>
          <strong>Between 48 hours and 7 days before the event date:</strong> 50% of the advance is
          refunded, plus any balance you have already paid.
        </li>
        <li>
          <strong>Less than 48 hours before the event date, or no-show:</strong> no refund, as the
          artist has reserved the date and turned away other work.
        </li>
      </ul>
      <p>Booking requests that the artist has not yet accepted can be withdrawn at no charge.</p>

      <h2>Cancellation by the artist or by OccasionOrbit</h2>
      <p>
        If the artist declines after payment, cancels, or does not perform, or if we cancel the
        booking for any reason, you receive a <strong>100% refund</strong> of all amounts paid. Where
        possible we will also offer a comparable replacement artist, which you are free to decline.
      </p>

      <h2>Rescheduling</h2>
      <p>
        Requests to change the event date are subject to the artist&apos;s availability. If the
        artist cannot make the new date, the request is treated as a cancellation by you, based on
        the original event date.
      </p>

      <h2>Refund timeline</h2>
      <ul>
        <li>
          Approved refunds are initiated within 5–7 business days to the original payment method.
        </li>
        <li>
          Your bank or card issuer may take a further 5–10 business days to credit the amount.
        </li>
        <li>Cash payments are refunded by bank transfer or UPI to an account you nominate.</li>
      </ul>

      <h2>How to request a refund</h2>
      <p>
        Write to <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> or message Customer Care in
        the app with your booking ID. See <Link href="/contact/">Contact Us</Link> for all channels.
      </p>
    </LegalPage>
  );
}
