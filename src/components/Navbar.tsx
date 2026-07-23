import { useUI } from '@/context/UIContext';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { Menu, Search, Heart, ShoppingBag, User, ChevronDown, Sparkles, BookOpen, Layers, Mail, HelpCircle } from 'lucide-react';
import { Link } from 'wouter';
import { useState, useEffect } from 'react';
import { GiLotus, GiFlame, GiBowlSpiral, GiGemNecklace, GiByzantinTemple, GiSun } from 'react-icons/gi';
import { MdDesignServices } from "react-icons/md";

export function Navbar() {
  const { setIsMenuOpen, setIsSearchOpen } = useUI();
  const { setIsCartOpen, cartCount } = useCart();
  const { setIsWishlistOpen, wishlistCount } = useWishlist();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link
      href={href}
      className="relative py-2 text-[10px] lg:text-[11px] xl:text-xs font-heading font-medium text-[#F5E6DA]/90 hover:text-[#E07A5F] transition-colors group whitespace-nowrap shrink-0"
    >
      {children}
      <span
        className="absolute left-0 bottom-0 h-[1px] w-0 bg-[#E07A5F] transition-all duration-300 group-hover:w-full"
        style={{ boxShadow: '0 0 8px #E07A5F' }}
      ></span>
    </Link>
  );

  // Mukhi numbers for the Rudraksha Beads dropdown grid
  const mukhiList = [1, 2, 3, 5, 6, 8, 9, 10, 11, 7, 12];

  return (
    <header
      className={`sticky top-0 z-[100] w-full transition-all duration-300 border-b ${
        scrolled
          ? 'bg-gradient-to-r from-[#070D13]/95 via-[#0A141D]/95 to-[#070D13]/95 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.6)] border-[#E07A5F]/25'
          : 'bg-gradient-to-r from-[#091118] via-[#0D1924] to-[#0B151F] border-[#E07A5F]/15'
      }`}
    >
      {/* Subtle top ambient warmth line matching hero fire accents */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#E07A5F]/30 to-transparent pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-2 sm:px-4 lg:px-4 xl:px-8 flex items-center justify-between h-16 sm:h-20 gap-1.5 sm:gap-4 lg:gap-3 xl:gap-6 relative z-10">

        {/* LEFT: Menu Button + Brand Logo */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-1.5 sm:p-2 -ml-1 sm:-ml-2 text-[#E07A5F] hover:text-[#F29E85] transition-colors focus:outline-none shrink-0"
            aria-label="Open Menu"
          >
            <Menu className="w-5 h-5 sm:w-7 sm:h-7" />
          </button>

          <Link href="/" className="flex items-center gap-1.5 sm:gap-3 group shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 xl:w-11 xl:h-11 rounded-full border border-[#E07A5F]/50 overflow-hidden flex items-center justify-center p-1 relative shrink-0 shadow-[0_0_12px_rgba(224,122,95,0.25)]">
              <div className="absolute inset-0 bg-[#E07A5F]/10 rounded-full animate-pulse"></div>
              <img
                src="https://res.cloudinary.com/deiusxdk9/image/upload/v1771952737/rudrantra/cms/rswcale9xcfa697s2kvw.png"
                alt="Rudrantra Logo"
                className="w-full h-full object-cover rounded-full mix-blend-screen"
              />
            </div>
            <span className="font-display text-base sm:text-lg lg:text-lg xl:text-2xl font-bold tracking-widest bg-gradient-to-r from-[#F5E6DA] via-[#E07A5F] to-[#D48C46] bg-clip-text text-transparent whitespace-nowrap">
              Rudrantra
            </span>
          </Link>
        </div>

        {/* CENTER: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center justify-center gap-1 lg:gap-1.5 xl:gap-5 shrink">

          {/* RUDRAKSHA BEADS — MUKHI GRID MEGA DROPDOWN */}
          <div className="relative group cursor-pointer py-2 shrink-0">
            <button className="text-[10px] lg:text-[10.5px] xl:text-xs font-heading font-medium text-[#F5E6DA]/90 group-hover:text-[#E07A5F] transition-colors flex items-center gap-0.5 xl:gap-1 whitespace-nowrap">
              <span>Rudraksha Beads</span>
              <ChevronDown className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180 text-[#E07A5F]" />
            </button>

            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-50">
              <div className="bg-[#0A131C] border border-[#E07A5F]/35 shadow-[0_20px_50px_rgba(0,0,0,0.85)] rounded-2xl p-5 sm:p-6 w-[480px] relative overflow-hidden backdrop-blur-xl">
                <div className="absolute inset-0 bg-mandala opacity-5 pointer-events-none" />

                {/* Header */}
                <div className="relative z-10 mb-4">
                  <span className="text-[10px] font-heading font-bold uppercase tracking-[0.2em] text-[#E07A5F]">
                    Shop Collection
                  </span>
                  <h3 className="font-display text-xl text-[#F5E6DA] font-bold mt-1">
                    Rudraksha Beads
                  </h3>
                  <p className="text-[11px] font-body text-[#F5E6DA]/60 mt-1">
                    Choose by mukhi count — lab-tested beads sourced with care.
                  </p>
                </div>

                {/* Mukhi Grid */}
                <div className="relative z-10 grid grid-cols-4 gap-2.5">
                  {mukhiList.map((mukhi) => (
                    <Link
                      key={mukhi}
                      href={`/all-products?category=Rudraksha&mukhi=${mukhi}`}
                      className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl border border-[#E07A5F]/20 hover:border-[#E07A5F]/60 hover:bg-[#12202E] transition-all group/mukhi"
                    >
                      <div className="w-8 h-8 rounded-full bg-[#E07A5F]/15 border border-[#E07A5F]/30 text-[#E07A5F] flex items-center justify-center text-xs font-heading font-bold group-hover/mukhi:bg-[#E07A5F] group-hover/mukhi:text-[#0A131C] group-hover/mukhi:scale-110 transition-all">
                        {mukhi}
                      </div>
                      <span className="text-[11px] font-heading font-semibold text-[#F5E6DA] group-hover/mukhi:text-[#E07A5F] text-center leading-tight">
                        {mukhi} Mukhi
                      </span>
                      <span className="text-[8px] font-body uppercase tracking-wider text-[#E07A5F]/70">
                        Rudraksha
                      </span>
                    </Link>
                  ))}
                </div>

                {/* View All Button */}
                <Link
                  href="/all-products?category=Rudraksha"
                  className="relative z-10 mt-4 w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#E07A5F] text-[#0A131C] font-heading font-bold text-xs uppercase tracking-wider hover:bg-[#F29E85] transition-colors shadow-lg shadow-[#E07A5F]/20"
                >
                  View all Rudraksha Beads
                  <ChevronDown className="w-3.5 h-3.5 -rotate-90" />
                </Link>
              </div>
            </div>
          </div>

          {/* SACRED CATEGORIES TOOLTIP MEGA DROPDOWN */}
          <div className="relative group cursor-pointer py-2 shrink-0">
            <button className="text-[10px] lg:text-[11px] xl:text-xs font-heading font-medium text-[#F5E6DA]/90 group-hover:text-[#E07A5F] transition-colors flex items-center gap-0.5 xl:gap-1 whitespace-nowrap">
              <span>Sacred Categories</span>
              <ChevronDown className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180 text-[#E07A5F]" />
            </button>

            {/* Tooltip Mega Dropdown Box */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-50">
              <div className="bg-[#0A131C] border border-[#E07A5F]/35 shadow-[0_20px_50px_rgba(0,0,0,0.85)] rounded-2xl p-4 sm:p-5 w-[520px] grid grid-cols-2 gap-3 relative overflow-hidden backdrop-blur-xl">
                <div className="absolute inset-0 bg-mandala opacity-5 pointer-events-none" />

                {/* Category 1: Rudraksha & Variants */}
                <Link
                  href="/all-products?category=Rudraksha %26 Variants"
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#12202E] transition-colors border border-transparent hover:border-[#E07A5F]/30 group/item"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#E07A5F]/15 border border-[#E07A5F]/30 text-[#E07A5F] flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform">
                    <GiLotus className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-heading font-bold text-[#E07A5F] group-hover/item:text-[#F29E85]">
                      Rudraksha & Variants
                    </h4>
                    <p className="text-[10px] font-body text-[#F5E6DA]/70 line-clamp-1 mt-0.5">
                      Beads, Mala, Siddha Mala & Bracelets
                    </p>
                  </div>
                </Link>

                {/* Category 2: Saligram */}
                <Link
                  href="/all-products?category=Saligram"
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#12202E] transition-colors border border-transparent hover:border-[#E07A5F]/30 group/item"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#E07A5F]/15 border border-[#E07A5F]/30 text-[#E07A5F] flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform">
                    <GiByzantinTemple className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-heading font-bold text-[#E07A5F] group-hover/item:text-[#F29E85]">
                      Gandaki Saligram
                    </h4>
                    <p className="text-[10px] font-body text-[#F5E6DA]/70 line-clamp-1 mt-0.5">
                      Lakshmi Narayan & Sudarshan Shila
                    </p>
                  </div>
                </Link>

                {/* Category 3: Shankha & Ghanti */}
                <Link
                  href="/all-products?category=Shankha %26 Ghanti"
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#12202E] transition-colors border border-transparent hover:border-[#E07A5F]/30 group/item"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#E07A5F]/15 border border-[#E07A5F]/30 text-[#E07A5F] flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-heading font-bold text-[#E07A5F] group-hover/item:text-[#F29E85]">
                      Shankha & Ghanti
                    </h4>
                    <p className="text-[10px] font-body text-[#F5E6DA]/70 line-clamp-1 mt-0.5">
                      Vamavarti Conch & Panchdhatu Bell
                    </p>
                  </div>
                </Link>

                {/* Category 4: Singing Bowl */}
                <Link
                  href="/all-products?category=Singing Bowl"
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#12202E] transition-colors border border-transparent hover:border-[#E07A5F]/30 group/item"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#E07A5F]/15 border border-[#E07A5F]/30 text-[#E07A5F] flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform">
                    <GiBowlSpiral className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-heading font-bold text-[#E07A5F] group-hover/item:text-[#F29E85]">
                      Singing Bowls
                    </h4>
                    <p className="text-[10px] font-body text-[#F5E6DA]/70 line-clamp-1 mt-0.5">
                      7 Chakra Hand-Beaten Healing Bowls
                    </p>
                  </div>
                </Link>

                {/* Category 5: Gemstones */}
                <Link
                  href="/all-products?category=Gemstone"
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#12202E] transition-colors border border-transparent hover:border-[#E07A5F]/30 group/item"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#E07A5F]/15 border border-[#E07A5F]/30 text-[#E07A5F] flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform">
                    <GiGemNecklace className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-heading font-bold text-[#E07A5F] group-hover/item:text-[#F29E85]">
                      Vedic Gemstones
                    </h4>
                    <p className="text-[10px] font-body text-[#F5E6DA]/70 line-clamp-1 mt-0.5">
                      Certified Pukhraj, Neelam & Navratna
                    </p>
                  </div>
                </Link>

                {/* Category 6: Statue & Sphatik */}
                <Link
                  href="/all-products?category=Statue %26 Sphatik"
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#12202E] transition-colors border border-transparent hover:border-[#E07A5F]/30 group/item"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#E07A5F]/15 border border-[#E07A5F]/30 text-[#E07A5F] flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform">
                    <GiSun className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-heading font-bold text-[#E07A5F] group-hover/item:text-[#F29E85]">
                      Statue & Sphatik
                    </h4>
                    <p className="text-[10px] font-body text-[#F5E6DA]/70 line-clamp-1 mt-0.5">
                      Quartz Shivling & Panchdhatu Idols
                    </p>
                  </div>
                </Link>

                {/* Bottom View All Link inside Tooltip */}
                <div className="col-span-2 pt-2 border-t border-[#E07A5F]/20 flex justify-between items-center text-xs">
                  <span className="font-body text-[#F5E6DA]/60">100% Pashupatinath Consecrated</span>
                  <Link href="/collections" className="font-heading font-bold text-[#E07A5F] hover:text-[#F29E85] flex items-center gap-1">
                    Explore All Collections →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <NavLink href="/blog">Blog</NavLink>
          <NavLink href="/about">About Us</NavLink>
          <NavLink href="/consultation">Consultation</NavLink>
          <NavLink href="/faq">FAQ</NavLink>

          {/* MORE DROPDOWN */}
          <div className="relative group cursor-pointer py-2 shrink-0">
            <button className="text-[11px] xl:text-xs font-heading font-bold text-[#E07A5F] bg-[#E07A5F]/10 border border-[#E07A5F]/30 hover:bg-[#E07A5F] hover:text-[#0A131C] transition-all px-2.5 py-1 rounded-lg flex items-center gap-1 whitespace-nowrap">
              <Layers className="w-3.5 h-3.5" />
              <span>More</span>
              <ChevronDown className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180" />
            </button>

            {/* Dropdown Card */}
            <div className="absolute top-full right-0 pt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-50">
              <div className="bg-[#0A131C] border border-[#E07A5F]/35 shadow-[0_15px_40px_rgba(0,0,0,0.85)] rounded-xl p-2 w-48 space-y-1 backdrop-blur-xl">
                
                {/* Custom Order */}
                <Link
                  href="/customize-order"
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-[#E07A5F]/15 text-[#F5E6DA] hover:text-[#E07A5F] transition-colors text-xs font-heading font-bold group/sub"
                >
                  <MdDesignServices className="w-4 h-4 text-[#E07A5F] shrink-0 group-hover/sub:scale-110 transition-transform" />
                  <span>Custom Order</span>
                </Link>

                {/* Contact Us */}
                <Link
                  href="/contact"
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-[#E07A5F]/15 text-[#F5E6DA] hover:text-[#E07A5F] transition-colors text-xs font-heading font-bold group/sub"
                >
                  <Mail className="w-4 h-4 text-[#E07A5F] shrink-0 group-hover/sub:scale-110 transition-transform" />
                  <span>Contact Us</span>
                </Link>

              </div>
            </div>
          </div>

        </nav>

        {/* RIGHT: Actions (Search, Account, Wishlist, Cart) */}
        <div className="flex items-center justify-end gap-0.5 sm:gap-1.5 lg:gap-1.5 xl:gap-3 shrink-0">
          <div className="hidden sm:flex items-center gap-0.5 text-[10px] xl:text-xs font-heading font-medium text-[#E07A5F] shrink-0">
            <span>₹</span>
            <select className="bg-transparent border-none focus:outline-none cursor-pointer appearance-none text-[#E07A5F] hover:text-[#F29E85] pr-1">
              <option className="bg-[#0A131C] text-[#F5E6DA]">INR</option>
              <option className="bg-[#0A131C] text-[#F5E6DA]">USD</option>
            </select>
          </div>

          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-1 sm:p-1.5 xl:p-2 text-[#E07A5F] hover:text-[#F29E85] transition-colors rounded-full hover:bg-[#E07A5F]/10 shrink-0"
            aria-label="Search"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <button
            className="hidden sm:block p-1 sm:p-1.5 xl:p-2 text-[#E07A5F] hover:text-[#F29E85] transition-colors rounded-full hover:bg-[#E07A5F]/10 shrink-0"
            aria-label="Account"
          >
            <User className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <button
            onClick={() => setIsWishlistOpen(true)}
            className="p-1 sm:p-1.5 xl:p-2 text-[#E07A5F] hover:text-[#F29E85] transition-colors rounded-full hover:bg-[#E07A5F]/10 relative shrink-0"
            aria-label="Wishlist"
          >
            <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-[#E07A5F] text-[#0A131C] text-[9px] font-bold flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            className="p-1 sm:p-1.5 xl:p-2 text-[#E07A5F] hover:text-[#F29E85] transition-colors rounded-full hover:bg-[#E07A5F]/10 relative shrink-0"
            aria-label="Cart"
          >
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-[#E07A5F] text-[#0A131C] text-[9px] font-bold flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
}