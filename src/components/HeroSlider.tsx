import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'wouter';
import { useSwipeable } from 'react-swipeable';

const slides = [
  {
    tag: 'Sacred Origin · Nepal',
    heading: 'Beads Blessed\nAt Pashupatinath',
    sub: "Every Rudraksha from the sacred Arun Valley, energized by Vedic pandits at Nepal's most holy Shiva temple before it reaches you.",
    cta: 'Explore Collections',
    href: '#',
    image: 'https://www.travelhimalayan.com/wp-content/uploads/2026/01/Pashupatinath-to-Mount-Kailash-1.webp',
  },
  {
    tag: 'X-Ray Certified · Lab Verified',
    heading: 'Authenticity\nYou Can See',
    sub: 'Every bead ships with a GIA-process X-ray certification and full mukhi count report. Zero guesswork, complete peace of mind.',
    cta: 'See Our Guarantee',
    href: '#',
    image: 'https://as1.ftcdn.net/v2/jpg/09/74/62/96/1000_F_974629665_AOBh7xezMAcwDnDtGIT9Xy4I1JxElMAn.jpg',
  },
  {
    tag: 'Shravan Special — Live Now',
    heading: 'The Siddha Mala\nComplete Set',
    sub: '1 through 14 Mukhi, naturally strung on red silk thread and energized in one sacred ceremony. The rarest offering in our collection.',
    cta: 'Shop Siddha Mala',
    href: '#',
    image: 'https://hsj.com.np/uploads/0000/1/2026/01/01/pexels-aidun-10792604.jpg',
  },
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const go = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent((index + slides.length) % slides.length);
      setIsTransitioning(false);
    }, 400);
  }, [isTransitioning]);

  const handlers = useSwipeable({
    onSwipedLeft: () => go(current + 1),
    onSwipedRight: () => go(current - 1),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  useEffect(() => {
    const timer = setInterval(() => go(current + 1), 6000);
    return () => clearInterval(timer);
  }, [current, go]);

  const slide = slides[current];

  return (
    <section 
      {...handlers} 
      className="relative w-full h-auto sm:h-[80vh] md:h-[85vh] min-h-0 sm:min-h-[550px] md:min-h-[600px] overflow-hidden bg-gradient-to-b from-[#0E1B26] via-[#162A3B] to-[#0E1B26] text-peach touch-pan-y border-b border-orange/20 py-4 sm:py-0"
    >
      {/* Soft Blue & Orange Radial Glow Backgrounds (Matching NewLaunchesBanner pattern) */}
      <div className="absolute top-1/4 -left-40 w-72 sm:w-[500px] h-72 sm:h-[500px] bg-orange/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-72 sm:w-[500px] h-72 sm:h-[500px] bg-blue-500/15 rounded-full blur-[120px] pointer-events-none" />

      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${isTransitioning ? 'opacity-0' : 'opacity-45'}`}
        style={{ backgroundImage: `url(${slide.image})` }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0E1B26] via-[#0E1B26]/80 to-[#0E1B26]/20 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 h-auto sm:h-full flex items-center max-w-7xl mx-auto px-3.5 sm:px-6 md:px-12 py-2 sm:py-0">
        <div className={`max-w-2xl transition-all duration-700 w-full ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
          <span className="inline-block text-[9px] sm:text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.15em] sm:tracking-[0.3em] text-orange mb-1.5 sm:mb-6 border-b border-orange pb-0.5 sm:pb-1">
            {slide.tag}
          </span>

          <h1 className="font-display text-xl xs:text-2xl sm:text-5xl md:text-7xl leading-[1.15] sm:leading-[1.1] mb-2 sm:mb-6 whitespace-pre-line text-orange drop-shadow-lg font-medium">
            {slide.heading}
          </h1>

          <p className="font-body text-slate-100 font-normal text-xs sm:text-lg md:text-xl leading-relaxed mb-3 sm:mb-8 max-w-xl drop-shadow-md">
            {slide.sub}
          </p>

          {/* ALWAYS ON ONE ROW ONLY ACROSS ALL DEVICES */}
          <div className="flex flex-row items-center gap-1.5 sm:gap-4 w-full">
            <Link
              href={slide.href}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1 sm:gap-3 px-2.5 sm:px-8 py-2.5 sm:py-4 bg-orange text-navy-deep font-bold uppercase tracking-wider sm:tracking-widest text-[9px] xs:text-[10.5px] sm:text-sm hover:bg-white transition-all shadow-[0_0_20px_rgba(212,175,55,0.4)] rounded-lg sm:rounded-none text-center whitespace-nowrap"
            >
              {slide.cta}
            </Link>
            <Link
              href="/consultation"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1 sm:gap-3 px-2.5 sm:px-8 py-2.5 sm:py-4 border border-orange/50 text-orange font-bold uppercase tracking-wider sm:tracking-widest text-[9px] xs:text-[10.5px] sm:text-sm hover:bg-orange/10 transition-all rounded-lg sm:rounded-none text-center whitespace-nowrap"
            >
              Book Consultation
            </Link>
          </div>

          {/* Mobile slide dot indicators directly under buttons */}
          <div className="flex md:hidden items-center justify-center gap-2 mt-4">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === current ? 'w-6 bg-orange' : 'w-3 bg-orange/30'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Arrows: Hidden on mobile, shown on desktop */}
      <div className="hidden md:block">
        <button
          onClick={() => go(current - 1)}
          className="absolute left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 border border-orange/30 flex items-center justify-center text-orange hover:border-orange transition-all hover:bg-orange/10"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => go(current + 1)}
          className="absolute right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 border border-orange/30 flex items-center justify-center text-orange hover:border-orange transition-all hover:bg-orange/10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Desktop Indicators */}
      <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-20 gap-4">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className={`h-1 transition-all duration-300 ${
              i === current ? 'w-12 bg-orange' : 'w-6 bg-orange/30'
            }`}
          />
        ))}
      </div>
    </section>
  );
}