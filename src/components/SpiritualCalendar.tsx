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
    <section className="py-14 sm:py-20 md:py-24 lg:py-28 bg-[#faf7f4] border-t border-orange/20 overflow-hidden relative">
      {/* OM Section Divider */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 px-4 pt-0 pb-6 sm:pb-8 relative z-10">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-orange to-transparent max-w-xs opacity-60" />
        <span className="text-orange text-xl sm:text-2xl font-serif opacity-80">ॐ</span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-orange to-transparent max-w-xs opacity-60" />
      </div>

      <div className="absolute top-0 right-0 w-1/2 h-full bg-mandala opacity-[0.03] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-10 sm:mb-14 md:mb-16 max-w-3xl mx-auto">
          <span className="text-[9px] sm:text-[10px] md:text-xs font-heading font-bold uppercase tracking-widest text-orange border border-orange/30 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full inline-block mb-4 sm:mb-6 shadow-sm">
            Vedic Panchang Tradition
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display text-orange-gradient tracking-tight leading-tight mb-4 sm:mb-6 px-2">
            Auspicious Timings
          </h2>
          <p className="text-navy/65 font-body text-sm sm:text-base md:text-lg leading-relaxed px-2">
            Wearing, cleansing, or energizing your sacred beads on these high-vibration lunar configurations multiplies their spiritual alignment according to the Shastras.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          {events.map((ev, i) => {
            const IconComponent = ev.icon;
            return (
              <div 
                key={i} 
                className="bg-white border border-orange/20 rounded-2xl p-6 sm:p-7 md:p-8 transition-all duration-500 hover:border-orange/60 hover:shadow-sacred-glow group flex flex-col justify-between relative overflow-hidden"
              >
                {/* Traditional corner accent decoration */}
                <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-bl from-orange/10 to-transparent pointer-events-none rounded-bl-full" />
                
                <div>
                  {/* Category Chip Line */}
                  <div className="flex items-center justify-between mb-5 sm:mb-6">
                    <span className="text-[9px] sm:text-[10px] font-heading font-bold tracking-widest text-navy-deep uppercase bg-orange px-2.5 sm:px-3 py-1 rounded shadow-sm">
                      {ev.label}
                    </span>
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-orange/30 bg-orange/10 flex items-center justify-center text-orange group-hover:scale-110 group-hover:bg-orange group-hover:text-white transition-all duration-300">
                      <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                  </div>

                  {/* Text Details */}
                  <h3 className="font-display text-xl sm:text-2xl text-navy mb-2.5 sm:mb-3 font-semibold">
                    {ev.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-body text-navy/60 leading-relaxed">
                    {ev.desc}
                  </p>
                </div>

                {/* Bottom decorative anchor frame element */}
                <div className="mt-6 sm:mt-8 pt-3 sm:pt-4 border-t border-orange/10 flex items-center justify-between text-[10px] sm:text-xs font-heading font-bold tracking-widest uppercase text-orange/50 group-hover:text-orange transition-colors">
                  <span>View Sadhana Guide</span>
                  <span className="opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300">→</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}