"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";
const links = [
  { name: "Find your sound", href: "/events" },
  { name: "Our app", href: "/#mobile-app" },
  { name: "How it works", href: "/#how-it-works" },
  { name: "For artists", href: "/artists" },
];
export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className="site-header">
      <div className="wrap nav-inner">
        <Link
          href="/"
          aria-label="OccasionOrbit home"
          onClick={() => setOpen(false)}
        >
          <Logo size="md" />
        </Link>
        <nav aria-label="Main navigation" className="desktop-nav">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={pathname === l.href ? "page" : undefined}
            >
              {l.name}
            </Link>
          ))}
        </nav>
        <Link href="/booking" className="action action-gold nav-book">
          Plan an event <ArrowUpRight size={16} />
        </Link>
        <button
          className="menu-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav
          id="mobile-nav"
          className="mobile-nav wrap"
          aria-label="Mobile navigation"
        >
          {[...links, { name: "Plan an event", href: "/booking" }].map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};
