import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MenuDrawer } from '@/components/MenuDrawer';
import { CartDrawer } from '@/components/CartDrawer';
import { WishlistDrawer } from '@/components/WishlistDrawer';
import { SearchOverlay } from '@/components/SearchOverlay';
import { FloatingActions } from '@/components/FloatingActions';
import { Link } from 'wouter';
import {
  ChevronRight,
  ChevronDown,
  Sparkles,
  Search,
  HelpCircle,
  ShieldCheck,
  Flame,
  Truck,
  Heart,
  Compass,
  MessageCircle,
  Phone,
  ArrowRight,
  ThumbsUp,
} from 'lucide-react';
import { GiLotusFlower } from 'react-icons/gi';
import { useToast } from '@/hooks/use-toast';

type Category = 'All' | 'Authenticity' | 'Wearing & Care' | 'Shipping' | 'Spiritual';

const categoryMeta: Record<Exclude<Category, 'All'>, { icon: typeof ShieldCheck }> = {
  'Authenticity': { icon: ShieldCheck },
  'Wearing & Care': { icon: Sparkles },
  'Shipping': { icon: Truck },
  'Spiritual': { icon: Compass },
};

const faqs: { q: string; a: string; category: Exclude<Category, 'All'>; tag: string }[] = [
  {
    q: 'How do I know my Rudraksha bead is 100% original and genuine?',
    a: "Every Rudraksha from Rudrantra originates directly from mature trees in Nepal (including our own farm in Nepal) and Java. Each bead undergoes strict botanical inspection, density test, and non-destructive X-Ray laboratory verification to confirm natural cleft lines and internal seed chambers. You receive an official ISO-certified Lab Certificate with your order.",
    category: 'Authenticity',
    tag: 'Authenticity & Origin',
  },
  {
    q: 'What is the difference between Nepali and Java Rudraksha?',
    a: 'Nepali beads, sourced from the Arun and Dolakha valleys, are larger and denser with deeper mukhi lines, and produce faster energetic vibrations. Java (Indonesian) beads are smaller, smoother, and lighter, making them an excellent entry point for delicate bracelets or discreet daily wear. Both are authentic and scripturally revered.',
    category: 'Authenticity',
    tag: 'Nepal vs Java',
  },
  {
    q: 'What is Prana Pratishtha consecration and how is it performed?',
    a: 'Prana Pratishtha is an ancient Shaiva ritual that awakens the subtle spiritual vibration of the Rudraksha seed. Before dispatch, your bead or mala is purified with holy Gangajal and Panchamrut, anointed with sandalwood paste, and consecrated by experienced Pashupatinath Brahmin scholars through 108 Vedic Rudra mantra repetitions and Sankalpa alignment.',
    category: 'Spiritual',
    tag: 'Vedic Consecration',
  },
  {
    q: 'Which Mukhi Rudraksha is best for me as a beginner?',
    a: 'The 5 Mukhi (Panch Mukhi) is universally recommended as a starting point. Ruled by Jupiter and Lord Kalagni Rudra, it supports general health, mental clarity, and spiritual awareness without any restrictions on who can wear it.',
    category: 'Spiritual',
    tag: 'Mukhi Selection',
  },
  {
    q: 'Can I wear Rudraksha while sleeping, bathing, or eating non-veg food?',
    a: 'It is recommended to remove your mala while taking hot showers (as chemical soaps and shampoos strip natural essential oils from the wood) and during intimate times. It is safe to wear during sleep, meditation, and daily routines. If eating non-vegetarian food, respect individual family traditions, though spiritual discipline encourages removing the bead during consumption.',
    category: 'Wearing & Care',
    tag: 'Daily Sadhana Care',
  },
  {
    q: 'How should I clean, oil, and maintain my Rudraksha mala?',
    a: 'Clean your beads every 2–3 months by soaking in lukewarm Gangajal or clean water for 15 minutes. Gently brush the clefts with a soft toothbrush to remove dust. Let it dry in shade, then condition with a few drops of natural sandalwood or sesame oil.',
    category: 'Wearing & Care',
    tag: 'Maintenance & Oiling',
  },
  {
    q: 'What thread or metal should I use to string my Rudraksha?',
    a: 'Red or yellow silk thread is traditional and lets the bead breathe. Silver is spiritually neutral and our most recommended metal; copper is favoured for Saturn-related mukhis, while gold is reserved for higher mukhis.',
    category: 'Wearing & Care',
    tag: 'Bead Threading',
  },
  {
    q: 'Can women wear Rudraksha beads? Are there any restrictions?',
    a: 'Absolutely! Ancient scriptures like Shiva Purana state that Lord Shiva blessed Rudraksha for all human beings without discrimination of gender, caste, or background. Women can wear Rudraksha freely for mental clarity, health, and spiritual protection.',
    category: 'Spiritual',
    tag: 'Women & Sadhana',
  },
  {
    q: 'Do you ship internationally? How long does delivery take?',
    a: 'Yes, worldwide with DHL Express and FedEx. Orders within Nepal and India take 2–4 business days. International orders to the USA, UK, Europe, Australia, and UAE arrive in 4–7 business days. Every package is insured and tracked.',
    category: 'Shipping',
    tag: 'Global Shipping',
  },
  {
    q: 'Does my order come with an official X-Ray Lab Certificate?',
    a: 'Yes! All collector beads, premium 1-21 Mukhi beads, and high-grade malas come accompanied by an independent government-registered Gemological & X-Ray Lab Certificate featuring a QR code for online verification.',
    category: 'Authenticity',
    tag: 'Lab Certification',
  },
  {
    q: 'Can I request a custom-made combination or bespoke mala?',
    a: 'Yes! You can use our dedicated Custom Order Page to specify your preferred bead sizes, silver/gold threading, intention alignment, and budget. Our master artisans in Nepal will handcraft your bespoke piece.',
    category: 'Spiritual',
    tag: 'Bespoke Crafting',
  },
  {
    q: 'What is Rudrantra’s return and authenticity guarantee policy?',
    a: 'We offer a 100% Lifetime Authenticity Guarantee. If any authorized lab proves a bead purchased from Rudrantra to be non-genuine, we offer a 100% instant refund. For transit damage, we provide 7-day hassle-free replacement.',
    category: 'Shipping',
    tag: 'Guarantee Policy',
  },
];

const categories: Category[] = ['All', 'Authenticity', 'Wearing & Care', 'Shipping', 'Spiritual'];

const STACK_TOP = 96; // px top navbar offset
const STACK_OFFSET = 10; // px offset between stacked sticky cards
const MAX_DEPTH = 5;

export default function FAQPage() {
  const { toast } = useToast();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [query, setQuery] = useState('');
  const [depths, setDepths] = useState<number[]>([]);
  const [likedFaqs, setLikedFaqs] = useState<Record<number, boolean>>({});

  const listRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const filtered = useMemo(() => {
    return faqs
      .map((faq, originalIndex) => ({ ...faq, originalIndex }))
      .filter((faq) => activeCategory === 'All' || faq.category === activeCategory)
      .filter((faq) => {
        if (!query.trim()) return true;
        const q = query.toLowerCase();
        return (
          faq.q.toLowerCase().includes(q) ||
          faq.a.toLowerCase().includes(q) ||
          faq.tag.toLowerCase().includes(q)
        );
      });
  }, [activeCategory, query]);

  // STICKY CARD STACKING DEPTH CALCULATION
  const measure = useCallback(() => {
    if (reducedMotion.current) return;
    const nodes = cardRefs.current;
    const stuck: boolean[] = nodes.map((el, i) => {
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      return rect.top <= STACK_TOP + i * STACK_OFFSET + 1;
    });
    const next = nodes.map((_, i) => {
      if (!stuck[i]) return 0;
      let covering = 0;
      for (let j = i + 1; j < nodes.length; j++) {
        if (stuck[j]) covering++;
        else break;
      }
      return Math.min(covering, MAX_DEPTH);
    });
    setDepths((prev) => {
      if (prev.length === next.length && prev.every((v, i) => v === next[i])) return prev;
      return next;
    });
  }, []);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    measure();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [measure, filtered.length]);

  const handleHelpful = (index: number) => {
    setLikedFaqs((prev) => ({ ...prev, [index]: true }));
    toast({
      title: 'Thank you for your feedback',
      description: 'We are glad this answer helped you!',
    });
  };

  return (
    // CRITICAL: No overflow-hidden on outer wrapper to allow position:sticky to work!
    <div className="min-h-screen bg-[#FAF7F2] text-[#0F172A] font-body selection:bg-[hsl(17.14deg_96.08%_70%)]/30 selection:text-[#0F172A] relative">
      <style>{`
        @keyframes faq-rise {
          from { opacity: 0; transform: translateY(18px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes bead-pulse {
          0% { box-shadow: 0 0 0 0 rgba(252,140,104,0.45); }
          100% { box-shadow: 0 0 0 8px rgba(252,140,104,0); }
        }
        .faq-card-enter {
          animation: faq-rise 0.55s cubic-bezier(0.16,1,0.3,1) both;
        }
        .faq-thread {
          background: linear-gradient(to bottom, rgba(252,140,104,0) 0%, rgba(252,140,104,0.4) 6%, rgba(252,140,104,0.4) 94%, rgba(252,140,104,0) 100%);
        }
        .faq-bead-active {
          animation: bead-pulse 1.1s cubic-bezier(0.16,1,0.3,1) 1;
        }
      `}</style>

      <AnnouncementBar />
      <Navbar />

      {/* Breadcrumbs Bar */}
      <div className="bg-[#0F172A] border-b border-[hsl(17.14deg_96.08%_70%)]/20 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-widest text-[#E2E8F0]">
          <Link href="/" className="hover:text-[hsl(17.14deg_96.08%_70%)] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[hsl(17.14deg_96.08%_70%)]" />
          <span className="text-[hsl(17.14deg_96.08%_70%)] font-bold">Frequently Asked Questions & Help Center</span>
        </div>
      </div>

      <main className="pb-20 space-y-10 sm:space-y-14">

        {/* ── 1. HERO SECTION ── */}
        <section className="pt-10 sm:pt-16 pb-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(17.14deg_96.08%_70%)]/20 border border-[hsl(17.14deg_96.08%_70%)]/50 text-[#0F172A] font-heading text-xs sm:text-sm font-bold uppercase tracking-widest shadow-xs">
              <GiLotusFlower className="w-4 h-4 text-[#0F172A]" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold text-[#1E293B] leading-tight tracking-tight">
              Got Questions? We Have <span className="text-orange underline decoration-[hsl(17.14deg_96.08%_70%)]">Sacred Answers</span>
            </h1>

            <p className="font-body text-base sm:text-lg font-medium text-[#334155] leading-relaxed">
              Everything a sincere seeker needs to know before making their sacred choice — original Rudraksha beads, mukhi selection, Vedic consecration, shipping, and lifetime care.
            </p>

            {/* LIVE SEARCH INPUT */}
            <div className="relative max-w-xl mx-auto pt-2">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search a question, e.g. 5 mukhi, lab certificate, shipping, oiling..."
                className="w-full pl-11 pr-4 py-3 rounded-full border border-[#E2D9CC] bg-white text-xs sm:text-sm font-body text-[#0F172A] font-semibold placeholder:text-[#94A3B8] focus:outline-none focus:border-[hsl(17.14deg_96.08%_70%)] transition-colors shadow-sm"
              />
            </div>

            {/* CATEGORY FILTER BUTTONS */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 pt-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 sm:px-5 py-2 rounded-full text-xs font-heading font-bold uppercase tracking-widest border transition-all duration-300 cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-[hsl(17.14deg_96.08%_70%)] text-[#0F172A] border-[hsl(17.14deg_96.08%_70%)] shadow-md'
                      : 'text-[#334155] border-[#E2D9CC] bg-white hover:border-[hsl(17.14deg_96.08%_70%)] hover:text-[#0F172A]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

          </div>
        </section>

        {/* ── 2. STICKY STACKING FAQS GRID WITH STICKY SIDEBAR ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid md:grid-cols-[1fr_320px] gap-6 sm:gap-8 md:gap-10 items-start">
            
            {/* LEFT COLUMN: STICKY STACKING LIST */}
            <div ref={listRef} className="flex flex-col gap-2.5 sm:gap-3 relative">
              
              {filtered.length === 0 && (
                <div className="text-center py-12 sm:py-16 text-[#334155] font-medium border border-dashed border-[#E2D9CC] rounded-2xl text-sm sm:text-base px-4 bg-white">
                  No questions match "{query}". Try a different search term or ask us directly.
                </div>
              )}

              {/* The mala thread running behind the bead icons */}
              {filtered.length > 0 && (
                <div
                  aria-hidden
                  className="hidden sm:block faq-thread absolute left-[41px] top-6 bottom-6 w-px z-0 pointer-events-none"
                />
              )}

              {filtered.map((faq, i) => {
                const isOpen = openIndex === faq.originalIndex;
                const Icon = categoryMeta[faq.category].icon;
                const top = STACK_TOP + i * STACK_OFFSET;
                const depth = depths[i] ?? 0;
                const panelId = `faq-panel-${faq.originalIndex}`;
                const buttonId = `faq-trigger-${faq.originalIndex}`;
                const isLiked = likedFaqs[faq.originalIndex];

                const scale = isOpen ? 1 : 1 - depth * 0.012;
                const liftY = isOpen ? 0 : -depth * 2;
                const dim = isOpen ? 0 : depth * 0.05;

                return (
                  <div
                    key={`${activeCategory}-${query}-${faq.originalIndex}`}
                    className="sticky faq-card-enter"
                    style={{
                      top: `${top}px`,
                      zIndex: isOpen ? 50 : 10 + i,
                      animationDelay: `${Math.min(i, 8) * 40}ms`,
                    }}
                  >
                    <div
                      ref={(el) => { cardRefs.current[i] = el; }}
                      className={`relative rounded-xl border transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isOpen
                          ? 'border-[hsl(17.14deg_96.08%_70%)] bg-white shadow-xl'
                          : 'border-[#E2D9CC] bg-white shadow-sm hover:border-[hsl(17.14deg_96.08%_70%)]/60'
                      }`}
                      style={{
                        transform: `translateY(${liftY}px) scale(${scale})`,
                        transformOrigin: 'top center',
                      }}
                    >
                      {/* Receded Depth Scrim */}
                      {dim > 0 && (
                        <div
                          aria-hidden
                          className="absolute inset-0 rounded-xl bg-black pointer-events-none transition-opacity duration-300"
                          style={{ opacity: dim }}
                        />
                      )}

                      <button
                        id={buttonId}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        className="w-full flex items-center gap-3 sm:gap-4 justify-between px-4 sm:px-6 py-4 sm:py-5 text-left relative z-10 rounded-xl cursor-pointer"
                        onClick={() => setOpenIndex(isOpen ? null : faq.originalIndex)}
                      >
                        <div className="flex items-center gap-3 sm:gap-4">
                          <span
                            className={`hidden sm:flex w-9 h-9 rounded-full items-center justify-center shrink-0 transition-all duration-300 relative ${
                              isOpen ? 'bg-[hsl(17.14deg_96.08%_70%)] text-[#0F172A] scale-110 faq-bead-active' : 'bg-[hsl(17.14deg_96.08%_70%)]/15 text-[#0F172A]'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </span>
                          <div className="space-y-0.5">
                            <span className="text-[10px] font-heading font-bold uppercase tracking-widest text-[#9A3412]">
                              {faq.tag}
                            </span>
                            <h3 className="font-heading text-sm sm:text-base font-bold leading-snug transition-colors duration-300 text-[#0F172A]">
                              {faq.q}
                            </h3>
                          </div>
                        </div>

                        <ChevronDown
                          className={`w-4 h-4 sm:w-5 sm:h-5 text-[#0F172A] transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-[#9A3412]' : ''}`}
                        />
                      </button>

                      <div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        className={`grid relative z-10 transition-[grid-template-rows,opacity] duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div
                            className="px-4 sm:px-6 pb-4 sm:pb-6 sm:pl-[70px] transition-transform duration-300 ease-out space-y-3"
                            style={{ transform: isOpen ? 'translateY(0)' : 'translateY(-6px)' }}
                          >
                            <div className="h-px bg-[#F1F5F9] mb-3" />
                            <p className="font-body text-[#334155] font-medium text-xs sm:text-sm leading-relaxed">{faq.a}</p>

                            <div className="flex items-center justify-between pt-2 text-xs font-heading font-bold text-[#64748B] border-t border-[#F1F5F9]">
                              <span>Was this answer helpful?</span>
                              <button
                                onClick={() => handleHelpful(faq.originalIndex)}
                                disabled={isLiked}
                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                                  isLiked
                                    ? 'bg-[hsl(17.14deg_96.08%_70%)]/20 border-[hsl(17.14deg_96.08%_70%)] text-[#0F172A] font-bold'
                                    : 'bg-white border-[#E2D9CC] text-[#0F172A] hover:border-[hsl(17.14deg_96.08%_70%)]'
                                }`}
                              >
                                <ThumbsUp className="w-3.5 h-3.5 text-[hsl(17.14deg_96.08%_70%)]" />
                                <span>{isLiked ? 'Helpful' : 'Yes, helpful'}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Spacer so the last card can travel to its sticky position before section ends */}
              <div aria-hidden style={{ height: `${Math.max(filtered.length * STACK_OFFSET + 24, 60)}px` }} />
            </div>

            {/* RIGHT COLUMN: STICKY SIDEBAR */}
            <aside className="md:sticky md:top-24 md:self-start space-y-6">
              <div className="bg-white border border-[#E2D9CC] rounded-2xl sm:rounded-3xl p-5 sm:p-6 flex flex-col gap-5 shadow-lg">
                <div className="flex flex-col gap-2">
                  <div className="w-10 h-10 rounded-full bg-[hsl(17.14deg_96.08%_70%)]/20 flex items-center justify-center mb-1">
                    <MessageCircle className="w-5 h-5 text-[#0F172A]" />
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-[#0F172A]">Need personal guidance?</h3>
                  <p className="font-body text-[#334155] font-medium text-xs sm:text-sm leading-relaxed">
                    Our resident Vedic scholars and Acharyas are available to clarify your spiritual queries. We typically respond within 3–4 business hours.
                  </p>
                </div>

                <div className="flex flex-col gap-2.5 pt-3 border-t border-[#F1F5F9]">
                  <a href="tel:+9779715551396" className="flex items-center gap-2.5 text-xs sm:text-sm font-heading font-bold text-[#0F172A] hover:text-[#9A3412] transition-colors">
                    <Phone className="w-4 h-4 text-[hsl(17.14deg_96.08%_70%)] shrink-0" /> +977-9715551396
                  </a>
                  <p className="text-[10px] font-heading font-bold text-[#64748B] uppercase tracking-wider pl-6">
                    Available Mon-Sat, 10am - 6pm NPT
                  </p>
                </div>

                <div className="flex flex-col gap-3 pt-2">
                  <Link
                    href="/consultation"
                    className="w-full py-3 bg-[hsl(17.14deg_96.08%_70%)] text-[#0F172A] font-heading font-bold uppercase tracking-wider text-xs rounded-xl text-center shadow-md hover:brightness-105 transition-all"
                  >
                    Book 1:1 Consultation
                  </Link>

                  <Link
                    href="/customize-order"
                    className="w-full py-3 bg-[#0F172A] text-white border border-[#0F172A] font-heading font-bold uppercase tracking-wider text-xs rounded-xl text-center hover:bg-[hsl(17.14deg_96.08%_70%)] hover:text-[#0F172A] transition-all"
                  >
                    Custom Order Page
                  </Link>

                  <Link
                    href="/contact"
                    className="w-full py-2.5 border border-[#E2D9CC] text-[#0F172A] hover:border-[hsl(17.14deg_96.08%_70%)] text-xs font-heading font-bold uppercase tracking-wider rounded-xl text-center transition-colors"
                  >
                    Contact Support Team
                  </Link>
                </div>
              </div>
            </aside>

          </div>
        </section>

        {/* ── 3. BOTTOM CALLOUT BANNER ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0F172A] text-white rounded-3xl p-8 sm:p-12 border-2 border-[hsl(17.14deg_96.08%_70%)]/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-xs font-heading font-bold uppercase tracking-widest text-[hsl(17.14deg_96.08%_70%)]">
                [ EXPERT GUIDANCE ]
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                Not sure which Rudraksha is right for you?
              </h3>
              <p className="font-body text-sm sm:text-base text-[#CBD5E1] font-medium">
                Book a consultation with our spiritual advisors or reach out — we help you choose authentic beads with confidence.
              </p>
            </div>

            <Link
              href="/consultation"
              className="px-8 py-4 bg-[hsl(17.14deg_96.08%_70%)] text-[#0F172A] font-heading font-bold text-xs sm:text-sm uppercase tracking-widest rounded-xl shadow-md hover:brightness-110 transition-all shrink-0 text-center"
            >
              Book Consultation →
            </Link>
          </div>
        </section>

      </main>

      <Footer />
      <MenuDrawer />
      <SearchOverlay />
      <CartDrawer />
      <WishlistDrawer />
      <FloatingActions />
    </div>
  );
}