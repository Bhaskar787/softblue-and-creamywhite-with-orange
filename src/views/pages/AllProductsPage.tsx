import { useState, useMemo, useEffect } from 'react';
import { AnnouncementBar } from '@/views/components/AnnouncementBar';
import { Navbar } from '@/views/components/Navbar';
import { Footer } from '@/views/components/Footer';
import { MenuDrawer } from '@/views/components/MenuDrawer';
import { CartDrawer } from '@/views/components/CartDrawer';
import { SearchOverlay } from '@/views/components/SearchOverlay';
import { FloatingActions } from '@/views/components/FloatingActions';
import { productsData, ALL_CATEGORIES, RUDRAKSHA_SUB_CATEGORIES } from '@/models/data/productsData';
import { useCart } from '@/models/context/CartContext';
import { useWishlist } from '@/models/context/WishlistContext';
import { formatPrice } from '@/utils/utils';
import { Link } from 'wouter';
import {
  Search,
  X,
  Heart,
  ShoppingBag,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  RotateCcw,
  ShieldCheck,
  MessageCircle,
} from 'lucide-react';
import { GiStarSattelites } from 'react-icons/gi';

type SortOption =
  | 'newest'
  | 'oldest'
  | 'name-asc'
  | 'name-desc'
  | 'price-asc'
  | 'price-desc'
  | 'stock-desc'
  | 'stock-asc'
  | 'featured';

const sortOptionsList: { label: string; value: SortOption }[] = [
  { label: 'Newest First', value: 'newest' },
  { label: 'Oldest First', value: 'oldest' },
  { label: 'Name (A-Z)', value: 'name-asc' },
  { label: 'Name (Z-A)', value: 'name-desc' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Stock: High to Low', value: 'stock-desc' },
  { label: 'Stock: Low to High', value: 'stock-asc' },
  { label: 'Featured', value: 'featured' },
];

export default function AllProductsPage() {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Scroll to top on page mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Query params setup
  const queryParams = new URLSearchParams(window.location.search);
  const initialCategory = queryParams.get('category') || 'All Categories';
  const initialSubCategory = queryParams.get('subcategory') || 'All';
  const initialSearch = queryParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [categorySearchQuery, setCategorySearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>(
    initialSubCategory !== 'All' ? [initialSubCategory] : []
  );
  const [selectedProductTypes, setSelectedProductTypes] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>('oldest');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [isCollectorOnly, setIsCollectorOnly] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Collapsible Section Toggle States
  const [isSortSectionOpen, setIsSortSectionOpen] = useState(true);
  const [isCategorySectionOpen, setIsCategorySectionOpen] = useState(true);
  const [isProductTypeSectionOpen, setIsProductTypeSectionOpen] = useState(true);
  const [isSpecialFilterOpen, setIsSpecialFilterOpen] = useState(true);

  // Lock body scroll on mobile filter open
  useEffect(() => {
    if (isMobileFilterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileFilterOpen]);

  // Sync state when URL params change
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('category');
    const sub = params.get('subcategory');
    const q = params.get('q');
    if (cat) setSelectedCategory(cat);
    if (sub && sub !== 'All') setSelectedSubCategories([sub]);
    if (q) setSearchQuery(q);
  }, []);

  // Helpers
  const getCategoryCount = (catName: string) => {
    if (catName === 'All Categories') return productsData.length;
    return productsData.filter((p) => p.category === catName).length;
  };

  const getSubCategoryCount = (subName: string) => {
    return productsData.filter((p) => p.subCategory === subName).length;
  };

  const handleSubCategoryToggle = (sub: string) => {
    setSelectedCategory('Rudraksha & Variants');
    setSelectedSubCategories((prev) =>
      prev.includes(sub) ? prev.filter((item) => item !== sub) : [...prev, sub]
    );
  };

  const handleProductTypeToggle = (type: string) => {
    setSelectedProductTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleResetFilters = () => {
    setSelectedCategory('All Categories');
    setSelectedSubCategories([]);
    setSelectedProductTypes([]);
    setSearchQuery('');
    setCategorySearchQuery('');
    setSortOption('oldest');
    setInStockOnly(false);
    setIsCollectorOnly(false);
  };

  // Check if any filters are active
  const hasActiveFilters =
    selectedCategory !== 'All Categories' ||
    selectedSubCategories.length > 0 ||
    selectedProductTypes.length > 0 ||
    searchQuery !== '' ||
    inStockOnly ||
    isCollectorOnly;

  // Filter Logic
  const filteredProducts = useMemo(() => {
    return productsData.filter((p) => {
      if (selectedCategory !== 'All Categories' && p.category !== selectedCategory) {
        return false;
      }
      if (selectedSubCategories.length > 0) {
        if (!p.subCategory || !selectedSubCategories.includes(p.subCategory)) {
          return false;
        }
      }
      if (selectedProductTypes.length > 0) {
        const matchesType = selectedProductTypes.some(
          (t) =>
            p.name.toLowerCase().includes(t.toLowerCase()) ||
            p.subCategory?.toLowerCase().includes(t.toLowerCase())
        );
        if (!matchesType) return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesDesc = p.desc.toLowerCase().includes(query);
        const matchesCat = p.category.toLowerCase().includes(query);
        const matchesSub = p.subCategory?.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCat && !matchesSub) return false;
      }
      if (inStockOnly && !p.inStock) return false;
      if (isCollectorOnly && !p.badge?.toLowerCase().includes('collector') && !p.badge?.toLowerCase().includes('rare')) {
        return false;
      }
      return true;
    });
  }, [
    selectedCategory,
    selectedSubCategories,
    selectedProductTypes,
    searchQuery,
    inStockOnly,
    isCollectorOnly,
  ]);

  // Sort Logic
  const sortedProducts = useMemo(() => {
    const items = [...filteredProducts];
    switch (sortOption) {
      case 'newest':
        return items.sort((a, b) => (b.isNewLaunch ? 1 : 0) - (a.isNewLaunch ? 1 : 0));
      case 'oldest':
        return items.sort((a, b) => (a.isNewLaunch ? 1 : 0) - (b.isNewLaunch ? 1 : 0));
      case 'name-asc':
        return items.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return items.sort((a, b) => b.name.localeCompare(a.name));
      case 'price-asc':
        return items.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return items.sort((a, b) => b.price - a.price);
      case 'stock-desc':
        return items.sort((a, b) => b.stockCount - a.stockCount);
      case 'stock-asc':
        return items.sort((a, b) => a.stockCount - b.stockCount);
      case 'featured':
      default:
        return items.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }
  }, [filteredProducts, sortOption]);

  // Filter Sidebar Content Component with Bigger, High-Contrast Desktop Typography
  const FilterSidebarContent = () => (
    <div className="space-y-6 text-stone-900">
      <div className="flex items-center justify-between pb-3 border-b border-stone-300">
        <h2 className="font-heading font-extrabold text-xl text-stone-900 tracking-tight">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={handleResetFilters}
            className="text-xs font-bold text-amber-800 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Clear All
          </button>
        )}
      </div>

      {/* Sort Section */}
      <div className="border-b border-stone-200 pb-5">
        <button
          onClick={() => setIsSortSectionOpen(!isSortSectionOpen)}
          className="w-full flex items-center justify-between font-heading font-extrabold text-base text-stone-900 mb-3 cursor-pointer"
        >
          <span>Sort By</span>
          {isSortSectionOpen ? <ChevronUp className="w-4 h-4 text-stone-700" /> : <ChevronDown className="w-4 h-4 text-stone-700" />}
        </button>

        {isSortSectionOpen && (
          <div className="space-y-2.5 pl-1">
            {sortOptionsList.map((opt) => (
              <label
                key={opt.value}
                className="flex items-center gap-3 text-sm font-semibold text-stone-800 hover:text-amber-800 cursor-pointer select-none py-0.5"
              >
                <input
                  type="radio"
                  name="sort-option"
                  checked={sortOption === opt.value}
                  onChange={() => setSortOption(opt.value)}
                  className="w-4 h-4 text-amber-700 border-stone-400 focus:ring-amber-500 cursor-pointer"
                />
                <span className={sortOption === opt.value ? 'font-extrabold text-stone-900' : ''}>
                  {opt.label}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Categories Section */}
      <div className="border-b border-stone-200 pb-5">
        <button
          onClick={() => setIsCategorySectionOpen(!isCategorySectionOpen)}
          className="w-full flex items-center justify-between font-heading font-extrabold text-base text-stone-900 mb-3 cursor-pointer"
        >
          <span>Categories</span>
          {isCategorySectionOpen ? <ChevronUp className="w-4 h-4 text-stone-700" /> : <ChevronDown className="w-4 h-4 text-stone-700" />}
        </button>

        {isCategorySectionOpen && (
          <div className="space-y-3">
            <div className="relative">
              <input
                type="text"
                value={categorySearchQuery}
                onChange={(e) => setCategorySearchQuery(e.target.value)}
                placeholder="Search category..."
                className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs sm:text-sm font-medium text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              <label
                className={`flex items-center justify-between p-2.5 rounded-lg text-sm font-bold cursor-pointer transition-colors ${
                  selectedCategory === 'All Categories' ? 'bg-navy-deep text-white font-extrabold' : 'hover:bg-stone-100 text-stone-900'
                }`}
                onClick={() => {
                  setSelectedCategory('All Categories');
                  setSelectedSubCategories([]);
                }}
              >
                <span>All Categories</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${selectedCategory === 'All Categories' ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-800'}`}>
                  {getCategoryCount('All Categories')}
                </span>
              </label>

              <div className="pl-1 space-y-1.5">
                <div className="text-xs font-extrabold text-stone-900 uppercase tracking-wider pt-2 pb-1 flex items-center justify-between border-t border-stone-100">
                  <span>Rudraksha &amp; Variants</span>
                  <span className="text-xs font-bold bg-stone-200 text-stone-800 px-2 py-0.5 rounded-full">
                    {getCategoryCount('Rudraksha & Variants')}
                  </span>
                </div>
                {RUDRAKSHA_SUB_CATEGORIES.map((sub) => {
                  const count = getSubCategoryCount(sub);
                  const isChecked = selectedSubCategories.includes(sub);
                  return (
                    <label
                      key={sub}
                      className="flex items-center justify-between text-sm font-semibold text-stone-800 hover:text-amber-800 cursor-pointer py-1 pl-2"
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleSubCategoryToggle(sub)}
                          className="w-4 h-4 border-stone-400 rounded text-amber-700 focus:ring-amber-500 cursor-pointer"
                        />
                        <span className={isChecked ? 'font-extrabold text-stone-900' : ''}>{sub}</span>
                      </div>
                      <span className="text-xs font-bold text-stone-500">{count}</span>
                    </label>
                  );
                })}
              </div>

              {ALL_CATEGORIES.filter(
                (c) =>
                  c !== 'All Categories' &&
                  c !== 'Rudraksha & Variants' &&
                  c.toLowerCase().includes(categorySearchQuery.toLowerCase())
              ).map((cat) => {
                const count = getCategoryCount(cat);
                const isSelected = selectedCategory === cat;
                return (
                  <label
                    key={cat}
                    className={`flex items-center justify-between p-2.5 rounded-lg text-sm font-bold cursor-pointer transition-colors ${
                      isSelected ? 'bg-navy-deep text-white font-extrabold' : 'hover:bg-stone-100 text-stone-900'
                    }`}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setSelectedSubCategories([]);
                    }}
                  >
                    <span>{cat}</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-800'}`}>
                      {count}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Product Type Section */}
      <div className="border-b border-stone-200 pb-5">
        <button
          onClick={() => setIsProductTypeSectionOpen(!isProductTypeSectionOpen)}
          className="w-full flex items-center justify-between font-heading font-extrabold text-base text-stone-900 mb-3 cursor-pointer"
        >
          <span>Product Type</span>
          {isProductTypeSectionOpen ? <ChevronUp className="w-4 h-4 text-stone-700" /> : <ChevronDown className="w-4 h-4 text-stone-700" />}
        </button>

        {isProductTypeSectionOpen && (
          <div className="space-y-2.5 pl-1">
            {['Bracelet', 'Japa Mala', 'Pendant', 'Siddha Mala', 'Single Bead'].map((type) => {
              const isChecked = selectedProductTypes.includes(type);
              return (
                <label
                  key={type}
                  className="flex items-center gap-3 text-sm font-semibold text-stone-800 hover:text-amber-800 cursor-pointer py-0.5"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleProductTypeToggle(type)}
                    className="w-4 h-4 border-stone-400 rounded text-amber-700 focus:ring-amber-500 cursor-pointer"
                  />
                  <span className={isChecked ? 'font-extrabold text-stone-900' : ''}>{type}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* Special Filters */}
      <div className="pb-5">
        <button
          onClick={() => setIsSpecialFilterOpen(!isSpecialFilterOpen)}
          className="w-full flex items-center justify-between font-heading font-extrabold text-base text-stone-900 mb-3 cursor-pointer"
        >
          <span>Special Filters</span>
          {isSpecialFilterOpen ? <ChevronUp className="w-4 h-4 text-stone-700" /> : <ChevronDown className="w-4 h-4 text-stone-700" />}
        </button>

        {isSpecialFilterOpen && (
          <div className="space-y-3 pl-1">
            <label className="flex items-center gap-3 text-sm font-semibold text-stone-900 cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 border-stone-400 rounded text-amber-700 focus:ring-amber-500 cursor-pointer"
              />
              <span>In Stock Only</span>
            </label>

            <label className="flex items-center gap-3 text-sm font-semibold text-stone-900 cursor-pointer">
              <input
                type="checkbox"
                checked={isCollectorOnly}
                onChange={(e) => setIsCollectorOnly(e.target.checked)}
                className="w-4 h-4 border-stone-400 rounded text-amber-700 focus:ring-amber-500 cursor-pointer"
              />
              <span>Collector Items</span>
            </label>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] text-stone-900 font-body antialiased selection:bg-amber-100 selection:text-amber-900">
      <AnnouncementBar />
      <Navbar />

      {/* Responsive Search & Sort Controls Header */}
      <div className="bg-white/95 backdrop-blur-md border-b border-stone-200 sticky top-16 sm:top-20 z-40 shadow-xs py-3 px-3 sm:px-6 md:px-8 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4">
          
          {/* Search Box Component */}
          <div className="relative w-full md:max-w-md lg:max-w-lg mx-auto md:mx-0">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products by name, Mukhi, category..."
              className="w-full pl-10 pr-9 py-2.5 bg-[#FAF8F5] border border-stone-300 rounded-xl text-xs sm:text-sm font-body text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-900 p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Action Row: Mobile Filter Drawer Trigger & Sort Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end shrink-0">
            {/* Filter Toggle Button (Mobile Only) */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="md:hidden flex items-center justify-center gap-1.5 px-3.5 py-2.5 bg-navy-deep hover:bg-navy text-white rounded-xl text-xs font-heading font-bold uppercase tracking-wider transition-colors shadow-xs flex-1 sm:flex-none cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4 text-orange" />
              <span>Filters</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
              )}
            </button>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 flex-1 sm:flex-none justify-end">
              <span className="hidden lg:inline text-xs font-heading font-extrabold uppercase tracking-wider text-stone-700">
                Sort By:
              </span>
              <div className="relative w-full sm:w-auto">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as SortOption)}
                  className="w-full sm:w-auto appearance-none bg-white border border-stone-300 text-stone-900 font-heading font-bold text-xs uppercase tracking-wider px-3.5 py-2.5 pr-8 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer shadow-2xs truncate"
                >
                  {sortOptionsList.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-700 pointer-events-none" />
              </div>
            </div>

            {/* Reset Filters Quick Button (Desktop Only) */}
            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="hidden sm:flex items-center gap-1 text-xs font-heading font-bold text-amber-800 hover:underline px-2 py-1 shrink-0 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Page Body Grid */}
      <div className="flex-1 flex flex-col md:flex-row w-full min-h-[calc(100vh-140px)]">
        {/* Desktop Left Sidebar */}
        <aside className="hidden md:block w-72 lg:w-80 shrink-0 bg-white border-r border-stone-200 p-5 lg:p-6 sticky top-36 sm:top-40 max-h-[calc(100vh-160px)] overflow-y-auto">
          <FilterSidebarContent />
        </aside>

        {/* Right Main Grid Area */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 pb-16 sm:pb-24 space-y-6 max-w-full overflow-x-hidden">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-4">
            <div>
              <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-stone-900 tracking-tight">
                {selectedCategory === 'All Categories' ? 'All Sacred Collections' : selectedCategory}
              </h1>
              <p className="text-xs sm:text-sm font-medium text-stone-600 mt-1">
                Showing <strong className="font-extrabold text-stone-900">{sortedProducts.length}</strong> of{' '}
                <strong className="font-extrabold text-stone-900">{productsData.length}</strong> 100% Nepal Origin Products
              </p>
            </div>
          </div>

          {/* Grid Layout */}
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6">
              {sortedProducts.map((product) => {
                const isSaved = isInWishlist(product.id);
                const discount = product.originalPrice
                  ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                  : 0;

                return (
                  <div
                    key={product.id}
                    className="group relative flex flex-col bg-white border border-stone-200/90 shadow-sm rounded-2xl p-4 hover:shadow-xl transition-all duration-300"
                  >
                    {/* Thumbnail Box */}
                    <div className="relative aspect-square rounded-xl overflow-hidden border border-stone-100 mb-3 bg-[#FAF8F5]">
                      <Link href={`/product/${product.id}`}>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                        />
                      </Link>

                      {/* Badges */}
                      <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start z-10 pointer-events-none">
                        {product.badge && (
                          <span className="bg-navy-deep text-white text-[10px] font-heading font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs">
                            {product.badge}
                          </span>
                        )}
                        {discount > 0 && (
                          <span className="bg-orange text-navy-deep text-[10px] font-heading font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs">
                            {discount}% OFF
                          </span>
                        )}
                      </div>

                      {/* Wishlist Toggle Button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleWishlist(product);
                        }}
                        className="absolute top-2.5 right-2.5 w-8 h-8 sm:w-9 sm:h-9 bg-white/90 backdrop-blur border border-stone-200 rounded-full flex items-center justify-center text-orange hover:bg-orange hover:text-navy-deep transition-all shadow-xs z-10 cursor-pointer"
                        aria-label="Add to wishlist"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            isSaved ? 'fill-orange text-orange scale-110' : ''
                          }`}
                        />
                      </button>

                      {/* Quick Actions Overlay (Desktop Hover) */}
                      <div className="absolute bottom-0 inset-x-0 p-2.5 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hidden lg:flex gap-2 z-10 bg-white/95 backdrop-blur-sm border-t border-stone-200">
                        <button
                          onClick={() => addToCart(product)}
                          className="flex-1 py-2 bg-navy hover:bg-navy-deep text-white font-heading font-bold uppercase tracking-wider rounded-xl text-[11px] transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add to Cart</span>
                        </button>
                        <a
                          href={`https://wa.me/9779851073936?text=${encodeURIComponent(
                            `Namaste! I am interested in inquiring about ${product.name} (Price: ${formatPrice(product.price)}). Please provide more details.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-heading font-bold uppercase tracking-wider rounded-xl text-[11px] transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer text-center"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-white" />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </div>

                    {/* Meta info */}
                    <div className="flex flex-col flex-1">
                      <div className="flex items-center justify-between mb-2 flex-wrap gap-y-1">
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <GiStarSattelites
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < Math.round(product.rating) ? 'text-amber-500' : 'text-stone-300'
                              }`}
                            />
                          ))}
                          <span className="text-xs font-bold text-stone-500 ml-1">
                            ({product.reviews})
                          </span>
                        </div>
                        <span className="text-xs font-extrabold text-navy-deep bg-orange border border-orange-bright px-2 py-0.5 rounded-md uppercase tracking-wider shadow-2xs">
                          Nepal Origin
                        </span>
                      </div>

                      <Link href={`/product/${product.id}`}>
                        <h3 className="font-heading text-base sm:text-lg font-bold text-stone-900 mb-1.5 line-clamp-2 leading-snug group-hover:text-orange transition-colors cursor-pointer">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-xs sm:text-sm font-body text-stone-700 line-clamp-2 mb-3 flex-1 leading-relaxed">
                        {product.desc}
                      </p>

                      <div className="flex items-baseline justify-between mt-auto pt-3 border-t border-stone-100">
                        <div>
                          <span className="font-heading text-lg sm:text-xl font-extrabold text-orange">
                            {formatPrice(product.price)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs font-semibold text-stone-400 line-through ml-2">
                              {formatPrice(product.originalPrice)}
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-extrabold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-md uppercase">
                          In Stock
                        </span>
                      </div>

                      <div className="mt-3 bg-stone-50 border border-stone-200 py-1.5 px-2.5 rounded-lg flex items-center justify-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                        <span className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                          100% Lab Certified
                        </span>
                      </div>

                      {/* Mobile Action Buttons: Add to Cart + WhatsApp */}
                      <div className="mt-3 flex gap-2 lg:hidden">
                        <button
                          onClick={() => addToCart(product)}
                          className="flex-1 py-2.5 bg-navy hover:bg-navy-deep text-white text-xs font-heading font-bold uppercase tracking-wider rounded-xl cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add to Cart</span>
                        </button>
                        <a
                          href={`https://wa.me/9779851073936?text=${encodeURIComponent(
                            `Namaste! I am interested in inquiring about ${product.name} (Price: ${formatPrice(product.price)}). Please provide more details.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-heading font-bold uppercase tracking-wider rounded-xl cursor-pointer flex items-center justify-center gap-1.5 text-center"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-white" />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white border border-stone-200 rounded-2xl p-8 sm:p-12 text-center space-y-4 shadow-sm">
              <div className="w-14 h-14 rounded-full bg-amber-50 text-amber-800 flex items-center justify-center mx-auto text-2xl font-serif shadow-inner">
                ॐ
              </div>
              <h3 className="font-heading text-xl text-stone-900 font-extrabold">No Products Found</h3>
              <p className="text-xs sm:text-sm font-medium text-stone-600 max-w-sm mx-auto">
                No items match your selected filters. Try clearing your search query or reset your applied filters.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-6 py-3 bg-navy hover:bg-navy-deep text-white font-heading font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer shadow-md"
              >
                Reset Filters
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Slide-in Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-[150] flex md:hidden" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative w-80 max-w-[85vw] h-full bg-white shadow-2xl p-5 overflow-y-auto flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-300">
                <h3 className="font-heading font-extrabold text-xl text-stone-900">Filters</h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 text-stone-500 hover:text-stone-900 cursor-pointer"
                  aria-label="Close filters"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <FilterSidebarContent />
            </div>

            <div className="pt-4 border-t border-stone-200 mt-6 sticky bottom-0 bg-white">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3.5 bg-navy hover:bg-navy-deep text-white font-heading font-bold text-xs uppercase tracking-wider rounded-xl shadow-md cursor-pointer"
              >
                Apply Filters ({sortedProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />

      {/* Global Overlays */}
      <MenuDrawer />
      <SearchOverlay />
      <CartDrawer />
      <FloatingActions />
    </div>
  );
}