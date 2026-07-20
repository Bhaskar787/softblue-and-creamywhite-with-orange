import { GiSpiralArrow } from 'react-icons/gi';

const collections = [
  { name: "Rudraksha Bracelets", image: "https://japam.in/cdn/shop/files/Gold_plated_Modern_Bracelet_and_Brown_Rudraksha_Mala_combo.jpg?v=1726560930&width=1214" },
  { name: "Combination & Kawach", image: "https://japam.in/cdn/shop/files/Gold_plated_Modern_Bracelet_and_Brown_Rudraksha_Mala_combo.jpg?v=1726560930&width=1214" },
  { name: "Siddha Mala", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOOUVQKThyzQd2LGBwNdsG35nmQcAneZLKgbfkFDJjlsBBx_qX1X0_qr2O&s=10" },
  { name: "Rudraksha Mala", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOOUVQKThyzQd2LGBwNdsG35nmQcAneZLKgbfkFDJjlsBBx_qX1X0_qr2O&s=10" },
  { name: "Rudraksha Beads", image: "https://i.etsystatic.com/20350453/r/il/1c38f4/4937036824/il_570xN.4937036824_gxmx.jpg" }
];

export function SacredCollections() {
  return (
    <section className="py-14 sm:py-20 md:py-24 bg-navy relative overflow-hidden">
      {/* OM Section Divider */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 px-4 pt-0 pb-6 sm:pb-8 relative z-10">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-orange to-transparent max-w-xs opacity-60" />
        <span className="text-orange text-xl sm:text-2xl font-serif opacity-80">ॐ</span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-orange to-transparent max-w-xs opacity-60" />
      </div>

      {/* Decorative top line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange to-transparent opacity-30" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 mb-10 sm:mb-16">
          <div>
            <span className="text-[10px] sm:text-xs font-heading font-bold uppercase tracking-[0.2em] text-orange bg-orange/5 border border-orange/20 px-3.5 sm:px-4 py-1.5 rounded-full inline-block mb-4 sm:mb-6">
              ॐ Categories
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display text-orange-gradient tracking-tight">Shop by Category</h2>
          </div>
          <p className="text-peach-soft font-body text-sm sm:text-base max-w-md opacity-80 border-l border-orange/30 pl-4">
            Explore our curated selection of authentic Nepali Rudraksha, naturally formed and blessed to support your path.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
          {collections.map((item, i) => (
            <a key={i} href="#" className="group flex flex-col gap-2.5 sm:gap-3.5 md:gap-5">
              <div className="aspect-square rounded-xl sm:rounded-2xl overflow-hidden border border-orange/20 relative shadow-lg group-hover:border-orange/70 group-hover:shadow-sacred-glow group-hover:-translate-y-1.5 transition-all duration-500 ring-1 ring-inset ring-white/5">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                />

                {/* Base tint for consistent card depth */}
                <div className="absolute inset-0 bg-navy-deep/40 group-hover:bg-navy-deep/10 transition-colors duration-500" />
                <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(10,34,24,0.8)] pointer-events-none" />

                {/* Bottom scrim so the label area of the image stays readable */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-navy-deep/85 via-navy-deep/10 to-transparent pointer-events-none" />

                {/* Corner index number */}
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 w-5 h-5 sm:w-7 sm:h-7 rounded-full border border-orange/40 bg-navy-deep/60 backdrop-blur-sm flex items-center justify-center text-orange text-[8px] sm:text-[10px] font-heading font-bold tracking-wide">
                  {String(i + 1).padStart(2, '0')}
                </div>

                {/* Gold hairline that draws in on hover */}
                <div className="absolute bottom-0 left-0 h-[2px] sm:h-[3px] bg-gradient-to-r from-orange to-orange-bright w-0 group-hover:w-full transition-all duration-500 ease-out" />
              </div>
              <span className="font-heading font-semibold text-center text-[11px] sm:text-sm md:text-base text-peach group-hover:text-orange transition-colors tracking-wide">
                {item.name}
              </span>
            </a>
          ))}
          
          <a href="#" className="group flex flex-col gap-2.5 sm:gap-3.5 md:gap-5">
            <div className="aspect-square rounded-xl sm:rounded-2xl border border-orange/30 bg-navy-deep flex flex-col items-center justify-center gap-3 sm:gap-4 transition-all duration-500 group-hover:border-orange group-hover:shadow-sacred-glow group-hover:-translate-y-1.5 relative overflow-hidden ring-1 ring-inset ring-white/5">
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border border-orange/40 flex items-center justify-center text-orange group-hover:bg-orange group-hover:text-navy transition-colors relative z-10">
                <GiSpiralArrow className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="font-display text-sm sm:text-base md:text-lg text-orange group-hover:text-orange-bright transition-colors relative z-10">All Products</span>
            </div>
            <span className="font-heading font-semibold text-center text-transparent text-[11px] sm:text-sm md:text-base">View</span>
          </a>
        </div>
      </div>
    </section>
  );
}