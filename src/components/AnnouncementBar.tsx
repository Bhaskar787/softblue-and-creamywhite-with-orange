import { useState } from 'react';
import { X, Sparkles, Leaf, ShoppingCart, Truck } from 'lucide-react';

// Map icons to the messages
const announcements = [
  { text: 'Free Vedic Consultation with every order above ₹5,000', icon: Sparkles },
  { text: 'Authentic Nepal-origin Rudraksha — Lab Certified & Energized', icon: Leaf },
  { text: 'Shravan Special: 10% off all Siddha Malas this month', icon: ShoppingCart },
  { text: 'Free Worldwide Shipping on All Mala Orders', icon: Truck },
];

export function AnnouncementBar() {
  

  return (
    <div className="relative bg-gradient-to-r from-navy-deep via-navy to-navy-deep border-b border-orange/30 text-peach overflow-hidden shadow-sm">

      {/* Subtle shine effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent pointer-events-none" />

      {/* Fine top highlight line */}
      <div className="absolute inset-x-0 top-0 h-px bg-orange/40 pointer-events-none" />

      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-navy-deep to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-navy-deep to-transparent z-10" />

      <div className="flex animate-marquee whitespace-nowrap py-2.5 items-center font-bold">
        {[...announcements, ...announcements].map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="flex items-center shrink-0 px-7 gap-2.5">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange/15 border border-orange/30 text-orange shrink-0">
                <Icon className="w-3.5 h-3.5" />
              </span>
              <span className="uppercase tracking-[0.15em] text-[11px] text-peach font-semibold">{item.text}</span>
              <span className="ml-7 w-1.5 h-1.5 rotate-45 bg-orange/40 shrink-0" aria-hidden />
            </div>
          );
        })}
      </div>

    </div>
  );
}