import { useState } from 'react';
import { GiByzantinTemple, GiFlame, GiMoon, GiBookCover } from 'react-icons/gi';

const offerings = [
  {
    icon: GiByzantinTemple,
    title: 'Rare Bead Arrivals',
    desc: 'First access to naturally-formed, high-mukhi and collector-grade beads sourced from Nepal, before they reach our shelves.',
  },
  {
    icon: GiMoon,
    title: 'Panchang & Muhurta Alerts',
    desc: 'Auspicious tithis for energization, mala-wearing, and abhishekam — timed to the lunar calendar and Vedic panchang.',
  },
  {
    icon: GiBookCover,
    title: 'Wisdom from Our Scholars',
    desc: 'Short teachings on mantra, mukhi significance, and the Shiva Purana, shared by our resident Vedic pandits.',
  },
];

export function Newsletter() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="py-14 sm:py-20 md:py-24 bg-navy-light relative overflow-hidden">
      {/* OM Section Divider */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 px-4 pt-0 pb-6 sm:pb-8 relative z-10">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-orange to-transparent max-w-xs opacity-60" />
        <span className="text-orange text-xl sm:text-2xl font-serif opacity-80">ॐ</span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-orange to-transparent max-w-xs opacity-60" />
      </div>

      {/* Himalayan misty peaks background */}
      <div 
        className="absolute inset-0 opacity-[0.7] bg-cover bg-center"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1920&q=80")' }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/45 via-navy-deep/10 to-navy-deep/30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-navy border border-orange/30 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 relative">
          
          {/* Giant decorative OM watermark */}
          <div className="absolute -top-6 -right-6 sm:-top-10 sm:-right-10 text-[160px] sm:text-[220px] md:text-[300px] text-orange/5 font-serif select-none pointer-events-none leading-none">
            ॐ
          </div>

          {/* Left/Top Content & Form Area */}
          <div className="p-6 sm:p-8 md:p-12 lg:p-16 lg:col-span-7 flex flex-col justify-between relative z-10 bg-navy-deep/80 backdrop-blur border-r border-orange/10">
            <div>
              <span className="flex items-center gap-2 text-[9px] sm:text-[10px] md:text-xs font-heading font-bold uppercase tracking-widest text-orange mb-4 sm:mb-6">
                <span className="w-6 sm:w-8 h-px bg-orange"></span>
                Parivar · Our Sacred Circle
              </span>
              <h2
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display tracking-tight leading-tight mb-4 sm:mb-6"
                style={{ color: 'hsl(17.84deg 72.55% 90%)' }}
              >
                Join Our Spiritual Circle
              </h2>
              <p className="text-peach/80 font-body text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mb-8 sm:mb-12">
                Receive updates on rare bead arrivals, auspicious days for energization, and exclusive insights from
                our Vedic scholars — a quiet correspondence rooted in tradition, sent only when it truly matters.
              </p>

              {/* Dynamic Subscription State Area */}
              {submitted ? (
                <div className="bg-orange/10 p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border border-orange/30 max-w-md animate-in zoom-in duration-500 shadow-sacred-glow">
                  <GiFlame className="w-8 h-8 sm:w-10 sm:h-10 text-orange mb-3 sm:mb-4" />
                  <span className="block text-lg sm:text-xl md:text-2xl font-display text-orange mb-2">
                    Namaste! You've joined our sacred circle 
                  </span>
                  <span className="block text-xs sm:text-sm font-body text-peach-soft/90 leading-relaxed">
                    Watch your inbox for our next Panchang update and rare bead arrival notification.
                  </span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    className="flex-1 px-5 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-body rounded-full border border-orange/40 bg-navy/50 placeholder:text-peach/40 focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange text-peach shadow-inner"
                  />
                  <button
                    type="submit"
                    className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-orange to-orange-soft text-navy-deep font-heading font-bold text-[10px] sm:text-xs uppercase tracking-widest rounded-full transition-all hover:shadow-sacred-glow whitespace-nowrap"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>

            <div className="mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-orange/10 flex flex-col sm:flex-row gap-4 sm:gap-6 sm:items-center text-[10px] sm:text-xs font-heading tracking-widest text-orange/60 uppercase">
              <span>Trusted by 12,000+ seekers</span>
              <span className="hidden sm:block w-1.5 h-1.5 rounded-full bg-orange/30"></span>
              <span>Cancel anytime</span>
            </div>
          </div>

          {/* Right Panel - Offerings */}
          <div className="lg:col-span-5 p-6 sm:p-8 md:p-12 relative z-10 flex flex-col justify-center bg-navy/60">
            <div className="space-y-4 sm:space-y-6">
              {offerings.map((o) => {
                const IconComponent = o.icon;
                return (
                  <div
                    key={o.title}
                    className="bg-navy-deep border border-orange/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-md group hover:border-orange/50 transition-all duration-300"
                  >
                    <div className="flex items-start gap-3 sm:gap-5">
                      <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-orange/30 bg-navy flex items-center justify-center text-orange group-hover:bg-orange group-hover:text-navy transition-colors shrink-0 shadow-inner">
                        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                      </span>
                      <div>
                        <h3 className="font-display text-base sm:text-lg md:text-xl text-orange mb-1.5 sm:mb-2">
                          {o.title}
                        </h3>
                        <p className="text-xs sm:text-sm font-body text-peach/70 leading-relaxed">
                          {o.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}