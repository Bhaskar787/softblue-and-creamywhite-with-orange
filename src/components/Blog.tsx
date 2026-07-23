import { Link } from 'wouter';
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

// The Navagraha — nine celestial influences of Vedic astrology
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

function AstroBackground() {
  const cx = 400;
  const cy = 400;
  const orbitRadii = [140, 230, 320];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 20% 20%, rgba(252,140,104,0.15), transparent 55%), radial-gradient(ellipse at 85% 75%, rgba(252,140,104,0.18), transparent 55%)',
        }}
      ></div>

      <svg viewBox="0 0 800 700" className="absolute inset-0 w-full h-full opacity-100">
        {stars.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r * 1.3} fill="hsl(17.14deg 96.08% 70%)" opacity={Math.min(s.o + 0.25, 1)} className="animate-star-twinkle" style={{ animationDelay: `${(i % 6) * 0.6}s` }} />
        ))}
        <polyline points="42,68 118,140 210,54" fill="none" stroke="hsl(17.14deg 96.08% 70%)" strokeWidth="0.9" opacity="0.4" />
        <polyline points="620,200 700,340 660,460" fill="none" stroke="hsl(17.14deg 96.08% 70%)" strokeWidth="0.9" opacity="0.4" />
      </svg>

      <svg viewBox="0 0 800 800" className="absolute -right-16 -top-10 w-[620px] h-[620px] md:w-[720px] md:h-[720px] opacity-[0.25]">
        {orbitRadii.map((r) => (
          <circle key={r} cx={cx} cy={cy} r={r} fill="none" stroke="hsl(17.14deg 96.08% 70%)" strokeWidth="1.4" />
        ))}
        {navagraha.map((g, i) => {
          const r = orbitRadii[i % orbitRadii.length];
          const rad = (g.angle * Math.PI) / 180;
          const x = cx + r * Math.cos(rad);
          const y = cy + r * Math.sin(rad);
          return (
            <g key={g.name}>
              <circle cx={x} cy={y} r="16" fill="#0F172A" stroke="hsl(17.14deg 96.08% 70%)" strokeWidth="1.6" />
              <text x={x} y={y + 5} textAnchor="middle" fontSize="15" fill="hsl(17.14deg 96.08% 70%)" fontFamily="serif" fontWeight="bold">
                {g.label}
              </text>
            </g>
          );
        })}
      </svg>

      <svg viewBox="0 0 400 400" className="absolute left-[-60px] bottom-[-60px] w-[380px] h-[380px] opacity-[0.2]">
        <rect x="20" y="20" width="360" height="360" fill="none" stroke="hsl(17.14deg 96.08% 70%)" strokeWidth="1.8" />
        <polyline points="20,20 380,380" fill="none" stroke="hsl(17.14deg 96.08% 70%)" strokeWidth="1.4" />
        <polyline points="380,20 20,380" fill="none" stroke="hsl(17.14deg 96.08% 70%)" strokeWidth="1.4" />
        <polyline points="200,20 20,200 200,380 380,200 200,20" fill="none" stroke="hsl(17.14deg 96.08% 70%)" strokeWidth="1.4" />
      </svg>
    </div>
  );
}

const posts = [
  {
    id: 'rudraksha-shrawan-7-benefits',
    category: 'Sacred Knowledge',
    title: 'Rudraksha and Lord Shiva in Shrawan: 7 Powerful Benefits',
    excerpt: 'The sacred month of Shrawan is one of the most spiritually significant periods in the Hindu calendar. During this holy month, millions of devotees observe fasts and wear Rudraksha.',
    readTime: '10 min read',
    date: 'July 2026',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    badge: 'Featured',
  },
  {
    id: '1-mukhi-rudraksha-divine-bead',
    category: 'Mukhi Guide',
    title: '1 Mukhi Rudraksha | The Divine and Rarest Rudraksha Bead',
    excerpt: 'The 1 Mukhi Rudraksha is widely known as the most sacred and powerful bead among all Rudraksha mukhis. Ruled by Lord Shiva himself.',
    readTime: '5 min read',
    date: 'July 2026',
    image: 'https://japam.in/cdn/shop/files/Gold_plated_Modern_Bracelet_and_Brown_Rudraksha_Mala_combo.jpg?v=1726560930&width=1214',
  },
  {
    id: 'rudraksha-silver-chain-positive-energy',
    category: 'Rudraksha',
    title: 'Rudraksha Silver Chain for Positive Energy & Spiritual Balance',
    excerpt: 'A Rudraksha silver chain is not just a spiritual accessory; it is a sacred symbol of peace, balance, and protection.',
    readTime: '8 min read',
    date: 'May 2026',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    badge: 'Popular',
  },
  {
    id: 'how-to-wear-rudraksha-mala-complete-guide',
    category: 'Vedic Practice',
    title: 'How to Wear a Rudraksha Mala: Complete Spiritual Guide',
    excerpt: 'Rudraksha beads have been considered sacred and used in spiritual practices for thousands of years. Step-by-step guidance.',
    readTime: '5 min read',
    date: 'April 2026',
    image: 'https://images.pexels.com/photos/32442615/pexels-photo-32442615.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

export function Blog() {
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-[#0E1B26] via-[#162A3B] to-[#0E1B26] text-peach relative overflow-hidden border-b border-orange/20">
      {/* Soft Blue & Orange Radial Glow Backgrounds (Matching NewLaunchesBanner pattern) */}
      <div className="absolute top-1/4 -left-40 w-72 sm:w-[500px] h-72 sm:h-[500px] bg-orange/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-72 sm:w-[500px] h-72 sm:h-[500px] bg-blue-500/15 rounded-full blur-[120px] pointer-events-none" />

      {/* OM Section Divider */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 px-4 pt-0 pb-6 sm:pb-8 relative z-10">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-orange to-transparent max-w-xs opacity-60" />
        <span className="text-orange text-xl sm:text-2xl font-serif font-bold opacity-90">ॐ</span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-orange to-transparent max-w-xs opacity-60" />
      </div>

      <AstroBackground />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <span className="text-[10px] sm:text-xs font-heading font-bold uppercase tracking-[0.2em] text-orange bg-orange/10 border border-orange/30 px-3.5 sm:px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-3 sm:mb-4 shadow-sm">
              <GiBookCover className="w-4 h-4 text-orange" />
              Sacred Knowledge Base
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display text-orange font-bold tracking-tight">
              Spiritual Journal & Guides
            </h2>
          </div>
          <Link href="/blog" className="hidden md:inline-flex items-center gap-2 text-orange hover:text-orange-bright font-heading font-bold uppercase tracking-widest text-xs border-b-2 border-orange pb-1 transition-colors group">
            All Articles <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Featured + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {/* Featured Post */}
          <div className="lg:col-span-7 group bg-navy-deep/80 border border-orange/25 p-4 sm:p-5 rounded-2xl backdrop-blur-xl shadow-xl hover:border-orange/50 transition-all">
            <Link href={`/article/${featured.id}`}>
              <div className="relative aspect-[16/9] rounded-xl sm:rounded-2xl overflow-hidden border border-orange/20 mb-4 sm:mb-5 shadow-md">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 brightness-90 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/40 to-transparent" />
                {featured.badge && (
                  <span className="absolute top-3.5 left-3.5 sm:top-5 sm:left-5 text-[9px] sm:text-[10px] font-heading font-bold uppercase tracking-widest bg-orange text-navy-deep px-3 py-1.5 rounded-full shadow-md">
                    {featured.badge}
                  </span>
                )}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                  <span className="text-[10px] sm:text-xs font-heading font-bold uppercase tracking-widest text-orange mb-2 block">{featured.category}</span>
                  <h3 className="font-display text-xl sm:text-2xl md:text-3xl text-peach font-bold leading-tight group-hover:text-orange transition-colors">{featured.title}</h3>
                </div>
              </div>
              <p className="font-body text-peach/85 font-medium text-sm sm:text-base leading-relaxed mb-4 sm:mb-5 max-w-xl">{featured.excerpt}</p>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[10px] sm:text-xs font-heading uppercase tracking-widest text-peach/70 font-bold">
                <span>{featured.date}</span>
                <span className="w-1 h-1 rounded-full bg-orange/40" />
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-orange" />{featured.readTime}</span>
                <span className="ml-auto text-orange font-bold hover:text-orange-bright transition-colors flex items-center gap-1 group/link">
                  Read More <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          </div>

          {/* Sidebar Posts */}
          <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-6">
            {rest.map((post) => (
              <Link key={post.id} href={`/article/${post.id}`} className="group flex gap-3.5 sm:gap-5 cursor-pointer p-3.5 sm:p-4 rounded-xl border border-orange/20 hover:border-orange/60 hover:shadow-sacred-glow bg-navy-deep/80 backdrop-blur-xl shadow-md transition-all duration-300">
                <div className="w-20 h-20 sm:w-28 sm:h-24 shrink-0 rounded-lg sm:rounded-xl overflow-hidden border border-orange/20">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-95 group-hover:brightness-100" />
                </div>
                <div className="flex flex-col justify-between flex-1 min-w-0">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                      <span className="text-[9px] font-heading font-bold uppercase tracking-widest text-orange">{post.category}</span>
                      {post.badge && (
                        <span className="text-[8px] font-heading font-bold uppercase bg-orange/20 text-orange border border-orange/40 px-2 py-0.5 rounded shadow-xs">{post.badge}</span>
                      )}
                    </div>
                    <h4 className="font-heading text-xs sm:text-sm text-peach font-bold leading-snug line-clamp-2 group-hover:text-orange transition-colors">{post.title}</h4>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 text-[9px] sm:text-[10px] font-heading uppercase tracking-widest text-peach/60 font-bold mt-2">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
            <Link href="/blog" className="mt-2 w-full py-3 sm:py-3.5 border border-orange/30 bg-navy-deep/90 rounded-xl text-orange font-heading font-bold uppercase tracking-widest text-[10px] sm:text-xs text-center hover:border-orange hover:bg-orange hover:text-navy-deep transition-all flex items-center justify-center gap-2 shadow-md">
              View All Articles <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}