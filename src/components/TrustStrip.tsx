import { GiLotusFlower, GiMeditation, GiMountainCave } from 'react-icons/gi';

const trustItems = [
  {
    icon: GiMeditation,
    title: "Vedic Energization",
    desc: "Blessed according to ancient Vedic scriptures."
  },
  {
    icon: GiMountainCave,
    title: "Himalayan Origin",
    desc: "Exclusively from Nepal's sacred Arun Valley."
  },
  {
    icon: GiLotusFlower,
    title: "Lab Verification",
    desc: "100% authentic, X-Ray certified for peace of mind."
  }
];

export function TrustStrip() {
  return (
    <section className="relative py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-[#0E1B26] via-[#162A3B] to-[#0E1B26] text-peach border-b border-orange/20 overflow-hidden">
      {/* Radial Glows */}
      <div className="absolute top-1/2 -left-20 w-48 sm:w-72 h-48 sm:h-72 bg-orange/15 rounded-full blur-[80px] pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 -right-20 w-48 sm:w-72 h-48 sm:h-72 bg-blue-500/15 rounded-full blur-[80px] pointer-events-none -translate-y-1/2" />

      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.16] bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: 'url("https://as1.ftcdn.net/v2/jpg/09/86/17/90/1000_F_986179075_gIxHHqtJZdtdkiOag24PniL2jUWTuXM1.jpg")' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0E1B26]/80 via-transparent to-[#0E1B26]/80 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {trustItems.map((item, i) => (
            <div 
              key={i} 
              className="relative px-4 py-3.5 sm:px-5 sm:py-4 rounded-xl border border-orange/25 bg-navy-deep/80 backdrop-blur-xl shadow-lg flex items-center gap-3.5 text-left group hover:border-orange/50 transition-all duration-300"
            >
              {/* Compact Glowing Icon */}
              <div className="relative shrink-0">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-orange/30 bg-navy-deep flex items-center justify-center text-orange shadow-md group-hover:scale-105 transition-all duration-300">
                  <item.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>

              {/* Side-by-side Typography */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-base font-display font-bold text-orange leading-tight tracking-wide">
                  {item.title}
                </h3>
                <p className="text-peach/80 font-body text-xs font-medium leading-snug truncate mt-0.5">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}