import { useEffect } from 'react';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MenuDrawer } from '@/components/MenuDrawer';
import { CartDrawer } from '@/components/CartDrawer';
import { WishlistDrawer } from '@/components/WishlistDrawer';
import { SearchOverlay } from '@/components/SearchOverlay';
import { FloatingActions } from '@/components/FloatingActions';
import { TrustPaymentBar } from '@/components/TrustPaymentBar';
import { Link } from 'wouter';
import { ChevronRight, ArrowLeft, BookOpen, Sparkles } from 'lucide-react';
import { mukhis } from '@/data/mukhi';
import { MukhiCardGrid } from '@/components/MukhiCardGrid';

export default function MukhiGuidePage() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-navy-deep text-navy">
      {/* Top Header & Navigation */}
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 bg-navy-deep">
        {/* Breadcrumb Navigation */}
        <div className="bg-navy-deep text-peach py-4 border-b border-orange/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs font-heading uppercase tracking-widest text-peach/75 overflow-x-auto whitespace-nowrap hide-scrollbar">
            <Link href="/" className="hover:text-orange transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-orange/60" />
            <span className="text-orange font-bold">1 to 14 Mukhi Sacred Guide</span>
          </div>
        </div>

        {/* Main Mukhi Guide Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-navy-deep relative overflow-hidden">
          {/* Star field & Mandala Watermark */}
          <div className="absolute inset-0 bg-stars opacity-20 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[900px] aspect-square bg-mandala opacity-5 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-orange/80 hover:text-orange font-heading text-xs font-bold uppercase tracking-widest mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>

            {/* Header Description */}
            <div className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-heading font-bold uppercase tracking-[0.2em] text-orange bg-orange/10 border border-orange/30 px-4 py-1.5 rounded-full mb-4 shadow-[0_0_15px_rgba(201,151,58,0.2)]">
                <BookOpen className="w-3.5 h-3.5 text-orange" />
                Shiva Purana Knowledge
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display text-orange tracking-tight leading-tight">
                The Complete Language of Mukhi
              </h1>
              <p className="text-peach/85 font-body text-sm sm:text-base md:text-lg leading-relaxed mt-4 sm:mt-6 px-2">
                Discover all fourteen sacred configurations — their ruling deity, cosmic association, ruling planet, and metaphysical purpose as described in ancient Vedic scriptures.
              </p>
            </div>

            {/* Mukhi Card Grid Component */}
            <MukhiCardGrid items={mukhis} />
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />

      {/* Global Drawers & Overlays */}
      <MenuDrawer />
      <SearchOverlay />
      <CartDrawer />
      <WishlistDrawer />
      <FloatingActions />
    </div>
  );
}