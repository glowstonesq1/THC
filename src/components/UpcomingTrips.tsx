'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trip } from '@/lib/trips-data';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  trips: Trip[];
}

function SpotBar({ available, total, required }: { available: number; total: number; required: number }) {
  const pct = ((total - available) / total) * 100;
  const reqPct = (required / total) * 100;

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-2">
        <span className="font-body text-[12px] text-[#1a1a1a]/50 tracking-wide">
          {available === 0 ? 'SOLD OUT' : `${available} of ${total} spots left`}
        </span>
        <span className="font-body text-[11px] text-[#543787]/70">
          Min {required} needed
        </span>
      </div>
      <div className="h-[3px] bg-[#e5e5e0] rounded-full relative">
        <div
          className="absolute top-0 left-0 h-full bg-[#543787] rounded-full transition-all duration-1000"
          style={{ width: `${pct}%` }}
        />
        <div
          className="absolute top-[-3px] h-[9px] w-[2px] bg-[#feb737]"
          style={{ left: `${reqPct}%` }}
          title={`Min required: ${required}`}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="font-body text-[10px] text-[#1a1a1a]/30">0</span>
        <span className="font-body text-[10px] text-[#1a1a1a]/30">{total}</span>
      </div>
    </div>
  );
}

function TripCard({ trip, index }: { trip: Trip; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          ease: 'power2.out',
          delay: index * 0.1,
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
          }
        }
      );
    });
    return () => ctx.revert();
  }, [index]);

  const statusColors: Record<string, string> = {
    upcoming: 'bg-[#7cb8c1]/20 text-[#4a9ca7]',
    open: 'bg-[#a5b7e5]/20 text-[#543787]',
    full: 'bg-[#ff865b]/20 text-[#d45a2a]',
    past: 'bg-[#1a1a1a]/10 text-[#1a1a1a]/50',
  };

  const statusLabels: Record<string, string> = {
    upcoming: 'Filling Up',
    open: 'Open',
    full: 'Sold Out',
    past: 'Past Trip',
  };

  return (
    <div
      ref={cardRef}
      className="opacity-0 bg-white border border-[#e5e5e0] rounded-[2px] overflow-hidden card-lift group"
    >
      {/* Image placeholder */}
      <div className="aspect-[4/3] overflow-hidden relative">
        <div className="img-placeholder w-full h-full transition-transform duration-700 group-hover:scale-105">
          <span>{trip.destination}</span>
        </div>

        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className={`font-body text-[11px] font-600 tracking-[0.1em] uppercase px-3 py-1 rounded-[2px] ${
            trip.category === 'young-wild'
              ? 'bg-[#feb737] text-[#1a1a1a]'
              : trip.category === 'old-wise'
              ? 'bg-[#543787] text-white'
              : 'bg-[#7cb8c1] text-white'
          }`}>
            {trip.category === 'young-wild' ? 'Young & Wild' : trip.category === 'old-wise' ? 'Old & Wise' : 'All Ages'}
          </span>
        </div>

        {/* Status */}
        <div className="absolute top-4 right-4">
          <span className={`font-body text-[11px] font-600 tracking-[0.1em] uppercase px-3 py-1 rounded-[2px] ${statusColors[trip.status]}`}>
            {statusLabels[trip.status]}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-2">
          <h3 className="font-heading text-[22px] text-[#1a1a1a] leading-tight">{trip.title}</h3>
          <span className="font-heading text-[20px] text-[#543787] flex-shrink-0">{trip.price}</span>
        </div>

        <p className="font-body text-[13px] tracking-wide text-[#543787] mb-3">{trip.destination}</p>
        <p className="font-body text-[13px] italic text-[#1a1a1a]/50 mb-4">&ldquo;{trip.tagline}&rdquo;</p>

        <p className="font-body text-[14px] text-[#1a1a1a]/70 leading-[1.7] mb-5 line-clamp-2">
          {trip.description}
        </p>

        {/* Highlights */}
        <div className="flex flex-wrap gap-2 mb-5">
          {trip.highlights.slice(0, 3).map((h, i) => (
            <span key={i} className="font-body text-[11px] tracking-wide bg-[#f6f6ea] text-[#1a1a1a]/60 px-3 py-1 rounded-[2px]">
              {h}
            </span>
          ))}
          {trip.highlights.length > 3 && (
            <span className="font-body text-[11px] text-[#543787]">+{trip.highlights.length - 3} more</span>
          )}
        </div>

        <div className="flex items-center justify-between text-[12px] font-body text-[#1a1a1a]/40 mb-4">
          <span>{trip.dates}</span>
          <span>{trip.duration}</span>
        </div>

        {trip.status !== 'past' && (
          <SpotBar available={trip.spotsAvailable} total={trip.spotsTotal} required={trip.spotsRequired} />
        )}

        {trip.status !== 'past' && (
          <a
            href="#contact"
            className={`btn-primary w-full text-center mt-5 block ${trip.status === 'full' ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {trip.status === 'full' ? 'Join Waitlist' : 'Request to Join'}
          </a>
        )}
      </div>
    </div>
  );
}

export default function UpcomingTrips({ trips }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [filter, setFilter] = useState<'all' | 'young-wild' | 'old-wise'>('all');

  const upcomingTrips = trips.filter(t => t.status !== 'past');
  const filtered = filter === 'all' ? upcomingTrips : upcomingTrips.filter(t => t.category === filter || t.category === 'all');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="trips" className="py-24 md:py-36 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div>
            <span className="font-body text-[11px] tracking-[0.3em] text-[#543787] uppercase font-600 block mb-4">
              Where to next
            </span>
            <h2 ref={headingRef} className="font-heading text-[42px] md:text-[54px] font-400 text-[#1a1a1a] leading-[1.08]">
              Upcoming Journeys
            </h2>
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            {(['all', 'young-wild', 'old-wise'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`font-body text-[13px] font-500 tracking-wide px-5 py-2 rounded-[2px] border transition-all duration-200 ${
                  filter === f
                    ? 'bg-[#543787] text-white border-[#543787]'
                    : 'bg-transparent text-[#1a1a1a] border-[#e5e5e0] hover:border-[#543787] hover:text-[#543787]'
                }`}
              >
                {f === 'all' ? 'All Trips' : f === 'young-wild' ? 'Young & Wild' : 'Old & Wise'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((trip, i) => (
            <TripCard key={trip.id} trip={trip} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="font-heading text-[28px] text-[#1a1a1a]/30">No upcoming trips in this category</p>
            <p className="font-body text-[15px] text-[#1a1a1a]/40 mt-3">Check back soon or request a custom trip</p>
          </div>
        )}

        <div className="mt-16 text-center">
          <p className="font-body text-[15px] text-[#1a1a1a]/50 mb-4">
            Don&apos;t see what you&apos;re looking for?
          </p>
          <a href="#contact" className="btn-outline">
            Request a Custom Trip
          </a>
        </div>
      </div>
    </section>
  );
}
