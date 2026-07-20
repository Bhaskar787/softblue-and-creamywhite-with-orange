import { ArrowRight, Clock } from 'lucide-react';
import { GiBookCover } from 'react-icons/gi';

// Scattered "night sky" stars — fixed positions so the field doesn't shift on re-render
const stars = [
  { x: 42, y: 68, r: 1.6, o: 0.9 }, { x: 118, y: 140, r: 1.1, o: 0.5 }, { x: 210, y: 54, r: 1.8, o: 0.8 },
  { x: 300, y: 200, r: 1.2, o: 0.4 }, { x: 60, y: 300, r: 1.4, o: 0.6 }, { x: 160, y: 380, r: 1.1, o: 0.45 },
  { x: 340, y: 340, r: 1.6, o: 0.7 }, { x: 30, y: 460, r: 1.2, o: 0.5 }, { x: 250, y: 470, r: 1.8, o: 0.85 },
  { x: 380, y: 120, r: 1.1, o: 0.4 }, { x: 470, y: 250, r: 1.5, o: 0.65 }, { x: 550, y: 90, r: 1.2, o: 0.5 },
  { x: 620, y: 200, r: 1.7, o: 0.8 }, { x: 700, y: 340, r: 1.1, o: 0.4 }, { x: 760, y: 150, r: 1.4, o: 0.6 },
  { x: 660, y: 460, r: 1.2, o: 0.45 }, { x: 500, y: 420, r: 1.6, o: 0.75 }, { x: 90, y: 560, r: 1.3, o: 0.5 },
  { x: 420, y: 580, r: 1.1, o: 0.4 }, { x: 580, y: 560, r: 1.5, o: 0.65 }, { x: 730, y: 540, r: 1.2, o: 0.5 },
  { x: 200, y: 620, r: 1.7, o: 0.8 }, { x: 350, y: 40, r: 1.1, o: 0.4 }, { x: 460, y: 60, r: 1.3, o: 0.55 },
];

// The Navagraha — nine celestial influences of Vedic astrology, placed around an orbit ring
const navagraha = [
  { label: 'सू', name: 'Surya', angle: 5 },
  { label: 'चं', name: 'Chandra', angle: 45 },
  { label: 'मं', name: 'Mangal', angle: 85 },
  { label: 'बु', name: 'Budh', angle: 125 },
  { label: 'गु', name: 'Guru', angle: 165 },
  { label: 'शु', name: 'Shukra', angle: 205 },
  { label: 'श', name: 'Shani', angle: 245 },
  { label: 'रा', name: 'Rahu', angle: 285 },
  { label: 'के', name: 'Ketu', angle: 325 },
];

// Same astrological backdrop used on Customize Order — star field, Navagraha orbit
// rings with planetary glyphs, and a Rashi (birth-chart) diamond — all recolored to
// orange and turned up in opacity so the theme actually reads instead of hiding
// behind the near-invisible mandala texture alone.
function AstroBackground() {
  const cx = 400;
  const cy = 400;
  const orbitRadii = [140, 230, 320];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Deep space gradient wash, tuned to the navy/orange palette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 20% 20%, rgba(201,151,58,0.18), transparent 55%), radial-gradient(ellipse at 85% 75%, rgba(201,151,58,0.16), transparent 55%)',
        }}
      ></div>

      {/* Star field — now in orange rather than cream, and turned up so it actually reads */}
      <svg viewBox="0 0 800 700" className="absolute inset-0 w-full h-full opacity-100">
        {stars.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r * 1.3} fill="#C9973A" opacity={Math.min(s.o + 0.25, 1)} className="animate-star-twinkle" style={{ animationDelay: `${(i % 6) * 0.6}s` }} />
        ))}
        {/* constellation lines linking a few stars, as if charting a Nakshatra */}
        <polyline points="42,68 118,140 210,54" fill="none" stroke="#E8912A" strokeWidth="0.9" opacity="0.55" />
        <polyline points="620,200 700,340 660,460" fill="none" stroke="#E8912A" strokeWidth="0.9" opacity="0.55" />
      </svg>

      {/* Navagraha orbit rings + planetary glyphs — brought forward and fully orange */}
      <svg viewBox="0 0 800 800" className="absolute -right-16 -top-10 w-[620px] h-[620px] md:w-[720px] md:h-[720px] opacity-[0.45]">
        {orbitRadii.map((r) => (
          <circle key={r} cx={cx} cy={cy} r={r} fill="none" stroke="#E8912A" strokeWidth="1.4" />
        ))}
        {navagraha.map((g, i) => {
          const r = orbitRadii[i % orbitRadii.length];
          const rad = (g.angle * Math.PI) / 180;
          const x = cx + r * Math.cos(rad);
          const y = cy + r * Math.sin(rad);
          return (
            <g key={g.name}>
              <circle cx={x} cy={y} r="16" fill="#0A2218" stroke="#E8912A" strokeWidth="1.6" />
              <text x={x} y={y + 5} textAnchor="middle" fontSize="15" fill="#E8912A" fontFamily="serif">
                {g.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Vedic Rashi (birth chart) diamond — orange lines, brought up to a visible weight */}
      <svg viewBox="0 0 400 400" className="absolute left-[-60px] bottom-[-60px] w-[380px] h-[380px] opacity-[0.3]">
        <rect x="20" y="20" width="360" height="360" fill="none" stroke="#E8912A" strokeWidth="1.8" />
        <polyline points="20,20 380,380" fill="none" stroke="#E8912A" strokeWidth="1.4" />
        <polyline points="380,20 20,380" fill="none" stroke="#E8912A" strokeWidth="1.4" />
        <polyline points="200,20 20,200 200,380 380,200 200,20" fill="none" stroke="#E8912A" strokeWidth="1.4" />
      </svg>
    </div>
  );
}

const posts = [
  {
    category: 'Sacred Knowledge',
    title: 'The Science Behind Rudraksha: What Modern Research Reveals',
    excerpt: 'Ancient Vedic wisdom meets contemporary bioelectric research. Studies from NIMHANS and IIT demonstrate measurable electromagnetic properties in authentic Rudraksha beads.',
    readTime: '7 min read',
    date: 'June 2026',
    image: 'https://rudrakx.com/_next/image?url=https%3A%2F%2Fv2.rudrakx.com%2F%2Fmedia%2Ffiler_public%2F93%2Fe9%2F93e9400e-953a-4039-b884-54f49179f7ed%2Fscientific-research-on-rudraksha.webp&w=3840&q=75',
    badge: 'Featured',
  },
  {
    category: 'Mukhi Guide',
    title: 'Choosing Between 5 and 7 Mukhi: A Deep Astrological Comparison',
    excerpt: 'Jupiter vs Saturn energy — understand which ruling deity aligns with your current planetary dasha before making your choice.',
    readTime: '5 min read',
    date: 'May 2026',
    image: 'https://himalayarudraksh.online/cdn/shop/files/1-13-mukhi-shiv-shakti-rudraksha-mala-nepal-origin-499218.png?v=1750001216&width=3840',
    badge: null,
  },
  {
    category: 'Vedic Practice',
    title: 'How to Energize and Maintain Your Rudraksha at Home',
    excerpt: 'A step-by-step guide to Prana Pratishtha: the daily care ritual, monthly oil treatment, and the right mantras for your specific mukhi.',
    readTime: '4 min read',
    date: 'April 2026',
    image: 'https://rudrahouse.com/storage/uploads/product/5-mukhi-rudraksha-kantha-mala/5-mukhi-rudraksha-kantha-mala.jpeg',
    badge: null,
  },
  {
    category: 'Authenticity',
    title: 'Six Tests to Spot a Fake Rudraksha Before You Buy',
    excerpt: "Float test, copper test, X-ray analysis — a comprehensive buyer's guide to identifying adulterated and chemically treated beads in the market.",
    readTime: '6 min read',
    date: 'March 2026',
    image: 'https://www.mkhastrovastumlm.com/wp-content/uploads/2024/01/rudrasha.jpg',
    badge: 'Popular',
  },
];

export function Blog() {
  const [featured, ...rest] = posts;

  return (
    <section className="py-14 sm:py-20 md:py-24 bg-[#faf7f4] relative overflow-hidden">
      {/* Background lightened ~10% using the site's own navy/orange tones,
          fading from lighter at the top to the base tone lower down —
          reads as ambient light instead of a flat grey wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange/[0.02] via-transparent to-transparent pointer-events-none" />

      {/* Astrological star field, Navagraha orbits & Rashi diamond — same motif as Customize Order */}
      <AstroBackground />

      <div className="absolute inset-0 bg-mandala opacity-[0.03] pointer-events-none" />

      {/* OM Section Divider */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 px-4 pt-0 pb-6 sm:pb-8 relative z-10">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-orange to-transparent max-w-xs opacity-60" />
        <span className="text-orange text-xl sm:text-2xl font-serif opacity-80">ॐ</span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-orange to-transparent max-w-xs opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-10 sm:mb-14 md:mb-16">
          <div>
            <span className="inline-flex items-center gap-2 text-[9px] sm:text-[10px] font-heading font-bold uppercase tracking-widest text-orange border border-orange/30 bg-orange/5 px-3.5 sm:px-4 py-1.5 rounded-full mb-4 sm:mb-5">
              <GiBookCover className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Wisdom Journal
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-orange-gradient tracking-tight">Sacred Knowledge</h2>
          </div>
          <a href="#" className="hidden md:inline-flex items-center gap-2 text-orange font-heading font-bold uppercase tracking-widest text-xs border-b border-orange/30 pb-1 hover:border-orange hover:text-orange-bright transition-colors group">
            All Articles <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Featured + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {/* Featured Post */}
          <div className="lg:col-span-7 group cursor-pointer">
            <div className="relative aspect-[16/9] rounded-xl sm:rounded-2xl overflow-hidden border border-orange/20 mb-4 sm:mb-6">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 brightness-75 group-hover:brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/30 to-transparent" />
              {featured.badge && (
                <span className="absolute top-3.5 left-3.5 sm:top-5 sm:left-5 text-[9px] sm:text-[10px] font-heading font-bold uppercase tracking-widest bg-orange text-navy-deep px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-md">
                  {featured.badge}
                </span>
              )}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                <span className="text-[9px] sm:text-[10px] font-heading font-bold uppercase tracking-widest text-orange/70 mb-2 sm:mb-3 block">{featured.category}</span>
                <h3 className="font-display text-lg sm:text-2xl md:text-3xl text-peach leading-tight group-hover:text-orange transition-colors">{featured.title}</h3>
              </div>
            </div>
            <p className="font-body text-navy/65 text-sm sm:text-base leading-relaxed mb-4 sm:mb-5 max-w-xl">{featured.excerpt}</p>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[10px] sm:text-xs font-heading uppercase tracking-widest text-orange/50">
              <span>{featured.date}</span>
              <span className="w-1 h-1 rounded-full bg-orange/30" />
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{featured.readTime}</span>
              <a href="#" className="ml-auto text-orange font-bold hover:text-orange-bright transition-colors flex items-center gap-1 group/link">
                Read More <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Sidebar Posts */}
          <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-6">
            {rest.map((post, i) => (
              <div key={i} className="group flex gap-3.5 sm:gap-5 cursor-pointer p-3 sm:p-4 rounded-xl border border-orange/15 hover:border-orange/40 hover:bg-orange/5 bg-white shadow-sm transition-all duration-300">
                <div className="w-20 h-20 sm:w-28 sm:h-24 shrink-0 rounded-lg sm:rounded-xl overflow-hidden border border-orange/15">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-75 group-hover:brightness-90" />
                </div>
                <div className="flex flex-col justify-between flex-1 min-w-0">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                      <span className="text-[8px] sm:text-[9px] font-heading font-bold uppercase tracking-widest text-orange/60">{post.category}</span>
                      {post.badge && (
                        <span className="text-[7px] sm:text-[8px] font-heading font-bold uppercase bg-crimson text-white px-1.5 sm:px-2 py-0.5 rounded">{post.badge}</span>
                      )}
                    </div>
                    <h4 className="font-heading text-xs sm:text-sm text-navy/80 leading-snug line-clamp-2 group-hover:text-orange transition-colors">{post.title}</h4>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 text-[9px] sm:text-[10px] font-heading uppercase tracking-widest text-orange/40 mt-2">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            ))}
            <a href="#" className="mt-2 w-full py-3 sm:py-3.5 border border-orange/30 rounded-xl text-orange font-heading font-bold uppercase tracking-widest text-[10px] sm:text-xs text-center hover:border-orange hover:bg-orange/5 transition-all flex items-center justify-center gap-2">
              View All Articles <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}