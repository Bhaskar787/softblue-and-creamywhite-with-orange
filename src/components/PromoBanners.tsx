import { ArrowRight, Clock, Users, Lock } from 'lucide-react';
import {
  GiByzantinTemple, GiStarSattelites,
  GiAries, GiTaurus, GiGemini, GiCancer, GiLeo, GiVirgo,
  GiLibra, GiScorpio, GiSagittarius, GiCapricorn, GiAquarius, GiPisces,
} from 'react-icons/gi';

const zodiacIcons = [
  GiAries, GiTaurus, GiGemini, GiCancer, GiLeo, GiVirgo,
  GiLibra, GiScorpio, GiSagittarius, GiCapricorn, GiAquarius, GiPisces,
];

// A faint rotating zodiac wheel — twelve ticks around a ring, each aligned
// to one glyph's position. Purely decorative, sits behind the card copy.
function ZodiacRing({ className = '' }: { className?: string }) {
  const ticks = Array.from({ length: 12 });
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden>
      <circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1" />
      <circle cx="200" cy="200" r="140" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
      {ticks.map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const x1 = 200 + Math.sin(angle) * 180;
        const y1 = 200 - Math.cos(angle) * 180;
        const x2 = 200 + Math.sin(angle) * 165;
        const y2 = 200 - Math.cos(angle) * 165;
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeOpacity="0.4" strokeWidth="2" />
        );
      })}
    </svg>
  );
}

// A small constellation: a handful of stars joined by thin connecting lines,
// with a couple of points that twinkle. Evokes a birth-chart / night-sky feel
// without needing an external image.
function ConstellationField({ className = '' }: { className?: string }) {
  const points = [
    { x: 40, y: 60 }, { x: 110, y: 30 }, { x: 170, y: 90 },
    { x: 130, y: 150 }, { x: 60, y: 140 }, { x: 200, y: 40 },
  ];
  const edges: [number, number][] = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [1, 5]];
  return (
    <svg viewBox="0 0 220 180" className={className} aria-hidden>
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={points[a].x} y1={points[a].y}
          x2={points[b].x} y2={points[b].y}
          stroke="currentColor" strokeOpacity="0.25" strokeWidth="1"
        />
      ))}
      {points.map((p, i) => (
        <circle
          key={i}
          cx={p.x} cy={p.y} r={i % 2 === 0 ? 2.5 : 1.6}
          fill="currentColor"
          className={i % 2 === 0 ? 'promo-star-twinkle' : ''}
          style={{ animationDelay: `${i * 0.6}s` }}
        />
      ))}
    </svg>
  );
}

export function PromoBanners() {
  return (
    <section className="py-14 sm:py-20 md:py-24 bg-[#faf7f4] overflow-hidden border-y border-orange/10 relative">
      <style>{`
        @keyframes promo-ring-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes promo-star-twinkle {
          0%, 100% { opacity: 0.9; }
          50% { opacity: 0.25; }
        }
        .promo-ring-spin { animation: promo-ring-spin 90s linear infinite; }
        .promo-star-twinkle { animation: promo-star-twinkle 3s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .promo-ring-spin { animation: none; }
          .promo-star-twinkle { animation: none; opacity: 0.7; }
        }
      `}</style>

      {/* OM Section Divider */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 px-4 pt-0 pb-6 sm:pb-8 relative z-10">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-orange to-transparent max-w-xs opacity-60" />
        <span className="text-orange text-xl sm:text-2xl font-serif opacity-80">ॐ</span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-orange to-transparent max-w-xs opacity-60" />
      </div>

      {/* Background image */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.4]"
          style={{ backgroundImage: 'url("https://t3.ftcdn.net/jpg/12/54/22/14/360_F_1254221471_SQ7HQZQXZVBE4gciVC84b5deqB3XmaPZ.jpg")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#faf7f4]/65 via-[#faf7f4]/25 to-[#faf7f4]/65" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 md:mb-14">
          <span className="inline-flex items-center gap-2 text-[9px] sm:text-[10px] font-heading font-bold uppercase tracking-widest text-orange border border-orange/30 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-5 shadow-sm">
            Guided By The Stars
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-orange-gradient tracking-tight leading-tight mb-2 sm:mb-3 px-2">
            Two Paths to Your Right Bead
          </h2>
          <p className="font-body text-navy/65 text-sm sm:text-base md:text-lg leading-relaxed px-2">
            Whether you need a reading first or already know your intention, both begin with the same chart: yours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">

          {/* Card 1 — Free Consultation */}
          <div className="bg-navy-deep border border-orange/30 p-6 sm:p-8 md:p-12 rounded-[1.5rem] sm:rounded-[2rem] flex flex-col justify-between items-start text-left relative overflow-hidden shadow-lg group hover:shadow-sacred-glow hover:-translate-y-1 transition-all duration-500">
            {/* Ambient Background Aura */}
            <div className="absolute -top-24 -right-24 w-56 sm:w-80 h-56 sm:h-80 bg-orange/10 rounded-full blur-[60px] sm:blur-[80px] pointer-events-none transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute top-0 right-0 w-40 sm:w-64 h-40 sm:h-64 bg-mandala opacity-10 pointer-events-none" />

            {/* Astrological signature: a slow-turning zodiac wheel tucked
                behind the copy, referencing the birth-chart reading itself */}
            <ZodiacRing className="promo-ring-spin absolute -bottom-16 -right-10 sm:-bottom-24 sm:-right-16 w-48 sm:w-72 h-48 sm:h-72 text-orange/25 pointer-events-none" />

            <div className="w-full relative z-10">
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <span className="text-[9px] sm:text-[10px] font-heading font-bold uppercase tracking-widest text-navy-deep bg-orange px-3 sm:px-4 py-1 sm:py-1.5 rounded-full shadow-sm">
                  Expert Advice
                </span>
                <GiByzantinTemple className="w-6 h-6 sm:w-8 sm:h-8 text-orange/50 group-hover:text-orange transition-colors duration-500 shrink-0" />
              </div>

              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl text-peach tracking-tight leading-tight mb-3 sm:mb-5">
                Free Personalized Guidance
              </h3>
              <p className="text-peach-soft/80 font-body text-sm sm:text-base md:text-lg leading-relaxed mb-5 sm:mb-6 max-w-md">
                Unsure which Mukhi configuration aligns with your current life path? Speak directly with our certified Vedic consultants for a comprehensive astrological and energetic assessment.
              </p>

              {/* quick trust chips */}
              <div className="flex flex-wrap gap-3 sm:gap-4 mb-7 sm:mb-10">
                <div className="flex items-center gap-1.5 sm:gap-2 text-peach-soft/70 text-[11px] sm:text-xs font-body">
                  <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-orange/70 shrink-0" /> 30-min session
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 text-peach-soft/70 text-[11px] sm:text-xs font-body">
                  <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-orange/70 shrink-0" /> 12,000+ readings given
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 text-peach-soft/70 text-[11px] sm:text-xs font-body">
                  <Lock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-orange/70 shrink-0" /> Confidential
                </div>
              </div>
            </div>

            <button className="relative z-10 inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-orange to-orange-soft text-navy-deep rounded-full text-xs sm:text-sm font-heading font-bold uppercase tracking-widest transition-all hover:brightness-110 hover:gap-4 group/btn w-full sm:w-auto">
              Book Consultation
              <ArrowRight className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </button>
          </div>

          {/* Card 2 — Custom Creation */}
          <div className="bg-navy-mid border border-orange/40 p-6 sm:p-8 md:p-12 rounded-[1.5rem] sm:rounded-[2rem] flex flex-col justify-between items-start text-left relative overflow-hidden shadow-xl group hover:shadow-sacred-glow hover:-translate-y-1 transition-all duration-500">
            {/* Ambient Background Aura */}
            <div className="absolute -bottom-24 -right-24 w-56 sm:w-80 h-56 sm:h-80 bg-orange/15 rounded-full blur-[70px] sm:blur-[90px] pointer-events-none transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-stars opacity-20 pointer-events-none" />

            {/* Astrological signature: a small hand-drawn constellation,
                as if plotting points on this person's own birth chart */}
            <ConstellationField className="absolute top-4 right-4 sm:top-6 sm:right-6 w-28 sm:w-40 h-24 sm:h-32 text-orange/60 pointer-events-none" />

            <div className="w-full relative z-10">
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <span className="text-[9px] sm:text-[10px] font-heading font-bold uppercase tracking-widest text-orange border border-orange/50 bg-navy-deep/50 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full backdrop-blur">
                  Custom Creation
                </span>
                <GiStarSattelites className="w-6 h-6 sm:w-8 sm:h-8 text-orange/50 group-hover:text-orange transition-colors duration-500 shrink-0" />
              </div>

         <h3 className="font-display text-2xl sm:text-3xl md:text-4xl text-orange tracking-tight leading-tight mb-3 sm:mb-5">
  Elevate Your Sadhana
</h3>
              <p className="text-peach/90 font-body text-sm sm:text-base md:text-lg leading-relaxed mb-5 sm:mb-6 max-w-md">
                Commission a bespoke combination or structural Mala custom-strung by specialists according to your specific natal birth chart and spiritual intentions.
              </p>

              {/* zodiac icon strip — a quiet nod to "every chart, every sign" */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-7 sm:mb-10" aria-hidden>
                {zodiacIcons.map((Icon, i) => (
                  <span
                    key={i}
                    className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-orange/25 flex items-center justify-center text-orange/50 group-hover:text-orange/80 group-hover:border-orange/50 transition-colors duration-500 shrink-0"
                    style={{ transitionDelay: `${i * 25}ms` }}
                  >
                    <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </span>
                ))}
              </div>
            </div>

            <button className="relative z-10 inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 border-2 border-orange text-orange rounded-full text-xs sm:text-sm font-heading font-bold uppercase tracking-widest hover:bg-orange hover:text-navy-deep hover:gap-4 transition-all shadow-[0_0_15px_rgba(201,151,58,0.2)] group/btn w-full sm:w-auto">
              Start Custom Order
              <ArrowRight className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}