'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { getTrips, saveTrips, Trip, TripStatus } from '@/lib/trips-data';
import Link from 'next/link';

function EditTripModal({ trip, onSave, onClose }: {
  trip: Trip;
  onSave: (updated: Trip) => void;
  onClose: () => void;
}) {
  const [data, setData] = useState<Trip>({ ...trip });
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(modalRef.current,
      { opacity: 0, y: 20, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'power2.out' }
    );
  }, []);

  const handleClose = () => {
    gsap.to(modalRef.current, {
      opacity: 0, y: 10, scale: 0.97, duration: 0.25, ease: 'power2.in',
      onComplete: onClose,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-6" onClick={handleClose}>
      <div
        ref={modalRef}
        className="bg-white w-full max-w-[680px] rounded-[2px] p-8 max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-heading text-[26px] text-[#1a1a1a]">{data.title}</h2>
          <button onClick={handleClose} className="text-[#1a1a1a]/40 hover:text-[#1a1a1a] transition-colors text-[20px]">✕</button>
        </div>

        <div className="space-y-6">
          {/* Spot controls — primary */}
          <div className="bg-[#543787]/5 border border-[#543787]/20 rounded-[2px] p-6">
            <p className="font-body text-[11px] tracking-[0.2em] text-[#543787] uppercase font-600 mb-4">
              Spot Management
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="font-body text-[12px] font-600 text-[#1a1a1a]/60 block mb-2">Total Spots</label>
                <input
                  type="number"
                  min="1"
                  value={data.spotsTotal}
                  onChange={e => setData(p => ({ ...p, spotsTotal: +e.target.value }))}
                  className="w-full font-body text-[16px] font-600 text-[#543787] border border-[#1a1a1a]/20 rounded-[2px] px-3 py-2 focus:border-[#543787] outline-none"
                />
              </div>
              <div>
                <label className="font-body text-[12px] font-600 text-[#1a1a1a]/60 block mb-2">Spots Available</label>
                <input
                  type="number"
                  min="0"
                  max={data.spotsTotal}
                  value={data.spotsAvailable}
                  onChange={e => setData(p => ({ ...p, spotsAvailable: Math.min(+e.target.value, p.spotsTotal) }))}
                  className="w-full font-body text-[16px] font-600 text-[#543787] border border-[#1a1a1a]/20 rounded-[2px] px-3 py-2 focus:border-[#543787] outline-none"
                />
              </div>
              <div>
                <label className="font-body text-[12px] font-600 text-[#1a1a1a]/60 block mb-2">Min Required</label>
                <input
                  type="number"
                  min="1"
                  value={data.spotsRequired}
                  onChange={e => setData(p => ({ ...p, spotsRequired: +e.target.value }))}
                  className="w-full font-body text-[16px] font-600 text-[#543787] border border-[#1a1a1a]/20 rounded-[2px] px-3 py-2 focus:border-[#543787] outline-none"
                />
              </div>
            </div>
            <div className="mt-4">
              <div className="h-[4px] bg-[#e5e5e0] rounded-full">
                <div
                  className="h-full bg-[#543787] rounded-full transition-all duration-300"
                  style={{ width: `${((data.spotsTotal - data.spotsAvailable) / data.spotsTotal) * 100}%` }}
                />
              </div>
              <p className="font-body text-[12px] text-[#1a1a1a]/40 mt-2">
                {data.spotsTotal - data.spotsAvailable} filled / {data.spotsAvailable} remaining / {data.spotsRequired} minimum needed
              </p>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="font-body text-[12px] font-600 text-[#1a1a1a]/60 tracking-[0.1em] uppercase block mb-2">Trip Status</label>
            <select
              value={data.status}
              onChange={e => setData(p => ({ ...p, status: e.target.value as TripStatus }))}
              className="w-full font-body text-[15px] text-[#1a1a1a] border border-[#1a1a1a]/20 rounded-[2px] px-4 py-3 focus:border-[#543787] outline-none"
            >
              <option value="open">Open</option>
              <option value="upcoming">Upcoming (filling up)</option>
              <option value="full">Sold Out</option>
              <option value="past">Past Trip</option>
            </select>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-body text-[12px] font-600 text-[#1a1a1a]/60 tracking-[0.1em] uppercase block mb-2">Price</label>
              <input
                type="text"
                value={data.price}
                onChange={e => setData(p => ({ ...p, price: e.target.value }))}
                className="w-full font-body text-[15px] text-[#1a1a1a] border border-[#1a1a1a]/20 rounded-[2px] px-4 py-3 focus:border-[#543787] outline-none"
                placeholder="₹1,20,000"
              />
            </div>
            <div>
              <label className="font-body text-[12px] font-600 text-[#1a1a1a]/60 tracking-[0.1em] uppercase block mb-2">Dates</label>
              <input
                type="text"
                value={data.dates}
                onChange={e => setData(p => ({ ...p, dates: e.target.value }))}
                className="w-full font-body text-[15px] text-[#1a1a1a] border border-[#1a1a1a]/20 rounded-[2px] px-4 py-3 focus:border-[#543787] outline-none"
                placeholder="Sep 12–22, 2025"
              />
            </div>
          </div>

          {/* Tagline */}
          <div>
            <label className="font-body text-[12px] font-600 text-[#1a1a1a]/60 tracking-[0.1em] uppercase block mb-2">Tagline</label>
            <input
              type="text"
              value={data.tagline}
              onChange={e => setData(p => ({ ...p, tagline: e.target.value }))}
              className="w-full font-body text-[15px] text-[#1a1a1a] border border-[#1a1a1a]/20 rounded-[2px] px-4 py-3 focus:border-[#543787] outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="font-body text-[12px] font-600 text-[#1a1a1a]/60 tracking-[0.1em] uppercase block mb-2">Description</label>
            <textarea
              rows={3}
              value={data.description}
              onChange={e => setData(p => ({ ...p, description: e.target.value }))}
              className="w-full font-body text-[15px] text-[#1a1a1a] border border-[#1a1a1a]/20 rounded-[2px] px-4 py-3 focus:border-[#543787] outline-none resize-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="font-body text-[12px] font-600 text-[#1a1a1a]/60 tracking-[0.1em] uppercase block mb-2">Category</label>
            <div className="flex gap-3">
              {(['young-wild', 'old-wise', 'all'] as const).map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setData(p => ({ ...p, category: c }))}
                  className={`font-body text-[13px] px-5 py-2.5 rounded-[2px] border transition-all ${
                    data.category === c
                      ? 'bg-[#543787] text-white border-[#543787]'
                      : 'bg-transparent text-[#1a1a1a] border-[#e5e5e0]'
                  }`}
                >
                  {c === 'young-wild' ? 'Young & Wild' : c === 'old-wise' ? 'Old & Wise' : 'All Ages'}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-8 pt-6 border-t border-[#e5e5e0]">
          <button
            onClick={() => onSave(data)}
            className="btn-primary flex-1 py-3"
          >
            Save Changes
          </button>
          <button
            onClick={handleClose}
            className="btn-outline flex-1 py-3"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null);
  const [saved, setSaved] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    setTrips(getTrips());
  }, []);

  const handleSave = (updated: Trip) => {
    const newTrips = trips.map(t => t.id === updated.id ? updated : t);
    setTrips(newTrips);
    saveTrips(newTrips);
    setEditingTrip(null);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#f6f6ea] flex items-center justify-center p-6">
        <div className="bg-white border border-[#e5e5e0] rounded-[2px] p-10 w-full max-w-[400px]">
          <div className="mb-8">
            <h1 className="font-heading text-[28px] text-[#1a1a1a] mb-2">Admin Access</h1>
            <p className="font-body text-[14px] text-[#1a1a1a]/50">Enter your password to manage trips</p>
          </div>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full font-body text-[15px] border border-[#1a1a1a]/20 rounded-[2px] px-4 py-3 mb-4 focus:border-[#543787] outline-none"
            onKeyDown={e => {
              if (e.key === 'Enter' && password === 'thc2025admin') setAuthed(true);
            }}
          />
          <button
            onClick={() => { if (password === 'thc2025admin') setAuthed(true); }}
            className="btn-primary w-full py-3"
          >
            Access Dashboard
          </button>
          <p className="font-body text-[11px] text-[#1a1a1a]/30 text-center mt-4">
            Default password: thc2025admin
          </p>
        </div>
      </div>
    );
  }

  const upcomingTrips = trips.filter(t => t.status !== 'past');
  const pastTrips = trips.filter(t => t.status === 'past');

  return (
    <div className="min-h-screen bg-[#f6f6ea]">
      {editingTrip && (
        <EditTripModal
          trip={editingTrip}
          onSave={handleSave}
          onClose={() => setEditingTrip(null)}
        />
      )}

      {/* Header */}
      <header className="bg-white border-b border-[#e5e5e0] px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-body text-[13px] text-[#543787] hover:underline">← Back to Site</Link>
          <span className="text-[#e5e5e0]">/</span>
          <h1 className="font-heading text-[22px] text-[#1a1a1a]">THC Admin Dashboard</h1>
        </div>
        {saved && (
          <div className="flex items-center gap-2 bg-green-50 text-green-700 font-body text-[13px] px-4 py-2 rounded-[2px] border border-green-200">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Changes saved
          </div>
        )}
      </header>

      <div className="max-w-[1200px] mx-auto px-8 py-12">

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Total Trips', value: trips.length },
            { label: 'Upcoming', value: upcomingTrips.length },
            { label: 'Total Spots Listed', value: upcomingTrips.reduce((a, t) => a + t.spotsTotal, 0) },
            { label: 'Spots Available', value: upcomingTrips.reduce((a, t) => a + t.spotsAvailable, 0) },
          ].map((s, i) => (
            <div key={i} className="bg-white border border-[#e5e5e0] rounded-[2px] p-6">
              <div className="font-heading text-[32px] text-[#543787]">{s.value}</div>
              <div className="font-body text-[12px] text-[#1a1a1a]/50 tracking-wide uppercase mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Upcoming trips */}
        <div className="mb-12">
          <h2 className="font-heading text-[22px] text-[#1a1a1a] mb-6">Upcoming & Active Trips</h2>
          <div className="space-y-3">
            {upcomingTrips.map(trip => (
              <div
                key={trip.id}
                className="bg-white border border-[#e5e5e0] rounded-[2px] px-6 py-5 flex items-center gap-6"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-heading text-[18px] text-[#1a1a1a] truncate">{trip.title}</h3>
                    <span className={`font-body text-[11px] font-600 tracking-wide px-3 py-0.5 rounded-[2px] ${
                      trip.status === 'open' ? 'bg-[#a5b7e5]/20 text-[#543787]' :
                      trip.status === 'upcoming' ? 'bg-[#7cb8c1]/20 text-[#4a9ca7]' :
                      'bg-[#ff865b]/20 text-[#d45a2a]'
                    }`}>
                      {trip.status}
                    </span>
                  </div>
                  <p className="font-body text-[13px] text-[#1a1a1a]/40">{trip.destination} · {trip.dates}</p>
                </div>

                {/* Spot display */}
                <div className="flex items-center gap-8 flex-shrink-0">
                  <div className="text-center">
                    <div className="font-heading text-[20px] text-[#1a1a1a]">{trip.spotsAvailable}</div>
                    <div className="font-body text-[10px] text-[#1a1a1a]/40 uppercase">Available</div>
                  </div>
                  <div className="text-center">
                    <div className="font-heading text-[20px] text-[#543787]">{trip.spotsTotal}</div>
                    <div className="font-body text-[10px] text-[#1a1a1a]/40 uppercase">Total</div>
                  </div>
                  <div className="text-center">
                    <div className="font-heading text-[20px] text-[#feb737]">{trip.spotsRequired}</div>
                    <div className="font-body text-[10px] text-[#1a1a1a]/40 uppercase">Required</div>
                  </div>

                  {/* Spot bar */}
                  <div className="w-24">
                    <div className="h-[3px] bg-[#e5e5e0] rounded-full">
                      <div
                        className="h-full bg-[#543787] rounded-full"
                        style={{ width: `${((trip.spotsTotal - trip.spotsAvailable) / trip.spotsTotal) * 100}%` }}
                      />
                    </div>
                    <p className="font-body text-[10px] text-[#1a1a1a]/30 mt-1 text-center">
                      {Math.round(((trip.spotsTotal - trip.spotsAvailable) / trip.spotsTotal) * 100)}% filled
                    </p>
                  </div>

                  <button
                    onClick={() => setEditingTrip(trip)}
                    className="btn-outline text-[13px] py-2.5 px-5 flex-shrink-0"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Past trips */}
        <div>
          <h2 className="font-heading text-[22px] text-[#1a1a1a] mb-6">Past Trips</h2>
          <div className="space-y-3">
            {pastTrips.map(trip => (
              <div
                key={trip.id}
                className="bg-white border border-[#e5e5e0] rounded-[2px] px-6 py-5 flex items-center gap-6 opacity-70"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading text-[18px] text-[#1a1a1a] truncate">{trip.title}</h3>
                  <p className="font-body text-[13px] text-[#1a1a1a]/40">{trip.destination} · {trip.dates}</p>
                </div>
                <button
                  onClick={() => setEditingTrip(trip)}
                  className="btn-ghost text-[13px] flex-shrink-0"
                >
                  Edit Details →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Add new trip */}
        <div className="mt-16 border-t border-[#e5e5e0] pt-10">
          <h2 className="font-heading text-[22px] text-[#1a1a1a] mb-2">Add New Trip</h2>
          <p className="font-body text-[14px] text-[#1a1a1a]/50 mb-6">
            Edit <code className="bg-[#f6f6ea] px-2 py-0.5 rounded text-[#543787]">src/lib/trips-data.ts</code> to add new trips to the defaultTrips array, then they'll appear here.
          </p>
          <div className="bg-[#f6f6ea] border border-[#e5e5e0] rounded-[2px] p-5">
            <p className="font-body text-[13px] text-[#1a1a1a]/60 leading-[1.7]">
              💡 <strong>Tip:</strong> After adding a trip in the data file, the admin panel and main website will automatically reflect it. Use this panel to update spot counts and status as bookings come in.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
