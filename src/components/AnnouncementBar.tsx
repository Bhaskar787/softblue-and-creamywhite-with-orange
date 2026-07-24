import { Sparkles, Leaf, ShoppingCart, Truck } from 'lucide-react';

// Map icons to the announcements matching Rudrantra theme
const announcements = [
  { text: 'Free Vedic Consecration & Consultation on orders above ₹5,000', icon: Sparkles },
  { text: '100% Authentic Nepal-Origin Rudraksha — Lab Certified & Consecrated', icon: Leaf },
  { text: 'Shravan Special: 10% Off All Siddha Malas This Month', icon: ShoppingCart },
  { text: 'Free Worldwide Express Shipping on All Mala Orders', icon: Truck },
];

export function AnnouncementBar() {
  return (
    <div className="relative bg-[#07111A] border-b border-orange/30 text-peach overflow-hidden shadow-md z-[101]">

      {/* Soft Saffron-Blue Ambient Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange/15 to-transparent pointer-events-none" />

      {/* Saffron highlight top accent line */}
      <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-orange to-transparent pointer-events-none opacity-80" />

      {/* Edge gradient fade using theme deep navy tone */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-28 bg-gradient-to-r from-[#07111A] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-28 bg-gradient-to-l from-[#07111A] to-transparent z-10" />

      {/* Marquee Content */}
      <div className="flex animate-marquee whitespace-nowrap py-2.5 items-center font-bold">
        {[...announcements, ...announcements].map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="flex items-center shrink-0 px-6 sm:px-8 gap-2.5 sm:gap-3">
              {/* Saffron Orange Icon Container */}
              <span className="flex items-center justify-center w-5 sm:w-6 h-5 sm:h-6 rounded-full bg-orange/15 border border-orange/40 text-orange shrink-0 shadow-[0_0_10px_rgba(252,146,105,0.25)]">
                <Icon className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
              </span>
              
              {/* Theme Matched Text */}
              <span className="uppercase tracking-[0.18em] text-[10px] sm:text-[11px] text-peach font-semibold drop-shadow-sm">
                {item.text}
              </span>
              
              {/* Saffron Diamond Separator */}
              <span className="ml-6 sm:ml-8 w-1.5 h-1.5 rotate-45 bg-orange/60 shrink-0 shadow-[0_0_6px_rgba(252,146,105,0.5)]" aria-hidden />
            </div>
          );
        })}
      </div>

    </div>
  );
}