'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const words = [
  'Bali', '✦', 'Rajasthan', '✦', 'Santorini', '✦', 'Spiti Valley', '✦',
  'Vietnam', '✦', 'Portugal', '✦', 'Morocco', '✦', 'Japan', '✦',
  'Peru', '✦', 'Iceland', '✦', 'Sri Lanka', '✦', 'Maldives', '✦',
];

export default function MarqueeSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 90%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const doubled = [...words, ...words];

  return (
    <div ref={sectionRef} className="py-6 border-y border-[#e5e5e0] bg-[#543787] overflow-hidden opacity-0">
      <div className="flex items-center overflow-hidden">
        <div ref={trackRef} className="marquee-track flex items-center gap-0 whitespace-nowrap">
          {doubled.map((word, i) => (
            <span
              key={i}
              className={`font-body text-[13px] tracking-[0.15em] uppercase px-6 py-1 ${
                word === '✦'
                  ? 'text-[#feb737]'
                  : 'text-white/80 font-500'
              }`}
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
