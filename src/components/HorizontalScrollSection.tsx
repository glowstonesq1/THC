'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const manifesto = [
  {
    number: '01',
    title: 'For the Young & Wild',
    text: 'You have the energy. The hunger. The 2am restlessness that wants to see more, feel more. We take that and channel it into journeys that leave a mark.',
    color: '#feb737',
    bg: '#543787',
  },
  {
    number: '02',
    title: 'For the Old & Wise',
    text: 'You\'ve earned your pace. You know what you like, what you won\'t compromise on, and that the best travel is slow and intentional. We agree.',
    color: '#7cb8c1',
    bg: '#1a1a1a',
  },
  {
    number: '03',
    title: 'Strangers Become Tribe',
    text: 'By day three, you\'re finishing each other\'s sentences. By the last night, you can\'t imagine not knowing these people. That\'s not magic — that\'s design.',
    color: '#a5b7e5',
    bg: '#2d1a5e',
  },
  {
    number: '04',
    title: 'We Work on Request',
    text: 'You reach out. We listen. Then we build something specifically for you — your pace, your vibe, your budget, your definition of adventure.',
    color: '#fff4c6',
    bg: '#543787',
  },
  {
    number: '05',
    title: 'Community Over Commerce',
    text: 'We don\'t chase volume. We protect culture. Small groups, deep connections, trips that feel like you planned them yourself — because in a way, you did.',
    color: '#ff865b',
    bg: '#1a1a1a',
  },
];

export default function HorizontalScrollSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!wrapperRef.current || !trackRef.current) return;

      // Heading
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 80%' }
        }
      );

      // Horizontal scroll
      const totalWidth = trackRef.current.scrollWidth;
      const viewportWidth = wrapperRef.current.offsetWidth;
      const scrollDistance = totalWidth - viewportWidth;

      gsap.to(trackRef.current, {
        x: -scrollDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          end: () => `+=${scrollDistance + 200}`,
          pin: true,
          scrub: 1.5,
          anticipatePin: 1,
        }
      });

      // Each card fade in
      const cards = trackRef.current.querySelectorAll('.manifest-card');
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0.4 },
          {
            opacity: 1,
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: `${i * 15}% top`,
              end: `${(i + 1) * 15}% top`,
              scrub: true,
            }
          }
        );
      });

    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-[#f6f6ea]">
      {/* Heading above the pinned area */}
      <div ref={headingRef} className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pt-24 pb-12 opacity-0">
        <span className="font-body text-[11px] tracking-[0.3em] text-[#543787] uppercase font-600 block mb-4">
          Our Manifesto
        </span>
        <h2 className="font-heading text-[42px] md:text-[54px] font-400 text-[#1a1a1a] leading-[1.08] max-w-[600px]">
          What we stand for
        </h2>
        <p className="font-body text-[15px] text-[#1a1a1a]/50 mt-4 flex items-center gap-2">
          <span>Scroll to explore</span>
          <span className="inline-block">→</span>
        </p>
      </div>

      {/* Pinned horizontal scroll */}
      <div ref={wrapperRef} className="overflow-hidden h-screen flex items-center">
        <div
          ref={trackRef}
          className="flex gap-6 px-6 md:px-16 py-8"
          style={{ width: 'max-content' }}
        >
          {manifesto.map((item, i) => (
            <div
              key={i}
              className="manifest-card flex-shrink-0 w-[min(85vw,480px)] h-[440px] rounded-[2px] p-10 flex flex-col justify-between"
              style={{ background: item.bg }}
            >
              <div>
                <span className="font-body text-[11px] tracking-[0.3em]" style={{ color: item.color + '80' }}>
                  {item.number}
                </span>
                <h3 className="font-heading text-[30px] font-400 leading-[1.15] mt-4 mb-6" style={{ color: item.color }}>
                  {item.title}
                </h3>
                <p className="font-body text-[16px] leading-[1.8] text-white/70">
                  {item.text}
                </p>
              </div>
              <div className="flex items-end justify-between">
                <div className="w-12 h-[1px]" style={{ background: item.color + '40' }} />
                <div className="w-8 h-8 rounded-full border flex items-center justify-center" style={{ borderColor: item.color + '30' }}>
                  <span style={{ color: item.color, fontSize: '12px' }}>✦</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
