import { GiLotusFlower, GiMeditation, GiMountainCave } from 'react-icons/gi';

const trustItems = [
  {
    icon: GiMeditation,
    title: "Vedic Energization",
    desc: "Every bead is blessed according to ancient Vedic scriptures."
  },
  {
    icon: GiMountainCave,
    title: "Himalayan Origin",
    desc: "Hand-selected exclusively from Nepal's sacred Arun Valley."
  },
  {
    icon: GiLotusFlower,
    title: "Lab Verification",
    desc: "100% authentic, X-Ray certified for total peace of mind."
  }
];

export function TrustStrip() {
  return (
    <section className="relative py-14 sm:py-20 md:py-24 border-y border-orange/20 bg-gradient-to-b from-[#0E1B26] via-[#162A3B] to-[#0E1B26] text-peach overflow-hidden">
      {/* Soft Blue & Orange Radial Glow Backgrounds (Matching NewLaunchesBanner pattern) */}
      <div className="absolute top-1/4 -left-40 w-72 sm:w-[500px] h-72 sm:h-[500px] bg-orange/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-72 sm:w-[500px] h-72 sm:h-[500px] bg-blue-500/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Background Image Overlay with balanced opacity */}
      <div 
        className="absolute inset-0 opacity-[0.16] bg-cover bg-center"
        style={{ backgroundImage: 'url("https://as1.ftcdn.net/v2/jpg/09/86/17/90/1000_F_986179075_gIxHHqtJZdtdkiOag24PniL2jUWTuXM1.jpg")' }}
      />
      
      {/* Gradient Overlay for Depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0E1B26]/85 via-transparent to-[#0E1B26]/85 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {trustItems.map((item, i) => (
            <div 
              key={i} 
              className="relative p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border-2 border-orange/20 bg-navy-deep/80 backdrop-blur-xl shadow-xl flex flex-col items-center text-center group hover:bg-navy-deep hover:border-orange/50 transition-all duration-500"
            >
              {/* Glowing Icon Wrapper */}
              <div className="relative mb-4 sm:mb-6">
                <div className="absolute inset-0 bg-orange rounded-full blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full border border-orange/30 bg-navy-deep flex items-center justify-center text-orange shadow-lg group-hover:scale-105 transition-all duration-500">
                  <item.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                </div>
              </div>
              
              {/* Typography */}
              <h3 className="text-base sm:text-lg md:text-xl font-display font-bold text-orange mb-2 sm:mb-3 tracking-wide">
                {item.title}
              </h3>
              <p className="text-peach/90 font-body text-xs sm:text-sm font-medium leading-relaxed max-w-[220px]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}