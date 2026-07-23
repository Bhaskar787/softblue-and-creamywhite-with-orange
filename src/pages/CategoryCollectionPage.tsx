import { useState, useMemo, useEffect, useRef } from 'react';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MenuDrawer } from '@/components/MenuDrawer';
import { CartDrawer } from '@/components/CartDrawer';
import { WishlistDrawer } from '@/components/WishlistDrawer';
import { SearchOverlay } from '@/components/SearchOverlay';
import { FloatingActions } from '@/components/FloatingActions';
import { productsData, Product } from '@/data/productsData';
import { COLLECTION_CATEGORIES_META, CollectionCategoryMeta } from '@/data/collectionCategoriesData';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { formatPrice } from '@/lib/utils';
import { Link, useRoute, useLocation } from 'wouter';
import {
  Search,
  X,
  Heart,
  ShoppingBag,
  ChevronDown,
  Sparkles,
  Check,
  Eye,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Info
} from 'lucide-react';
import { GiStarSattelites } from 'react-icons/gi';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';

export default function CategoryCollectionPage() {
  const [, setLocation] = useLocation();
  
  // Try matching /collection/:slug or /collections/:slug or query param
  const [, paramsCollection] = useRoute('/collection/:slug');
  const [, paramsCollections] = useRoute('/collections/:slug');
  const [, paramsExplore] = useRoute('/collection-explore/:slug');

  const slugParam = paramsCollection?.slug || paramsCollections?.slug || paramsExplore?.slug;

  // Sync scroll to top on load or route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slugParam]);

  // Find active category meta or fallback to first
  const activeCategoryMeta: CollectionCategoryMeta = useMemo(() => {
    if (slugParam) {
      const found = COLLECTION_CATEGORIES_META.find(
        (c) => c.slug === slugParam || c.id === slugParam
      );
      if (found) return found;
    }
    // Check URL search params as fallback
    const queryParams = new URLSearchParams(window.location.search);
    const catQuery = queryParams.get('category');
    const subQuery = queryParams.get('subcategory');
    if (subQuery) {
      const foundSub = COLLECTION_CATEGORIES_META.find((c) => c.subcategory === subQuery);
      if (foundSub) return foundSub;
    }
    if (catQuery) {
      const foundCat = COLLECTION_CATEGORIES_META.find((c) => c.category === catQuery);
      if (foundCat) return foundCat;
    }
    return COLLECTION_CATEGORIES_META[0];
  }, [slugParam]);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // State for filters & modal
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [isCollectorOnly, setIsCollectorOnly] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Quick View Modal State
  const [selectedQuickViewProduct, setSelectedQuickViewProduct] = useState<Product | null>(null);

  // Tab Scroll Refs & Auto-scroll logic
  const activeTabRef = useRef<HTMLButtonElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll active tab into view whenever category changes
  useEffect(() => {
    if (activeTabRef.current) {
      activeTabRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [activeCategoryMeta.id]);

  const scrollTabs = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -220 : 220;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Filter products for this specific collection category
  const collectionProducts = useMemo(() => {
    return productsData.filter((p) => {
      // Category / Subcategory matching
      if (activeCategoryMeta.subcategory) {
        if (p.subCategory !== activeCategoryMeta.subcategory) return false;
      } else if (activeCategoryMeta.category) {
        if (p.category !== activeCategoryMeta.category) return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesDesc = p.desc.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc) return false;
      }

      // Stock
      if (inStockOnly && !p.inStock) return false;

      // Collector
      if (isCollectorOnly && !p.badge?.toLowerCase().includes('collector') && !p.badge?.toLowerCase().includes('rare')) {
        return false;
      }

      return true;
    });
  }, [activeCategoryMeta, searchQuery, inStockOnly, isCollectorOnly]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const items = [...collectionProducts];
    switch (sortOption) {
      case 'price-asc':
        return items.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return items.sort((a, b) => b.price - a.price);
      case 'rating':
        return items.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return items.sort((a, b) => (b.isNewLaunch ? 1 : 0) - (a.isNewLaunch ? 1 : 0));
      case 'featured':
      default:
        return items.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }
  }, [collectionProducts, sortOption]);

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  return (
    <div className="min-h-screen bg-[#faf7f4] text-navy font-body selection:bg-orange/20 relative">
      <AnnouncementBar />
      <Navbar />

      {/* ── 1. STICKY HANGING BREADCRUMBS & CATEGORY SWITCHER BAR ── */}
      <div className="bg-white/95 backdrop-blur-md border-b border-orange/20 sticky top-16 sm:top-20 z-40 shadow-xs py-2.5 px-4 sm:px-6 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-2.5">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-navy/70 font-medium shrink-0">
            <Link href="/" className="hover:text-orange transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-orange" />
            <Link href="/collections" className="hover:text-orange transition-colors">Collections</Link>
            <ChevronRight className="w-3.5 h-3.5 text-orange" />
            <span className="text-navy font-bold text-navy-deep">{activeCategoryMeta.shortTitle}</span>
          </div>

          {/* Category Quick Selector Tabs with Auto-Scroll & Directional Arrows */}
          <div className="relative flex items-center min-w-0 max-w-full group/tabs">
            <button
              onClick={() => scrollTabs('left')}
              className="hidden md:flex shrink-0 p-1.5 rounded-full bg-[#faf7f4] text-navy hover:text-orange hover:bg-white border border-orange/20 shadow-xs mr-1 transition-all"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            <div
              ref={scrollContainerRef}
              className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 scroll-smooth"
            >
              {COLLECTION_CATEGORIES_META.map((cat) => {
                const isActive = cat.id === activeCategoryMeta.id;
                return (
                  <button
                    key={cat.id}
                    ref={isActive ? activeTabRef : null}
                    onClick={(e) => {
                      e.currentTarget.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest',
                        inline: 'center'
                      });
                      setLocation(`/collection/${cat.slug}`);
                    }}
                    className={`shrink-0 px-3.5 py-1.5 rounded-xl text-[11px] font-heading font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                      isActive
                        ? 'bg-navy-deep text-white border-navy-deep shadow-xs'
                        : 'bg-[#faf7f4] text-navy hover:border-orange hover:text-orange border-orange/20'
                    }`}
                  >
                    {cat.shortTitle}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => scrollTabs('right')}
              className="hidden md:flex shrink-0 p-1.5 rounded-full bg-[#faf7f4] text-navy hover:text-orange hover:bg-white border border-orange/20 shadow-xs ml-1 transition-all"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ── 2. HERO BANNER FOR ACTIVE COLLECTION ── */}
      <section className="relative bg-gradient-to-r from-navy-deep via-navy to-navy-deep text-white py-12 lg:py-16 px-4 sm:px-6 overflow-hidden">
        {/* Decorative background image overlay */}
        <div className="absolute inset-0 opacity-15 mix-blend-overlay">
          <img
            src={activeCategoryMeta.bannerImage}
            alt={activeCategoryMeta.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 z-10">
          <div className="space-y-4 max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-orange/15 border border-orange/40 rounded-full text-orange text-xs font-heading font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-orange" />
              <span>{activeCategoryMeta.heroBadge}</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium leading-tight text-peach">
              {activeCategoryMeta.title}
            </h1>

            <p className="text-sm sm:text-base text-peach/90 leading-relaxed font-medium">
              {activeCategoryMeta.longDescription}
            </p>

            {/* Key benefits pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-2">
              {activeCategoryMeta.benefits.map((b, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-navy/80 backdrop-blur-sm border border-orange/30 rounded-lg text-xs font-medium text-peach"
                >
                  <Check className="w-3.5 h-3.5 text-orange shrink-0" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Banner Card Image Box */}
          <div className="w-full sm:w-80 lg:w-96 shrink-0 aspect-[4/3] rounded-2xl overflow-hidden border border-orange/40 shadow-2xl relative group">
            <img
              src={activeCategoryMeta.bannerImage}
              alt={activeCategoryMeta.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-[10px] font-heading font-bold uppercase tracking-widest text-orange block mb-0.5">
                CURATED COLLECTION
              </span>
              <span className="text-xs font-serif font-medium text-peach">
                100% Pashupatinath Consecrated & Lab Certified
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. CONTROLS & FILTER BAR ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        <div className="bg-white border border-orange/25 rounded-2xl p-4 sm:p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left Count & Info */}
          <div>
            <h2 className="font-display text-xl sm:text-2xl text-navy font-bold">
              Explore {activeCategoryMeta.shortTitle} Items
            </h2>
            <p className="text-xs text-navy/70 font-medium mt-0.5">
              Showing <span className="font-bold text-navy-deep">{sortedProducts.length}</span> authentic items in this collection
            </p>
          </div>

          {/* Middle Search Input */}
          <div className="relative w-full md:w-72 lg:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-navy/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search in ${activeCategoryMeta.shortTitle}...`}
              className="w-full pl-10 pr-8 py-2 bg-[#faf7f4] border border-orange/20 rounded-xl text-xs text-navy focus:outline-none focus:border-orange transition-colors font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-navy/40 hover:text-navy"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Right Toggles & Sort Dropdown */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <label className="flex items-center gap-2 text-xs font-semibold text-navy cursor-pointer bg-[#faf7f4] border border-orange/20 px-3 py-2 rounded-xl hover:border-orange transition-colors">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-3.5 h-3.5 text-orange border-gray-300 rounded focus:ring-orange"
              />
              <span>In Stock Only</span>
            </label>

            <div className="relative">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="appearance-none bg-[#faf7f4] border border-orange/20 text-navy font-semibold text-xs px-3 py-2 pr-8 rounded-xl focus:outline-none cursor-pointer hover:border-orange transition-colors"
              >
                <option value="featured">Featured Items</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">New Arrivals</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-navy/50 pointer-events-none" />
            </div>
          </div>

        </div>

        {/* ── 4. PRODUCTS GRID FOR THIS COLLECTION ── */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5 xl:gap-6">
            {sortedProducts.map((product) => {
              const isSaved = isInWishlist(product.id);
              const discount = product.originalPrice
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                : 0;

              return (
                <div
                  key={product.id}
                  className="group relative flex flex-col bg-white border border-orange/20 rounded-2xl p-4 shadow-sm hover:shadow-xl hover:border-orange/60 transition-all duration-300"
                >
                  {/* Image Container */}
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-[#faf7f4] mb-3 border border-orange/15">
                    <Link href={`/product/${product.id}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 cursor-pointer"
                      />
                    </Link>

                    {/* Top Badges */}
                    <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start z-10 pointer-events-none">
                      {product.badge && (
                        <span className="bg-navy-deep text-white text-[9px] font-heading font-bold uppercase tracking-widest px-2 py-0.5 rounded shadow-sm">
                          {product.badge}
                        </span>
                      )}
                      {discount > 0 && (
                        <span className="bg-orange text-navy-deep text-[9px] font-heading font-bold uppercase tracking-widest px-2 py-0.5 rounded shadow-sm">
                          {discount}% OFF
                        </span>
                      )}
                    </div>

                    {/* Wishlist Heart Toggle */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleWishlist(product);
                      }}
                      className="absolute top-2.5 right-2.5 w-8 h-8 bg-white/90 backdrop-blur-xs border border-orange/20 rounded-full flex items-center justify-center text-orange hover:bg-orange hover:text-white transition-all shadow-xs z-10"
                      aria-label="Add to wishlist"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isSaved ? 'fill-orange text-orange scale-110' : ''
                        }`}
                      />
                    </button>

                    {/* Overlay Item Details Button -> Navigates to Product Detail Page */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
                      <Link
                        href={`/product/${product.id}`}
                        className="flex-1 py-2 bg-navy-deep text-white font-heading font-bold text-xs uppercase tracking-wider rounded-lg shadow-md hover:bg-navy transition-colors flex items-center justify-center gap-1.5 border border-orange/30 text-center"
                      >
                        <Eye className="w-3.5 h-3.5 text-orange" />
                        <span>Item Details</span>
                      </Link>
                    </div>
                  </div>

                  {/* Details Body */}
                  <div className="flex flex-col flex-1">
                    {/* Origin & Rating */}
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <GiStarSattelites
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < Math.round(product.rating) ? 'text-orange' : 'text-navy/20'
                            }`}
                          />
                        ))}
                        <span className="text-[10px] text-navy/60 font-semibold ml-1">
                          ({product.reviews})
                        </span>
                      </div>
                      <span className="text-[9px] font-bold text-navy uppercase tracking-wider bg-[#faf7f4] border border-orange/20 px-2 py-0.5 rounded-full">
                        {product.origin} Origin
                      </span>
                    </div>

                    {/* Product Name (Links to product detail page) */}
                    <Link href={`/product/${product.id}`}>
                      <h3 className="font-display text-base text-navy font-bold line-clamp-2 leading-snug hover:text-orange transition-colors cursor-pointer mb-1.5">
                        {product.name}
                      </h3>
                    </Link>

                    <p className="text-xs text-navy/80 line-clamp-2 mb-4 flex-1 leading-relaxed font-medium">
                      {product.desc}
                    </p>

                    {/* Price & Action Footer */}
                    <div className="pt-3 border-t border-navy/10 flex items-center justify-between mt-auto">
                      <div>
                        <span className="font-serif text-lg font-bold text-navy-deep">
                          {formatPrice(product.price)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-navy/40 line-through ml-2">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => addToCart(product)}
                        className="px-3.5 py-2 bg-navy-deep hover:bg-navy text-white font-heading font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>

                    {/* Direct Item Details Page Navigation Link */}
                    <Link
                      href={`/product/${product.id}`}
                      className="mt-2.5 w-full py-1.5 bg-[#faf7f4] hover:bg-white border border-orange/25 text-navy font-semibold text-[11px] uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1.5 text-center"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-orange" />
                      <span>Item Details</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white border border-orange/25 rounded-2xl p-12 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-orange/15 text-orange flex items-center justify-center mx-auto text-2xl font-serif">
              ॐ
            </div>
            <h3 className="font-display text-xl text-navy">No Collection Items Found</h3>
            <p className="text-xs sm:text-sm text-navy/70 max-w-md mx-auto font-medium">
              No items match your active search or stock filters. Try clearing your filters to explore all items in {activeCategoryMeta.shortTitle}.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setInStockOnly(false);
                setIsCollectorOnly(false);
              }}
              className="px-5 py-2.5 bg-navy-deep text-white font-heading font-bold text-xs uppercase tracking-wider rounded-lg shadow-md"
            >
              Reset Collection Filters
            </button>
          </div>
        )}

        {/* ── 5. ASTROLOGER CONSULTATION CTA ── */}
        <section className="bg-white rounded-2xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8 border border-orange/30 shadow-md">
          <div className="space-y-3 text-center md:text-left max-w-xl">
            <span className="text-xs font-heading font-bold uppercase tracking-widest text-orange block">
              PERSONALIZED SACRED ALIGNMENT
            </span>
            <h3 className="font-display text-2xl sm:text-3xl text-navy leading-snug">
              Need Help Selecting From {activeCategoryMeta.shortTitle}?
            </h3>
            <p className="text-xs sm:text-sm text-navy/80 font-medium">
              Our resident Acharyas inspect birth charts (Kundali) to match exact Mukhi beads, Saligram Shilas, and Vedic Gemstones for your planetary alignment.
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
              <Link
                href="/consultation"
                className="px-5 py-2.5 bg-orange hover:bg-orange-bright text-navy-deep font-heading font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-colors flex items-center gap-1.5"
              >
                <span>TALK TO ASTROLOGER</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/mukhi-guide"
                className="px-5 py-2.5 bg-transparent border border-navy/30 hover:border-orange text-navy hover:text-orange font-heading font-bold text-xs uppercase tracking-wider rounded-xl transition-colors"
              >
                READ MUKHI GUIDE
              </Link>
            </div>
          </div>

          <div className="w-48 sm:w-64 shrink-0 rounded-xl overflow-hidden shadow-md border border-orange/30">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80"
              alt="Sacred Rudrantra Artifacts"
              className="w-full h-36 object-cover"
            />
          </div>
        </section>

        {/* ── 6. COLLECTION SPECIFIC FAQ SECTION ── */}
        <section className="space-y-6 pt-4">
          <div className="text-center space-y-1">
            <h2 className="font-display text-2xl sm:text-3xl text-navy">
              {activeCategoryMeta.shortTitle} FAQs
            </h2>
            <p className="text-xs text-navy/70 font-medium">
              Common questions about authenticity, consecration, and wearing guidelines
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-3">
            {activeCategoryMeta.faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className="border border-orange/20 rounded-xl bg-white overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(i)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 font-display text-base text-navy font-bold cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-orange shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-navy/80 leading-relaxed border-t border-orange/10 font-medium">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* ── 7. INTERACTIVE ITEM DETAILS QUICK-VIEW MODAL ── */}
      {selectedQuickViewProduct && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-orange/30 max-h-[90vh] flex flex-col md:flex-row">
            {/* Close Button */}
            <button
              onClick={() => setSelectedQuickViewProduct(null)}
              className="absolute top-3 right-3 z-20 w-8 h-8 bg-white/80 hover:bg-white text-navy rounded-full flex items-center justify-center shadow-md transition-colors border border-orange/20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Left */}
            <div className="w-full md:w-1/2 bg-[#faf7f4] p-6 flex flex-col items-center justify-center relative border-b md:border-b-0 md:border-r border-orange/20">
              <img
                src={selectedQuickViewProduct.image}
                alt={selectedQuickViewProduct.name}
                className="w-full max-h-72 object-contain rounded-xl drop-shadow-md"
              />
              <div className="mt-4 flex items-center gap-2">
                <span className="text-[10px] font-heading font-bold text-navy uppercase tracking-wider bg-white border border-orange/30 px-2.5 py-1 rounded-full shadow-2xs">
                  {selectedQuickViewProduct.origin} Origin
                </span>
                <span className="text-[10px] font-heading font-bold text-orange uppercase tracking-wider bg-orange/10 border border-orange/30 px-2.5 py-1 rounded-full">
                  100% Lab Certified
                </span>
              </div>
            </div>

            {/* Modal Content Right */}
            <div className="w-full md:w-1/2 p-6 overflow-y-auto space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-orange">
                  {[...Array(5)].map((_, i) => (
                    <GiStarSattelites key={i} className="w-4 h-4" />
                  ))}
                  <span className="text-xs text-navy/60 font-semibold ml-1">
                    ({selectedQuickViewProduct.reviews} Verified Reviews)
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl text-navy font-bold leading-tight">
                  {selectedQuickViewProduct.name}
                </h3>

                {/* Price */}
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-2xl font-bold text-navy-deep">
                    {formatPrice(selectedQuickViewProduct.price)}
                  </span>
                  {selectedQuickViewProduct.originalPrice && (
                    <span className="text-sm text-navy/40 line-through">
                      {formatPrice(selectedQuickViewProduct.originalPrice)}
                    </span>
                  )}
                  <span className="text-[10px] font-heading font-bold text-orange uppercase tracking-wider bg-orange/15 px-2 py-0.5 rounded border border-orange/30">
                    Save {Math.round(((selectedQuickViewProduct.originalPrice! - selectedQuickViewProduct.price) / selectedQuickViewProduct.originalPrice!) * 100)}%
                  </span>
                </div>

                <p className="text-xs text-navy/80 leading-relaxed font-medium">
                  {selectedQuickViewProduct.desc}
                </p>

                {/* Specifications table snippet */}
                {selectedQuickViewProduct.specifications && (
                  <div className="bg-[#faf7f4] rounded-xl p-3 border border-orange/20 space-y-1.5">
                    <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-orange block mb-1">
                      Product Specifications
                    </span>
                    {Object.entries(selectedQuickViewProduct.specifications).map(([key, val]) => (
                      <div key={key} className="flex justify-between text-xs border-b border-navy/10 last:border-0 py-0.5">
                        <span className="text-navy/60 font-medium">{key}:</span>
                        <span className="font-bold text-navy">{val}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Benefits List */}
                {selectedQuickViewProduct.benefits && (
                  <div className="space-y-1">
                    <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-orange block">
                      Key Spiritual Benefits
                    </span>
                    {selectedQuickViewProduct.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-navy font-medium">
                        <Check className="w-3.5 h-3.5 text-orange shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons in Modal */}
              <div className="pt-4 border-t border-navy/10 space-y-2 mt-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      addToCart(selectedQuickViewProduct);
                      setSelectedQuickViewProduct(null);
                    }}
                    className="flex-1 py-3 bg-navy-deep hover:bg-navy text-white font-heading font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md"
                  >
                    <ShoppingBag className="w-4 h-4 text-orange" />
                    <span>Add To Cart</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(selectedQuickViewProduct)}
                    className="px-3.5 py-3 border border-orange/30 hover:border-orange text-navy rounded-xl transition-colors"
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isInWishlist(selectedQuickViewProduct.id) ? 'fill-orange text-orange' : 'text-navy/60'}`} />
                  </button>
                </div>

                <Link
                  href={`/product/${selectedQuickViewProduct.id}`}
                  onClick={() => setSelectedQuickViewProduct(null)}
                  className="w-full py-2.5 bg-[#faf7f4] hover:bg-white border border-orange/30 text-navy font-heading font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 text-center"
                >
                  <span>Open Full Product Details Page</span>
                  <ArrowRight className="w-3.5 h-3.5 text-orange" />
                </Link>
              </div>

            </div>
          </div>
        </div>
      )}

      <Footer />
      <MenuDrawer />
      <SearchOverlay />
      <CartDrawer />
      <WishlistDrawer />
      <FloatingActions />
    </div>
  );
}
