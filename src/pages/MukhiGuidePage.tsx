import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { mukhis } from '@/data/mukhi';
import { MukhiCardGrid } from '@/components/MukhiCardGrid';

export default function MukhiGuidePage() {
  return (
    <section className="py-14 sm:py-20 md:py-24 bg-navy-deep min-h-screen relative overflow-hidden">
      {/* OM Section Divider */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 px-4 pt-0 pb-6 sm:pb-8 relative z-10">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-orange to-transparent max-w-xs opacity-60" />
        <span className="text-orange text-xl sm:text-2xl font-serif opacity-80">ॐ</span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-orange to-transparent max-w-xs opacity-60" />
      </div>

      {/* Star field overlay */}
      <div className="absolute inset-0 bg-stars opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-orange/70 hover:text-orange font-heading text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-8 sm:mb-12 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          Back to Home
        </Link>

        <div className="text-center mb-12 sm:mb-16 md:mb-20 max-w-3xl mx-auto">
          <span className="text-[9px] sm:text-[10px] md:text-xs font-heading font-bold uppercase tracking-widest text-orange bg-orange/5 border border-orange/30 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full inline-block mb-4 sm:mb-6 shadow-[0_0_15px_rgba(201,151,58,0.2)]">
            Sacred Knowledge
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-display text-orange tracking-tight leading-tight px-2">
            The Complete Language of Mukhi
          </h2>
          <p className="text-peach/80 font-body text-sm sm:text-base md:text-lg leading-relaxed mt-4 sm:mt-6 px-4">
            All fourteen sacred configurations — their ruling deity, cosmic association, and metaphysical purpose, as described in the Shiva Purana.
          </p>
        </div>

        <MukhiCardGrid items={mukhis} />
      </div>
    </section>
  );
}