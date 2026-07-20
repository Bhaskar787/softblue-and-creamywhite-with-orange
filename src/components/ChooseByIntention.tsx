import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const tabs = [
  {
    id: 'growth',
    label: 'Spiritual Growth',
    desc: 'Deepen sadhana, meditation, and devotion.',
    detail: 'Deepen sadhana, meditation, and devotion.',
    image: 'https://himalayarudraksh.online/cdn/shop/files/1-13-mukhi-shiv-shakti-rudraksha-mala-nepal-origin-499218.png?v=1750001216&width=3840',
  },
  {
    id: 'prosperity',
    label: 'Prosperity',
    desc: 'Invite abundance and financial clarity into daily life.',
    detail: 'Invite abundance and financial clarity into daily life. The right rudraksha can help you attract wealth, opportunities, and success.',
    image: 'https://rudrakshashop.in/cdn/shop/files/shopping.webp?v=1765300308',
  },
  {
    id: 'protection',
    label: 'Protection',
    desc: 'Shield against negative energy and instability.',
    detail: 'Shield against negative energy and instability. The right rudraksha can provide protection from negative influences and create a shield of positive energy.',
    image: 'https://m.media-amazon.com/images/I/51orjIrx2pL._AC_UF894,1000_QL80_.jpg',
  },
  {
    id: 'harmony',
    label: 'Harmony',
    desc: 'Restore balance in relationships and the home.',
    detail: 'Restore balance in relationships and the home. The right rudraksha can help you create a harmonious environment and improve relations.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEkJz5pJyZzfhXm_VJs62WVv4LjKifyYNOq0PdgJ3zTUJ0J-G-L4BFHsrR&s=10',
  },
  {
    id: 'wellness',
    label: 'Wellness',
    desc: 'Support physical vitality and calm the nervous system.',
    detail: 'Support physical vitality and calm the nervous system. The right rudraksha can help you maintain your physical & well-being.',
    image: 'https://himalayarudraksh.online/cdn/shop/files/1-13-mukhi-shiv-shakti-rudraksha-mala-nepal-origin-499218.png?v=1750001216&width=3840',
  },
];

// ---------- shared header ----------
function SectionHeader() {
  return (
    <>
      <div className="flex items-center justify-center gap-3 sm:gap-4 px-4 pt-10 sm:pt-14 pb-4 sm:pb-6">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-orange to-transparent max-w-xs opacity-60" />
        <span className="text-orange text-xl sm:text-2xl font-serif opacity-80">ॐ</span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-orange to-transparent max-w-xs opacity-60" />
      </div>
      <div className="text-center px-4 mb-10 sm:mb-14 md:mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display text-orange-gradient mb-2 sm:mb-3">
          Shop by Intention
        </h2>
        <p className="text-peach-soft/70 font-body text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Every intention calls for a different energetic resonance — find the one that matches yours.
        </p>
      </div>
    </>
  );
}

// ---------- Mobile / tablet (below lg): GSAP ScrollTrigger line-fill, normal document flow ----------
function IntentionScrollFlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [reached, setReached] = useState<boolean[]>(() => tabs.map(() => false));

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(max-width: 1023px)', () => {
      const ctx = gsap.context(() => {
        if (containerRef.current && fillRef.current) {
          gsap.set(fillRef.current, { height: '0%' });
          gsap.to(fillRef.current, {
            height: '100%',
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 15%',
              end: 'bottom 85%',
              scrub: 0.3,
            },
          });
        }

        stepRefs.current.forEach((el, i) => {
          if (!el) return;
          ScrollTrigger.create({
            trigger: el,
            start: 'top 55%',
            onEnter: () => setReached((prev) => prev.map((v, idx) => (idx === i ? true : v))),
            onEnterBack: () => setReached((prev) => prev.map((v, idx) => (idx === i ? true : v))),
            onLeaveBack: () => setReached((prev) => prev.map((v, idx) => (idx === i ? false : v))),
          });
        });
      }, containerRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={containerRef} className="max-w-3xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24 relative">
      <div className="absolute top-1 bottom-1 w-px bg-orange/20" style={{ left: '19px' }} aria-hidden>
        <div ref={fillRef} className="absolute top-0 left-0 w-px bg-orange" style={{ height: '0%' }} />
      </div>

      {tabs.map((tab, i) => {
        const isReached = reached[i];
        return (
          <div
            key={tab.id}
            ref={(el) => { stepRefs.current[i] = el; }}
            className="relative pl-10 sm:pl-12 mb-14 sm:mb-20 last:mb-0"
          >
            <span
              className={`inline-block mb-2 px-3 py-1 rounded-full text-xs font-heading font-bold uppercase tracking-widest transition-colors duration-300 ${
                isReached ? 'bg-orange text-navy-deep' : 'bg-navy-mid text-peach/50'
              }`}
            >
              Step {i + 1}
            </span>
            <h3
              className={`font-display text-xl sm:text-2xl md:text-3xl mb-2 transition-colors duration-300 ${
                isReached ? 'text-peach' : 'text-peach/40'
              }`}
            >
              {tab.label}
            </h3>
            <p className="text-peach-soft/70 font-body text-sm sm:text-base leading-relaxed mb-5 sm:mb-6 max-w-lg">
              {tab.detail}
            </p>

            <div className="relative w-full aspect-[4/5] sm:aspect-[16/9] md:aspect-[16/10] rounded-2xl overflow-hidden border border-orange/20 shadow-xl">
              <img src={tab.image} alt={tab.label} className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
                <h4 className="font-display text-xl sm:text-2xl md:text-3xl text-peach mb-1">{tab.label}</h4>
                <p className="text-peach-soft/70 font-body text-xs sm:text-sm max-w-md">{tab.desc}</p>
              </div>
            </div>

            <a
              href="#"
              className="inline-flex items-center gap-2 mt-5 sm:mt-6 px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-orange to-orange-soft text-navy-deep rounded-full font-heading font-bold uppercase tracking-widest text-xs hover:shadow-sacred-glow transition-all"
            >
              Shop {tab.label} <ArrowRight className="w-4 h-4 shrink-0" />
            </a>
          </div>
        );
      })}
    </div>
  );
}

// ---------- Desktop (lg+): pinned scroll-driven fanned card animation ----------
const SCROLL_HEIGHT_PER_STEP = 0.9;
const HOLD_ON_LAST_STEP_VH = 0.8;
const EASE_FACTOR = 0.12;

function IntentionPinnedScroller() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [continuousIndex, setContinuousIndex] = useState(0);
  const targetRef = useRef(0);
  const displayedRef = useRef(0);
  const rafId = useRef<number | null>(null);

  const total = tabs.length;
  const activeIndex = Math.min(total - 1, Math.round(continuousIndex));
  const activeData = tabs[Math.min(total - 1, Math.floor(continuousIndex + 0.0001))];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const computeTarget = () => {
      const el = wrapperRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const scrollableDistance = el.offsetHeight - viewportH;
      const holdPx = HOLD_ON_LAST_STEP_VH * viewportH;
      const drivableDistance = Math.max(1, scrollableDistance - holdPx);

      const scrolled = -rect.top;
      const progress = Math.min(1, Math.max(0, scrolled / drivableDistance));

      targetRef.current = progress * (total - 1);
    };

    const tick = () => {
      const diff = targetRef.current - displayedRef.current;

      if (prefersReducedMotion || Math.abs(diff) < 0.001) {
        displayedRef.current = targetRef.current;
        setContinuousIndex(displayedRef.current);
        rafId.current = null;
        return;
      }

      displayedRef.current += diff * EASE_FACTOR;
      setContinuousIndex(displayedRef.current);
      rafId.current = requestAnimationFrame(tick);
    };

    const kick = () => {
      computeTarget();
      if (rafId.current === null) rafId.current = requestAnimationFrame(tick);
    };

    kick();
    window.addEventListener('scroll', kick, { passive: true });
    window.addEventListener('resize', kick);
    return () => {
      window.removeEventListener('scroll', kick);
      window.removeEventListener('resize', kick);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [total]);

  const jumpToStep = (index: number) => {
    const el = wrapperRef.current;
    if (!el) return;
    const viewportH = window.innerHeight;
    const scrollableDistance = el.offsetHeight - viewportH;
    const holdPx = HOLD_ON_LAST_STEP_VH * viewportH;
    const drivableDistance = Math.max(1, scrollableDistance - holdPx);
    const targetProgress = index / Math.max(1, total - 1);
    const top = el.offsetTop + targetProgress * drivableDistance;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <div
      ref={wrapperRef}
      className="relative"
      style={{ height: `${100 + total * SCROLL_HEIGHT_PER_STEP * 100 + HOLD_ON_LAST_STEP_VH * 100}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 w-full">
          <div className="flex flex-row items-center gap-16 xl:gap-24 w-full">

            {/* LEFT: step timeline — all steps show label, title, and description at all times */}
            <div className="flex-1 max-w-xl w-full">
              <div className="flex gap-6">
                <div className="relative w-px bg-orange/20 shrink-0" aria-hidden>
                  <div
                    className="absolute top-0 left-0 w-px bg-orange"
                    style={{ height: `${Math.min(100, Math.max(0, ((continuousIndex + 1) / total) * 100))}%` }}
                  />
                </div>

                <div className="flex-1">
                  {tabs.map((tab, i) => {
                    const isActive = i === activeIndex;
                    const isPast = i < activeIndex;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => jumpToStep(i)}
                        className="block text-left w-full mb-6 last:mb-0"
                      >
                        <span
                          className={`inline-block mb-1 px-3 py-1 rounded-full text-xs font-heading font-bold uppercase tracking-widest transition-colors duration-300 ${
                            isActive
                              ? 'bg-orange text-navy-deep'
                              : isPast
                                ? 'bg-orange/10 text-orange'
                                : 'bg-navy-mid text-peach/50'
                          }`}
                        >
                          Step {i + 1}
                        </span>
                        <h3
                          className={`font-display text-xl xl:text-2xl transition-all duration-300 ${
                            isActive ? 'text-peach opacity-100' : 'text-peach/50 opacity-60'
                          }`}
                        >
                          {tab.label}
                        </h3>
                        <p
                          className={`font-body text-sm xl:text-base mt-2 leading-relaxed max-w-md transition-all duration-300 ${
                            isActive ? 'text-peach-soft/70 opacity-100' : 'text-peach-soft/40 opacity-60'
                          }`}
                        >
                          {tab.detail}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <a
                href="#"
                className="inline-flex items-center gap-2 sm:gap-3 mt-6 sm:mt-8 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-orange to-orange-soft text-navy-deep rounded-full font-heading font-bold uppercase tracking-widest text-xs sm:text-sm hover:shadow-sacred-glow transition-all"
              >
                Shop {activeData.label} <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              </a>
            </div>

            {/* RIGHT: fanned card stack */}
            <div className="flex-1 w-full relative z-10 h-[62vh] sm:h-[68vh] xl:h-[74vh] max-h-[760px]">
              {tabs.map((tab, i) => {
                const d = i - continuousIndex;

                let translateX = 0;
                let translateY = 0;
                let scale = 1;
                let opacity = 1;
                let zIndex = 100;

                if (d <= 0) {
                  const t = Math.max(-1, d);
                  translateY = t * 100;
                  opacity = Math.max(0, 1 + t);
                  scale = 1;
                  zIndex = 100;
                } else if (d <= 1) {
                  const t = d;
                  translateX = t * 22;
                  translateY = t * 22;
                  scale = 1 - t * 0.06;
                  opacity = 1 - t * 0.1;
                  zIndex = 90;
                } else {
                  const layer = Math.min(d - 1, 2);
                  translateX = 22 + layer * 16;
                  translateY = 22 + layer * 16;
                  scale = 0.94 - layer * 0.05;
                  opacity = d - 1 > 2 ? 0 : 0.9 - layer * 0.25;
                  zIndex = 80 - layer * 10;
                }

                return (
                  <div
                    key={tab.id}
                    className="absolute inset-0 rounded-2xl xl:rounded-3xl overflow-hidden shadow-xl border border-orange/20 will-change-transform"
                    style={{
                      transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
                      opacity,
                      zIndex,
                      pointerEvents: i === activeIndex ? 'auto' : 'none',
                    }}
                  >
                    <img src={tab.image} alt={tab.label} className="w-full h-full object-cover" draggable={false} />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 xl:p-8">
                      <span className="text-orange text-xs xl:text-sm font-heading font-bold uppercase tracking-widest">
                        Step {i + 1}
                      </span>
                      <h3 className="font-display text-2xl xl:text-4xl text-peach mt-1 mb-2">{tab.label}</h3>
                      <p className="text-peach-soft/70 font-body text-sm xl:text-base max-w-md">{tab.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export function ChooseByIntention() {
  return (
    <section className="relative border-y border-orange/10 bg-navy">
      <SectionHeader />

      {/* Below lg: GSAP ScrollTrigger line-fill, normal document flow */}
      <div className="lg:hidden">
        <IntentionScrollFlow />
      </div>

      {/* lg and up: pinned scroll-driven fanned card animation */}
      <div className="hidden lg:block">
        <IntentionPinnedScroller />
      </div>
    </section>
  );
}