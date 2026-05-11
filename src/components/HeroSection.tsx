'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.8 });

      // Tag badge
      tl.fromTo(tagRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );

      // Heading split text reveal
      if (headingRef.current) {
        const split = new SplitText(headingRef.current, { type: 'lines' });
        split.lines.forEach(line => {
          const wrapper = document.createElement('div');
          wrapper.style.overflow = 'hidden';
          line.parentNode?.insertBefore(wrapper, line);
          wrapper.appendChild(line);
        });
        tl.fromTo(split.lines,
          { yPercent: 110 },
          { yPercent: 0, duration: 1.1, ease: 'power4.out', stagger: 0.12 },
          '-=0.3'
        );
      }

      // Sub text
      tl.fromTo(subRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.5'
      );

      // CTA
      tl.fromTo(ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      );

      // Image reveal
      tl.fromTo(imgRef.current,
        { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
        { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 1.2, ease: 'power3.inOut' },
        0.2
      );

      // Scroll indicator
      tl.fromTo(scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        '-=0.2'
      );

      // Parallax on scroll
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          if (imgRef.current) {
            gsap.set(imgRef.current, { yPercent: self.progress * 20 });
          }
          if (overlayRef.current) {
            gsap.set(overlayRef.current, { opacity: self.progress * 0.5 });
          }
        }
      });

      // Scroll indicator bounce
      const scrollArrow = scrollIndicatorRef.current?.querySelector('.scroll-arrow');
      if (scrollArrow) gsap.to(scrollArrow, {
        y: 8,
        duration: 1,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-[#f6f6ea]">
      {/* Background image placeholder */}
      <div
        ref={imgRef}
        className="absolute inset-0 will-change-transform"
        style={{ clipPath: 'inset(0 100% 0 0)' }}
      >
        <div className="vid-placeholder w-full h-full">
          <svg className="w-16 h-16 opacity-40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 10l4.553-2.277A1 1 0 0121 8.723v6.554a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-white/50 text-xs tracking-widest">Hero Video / Image</span>
        </div>
        <div ref={overlayRef} className="absolute inset-0 bg-[#1a1a1a] opacity-0" />
      </div>

      {/* Grain */}
      <div className="grain" />

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 w-full pt-24 pb-20">
        <div className="max-w-[750px]">
          {/* Tag */}
          <div ref={tagRef} className="mb-8 opacity-0">
            <span className="inline-flex items-center gap-2 bg-[#543787]/10 text-[#543787] font-body text-[12px] font-600 tracking-[0.2em] uppercase px-4 py-2 rounded-[2px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#feb737] inline-block" />
              Strangers → Soul Tribe
            </span>
          </div>

          {/* Heading */}
          <h1
            ref={headingRef}
            className="font-heading text-[56px] md:text-[76px] lg:text-[92px] font-400 leading-[1.05] text-[#1a1a1a] mb-8"
          >
            Travel that
            <br />
            <em className="not-italic text-[#543787]">changes</em> you.
          </h1>

          {/* Sub */}
          <p
            ref={subRef}
            className="font-body text-[17px] md:text-[19px] font-400 text-[#1a1a1a]/70 max-w-[500px] leading-[1.7] mb-10 opacity-0"
          >
            For the young & wild and the old & wise — we curate group journeys that turn strangers into a soul tribe. Not just a trip. A transformation.
          </p>

          {/* CTA */}
          <div ref={ctaRef} className="flex flex-wrap gap-4 opacity-0">
            <a href="#trips" className="btn-primary">
              Explore Upcoming Trips
            </a>
            <a href="#about" className="btn-outline">
              Our Story
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-0"
      >
        <span className="font-body text-[11px] tracking-[0.2em] text-[#1a1a1a]/50 uppercase">Scroll</span>
        <div className="scroll-arrow w-[1px] h-10 bg-[#543787]/40" />
      </div>

      {/* Floating stat cards */}
      <div className="absolute bottom-16 right-8 md:right-16 z-10 hidden md:flex flex-col gap-4">
        <div className="bg-white/90 backdrop-blur-sm border border-[#e5e5e0] rounded-[2px] px-6 py-4">
          <div className="font-heading text-[28px] text-[#543787]">500+</div>
          <div className="font-body text-[12px] text-[#1a1a1a]/60 tracking-wide uppercase">Travelers</div>
        </div>
        <div className="bg-[#543787] rounded-[2px] px-6 py-4">
          <div className="font-heading text-[28px] text-white">24</div>
          <div className="font-body text-[12px] text-white/60 tracking-wide uppercase">Trips Curated</div>
        </div>
      </div>
    </section>
  );
}
