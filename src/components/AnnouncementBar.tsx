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
    <div className="relative bg-[#1C120C] border-b border-[#D4A373]/25 text-[#EDE0D4] overflow-hidden shadow-md">

      {/* Subtle espresso roast ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4A373]/10 to-transparent pointer-events-none" />

      {/* Fine warm highlight top line */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-[#D4A373]/30 pointer-events-none" />

      {/* Smooth edge fades using dark espresso base tone */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#1C120C] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#1C120C] to-transparent z-10" />

      <div className="flex animate-marquee whitespace-nowrap py-2.5 items-center font-bold">
        {[...announcements, ...announcements].map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="flex items-center shrink-0 px-8 gap-3">
              {/* Roasted Amber Icon Container */}
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#D4A373]/15 border border-[#D4A373]/40 text-[#D4A373] shrink-0 shadow-sm">
                <Icon className="w-3.5 h-3.5" />
              </span>
              
              {/* Warm Latte/Cream Text */}
              <span className="uppercase tracking-[0.18em] text-[10px] sm:text-[11px] text-[#EDE0D4]/90 font-semibold">
                {item.text}
              </span>
              
              {/* Subtle Roasted Amber Diamond Separator */}
              <span className="ml-8 w-1.5 h-1.5 rotate-45 bg-[#D4A373]/40 shrink-0" aria-hidden />
            </div>
          );
        })}
      </div>

    </div>
  );
}