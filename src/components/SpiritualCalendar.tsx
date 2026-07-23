import { GiMoon, GiSun, GiStarSattelites, GiSparkles } from 'react-icons/gi';

const events = [
  { name: "Mondays (Somavara)", desc: "Most auspicious weekly day for Shiva beads", label: "Weekly Ritual", icon: GiSun },
  { name: "Ekadashi", desc: "11th lunar day, ideal for spiritual malas", label: "Fortnightly", icon: GiMoon },
  { name: "Pradosh Tithi", desc: "Twice monthly 13th lunar day, powerful for Shiva worship", label: "Twilight Muhurta", icon: GiStarSattelites },
  { name: "Purnima", desc: "Full Moon night, perfect to cleanse and energize new Rudraksha", label: "Lunar Peak", icon: GiMoon },
  { name: "Maha Shivaratri", desc: "The grand sacred night of Shiva, offering maximum energetic potency", label: "Annual Peak", icon: GiSparkles },
  { name: "Navratri", desc: "Nine auspicious nights for activating protective Shakti malas", label: "Seasonal", icon: GiSun },
];

export function SpiritualCalendar() {
  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-[#FAF7F2] border-b border-[hsl(17.14deg_96.08%_70%)]/20 overflow-hidden relative">
      {/* OM Section Divider */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 px-4 pt-0 pb-6 sm:pb-8 relative z-10">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[hsl(17.14deg_96.08%_70%)] to-transparent max-w-xs" />
        <span className="text-[hsl(17.14deg_96.08%_70%)] text-xl sm:text-2xl font-serif font-bold">ॐ</span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[hsl(17.14deg_96.08%_70%)] to-transparent max-w-xs" />
      </div>

      <div className="absolute top-0 right-0 w-1/2 h-full bg-mandala opacity-[0.03] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header Section */}
        <div className="text-center mb-10 sm:mb-14 md:mb-16 max-w-3xl mx-auto">
          <span className="text-[10px] sm:text-[11px] md:text-xs font-heading font-bold uppercase tracking-widest text-[#1E293B] bg-[hsl(17.14deg_96.08%_70%)] border border-[hsl(17.14deg_96.08%_70%)]/50 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full inline-block mb-4 sm:mb-6 shadow-sm">
            Vedic Panchang Tradition
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display text-[#1E293B] font-bold tracking-tight leading-tight mb-4 sm:mb-6 px-2">
            Auspicious Timings
          </h2>
          <p className="text-[#334155] font-body text-base sm:text-lg leading-relaxed px-2 font-medium">
            Wearing, cleansing, or energizing your sacred beads on these high-vibration lunar configurations multiplies their spiritual alignment according to the Shastras.
          </p>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          {events.map((ev, i) => {
            const IconComponent = ev.icon;
            return (
              <div 
                key={i} 
                className="bg-white border border-[#E2D9CC] rounded-2xl p-6 sm:p-7 md:p-8 transition-all duration-300 hover:border-[hsl(17.14deg_96.08%_70%)] hover:shadow-xl group flex flex-col justify-between relative overflow-hidden"
              >
                {/* Corner accent decoration */}
                <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-bl from-[hsl(17.14deg_96.08%_70%)]/20 to-transparent pointer-events-none rounded-bl-full" />
                
                <div>
                  {/* Category Badge & Icon */}
                  <div className="flex items-center justify-between mb-5 sm:mb-6">
                    <span className="text-[10px] sm:text-[11px] font-heading font-bold tracking-widest text-[#0F172A] uppercase bg-[hsl(17.14deg_96.08%_70%)] px-3 py-1 rounded shadow-sm">
                      {ev.label}
                    </span>
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[hsl(17.14deg_96.08%_70%)]/50 bg-[hsl(17.14deg_96.08%_70%)]/15 flex items-center justify-center text-[#1E293B] group-hover:scale-110 group-hover:bg-[hsl(17.14deg_96.08%_70%)] transition-all duration-300 shadow-sm">
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Text Details */}
                  <h3 className="font-display text-xl sm:text-2xl text-[#0F172A] mb-2.5 sm:mb-3 font-bold">
                    {ev.name}
                  </h3>
                  <p className="text-sm font-body text-[#475569] font-medium leading-relaxed">
                    {ev.desc}
                  </p>
                </div>

                {/* Bottom Interactive Anchor */}
                <div className="mt-6 sm:mt-8 pt-4 border-t border-[#F1F5F9] flex items-center justify-between text-xs font-heading font-bold tracking-widest uppercase text-[hsl(17.14deg_96.08%_70%)] group-hover:text-[#9A3412] transition-colors">
                  <span>View Sadhana Guide</span>
                  <span className="transform -translate-x-1 group-hover:translate-x-1 transition-transform duration-300">→</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}