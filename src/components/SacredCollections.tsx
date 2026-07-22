import { useState, useEffect, useCallback } from 'react';
import { GiSpiralArrow } from 'react-icons/gi';
import { Sparkles, ArrowRight, Star, ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';

interface NewLaunchItem {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  badge: string;
}

const newLaunches: NewLaunchItem[] = [
  {
    id: 'sacred-launch-1',
    name: '14 Mukhi Divine Siddha Kavach',
    subtitle: 'Handcrafted with rare Lord Hanuman energized beads for ultimate protection and courage.',
    price: 3499,
    originalPrice: 4999,
    rating: 4.9,
    reviews: 84,
    image: 'https://japam.in/cdn/shop/files/Gold_plated_Modern_Bracelet_and_Brown_Rudraksha_Mala_combo.jpg?v=1726560930&width=1214',
    badge: 'NEW LAUNCH',
  },
  {
    id: 'sacred-launch-2',
    name: 'Rare Pashupati Single Mukhi Locket',
    subtitle: 'Natural cashew-shaped bead encased in 925 sterling silver locket with GIA lab certificate.',
    price: 24500,
    originalPrice: 29990,
    rating: 5.0,
    reviews: 36,
    image: 'https://images.unsplash.com/photo-1685419367862-1dd40253bf2b?auto=format&fit=crop&w=800&q=80&crop=focalpoint&fp-x=0.5&fp-y=0.3',
    badge: 'LIMITED EDITION',
  },
  {
    id: 'sacred-launch-3',
    name: 'Ekadash 11 Mukhi Japa Mala (108 Beads)',
    subtitle: 'Blessed in Pashupatinath Abhishekam. Aids fearlessness, focus, and meditation.',
    price: 8990,
    originalPrice: 11500,
    rating: 4.9,
    reviews: 52,
    image: 'https://himalayarudraksh.online/cdn/shop/files/1-13-mukhi-shiv-shakti-rudraksha-mala-nepal-origin-499218.png?v=1750001216&width=3840',
    badge: 'FRESH ARRIVAL',
  },
];

import { Link } from 'wouter';

const collections = [
  { name: 'Rudraksha Bracelets', subcategory: 'Rudraksha Bracelet', image: 'https://japam.in/cdn/shop/files/Gold_plated_Modern_Bracelet_and_Brown_Rudraksha_Mala_combo.jpg?v=1726560930&width=1214' },
  { name: 'Combination & Kawach', subcategory: 'Combination & Kawach', image: 'https://images.unsplash.com/photo-1685419367862-1dd40253bf2b?auto=format&fit=crop&w=600&q=80' },
  { name: 'Siddha Mala', subcategory: 'Siddha Mala', image: 'https://images.unsplash.com/photo-1650809652935-2e5002ba40bf?auto=format&fit=crop&w=600&q=80' },
  { name: 'Rudraksha Mala', subcategory: 'Rudraksha Mala', image: 'https://himalayarudraksh.online/cdn/shop/files/1-13-mukhi-shiv-shakti-rudraksha-mala-nepal-origin-499218.png?v=1750001216&width=3840' },
  { name: 'Rudraksha Beads', subcategory: 'Rudraksha Beads', image: 'https://i.etsystatic.com/20350453/r/il/1c38f4/4937036824/il_570xN.4937036824_gxmx.jpg' },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0,
    scale: 0.97,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 50 : -50,
    opacity: 0,
    scale: 0.97,
  }),
};

export function SacredCollections() {
  const { addToCart } = useCart();
  const [[current, direction], setPage] = useState([0, 0]);
  const [isHovering, setIsHovering] = useState(false);

  const nextSlide = useCallback(() => {
    setPage(([prev]) => [(prev + 1) % newLaunches.length, 1]);
  }, []);

  const prevSlide = useCallback(() => {
    setPage(([prev]) => [(prev - 1 + newLaunches.length) % newLaunches.length, -1]);
  }, []);

  useEffect(() => {
    if (isHovering) return;
    const timer = setInterval(nextSlide, 3000);
    return () => clearInterval(timer);
  }, [isHovering, nextSlide]);

  const activeProduct = newLaunches[current];

  return (
    <section className="py-14 sm:py-20 md:py-24 bg-navy relative overflow-hidden border-y border-orange/20">
      {/* Decorative Top OM Section Divider */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 px-4 pt-0 pb-6 sm:pb-8 relative z-10">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-orange to-transparent max-w-xs opacity-60" />
        <span className="text-orange text-xl sm:text-2xl font-serif opacity-80">ॐ</span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-orange to-transparent max-w-xs opacity-60" />
      </div>

      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange to-transparent opacity-30" />

      {/* Container aligned with Navbar max-w-7xl */}
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-8 relative z-10">
        
        {/* Header Title Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <span className="text-[10px] sm:text-xs font-heading font-bold uppercase tracking-[0.2em] text-orange bg-orange/10 border border-orange/30 px-3.5 sm:px-4 py-1.5 rounded-full inline-block mb-3 sm:mb-4">
              ॐ Sacred Selections
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display text-peach tracking-tight font-normal">
              Explore Collections & New Arrivals
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-peach/85 font-body text-xs sm:text-sm md:text-sm max-w-md border-l-2 border-orange/30 pl-4 leading-relaxed font-medium">
              Hand-picked, lab-certified authentic Nepali Rudraksha items, energized for divine harmony.
            </p>
            <Link
              href="/all-products"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-orange text-navy-deep hover:bg-orange-bright transition-all rounded-xl font-heading font-bold text-xs uppercase tracking-wider shrink-0 shadow-lg"
            >
              <span>All Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* NEW LAUNCH ANIMATED SLIDER SHOWCASE (5 Columns) */}
          <div
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="order-1 lg:order-1 lg:col-span-5 relative h-full flex flex-col"
          >
            <div className="h-full min-h-[440px] sm:min-h-[460px] rounded-2xl sm:rounded-3xl border border-orange/35 bg-gradient-to-b from-navy-deep via-navy to-navy-deep p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl">
              
              {/* Background Glow & Watermark */}
              <div className="absolute -top-12 -left-12 w-48 h-48 bg-orange/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(#ff9900_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

              {/* Top Control Bar: Launch Badge, Rating, Arrows */}
              <div className="flex items-center justify-between relative z-20 mb-3 sm:mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider bg-orange text-navy-deep shadow-md animate-pulse">
                  <Sparkles className="w-3.5 h-3.5 fill-navy-deep" />
                  {activeProduct.badge}
                </span>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-navy-deep/90 border border-orange/30 px-2.5 py-1 rounded-full text-xs text-orange">
                    <Star className="w-3.5 h-3.5 fill-orange" />
                    <span className="font-bold text-peach">{activeProduct.rating}</span>
                    <span className="text-peach/60 text-[10px]">({activeProduct.reviews})</span>
                  </div>

                  {/* Manual Arrow Controls */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={prevSlide}
                      aria-label="Previous launch product"
                      className="w-7 h-7 rounded-full border border-orange/30 bg-navy-deep text-orange hover:bg-orange hover:text-navy-deep transition-all flex items-center justify-center cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={nextSlide}
                      aria-label="Next launch product"
                      className="w-7 h-7 rounded-full border border-orange/30 bg-navy-deep text-orange hover:bg-orange hover:text-navy-deep transition-all flex items-center justify-center cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Slide Content Area with 3-Second Framer Motion Animation */}
              <div className="relative flex-1 flex flex-col justify-between overflow-hidden">
                <AnimatePresence custom={direction} mode="wait">
                  <motion.div
                    key={activeProduct.id}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col justify-between h-full"
                  >
                    {/* Featured Image Frame */}
                    <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/8.5] w-full rounded-xl overflow-hidden border border-orange/30 shadow-xl bg-navy mb-3 sm:mb-4 group">
                      <img
                        src={activeProduct.image}
                        alt={activeProduct.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-transparent to-transparent opacity-85 pointer-events-none" />

                      {/* Floating Price Tag */}
                      <div className="absolute bottom-2.5 left-2.5 bg-navy-deep/90 border border-orange/40 backdrop-blur-md px-2.5 py-1.5 rounded-lg text-xs flex items-baseline gap-2">
                        <span className="text-peach/50 line-through text-[11px]">
                          {formatPrice(activeProduct.originalPrice)}
                        </span>
                        <span className="text-orange font-bold text-sm sm:text-base">
                          {formatPrice(activeProduct.price)}
                        </span>
                      </div>
                    </div>

                    {/* Product Name & Subtitle */}
                    <div className="space-y-1">
                      <h3 className="font-display text-base sm:text-lg md:text-xl text-peach font-bold leading-snug">
                        {activeProduct.name}
                      </h3>
                      <p className="text-xs sm:text-sm font-body text-peach/85 line-clamp-2 leading-relaxed font-medium">
                        {activeProduct.subtitle}
                      </p>
                    </div>

                    {/* CTA Button */}
                    <div className="pt-3 border-t border-orange/20 mt-3 flex items-center gap-2">
                      <button
                        onClick={() => addToCart(activeProduct)}
                        className="flex-1 py-2.5 sm:py-3 px-4 rounded-xl bg-gradient-to-r from-orange via-orange-bright to-orange hover:from-orange-bright hover:to-orange text-navy-deep font-heading font-bold text-xs sm:text-sm uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 cursor-pointer"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Slide Dots Indicator */}
              <div className="flex items-center justify-center gap-1.5 pt-2 sm:pt-3 border-t border-orange/15 mt-2 sm:mt-3">
                {newLaunches.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setPage([idx, idx > current ? 1 : -1])}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      idx === current
                        ? 'w-6 bg-orange shadow-[0_0_8px_rgba(201,151,58,0.8)]'
                        : 'w-1.5 bg-orange/20 hover:bg-orange/50'
                    }`}
                    aria-label={`Go to launch product ${idx + 1}`}
                  />
                ))}
              </div>

            </div>
          </div>

          {/* CATEGORIES GRID: (7 Columns) */}
          <div className="order-2 lg:order-2 lg:col-span-7 flex flex-col justify-between">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 h-full">
              {collections.map((item, i) => (
                <Link
                  key={i}
                  href={`/all-products?category=Rudraksha %26 Variants&subcategory=${encodeURIComponent(item.subcategory)}`}
                  className="group flex flex-col justify-between h-full"
                >
                  <div className="aspect-square rounded-xl overflow-hidden border border-orange/25 relative shadow-md group-hover:border-orange/70 group-hover:shadow-sacred-glow group-hover:-translate-y-1 transition-all duration-300 ring-1 ring-inset ring-white/5 bg-navy-deep">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-navy-deep/40 group-hover:bg-navy-deep/10 transition-colors duration-300" />
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-navy-deep/90 via-navy-deep/20 to-transparent pointer-events-none" />

                    {/* Corner Index Number */}
                    <div className="absolute top-2.5 left-2.5 w-6 h-6 rounded-full border border-orange/40 bg-navy-deep/80 backdrop-blur-sm flex items-center justify-center text-orange text-[10px] font-bold">
                      {String(i + 1).padStart(2, '0')}
                    </div>

                    {/* Hover Bottom Hairline */}
                    <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-orange to-orange-bright w-0 group-hover:w-full transition-all duration-300" />
                  </div>
                  <span className="font-heading font-bold text-center text-xs sm:text-sm text-peach group-hover:text-orange transition-colors mt-1">
                    {item.name}
                  </span>
                </Link>
              ))}

              {/* View All Tile */}
              <Link href="/all-products" className="group flex flex-col justify-between h-full">
                <div className="aspect-square rounded-xl border border-orange/30 bg-navy-deep/90 flex flex-col items-center justify-center gap-2 sm:gap-3 transition-all duration-300 group-hover:border-orange group-hover:shadow-sacred-glow group-hover:-translate-y-1 ring-1 ring-inset ring-white/5">
                  <div className="w-10 h-10 rounded-full border border-orange/40 flex items-center justify-center text-orange group-hover:bg-orange group-hover:text-navy-deep transition-colors">
                    <GiSpiralArrow className="w-5 h-5" />
                  </div>
                  <span className="font-display font-bold text-xs sm:text-sm text-orange group-hover:text-orange-bright">
                    All Products
                  </span>
                </div>
                <span className="font-heading font-bold text-center text-xs text-transparent mt-1">View</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}