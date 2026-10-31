import Link from 'next/link';
import { COMPANY_NAME } from '@/lib/contact';

export const policyLinks = [
  { name: 'Contact Us', href: '/contact/' },
  { name: 'Terms & Conditions', href: '/terms/' },
  { name: 'Privacy Policy', href: '/privacy/' },
  { name: 'Refund & Cancellation', href: '/refund-policy/' },
  { name: 'Shipping & Delivery', href: '/shipping-policy/' },
];

/** Slim legal strip under every page; the ribbon sweep stays the visual close. */
export const SiteFooter = () => (
  <footer className="relative border-t border-white/5 bg-[#050810]/70 backdrop-blur-xl">
    <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row gap-4 items-center justify-between">
      <nav aria-label="Policies" className="flex flex-wrap justify-center gap-x-6 gap-y-2">
        {policyLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors"
          >
            {link.name}
          </Link>
        ))}
      </nav>
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 text-center">
        © {new Date().getFullYear()} {COMPANY_NAME}
      </p>
    </div>
  </footer>
);
