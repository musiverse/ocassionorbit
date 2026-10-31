import type { Metadata } from 'next';
import { LegalPage } from '@/components/LegalPage';
import {
  COMPANY_NAME,
  PHONE_DISPLAY,
  PHONE_TEL,
  PHONE_WHATSAPP,
  REGISTERED_ADDRESS,
  SUPPORT_EMAIL,
} from '@/lib/contact';

export const metadata: Metadata = {
  title: 'Contact Us | OccasionOrbit',
  description: 'Reach OccasionOrbit support for bookings, payments and refunds.',
};

export default function ContactPage() {
  return (
    <LegalPage title="Contact Us" showUpdated={false}>
      <p>
        OccasionOrbit is operated by <strong>{COMPANY_NAME}</strong>. For questions about a booking,
        a payment, a refund or your account, reach us on any of the channels below. We reply within
        1 business day (Monday–Saturday, 10:00–19:00 IST).
      </p>

      <h2>Registered office</h2>
      <p>
        {COMPANY_NAME}
        <br />
        {REGISTERED_ADDRESS}
      </p>

      <h2>Email</h2>
      <p>
        <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
      </p>

      <h2>Phone &amp; WhatsApp</h2>
      <p>
        <a href={PHONE_TEL}>{PHONE_DISPLAY}</a> ·{' '}
        <a href={PHONE_WHATSAPP} target="_blank" rel="noopener noreferrer">
          Chat on WhatsApp
        </a>
      </p>

      <h2>In the app</h2>
      <p>
        Signed-in users can message Customer Care or their Event Manager from the Inbox in the
        OccasionOrbit app.
      </p>

      <h2>Grievance Officer</h2>
      <p>
        Complaints about the platform, payments or the handling of your personal data can be sent
        to the Grievance Officer at <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. We
        acknowledge grievances within 48 hours and resolve them within 30 days.
      </p>
    </LegalPage>
  );
}
