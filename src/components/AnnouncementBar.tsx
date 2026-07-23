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
    <div className="relative bg-[hsl(17.55_96.08%_70%)] border-b border-black/10 text-[#1a0802] overflow-hidden shadow-sm">

      {/* Subtle top shine overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-transparent to-black/10 pointer-events-none" />

      {/* Fine top highlight line */}
      <div className="absolute inset-x-0 top-0 h-px bg-white/40 pointer-events-none" />

      {/* Edge fades matching exact HSL base */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[hsl(17.55_96.08%_70%)] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[hsl(17.55_96.08%_70%)] to-transparent z-10" />

      <div className="flex animate-marquee whitespace-nowrap py-2.5 items-center font-bold">
        {[...announcements, ...announcements].map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="flex items-center shrink-0 px-7 gap-2.5">
              {/* Icon Container */}
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black/10 border border-black/15 text-[#1a0802] shrink-0 shadow-sm">
                <Icon className="w-3.5 h-3.5" />
              </span>
              
              {/* Main Text */}
              <span className="uppercase tracking-[0.15em] text-[11px] text-[#1a0802] font-bold drop-shadow-[0_1px_0_rgba(255,255,255,0.3)]">
                {item.text}
              </span>
              
              {/* Decorative Diamond Separator */}
              <span className="ml-7 w-1.5 h-1.5 rotate-45 bg-black/25 shrink-0" aria-hidden />
            </div>
          );
        })}
      </div>

    </div>
  );
}