'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trip } from '@/lib/trips-data';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  trips: Trip[];
}

export default function PastTrips({ trips }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [activeTrip, setActiveTrip] = useState<Trip | null>(trips[0] || null);

  const pastTrips = trips.filter(t => t.status === 'past');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 80%' }
        }
      );

      // Stagger trip list items
      gsap.fromTo('.past-trip-item',
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate preview change
  const previewRef = useRef<HTMLDivElement>(null);
  const handleTripSelect = (trip: Trip) => {
    if (!previewRef.current) return;
    gsap.fromTo(previewRef.current,
      { opacity: 0, scale: 0.97 },
      { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' }
    );
    setActiveTrip(trip);
  };

  return (
    <section ref={sectionRef} id="past" className="py-24 md:py-36 bg-[#f6f6ea]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">

        <div ref={headingRef} className="mb-16 opacity-0">
          <span className="font-body text-[11px] tracking-[0.3em] text-[#543787] uppercase font-600 block mb-4">
            Where we&apos;ve been
          </span>
          <h2 className="font-heading text-[42px] md:text-[54px] font-400 text-[#1a1a1a] leading-[1.08]">
            Past Journeys
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Trip list */}
          <div className="space-y-0 border-t border-[#e5e5e0]">
            {pastTrips.map((trip, i) => (
              <div
                key={trip.id}
                className={`past-trip-item opacity-0 border-b border-[#e5e5e0] py-7 cursor-pointer group transition-all duration-300 ${
                  activeTrip?.id === trip.id ? 'pl-4' : 'pl-0 hover:pl-4'
                }`}
                onClick={() => handleTripSelect(trip)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                        activeTrip?.id === trip.id ? 'bg-[#543787]' : 'bg-[#e5e5e0] group-hover:bg-[#543787]'
                      }`} />
                      <span className="font-body text-[11px] tracking-[0.2em] text-[#1a1a1a]/40 uppercase">
                        {trip.dates}
                      </span>
                    </div>
                    <h3 className={`font-heading text-[24px] font-400 transition-colors duration-300 ${
                      activeTrip?.id === trip.id ? 'text-[#543787]' : 'text-[#1a1a1a] group-hover:text-[#543787]'
                    }`}>
                      {trip.title}
                    </h3>
                    <p className="font-body text-[13px] text-[#1a1a1a]/50 mt-1">{trip.destination}</p>
                  </div>
                  <div className="text-right flex-shrink-0 ml-6">
                    <div className="font-body text-[12px] text-[#1a1a1a]/40">{trip.duration}</div>
                    <div className={`font-body text-[11px] tracking-wide mt-1 ${
                      trip.category === 'young-wild'
                        ? 'text-[#feb737]'
                        : trip.category === 'old-wise'
                        ? 'text-[#7cb8c1]'
                        : 'text-[#a5b7e5]'
                    }`}>
                      {trip.category === 'young-wild' ? 'Young & Wild' : trip.category === 'old-wise' ? 'Old & Wise' : 'All Ages'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Preview panel */}
          <div className="sticky top-28">
            {activeTrip && (
              <div ref={previewRef}>
                {/* Main image */}
                <div className="aspect-[4/3] overflow-hidden rounded-[2px] mb-6">
                  <div className="img-placeholder w-full h-full">
                    <span>{activeTrip.destination}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-heading text-[30px] text-[#1a1a1a] leading-tight">{activeTrip.title}</h3>
                  <p className="font-body text-[14px] italic text-[#543787]">&ldquo;{activeTrip.tagline}&rdquo;</p>
                  <p className="font-body text-[15px] text-[#1a1a1a]/70 leading-[1.75]">{activeTrip.description}</p>

                  {/* Highlights */}
                  <div className="pt-4 border-t border-[#e5e5e0]">
                    <p className="font-body text-[11px] tracking-[0.2em] text-[#1a1a1a]/40 uppercase mb-3">Trip Highlights</p>
                    <div className="flex flex-wrap gap-2">
                      {activeTrip.highlights.map((h, i) => (
                        <span key={i} className="font-body text-[12px] tracking-wide bg-white border border-[#e5e5e0] text-[#1a1a1a]/60 px-3 py-1 rounded-[2px]">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Past photo grid */}
                  <div className="grid grid-cols-3 gap-2 pt-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="aspect-square overflow-hidden rounded-[2px]">
                        <div className="img-placeholder w-full h-full text-[10px]">
                          <span className="text-white/30">Photo {i}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
