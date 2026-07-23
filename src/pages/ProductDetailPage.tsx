import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MenuDrawer } from '@/components/MenuDrawer';
import { CartDrawer } from '@/components/CartDrawer';
import { WishlistDrawer } from '@/components/WishlistDrawer';
import { SearchOverlay } from '@/components/SearchOverlay';
import { FloatingActions } from '@/components/FloatingActions';
import { TrustPaymentBar } from '@/components/TrustPaymentBar';
import { productsData, Product } from '@/data/productsData';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { formatPrice } from '@/lib/utils';
import { Link, useRoute } from 'wouter';
import {
  ChevronRight,
  Heart,
  ShoppingBag,
  ShieldCheck,
  Award,
  Truck,
  RotateCcw,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ZoomIn,
  Pencil,
  Star,
  X,
  Check,
  ArrowRight,
  Compass,
  BookOpen,
  ThumbsUp,
  Ruler,
} from 'lucide-react';
import { GiStarSattelites, GiMeditation, GiLotusFlower, GiByzantinTemple } from 'react-icons/gi';

interface UserReview {
  id: string;
  name: string;
  initial: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  helpfulCount: number;
}

interface SizeOption {
  id: string;
  label: string;
  range: string;
  multiplier: number;
}

// Bead size tiers — mirrors the Small / Medium / Collector / Super Collector
// sizing pattern used across the catalog, with a price multiplier per tier.
const SIZE_OPTIONS: SizeOption[] = [
  { id: 'small', label: 'Small', range: '14-16mm', multiplier: 1 },
  { id: 'medium', label: 'Medium', range: '17-19mm', multiplier: 1.15 },
  { id: 'collector', label: 'Collector', range: '20-22mm', multiplier: 1.4 },
  { id: 'super-collector', label: 'Super Collector', range: '32mm+', multiplier: 2 },
];

export default function ProductDetailPage() {
  const [, params] = useRoute('/product/:id');
  const productId = params?.id || 'p3';

  // Find product from dataset or fallback
  const product: Product = useMemo(() => {
    const found = productsData.find((p) => p.id === productId);
    if (found) return found;
    return (
      productsData.find((p) => p.id === 'p3') || {
        id: 'p3',
        name: '10 Mukhi Rudraksha Beads',
        category: 'Rudraksha & Variants',
        subCategory: 'Rudraksha Beads',
        origin: 'Nepal',
        desc: 'Contains natural clefts symbolizing Lord Vishnu — ultimate divine protection, peace, and planetary stability.',
        price: 5226.9,
        originalPrice: 6500,
        rating: 4.9,
        reviews: 289,
        image: 'https://images.pexels.com/photos/13013622/pexels-photo-13013622.jpeg?auto=compress&cs=tinysrgb&w=800',
        badge: 'Featured',
        stockCount: 9,
        inStock: true,
      }
    );
  }, [productId]);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  // Gallery Thumbnails List — verified, working Rudraksha photography only
  const galleryImages = [
    product.image,
    'https://images.pexels.com/photos/18723427/pexels-photo-18723427.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/18723425/pexels-photo-18723425.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/34792315/pexels-photo-34792315.jpeg?auto=compress&cs=tinysrgb&w=800',
  ];

  const [selectedImage, setSelectedImage] = useState(galleryImages[0]);
  useEffect(() => {
    setSelectedImage(product.image);
  }, [product]);

  // 🔍 HIGH-POWER ULTRA LENS ZOOM MAGNIFIER (Scale 7.5x)
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    setMousePosition({ x, y });
    setZoomPosition({ x: xPercent, y: yPercent });
  }, []);

  // Quantity & Selection
  const [quantity, setQuantity] = useState(1);
  const [selectedCapping, setSelectedCapping] = useState('925 Sterling Silver');
  const [selectedOrigin, setSelectedOrigin] = useState<string>(product.origin || 'Nepal');
  const [selectedSize, setSelectedSize] = useState<SizeOption>(SIZE_OPTIONS[0]);
  const [activeTab, setActiveTab] = useState<'description' | 'benefits' | 'vidhi' | 'reviews'>('description');

  // Reset size back to base whenever the product changes
  useEffect(() => {
    setSelectedSize(SIZE_OPTIONS[0]);
  }, [product.id]);

  // Custom Order Form State
  const [selectedIntention, setSelectedIntention] = useState<string | null>('Spiritual Growth & Meditation');
  const [customFormSubmitted, setCustomFormSubmitted] = useState(false);

  // Reviews Data & Form State (Clean Theme Matched Navy & Saffron Gold)
  const [reviewsList, setReviewsList] = useState<UserReview[]>([
    {
      id: 'rev-1',
      name: 'Neha Mehta',
      initial: 'N',
      rating: 5,
      date: '22 Feb 2026',
      title: 'Perfect for Meditation and Calmness',
      comment: 'This has become part of my morning meditation ritual. It helps with mental clarity, grounding, and emotional steadiness.',
      verified: true,
      helpfulCount: 14,
    },
    {
      id: 'rev-2',
      name: 'Vikram Singh',
      initial: 'V',
      rating: 5,
      date: '22 Feb 2026',
      title: 'Great Value and Fast Insured Delivery',
      comment: 'Received within 3 days with authentic lab certificate & Pashupatinath puja prasadam. Product quality is authentic and convincing.',
      verified: true,
      helpfulCount: 9,
    },
    {
      id: 'rev-3',
      name: 'Sneha Kapoor',
      initial: 'S',
      rating: 5,
      date: '22 Feb 2026',
      title: 'Recommended for Daily Spiritual Practice',
      comment: 'I have included this in my daily japa routine. The natural Mukhi lines are deep and genuine. Highly recommended.',
      verified: true,
      helpfulCount: 11,
    },
  ]);

  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewComment.trim()) return;

    const newRev: UserReview = {
      id: `rev-${Date.now()}`,
      name: newReviewName,
      initial: newReviewName.charAt(0).toUpperCase(),
      rating: newReviewRating,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      title: newReviewTitle || 'Authentic & Blessed Sacred Rudraksha',
      comment: newReviewComment,
      verified: true,
      helpfulCount: 1,
    };

    setReviewsList([newRev, ...reviewsList]);
    setNewReviewName('');
    setNewReviewTitle('');
    setNewReviewComment('');
    setIsWriteReviewOpen(false);
  };

  const handleHelpfulClick = (id: string) => {
    setReviewsList((prev) =>
      prev.map((r) => (r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
    );
  };

  const isSaved = isInWishlist(product.id);

  // Size-adjusted pricing
  const effectivePrice = product.price * selectedSize.multiplier;
  const effectiveOriginalPrice = product.originalPrice ? product.originalPrice * selectedSize.multiplier : undefined;

  const discount = effectiveOriginalPrice
    ? Math.round(((effectiveOriginalPrice - effectivePrice) / effectiveOriginalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(
      {
        ...product,
        price: effectivePrice,
        originalPrice: effectiveOriginalPrice,
        name: `${product.name} (${selectedSize.label})`,
      },
      quantity
    );
  };

  // Related products
  const relatedProducts = useMemo(() => {
    return productsData.filter((p) => p.id !== product.id).slice(0, 4);
  }, [product.id]);

  return (
    <div className="flex flex-col min-h-screen bg-[#faf7f4] text-navy">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1">
        
        {/* Breadcrumb Navigation */}
        <div className="bg-navy-deep text-peach py-4 border-b border-orange/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs font-heading uppercase tracking-widest text-peach/75 overflow-x-auto whitespace-nowrap hide-scrollbar">
            <Link href="/" className="hover:text-orange transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-orange/60" />
            <Link href="/all-products" className="hover:text-orange transition-colors">
              All Products
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-orange/60" />
            <span className="text-orange font-bold truncate max-w-xs">{product.name}</span>
          </div>
        </div>

        {/* 1. TOP PRODUCT SHOWCASE SECTION (2-Column Grid) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-12 items-start">
            
            {/* LEFT COLUMN: Image Gallery & LENS ZOOM (6 Columns) */}
            <div className="lg:col-span-6 space-y-4">
              
              {/* Main Image Container with 7.5x Lens Zoom */}
              <div
                className="relative overflow-hidden cursor-crosshair w-full bg-white border border-navy/20 aspect-square rounded-2xl shadow-lg select-none"
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={handleMouseMove}
              >
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-2xl"
                />

                {/* Badges on Image */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
                  {product.badge && (
                    <span className="bg-crimson text-white text-[10px] font-heading font-bold uppercase tracking-widest px-3 py-1 rounded shadow-md border border-crimson/50">
                      {product.badge}
                    </span>
                  )}
                  {discount > 0 && (
                    <span className="bg-orange text-navy-deep text-[10px] font-heading font-bold uppercase tracking-widest px-3 py-1 rounded shadow-md">
                      {discount}% OFF
                    </span>
                  )}
                </div>

                {/* Zoom Badge Indicator */}
                <div className="absolute top-3 right-3 bg-navy-deep/80 text-orange backdrop-blur-md text-[10px] font-heading font-bold uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1.5 shadow pointer-events-none">
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>7.5x Detail Lens</span>
                </div>

                {/* CIRCULAR MAGNIFIER LENS EFFECT */}
                {isZoomed && (
                  <div
                    className="hidden md:block absolute pointer-events-none border-2 border-orange rounded-full shadow-[0_0_35px_rgba(0,0,0,0.4)] overflow-hidden bg-white z-30"
                    style={{
                      width: '220px',
                      height: '220px',
                      left: `${mousePosition.x - 110}px`,
                      top: `${mousePosition.y - 110}px`,
                    }}
                  >
                    <img
                      src={selectedImage}
                      alt={product.name}
                      className="object-cover max-w-none"
                      style={{
                        width: '100%',
                        height: '100%',
                        transform: 'scale(7.5)',
                        transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Thumbnails Gallery */}
              <div className="grid grid-cols-4 gap-3">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === img
                        ? 'border-orange shadow-sacred-glow scale-105'
                        : 'border-navy/15 hover:border-orange/50 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`view-${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Lab Certificate Box */}
              <div className="bg-navy-deep text-peach border border-orange/30 p-4 rounded-xl flex items-center gap-3.5 shadow-md">
                <div className="w-10 h-10 rounded-full bg-orange/20 border border-orange/50 flex items-center justify-center text-orange shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-heading font-bold text-orange uppercase tracking-wider">
                    ISO & GIA Verified Lab Certificate Included
                  </h4>
                  <p className="text-[11px] font-body text-peach/80">
                    Tested for natural Mukhi grooves, density, and X-Ray internal structure.
                  </p>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Details & Actions */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-heading font-bold uppercase tracking-widest text-orange bg-orange/10 border border-orange/30 px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                  <span className="text-[10px] font-heading font-bold uppercase tracking-widest text-navy-deep bg-orange/15 border border-orange/30 px-2.5 py-1 rounded-full">
                    In Stock ({product.stockCount} Available)
                  </span>
                </div>

                <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl text-navy-deep font-bold leading-tight">
                  {product.name}
                </h1>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <GiStarSattelites
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.round(product.rating) ? 'text-orange' : 'text-navy/20'
                        }`}
                      />
                    ))}
                    <span className="text-xs font-bold text-navy-deep ml-1">{product.rating}</span>
                  </div>
                  <span className="text-xs text-navy/60 font-body">({product.reviews} Verified Reviews)</span>
                  <span className="text-xs text-navy/40">|</span>
                  <span className="text-xs text-orange font-heading font-bold uppercase tracking-wider">
                    Origin: {selectedOrigin}
                  </span>
                </div>
              </div>

              {/* Price Box */}
              <div className="p-4 rounded-xl bg-white border border-navy/15 flex items-baseline gap-4 shadow-sm">
                <span className="font-display text-3xl font-bold text-navy-deep">
                  {formatPrice(effectivePrice * quantity)}
                </span>
                {effectiveOriginalPrice && (
                  <span className="text-base font-body text-navy/45 line-through">
                    {formatPrice(effectiveOriginalPrice * quantity)}
                  </span>
                )}
                {discount > 0 && (
                  <span className="bg-crimson text-white text-xs font-heading font-bold uppercase tracking-wider px-2.5 py-1 rounded ml-auto">
                    Save {discount}%
                  </span>
                )}
              </div>

              {/* Product detail text under the price — bumped from text-sm to text-base for readability */}
              <p className="text-base font-body text-navy/85 leading-relaxed border-l-2 border-orange/40 pl-4 py-1">
                {product.desc}
              </p>

              {/* Size Selection */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-heading font-bold uppercase tracking-wider text-navy/80 flex items-center gap-1.5">
                    <Ruler className="w-3.5 h-3.5 text-orange" />
                    Select Bead Size:
                  </label>
                  <span className="text-[11px] font-body text-navy/50">{product.stockCount} left</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {SIZE_OPTIONS.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2.5 px-3 rounded-lg text-center transition-all border ${
                        selectedSize.id === size.id
                          ? 'bg-navy-deep text-orange border-orange shadow-md scale-[1.02]'
                          : 'bg-white text-navy/80 border-navy/20 hover:border-orange'
                      }`}
                    >
                      <span className="block text-xs font-heading font-bold tracking-wider">{size.label}</span>
                      <span
                        className={`block text-[10px] mt-0.5 ${
                          selectedSize.id === size.id ? 'text-orange/80' : 'text-navy/50'
                        }`}
                      >
                        {size.range}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Capping Selection */}
              <div className="space-y-2">
                <label className="text-xs font-heading font-bold uppercase tracking-wider text-navy/80 block">
                  Select Capping / Frame Material:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5">
                  {['925 Sterling Silver', '24K Gold Plated', 'Sacred Red Thread'].map((cap) => (
                    <button
                      key={cap}
                      onClick={() => setSelectedCapping(cap)}
                      className={`py-2.5 px-3 rounded-lg text-xs font-heading font-bold tracking-wider transition-all border text-center ${
                        selectedCapping === cap
                          ? 'bg-navy-deep text-orange border-orange shadow-md scale-[1.02]'
                          : 'bg-white text-navy/80 border-navy/20 hover:border-orange'
                      }`}
                    >
                      {cap}
                    </button>
                  ))}
                </div>
              </div>

              {/* Harvest Origin Selection */}
              <div className="space-y-2">
                <label className="text-xs font-heading font-bold uppercase tracking-wider text-navy/80 block">
                  Select Harvest Origin:
                </label>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  {['Nepal', 'Java'].map((orig) => (
                    <button
                      key={orig}
                      onClick={() => setSelectedOrigin(orig)}
                      className={`flex-1 py-2.5 px-4 rounded-lg text-xs font-heading font-bold tracking-wider transition-all border text-center ${
                        selectedOrigin === orig
                          ? 'bg-orange text-navy-deep border-orange shadow-md font-bold'
                          : 'bg-white text-navy/80 border-navy/20 hover:border-orange'
                      }`}
                    >
                      {orig} Origin {orig === 'Nepal' ? '(Recommended)' : ''}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-3 pt-2">
                <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4">
                  <div className="flex items-center border border-navy/20 rounded-xl bg-white p-1 shrink-0">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-9 h-9 flex items-center justify-center text-navy hover:text-orange text-lg font-bold"
                    >
                      -
                    </button>
                    <span className="w-10 text-center font-heading font-bold text-sm text-navy-deep">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(product.stockCount, q + 1))}
                      className="w-9 h-9 flex items-center justify-center text-navy hover:text-orange text-lg font-bold"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="flex-1 min-w-[160px] py-3.5 px-4 sm:px-6 rounded-xl bg-navy-deep text-orange border border-orange hover:bg-orange hover:text-navy-deep font-heading font-bold text-xs sm:text-sm uppercase tracking-widest flex items-center justify-center gap-2 shadow-sacred-glow transition-all active:scale-95 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all shrink-0 ${
                      isSaved
                        ? 'border-orange bg-orange/20 text-orange'
                        : 'border-navy/20 bg-white text-navy/60 hover:border-orange hover:text-orange'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isSaved ? 'fill-orange' : ''}`} />
                  </button>
                </div>

                <button
                  onClick={() => {
                    handleAddToCart();
                    window.location.href = '/all-products';
                  }}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r bg-orange text-navy-deep font-heading font-bold text-xs sm:text-sm uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg hover:shadow-orange/30 transition-all cursor-pointer"
                >
                  <span>Buy Now - Instant Checkout</span>
                </button>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-navy/15">
                <div className="flex flex-col items-center text-center p-2 rounded-lg bg-white border border-navy/10">
                  <Truck className="w-5 h-5 text-orange mb-1" />
                  <span className="text-[10px] font-heading font-bold text-navy-deep uppercase">
                    Express Shipping
                  </span>
                </div>
                <div className="flex flex-col items-center text-center p-2 rounded-lg bg-white border border-navy/10">
                  <ShieldCheck className="w-5 h-5 text-orange mb-1" />
                  <span className="text-[10px] font-heading font-bold text-navy-deep uppercase">
                    Lab Certified
                  </span>
                </div>
                <div className="flex flex-col items-center text-center p-2 rounded-lg bg-white border border-navy/10">
                  <Sparkles className="w-5 h-5 text-orange mb-1" />
                  <span className="text-[10px] font-heading font-bold text-navy-deep uppercase">
                    Pashupatinath
                  </span>
                </div>
                <div className="flex flex-col items-center text-center p-2 rounded-lg bg-white border border-navy/10">
                  <RotateCcw className="w-5 h-5 text-orange mb-1" />
                  <span className="text-[10px] font-heading font-bold text-navy-deep uppercase">
                    7 Days Return
                  </span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 2. TABBED INFORMATION SECTION (Description, Benefits, How to Wear, Reviews - THEME MATCHED UI!) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
          <div className="bg-white border border-orange/20 rounded-2xl p-6 sm:p-8 shadow-md space-y-6">
            
            {/* Tab Bar Header */}
            <div className="flex overflow-x-auto hide-scrollbar border-b border-navy/15 gap-2 sm:gap-6 lg:gap-8 pb-1 whitespace-nowrap">
              {[
                { id: 'description', label: 'Description' },
                { id: 'benefits', label: 'Benefits' },
                { id: 'vidhi', label: 'How to Wear' },
                { id: 'reviews', label: 'Reviews' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-3 px-2 sm:px-4 font-heading font-bold text-xs sm:text-sm uppercase tracking-wider transition-all border-b-2 whitespace-nowrap cursor-pointer ${
                    activeTab === tab.id
                      ? 'border-orange text-orange font-bold'
                      : 'border-transparent text-navy/60 hover:text-navy'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB CONTENT: DESCRIPTION */}
            {activeTab === 'description' && (
              <div className="space-y-4 text-sm font-body text-navy/85 leading-relaxed">
                <h3 className="font-display text-lg text-navy-deep font-bold">
                  About {product.name}
                </h3>
                <p>{product.desc}</p>
              
              </div>
            )}

            {/* TAB CONTENT: BENEFITS */}
            {activeTab === 'benefits' && (
              <div className="space-y-4 text-sm font-body text-navy/85 leading-relaxed">
                <h3 className="font-display text-lg text-navy-deep font-bold">
                  Spiritual & Planetary Benefits of {product.name}
                </h3>
                <p>
                  Ruled by divine universal energies, wearing this authentic Nepali bead helps eliminate anxiety, fear, and obstacles. It promotes clear decision-making, inner peace, and divine protection across all nine planets.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-2">
                    <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-orange">
                      Key Blessings:
                    </h4>
                    <ul className="space-y-1.5 text-xs text-navy/80">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-orange shrink-0" />
                        Removes negative influences & evil eye protection
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-orange shrink-0" />
                        Improves focus during meditation & japa sadhana
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-orange shrink-0" />
                        Bestows all-round prosperity and health
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: HOW TO WEAR */}
            {activeTab === 'vidhi' && (
              <div className="space-y-3 text-sm font-body text-navy/85">
                <h4 className="font-heading font-bold text-xs uppercase text-orange">
                  Method of Energizing & Wearing (Vidhi):
                </h4>
                <ol className="list-decimal pl-5 space-y-2 text-xs text-navy/80 leading-relaxed">
                  <li>Best worn on a Monday morning during Brahma Muhurta after bathing.</li>
                  <li>Cleanse the bead gently in unboiled cow’s milk and holy Gangajal.</li>
                  <li>Chant "Om Namah Shivaya" or "Om Hreem Namah" 108 times facing East.</li>
                  <li>Apply sandalwood paste and wear it around your neck or wrist with devotion.</li>
                </ol>
              </div>
            )}

            {/* TAB CONTENT: REVIEWS (100% THEME-MATCHED TO SOFTBLUE & SAFFRON GOLD PALETTE!) */}
            {activeTab === 'reviews' && (
              <div className="space-y-8">
                
                {/* Rating Distribution & Community Score Banner */}
                <div className="bg-gradient-to-r from-[#faf7f4] via-white to-[#faf7f4] border border-orange/20 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-sm">
                  
                  {/* Rating Distribution Bars */}
                  <div className="w-full md:w-1/2 space-y-2.5">
                    <h4 className="font-heading font-bold text-sm text-navy-deep flex items-center gap-2 mb-3">
                      <span>Rating Distribution</span>
                      <span className="text-[10px] font-sans font-normal text-navy/60">(Based on 289 purchases)</span>
                    </h4>
                    
                    {[
                      { star: 5, count: 2, pct: 66 },
                      { star: 4, count: 1, pct: 33 },
                      { star: 3, count: 0, pct: 0 },
                      { star: 2, count: 0, pct: 0 },
                      { star: 1, count: 0, pct: 0 },
                    ].map((row) => (
                      <div key={row.star} className="flex items-center gap-3 text-xs font-sans">
                        <span className="w-5 flex items-center justify-end font-bold text-navy-deep gap-0.5">
                          {row.star} <Star className="w-3 h-3 text-orange fill-orange inline" />
                        </span>
                        <div className="flex-1 bg-gray-200/80 h-3 rounded-full overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-orange to-orange-bright h-full rounded-full transition-all duration-500 shadow-sm"
                            style={{ width: `${row.pct}%` }}
                          />
                        </div>
                        <span className="w-6 text-left font-semibold text-navy/70">{row.count}</span>
                      </div>
                    ))}
                  </div>

                  {/* Community Score & Action Button */}
                  <div className="w-full md:w-auto flex flex-col items-start md:items-end space-y-2 border-t md:border-t-0 md:border-l border-navy/15 pt-4 md:pt-0 md:pl-8">
                    <span className="text-[10px] font-heading font-bold tracking-[0.2em] text-orange uppercase bg-orange/10 border border-orange/30 px-3 py-1 rounded-full flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-orange" />
                      Devotee Community Score
                    </span>

                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl sm:text-5xl font-display font-bold text-navy-deep">4.9</span>
                      <div className="flex items-center text-orange">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-orange text-orange" />
                        ))}
                      </div>
                    </div>

                    <span className="text-xs font-body text-navy/70">
                      {reviewsList.length} verified devotee reviews
                    </span>

                    <button
                      onClick={() => setIsWriteReviewOpen(true)}
                      className="mt-3 inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-orange via-orange-bright to-orange text-navy-deep font-heading font-bold text-xs uppercase tracking-widest rounded-xl shadow-md hover:shadow-sacred-glow transition-all active:scale-95 cursor-pointer"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      <span>Write a Review</span>
                    </button>
                  </div>

                </div>

                {/* Write a Review Modal / Expandable Form */}
                {isWriteReviewOpen && (
                  <form
                    onSubmit={handleAddReview}
                    className="bg-white border border-orange/40 rounded-2xl p-6 shadow-xl space-y-4 animate-in fade-in"
                  >
                    <div className="flex items-center justify-between border-b border-navy/10 pb-3">
                      <h4 className="font-heading font-bold text-base text-navy-deep flex items-center gap-2">
                        <Pencil className="w-4 h-4 text-orange" /> Write Devotee Review
                      </h4>
                      <button
                        type="button"
                        onClick={() => setIsWriteReviewOpen(false)}
                        className="text-navy/50 hover:text-navy p-1"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-heading font-bold text-navy-deep block mb-1">Your Name *</label>
                        <input
                          type="text"
                          required
                          value={newReviewName}
                          onChange={(e) => setNewReviewName(e.target.value)}
                          placeholder="e.g. Neha Mehta"
                          className="w-full bg-[#faf7f4] border border-navy/20 rounded-xl px-3 py-2.5 text-xs font-body text-navy focus:outline-none focus:border-orange"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-heading font-bold text-navy-deep block mb-1">Rating *</label>
                        <select
                          value={newReviewRating}
                          onChange={(e) => setNewReviewRating(Number(e.target.value))}
                          className="w-full bg-[#faf7f4] border border-navy/20 rounded-xl px-3 py-2.5 text-xs font-body text-navy focus:outline-none focus:border-orange cursor-pointer"
                        >
                          <option value={5}>5 Stars (5/5) - Excellent</option>
                          <option value={4}>4 Stars (4/5) - Very Good</option>
                          <option value={3}>3 Stars (3/5) - Good</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-heading font-bold text-navy-deep block mb-1">Review Title</label>
                      <input
                        type="text"
                        value={newReviewTitle}
                        onChange={(e) => setNewReviewTitle(e.target.value)}
                        placeholder="e.g. Perfect for Meditation and Calmness"
                        className="w-full bg-[#faf7f4] border border-navy/20 rounded-xl px-3 py-2.5 text-xs font-body text-navy focus:outline-none focus:border-orange"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-heading font-bold text-navy-deep block mb-1">Your Experience / Comment *</label>
                      <textarea
                        rows={3}
                        required
                        value={newReviewComment}
                        onChange={(e) => setNewReviewComment(e.target.value)}
                        placeholder="Describe how this sacred Rudraksha bead impacted your daily sadhana or meditation…"
                        className="w-full bg-[#faf7f4] border border-navy/20 rounded-xl px-3 py-2.5 text-xs font-body text-navy focus:outline-none focus:border-orange resize-none"
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsWriteReviewOpen(false)}
                        className="px-4 py-2 bg-gray-200 text-navy font-heading font-bold text-xs rounded-xl hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-orange text-navy-deep font-heading font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-orange-bright shadow"
                      >
                        Post Review
                      </button>
                    </div>
                  </form>
                )}

                {/* Individual Verified Devotee Reviews List */}
                <div className="space-y-4">
                  {reviewsList.map((rev) => (
                    <div
                      key={rev.id}
                      className="bg-white border border-navy/15 hover:border-orange/40 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col space-y-3 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-3">
                          {/* Round Avatar Badge */}
                          <div className="w-10 h-10 rounded-full border border-orange/40 bg-orange/10 text-orange font-heading font-bold flex items-center justify-center text-sm shrink-0 shadow-sm">
                            {rev.initial}
                          </div>

                          <div>
                            <h5 className="font-heading font-bold text-sm text-navy-deep leading-tight">
                              {rev.name}
                            </h5>
                            {rev.verified && (
                              <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-navy-deep bg-orange/15 border border-orange/30 px-2 py-0.5 rounded-full flex items-center gap-1 inline-flex mt-1">
                                <Check className="w-3 h-3 text-orange" />
                                Verified Devotee
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col items-end">
                          <div className="flex items-center text-orange">
                            {[...Array(rev.rating)].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-orange text-orange" />
                            ))}
                          </div>
                          <span className="text-[10px] font-sans text-gray-500 mt-1">{rev.date}</span>
                        </div>
                      </div>

                      <div className="space-y-1.5 pt-1">
                        <h6 className="font-display font-bold text-sm sm:text-base text-navy-deep">
                          {rev.title}
                        </h6>
                        <p className="text-xs sm:text-sm font-body text-navy/85 leading-relaxed">
                          {rev.comment}
                        </p>
                      </div>

                      {/* Helpful Action Bar */}
                      <div className="pt-3 border-t border-navy/10 flex items-center justify-between text-xs">
                        <button
                          onClick={() => handleHelpfulClick(rev.id)}
                          className="flex items-center gap-1.5 text-navy/60 hover:text-orange font-heading transition-colors"
                        >
                          <ThumbsUp className="w-3.5 h-3.5 text-orange" />
                          <span>Helpful ({rev.helpfulCount})</span>
                        </button>
                        <span className="text-[10px] font-heading uppercase text-orange font-bold flex items-center gap-1">
                          <Award className="w-3.5 h-3.5 text-orange" />
                          <span>Lab Certified Purchase</span>
                        </span>
                      </div>

                    </div>
                  ))}
                </div>

              </div>
            )}

          </div>
        </section>

        {/* 3. YOU MAY ALSO LIKE */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 space-y-6">
          <div className="flex items-center justify-between border-b border-navy/15 pb-4">
            <h2 className="font-display text-xl sm:text-2xl text-navy-deep font-bold">
              You May Also Like
            </h2>
            <Link href="/all-products" className="text-xs font-heading font-bold text-orange uppercase tracking-wider hover:underline">
              View All Products →
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((rel) => (
              <Link
                key={rel.id}
                href={`/product/${rel.id}`}
                className="group relative flex flex-col bg-white border border-navy/15 shadow-sm rounded-xl p-3 hover:border-orange hover:shadow-sacred-glow transition-all duration-300"
              >
                <div className="aspect-square rounded-lg overflow-hidden border border-navy/10 mb-3 bg-[#faf7f4]">
                  <img
                    src={rel.image}
                    alt={rel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-display text-xs sm:text-sm text-navy-deep font-bold line-clamp-1 group-hover:text-orange">
                  {rel.name}
                </h3>
                <p className="text-[11px] font-body text-navy/70 line-clamp-1 mt-0.5">{rel.desc}</p>
                <div className="flex items-center justify-between mt-3 pt-2 border-t border-navy/10">
                  <span className="font-display text-sm font-bold text-navy-deep">{formatPrice(rel.price)}</span>
                  <span className="text-[10px] font-heading font-bold text-orange uppercase">View Details</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 4. EXPLORE OTHER CATEGORIES GRID — left exactly as-is, no changes */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 space-y-6">
          <h2 className="font-display text-xl sm:text-2xl text-navy-deep font-bold border-b border-navy/15 pb-4">
            Explore Other Categories
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 sm:grid-rows-2 gap-5 sm:gap-6 sm:h-[560px]">
            {[
              { name: 'Rudraksha Bracelets', cat: 'Rudraksha & Variants', img: 'https://images.pexels.com/photos/18723427/pexels-photo-18723427.jpeg?auto=compress&cs=tinysrgb&w=800', tall: true },
              { name: 'Combination & Kawach', cat: 'Rudraksha & Variants', img: 'https://images.pexels.com/photos/18723425/pexels-photo-18723425.jpeg?auto=compress&cs=tinysrgb&w=800', tall: true },
              { name: 'Siddha Mala', cat: 'Rudraksha & Variants', img: 'https://images.pexels.com/photos/34792315/pexels-photo-34792315.jpeg?auto=compress&cs=tinysrgb&w=800', tall: false },
              { name: 'Rudraksha Beads', cat: 'Rudraksha & Variants', img: 'https://images.pexels.com/photos/13013622/pexels-photo-13013622.jpeg?auto=compress&cs=tinysrgb&w=800', tall: false },
            ].map((c) => (
              <Link
                key={c.name}
                href={`/all-products?category=${encodeURIComponent(c.cat)}`}
                className={`group relative aspect-[4/3] sm:aspect-auto h-full rounded-2xl overflow-hidden border border-navy/20 shadow-lg hover:shadow-xl hover:border-orange/60 block transition-all duration-300 ${
                  c.tall ? 'sm:row-span-2' : 'sm:row-span-1'
                }`}
              >
                <img src={c.img} alt={c.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/50 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="text-peach font-heading font-bold text-base sm:text-lg uppercase tracking-wider group-hover:text-orange transition-colors">
                    {c.name}
                  </div>
                  <div className="mt-1.5 h-0.5 w-8 bg-orange/70 group-hover:w-14 transition-all duration-300" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 5. BESPOKE SPIRITUAL CUSTOMIZATION SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
          <div className="bg-gradient-to-b from-[#faf7f4] via-white to-[#faf7f4] border border-orange/25 rounded-3xl p-6 sm:p-10 shadow-md relative overflow-hidden space-y-8">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-2 text-[10px] font-heading font-bold uppercase tracking-[0.2em] text-orange bg-orange/10 border border-orange/30 px-4 py-1.5 rounded-full mb-3">
                <Compass className="w-3.5 h-3.5 text-orange" />
                Bespoke Spiritual Order · By Appointment
              </span>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-orange-gradient font-bold tracking-tight">
                Customize Your Personal Spiritual Order
              </h2>
              <p className="font-body text-navy/80 text-xs sm:text-sm md:text-base mt-2">
                Every seeker’s energy is unique. Our Vedic experts hand-craft each personalized Mala, Kawach, or Rudraksha ensemble based on your birth chart, planetary dasha, and specific spiritual intentions.
              </p>
            </div>

            {/* 2-Column Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Left Column: Crafting Process */}
              <div className="lg:col-span-6 bg-[#faf7f4] border border-navy/10 rounded-2xl p-6 flex flex-col justify-between space-y-6">
                <h3 className="font-heading font-bold text-sm text-navy-deep uppercase tracking-wider flex items-center gap-2">
                  <span className="w-4 h-px bg-orange" /> How It Works
                </h3>

                <div className="space-y-4">
                  {[
                    { n: '01', icon: GiMeditation, title: 'Select Your Intention', desc: 'Specify whether you seek meditation depth, protection from negative energies, business success, or health balance.' },
                    { n: '02', icon: GiByzantinTemple, title: 'Astrological Assessment', desc: 'Our Brahmin scholars evaluate ruling planetary dashas to recommend the optimal Mukhi combination for you.' },
                    { n: '03', icon: GiLotusFlower, title: 'Pashupatinath Abhishekam', desc: 'Hand-strung on pure silk or 925 silver wire and consecrated in your name during a personal Vedic ritual.' },
                  ].map((step) => (
                    <div key={step.n} className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-xl bg-orange/15 border border-orange/30 text-orange font-heading font-bold flex items-center justify-center text-sm shrink-0">
                        {step.n}
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-xs sm:text-sm text-navy-deep">{step.title}</h4>
                        <p className="font-body text-xs text-navy/70 mt-0.5">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-navy/10 flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-orange shrink-0" />
                  <span className="text-xs font-body text-navy/80">Includes official lab certification & holy Gangajal.</span>
                </div>
              </div>

              {/* Right Column: Interactive Consultation Request Form */}
              <div className="lg:col-span-6 bg-white border border-orange/30 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-bold text-sm text-navy-deep uppercase tracking-wider mb-3">
                    Choose Primary Intention:
                  </h3>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {[
                      'Spiritual Growth & Meditation',
                      'Wealth & Business Success',
                      'Health & Energy Shield',
                      'Protection & Aura Shield',
                      'Marital & Emotional Peace',
                      'Academic & Focus Power',
                    ].map((intent) => (
                      <button
                        key={intent}
                        type="button"
                        onClick={() => setSelectedIntention(intent)}
                        className={`p-2.5 rounded-lg text-left text-[11px] font-heading font-bold transition-all border ${
                          selectedIntention === intent
                            ? 'bg-navy-deep text-orange border-orange shadow'
                            : 'bg-[#faf7f4] text-navy/80 border-navy/15 hover:border-orange'
                        }`}
                      >
                        {intent}
                      </button>
                    ))}
                  </div>

                  <label className="text-xs font-heading font-bold text-navy/80 block mb-1">
                    Describe Your Requirements (Optional):
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Provide birth details (Date, Time, Location) or specific goals for personalized recommendation…"
                    className="w-full bg-[#faf7f4] border border-navy/20 rounded-xl p-3 text-xs font-body text-navy focus:outline-none focus:border-orange resize-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setCustomFormSubmitted(true)}
                  className="mt-4 w-full py-3.5 bg-gradient-to-r from-orange via-orange-bright to-orange text-navy-deep font-heading font-bold uppercase tracking-widest text-xs rounded-xl shadow-md hover:shadow-orange/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Request Custom Mala Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {customFormSubmitted && (
                  <p className="mt-2 text-center text-xs font-heading text-navy-deep font-bold animate-in fade-in flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-orange" />
                    <span>Request received! Our Vedic scholar will reach out within 4 hours.</span>
                  </p>
                )}
              </div>

            </div>
          </div>
        </section>

        {/* 6. RELATED BLOG ARTICLES SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-16 sm:pb-24">
          <div className="bg-[#faf7f4] border-t border-navy/15 pt-8 space-y-6">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-navy/15 pb-4">
              <div>
                <span className="inline-flex items-center gap-2 text-[10px] font-heading font-bold uppercase tracking-[0.2em] text-orange bg-orange/10 border border-orange/30 px-3.5 py-1.5 rounded-full mb-2">
                  <BookOpen className="w-3.5 h-3.5 text-orange" />
                  Wisdom Journal
                </span>
                <h2 className="font-display text-2xl sm:text-3xl text-navy-deep font-bold tracking-tight">
                  Related Spiritual Wisdom & Vedic Guides
                </h2>
              </div>

              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-orange uppercase tracking-wider hover:underline"
              >
                <span>View All Articles</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* 3 Blog Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  id: '1-mukhi-rudraksha-divine-bead',
                  category: 'Mukhi Guide',
                  title: '1 Mukhi Rudraksha | The Divine and Rarest Rudraksha Bead',
                  excerpt: 'Discover why Lord Shiva rules the 1 Mukhi bead and how it confers spiritual focus, health, and enlightenment.',
                  date: '22 Feb 2026',
                  readTime: '5 min read',
                  image: 'https://images.pexels.com/photos/18723428/pexels-photo-18723428.jpeg?auto=compress&cs=tinysrgb&w=600',
                },
                {
                  id: 'rudraksha-shrawan-7-benefits',
                  category: 'Vedic Practice',
                  title: 'Prana Pratishtha: How to Energize Your Rudraksha at Home',
                  excerpt: 'Step-by-step Vedic ritual for cleansing, consecrating, and maintaining your beads with sacred mantras and sandalwood oil.',
                  date: '18 Feb 2026',
                  readTime: '4 min read',
                  image: 'https://images.pexels.com/photos/32442615/pexels-photo-32442615.jpeg?auto=compress&cs=tinysrgb&w=600',
                },
                {
                  id: 'gauri-shankar-rudraksha-benefits',
                  category: 'Authenticity',
                  title: '5 Proven Lab Tests to Identify Genuine Nepali Rudraksha',
                  excerpt: 'X-Ray analysis, specific gravity tests, and copper coin test — how to protect yourself against counterfeit market beads.',
                  date: '10 Feb 2026',
                  readTime: '6 min read',
                  image: 'https://images.pexels.com/photos/18723426/pexels-photo-18723426.jpeg?auto=compress&cs=tinysrgb&w=600',
                },
              ].map((article) => (
                <Link
                  key={article.id}
                  href={`/article/${article.id}`}
                  className="group bg-white border border-navy/15 rounded-2xl overflow-hidden shadow-sm hover:border-orange hover:shadow-sacred-glow transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    <div className="relative aspect-[16/9] overflow-hidden bg-navy-deep">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <span className="absolute top-3 left-3 bg-navy-deep/90 text-orange text-[9px] font-heading font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-orange/40 backdrop-blur-md">
                        {article.category}
                      </span>
                    </div>

                    <div className="p-5 space-y-2">
                      <div className="flex items-center gap-2 text-[10px] font-sans text-gray-500">
                        <span>{article.date}</span>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </div>
                      <h3 className="font-display text-base text-navy-deep font-bold group-hover:text-orange transition-colors line-clamp-2 leading-snug">
                        {article.title}
                      </h3>
                      <p className="font-body text-xs text-navy/75 line-clamp-2 leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-2">
                    <span className="text-xs font-heading font-bold text-orange flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                      Read Article <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

          </div>
        </section>

      </main>

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