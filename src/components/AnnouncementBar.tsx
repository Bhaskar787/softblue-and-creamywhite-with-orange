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
    <div className="relative bg-[linear-gradient(90deg,#B85A1E,#E8912A,#FDD9A6,#E8912A,#B85A1E)] border-b border-[#8A4D1E]/40 text-[#2D1400] overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.25)]">

      {/* Subtle shine effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/45 via-white/5 to-transparent pointer-events-none" />

      {/* Fine top highlight line for a polished, pressed-metal edge */}
      <div className="absolute inset-x-0 top-0 h-px bg-white/60 pointer-events-none" />

      {/* Edge fades matching the orange color, slightly deeper for contrast against the marquee */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#B85A1E] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#B85A1E] to-transparent z-10" />

      <div className="flex animate-marquee whitespace-nowrap py-3 items-center font-bold">
        {[...announcements, ...announcements].map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="flex items-center shrink-0 px-7 gap-2.5">
              {/* Icon in its own badge circle — reads like a premium promo chip
                  rather than a loose icon floating next to text */}
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#2D1400]/10 border border-[#2D1400]/15 shrink-0">
                <Icon className="w-3.5 h-3.5" />
              </span>
              <span className="uppercase tracking-[0.15em] text-[11px]">{item.text}</span>
              {/* Diamond divider between messages, ad-strip style */}
              <span className="ml-7 w-1.5 h-1.5 rotate-45 bg-[#2D1400]/25 shrink-0" aria-hidden />
            </div>
          );
        })}
      </div>

   
    </div>
  );
}