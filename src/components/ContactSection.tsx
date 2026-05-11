'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', interest: '', message: '', vibe: '',
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power2.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 80%' }
        }
      );

      const formFields = formRef.current?.querySelectorAll('.form-field');
      if (formFields) {
        gsap.fromTo(formFields,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out',
            scrollTrigger: { trigger: formRef.current, start: 'top 75%' }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Animate submission
    gsap.to(formRef.current, {
      opacity: 0, y: -20, duration: 0.4, ease: 'power2.in',
      onComplete: () => setSubmitted(true)
    });
  };

  return (
    <section ref={sectionRef} id="contact" className="py-24 md:py-36 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left */}
          <div>
            <div ref={headingRef} className="opacity-0">
              <span className="font-body text-[11px] tracking-[0.3em] text-[#543787] uppercase font-600 block mb-4">
                Let&apos;s travel together
              </span>
              <h2 className="font-heading text-[42px] md:text-[52px] font-400 text-[#1a1a1a] leading-[1.08] mb-8">
                Tell us where
                <br />
                you&apos;re <em className="not-italic text-[#543787]">craving</em> to go.
              </h2>
              <p className="font-body text-[16px] text-[#1a1a1a]/60 leading-[1.8] mb-10">
                We work on request. Send us your dream, your dates, your vibe — and we&apos;ll build something real around it. Whether it&apos;s an upcoming group trip or a custom journey, we&apos;re here to make it happen.
              </p>
            </div>

            {/* Contact info */}
            <div className="space-y-6 border-t border-[#e5e5e0] pt-10">
              <div>
                <p className="font-body text-[11px] tracking-[0.2em] text-[#1a1a1a]/40 uppercase mb-1">Email</p>
                <p className="font-body text-[16px] text-[#543787]">hello@thehatchoutclub.com</p>
              </div>
              <div>
                <p className="font-body text-[11px] tracking-[0.2em] text-[#1a1a1a]/40 uppercase mb-1">Instagram</p>
                <p className="font-body text-[16px] text-[#543787]">@thehatchoutclub</p>
              </div>
              <div>
                <p className="font-body text-[11px] tracking-[0.2em] text-[#1a1a1a]/40 uppercase mb-1">WhatsApp Community</p>
                <p className="font-body text-[16px] text-[#543787]">Request the link in your message</p>
              </div>
            </div>

            {/* Values strip */}
            <div className="flex flex-wrap gap-3 mt-10">
              {['Small groups', 'Custom itineraries', 'Real connections', 'Request-based', 'All ages'].map((v, i) => (
                <span key={i} className="font-body text-[12px] tracking-wide text-[#543787] border border-[#a5b7e5] px-4 py-2 rounded-[2px]">
                  {v}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div>
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                <div className="w-16 h-16 rounded-full bg-[#543787]/10 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-[#543787]" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="font-heading text-[28px] text-[#1a1a1a] mb-3">You&apos;re on our radar.</h3>
                <p className="font-body text-[15px] text-[#1a1a1a]/60 max-w-[320px] leading-[1.7]">
                  We&apos;ll reach out within 48 hours to talk through your trip. Get ready — something good is coming.
                </p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="form-field opacity-0">
                    <label className="font-body text-[12px] font-600 tracking-[0.1em] text-[#1a1a1a]/60 uppercase block mb-2">Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                      className="w-full font-body text-[15px] text-[#1a1a1a] border border-[#1a1a1a]/30 rounded-[2px] px-4 py-3 bg-transparent focus:border-[#543787] outline-none transition-colors duration-200"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="form-field opacity-0">
                    <label className="font-body text-[12px] font-600 tracking-[0.1em] text-[#1a1a1a]/60 uppercase block mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                      className="w-full font-body text-[15px] text-[#1a1a1a] border border-[#1a1a1a]/30 rounded-[2px] px-4 py-3 bg-transparent focus:border-[#543787] outline-none transition-colors duration-200"
                      placeholder="you@email.com"
                    />
                  </div>
                </div>

                <div className="form-field opacity-0">
                  <label className="font-body text-[12px] font-600 tracking-[0.1em] text-[#1a1a1a]/60 uppercase block mb-2">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                    className="w-full font-body text-[15px] text-[#1a1a1a] border border-[#1a1a1a]/30 rounded-[2px] px-4 py-3 bg-transparent focus:border-[#543787] outline-none transition-colors duration-200"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div className="form-field opacity-0">
                  <label className="font-body text-[12px] font-600 tracking-[0.1em] text-[#1a1a1a]/60 uppercase block mb-2">I&apos;m interested in *</label>
                  <select
                    required
                    value={form.interest}
                    onChange={e => setForm(p => ({ ...p, interest: e.target.value }))}
                    className="w-full font-body text-[15px] text-[#1a1a1a] border border-[#1a1a1a]/30 rounded-[2px] px-4 py-3 bg-transparent focus:border-[#543787] outline-none transition-colors duration-200"
                  >
                    <option value="">Select an option</option>
                    <option value="upcoming">An upcoming group trip</option>
                    <option value="custom">A custom trip / itinerary</option>
                    <option value="both">Both — show me everything</option>
                    <option value="community">Just want to join the community</option>
                  </select>
                </div>

                <div className="form-field opacity-0">
                  <label className="font-body text-[12px] font-600 tracking-[0.1em] text-[#1a1a1a]/60 uppercase block mb-2">Your travel vibe</label>
                  <div className="flex flex-wrap gap-2">
                    {['Young & Wild', 'Old & Wise', 'Anywhere, anytime', 'Nature & adventure', 'Culture & history', 'Slow & luxurious'].map(v => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => setForm(p => ({ ...p, vibe: v }))}
                        className={`font-body text-[12px] font-500 px-4 py-2 rounded-[2px] border transition-all duration-200 ${
                          form.vibe === v
                            ? 'bg-[#543787] text-white border-[#543787]'
                            : 'bg-transparent text-[#1a1a1a]/70 border-[#e5e5e0] hover:border-[#543787]'
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-field opacity-0">
                  <label className="font-body text-[12px] font-600 tracking-[0.1em] text-[#1a1a1a]/60 uppercase block mb-2">Dream destination / message</label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    className="w-full font-body text-[15px] text-[#1a1a1a] border border-[#1a1a1a]/30 rounded-[2px] px-4 py-3 bg-transparent focus:border-[#543787] outline-none transition-colors duration-200 resize-none"
                    placeholder="Tell us where your soul wants to go..."
                  />
                </div>

                <div className="form-field opacity-0">
                  <button type="submit" className="btn-primary w-full py-4 text-[15px]">
                    Send My Request
                  </button>
                  <p className="font-body text-[12px] text-[#1a1a1a]/40 text-center mt-3">
                    We respond within 48 hours. No spam, ever.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
