import { useState } from 'react';
import { GiMeditation, GiLotusFlower, GiByzantinTemple } from 'react-icons/gi';
import { ArrowRight, CheckCircle } from 'lucide-react';

// Scattered "night sky" dots — fixed positions so the field doesn't shift on re-render.
// Rendered in a soft orange rather than cream so they stay visible on the light section bg.
const stars = [
  { x: 42, y: 68, r: 1.6, o: 0.55 }, { x: 118, y: 140, r: 1.1, o: 0.35 }, { x: 210, y: 54, r: 1.8, o: 0.5 },
  { x: 300, y: 200, r: 1.2, o: 0.3 }, { x: 60, y: 300, r: 1.4, o: 0.4 }, { x: 160, y: 380, r: 1.1, o: 0.3 },
  { x: 340, y: 340, r: 1.6, o: 0.45 }, { x: 30, y: 460, r: 1.2, o: 0.35 }, { x: 250, y: 470, r: 1.8, o: 0.5 },
  { x: 380, y: 120, r: 1.1, o: 0.3 }, { x: 470, y: 250, r: 1.5, o: 0.4 }, { x: 550, y: 90, r: 1.2, o: 0.35 },
  { x: 620, y: 200, r: 1.7, o: 0.5 }, { x: 700, y: 340, r: 1.1, o: 0.3 }, { x: 760, y: 150, r: 1.4, o: 0.4 },
  { x: 660, y: 460, r: 1.2, o: 0.3 }, { x: 500, y: 420, r: 1.6, o: 0.45 }, { x: 90, y: 560, r: 1.3, o: 0.35 },
  { x: 420, y: 580, r: 1.1, o: 0.3 }, { x: 580, y: 560, r: 1.5, o: 0.4 }, { x: 730, y: 540, r: 1.2, o: 0.35 },
  { x: 200, y: 620, r: 1.7, o: 0.5 }, { x: 350, y: 40, r: 1.1, o: 0.3 }, { x: 460, y: 60, r: 1.3, o: 0.35 },
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

function AstroBackground() {
  const cx = 400;
  const cy = 400;
  const orbitRadii = [140, 230, 320];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Warm orange glow wash instead of the previous dark navy/red mix */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 20% 20%, rgba(201,151,58,0.08), transparent 55%), radial-gradient(ellipse at 85% 75%, rgba(201,151,58,0.10), transparent 55%)',
        }}
      ></div>

      <svg viewBox="0 0 800 700" className="absolute inset-0 w-full h-full opacity-90">
        {stars.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#C9973A" opacity={s.o} className="animate-star-twinkle" style={{ animationDelay: `${(i % 6) * 0.6}s` }} />
        ))}
        <polyline points="42,68 118,140 210,54" fill="none" stroke="#C9973A" strokeWidth="0.5" opacity="0.2" />
        <polyline points="620,200 700,340 660,460" fill="none" stroke="#C9973A" strokeWidth="0.5" opacity="0.2" />
      </svg>

      {/* Orbit ring — orange on white/cream now, so the glyphs read clearly instead of
          disappearing as dark-on-dark against a light section */}
      <svg viewBox="0 0 800 800" className="absolute -right-16 -top-10 w-[620px] h-[620px] md:w-[720px] md:h-[720px] opacity-[0.22]">
        {orbitRadii.map((r) => (
          <circle key={r} cx={cx} cy={cy} r={r} fill="none" stroke="#C9973A" strokeWidth="1" />
        ))}
        {navagraha.map((g, i) => {
          const r = orbitRadii[i % orbitRadii.length];
          const rad = (g.angle * Math.PI) / 180;
          const x = cx + r * Math.cos(rad);
          const y = cy + r * Math.sin(rad);
          return (
            <g key={g.name}>
              <circle cx={x} cy={y} r="16" fill="#FDF3E3" stroke="#C9973A" strokeWidth="1.4" />
              <text x={x} y={y + 5} textAnchor="middle" fontSize="15" fill="#B36A1E" fontFamily="serif">
                {g.label}
              </text>
            </g>
          );
        })}
      </svg>

      <svg viewBox="0 0 400 400" className="absolute left-[-60px] bottom-[-60px] w-[380px] h-[380px] opacity-[0.10]">
        <rect x="20" y="20" width="360" height="360" fill="none" stroke="#C9973A" strokeWidth="1.5" />
        <polyline points="20,20 380,380" fill="none" stroke="#C9973A" strokeWidth="1.2" />
        <polyline points="380,20 20,380" fill="none" stroke="#C9973A" strokeWidth="1.2" />
        <polyline points="200,20 20,200 200,380 380,200 200,20" fill="none" stroke="#C9973A" strokeWidth="1.2" />
      </svg>
    </div>
  );
}

const steps = [
  { n: '01', icon: GiMeditation, title: 'Share Your Intention', desc: 'Tell us your goal — spiritual, material, health, or protection. Our consultants will match your intention to the right mukhi combination.' },
  { n: '02', icon: GiByzantinTemple, title: 'Astrological Assessment', desc: 'We analyse your birth chart and planetary positions to identify the most potent Rudraksha configuration for your current life phase.' },
  { n: '03', icon: GiLotusFlower, title: 'Sacred Crafting & Energization', desc: 'Your combination is hand-strung using red silk or silver wire, then energized under your name in a personal Vedic ceremony.' },
];

const intentions = [
  'Spiritual Growth & Meditation', 'Wealth & Business Prosperity', 'Health & Physical Vitality',
  'Protection & Negative Energy Shield', 'Marital Harmony & Relationships', 'Academic Success & Concentration',
  'Career Advancement & Leadership', 'Emotional Healing & Inner Peace',
];

export function CustomizeOrder() {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="py-14 sm:py-20 md:py-24 bg-[#faf7f4] relative overflow-hidden border-y border-orange/10">
      {/* Background GIF dialed way down and layered under a near-opaque scrim so it reads
          as faint texture instead of fighting the copy for attention */}
      <div
        className="absolute inset-0 opacity-[0.08] bg-cover bg-center"
        style={{ backgroundImage: 'url("https://i.pinimg.com/originals/37/8f/19/378f19b15998a4e990d19cf4b43b10eb.gif")' }}
      />
      <div className="absolute inset-0 bg-[#faf7f4]/90 pointer-events-none" />
      <AstroBackground />

      <div className="flex items-center justify-center gap-3 sm:gap-4 px-4 pt-0 pb-6 sm:pb-8 relative z-10">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-orange to-transparent max-w-xs opacity-60" />
        <span className="text-orange text-xl sm:text-2xl font-serif opacity-80">ॐ</span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-orange to-transparent max-w-xs opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 md:mb-20">
          <span className="inline-block text-[9px] sm:text-[10px] font-heading font-bold uppercase tracking-widest text-orange border border-orange/30 bg-orange/5 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6">
            Bespoke Sacred Craft · By Appointment
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-orange-gradient tracking-tight leading-tight mb-4 sm:mb-6 px-2">
            Your Personal Rudraksha Combination
          </h2>
          <p className="font-body text-navy/85 text-sm sm:text-base md:text-lg leading-relaxed px-2">
            No two seekers are identical. Our Vedic experts custom-design each mala or combination based on a careful reading of your birth chart, dominant planets, and the specific transformation you are seeking — precise, considered, and made for you alone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 sm:mb-16 md:mb-20 relative">
          <div className="hidden md:block absolute top-10 left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-transparent via-orange/30 to-transparent pointer-events-none" />
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center relative">
              <div className="relative mb-6 sm:mb-8">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-orange/40 bg-orange/10 flex items-center justify-center text-orange shadow-[0_0_15px_rgba(201,151,58,0.08)]">
                  <step.icon className="w-7 h-7 sm:w-9 sm:h-9" />
                </div>
                <span className="absolute -top-2 -right-2 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-orange text-white text-[9px] sm:text-[10px] font-heading font-bold flex items-center justify-center border-2 border-white">
                  {step.n}
                </span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl text-orange mb-3 sm:mb-4">{step.title}</h3>
              <p className="font-body text-navy/75 text-xs sm:text-sm leading-relaxed max-w-xs">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-white border border-orange/20 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl relative">
          <div className="absolute inset-0 bg-mandala opacity-[0.04] pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-2 relative z-10">
            <div className="p-6 sm:p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-orange/15">
              <h3 className="font-display text-xl sm:text-2xl text-orange mb-2">Choose Your Intention</h3>
              <p className="font-body text-navy/70 text-xs sm:text-sm mb-6 sm:mb-8">Select the life area you most want to strengthen:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                {intentions.map((intention) => (
                  <button
                    key={intention}
                    onClick={() => setSelected(intention)}
                    className={`flex items-center gap-2.5 sm:gap-3 text-left px-3.5 sm:px-4 py-3 sm:py-3.5 rounded-xl border text-xs sm:text-sm font-heading transition-all duration-200 ${
                      selected === intention
                        ? 'border-orange bg-orange/10 text-orange shadow-[0_0_15px_rgba(201,151,58,0.15)]'
                        : 'border-orange/40 text-navy/85 hover:border-orange/70 hover:text-navy bg-orange/[0.06]'
                    }`}
                  >
                    {selected === intention
                      ? <CheckCircle className="w-4 h-4 text-orange shrink-0" />
                      : <span className="w-4 h-4 rounded-full border border-orange/40 shrink-0" />}
                    {intention}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 sm:p-8 md:p-12 flex flex-col">
              <h3 className="font-display text-xl sm:text-2xl text-orange mb-2">Request Your Custom Mala</h3>
              <p className="font-body text-navy/70 text-xs sm:text-sm mb-6 sm:mb-8">Fill in a few details and our Vedic expert will contact you within 24 hours.</p>

              {submitted ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 sm:gap-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-orange bg-orange/10 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-orange" />
                  </div>
                  <div>
                    <h4 className="font-display text-xl sm:text-2xl text-orange mb-2">Request Received!</h4>
                    <p className="font-body text-navy/75 text-xs sm:text-sm leading-relaxed max-w-xs mx-auto">
                      Our Vedic consultant will reach out within 24 hours to begin your personal consultation.
                    </p>
                  </div>
                </div>
              ) : (
                <form className="flex flex-col gap-4 sm:gap-5 flex-1" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[9px] sm:text-[10px] font-heading uppercase tracking-widest text-orange block mb-2">Full Name</label>
                      <input type="text" required placeholder="Your name" className="w-full bg-white border border-orange/25 rounded-lg px-4 py-3 text-xs sm:text-sm font-body text-navy placeholder:text-navy/40 focus:outline-none focus:border-orange transition-colors" />
                    </div>
                    <div>
                      <label className="text-[9px] sm:text-[10px] font-heading uppercase tracking-widest text-orange block mb-2">Phone / WhatsApp</label>
                      <input type="tel" placeholder="+91 ..." className="w-full bg-white border border-orange/25 rounded-lg px-4 py-3 text-xs sm:text-sm font-body text-navy placeholder:text-navy/40 focus:outline-none focus:border-orange transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[9px] sm:text-[10px] font-heading uppercase tracking-widest text-orange block mb-2">Date of Birth</label>
                    <input type="date" className="w-full bg-white border border-orange/25 rounded-lg px-4 py-3 text-xs sm:text-sm font-body text-navy focus:outline-none focus:border-orange transition-colors" />
                  </div>
                  <div>
                    <label className="text-[9px] sm:text-[10px] font-heading uppercase tracking-widest text-orange block mb-2">
                      Selected Intention {selected && <span className="text-orange normal-case tracking-normal">— {selected}</span>}
                    </label>
                    <textarea rows={3} placeholder="Describe what you're seeking in more detail (optional)…" className="w-full bg-white border border-orange/25 rounded-lg px-4 py-3 text-xs sm:text-sm font-body text-navy placeholder:text-navy/40 focus:outline-none focus:border-orange transition-colors resize-none" />
                  </div>
                  <button type="submit" className="mt-auto w-full py-3.5 sm:py-4 bg-gradient-to-r from-orange to-orange-soft text-white font-heading font-bold uppercase tracking-widest text-xs sm:text-sm rounded-xl hover:shadow-[0_0_25px_rgba(201,151,58,0.4)] transition-all flex items-center justify-center gap-2">
                    Request Custom Mala <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}