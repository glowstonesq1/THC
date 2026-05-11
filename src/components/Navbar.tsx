'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(navRef.current,
      { yPercent: -100, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
    );
  }, []);

  useEffect(() => {
    const menu = mobileMenuRef.current;
    if (!menu) return;
    if (menuOpen) {
      gsap.fromTo(menu,
        { xPercent: 100 },
        { xPercent: 0, duration: 0.6, ease: 'power3.inOut' }
      );
      gsap.fromTo(menu.querySelectorAll('.mobile-link'),
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out', delay: 0.2 }
      );
    } else {
      gsap.to(menu, { xPercent: 100, duration: 0.5, ease: 'power3.inOut' });
    }
  }, [menuOpen]);

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#trips', label: 'Trips' },
    { href: '#past', label: 'Past Journeys' },
    { href: '#community', label: 'Community' },
    { href: '#contact', label: 'Join Us' },
  ];

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'nav-blur bg-[#f6f6ea]/90 border-b border-[#e5e5e0]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between h-18 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-[#543787] flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                <circle cx="20" cy="20" r="16" stroke="#a5b7e5" strokeWidth="1.5"/>
                <path d="M20 8 C20 8 28 16 28 22 C28 28 24 32 20 32 C16 32 12 28 12 22 C12 16 20 8 20 8Z" fill="#a5b7e5" opacity="0.6"/>
                <path d="M10 20 Q15 17 20 20 Q25 23 30 20" stroke="white" strokeWidth="1" fill="none"/>
              </svg>
            </div>
            <div>
              <span className="font-heading text-[15px] font-bold tracking-wide text-[#543787] block leading-none">
                THE HATCHOUT
              </span>
              <span className="font-body text-[9px] font-500 tracking-[0.25em] text-[#7cb8c1] uppercase block">
                CLUB
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-[14px] font-500 text-[#1a1a1a] px-4 py-2 hover:text-[#543787] transition-colors duration-200 tracking-wide"
              >
                {link.label}
              </Link>
            ))}
            <Link href="#contact" className="btn-primary ml-4 text-[13px] py-[10px] px-6">
              Request a Trip
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-10 h-10 flex flex-col justify-center items-center gap-[5px] z-50"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block h-[1.5px] bg-[#543787] transition-all duration-300 ${menuOpen ? 'w-6 rotate-45 translate-y-[6.5px]' : 'w-6'}`} />
            <span className={`block h-[1.5px] bg-[#543787] transition-all duration-300 ${menuOpen ? 'opacity-0 w-0' : 'w-4'}`} />
            <span className={`block h-[1.5px] bg-[#543787] transition-all duration-300 ${menuOpen ? 'w-6 -rotate-45 -translate-y-[6.5px]' : 'w-6'}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 z-40 bg-[#543787] flex flex-col justify-center px-10 translate-x-full md:hidden"
      >
        <div className="mb-12">
          <span className="font-heading text-[11px] tracking-[0.3em] text-[#a5b7e5] uppercase">
            The HatchOut Club
          </span>
        </div>
        <nav className="flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="mobile-link font-heading text-[32px] font-400 text-white hover:text-[#feb737] transition-colors duration-200"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-12">
          <Link
            href="#contact"
            className="btn-primary inline-block bg-[#feb737] border-[#feb737] text-[#543787] font-bold"
            onClick={() => setMenuOpen(false)}
          >
            Request a Trip
          </Link>
        </div>
      </div>
    </>
  );
}
