import React from 'react';
import { Navbar } from './Navbar';
import { POLICIES_UPDATED } from '@/lib/contact';

/**
 * Shared shell for the policy pages: plain, readable prose on a solid panel,
 * since these get read in full (by customers and by payment-gateway review).
 */
export const LegalPage = ({
  title,
  showUpdated = true,
  children,
}: {
  title: string;
  showUpdated?: boolean;
  children: React.ReactNode;
}) => (
  <div className="min-h-screen text-white selection:bg-brand-purple/30">
    <Navbar />

    <main className="pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">{title}</h1>
        {showUpdated && (
          <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-10">
            Last updated: {POLICIES_UPDATED}
          </p>
        )}

        <article className="legal glass-solid rounded-3xl p-6 md:p-10">{children}</article>
      </div>
    </main>
  </div>
);
