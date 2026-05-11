'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import MarqueeSection from '@/components/MarqueeSection';
import AboutSection from '@/components/AboutSection';
import HorizontalScrollSection from '@/components/HorizontalScrollSection';
import UpcomingTrips from '@/components/UpcomingTrips';
import PastTrips from '@/components/PastTrips';
import CommunitySection from '@/components/CommunitySection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import { getTrips, Trip } from '@/lib/trips-data';

export default function Home() {
  const [trips, setTrips] = useState<Trip[]>([]);

  useEffect(() => {
    setTrips(getTrips());
  }, []);

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <HorizontalScrollSection />
        {trips.length > 0 && (
          <>
            <UpcomingTrips trips={trips} />
            <PastTrips trips={trips} />
          </>
        )}
        <CommunitySection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
