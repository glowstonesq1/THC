'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] py-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16 mb-16">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#543787] flex items-center justify-center">
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                  <circle cx="20" cy="20" r="16" stroke="#a5b7e5" strokeWidth="1.5"/>
                  <path d="M20 8 C20 8 28 16 28 22 C28 28 24 32 20 32 C16 32 12 28 12 22 C12 16 20 8 20 8Z" fill="#a5b7e5" opacity="0.6"/>
                </svg>
              </div>
              <div>
                <span className="font-heading text-[15px] font-bold tracking-wide text-white block leading-none">
                  THE HATCHOUT
                </span>
                <span className="font-body text-[9px] font-500 tracking-[0.25em] text-[#7cb8c1] uppercase block">
                  CLUB
                </span>
              </div>
            </div>
            <p className="font-body text-[14px] text-white/50 leading-[1.8] max-w-[320px]">
              For the young & wild and the old & wise. Curating group journeys that turn strangers into a soul tribe since 2022.
            </p>
            <div className="flex gap-4 mt-8">
              {['Instagram', 'WhatsApp', 'YouTube'].map(s => (
                <a
                  key={s}
                  href="#"
                  className="font-body text-[12px] tracking-wide text-white/40 hover:text-[#a5b7e5] transition-colors duration-200 uppercase"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <p className="font-body text-[11px] tracking-[0.2em] text-white/30 uppercase mb-5">Navigate</p>
            <div className="space-y-3">
              {[
                { label: 'About', href: '#about' },
                { label: 'Upcoming Trips', href: '#trips' },
                { label: 'Past Journeys', href: '#past' },
                { label: 'Community', href: '#community' },
                { label: 'Contact', href: '#contact' },
                { label: 'Admin', href: '/admin' },
              ].map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-body text-[14px] text-white/50 hover:text-white transition-colors duration-200 block"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <p className="font-body text-[11px] tracking-[0.2em] text-white/30 uppercase mb-5">Stay in the loop</p>
            <p className="font-body text-[13px] text-white/50 leading-[1.7] mb-5">
              New trips, trip reports, and the occasional love letter from the road.
            </p>
            <div className="flex gap-0">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 font-body text-[13px] bg-white/5 border border-white/10 text-white placeholder:text-white/30 px-4 py-3 rounded-l-[2px] outline-none focus:border-[#543787] transition-colors duration-200"
              />
              <button className="bg-[#543787] text-white font-body text-[12px] font-600 px-5 py-3 rounded-r-[2px] hover:bg-[#3d2868] transition-colors duration-200 flex-shrink-0">
                →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-[12px] text-white/30">
            © 2025 The HatchOut Club. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms', 'Refund Policy'].map(t => (
              <a key={t} href="#" className="font-body text-[12px] text-white/30 hover:text-white/60 transition-colors duration-200">
                {t}
              </a>
            ))}
          </div>
          <p className="font-body text-[11px] text-white/20 italic">
            Strangers → Soul Tribe
          </p>
        </div>
      </div>
    </footer>
  );
}
