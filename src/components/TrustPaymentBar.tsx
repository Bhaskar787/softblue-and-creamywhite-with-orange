import { ShieldCheck, BadgeCheck, HeartHandshake, Globe2, Star } from 'lucide-react';
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCcApplePay,
  FaCcAmex,
} from 'react-icons/fa';
import { SiGooglepay, SiRazorpay, SiPaytm, SiShopify } from 'react-icons/si';

const paymentMethods = [
  { name: 'Visa', icon: FaCcVisa, color: '#1A1F71' },
  { name: 'Mastercard', icon: FaCcMastercard, color: '#EB001B' },
  { name: 'RuPay', icon: null }, // no packaged glyph available — rendered as a brand-coloured text mark
  { name: 'UPI', icon: null }, // no packaged glyph available — rendered as a brand-coloured text mark
  { name: 'Razorpay', icon: SiRazorpay, color: '#0C2451' },
  { name: 'Paytm', icon: SiPaytm, color: '#00BAF2' },
  { name: 'American Express', icon: FaCcAmex, color: '#006FCF' },
  { name: 'Apple Pay', icon: FaCcApplePay, color: '#000000' },
  { name: 'Google Pay', icon: SiGooglepay, color: '#4285F4' },
  { name: 'PayPal', icon: FaCcPaypal, color: '#003087' },
  { name: 'Shop Pay', icon: SiShopify, color: '#5A31F4' },
];

const trustBadges = [
  {
    icon: ShieldCheck,
    title: 'Secure Payment',
    desc: 'Encrypted & Safe Checkout',
  },
  {
    icon: BadgeCheck,
    title: 'ISO 9001 Compliant Operation',
    desc: 'Certified. Verified. Trusted.',
  },
  {
    icon: HeartHandshake,
    title: 'Consumer-Centric Care',
    desc: 'Designed with your well-being and transformation in mind.',
  },
  {
    icon: Globe2,
    title: 'Safe & Secure Worldwide Shipping',
    desc: 'Tracked delivery to your doorstep.',
  },
];

export function TrustPaymentBar() {
  return (
    <section
      className="relative border-y border-orange/20 overflow-hidden"
      style={{ backgroundColor: 'hsl(24deg 33.33% 97.06%)' }}
    >
      {/* Payment methods marquee strip — single bordered bar, full width, medium height, now plain white */}
      <div className="w-full ">
        <div className="relative border-y border-orange/30 bg-white overflow-hidden shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-16 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-16 bg-gradient-to-l from-white to-transparent z-10" />

          <div className="flex animate-marquee whitespace-nowrap items-center py-3">
            {[...paymentMethods, ...paymentMethods].map((method, i) => (
              <div
                key={i}
                className="flex items-center gap-2 shrink-0 mx-2.5 px-4 py-1.5 rounded-lg text-navy-deep font-heading text-xs tracking-wide"
              >
                {method.icon ? (
                  <method.icon className="w-5 h-5 shrink-0" style={{ color: method.color }} />
                ) : method.name === 'RuPay' ? (
                  <span className="w-6 h-5 shrink-0 rounded bg-gradient-to-r from-[#0f4c81] to-[#f47b20] text-white flex items-center justify-center text-[7px] font-bold tracking-tighter">
                    RuPay
                  </span>
                ) : (
                  <span className="w-6 h-5 shrink-0 rounded bg-gradient-to-r from-[#ed752e] to-[#0c8b51] text-white flex items-center justify-center text-[8px] font-bold tracking-tighter">
                    UPI
                  </span>
                )}
                <span>{method.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* OM Divider — between payment loop bar and Store Rating */}
      <div className="flex items-center justify-center gap-4 px-4 py-5">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-orange to-transparent max-w-xs opacity-60" />
        <span className="text-orange text-2xl font-serif opacity-80">ॐ</span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-orange to-transparent max-w-xs opacity-60" />
      </div>

      {/* Store rating */}
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col items-center text-center border-b border-orange/10">
        <span className="text-[11px] font-heading font-bold uppercase tracking-[0.3em] text-navy/60 mb-3">
          Store Rating
        </span>
        <div className="flex items-center gap-3">
          <span className="text-4xl md:text-5xl font-display text-orange-gradient">4.9</span>
          <div className="flex flex-col items-start gap-1">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-orange text-orange" />
              ))}
            </div>
            <span className="text-xs font-heading tracking-widest text-navy/60 uppercase">
              1.6K+ Customer Reviews
            </span>
          </div>
        </div>
      </div>

      {/* Trust badges grid */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
        {trustBadges.map((badge) => (
          <div key={badge.title} className="flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 rounded-full border border-orange/30 flex items-center justify-center text-orange">
              <badge.icon className="w-7 h-7" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm md:text-base uppercase tracking-wider text-navy mb-1.5">
                {badge.title}
              </h4>
              <p className="text-navy/60 font-body text-xs md:text-sm leading-relaxed max-w-[220px]">
                {badge.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}