'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Heading reveal
      if (headingRef.current) {
        const split = new SplitText(headingRef.current, { type: 'lines' });
        split.lines.forEach(line => {
          const wrapper = document.createElement('div');
          wrapper.style.overflow = 'hidden';
          line.parentNode?.insertBefore(wrapper, line);
          wrapper.appendChild(line);
        });
        gsap.fromTo(split.lines,
          { yPercent: 100 },
          {
            yPercent: 0,
            duration: 1,
            ease: 'power4.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 80%',
            }
          }
        );
      }

      // Text blocks
      const paragraphs = textRef.current?.querySelectorAll('p');
      if (!paragraphs) return;
      gsap.fromTo(paragraphs,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 75%',
          }
        }
      );

      // Image
      gsap.fromTo(imgRef.current,
        { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
        {
          clipPath: 'inset(0 0 0% 0)',
          opacity: 1,
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: imgRef.current,
            start: 'top 80%',
          }
        }
      );

      // Stats count up
      const statEls = statsRef.current?.querySelectorAll('.stat-number');
      statEls?.forEach(el => {
        const target = parseInt(el.getAttribute('data-target') || '0');
        gsap.fromTo({ val: 0 },
          { val: 0 },
          {
            val: target,
            duration: 1.5,
            ease: 'power2.out',
            onUpdate: function() {
              el.textContent = Math.round(this.targets()[0].val) + (el.getAttribute('data-suffix') || '');
            },
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 80%',
              once: true,
            }
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-24 md:py-36 bg-[#f6f6ea]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">

        {/* Label */}
        <div className="mb-12">
          <span className="font-body text-[11px] tracking-[0.3em] text-[#543787] uppercase font-600">
            Our Story
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left: Heading + image */}
          <div>
            <h2
              ref={headingRef}
              className="font-heading text-[42px] md:text-[52px] lg:text-[60px] font-400 leading-[1.08] text-[#1a1a1a] mb-12"
            >
              We&apos;re not a travel
              <br />
              company.
              <br />
              <em className="not-italic text-[#543787]">We&apos;re a tribe.</em>
            </h2>

            {/* Image */}
            <div
              ref={imgRef}
              className="aspect-[4/3] overflow-hidden rounded-[2px]"
              style={{ clipPath: 'inset(0 0 100% 0)' }}
            >
              <div className="img-placeholder w-full h-full">
                <span>Community Photo</span>
              </div>
            </div>
          </div>

          {/* Right: Text + stats */}
          <div className="pt-4 lg:pt-20">
            <div ref={textRef} className="space-y-6 mb-16">
              <p className="font-body text-[17px] font-400 text-[#1a1a1a]/80 leading-[1.8]">
                The HatchOut Club was born from a simple belief: the best journeys happen when you travel with people who feel like home — even if you just met them yesterday.
              </p>
              <p className="font-body text-[17px] font-400 text-[#1a1a1a]/80 leading-[1.8]">
                We curate group trips and custom itineraries designed to crack you open — gently, beautifully. Whether you&apos;re 23 and restless or 55 and seeking, our trips are built around shared meals, slow mornings, and the kind of conversations that follow you home.
              </p>
              <p className="font-body text-[17px] font-400 text-[#1a1a1a]/80 leading-[1.8]">
                We work on request. We cap group sizes. We choose depth over scale. And we only run trips when the numbers make sense — because every journey deserves the full experience.
              </p>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-3 gap-6 border-t border-[#e5e5e0] pt-10">
              <div>
                <div className="font-heading text-[40px] text-[#543787] leading-none mb-1">
                  <span className="stat-number" data-target="500" data-suffix="+">0+</span>
                </div>
                <div className="font-body text-[13px] text-[#1a1a1a]/50 tracking-wide">Souls traveled</div>
              </div>
              <div>
                <div className="font-heading text-[40px] text-[#543787] leading-none mb-1">
                  <span className="stat-number" data-target="24" data-suffix="">0</span>
                </div>
                <div className="font-body text-[13px] text-[#1a1a1a]/50 tracking-wide">Trips curated</div>
              </div>
              <div>
                <div className="font-heading text-[40px] text-[#543787] leading-none mb-1">
                  <span className="stat-number" data-target="14" data-suffix="">0</span>
                </div>
                <div className="font-body text-[13px] text-[#1a1a1a]/50 tracking-wide">Countries visited</div>
              </div>
            </div>
          </div>
        </div>

        {/* Philosophy strip */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-px bg-[#e5e5e0]">
          {[
            { icon: '○', title: 'Community First', text: 'Every trip is designed around connection — with the place and the people beside you.' },
            { icon: '◇', title: 'Curated, Not Packaged', text: 'We research every stay, route, and meal. Nothing is default, everything is chosen.' },
            { icon: '△', title: 'Request-Based', text: 'We cap group sizes and only run when the numbers make sense. Your experience is never compromised.' },
          ].map((item, i) => (
            <div key={i} className="bg-[#f6f6ea] p-10 hover:bg-white transition-colors duration-300">
              <div className="font-body text-[20px] text-[#543787] mb-4">{item.icon}</div>
              <h3 className="font-heading text-[20px] text-[#1a1a1a] mb-3">{item.title}</h3>
              <p className="font-body text-[15px] text-[#1a1a1a]/60 leading-[1.7]">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
