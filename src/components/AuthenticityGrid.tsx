import { GiShield, GiLotusFlower, GiAllSeeingEye, GiByzantinTemple } from 'react-icons/gi';
import { BadgeCheck, Microscope, Leaf, Award } from 'lucide-react';

const pillars = [
  {
    icon: Microscope,
    title: 'X-Ray Lab Certification',
    desc: 'Each bead undergoes a full non-destructive X-ray scan verifying mukhi count, seed density, and absence of artificial enhancement.',
    stat: '100%',
    statLabel: 'Certified Beads',
  },
  {
    icon: GiByzantinTemple,
    title: 'Pashupatinath Energization',
    desc: 'Every shipment is blessed in an ancient Vedic ceremony at Pashupatinath Temple, Kathmandu, by resident Vedic pandits.',
    stat: '51+',
    statLabel: 'Years of Practice',
  },
  {
    icon: Leaf,
    title: 'Arun Valley Sourcing',
    desc: 'We source directly from traditional Rudraksha growers in the Arun Valley of eastern Nepal — no middlemen, no adulteration.',
    stat: '3,800m',
    statLabel: 'Himalayan Altitude',
  },
  {
    icon: BadgeCheck,
    title: 'Certificate of Authenticity',
    desc: 'Every order includes a numbered, signed certificate with bead measurements, mukhi count, origin, and lab report reference.',
    stat: '12,000+',
    statLabel: 'Happy Seekers',
  },
];

const galleryImages = [
  {
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfC2TRS5fS7n0XeFQsEMJ5k0RlBQtFrGHs0-JeqBSZJEI_6usvXSlX-h0&s=10',
    label: 'Pashupatinath Temple',
  },
  {
    src: 'https://himalayarudraksh.online/cdn/shop/files/1-13-mukhi-shiv-shakti-rudraksha-mala-nepal-origin-499218.png?v=1750001216&width=3840',
    label: 'Siddha Mala Collection',
  },
  {
    src: 'https://wallpapercave.com/wp/wp2752142.jpg',
    label: 'Himalayan Origin',
  },
];

export function AuthenticityGrid() {
  return (
    <section className="py-14 sm:py-20 md:py-24 bg-[#faf7f4] relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-stars opacity-10 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange to-transparent opacity-30" />

      {/* OM Section Divider */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 px-4 pt-0 pb-6 sm:pb-8 relative z-10">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-orange to-transparent max-w-xs opacity-60" />
        <span className="text-orange text-xl sm:text-2xl font-serif opacity-80">ॐ</span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-orange to-transparent max-w-xs opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14 md:mb-20 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] font-heading font-bold uppercase tracking-widest text-orange border border-orange/30 bg-orange/5 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6">
            <GiShield className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Our Authenticity Promise
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-orange-gradient tracking-tight leading-tight mb-4 sm:mb-6 px-2">
            Trust, Verified at Every Step
          </h2>
          <p className="font-body text-navy/90 font-medium text-sm sm:text-base md:text-lg leading-relaxed px-2">
            In a market flooded with imitations, our four-pillar authentication system ensures every bead that reaches you is exactly what the Shiva Purana describes.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-16 md:mb-20">
          {pillars.map((p, i) => (
            <div key={i} className="group bg-white border border-navy/15 rounded-2xl shadow-sm p-6 sm:p-7 md:p-8 hover:border-orange hover:shadow-[0_0_30px_rgba(201,151,58,0.1)] transition-all duration-500 flex flex-col">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl border border-orange/25 bg-orange/10 flex items-center justify-center text-orange group-hover:bg-orange group-hover:text-navy-deep transition-colors duration-500 mb-5 sm:mb-6">
                <p.icon className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <h3 className="font-display text-lg sm:text-xl text-navy-deep font-bold mb-2.5 sm:mb-3 leading-tight group-hover:text-orange transition-colors">{p.title}</h3>
              <p className="font-body text-navy/85 text-xs sm:text-sm leading-relaxed flex-1 mb-5 sm:mb-6">{p.desc}</p>
              <div className="pt-4 sm:pt-5 border-t border-navy/10">
                <span className="font-display text-2xl sm:text-3xl text-orange font-bold block">{p.stat}</span>
                <span className="text-[9px] sm:text-[10px] font-heading font-bold uppercase tracking-widest text-navy/70">{p.statLabel}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Gallery Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {galleryImages.map((img, i) => (
            <div key={i} className={`relative overflow-hidden rounded-2xl border border-orange/20 group ${i === 1 ? 'md:row-span-1' : ''}`}>
              <div className="aspect-[4/3]">
                <img
                  src={img.src}
                  alt={img.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 brightness-75 group-hover:brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5">
                  <span className="text-[10px] sm:text-xs font-heading font-bold uppercase tracking-widest text-orange/80 border border-orange/30 bg-navy-deep/70 backdrop-blur px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full">
                    {img.label}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 sm:mt-14 md:mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 bg-white border border-orange/25 rounded-2xl shadow-md px-6 sm:px-8 md:px-10 py-6 sm:py-8 shadow-xl">
            <GiAllSeeingEye className="w-8 h-8 sm:w-10 sm:h-10 text-orange shrink-0" />
            <div className="text-center sm:text-left">
              <h4 className="font-display font-semibold  text-lg sm:text-xl text-orange mb-1">Still have doubts?</h4>
              <p className="font-body text-navy/60 font-semibold  text-xs sm:text-sm">Speak with our certified Vedic consultants before you buy — it's complimentary.</p>
            </div>
            <a href="#" className="shrink-0 px-6 sm:px-7 py-2.5 sm:py-3 bg-gradient-to-r from-orange to-orange-soft text-navy-deep font-heading font-bold uppercase tracking-widest text-[11px] sm:text-xs rounded-full hover:shadow-[0_0_20px_rgba(201,151,58,0.4)] transition-all w-full sm:w-auto">
              Book Free Call
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}