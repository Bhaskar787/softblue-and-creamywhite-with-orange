import { useState, useMemo, useEffect } from 'react';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MenuDrawer } from '@/components/MenuDrawer';
import { CartDrawer } from '@/components/CartDrawer';
import { WishlistDrawer } from '@/components/WishlistDrawer';
import { SearchOverlay } from '@/components/SearchOverlay';
import { FloatingActions } from '@/components/FloatingActions';
import { TrustPaymentBar } from '@/components/TrustPaymentBar';
import { productsData, ALL_CATEGORIES, RUDRAKSHA_SUB_CATEGORIES, Product } from '@/data/productsData';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { formatPrice } from '@/lib/utils';
import { Link } from 'wouter';
import {
  Search,
  X,
  Heart,
  ShoppingBag,
  ChevronDown,
  ChevronUp,
  Sparkles,
  SlidersHorizontal,
  RotateCcw,
  Check,
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
  const [selectedOrigins, setSelectedOrigins] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>('oldest');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [isCollectorOnly, setIsCollectorOnly] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Collapsible Section Toggle States (matching second & third image)
  const [isSortSectionOpen, setIsSortSectionOpen] = useState(true);
  const [isCategorySectionOpen, setIsCategorySectionOpen] = useState(true);
  const [isProductTypeSectionOpen, setIsProductTypeSectionOpen] = useState(true);
  const [isSpecialFilterOpen, setIsSpecialFilterOpen] = useState(true);

  // Prevent body scroll when mobile filter drawer is open
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

  // Category counts
  const getCategoryCount = (catName: string) => {
    if (catName === 'All Categories') return productsData.length;
    return productsData.filter((p) => p.category === catName).length;
  };

  const getSubCategoryCount = (subName: string) => {
    return productsData.filter((p) => p.subCategory === subName).length;
  };

  const getProductTypeCount = (type: string) => {
    return productsData.filter((p) =>
      p.name.toLowerCase().includes(type.toLowerCase()) ||
      p.subCategory?.toLowerCase().includes(type.toLowerCase())
    ).length;
  };

  // Checkbox Handlers
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

  const handleOriginToggle = (orig: string) => {
    setSelectedOrigins((prev) =>
      prev.includes(orig) ? prev.filter((o) => o !== orig) : [...prev, orig]
    );
  };

  const handleResetFilters = () => {
    setSelectedCategory('All Categories');
    setSelectedSubCategories([]);
    setSelectedProductTypes([]);
    setSelectedOrigins([]);
    setSearchQuery('');
    setCategorySearchQuery('');
    setSortOption('oldest');
    setInStockOnly(false);
    setIsCollectorOnly(false);
  };

  // Filter Logic
  const filteredProducts = useMemo(() => {
    return productsData.filter((p) => {
      // Main category filter
      if (selectedCategory !== 'All Categories' && p.category !== selectedCategory) {
        return false;
      }
      // Sub-category filter
      if (selectedSubCategories.length > 0) {
        if (!p.subCategory || !selectedSubCategories.includes(p.subCategory)) {
          return false;
        }
      }
      // Product types filter
      if (selectedProductTypes.length > 0) {
        const matchesType = selectedProductTypes.some(
          (t) =>
            p.name.toLowerCase().includes(t.toLowerCase()) ||
            p.subCategory?.toLowerCase().includes(t.toLowerCase())
        );
        if (!matchesType) return false;
      }
      // Origin filter
      if (selectedOrigins.length > 0 && !selectedOrigins.includes(p.origin)) {
        return false;
      }
      // Global Search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesDesc = p.desc.toLowerCase().includes(query);
        const matchesCat = p.category.toLowerCase().includes(query);
        const matchesSub = p.subCategory?.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCat && !matchesSub) return false;
      }
      // Stock
      if (inStockOnly && !p.inStock) return false;
      // Collector item
      if (isCollectorOnly && !p.badge?.toLowerCase().includes('collector') && !p.badge?.toLowerCase().includes('rare')) {
        return false;
      }
      return true;
    });
  }, [
    selectedCategory,
    selectedSubCategories,
    selectedProductTypes,
    selectedOrigins,
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

  // Filter Sidebar Content (Shared between Desktop Left Sidebar & Mobile Drawer)
  const FilterSidebarContent = () => (
    <div className="space-y-6 text-navy">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-200">
        <h2 className="font-sans font-bold text-lg text-navy-deep tracking-tight">Filters</h2>
        {(selectedCategory !== 'All Categories' ||
          selectedSubCategories.length > 0 ||
          selectedProductTypes.length > 0 ||
          selectedOrigins.length > 0 ||
          searchQuery !== '' ||
          inStockOnly ||
          isCollectorOnly) && (
          <button
            onClick={handleResetFilters}
            className="text-xs font-sans font-medium text-orange hover:underline flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" /> Clear All
          </button>
        )}
      </div>

      {/* 1. SORT BY SECTION */}
      <div className="border-b border-gray-200 pb-5">
        <button
          onClick={() => setIsSortSectionOpen(!isSortSectionOpen)}
          className="w-full flex items-center justify-between font-sans font-bold text-sm text-navy-deep mb-3"
        >
          <span>Sort By</span>
          {isSortSectionOpen ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
        </button>

        {isSortSectionOpen && (
          <div className="space-y-2 pl-1">
            {sortOptionsList.map((opt) => (
              <label
                key={opt.value}
                className="flex items-center gap-3 text-xs font-sans text-navy/85 hover:text-navy cursor-pointer select-none py-0.5"
              >
                <input
                  type="radio"
                  name="sort-option"
                  checked={sortOption === opt.value}
                  onChange={() => setSortOption(opt.value)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer"
                />
                <span className={sortOption === opt.value ? 'font-bold text-navy-deep' : ''}>
                  {opt.label}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 2. CATEGORIES SECTION */}
      <div className="border-b border-gray-200 pb-5">
        <button
          onClick={() => setIsCategorySectionOpen(!isCategorySectionOpen)}
          className="w-full flex items-center justify-between font-sans font-bold text-sm text-navy-deep mb-3"
        >
          <span>Categories</span>
          {isCategorySectionOpen ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
        </button>

        {isCategorySectionOpen && (
          <div className="space-y-3">
            {/* Category Search Box */}
            <div className="relative">
              <input
                type="text"
                value={categorySearchQuery}
                onChange={(e) => setCategorySearchQuery(e.target.value)}
                placeholder="Search category..."
                className="w-full bg-[#fcfcfd] border border-gray-200 rounded-md px-3 py-1.5 text-xs font-sans text-navy focus:outline-none focus:border-navy-deep"
              />
            </div>

            {/* Category Checkboxes List */}
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {/* All Categories Option */}
              <label
                className={`flex items-center justify-between p-2 rounded text-xs font-sans cursor-pointer transition-colors ${
                  selectedCategory === 'All Categories' ? 'bg-navy-deep text-white font-bold' : 'hover:bg-gray-100 text-navy/85'
                }`}
                onClick={() => {
                  setSelectedCategory('All Categories');
                  setSelectedSubCategories([]);
                }}
              >
                <span>All Categories</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${selectedCategory === 'All Categories' ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'}`}>
                  {getCategoryCount('All Categories')}
                </span>
              </label>

              {/* Sub-categories under Rudraksha */}
              <div className="pl-1 space-y-1">
                <div className="text-[11px] font-sans font-bold text-gray-500 uppercase tracking-wider pt-1 pb-0.5 flex items-center justify-between">
                  <span>Rudraksha & Variants</span>
                  <span className="text-[10px] bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded-full">
                    {getCategoryCount('Rudraksha & Variants')}
                  </span>
                </div>
                {RUDRAKSHA_SUB_CATEGORIES.map((sub) => {
                  const count = getSubCategoryCount(sub);
                  const isChecked = selectedSubCategories.includes(sub);
                  return (
                    <label
                      key={sub}
                      className="flex items-center justify-between text-xs font-sans text-navy/80 hover:text-navy cursor-pointer py-1 pl-2"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleSubCategoryToggle(sub)}
                          className="w-3.5 h-3.5 border-gray-300 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                        <span className={isChecked ? 'font-bold text-navy-deep' : ''}>{sub}</span>
                      </div>
                      <span className="text-[10px] text-gray-500">{count}</span>
                    </label>
                  );
                })}
              </div>

              {/* Other main categories */}
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
                    className={`flex items-center justify-between p-2 rounded text-xs font-sans cursor-pointer transition-colors ${
                      isSelected ? 'bg-navy-deep text-white font-bold' : 'hover:bg-gray-100 text-navy/85'
                    }`}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setSelectedSubCategories([]);
                    }}
                  >
                    <span>{cat}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'}`}>
                      {count}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 3. PRODUCT TYPE SECTION */}
      <div className="border-b border-gray-200 pb-5">
        <button
          onClick={() => setIsProductTypeSectionOpen(!isProductTypeSectionOpen)}
          className="w-full flex items-center justify-between font-sans font-bold text-sm text-navy-deep mb-3"
        >
          <span>Product Type</span>
          {isProductTypeSectionOpen ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
        </button>

        {isProductTypeSectionOpen && (
          <div className="space-y-2 pl-1">
            {['Bracelet', 'Japa Mala', 'Pendant', 'Siddha Mala', 'Single Bead'].map((type) => {
              const isChecked = selectedProductTypes.includes(type);
              return (
                <label
                  key={type}
                  className="flex items-center gap-2.5 text-xs font-sans text-navy/80 hover:text-navy cursor-pointer py-0.5"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleProductTypeToggle(type)}
                    className="w-3.5 h-3.5 border-gray-300 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <span className={isChecked ? 'font-bold text-navy-deep' : ''}>{type}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. SPECIAL FILTERS */}
      <div className="pb-5">
        <button
          onClick={() => setIsSpecialFilterOpen(!isSpecialFilterOpen)}
          className="w-full flex items-center justify-between font-sans font-bold text-sm text-navy-deep mb-3"
        >
          <span>Special Filters</span>
          {isSpecialFilterOpen ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
        </button>

        {isSpecialFilterOpen && (
          <div className="space-y-2.5 pl-1">
            <label className="flex items-center gap-2.5 text-xs font-sans text-navy/85 cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-3.5 h-3.5 border-gray-300 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <span>In Stock Only</span>
            </label>

            <label className="flex items-center gap-2.5 text-xs font-sans text-navy/85 cursor-pointer">
              <input
                type="checkbox"
                checked={isCollectorOnly}
                onChange={(e) => setIsCollectorOnly(e.target.checked)}
                className="w-3.5 h-3.5 border-gray-300 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <span>Collector Items</span>
            </label>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#faf7f4] text-navy">
      <AnnouncementBar />
      <Navbar />

      {/* ── STICKY HANGING TOP SEARCH, FILTER & SORT BAR UNDER NAVBAR ── */}
      <div className="bg-white/95 backdrop-blur-md border-b border-orange/20 sticky top-16 sm:top-20 z-40 shadow-xs py-3 px-4 sm:px-6 md:px-8 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center relative gap-3 sm:gap-4">
          
          {/* Centered Search Input Box */}
          <div className="relative w-full md:w-1/2 lg:w-5/12 mx-auto">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-navy/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search all products by name, Mukhi, category, origin..."
              className="w-full pl-10 pr-9 py-2 sm:py-2.5 bg-[#faf7f4] border border-orange/25 rounded-xl text-xs sm:text-sm font-body text-navy focus:outline-none focus:border-orange transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-navy/40 hover:text-navy"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Controls: Filter Button (Mobile Only), Sort Selector, Clear All (Right-aligned on Desktop) */}
          <div className="flex items-center gap-2.5 w-full md:w-auto md:absolute md:right-0 justify-between md:justify-end shrink-0">
            {/* Filter Toggle Button (MOBILE ONLY - Hidden on Desktop) */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="md:hidden flex items-center justify-center gap-2 px-3.5 py-2 bg-navy-deep hover:bg-navy text-white rounded-xl text-xs font-heading font-bold uppercase tracking-wider transition-colors shadow-xs"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-orange" />
              <span>Filters</span>
              {(selectedCategory !== 'All Categories' ||
                selectedSubCategories.length > 0 ||
                selectedProductTypes.length > 0 ||
                selectedOrigins.length > 0 ||
                searchQuery !== '' ||
                inStockOnly ||
                isCollectorOnly) && (
                <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
              )}
            </button>

            {/* Sort Dropdown Selector */}
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="hidden sm:inline text-xs font-heading font-bold uppercase tracking-wider text-navy/60">
                Sort:
              </span>
              <div className="relative">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as SortOption)}
                  className="appearance-none bg-[#faf7f4] border border-orange/25 text-navy font-heading font-bold text-xs uppercase tracking-wider px-3 py-2 pr-8 rounded-xl focus:outline-none cursor-pointer shadow-2xs"
                >
                  {sortOptionsList.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-orange pointer-events-none" />
              </div>
            </div>

            {/* Reset Filters Button */}
            {(selectedCategory !== 'All Categories' ||
              selectedSubCategories.length > 0 ||
              selectedProductTypes.length > 0 ||
              selectedOrigins.length > 0 ||
              searchQuery !== '' ||
              inStockOnly ||
              isCollectorOnly) && (
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1 text-xs font-heading font-bold text-orange hover:underline px-2 py-1"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Main Layout (Left Edge Sidebar + Right Products Grid Area) */}
      <div className="flex-1 flex flex-col md:flex-row w-full min-h-[calc(100vh-140px)]">
        
        {/* DESKTOP LEFT CORNER STICKY SIDEBAR */}
        <aside className="hidden md:block w-72 lg:w-80 shrink-0 bg-white border-r border-orange/20 p-5 lg:p-6 sticky top-36 sm:top-40 max-h-[calc(100vh-160px)] overflow-y-auto">
          <FilterSidebarContent />
        </aside>

        {/* RIGHT MAIN CONTENT AREA */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 pb-16 sm:pb-24 space-y-6 max-w-full overflow-x-hidden">

          {/* Title Header & Counter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-orange/20 pb-4">
            <div>
              <h1 className="font-display font-bold text-2xl sm:text-3xl text-navy-deep tracking-tight">
                {selectedCategory === 'All Categories' ? 'All Products' : selectedCategory}
              </h1>
              <p className="text-xs sm:text-sm font-body text-navy/70 mt-1">
                Showing 1 - <span className="font-bold text-navy">{sortedProducts.length}</span> of{' '}
                <span className="font-bold text-navy">{productsData.length}</span> products
              </p>
            </div>
          </div>

          {/* Products Grid (Matching Image 2 layout with clean white cards) */}
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
                    className="group relative flex flex-col bg-white border border-gray-200/90 shadow-sm rounded-xl p-3 sm:p-4 hover:shadow-md transition-all duration-300"
                  >
                    {/* Image Box */}
                    <div className="relative aspect-square rounded-lg overflow-hidden border border-gray-100 mb-3 bg-[#faf7f4]">
                      <Link href={`/product/${product.id}`}>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                        />
                      </Link>

                      {/* Top Badges */}
                      <div className="absolute top-2 left-2 flex flex-col gap-1 items-start z-10 pointer-events-none">
                        {product.badge && (
                          <span className="bg-navy-deep text-white text-[9px] font-sans font-bold uppercase tracking-widest px-2 py-0.5 rounded shadow-sm">
                            {product.badge}
                          </span>
                        )}
                        {discount > 0 && (
                          <span className="bg-orange text-navy-deep text-[9px] font-sans font-bold uppercase tracking-widest px-2 py-0.5 rounded shadow-sm">
                            {discount}% OFF
                          </span>
                        )}
                      </div>

                      {/* Wishlist Button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleWishlist(product);
                        }}
                        className="absolute top-2 right-2 w-7 h-7 sm:w-8 sm:h-8 bg-white/90 backdrop-blur border border-gray-200 rounded-full flex items-center justify-center text-orange hover:bg-orange hover:text-white transition-all shadow-sm z-10"
                        aria-label="Add to wishlist"
                      >
                        <Heart
                          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                            isSaved ? 'fill-orange text-orange scale-110' : ''
                          }`}
                        />
                      </button>

                      {/* Desktop Quick Add Button */}
                      <div className="absolute bottom-0 left-0 w-full p-2.5 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hidden lg:block z-10">
                        <button
                          onClick={() => addToCart(product)}
                          className="w-full py-2 bg-navy-deep text-white font-sans font-bold uppercase tracking-widest rounded-md text-xs hover:bg-navy transition-colors flex items-center justify-center gap-2 shadow"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" /> Quick Add
                        </button>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex flex-col flex-1">
                      {/* Rating & Origin */}
                      <div className="flex items-center justify-between mb-1.5 flex-wrap gap-y-1">
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <GiStarSattelites
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.round(product.rating) ? 'text-orange' : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="text-[10px] font-sans text-gray-500 ml-1">
                            ({product.reviews})
                          </span>
                        </div>
                        <span className="text-[9px] font-sans font-bold text-gray-700 uppercase tracking-widest border border-gray-200 px-1.5 py-0.5 rounded bg-gray-50">
                          {product.origin}
                        </span>
                      </div>

                      <Link href={`/product/${product.id}`}>
                        <h3 className="font-sans text-sm sm:text-base text-navy-deep font-bold mb-1 line-clamp-2 leading-tight group-hover:text-orange transition-colors cursor-pointer">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-xs font-sans text-gray-600 line-clamp-2 mb-3 flex-1">
                        {product.desc}
                      </p>

                      {/* Price & Stock status */}
                      <div className="flex items-baseline justify-between mt-auto pt-3 border-t border-gray-100">
                        <div>
                          <span className="font-sans text-base sm:text-lg font-bold text-navy-deep">
                            {formatPrice(product.price)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs font-sans text-gray-400 line-through ml-2">
                              {formatPrice(product.originalPrice)}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] font-sans font-bold text-navy-deep bg-orange/15 border border-orange/30 px-1.5 py-0.5 rounded">
                          In Stock
                        </span>
                      </div>

                      {/* Lab certified bar */}
                      <div className="mt-2.5 bg-[#faf7f4] border border-gray-200 py-1 px-2 rounded flex items-center justify-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-orange" />
                        <span className="text-[9px] font-sans font-bold text-navy-deep uppercase tracking-wider">
                          100% Lab Certified
                        </span>
                      </div>

                      {/* Mobile Add Button */}
                      <button
                        onClick={() => addToCart(product)}
                        className="mt-3 w-full py-2 bg-navy-deep text-white text-xs font-sans font-bold uppercase tracking-wider rounded-md lg:hidden"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Empty state */
            <div className="bg-white border border-gray-200 rounded-xl p-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-orange/10 text-orange flex items-center justify-center mx-auto text-xl font-serif">
                ॐ
              </div>
              <h3 className="font-sans text-lg text-navy-deep font-bold">No Products Found</h3>
              <p className="text-xs sm:text-sm font-sans text-gray-500 max-w-sm mx-auto">
                No items match your selected filters. Try clearing your search query or filters.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2 bg-navy-deep text-white font-sans font-bold text-xs uppercase tracking-wider rounded-md"
              >
                Reset Filters
              </button>
            </div>
          )}

        </main>

      </div>

      {/* MOBILE RESPONSIVE SLIDE-IN FILTER DRAWER (Matching Image 3) */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-[150] flex md:hidden" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileFilterOpen(false)}
          />

          {/* Drawer Panel (left corner slide-over) */}
          <div className="relative w-80 sm:w-96 max-w-[85vw] h-full bg-white shadow-2xl p-5 overflow-y-auto flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                <h3 className="font-sans font-bold text-lg text-navy-deep">Filters</h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 text-gray-500 hover:text-navy"
                  aria-label="Close filters"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <FilterSidebarContent />
            </div>

            {/* Bottom Apply Action */}
            <div className="pt-4 border-t border-gray-200 mt-6 sticky bottom-0 bg-white">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3 bg-navy-deep text-white font-sans font-bold text-xs uppercase tracking-wider rounded-md shadow-md"
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
      <WishlistDrawer />
      <FloatingActions />
    </div>
  );
}
