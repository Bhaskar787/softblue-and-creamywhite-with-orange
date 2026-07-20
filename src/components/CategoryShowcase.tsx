export function CategoryShowcase() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-[#faf7f4] relative">
      {/* OM Section Divider */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 px-4 pt-0 pb-6 sm:pb-8">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-orange to-transparent max-w-xs opacity-60" />
        <span className="text-orange text-xl sm:text-2xl font-serif opacity-80">ॐ</span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-orange to-transparent max-w-xs opacity-60" />
      </div>

      {/* Subtle star field overlay */}
      <div className="absolute inset-0 bg-stars opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <span className="text-[10px] sm:text-xs font-heading font-bold uppercase tracking-[0.2em] text-orange border border-orange/30 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full inline-block mb-4 sm:mb-6 bg-orange/5">
            Discover
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display text-orange-gradient mb-3 sm:mb-4 px-2">
            Sacred Collections
          </h2>
          <p className="text-navy/65 font-body text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
            Authentic Nepali Rudraksha, curated for your specific spiritual intentions.
          </p>
          <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent via-orange to-transparent mx-auto mt-6 sm:mt-8 opacity-50" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:auto-rows-[300px]">

          {/* Card 1: Rudraksha Bracelets */}
          <a href="#" className="relative group md:row-span-2 overflow-hidden rounded-xl sm:rounded-2xl h-[220px] sm:h-[280px] md:h-auto block border border-orange/30">
            <img
              src="https://rudrakshashop.in/cdn/shop/files/shopping.webp?v=1765300308"
              alt="Rudraksha Bracelets"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity"></div>
            <div className="absolute bottom-5 left-5 right-5 sm:bottom-8 sm:left-8 sm:right-8">
              <h3 className="font-display text-xl sm:text-2xl md:text-3xl text-orange mb-1 sm:mb-2 group-hover:text-orange-bright transition-colors">Rudraksha Bracelets</h3>
              <p className="text-peach text-xs sm:text-sm md:text-base font-body opacity-90">Everyday protection &amp; balance</p>
            </div>
            {/* Hover inner border */}
            <div className="absolute inset-2.5 sm:inset-4 border border-orange/0 group-hover:border-orange/30 transition-colors duration-500 rounded-lg sm:rounded-xl pointer-events-none" />
          </a>

          {/* Card 2: Combination & Kawach */}
          <a href="#" className="relative group overflow-hidden rounded-xl sm:rounded-2xl h-[180px] sm:h-[240px] md:h-auto block border border-orange/30">
            <img
              src="https://m.media-amazon.com/images/I/51orjIrx2pL._AC_UF894,1000_QL80_.jpg"
              alt="Combination & Kawach"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity"></div>
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
              <h3 className="font-display text-lg sm:text-xl md:text-2xl text-orange group-hover:text-orange-bright transition-colors">Combination &amp; Kawach</h3>
            </div>
            <div className="absolute inset-2.5 sm:inset-4 border border-orange/0 group-hover:border-orange/30 transition-colors duration-500 rounded-lg sm:rounded-xl pointer-events-none" />
          </a>

          {/* Card 3: Siddha Mala (Masterpiece) */}
          <a href="#" className="relative group md:row-span-2 overflow-hidden rounded-xl sm:rounded-2xl h-[220px] sm:h-[280px] md:h-auto block border border-orange/50 shadow-sacred-glow">
            <img
              src="https://himalayarudraksh.online/cdn/shop/files/1-13-mukhi-shiv-shakti-rudraksha-mala-nepal-origin-499218.png?v=1750001216&width=3840"
              alt="Siddha Mala"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/60 to-navy-deep/10 opacity-90 group-hover:opacity-80 transition-opacity"></div>
            <div className="absolute bottom-5 left-5 right-5 sm:bottom-8 sm:left-8 sm:right-8 text-center md:text-left">
              <span className="inline-block px-2.5 sm:px-3 py-0.5 sm:py-1 bg-crimson text-white text-[10px] sm:text-xs font-heading font-bold uppercase tracking-widest rounded mb-2 sm:mb-4 shadow-lg">Masterpiece</span>
              <h3 className="font-display text-xl sm:text-2xl md:text-4xl text-orange mb-2 sm:mb-3 group-hover:text-orange-bright transition-colors text-orange-gradient">Siddha Mala</h3>
              <p className="text-peach text-xs sm:text-sm md:text-base font-body opacity-90">The divine ensemble: 1 to 14 Mukhi naturally strung.</p>
            </div>
            <div className="absolute inset-2.5 sm:inset-4 border border-orange/20 group-hover:border-orange/50 transition-colors duration-500 rounded-lg sm:rounded-xl pointer-events-none" />
          </a>

          {/* Card 4: Single Beads */}
          <a href="#" className="relative group overflow-hidden rounded-xl sm:rounded-2xl h-[180px] sm:h-[240px] md:h-auto block border border-orange/30">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEkJz5pJyZzfhXm_VJs62WVv4LjKifyYNOq0PdgJ3zTUJ0J-G-L4BFHsrR&s=10"
              alt="Single Beads"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity"></div>
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
              <h3 className="font-display text-lg sm:text-xl md:text-2xl text-orange group-hover:text-orange-bright transition-colors">Single Beads</h3>
            </div>
            <div className="absolute inset-2.5 sm:inset-4 border border-orange/0 group-hover:border-orange/30 transition-colors duration-500 rounded-lg sm:rounded-xl pointer-events-none" />
          </a>

        </div>
      </div>
    </section>
  );
}