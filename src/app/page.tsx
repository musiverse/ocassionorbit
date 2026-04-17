'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { TrustSection } from '@/components/TrustSection';
import { FeatureGrid } from '@/components/FeatureGrid';
import { ProductShowcase } from '@/components/ProductShowcase';
import { HowItWorks } from '@/components/HowItWorks';
import { AppExperience } from '@/components/AppExperience';
import { CTASection } from '@/components/CTASection';
import { Footer } from '@/components/Footer';
import { SocialHub } from '@/components/SocialHub';
import { BookingModal } from '@/components/BookingModal';

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  React.useEffect(() => {
    const hasSeenBooking = sessionStorage.getItem('ocassionorbit_booking_seen');
    if (!hasSeenBooking) {
      const timer = setTimeout(() => {
        setIsBookingOpen(true);
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="min-h-screen bg-brand-bg text-white selection:bg-brand-purple/30">
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
      />
      <Navbar onBookingClick={() => setIsBookingOpen(true)} />
      
      <main>
        <HeroSection onBookingClick={() => setIsBookingOpen(true)} />
        <TrustSection />
        <FeatureGrid />
        <ProductShowcase />
        <AppExperience />
        <HowItWorks />
        <SocialHub />
        <CTASection onBookingClick={() => setIsBookingOpen(true)} />
      </main>

      <Footer />
    </div>
  );
}
