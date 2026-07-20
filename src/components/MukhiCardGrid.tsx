import { useState, useRef } from 'react';
import { ChevronRight, X } from 'lucide-react';
import type { Mukhi } from  '@/data/mukhi';

interface MukhiCardGridProps {
  items: Mukhi[];
}

export function MukhiCardGrid({ items }: MukhiCardGridProps) {
  const [openId, setOpenId] = useState<number | null>(null);
  const [expandDirection, setExpandDirection] = useState<'right' | 'left'>('right');
  const containerRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleCardClick = (id: number) => {
    if (openId === id) {
      setOpenId(null);
      return;
    }

    const element = containerRefs.current[id];
    if (element) {
      const rect = element.getBoundingClientRect();
      const windowWidth = window.innerWidth;

      if (rect.left + rect.width / 2 > windowWidth / 2) {
        setExpandDirection('left');
      } else {
        setExpandDirection('right');
      }
    }
    setOpenId(id);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((m) => {
        const isOpen = openId === m.n;

        return (
          <div
            key={m.n}
            ref={(el) => { containerRefs.current[m.n] = el; }}
            className={`relative w-full lg:h-[420px] ${isOpen ? 'h-auto' : 'h-[420px]'}`}
          >
            {/* 1. Static Ghost Placeholder */}
            <div className="hidden lg:block absolute inset-0 bg-navy/30 border border-dashed border-orange/20 rounded-2xl -z-10" />

            {/* 2. The Actual Card */}
            <div
              onClick={() => handleCardClick(m.n)}
              className={`relative lg:absolute lg:top-0 w-full bg-navy-light border rounded-2xl shadow-lg transition-all duration-500 ease-out overflow-hidden select-none cursor-pointer ${
                isOpen
                  ? 'h-auto lg:h-full lg:w-[215%] z-40 border-orange shadow-sacred-glow bg-navy'
                  : 'h-full z-10 border-orange/20 hover:border-orange/60'
              } ${
                isOpen && expandDirection === 'left'
                  ? 'lg:right-0 lg:origin-right'
                  : 'lg:left-0 lg:origin-left'
              }`}
            >
              <div className="p-4 sm:p-5 h-full flex flex-col justify-between relative">
                {/* Gold left accent when open */}
                {isOpen && <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-bright via-orange to-transparent" />}

                <div className={`flex h-full gap-4 sm:gap-6 ${isOpen ? 'flex-col lg:flex-row' : 'flex-col'}`}>

                  {/* Left Block */}
                  <div className={`${isOpen ? 'w-full lg:w-[45%] shrink-0' : 'w-full'} transition-all duration-300 flex flex-col justify-between h-auto lg:h-full`}>
                    <div>
                      <div className="w-full h-40 sm:h-44 rounded-xl overflow-hidden mb-4 sm:mb-5 border border-orange/20 relative group">
                        <img src={m.image} alt={`${m.n} Mukhi`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-navy-deep/20 mix-blend-multiply" />
                      </div>

                      <div className="flex justify-between items-center mb-2 sm:mb-3">
                        <div className="flex items-baseline gap-2">
                          <span className="font-display text-3xl sm:text-4xl text-orange text-shadow-glow">{m.n}</span>
                          <span className="text-[10px] sm:text-xs font-heading font-bold text-orange-soft uppercase tracking-widest">Mukhi</span>
                        </div>
                        <div className="p-2 rounded-full border border-orange/30 bg-navy text-orange shadow-inner">
                          <m.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm font-body text-peach-soft/80 line-clamp-3 leading-relaxed">
                        {m.benefits}
                      </p>
                    </div>

                    {!isOpen && (
                      <div className="flex justify-between items-center pt-3 sm:pt-4 border-t border-orange/20 text-[10px] sm:text-xs font-heading font-bold tracking-widest uppercase text-orange/70">
                        <span>Explore Details</span>
                        <ChevronRight className="w-4 h-4 text-orange" />
                      </div>
                    )}
                  </div>

                  {/* Right Block */}
                  {isOpen && (
                    <div className="flex flex-col justify-between flex-1 border-t lg:border-t-0 lg:border-l border-orange/20 pt-4 sm:pt-6 lg:pt-0 lg:pl-6 animate-fade-in relative">
                      <div className="space-y-4 sm:space-y-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[9px] sm:text-[10px] font-heading tracking-widest text-orange-soft uppercase font-bold mb-1 block">Divine Energy Matrix</span>
                            <h4 className="text-lg sm:text-2xl font-display text-peach">Detailed Attributes</h4>
                          </div>
                          <button
                            onClick={(e) => { e.stopPropagation(); setOpenId(null); }}
                            className="p-1.5 rounded-full text-orange hover:text-orange-bright hover:bg-navy transition-colors"
                          >
                            <X className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                        </div>

                        <div className="grid grid-cols-2 gap-3 sm:gap-4 bg-navy border border-orange/20 p-3 sm:p-4 rounded-xl shadow-inner">
                          <div>
                            <span className="text-[9px] sm:text-[10px] text-orange/60 font-heading font-bold block uppercase tracking-widest mb-1">Ruling Deity</span>
                            <span className="text-xs sm:text-sm font-heading font-semibold text-orange-bright block">{m.deity}</span>
                          </div>
                          <div>
                            <span className="text-[9px] sm:text-[10px] text-orange/60 font-heading font-bold block uppercase tracking-widest mb-1">Associated Planet</span>
                            <span className="text-xs sm:text-sm font-heading font-semibold text-orange-bright block">{m.planet}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <span className="text-[9px] sm:text-[10px] font-heading tracking-widest font-bold text-orange/60 uppercase flex items-center gap-2"><span className="w-3 sm:w-4 h-px bg-orange/40"></span>Metaphysical Benefits</span>
                          <p className="text-xs sm:text-sm font-body text-peach/90 leading-relaxed pl-4 sm:pl-6">{m.benefits}</p>
                        </div>

                        <div className="space-y-2">
                          <span className="text-[9px] sm:text-[10px] font-heading tracking-widest font-bold text-orange/60 uppercase flex items-center gap-2"><span className="w-3 sm:w-4 h-px bg-orange/40"></span>Ideal Configuration</span>
                          <p className="text-xs sm:text-sm font-body text-peach/90 leading-relaxed pl-4 sm:pl-6">{m.whom}</p>
                        </div>
                      </div>

                      <div className="text-[9px] sm:text-[10px] font-heading uppercase tracking-widest text-orange/40 pt-3 border-t border-orange/10 text-center mt-4">
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