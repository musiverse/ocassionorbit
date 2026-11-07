"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Smartphone,
  Zap,
  Shield,
  Globe,
  Mic2,
  Calendar,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

/**
 * The phone mockup used to point at /app-screen-1..5.png — files that were never
 * added to /public, so it rendered an empty gradient. The screens are built in
 * code instead: they stay on-brand, need no assets, and can't 404.
 */

const DiscoverScreen = () => (
  <div className="h-full w-full px-5 pt-12 pb-20 flex flex-col gap-3">
    <p className="text-[9px] font-black uppercase tracking-[0.25em] text-white/30">
      Near you
    </p>
    {[
      { name: "VALOR", genre: "Electronic Soul", live: true },
      { name: "LYRA", genre: "Acoustic Beyond", live: false },
      { name: "ORBIT", genre: "Indie Space", live: true },
    ].map((a) => (
      <div
        key={a.name}
        className="flex items-center gap-3 rounded-xl bg-white/[0.04] border border-white/5 p-2.5"
      >
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-purple to-brand-gold flex items-center justify-center shrink-0">
          <Mic2 className="w-4 h-4 text-black/70" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-black text-white truncate">{a.name}</p>
          <p className="text-[8px] font-bold uppercase tracking-wider text-white/30 truncate">
            {a.genre}
          </p>
        </div>
        {a.live && (
          <span className="text-[7px] font-black uppercase tracking-wider text-brand-gold px-1.5 py-0.5 rounded bg-brand-gold/10 shrink-0">
            Live
          </span>
        )}
      </div>
    ))}
  </div>
);

const BookingScreen = () => (
  <div className="h-full w-full px-5 pt-12 pb-20 flex flex-col gap-4">
    <p className="text-[9px] font-black uppercase tracking-[0.25em] text-white/30">
      Book a stage
    </p>
    <div className="rounded-xl bg-white/[0.04] border border-white/5 p-3">
      <p className="text-[8px] font-black uppercase tracking-wider text-white/30 mb-2">
        Date
      </p>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: 21 }, (_, i) => (
          <div
            key={i}
            className={`aspect-square rounded flex items-center justify-center text-[7px] font-black ${
              i === 11
                ? "bg-brand-gold text-black"
                : "bg-white/[0.03] text-white/25"
            }`}
          >
            {i + 1}
          </div>
        ))}
      </div>
    </div>
    <div className="space-y-2">
      {["Wedding", "Corporate", "Private"].map((t, i) => (
        <div
          key={t}
          className={`rounded-lg px-3 py-2 text-[9px] font-black uppercase tracking-wider border ${
            i === 0
              ? "bg-brand-purple/15 border-brand-purple/40 text-brand-purple-light"
              : "bg-white/[0.03] border-white/5 text-white/30"
          }`}
        >
          {t}
        </div>
      ))}
    </div>
  </div>
);

const LiveScreen = () => (
  <div className="h-full w-full px-5 pt-12 pb-20 flex flex-col items-center justify-center gap-5">
    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-purple to-brand-gold flex items-center justify-center">
      <Mic2 className="w-8 h-8 text-black/70" />
    </div>
    <div className="text-center">
      <p className="text-sm font-black uppercase tracking-tight text-white">
        On Stage
      </p>
      <p className="text-[8px] font-black uppercase tracking-[0.25em] text-brand-gold mt-1">
        124 BPM &middot; Live
      </p>
    </div>
    {/* Equalizer — the same idea as the page background, at phone scale. */}
    <div className="flex items-end gap-1 h-14">
      {[0.4, 0.75, 0.35, 1, 0.55, 0.9, 0.3, 0.7, 0.45].map((h, i) => (
        <span
          key={i}
          className="w-1.5 rounded-full bg-gradient-to-t from-brand-purple to-brand-gold"
          style={{ height: `${h * 100}%` }}
        />
      ))}
    </div>
  </div>
);

const EarningsScreen = () => (
  <div className="h-full w-full px-5 pt-12 pb-20 flex flex-col gap-3">
    <p className="text-[9px] font-black uppercase tracking-[0.25em] text-white/30">
      This month
    </p>
    <div className="rounded-xl bg-white/[0.04] border border-white/5 p-4">
      <p className="text-[8px] font-black uppercase tracking-wider text-white/30">
        Paid out
      </p>
      <p className="text-2xl font-black tracking-tighter text-brand-gold mt-1">
        ₹1,24,500
      </p>
      <div className="flex items-center gap-1 mt-2 text-[8px] font-black uppercase tracking-wider text-green-400">
        <TrendingUp className="w-3 h-3" />
        +18% vs last
      </div>
    </div>
    <div className="flex-1 rounded-xl bg-white/[0.04] border border-white/5 p-4 flex items-end gap-1.5">
      {[0.3, 0.5, 0.4, 0.7, 0.55, 0.9, 0.75].map((h, i) => (
        <div key={i} className="flex-1 flex flex-col justify-end h-full">
          <div
            className="w-full rounded-sm bg-gradient-to-t from-brand-purple/40 to-brand-purple"
            style={{ height: `${h * 100}%` }}
          />
        </div>
      ))}
    </div>
    <div className="flex items-center gap-2 rounded-lg bg-white/[0.03] border border-white/5 px-3 py-2">
      <Calendar className="w-3 h-3 text-brand-gold shrink-0" />
      <span className="text-[8px] font-black uppercase tracking-wider text-white/40">
        3 bookings this week
      </span>
    </div>
  </div>
);

const appScreens = [
  { id: "discover", title: "Discover Artists", Screen: DiscoverScreen },
  { id: "booking", title: "Book a Stage", Screen: BookingScreen },
  { id: "live", title: "Go Live", Screen: LiveScreen },
  { id: "earnings", title: "Track Earnings", Screen: EarningsScreen },
];

const appFeatures = [
  {
    icon: Zap,
    title: "High-octane performance",
    description:
      "A mobile stage for sharing performances and connecting with an audience.",
  },
  {
    icon: Globe,
    title: "Global connectivity",
    description:
      "Discover artists and explore connections with virtual and physical venues.",
  },
  {
    icon: Shield,
    title: "Secure earnings",
    description:
      "A planned place to manage bookings, track revenue, and follow payouts.",
  },
];
export const AppExperience = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const active = appScreens[currentIndex];
  const Screen = active.Screen;
  return (
    <section
      className="section wrap app-section"
      id="mobile-app"
      aria-labelledby="app-heading"
    >
      <div className="app-layout">
        <div className="app-preview">
          <div className="phone-orbit" aria-hidden="true" />
          <div className="app-phone">
            <div className="phone-status" aria-hidden="true">
              <span>9:41</span>
              <span>● ● ▰</span>
            </div>
            <div
              className="phone-screen"
              id="app-screen-panel"
              role="tabpanel"
              aria-labelledby={`app-tab-${active.id}`}
            >
              <Screen />
            </div>
            <div className="phone-bottom">
              <Smartphone size={16} />
              <span>OccasionOrbit</span>
              <span className="gold">Preview</span>
            </div>
          </div>
          <p className="app-preview-note">
            Illustrative app screens · not live account data
          </p>
        </div>
        <div className="app-copy">
          <p className="eyebrow gold">
            The OccasionOrbit mobile app · coming soon
          </p>
          <h2 id="app-heading">
            Take the stage.
            <br />
            <em>To go.</em>
          </h2>
          <p className="app-description">
            Your portable command centre for discovering artists, managing
            performances, and building your journey. The mobile app brings the
            original OccasionOrbit vision into your pocket.
          </p>
          <div className="app-features">
            {appFeatures.map(({ icon: Icon, title, description }) => (
              <article key={title}>
                <span className="app-feature-icon">
                  <Icon size={21} />
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="app-store-row" aria-label="Planned mobile platforms">
            <span>
              App Store <small>Coming soon</small>
            </span>
            <span>
              Google Play <small>Coming soon</small>
            </span>
          </div>
          <p className="app-status-note">
            The app is in development. Event inquiries and artist introductions
            are available on this website today.
          </p>
          <Link className="text-link" href="/artists">
            Introduce yourself as an artist <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
      <div
        className="app-screen-tabs"
        role="tablist"
        aria-label="Explore the app preview"
      >
        {appScreens.map((screen, i) => (
          <button
            id={`app-tab-${screen.id}`}
            key={screen.id}
            role="tab"
            aria-selected={currentIndex === i}
            aria-controls="app-screen-panel"
            tabIndex={currentIndex === i ? 0 : -1}
            onClick={() => setCurrentIndex(i)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                e.preventDefault();
                const next =
                  (i + (e.key === "ArrowRight" ? 1 : -1) + appScreens.length) %
                  appScreens.length;
                setCurrentIndex(next);
                document
                  .getElementById(`app-tab-${appScreens[next].id}`)
                  ?.focus();
              }
            }}
          >
            {screen.title}
          </button>
        ))}
      </div>
    </section>
  );
};
