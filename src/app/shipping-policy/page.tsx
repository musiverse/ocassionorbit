import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage } from '@/components/LegalPage';
import { COMPANY_NAME, SUPPORT_EMAIL } from '@/lib/contact';

export const metadata: Metadata = {
  title: 'Shipping & Delivery Policy | OccasionOrbit',
  description: 'How OccasionOrbit bookings are confirmed and delivered.',
};

export default function ShippingPolicyPage() {
  return (
    <LegalPage title="Shipping & Delivery Policy">
      <p>
        OccasionOrbit, operated by {COMPANY_NAME}, is a platform for booking live artists and
        performers. <strong>We do not sell or ship physical goods</strong>, so no shipping charges
        apply.
      </p>

      <h2>Booking confirmation</h2>
      <ul>
        <li>
          After a successful payment, your booking is confirmed instantly in the OccasionOrbit app
          and you receive an in-app notification.
        </li>
        <li>Your booking details, payment status and receipts stay available under your bookings.</li>
      </ul>

      <h2>Service delivery</h2>
      <ul>
        <li>
          The booked artist performs in person at the venue, date and time agreed in the booking,
          anywhere in India.
        </li>
        <li>
          Any travel or logistics agreed with the artist are shown in the booking before you pay.
        </li>
      </ul>

      <h2>If something goes wrong</h2>
      <p>
        If you do not receive a confirmation within 30 minutes of paying, or the service is not
        delivered as booked, contact us at <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
        Refunds are handled under our{' '}
        <Link href="/refund-policy/">Refund &amp; Cancellation Policy</Link>.
      </p>
    </LegalPage>
  );
}
