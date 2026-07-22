import { useState, useEffect, useCallback, useRef } from 'react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { formatPrice } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Heart, ShoppingBag, ShieldCheck, ArrowRight } from 'lucide-react';
import { GiStarSattelites } from 'react-icons/gi';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';

interface LaunchedProduct {
  id: string;
  name: string;
  tagline: string;
  mukhi: string;
  origin: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  stockLeft: number;
  image: string;
  badge: string;
  certNo: string;
  highlights: string[];
}

const launchedProducts: LaunchedProduct[] = [
  {
    id: 'launch-1',
    name: '14 Mukhi Hanuman Siddha Bracelet',
    tagline: 'Fresh Arun Valley Harvest, Pure Silver Capped',
    mukhi: '14 Mukhi',
    origin: 'Nepal',
    price: 38500,
    originalPrice: 45000,
    rating: 5.0,
    reviews: 42,
    stockLeft: 3,
    image: 'https://m.media-amazon.com/images/I/815Ynn0E9wL._AC_UF1000,1000_QL80_.jpg',
    badge: 'New Arrival',
    certNo: 'HR-1401',
    highlights: [
      'Ruled by Lord Hanuman and planet Saturn',
      'Traditionally worn for protection during Sade Sati',
      'X-ray lab report included with certificate',
    ],
  },
  {
    id: 'launch-2',
    name: 'Rare 1 Mukhi Savar Rudraksha Locket',
    tagline: "Collector's Grade, 925 Sterling Silver Locket",
    mukhi: '1 Mukhi Savar',
    origin: 'Nepal',
    price: 124900,
    originalPrice: 145000,
    rating: 5.0,
    reviews: 18,
    stockLeft: 1,
    image: 'https://images.unsplash.com/photo-1685419367862-1dd40253bf2b?auto=format&fit=crop&w=800&q=80&crop=focalpoint&fp-x=0.5&fp-y=0.3',
    badge: 'Limited Release',
    certNo: 'HR-0102',
    highlights: [
      'Natural cashew-shaped bead symbolizing Lord Shiva',
      'Encased in handcrafted 925 sterling silver locket',
      'Includes VIP Pashupatinath puja certificate',
    ],
  },
  {
    id: 'launch-3',
    name: '11 Mukhi Ekadash Rudra Mala, 108 Beads',
    tagline: 'Hand-Strung on Silk, Energized in Abhishekam',
    mukhi: '11 Mukhi',
    origin: 'Nepal',
    price: 14990,
    originalPrice: 18500,
    rating: 4.9,
    reviews: 29,
    stockLeft: 5,
    image: 'https://himalayarudraksh.online/cdn/shop/files/1-13-mukhi-shiv-shakti-rudraksha-mala-nepal-origin-499218.png?v=1750001216&width=3840',
    badge: 'Fresh Launch',
    certNo: 'HR-1108',
    highlights: [
      'Carries the strength of the eleven Rudras',
      'Knotted on red silk thread with a silver guru bead',
      'Includes a complimentary neem oil care kit',
    ],
  },
  {
    id: 'launch-4',
    name: 'Akshamala Masterpiece, 1 to 21 Mukhi Set',
    tagline: 'The Complete Devotional Collection',
    mukhi: '1 to 21 Mukhi',
    origin: 'Nepal',
    price: 299000,
    originalPrice: 350000,
    rating: 5.0,
    reviews: 9,
    stockLeft: 2,
    image: 'https://images.unsplash.com/photo-1650809652935-2e5002ba40bf?auto=format&fit=crop&w=800&q=80',
    badge: 'Exclusive Edition',
    certNo: 'HR-2101',
    highlights: [
      'The complete 21-mukhi energy matrix in one mala',
      'Hand-selected by Arun Valley elders over three years',
      'Includes a one-on-one astrologer consultation',
    ],
  },
];

const AUTOPLAY_MS = 5200;

const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 48 : -48, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction < 0 ? 48 : -48, opacity: 0 }),
};

export function NewLaunchesBanner() {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [[current, direction], setPage] = useState([0, 0]);
  const [isHovering, setIsHovering] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setPage(([prev]) => [(prev + 1) % launchedProducts.length, 1]);
    setProgressKey((k) => k + 1);
  }, []);

  const prevSlide = useCallback(() => {
    setPage(([prev]) => [(prev - 1 + launchedProducts.length) % launchedProducts.length, -1]);
    setProgressKey((k) => k + 1);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setPage(([prev]) => [index, index > prev ? 1 : -1]);
    setProgressKey((k) => k + 1);
  }, []);

  useEffect(() => {
    if (isHovering) return;
    const timer = setInterval(nextSlide, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [isHovering, nextSlide]);

  const activeProduct = launchedProducts[current];
  const isSaved = isInWishlist(activeProduct.id);
  const discount = Math.round(
    ((activeProduct.originalPrice - activeProduct.price) / activeProduct.originalPrice) * 100
  );

  return (
    <section className="py-14 sm:py-20 md:py-24 bg-navy-deep relative overflow-hidden border-y border-orange/20">
      <div className="absolute inset-0 bg-stars opacity-15 pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-orange/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-navy-light/40 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <span className="inline-flex items-center gap-2 text-[9px] sm:text-[10px] md:text-xs font-heading font-bold uppercase tracking-[0.25em] text-orange/80 mb-3 sm:mb-4">
              <span className="w-6 h-px bg-orange/50" />
              From the Arun Valley Vault
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display text-peach tracking-tight">
              Newly Launched Pieces
            </h2>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={prevSlide}
              aria-label="Previous piece"
              className="w-10 h-10 rounded-full border border-orange/30 bg-navy/80 flex items-center justify-center text-orange hover:bg-orange hover:text-navy-deep transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next piece"
              className="w-10 h-10 rounded-full border border-orange/30 bg-navy/80 flex items-center justify-center text-orange hover:bg-orange hover:text-navy-deep transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Showcase */}
        <div
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const delta = e.changedTouches[0].clientX - touchStartX.current;
            if (delta > 50) prevSlide();
            else if (delta < -50) nextSlide();
            touchStartX.current = null;
          }}
          className="relative rounded-2xl sm:rounded-3xl border border-orange/25 bg-gradient-to-br from-navy-mid/90 via-navy-deep/95 to-navy-deep shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          <div className="relative min-h-[480px] sm:min-h-[520px]">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px] sm:min-h-[520px] w-full"
              >
                {/* Vitrine / left media */}
                <div className="lg:col-span-5 relative bg-navy/50 p-8 sm:p-10 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-orange/15">
                  <div className="relative w-full max-w-[320px]">
                    {/* Corner brackets, glass-case frame */}
                    <svg
                      className="absolute -inset-4 sm:-inset-5 w-[calc(100%+2rem)] h-[calc(100%+2rem)] pointer-events-none"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                    >
                      {[
                        'M2,14 L2,2 L14,2',
                        'M86,2 L98,2 L98,14',
                        'M98,86 L98,98 L86,98',
                        'M14,98 L2,98 L2,86',
                      ].map((d, i) => (
                        <path key={i} d={d} stroke="rgba(201,151,58,0.55)" strokeWidth="0.6" fill="none" />
                      ))}
                    </svg>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.05 }}
                      className="relative aspect-square rounded-xl overflow-hidden border border-orange/20 bg-navy-deep"
                    >
                      <img
                        src={activeProduct.image}
                        alt={activeProduct.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/70 via-transparent to-white/[0.04] pointer-events-none" />
                      <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.4)] pointer-events-none" />
                    </motion.div>

                    {/* pedestal shadow */}
                    <div className="mx-auto mt-3 h-3 w-3/4 rounded-full bg-black/40 blur-md" />

                    {/* wax-seal authenticity stamp */}
                    <motion.div
                      key={`seal-${current}`}
                      initial={{ opacity: 0, scale: 1.6, rotate: -18 }}
                      animate={{ opacity: 1, scale: 1, rotate: -10 }}
                      transition={{ duration: 0.35, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                      className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-crimson border-2 border-orange/60 flex flex-col items-center justify-center text-center shadow-lg"
                    >
                      <ShieldCheck className="w-4 h-4 text-peach mb-0.5" />
                      <span className="text-[8px] sm:text-[9px] font-heading font-bold uppercase tracking-widest text-peach leading-tight">
                        Certified
                      </span>
                      <span className="text-[7px] sm:text-[8px] font-mono text-peach/70 leading-tight">
                        {activeProduct.certNo}
                      </span>
                    </motion.div>

                    {/* wishlist */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleWishlist(activeProduct);
                      }}
                      aria-label={isSaved ? 'Remove from wishlist' : 'Add to wishlist'}
                      className="absolute -bottom-3 -left-3 w-10 h-10 bg-navy-deep border border-orange/40 rounded-full flex items-center justify-center text-orange hover:bg-orange hover:text-navy-deep transition-all shadow-lg cursor-pointer"
                    >
                      <Heart className={`w-4 h-4 ${isSaved ? 'fill-orange text-orange' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Right info */}
                <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 flex flex-col justify-between relative z-10">
                  <div>
                    <motion.div
                      initial={{ y: 12, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.08 }}
                      className="flex items-center gap-3 text-[10px] sm:text-xs font-heading font-bold uppercase tracking-[0.15em] text-orange mb-4"
                    >
                      <span>{activeProduct.badge}</span>
                      <span className="w-1 h-1 rounded-full bg-orange/50" />
                      <span className="text-peach/60 font-medium normal-case tracking-normal">
                        {activeProduct.origin} · {activeProduct.mukhi}
                      </span>
                    </motion.div>

                    <motion.h3
                      initial={{ y: 12, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.13 }}
                      className="text-2xl sm:text-3xl md:text-4xl font-display text-peach mb-2 leading-tight"
                    >
                      {activeProduct.name}
                    </motion.h3>

                    <motion.p
                      initial={{ y: 12, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.17 }}
                      className="text-sm font-body text-orange-bright italic mb-3"
                    >
                      {activeProduct.tagline}
                    </motion.p>

                    <motion.div
                      initial={{ y: 12, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      className="flex items-center gap-1 mb-5"
                    >
                      {[...Array(5)].map((_, i) => (
                        <GiStarSattelites
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < Math.round(activeProduct.rating) ? 'text-orange' : 'text-orange/20'
                          }`}
                        />
                      ))}
                      <span className="text-xs font-body text-peach/60 ml-1.5">
                        {activeProduct.rating.toFixed(1)} · {activeProduct.reviews} reviews
                      </span>
                    </motion.div>

                    <motion.div
                      initial={{ y: 12, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.24 }}
                      className="space-y-2.5 mb-6 border-l-2 border-orange/30 pl-4"
                    >
                      {activeProduct.highlights.map((h, i) => (
                        <p key={i} className="text-xs sm:text-sm font-body text-peach/85 leading-relaxed">
                          {h}
                        </p>
                      ))}
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ y: 12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.28 }}
                    className="pt-5 border-t border-orange/15 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-baseline gap-3">
                        <span className="font-display text-2xl sm:text-3xl font-bold text-orange">
                          {formatPrice(activeProduct.price)}
                        </span>
                        <span className="text-sm font-body text-peach/40 line-through">
                          {formatPrice(activeProduct.originalPrice)}
                        </span>
                        <span className="text-[10px] font-heading font-bold text-crimson bg-crimson/10 border border-crimson/30 px-2 py-0.5 rounded">
                          {discount}% OFF
                        </span>
                      </div>
                      <span className="text-[11px] font-body text-peach/50 flex items-center gap-1.5 mt-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-crimson animate-pulse" />
                        Only {activeProduct.stockLeft} remaining at this price
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => addToCart(activeProduct)}
                        className="flex-1 sm:flex-none px-6 py-3.5 bg-orange hover:bg-orange-bright text-navy-deep font-heading font-bold text-xs sm:text-sm uppercase tracking-widest rounded-xl transition-all shadow-sacred-glow flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                      >
                        <ShoppingBag className="w-4 h-4" /> Add to Cart
                      </button>
                      <Link
                        href="#"
                        className="px-5 py-3.5 border border-orange/30 text-peach/80 hover:text-orange hover:border-orange font-heading font-bold text-xs sm:text-sm uppercase tracking-widest rounded-xl transition-colors hidden sm:inline-flex items-center gap-1.5"
                      >
                        Details <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mala-bead progress rail */}
          <div className="bg-navy-deep px-6 py-4 border-t border-orange/15 flex items-center justify-between relative z-20">
            <div className="flex items-center gap-2.5">
              {launchedProducts.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => goToSlide(idx)}
                  aria-label={`Go to piece ${idx + 1}`}
                  className="relative w-6 h-6 flex items-center justify-center cursor-pointer group"
                >
                  {idx < launchedProducts.length && (
                    <span className="absolute left-1/2 top-1/2 w-6 h-px bg-orange/15 -translate-y-1/2" />
                  )}
                  <span
                    className={`relative rounded-full transition-all duration-300 ${
                      idx === current
                        ? 'w-3 h-3 bg-orange shadow-[0_0_6px_rgba(201,151,58,0.7)]'
                        : 'w-2 h-2 bg-orange/25 group-hover:bg-orange/50'
                    }`}
                  />
                  {idx === current && !isHovering && (
                    <svg className="absolute -inset-1 w-8 h-8 -rotate-90" viewBox="0 0 32 32">
                      <circle cx="16" cy="16" r="13" fill="none" stroke="rgba(201,151,58,0.15)" strokeWidth="1.5" />
                      <motion.circle
                        key={progressKey}
                        cx="16"
                        cy="16"
                        r="13"
                        fill="none"
                        stroke="rgba(201,151,58,0.9)"
                        strokeWidth="1.5"
                        strokeDasharray={2 * Math.PI * 13}
                        initial={{ strokeDashoffset: 2 * Math.PI * 13 }}
                        animate={{ strokeDashoffset: 0 }}
                        transition={{ duration: AUTOPLAY_MS / 1000, ease: 'linear' }}
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>

            <span className="text-[10px] sm:text-xs font-mono text-peach/40 tracking-wider">
              {String(current + 1).padStart(2, '0')} / {String(launchedProducts.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}