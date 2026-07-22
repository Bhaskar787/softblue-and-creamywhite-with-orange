import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';

interface CategoryItem {
  name: string;
  categoryParam: string;
  subCategoryParam?: string;
  subtitle: string;
  image: string;
  objectPosition?: string; // controls crop focus, e.g. 'top', 'center 30%', '50% 20%'
  badge?: string;
  featured?: boolean;
}

const categoriesList: CategoryItem[] = [
  {
    name: 'Rudraksha & Variants',
    categoryParam: 'Rudraksha & Variants',
    subtitle: 'Authentic 1 to 14 Mukhi Beads, Malas, Siddha Malas & Bracelets',
    image: 'https://japam.in/cdn/shop/files/Gold_plated_Modern_Bracelet_and_Brown_Rudraksha_Mala_combo.jpg?v=1726560930&width=1214',
    objectPosition: 'center 20%',
    badge: 'SACRED ORIGIN',
    featured: true,
  },
  {
    name: 'Gandaki Saligram',
    categoryParam: 'Saligram',
    subtitle: 'Natural Lakshmi Narayan & Sudarshan Chakra Shilas',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    objectPosition: 'center',
    badge: 'HOLY SHILA',
  },
  {
    name: 'Shankha & Ghanti',
    categoryParam: 'Shankha & Ghanti',
    subtitle: 'Vamavarti Blowing Conch & Panchdhatu Nandi Bells',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    objectPosition: 'top',
    badge: 'SOUND PURITY',
  },
  {
    name: 'Singing Bowl',
    categoryParam: 'Singing Bowl',
    subtitle: '7 Chakra Hand-Hammered Tibetan Healing Bowls',
    image: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=600&q=80',
    objectPosition: 'center',
    badge: '432Hz HARMONY',
  },
  {
    name: 'Vedic Gemstones',
    categoryParam: 'Gemstone',
    subtitle: 'Certified Natural Yellow Sapphire, Neelam & Navratna',
    image: 'https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&w=600&q=80',
    objectPosition: 'center',
    badge: 'IGI LAB CERTIFIED',
  },
  {
    name: 'Statue & Sphatik',
    categoryParam: 'Statue & Sphatik',
    subtitle: 'Pure Quartz Crystal Shivling & Panchdhatu Idols',
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80',
    objectPosition: 'top',
    badge: 'DIVINE ENERGY',
  },
  {
    name: 'Pooja Samagri',
    categoryParam: 'Pooja Samagri',
    subtitle: 'Organic Kasturi Chandan, Gangajal & Abhishekam Kits',
    image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=600&q=80',
    objectPosition: 'center',
    badge: 'RITUAL ESSENTIALS',
  },
];

export function CategoryShowcase() {
  return (
    <section className="py-14 sm:py-20 md:py-24 bg-[#faf7f4] relative overflow-hidden border-y border-orange/15">
      {/* OM Section Divider */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 px-4 pt-0 pb-6 sm:pb-8 relative z-10">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-orange to-transparent max-w-xs opacity-60" />
        <span className="text-orange text-xl sm:text-2xl font-serif opacity-80">ॐ</span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-orange to-transparent max-w-xs opacity-60" />
      </div>

      {/* Subtle mandala background */}
      <div className="absolute inset-0 bg-mandala opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">

        {/* Section Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-14">
          <div>
            <span className="text-[10px] sm:text-xs font-heading font-bold uppercase tracking-[0.2em] text-orange bg-orange/10 border border-orange/30 px-3.5 sm:px-4 py-1.5 rounded-full inline-block mb-3 sm:mb-4">
              Sacred Categories
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display text-orange-gradient tracking-tight">
              Explore Our Sacred Spectrum
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-navy/85 font-body text-xs sm:text-sm md:text-sm max-w-md border-l-2 border-orange/30 pl-4 font-medium hidden sm:block">
              Sourced directly from Arun Valley, Muktinath Gandaki, & Nepal high-altitude shrines.
            </p>
            <Link
              href="/all-products"
              className="inline-flex items-center gap-2 px-4 py-2 bg-navy text-orange border border-orange/40 hover:bg-orange hover:text-navy-deep transition-all rounded-xl font-heading font-bold text-xs uppercase tracking-wider shrink-0 shadow-md"
            >
              <span>View All Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Categories Grid (Original Layout Restored) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">

          {categoriesList.map((cat) => (
            <Link
              key={cat.name}
              href={`/all-products?category=${encodeURIComponent(cat.categoryParam)}`}
              className={`group relative overflow-hidden rounded-2xl border border-navy/15 bg-navy-deep shadow-lg hover:border-orange hover:shadow-sacred-glow transition-all duration-500 block ${
                cat.featured ? 'sm:col-span-2 lg:col-span-2' : ''
              }`}
            >
              <div className="relative aspect-[16/9] sm:aspect-[16/10] h-full w-full overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  style={{ objectPosition: cat.objectPosition || 'center' }}
                  className="w-full h-full object-cover group-hover:scale-110  transition-transform duration-700 brightness-90 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/40 to-transparent opacity-95 group-hover:opacity-85 transition-opacity" />

                {/* Badge */}
                {cat.badge && (
                  <div className="absolute top-3 left-3 z-10">
                    <span className="inline-flex items-center gap-1 bg-navy-deep/90 border border-orange/40 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] font-heading font-bold text-orange uppercase tracking-wider shadow">
                      {cat.badge}
                    </span>
                  </div>
                )}

                {/* Card Title & Content */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-10">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <h3 className="font-display text-lg sm:text-xl md:text-2xl text-peach font-bold group-hover:text-orange transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-peach/80 text-xs sm:text-sm font-body line-clamp-1 mt-0.5">
                        {cat.subtitle}
                      </p>
                    </div>

                    <div className="w-9 h-9 rounded-full border border-orange/40 bg-navy-deep/80 text-orange flex items-center justify-center group-hover:bg-orange group-hover:text-navy-deep transition-all shrink-0">
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Inner Border Accent */}
                <div className="absolute inset-2 border border-orange/0 group-hover:border-orange/30 transition-colors duration-500 rounded-xl pointer-events-none" />
              </div>
            </Link>
          ))}

          {/* Special Catalogue CTA Tile */}
          <Link
            href="/all-products"
            className="group relative overflow-hidden rounded-2xl border border-orange/40 bg-gradient-to-br from-navy-deep via-navy to-navy-mid p-6 flex flex-col justify-between shadow-xl hover:border-orange hover:shadow-sacred-glow transition-all duration-500 min-h-[220px]"
          >
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-orange text-navy-deep">
                FULL CATALOGUE
              </span>
              <h3 className="font-display text-xl sm:text-2xl text-peach font-bold leading-tight">
                Looking for Specific Mukhi or Ritual Gift?
              </h3>
              <p className="text-peach/85 font-body text-xs sm:text-sm">
                Browse all 20+ lab-certified items with instant origin verification & price filters.
              </p>
            </div>

            <div className="pt-4 border-t border-orange/20 flex items-center justify-between">
              <span className="font-heading font-bold text-xs uppercase tracking-widest text-orange group-hover:text-orange-bright">
                Open All Products Page
              </span>
              <div className="w-8 h-8 rounded-full border border-orange bg-orange/20 text-orange flex items-center justify-center group-hover:bg-orange group-hover:text-navy-deep transition-all">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>

        </div>

      </div>
    </section>
  );
}