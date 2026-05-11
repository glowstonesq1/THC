'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "I went as a solo traveler and came back with 15 new best friends. The HatchOut Club doesn't just plan trips — they architect connections.",
    name: 'Priya S.',
    trip: 'Bali Soul Immersion, 2024',
    age: '27',
  },
  {
    quote: "At 58, I wasn't sure about group travel. By day two, I was wrong about everything I assumed. This tribe makes you feel exactly the right age.",
    name: 'Rakesh M.',
    trip: 'Portugal & The Atlantic, 2024',
    age: '58',
  },
  {
    quote: "The attention to detail is absurd in the best way. Every meal, every moment, every conversation feels like it was meant to happen.",
    name: 'Ananya K.',
    trip: 'Vietnam, 2024',
    age: '31',
  },
  {
    quote: "Spiti with THC was the trip that broke me open. Cold mountain air, warm hearts, and silence that actually spoke. Nothing like it.",
    name: 'Dev R.',
    trip: 'Spiti Valley, 2024',
    age: '34',
  },
];

export default function CommunitySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power2.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 80%' }
        }
      );

      // Cards stagger
      gsap.fromTo('.testimonial-card',
        { opacity: 0, y: 60, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.8, stagger: 0.15, ease: 'power2.out',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 75%' }
        }
      );

      // Parallax element
      gsap.to(parallaxRef.current, {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="community" className="py-24 md:py-36 bg-[#543787] relative overflow-hidden">
      {/* Background decoration */}
      <div
        ref={parallaxRef}
        className="absolute -right-20 top-0 bottom-0 w-[400px] opacity-10 pointer-events-none"
      >
        <div className="w-full h-full" style={{
          background: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 40px,
            rgba(165,183,229,0.3) 40px,
            rgba(165,183,229,0.3) 41px
          )`
        }} />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">

        <div ref={headingRef} className="text-center mb-20 opacity-0">
          <span className="font-body text-[11px] tracking-[0.3em] text-[#a5b7e5] uppercase font-600 block mb-4">
            The Tribe Speaks
          </span>
          <h2 className="font-heading text-[42px] md:text-[54px] font-400 text-white leading-[1.08] max-w-[600px] mx-auto">
            Strangers who became
            <em className="not-italic text-[#feb737]"> something more</em>
          </h2>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`testimonial-card opacity-0 p-8 rounded-[2px] ${
                i % 3 === 0 ? 'bg-white/10 border border-white/10' : 'bg-white/5 border border-white/5'
              } hover:bg-white/15 transition-colors duration-300`}
            >
              <div className="font-heading text-[48px] text-[#a5b7e5]/40 leading-none mb-4">&ldquo;</div>
              <p className="font-body text-[16px] text-white/85 leading-[1.8] mb-8">
                {t.quote}
              </p>
              <div className="flex items-center justify-between border-t border-white/10 pt-5">
                <div>
                  <p className="font-body text-[14px] font-600 text-white">{t.name}</p>
                  <p className="font-body text-[12px] text-[#a5b7e5]/70 mt-0.5">{t.trip}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#a5b7e5]/20 flex items-center justify-center">
                  <span className="font-body text-[12px] text-[#a5b7e5] font-600">{t.age}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Photo wall */}
        <div className="mt-20">
          <p className="font-body text-[11px] tracking-[0.3em] text-[#a5b7e5]/60 uppercase text-center mb-8">
            Moments from the tribe
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className={`aspect-square overflow-hidden rounded-[2px] ${
                  i === 0 ? 'col-span-2 row-span-2' : ''
                }`}
              >
                <div className="img-placeholder w-full h-full" style={{
                  background: `linear-gradient(135deg, ${
                    i % 5 === 0 ? '#2d1a5e' :
                    i % 5 === 1 ? '#543787' :
                    i % 5 === 2 ? '#3d2868' :
                    i % 5 === 3 ? '#1a0f3e' :
                    '#4a2d7a'
                  } 0%, ${
                    i % 3 === 0 ? '#543787' : '#2d1a5e'
                  } 100%)`
                }}>
                  <span className="text-white/20 text-[9px]">Photo</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
