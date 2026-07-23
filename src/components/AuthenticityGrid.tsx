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
    <section className="py-14 sm:py-20 lg:py-24 bg-[#FAF7F2] relative overflow-hidden border-b border-[hsl(17.14deg_96.08%_70%)]/20">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-stars opacity-10 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[hsl(17.14deg_96.08%_70%)] to-transparent opacity-40" />

      {/* OM Section Divider */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 px-4 pt-0 pb-6 sm:pb-8 relative z-10">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[hsl(17.14deg_96.08%_70%)] to-transparent max-w-xs" />
        <span className="text-[hsl(17.14deg_96.08%_70%)] text-xl sm:text-2xl font-serif font-bold">ॐ</span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[hsl(17.14deg_96.08%_70%)] to-transparent max-w-xs" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14 md:mb-20 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] md:text-xs font-heading font-bold uppercase tracking-widest text-[#0F172A] bg-[hsl(17.14deg_96.08%_70%)] border border-[hsl(17.14deg_96.08%_70%)]/50 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6 shadow-sm">
            <GiShield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0F172A]" /> Our Authenticity Promise
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#1E293B] font-bold tracking-tight leading-tight mb-4 sm:mb-6 px-2">
            Trust, Verified at Every Step
          </h2>
          <p className="font-body text-[#334155] font-medium text-base sm:text-lg leading-relaxed px-2">
            In a market flooded with imitations, our four-pillar authentication system ensures every bead that reaches you is exactly what the Shiva Purana describes.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-16 md:mb-20">
          {pillars.map((p, i) => (
            <div key={i} className="group bg-white border border-[#E2D9CC] rounded-2xl shadow-sm p-6 sm:p-7 md:p-8 hover:border-[hsl(17.14deg_96.08%_70%)] hover:shadow-xl transition-all duration-300 flex flex-col">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl border border-[hsl(17.14deg_96.08%_70%)]/40 bg-[hsl(17.14deg_96.08%_70%)]/15 flex items-center justify-center text-[#1E293B] group-hover:bg-[hsl(17.14deg_96.08%_70%)] transition-colors duration-300 mb-5 sm:mb-6">
                <p.icon className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <h3 className="font-display text-lg sm:text-xl text-[#0F172A] font-bold mb-2.5 sm:mb-3 leading-tight group-hover:text-[hsl(17.14deg_96.08%_70%)] transition-colors">{p.title}</h3>
              <p className="font-body text-[#475569] font-medium text-xs sm:text-sm leading-relaxed flex-1 mb-5 sm:mb-6">{p.desc}</p>
              <div className="pt-4 sm:pt-5 border-t border-[#F1F5F9]">
                <span className="font-display text-2xl sm:text-3xl text-[hsl(17.14deg_96.08%_70%)] font-bold block">{p.stat}</span>
                <span className="text-[10px] sm:text-[11px] font-heading font-bold uppercase tracking-widest text-[#334155]">{p.statLabel}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Gallery Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {galleryImages.map((img, i) => (
            <div key={i} className={`relative overflow-hidden rounded-2xl border border-[hsl(17.14deg_96.08%_70%)]/30 group ${i === 1 ? 'md:row-span-1' : ''}`}>
              <div className="aspect-[4/3]">
                <img
                  src={img.src}
                  alt={img.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5">
                  <span className="text-[10px] sm:text-xs font-heading font-bold uppercase tracking-widest text-[#0F172A] border border-[hsl(17.14deg_96.08%_70%)]/50 bg-[hsl(17.14deg_96.08%_70%)] backdrop-blur px-3 py-1.5 rounded-full shadow-md">
                    {img.label}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 sm:mt-14 md:mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 bg-white border border-[#E2D9CC] rounded-2xl p-6 sm:p-8 md:px-10 py-6 sm:py-8 shadow-xl">
            <GiAllSeeingEye className="w-8 h-8 sm:w-10 sm:h-10 text-[hsl(17.14deg_96.08%_70%)] shrink-0" />
            <div className="text-center sm:text-left">
              <h4 className="font-display font-bold text-lg sm:text-xl text-[#0F172A] mb-1">Still have doubts?</h4>
              <p className="font-body text-[#334155] font-medium text-xs sm:text-sm">Speak with our certified Vedic consultants before you buy — it's complimentary.</p>
            </div>
            <a href="#" className="shrink-0 px-6 sm:px-7 py-3 bg-[hsl(17.14deg_96.08%_70%)] text-[#0F172A] font-heading font-bold uppercase tracking-widest text-[11px] sm:text-xs rounded-full hover:brightness-105 hover:shadow-md transition-all w-full sm:w-auto">
              Book Free Call
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}