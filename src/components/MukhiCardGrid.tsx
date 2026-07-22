import { useState, useRef } from 'react';
import { ChevronRight, X, Sun, Moon, ShieldCheck, Sparkles } from 'lucide-react';
import type { Mukhi } from '@/data/mukhi';

interface MukhiCardGridProps {
  items: Mukhi[];
}

export function MukhiCardGrid({ items }: MukhiCardGridProps) {
  const [openId, setOpenId] = useState<number | null>(null);
  const containerRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleCardClick = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 relative">
      {items.map((m, index) => {
        const isOpen = openId === m.n;

        // Deterministic column position calculations to eliminate position-jump glitches
        const isRightAlignedXL = index % 4 >= 2;
        const isRightAlignedLG = index % 3 >= 2;
        const isRightAlignedSM = index % 2 === 1;

        return (
          <div
            key={m.n}
            ref={(el) => { containerRefs.current[m.n] = el; }}
            className={`relative w-full transition-all duration-300 ${
              isOpen ? 'h-auto lg:h-[480px] z-40' : 'h-[440px] sm:h-[460px] lg:h-[450px] z-10'
            }`}
          >
            {/* 1. Ghost Placeholder for grid stability */}
            <div className="hidden lg:block absolute inset-0 bg-navy-deep/40 border border-dashed border-orange/20 rounded-2xl -z-10" />

            {/* 2. Glitch-Free Inline Expanding Card */}
            <div
              onClick={() => handleCardClick(m.n)}
              className={`relative lg:absolute lg:top-0 w-full rounded-2xl shadow-xl transition-all duration-500 ease-out overflow-hidden select-none cursor-pointer border ${
                isOpen
                  ? 'h-auto lg:h-full lg:w-[215%] z-40 border-orange shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-navy-deep'
                  : 'h-full z-10 border-orange/25 hover:border-orange/60 bg-navy-deep'
              } ${
                isRightAlignedXL
                  ? 'xl:right-0 xl:left-auto xl:origin-right'
                  : 'xl:left-0 xl:right-auto xl:origin-left'
              } ${
                isRightAlignedLG
                  ? 'lg:right-0 lg:left-auto lg:origin-right'
                  : 'lg:left-0 lg:right-auto lg:origin-left'
              } ${
                isRightAlignedSM
                  ? 'sm:right-0 sm:left-auto sm:origin-right'
                  : 'sm:left-0 sm:right-auto sm:origin-left'
              }`}
            >
              {/* Top Accent Highlight */}
              <div className={`h-1 w-full bg-gradient-to-r from-orange-soft via-orange to-orange-bright transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-40'}`} />

              <div className="p-4 sm:p-5 lg:p-6 h-full flex flex-col justify-between relative">
                
                {/* Gold left border indicator when expanded */}
                {isOpen && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-bright via-orange to-transparent" />
                )}

                <div className={`flex h-full gap-5 sm:gap-6 ${isOpen ? 'flex-col lg:flex-row' : 'flex-col'}`}>

                  {/* LEFT COLUMN: Card Summary */}
                  <div className={`${isOpen ? 'w-full lg:w-[45%] shrink-0' : 'w-full'} transition-all duration-300 flex flex-col justify-between h-auto lg:h-full`}>
                    <div>
                      {/* Image Frame */}
                      <div className="w-full h-44 sm:h-48 rounded-xl overflow-hidden mb-4 border border-orange/20 relative group bg-navy">
                        <img
                          src={m.image}
                          alt={`${m.n} Mukhi Rudraksha`}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-transparent to-transparent pointer-events-none" />
                      </div>

                      {/* Header: Mukhi Number & Icon */}
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-baseline gap-2">
                          <span className="font-display text-3xl sm:text-4xl font-bold text-orange text-shadow-glow">
                            {m.n}
                          </span>
                          <span className="text-xs font-heading font-bold text-orange uppercase tracking-widest">
                            Mukhi
                          </span>
                        </div>
                        <div className="p-2 rounded-full border border-orange/30 bg-navy text-orange shadow-inner">
                          <m.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                      </div>

                      {/* Teaser Description */}
                      <p className="text-xs sm:text-sm font-body text-peach/90 font-medium line-clamp-3 leading-relaxed">
                        {m.benefits}
                      </p>
                    </div>

                    {!isOpen && (
                      <div className="flex justify-between items-center pt-3 sm:pt-4 border-t border-orange/20 text-[10px] sm:text-xs font-heading font-bold tracking-widest uppercase text-orange group-hover:text-orange-bright transition-colors">
                        <span>Explore Matrix Details</span>
                        <ChevronRight className="w-4 h-4 text-orange" />
                      </div>
                    )}
                  </div>

                  {/* RIGHT COLUMN: Expanded Details (Visible when open) */}
                  {isOpen && (
                    <div className="flex flex-col justify-between flex-1 border-t lg:border-t-0 lg:border-l border-orange/20 pt-4 sm:pt-6 lg:pt-0 lg:pl-6 animate-fade-in relative z-20">
                      
                      <div className="space-y-4 sm:space-y-5">
                        
                        {/* Title Bar & Close Button */}
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[10px] font-heading tracking-widest text-orange uppercase font-bold mb-1 flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-orange" /> Divine Energy Matrix
                            </span>
                            <h4 className="text-lg sm:text-2xl font-display text-peach font-bold">
                              {m.n} Mukhi Specifications
                            </h4>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenId(null);
                            }}
                            className="p-1.5 rounded-full text-orange hover:bg-orange hover:text-navy-deep transition-all cursor-pointer"
                            aria-label="Close detail box"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>

                        {/* Deity & Planet Tiles */}
                        <div className="grid grid-cols-2 gap-3 bg-navy/80 border border-orange/25 p-3.5 rounded-xl shadow-inner">
                          <div>
                            <span className="text-[9px] sm:text-[10px] text-orange font-heading font-bold block uppercase tracking-widest mb-1 flex items-center gap-1">
                              <Sun className="w-3 h-3 text-orange" /> Ruling Deity
                            </span>
                            <span className="text-xs sm:text-sm font-heading font-bold text-peach block">
                              {m.deity}
                            </span>
                          </div>
                          <div>
                            <span className="text-[9px] sm:text-[10px] text-orange font-heading font-bold block uppercase tracking-widest mb-1 flex items-center gap-1">
                              <Moon className="w-3 h-3 text-orange" /> Associated Planet
                            </span>
                            <span className="text-xs sm:text-sm font-heading font-bold text-peach block">
                              {m.planet}
                            </span>
                          </div>
                        </div>

                        {/* Metaphysical Benefits */}
                        <div className="space-y-1">
                          <span className="text-[10px] font-heading tracking-widest font-bold text-orange uppercase flex items-center gap-2">
                            <span className="w-3.5 h-px bg-orange/40" /> Metaphysical Benefits
                          </span>
                          <p className="text-xs sm:text-sm font-body text-peach/90 leading-relaxed pl-3 border-l-2 border-orange/30">
                            {m.benefits}
                          </p>
                        </div>

                        {/* Ideal Configuration */}
                        <div className="space-y-1">
                          <span className="text-[10px] font-heading tracking-widest font-bold text-orange uppercase flex items-center gap-2">
                            <ShieldCheck className="w-3.5 h-3.5 text-orange" /> Ideal Configuration
                          </span>
                          <p className="text-xs sm:text-sm font-body text-peach/90 leading-relaxed pl-3 border-l-2 border-orange/30">
                            {m.whom}
                          </p>
                        </div>
                      </div>

                      <div className="text-[9px] sm:text-[10px] font-heading uppercase tracking-widest text-peach/60 font-semibold pt-3 border-t border-orange/15 text-center mt-3">
                        Click anywhere on card to close
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}