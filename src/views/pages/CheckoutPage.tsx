import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useCart } from '@/models/context/CartContext';
import {
  ShieldCheck,
  Lock,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Sparkles,
  CreditCard,
  Building2,
  Truck,
  ArrowRight,
  ShoppingBag,
  HelpCircle,
  Award,
  Flame,
  QrCode,
  Smartphone,
  Info,
  Check,
  ChevronDown,
  Trash2,
  RefreshCw,
  Copy,
  Download,
  AlertTriangle,
  ExternalLink,
  MessageSquare,
} from 'lucide-react';

type Step = 'contact' | 'consecration' | 'payment';
type PaymentStatus = 'idle' | 'processing' | 'success' | 'failed';

interface ShippingMethod {
  id: string;
  name: string;
  desc: string;
  price: number;
  eta: string;
}

const SHIPPING_METHODS: ShippingMethod[] = [
  {
    id: 'express-nepal',
    name: 'Nepal Express Delivery (Insured)',
    desc: 'Direct dispatch via Air/Courier with tamper-evident sacred seal',
    price: 0,
    eta: '1 - 2 Business Days',
  },
  {
    id: 'pashupati-energized',
    name: 'Pashupatinath Consecrated Air Express',
    desc: 'Shipped after Somwar Vedic Abhishekam ritual with Pandit bless certificate',
    price: 350,
    eta: '2 - 3 Business Days',
  },
  {
    id: 'global-express',
    name: 'Worldwide DHL / FedEx Sacred Express',
    desc: 'International tracked delivery with GIA/Lab Certificate customs clearance',
    price: 1850,
    eta: '4 - 7 Business Days',
  },
];

/* ── EXACT BRAND LOGO SVG COMPONENTS ── */
function EsewaLogo({ className = "h-6 sm:h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 44" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="140" height="44" rx="8" fill="#60BB46" />
      <path d="M24 13C17.925 13 13 17.925 13 24C13 30.075 17.925 35 24 35C29.2 35 33.54 31.4 34.68 26.5H29.26C28.38 28.56 26.36 30 24 30C20.69 30 18 27.31 18 24C18 20.69 20.69 18 24 18C26.36 18 28.38 19.44 29.26 21.5H34.68C33.54 16.6 29.2 13 24 13Z" fill="white"/>
      <path d="M21 21.5H35V24.5H21V21.5Z" fill="white"/>
      <text x="42" y="29" fill="white" fontSize="20" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="-0.5px">eSewa</text>
    </svg>
  );
}

function KhaltiLogo({ className = "h-6 sm:h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 44" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="140" height="44" rx="8" fill="#5C2D91" />
      <circle cx="25" cy="22" r="9" stroke="#F89D2A" strokeWidth="3.5" fill="none" />
      <path d="M25 17V22L28.5 25" stroke="#F89D2A" strokeWidth="3" strokeLinecap="round" />
      <text x="42" y="29" fill="white" fontSize="20" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="-0.5px">khalti</text>
    </svg>
  );
}

function FonepayLogo({ className = "h-6 sm:h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 44" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="140" height="44" rx="8" fill="#D32F2F" />
      <rect x="13" y="12" width="20" height="20" rx="4" fill="white" />
      <path d="M17 16H22V21H17V16Z" fill="#D32F2F" />
      <path d="M24 16H28V20H24V16Z" fill="#D32F2F" />
      <path d="M24 23H28V27H24V23Z" fill="#D32F2F" />
      <path d="M17 23H21V27H17V23Z" fill="#D32F2F" />
      <text x="40" y="29" fill="white" fontSize="18" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="-0.5px">fonepay</text>
    </svg>
  );
}

function VisaMastercardLogo({ className = "h-6" }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-1.5 bg-[#0F172A] px-2.5 py-1 rounded-lg border border-slate-700 ${className}`}>
      <span className="font-display font-black text-xs text-[#1A1F71] bg-white px-1.5 py-0.5 rounded tracking-tighter">VISA</span>
      <div className="flex items-center -space-x-1.5">
        <div className="w-3.5 h-3.5 rounded-full bg-[#EB001B]" />
        <div className="w-3.5 h-3.5 rounded-full bg-[#F79E1B] opacity-90" />
      </div>
    </div>
  );
}

function ConnectIpsLogo({ className = "h-6 sm:h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 150 44" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="150" height="44" rx="8" fill="#0A3B73" />
      <text x="12" y="28" fill="#F7941D" fontSize="17" fontWeight="900" fontFamily="system-ui, sans-serif">connect</text>
      <text x="94" y="28" fill="#FFFFFF" fontSize="17" fontWeight="900" fontFamily="system-ui, sans-serif">IPS</text>
    </svg>
  );
}

export default function CheckoutPage() {
  const [, setLocation] = useLocation();
  const { items, subtotal, removeFromCart, updateQuantity } = useCart();
  const [currentStep, setCurrentStep] = useState<Step>('contact');
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle');
  const [failureReason, setFailureReason] = useState<string>('');

  // Mobile Order Summary Toggle
  const [showMobileSummary, setShowMobileSummary] = useState(false);

  // Contact & Delivery Form State
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('Kathmandu');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('Nepal');
  const [orderNotes, setOrderNotes] = useState('');
  const [wantsWhatsappUpdates, setWantsWhatsappUpdates] = useState(true);

  // Consecration & Personalization State
  const [devoteeName, setDevoteeName] = useState('');
  const [gotra, setGotra] = useState('');
  const [rashi, setRashi] = useState('');
  const [sankalpaIntention, setSankalpaIntention] = useState('Health, Peace & Protection');
  const [includeXrayCert, setIncludeXrayCert] = useState(true);
  const [customKnotting, setCustomKnotting] = useState('Traditional Red Silk Thread');

  // Shipping Method
  const [selectedShipping, setSelectedShipping] = useState<string>('express-nepal');

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<'esewa' | 'khalti' | 'fonepay' | 'card' | 'cod'>('esewa');
  
  // Wallet specific form inputs
  const [esewaId, setEsewaId] = useState('');
  const [esewaMpin, setEsewaMpin] = useState('');
  const [khaltiId, setKhaltiId] = useState('');
  const [khaltiOtp, setKhaltiOtp] = useState('');

  // Card specific inputs
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [cardHolder, setCardHolder] = useState('');

  // Coupon Discount State
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  // Fonepay QR Modal State
  const [showQrModal, setShowQrModal] = useState(false);
  const [qrTimer, setQrTimer] = useState(299); // 4m 59s countdown

  // Order Information
  const [orderId, setOrderId] = useState('');
  const [transactionRef, setTransactionRef] = useState('');

  const activeShippingObj = SHIPPING_METHODS.find((s) => s.id === selectedShipping) || SHIPPING_METHODS[0];
  const shippingFee = activeShippingObj.price;
  const totalAmount = Math.max(0, subtotal - appliedDiscount + shippingFee);

  const formatPrice = (val: number) => `NPR ${val.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  // Timer countdown for Fonepay QR Modal
  useEffect(() => {
    let interval: any = null;
    if (showQrModal && qrTimer > 0) {
      interval = setInterval(() => setQrTimer((prev) => prev - 1), 1000);
    } else if (qrTimer === 0) {
      setShowQrModal(false);
      setPaymentStatus('failed');
      setFailureReason('Fonepay Dynamic QR session expired (5 min timeout). Please try again.');
    }
    return () => clearInterval(interval);
  }, [showQrModal, qrTimer]);

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');
    const code = couponCode.trim().toUpperCase();

    if (code === 'RUDRAN10' || code === 'SHIVARATRI') {
      const discount = Math.round(subtotal * 0.1);
      setAppliedDiscount(discount);
      setCouponSuccess('10% Sacred Discount Applied Successfully!');
    } else if (code === 'PASUPATI') {
      const discount = Math.min(subtotal, 1000);
      setAppliedDiscount(discount);
      setCouponSuccess('NPR 1,000 Special Blessing Discount Applied!');
    } else {
      setCouponError('Invalid promo code. Try RUDRAN10 for 10% off.');
    }
  };

  const executePayment = (shouldFail: boolean = false) => {
    if (!email || !phone || !firstName || !address || !city) {
      alert('Please fill out all required contact and shipping fields first.');
      setCurrentStep('contact');
      return;
    }

    setPaymentStatus('processing');

    setTimeout(() => {
      if (shouldFail) {
        setPaymentStatus('failed');
        setFailureReason('Bank authorization declined or wallet session timed out. Please check your balance or try another payment method.');
      } else {
        const generatedId = `RUD-${Math.floor(100000 + Math.random() * 900000)}`;
        const generatedTx = `TXN-${Math.floor(10000000 + Math.random() * 90000000)}`;
        setOrderId(generatedId);
        setTransactionRef(generatedTx);
        setPaymentStatus('success');
        setShowQrModal(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 2200);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#0F172A] font-body selection:bg-orange/20 selection:text-navy-deep flex flex-col">

      {/* Modern Professional Checkout Header */}
      <header className="sticky top-0 z-50 bg-[#0E1B26] border-b border-orange/25 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-orange overflow-hidden flex items-center justify-center p-1 relative">
              <div className="absolute inset-0 bg-orange/15 rounded-full animate-pulse" />
              <img
                src="https://res.cloudinary.com/deiusxdk9/image/upload/v1771952737/rudrantra/cms/rswcale9xcfa697s2kvw.png"
                alt="Rudrantra Logo"
                className="w-full h-full object-cover rounded-full mix-blend-screen"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg sm:text-xl font-bold tracking-widest bg-gradient-to-r from-orange via-[#FDEEE9] to-orange bg-clip-text text-transparent">
                RUDRANTRA
              </span>
              <span className="text-[9px] font-heading font-semibold uppercase tracking-[0.25em] text-orange/70 -mt-1 hidden xs:block">
                Sacred Vedic Treasury
              </span>
            </div>
          </Link>

          {/* Secure SSL & Support Indicator */}
          <div className="flex items-center gap-3 sm:gap-6 text-peach">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-deep border border-orange/30 text-xs font-heading">
              <Lock className="w-3.5 h-3.5 text-orange" />
              <span>256-Bit Bank Encrypted Checkout</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-heading font-bold text-orange">
              <ShieldCheck className="w-4 h-4 text-orange" />
              <span className="hidden sm:inline">Pashupatinath Verified</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Checkout Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">

        {/* ── VIEW 1: SUCCESSFUL PAYMENT & ORDER CONFIRMATION ── */}
        {paymentStatus === 'success' ? (
          <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-[#E2D9CC] shadow-2xl p-6 sm:p-10 text-center space-y-8 animate-in fade-in zoom-in-95 duration-500">
            
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-100 text-emerald-600 border-2 border-emerald-500 flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-600" />
            </div>

            <div className="space-y-3">
              <span className="inline-block px-4 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-heading text-xs font-bold uppercase tracking-widest">
                Payment Verified · Order Confirmed
              </span>
              <h1 className="font-display text-2xl sm:text-4xl font-bold text-[#0F172A]">
                Namaste, {firstName}! Your Sacred Order is Confirmed
              </h1>
              <p className="font-body text-sm sm:text-base text-[#475569] max-w-xl mx-auto">
                Thank you for choosing <strong className="text-[#0F172A]">Rudrantra</strong>. Your order has been placed successfully and registered for Pashupatinath Temple consecration.
              </p>
            </div>

            {/* Order & Transaction Details Card */}
            <div className="bg-[#FAF7F2] border border-[#E2D9CC] p-5 sm:p-6 rounded-2xl grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              <div>
                <span className="text-[10px] font-heading uppercase tracking-wider text-[#64748B] block font-bold">
                  Order Reference
                </span>
                <span className="font-mono text-sm sm:text-base font-bold text-[#0F172A]">{orderId}</span>
              </div>
              <div>
                <span className="text-[10px] font-heading uppercase tracking-wider text-[#64748B] block font-bold">
                  Transaction ID
                </span>
                <span className="font-mono text-xs sm:text-sm font-bold text-[#0F172A] truncate block">{transactionRef}</span>
              </div>
              <div>
                <span className="text-[10px] font-heading uppercase tracking-wider text-[#64748B] block font-bold">
                  Payment Method
                </span>
                <span className="font-heading text-sm font-bold text-orange uppercase">{paymentMethod}</span>
              </div>
            </div>

            {/* Live Consecration & Tracking Timeline */}
            <div className="bg-[#0E1B26] text-peach rounded-2xl p-5 sm:p-7 border border-orange/30 text-left space-y-4">
              <div className="flex items-center justify-between border-b border-orange/20 pb-3">
                <div className="flex items-center gap-2 text-orange font-heading font-bold text-sm">
                  <Flame className="w-4 h-4 text-orange" />
                  <span>Pashupatinath Consecration Timeline</span>
                </div>
                <span className="text-[10px] font-heading text-peach/70 uppercase tracking-widest">
                  Live Status: Processing
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-navy-deep border border-orange/30 space-y-1">
                  <span className="font-heading font-bold text-orange block">1. Bead Inspection</span>
                  <p className="text-[11px] text-peach/80">X-Ray density &amp; mukhi line verification completed.</p>
                </div>
                <div className="p-3 rounded-xl bg-navy-deep border border-orange/30 space-y-1">
                  <span className="font-heading font-bold text-orange block">2. Vedic Abhishekam</span>
                  <p className="text-[11px] text-peach/80">Chanting &amp; Gangajal bath under devotee name <strong className="text-peach">{devoteeName || firstName}</strong>.</p>
                </div>
                <div className="p-3 rounded-xl bg-navy-deep border border-orange/30 space-y-1">
                  <span className="font-heading font-bold text-orange block">3. Insured Dispatch</span>
                  <p className="text-[11px] text-peach/80">Packed with tamper seal &amp; numbered lab certificate.</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/all-products"
                className="w-full sm:w-auto px-8 py-3.5 bg-orange text-navy-deep font-heading font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-orange-bright transition-all shadow-md text-center"
              >
                Continue Exploring Treasures
              </Link>
              <Link
                href="/"
                className="w-full sm:w-auto px-8 py-3.5 bg-[#FAF7F2] border border-[#E2D9CC] text-[#0F172A] font-heading font-bold text-xs uppercase tracking-widest rounded-xl hover:border-orange transition-all text-center"
              >
                Return to Homepage
              </Link>
            </div>
          </div>
        ) : paymentStatus === 'failed' ? (
          /* ── VIEW 2: FAILED PAYMENT SCREEN ── */
          <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-red-200 shadow-2xl p-6 sm:p-10 text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-100 text-red-600 border-2 border-red-500 flex items-center justify-center mx-auto shadow-md">
              <XCircle className="w-10 h-10 sm:w-12 sm:h-12 text-red-600" />
            </div>

            <div className="space-y-2">
              <span className="inline-block px-4 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 font-heading text-xs font-bold uppercase tracking-widest">
                Payment Declined / Session Interrupted
              </span>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0F172A]">
                Payment Could Not Be Completed
              </h1>
              <p className="font-body text-xs sm:text-sm text-red-600 bg-red-50 p-3.5 rounded-xl border border-red-100 max-w-lg mx-auto leading-relaxed">
                {failureReason || 'Your bank or wallet session was cancelled. No amount was debited.'}
              </p>
            </div>

            <div className="bg-[#FAF7F2] border border-[#E2D9CC] p-4 sm:p-5 rounded-2xl text-left space-y-2 text-xs text-[#475569]">
              <span className="font-heading font-bold text-[#0F172A] block">What would you like to do next?</span>
              <ul className="list-disc list-inside space-y-1">
                <li>Check your eSewa / Khalti wallet balance or Bank mobile app authorization.</li>
                <li>Try selecting a different payment option (e.g. Fonepay QR Code or Cash on Delivery).</li>
                <li>Reach out to our Rudrantra Support desk via WhatsApp for guided help.</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setPaymentStatus('idle')}
                className="w-full sm:w-auto px-7 py-3.5 bg-orange text-navy-deep font-heading font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-orange-bright transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4 text-navy-deep" />
                <span>Retry Payment</span>
              </button>

              <button
                onClick={() => {
                  setPaymentStatus('idle');
                  setPaymentMethod('cod');
                }}
                className="w-full sm:w-auto px-7 py-3.5 bg-[#0E1B26] text-peach font-heading font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-[#1E293B] transition-all text-center cursor-pointer"
              >
                Switch to Cash on Delivery
              </button>

              <a
                href="https://wa.me/9779800000000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 bg-[#25D366] text-white font-heading font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-[#1EBE5D] transition-all flex items-center justify-center gap-2 text-center"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Help on WhatsApp</span>
              </a>
            </div>
          </div>
        ) : items.length === 0 ? (
          /* Empty Cart State */
          <div className="max-w-md mx-auto text-center bg-white border border-[#E2D9CC] rounded-3xl p-8 shadow-sm space-y-6">
            <div className="w-16 h-16 rounded-full bg-orange/15 text-orange flex items-center justify-center mx-auto">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h2 className="font-display text-2xl font-bold text-[#0F172A]">Your Sacred Bag is Empty</h2>
              <p className="text-xs sm:text-sm text-[#64748B]">
                Explore our collection of authentic lab-certified Nepali Rudraksha beads and malas.
              </p>
            </div>
            <Link
              href="/all-products"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-orange text-navy-deep font-heading font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-orange-bright transition-all shadow-md"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4 text-navy-deep" />
            </Link>
          </div>
        ) : (
          /* ── MAIN CHECKOUT FORM & SIDEBAR ── */
          <div className="space-y-6">
            
            {/* Mobile Order Summary Accordion Drawer */}
            <div className="lg:hidden bg-white border border-[#E2D9CC] rounded-2xl overflow-hidden shadow-xs">
              <button
                onClick={() => setShowMobileSummary(!showMobileSummary)}
                className="w-full p-4 bg-[#FAF7F2] flex items-center justify-between text-xs font-heading font-bold text-[#0F172A] cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-orange" />
                  <span>{showMobileSummary ? 'Hide Order Summary' : 'Show Order Summary'} ({items.length} items)</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showMobileSummary ? 'rotate-180' : ''}`} />
                </span>
                <span className="text-sm font-bold text-orange">{formatPrice(totalAmount)}</span>
              </button>

              {showMobileSummary && (
                <div className="p-4 border-t border-[#E2D9CC] space-y-4 bg-white">
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between text-xs gap-3">
                        <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover bg-navy-deep border" />
                        <div className="flex-1 min-w-0">
                          <span className="font-bold text-[#0F172A] block truncate">{item.name}</span>
                          <span className="text-[10px] text-[#64748B]">Qty: {item.qty}</span>
                        </div>
                        <span className="font-bold text-[#0F172A]">{formatPrice(item.price * item.qty)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              
              {/* LEFT COLUMN: MULTI-STEP FORM & GATEWAY LOGOS */}
              <div className="lg:col-span-7 space-y-6">

                {/* Step Progress Stepper */}
                <div className="flex items-center justify-between border-b border-[#E2D9CC] pb-4">
                  <button
                    onClick={() => setCurrentStep('contact')}
                    className={`flex items-center gap-2 text-xs sm:text-sm font-heading font-bold transition-colors cursor-pointer ${
                      currentStep === 'contact' ? 'text-orange border-b-2 border-orange pb-1' : 'text-[#64748B] hover:text-[#0F172A]'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-orange/15 text-orange flex items-center justify-center text-[10px]">1</span>
                    <span>Shipping &amp; Details</span>
                  </button>

                  <ChevronRight className="w-4 h-4 text-[#94A3B8]" />

                  <button
                    onClick={() => setCurrentStep('consecration')}
                    className={`flex items-center gap-2 text-xs sm:text-sm font-heading font-bold transition-colors cursor-pointer ${
                      currentStep === 'consecration' ? 'text-orange border-b-2 border-orange pb-1' : 'text-[#64748B] hover:text-[#0F172A]'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-orange/15 text-orange flex items-center justify-center text-[10px]">2</span>
                    <span>Consecration</span>
                  </button>

                  <ChevronRight className="w-4 h-4 text-[#94A3B8]" />

                  <button
                    onClick={() => setCurrentStep('payment')}
                    className={`flex items-center gap-2 text-xs sm:text-sm font-heading font-bold transition-colors cursor-pointer ${
                      currentStep === 'payment' ? 'text-orange border-b-2 border-orange pb-1' : 'text-[#64748B] hover:text-[#0F172A]'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-orange/15 text-orange flex items-center justify-center text-[10px]">3</span>
                    <span>Payment Method</span>
                  </button>
                </div>

                {/* ── STEP 1: CONTACT & SHIPPING ── */}
                {currentStep === 'contact' && (
                  <div className="bg-white rounded-3xl border border-[#E2D9CC] p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in duration-300">
                    
                    {/* Real Company Brand Logos Bar */}
                    <div className="bg-[#FAF7F2] p-4 sm:p-5 rounded-2xl border border-[#E2D9CC] space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-heading font-bold uppercase tracking-widest text-[#64748B]">
                          Supported Official Payment Gateways
                        </span>
                        <span className="text-[10px] font-heading text-emerald-600 font-bold flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5" /> 100% Encrypted
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                        {/* eSewa Official Brand Logo */}
                        <button
                          onClick={() => {
                            setPaymentMethod('esewa');
                            setCurrentStep('payment');
                          }}
                          className="p-3 rounded-xl border border-[#60BB46]/40 bg-white hover:bg-[#60BB46]/10 hover:border-[#60BB46] transition-all flex flex-col items-center justify-center gap-1 cursor-pointer shadow-2xs group"
                        >
                          <EsewaLogo className="h-6 sm:h-7" />
                          <span className="text-[9px] font-heading font-bold text-[#2E7D32] mt-0.5">eSewa Pay</span>
                        </button>

                        {/* Khalti Official Brand Logo */}
                        <button
                          onClick={() => {
                            setPaymentMethod('khalti');
                            setCurrentStep('payment');
                          }}
                          className="p-3 rounded-xl border border-[#5C2D91]/40 bg-white hover:bg-[#5C2D91]/10 hover:border-[#5C2D91] transition-all flex flex-col items-center justify-center gap-1 cursor-pointer shadow-2xs group"
                        >
                          <KhaltiLogo className="h-6 sm:h-7" />
                          <span className="text-[9px] font-heading font-bold text-[#4A148C] mt-0.5">Khalti Wallet</span>
                        </button>

                        {/* Fonepay Official Brand Logo */}
                        <button
                          onClick={() => {
                            setPaymentMethod('fonepay');
                            setCurrentStep('payment');
                          }}
                          className="p-3 rounded-xl border border-[#D32F2F]/40 bg-white hover:bg-[#D32F2F]/10 hover:border-[#D32F2F] transition-all flex flex-col items-center justify-center gap-1 cursor-pointer shadow-2xs group"
                        >
                          <FonepayLogo className="h-6 sm:h-7" />
                          <span className="text-[9px] font-heading font-bold text-[#C62828] mt-0.5">Fonepay QR</span>
                        </button>

                        {/* Visa/Mastercard Brand Logo */}
                        <button
                          onClick={() => {
                            setPaymentMethod('card');
                            setCurrentStep('payment');
                          }}
                          className="p-3 rounded-xl border border-orange/40 bg-white hover:bg-orange/10 hover:border-orange transition-all flex flex-col items-center justify-center gap-1 cursor-pointer shadow-2xs group"
                        >
                          <VisaMastercardLogo className="h-6" />
                          <span className="text-[9px] font-heading font-bold text-[#0F172A] mt-0.5">Cards / NetBank</span>
                        </button>
                      </div>
                    </div>

                    {/* Contact Input Form */}
                    <div className="space-y-4">
                      <h2 className="font-display text-xl font-bold text-[#0F172A]">
                        1. Contact Information
                      </h2>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-heading font-bold text-[#334155] mb-1.5">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="namaste@domain.com"
                            className="w-full px-4 py-3 rounded-xl border border-[#CBD5E1] bg-white text-xs sm:text-sm font-body text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange shadow-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-heading font-bold text-[#334155] mb-1.5">
                            Mobile Number (for Courier &amp; SMS) *
                          </label>
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+977 9800000000"
                            className="w-full px-4 py-3 rounded-xl border border-[#CBD5E1] bg-white text-xs sm:text-sm font-body text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange shadow-xs"
                          />
                        </div>
                      </div>

                      <label className="flex items-center gap-2 cursor-pointer pt-1">
                        <input
                          type="checkbox"
                          checked={wantsWhatsappUpdates}
                          onChange={(e) => setWantsWhatsappUpdates(e.target.checked)}
                          className="rounded text-orange focus:ring-orange w-4 h-4"
                        />
                        <span className="text-xs font-body text-[#475569]">
                          Send order tracking and Pashupatinath consecration photos via WhatsApp
                        </span>
                      </label>
                    </div>

                    <hr className="border-[#F1F5F9]" />

                    {/* Shipping Address Inputs */}
                    <div className="space-y-4">
                      <h2 className="font-display text-xl font-bold text-[#0F172A]">
                        2. Shipping Address
                      </h2>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-heading font-bold text-[#334155] mb-1.5">
                            First Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="Your First Name"
                            className="w-full px-4 py-3 rounded-xl border border-[#CBD5E1] bg-white text-xs sm:text-sm font-body text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-orange shadow-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-heading font-bold text-[#334155] mb-1.5">
                            Last Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Your Last Name"
                            className="w-full px-4 py-3 rounded-xl border border-[#CBD5E1] bg-white text-xs sm:text-sm font-body text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-orange shadow-xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-heading font-bold text-[#334155] mb-1.5">
                          Street Address &amp; House / Tole No. *
                        </label>
                        <input
                          type="text"
                          required
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="House No, Street Name, Tole or Landmark"
                          className="w-full px-4 py-3 rounded-xl border border-[#CBD5E1] bg-white text-xs sm:text-sm font-body text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-orange shadow-xs"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-heading font-bold text-[#334155] mb-1.5">
                            City / Town *
                          </label>
                          <input
                            type="text"
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="e.g. Kathmandu"
                            className="w-full px-4 py-3 rounded-xl border border-[#CBD5E1] bg-white text-xs sm:text-sm font-body text-[#0F172A] focus:outline-none focus:border-orange shadow-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-heading font-bold text-[#334155] mb-1.5">
                            District / Region *
                          </label>
                          <input
                            type="text"
                            required
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                            placeholder="District"
                            className="w-full px-4 py-3 rounded-xl border border-[#CBD5E1] bg-white text-xs sm:text-sm font-body text-[#0F172A] focus:outline-none focus:border-orange shadow-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-heading font-bold text-[#334155] mb-1.5">
                            Country *
                          </label>
                          <select
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-[#CBD5E1] bg-white text-xs sm:text-sm font-body text-[#0F172A] focus:outline-none focus:border-orange shadow-xs cursor-pointer"
                          >
                            <option value="Nepal">Nepal</option>
                            <option value="India">India</option>
                            <option value="United States">United States</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="Australia">Australia</option>
                            <option value="Canada">Canada</option>
                            <option value="Germany">Germany</option>
                            <option value="Other International">Other International</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <hr className="border-[#F1F5F9]" />

                    {/* Shipping Method Selector */}
                    <div className="space-y-3">
                      <h2 className="font-display text-xl font-bold text-[#0F172A]">
                        3. Shipping Method
                      </h2>

                      <div className="space-y-2.5">
                        {SHIPPING_METHODS.map((method) => (
                          <label
                            key={method.id}
                            onClick={() => setSelectedShipping(method.id)}
                            className={`flex items-start justify-between p-4 rounded-2xl border transition-all cursor-pointer ${
                              selectedShipping === method.id
                                ? 'border-orange bg-orange/10 shadow-sm'
                                : 'border-[#CBD5E1] bg-white hover:border-[#94A3B8]'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <input
                                type="radio"
                                name="shipping"
                                checked={selectedShipping === method.id}
                                onChange={() => setSelectedShipping(method.id)}
                                className="mt-1 text-orange focus:ring-orange"
                              />
                              <div>
                                <span className="font-heading font-bold text-xs sm:text-sm text-[#0F172A] block">
                                  {method.name}
                                </span>
                                <span className="font-body text-xs text-[#64748B] block mt-0.5">
                                  {method.desc}
                                </span>
                                <span className="text-[10px] font-heading font-bold text-orange mt-1 inline-block">
                                  Estimated Arrival: {method.eta}
                                </span>
                              </div>
                            </div>
                            <span className="font-heading font-bold text-xs sm:text-sm text-[#0F172A] shrink-0">
                              {method.price === 0 ? 'FREE' : formatPrice(method.price)}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        if (!email || !phone || !firstName || !address || !city) {
                          alert('Please fill in your Contact Email, Mobile, Name and Delivery Address.');
                          return;
                        }
                        setCurrentStep('consecration');
                        window.scrollTo({ top: 100, behavior: 'smooth' });
                      }}
                      className="w-full py-4 bg-orange text-navy-deep font-heading font-bold text-xs sm:text-sm uppercase tracking-widest rounded-xl hover:bg-orange-bright transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Proceed to Consecration Options</span>
                      <ArrowRight className="w-4 h-4 text-navy-deep" />
                    </button>
                  </div>
                )}

                {/* ── STEP 2: CONSECRATION & PERSONALIZATION ── */}
                {currentStep === 'consecration' && (
                  <div className="bg-white rounded-3xl border border-[#E2D9CC] p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in duration-300">
                    <div className="bg-[#0E1B26] text-peach p-5 sm:p-6 rounded-2xl border border-orange/30 space-y-2">
                      <div className="flex items-center gap-2 text-orange font-heading font-bold text-sm">
                        <Sparkles className="w-4 h-4 text-orange" />
                        <span>Free Pashupatinath Temple Abhishekam Registration</span>
                      </div>
                      <p className="text-xs sm:text-sm text-peach/85 font-body leading-relaxed">
                        Every bead at Rudrantra can be personalized with your birth details (Gotra &amp; Rashi). Our pandas perform Rudra Japa in your name before dispatch.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h2 className="font-display text-xl font-bold text-[#0F172A]">
                        Vedic Sankalpa Details (Optional)
                      </h2>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-heading font-bold text-[#334155] mb-1.5">
                            Devotee Full Name (For Puja Sankalpa)
                          </label>
                          <input
                            type="text"
                            value={devoteeName}
                            onChange={(e) => setDevoteeName(e.target.value)}
                            placeholder={firstName ? `${firstName} ${lastName}` : 'Devotee Name'}
                            className="w-full px-4 py-3 rounded-xl border border-[#CBD5E1] bg-white text-xs sm:text-sm font-body text-[#0F172A] focus:outline-none focus:border-orange shadow-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-heading font-bold text-[#334155] mb-1.5">
                            Vedic Gotra (If Known)
                          </label>
                          <input
                            type="text"
                            value={gotra}
                            onChange={(e) => setGotra(e.target.value)}
                            placeholder="e.g. Kashyapa / Vashistha"
                            className="w-full px-4 py-3 rounded-xl border border-[#CBD5E1] bg-white text-xs sm:text-sm font-body text-[#0F172A] focus:outline-none focus:border-orange shadow-xs"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-heading font-bold text-[#334155] mb-1.5">
                            Birth Rashi / Zodiac Sign
                          </label>
                          <input
                            type="text"
                            value={rashi}
                            onChange={(e) => setRashi(e.target.value)}
                            placeholder="e.g. Mesha, Vrishabha, Mithuna..."
                            className="w-full px-4 py-3 rounded-xl border border-[#CBD5E1] bg-white text-xs sm:text-sm font-body text-[#0F172A] focus:outline-none focus:border-orange shadow-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-heading font-bold text-[#334155] mb-1.5">
                            Primary Intention for Wearing
                          </label>
                          <select
                            value={sankalpaIntention}
                            onChange={(e) => setSankalpaIntention(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-[#CBD5E1] bg-white text-xs sm:text-sm font-body text-[#0F172A] focus:outline-none focus:border-orange shadow-xs cursor-pointer"
                          >
                            <option value="Health, Peace & Protection">Health, Peace &amp; Protection</option>
                            <option value="Career, Wealth & Success">Career, Wealth &amp; Success</option>
                            <option value="Spiritual Growth & Meditation">Spiritual Growth &amp; Meditation</option>
                            <option value="Remove Saturn/Rahu Dasha Remedies">Remove Saturn/Rahu Dasha Remedies</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <hr className="border-[#F1F5F9]" />

                    <div className="space-y-3">
                      <h2 className="font-display text-xl font-bold text-[#0F172A]">
                        Lab Certification &amp; Mala Finishing
                      </h2>

                      <label className="flex items-start gap-3 p-4 rounded-2xl border border-[#E2D9CC] bg-[#FAF7F2] cursor-pointer">
                        <input
                          type="checkbox"
                          checked={includeXrayCert}
                          onChange={(e) => setIncludeXrayCert(e.target.checked)}
                          className="mt-1 text-orange focus:ring-orange"
                        />
                        <div>
                          <span className="font-heading font-bold text-xs sm:text-sm text-[#0F172A] block">
                            Include Numbered Government X-Ray Lab Certificate (Free)
                          </span>
                          <span className="text-xs text-[#64748B] block mt-0.5">
                            Verifies authentic internal seed chambers (mukhis) &amp; specific gravity density.
                          </span>
                        </div>
                      </label>
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={() => setCurrentStep('contact')}
                        className="w-1/3 py-4 bg-[#FAF7F2] border border-[#E2D9CC] text-[#0F172A] font-heading font-bold text-xs uppercase tracking-widest rounded-xl hover:border-orange transition-all cursor-pointer text-center"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => {
                          setCurrentStep('payment');
                          window.scrollTo({ top: 100, behavior: 'smooth' });
                        }}
                        className="w-2/3 py-4 bg-orange text-navy-deep font-heading font-bold text-xs sm:text-sm uppercase tracking-widest rounded-xl hover:bg-orange-bright transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Proceed to Payment</span>
                        <ArrowRight className="w-4 h-4 text-navy-deep" />
                      </button>
                    </div>
                  </div>
                )}

                {/* ── STEP 3: REALISTIC PAYMENT GATEWAYS WITH ACTUAL LOGOS ── */}
                {currentStep === 'payment' && (
                  <div className="bg-white rounded-3xl border border-[#E2D9CC] p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in duration-300">
                    <div className="space-y-1">
                      <h2 className="font-display text-2xl font-bold text-[#0F172A] flex items-center gap-2">
                        <span>Select Payment Method</span>
                        <Lock className="w-4 h-4 text-orange" />
                      </h2>
                      <p className="text-xs text-[#64748B]">
                        All payments are 100% encrypted &amp; processed through official Nepal payment gateways.
                      </p>
                    </div>

                    {/* Interactive Payment Methods List */}
                    <div className="space-y-3.5">
                      
                      {/* 1. eSewa Payment Option */}
                      <div
                        onClick={() => setPaymentMethod('esewa')}
                        className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                          paymentMethod === 'esewa' ? 'border-[#60BB46] bg-[#60BB46]/10 shadow-sm' : 'border-[#CBD5E1] bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="payment"
                              checked={paymentMethod === 'esewa'}
                              onChange={() => setPaymentMethod('esewa')}
                              className="text-[#60BB46] focus:ring-[#60BB46]"
                            />
                            <div className="flex items-center gap-3">
                              <EsewaLogo className="h-7 sm:h-8" />
                              <span className="font-heading font-bold text-sm text-[#0F172A]">eSewa Mobile Wallet</span>
                            </div>
                          </div>
                          <span className="text-[10px] font-heading font-bold bg-[#60BB46] text-white px-2.5 py-0.5 rounded-full uppercase">Instant</span>
                        </div>

                        {paymentMethod === 'esewa' && (
                          <div className="mt-4 pt-4 border-t border-[#60BB46]/20 space-y-3.5 text-xs text-[#334155]">
                            <p>
                              Log in with your registered eSewa Mobile ID to pay instantly via eSewa merchant portal.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white p-3.5 rounded-xl border border-[#60BB46]/30">
                              <div>
                                <label className="block text-[10px] font-heading font-bold text-[#334155] mb-1">
                                  eSewa ID / Mobile Number
                                </label>
                                <input
                                  type="text"
                                  value={esewaId}
                                  onChange={(e) => setEsewaId(e.target.value)}
                                  placeholder="9800000000"
                                  className="w-full px-3 py-2 rounded-lg border border-[#CBD5E1] text-xs font-mono text-[#0F172A] focus:outline-none focus:border-[#60BB46]"
                                />
                              </div>

                              <div>
                                <label className="block text-[10px] font-heading font-bold text-[#334155] mb-1">
                                  eSewa Password / MPIN
                                </label>
                                <input
                                  type="password"
                                  value={esewaMpin}
                                  onChange={(e) => setEsewaMpin(e.target.value)}
                                  placeholder="••••"
                                  maxLength={6}
                                  className="w-full px-3 py-2 rounded-lg border border-[#CBD5E1] text-xs font-mono text-[#0F172A] focus:outline-none focus:border-[#60BB46]"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* 2. Khalti Payment Option */}
                      <div
                        onClick={() => setPaymentMethod('khalti')}
                        className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                          paymentMethod === 'khalti' ? 'border-[#5C2D91] bg-[#5C2D91]/10 shadow-sm' : 'border-[#CBD5E1] bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="payment"
                              checked={paymentMethod === 'khalti'}
                              onChange={() => setPaymentMethod('khalti')}
                              className="text-[#5C2D91] focus:ring-[#5C2D91]"
                            />
                            <div className="flex items-center gap-3">
                              <KhaltiLogo className="h-7 sm:h-8" />
                              <span className="font-heading font-bold text-sm text-[#0F172A]">Khalti Mobile Wallet</span>
                            </div>
                          </div>
                          <span className="text-[10px] font-heading font-bold bg-[#5C2D91] text-white px-2.5 py-0.5 rounded-full uppercase">Wallet</span>
                        </div>

                        {paymentMethod === 'khalti' && (
                          <div className="mt-4 pt-4 border-t border-[#5C2D91]/20 space-y-3.5 text-xs text-[#334155]">
                            <p>
                              Pay via Khalti account or linked Mobile Banking app in Nepal.
                            </p>

                            <div className="bg-white p-3.5 rounded-xl border border-[#5C2D91]/30 space-y-2">
                              <label className="block text-[10px] font-heading font-bold text-[#334155]">
                                Khalti Registered Mobile Number
                              </label>
                              <input
                                type="text"
                                value={khaltiId}
                                onChange={(e) => setKhaltiId(e.target.value)}
                                placeholder="98XXXXXXXX"
                                className="w-full px-3 py-2 rounded-lg border border-[#CBD5E1] text-xs font-mono text-[#0F172A] focus:outline-none focus:border-[#5C2D91]"
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* 3. Fonepay Dynamic QR Option */}
                      <div
                        onClick={() => setPaymentMethod('fonepay')}
                        className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                          paymentMethod === 'fonepay' ? 'border-[#D32F2F] bg-[#D32F2F]/10 shadow-sm' : 'border-[#CBD5E1] bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="payment"
                              checked={paymentMethod === 'fonepay'}
                              onChange={() => setPaymentMethod('fonepay')}
                              className="text-[#D32F2F] focus:ring-[#D32F2F]"
                            />
                            <div className="flex items-center gap-3">
                              <FonepayLogo className="h-7 sm:h-8" />
                              <span className="font-heading font-bold text-sm text-[#0F172A]">Fonepay Dynamic QR Code</span>
                            </div>
                          </div>
                          <span className="text-[10px] font-heading font-bold bg-[#D32F2F] text-white px-2.5 py-0.5 rounded-full uppercase">All Bank Apps</span>
                        </div>

                        {paymentMethod === 'fonepay' && (
                          <div className="mt-4 pt-4 border-t border-[#D32F2F]/20 space-y-3.5 text-xs text-[#334155]">
                            <p>
                              A dynamic Fonepay QR code with exact order amount ({formatPrice(totalAmount)}) will open. Scan with Global IME, Nabil, NIC Asia, Prabhu, EBL, NMB or any bank app.
                            </p>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setQrTimer(299);
                                setShowQrModal(true);
                              }}
                              className="w-full py-3 bg-[#D32F2F] text-white font-heading font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#B71C1C] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                            >
                              <QrCode className="w-4 h-4 text-white" />
                              <span>Open Fonepay Dynamic QR Code Modal</span>
                            </button>
                          </div>
                        )}
                      </div>

                      {/* 4. Credit / Debit Card Option */}
                      <div
                        onClick={() => setPaymentMethod('card')}
                        className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                          paymentMethod === 'card' ? 'border-orange bg-orange/10 shadow-sm' : 'border-[#CBD5E1] bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="payment"
                              checked={paymentMethod === 'card'}
                              onChange={() => setPaymentMethod('card')}
                              className="text-orange focus:ring-orange"
                            />
                            <div className="flex items-center gap-3">
                              <VisaMastercardLogo className="h-6" />
                              <span className="font-heading font-bold text-sm text-[#0F172A]">Debit / Credit Card (Visa, Mastercard, SCT)</span>
                            </div>
                          </div>
                        </div>

                        {paymentMethod === 'card' && (
                          <div className="mt-4 pt-4 border-t border-orange/20 space-y-4 text-xs">
                            
                            {/* Live Card Preview Box */}
                            <div className="bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white p-4 rounded-2xl shadow-xl space-y-4 relative overflow-hidden border border-orange/30">
                              <div className="flex justify-between items-center">
                                <span className="text-[10px] font-heading font-bold text-orange uppercase tracking-widest">
                                  256-Bit Encrypted Card
                                </span>
                                <span className="text-xs font-mono font-bold">VISA / MC</span>
                              </div>
                              <div className="font-mono text-base tracking-widest text-peach pt-2">
                                {cardNumber || '•••• •••• •••• ••••'}
                              </div>
                              <div className="flex justify-between items-end text-[10px]">
                                <div>
                                  <span className="text-[#94A3B8] block text-[8px] uppercase">Cardholder</span>
                                  <span className="font-heading font-bold uppercase">{cardHolder || 'DEVOTEE NAME'}</span>
                                </div>
                                <div>
                                  <span className="text-[#94A3B8] block text-[8px] uppercase">Expires</span>
                                  <span className="font-mono font-bold">{cardExpiry || 'MM/YY'}</span>
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block font-heading font-bold text-[#334155] mb-1">
                                  Cardholder Name
                                </label>
                                <input
                                  type="text"
                                  value={cardHolder}
                                  onChange={(e) => setCardHolder(e.target.value)}
                                  placeholder="Name on card"
                                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] bg-white text-xs font-body text-[#0F172A] focus:outline-none focus:border-orange"
                                />
                              </div>

                              <div>
                                <label className="block font-heading font-bold text-[#334155] mb-1">
                                  Card Number
                                </label>
                                <input
                                  type="text"
                                  value={cardNumber}
                                  onChange={(e) => setCardNumber(e.target.value)}
                                  placeholder="4111 2222 3333 4444"
                                  maxLength={19}
                                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] bg-white text-xs font-mono text-[#0F172A] focus:outline-none focus:border-orange"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block font-heading font-bold text-[#334155] mb-1">
                                  Expiry Date (MM/YY)
                                </label>
                                <input
                                  type="text"
                                  value={cardExpiry}
                                  onChange={(e) => setCardExpiry(e.target.value)}
                                  placeholder="MM/YY"
                                  maxLength={5}
                                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] bg-white text-xs font-mono text-[#0F172A] focus:outline-none focus:border-orange"
                                />
                              </div>

                              <div>
                                <label className="block font-heading font-bold text-[#334155] mb-1">
                                  CVV / CVC Code
                                </label>
                                <input
                                  type="password"
                                  value={cardCvc}
                                  onChange={(e) => setCardCvc(e.target.value)}
                                  placeholder="123"
                                  maxLength={4}
                                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] bg-white text-xs font-mono text-[#0F172A] focus:outline-none focus:border-orange"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* 5. Cash on Delivery (COD) Option */}
                      <div
                        onClick={() => setPaymentMethod('cod')}
                        className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                          paymentMethod === 'cod' ? 'border-[#334155] bg-slate-100 shadow-sm' : 'border-[#CBD5E1] bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="payment"
                              checked={paymentMethod === 'cod'}
                              onChange={() => setPaymentMethod('cod')}
                              className="text-[#334155] focus:ring-[#334155]"
                            />
                            <span className="font-heading font-bold text-sm text-[#0F172A]">Cash on Delivery (COD in Nepal Cities)</span>
                          </div>
                          <Truck className="w-5 h-5 text-[#334155]" />
                        </div>

                        {paymentMethod === 'cod' && (
                          <div className="mt-4 pt-3 border-t border-slate-300 space-y-2 text-xs text-[#475569]">
                            <p>
                              Pay in cash upon doorstep delivery. Our support desk will perform a quick phone call verification before dispatch.
                            </p>
                          </div>
                        )}
                      </div>

                    </div>

                    {/* Action Buttons: Pay & Test Fail Simulation */}
                    <div className="space-y-3 pt-2">
                      <div className="flex gap-3">
                        <button
                          onClick={() => setCurrentStep('consecration')}
                          className="w-1/3 py-4 bg-[#FAF7F2] border border-[#E2D9CC] text-[#0F172A] font-heading font-bold text-xs uppercase tracking-widest rounded-xl hover:border-orange transition-all cursor-pointer text-center"
                        >
                          Back
                        </button>

                        <button
                          onClick={() => executePayment(false)}
                          disabled={paymentStatus === 'processing'}
                          className="w-2/3 py-4 bg-gradient-to-r from-orange via-orange-bright to-orange text-navy-deep font-heading font-bold text-xs sm:text-sm uppercase tracking-widest rounded-xl hover:brightness-105 transition-all shadow-lg shadow-orange/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                        >
                          {paymentStatus === 'processing' ? (
                            <>
                              <div className="w-4 h-4 border-2 border-navy-deep border-t-transparent rounded-full animate-spin" />
                              <span>Verifying Payment...</span>
                            </>
                          ) : (
                            <>
                              <Lock className="w-4 h-4 text-navy-deep" />
                              <span>Pay &amp; Complete Order ({formatPrice(totalAmount)})</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Simulation Trigger to Test Failed Payment Flow */}
                      <div className="text-center pt-2">
                        <button
                          onClick={() => executePayment(true)}
                          className="text-[10px] font-heading text-red-500 hover:underline cursor-pointer opacity-70 hover:opacity-100"
                        >
                          [Dev Test: Simulate Payment Failure]
                        </button>
                      </div>
                    </div>

                  </div>
                )}

              </div>

              {/* RIGHT COLUMN: STICKY DESKTOP ORDER SUMMARY */}
              <div className="hidden lg:block lg:col-span-5 lg:sticky lg:top-24 space-y-6">
                <div className="bg-white rounded-3xl border border-[#E2D9CC] p-6 sm:p-7 shadow-lg space-y-6">
                  
                  <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-4">
                    <h2 className="font-display text-xl font-bold text-[#0F172A]">Order Summary</h2>
                    <span className="text-xs font-heading font-bold text-orange bg-orange/10 px-3 py-1 rounded-full">
                      {items.length} {items.length === 1 ? 'Sacred Item' : 'Sacred Items'}
                    </span>
                  </div>

                  {/* Items List */}
                  <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-1">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-3.5 items-center justify-between p-2.5 rounded-2xl bg-[#FAF7F2] border border-[#E2D9CC]/60">
                        <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-[#0E1B26] shrink-0 border border-[#E2D9CC]">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          <span className="absolute top-0 right-0 bg-orange text-navy-deep text-[9px] font-bold px-1.5 py-0.5 rounded-bl-md">
                            x{item.qty}
                          </span>
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="font-display text-xs sm:text-sm font-bold text-[#0F172A] truncate">
                            {item.name}
                          </h4>
                          <span className="text-[10px] text-[#64748B] font-heading block">
                            Lab Certified &amp; Consecrated
                          </span>
                          <div className="flex items-center gap-2 mt-1">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-5 h-5 rounded bg-white border border-[#CBD5E1] text-xs font-bold text-[#0F172A] flex items-center justify-center cursor-pointer"
                            >
                              -
                            </button>
                            <span className="text-xs font-mono font-bold text-[#0F172A]">{item.qty}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-5 h-5 rounded bg-white border border-[#CBD5E1] text-xs font-bold text-[#0F172A] flex items-center justify-center cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="font-heading font-bold text-xs sm:text-sm text-[#0F172A] block">
                            {formatPrice(item.price * item.qty)}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-[10px] text-red-500 hover:underline cursor-pointer mt-1 inline-flex items-center gap-0.5"
                          >
                            <Trash2 className="w-3 h-3" /> Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Promo Coupon Form */}
                  <form onSubmit={handleApplyCoupon} className="pt-2">
                    <label className="block text-xs font-heading font-bold text-[#334155] mb-1">
                      Have a Promo or Blessing Code?
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="e.g. RUDRAN10"
                        className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] bg-white text-xs font-mono uppercase text-[#0F172A] focus:outline-none focus:border-orange shadow-xs"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2.5 bg-[#0E1B26] text-peach font-heading font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#1E293B] transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                    {couponSuccess && <p className="text-[11px] font-heading font-bold text-green-600 mt-1.5">{couponSuccess}</p>}
                    {couponError && <p className="text-[11px] font-heading font-bold text-red-500 mt-1.5">{couponError}</p>}
                  </form>

                  <hr className="border-[#F1F5F9]" />

                  {/* Pricing Breakdown */}
                  <div className="space-y-2 text-xs font-heading">
                    <div className="flex justify-between text-[#64748B]">
                      <span>Items Subtotal</span>
                      <span className="font-bold text-[#0F172A]">{formatPrice(subtotal)}</span>
                    </div>

                    {appliedDiscount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Promo Discount</span>
                        <span className="font-bold">- {formatPrice(appliedDiscount)}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-[#64748B]">
                      <span>Shipping ({activeShippingObj.name})</span>
                      <span className="font-bold text-[#0F172A]">
                        {shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}
                      </span>
                    </div>

                    <div className="flex justify-between text-[#64748B]">
                      <span>Pashupatinath Consecration</span>
                      <span className="font-bold text-green-600 uppercase">FREE INCLUDED</span>
                    </div>

                    <div className="flex justify-between text-[#64748B]">
                      <span>GIA / Govt X-Ray Certificate</span>
                      <span className="font-bold text-green-600 uppercase">FREE INCLUDED</span>
                    </div>

                    <div className="pt-3 border-t border-[#E2D9CC] flex justify-between items-baseline">
                      <span className="font-display text-base font-bold text-[#0F172A]">Total Investment</span>
                      <div className="text-right">
                        <span className="font-display text-xl sm:text-2xl font-bold text-orange block">
                          {formatPrice(totalAmount)}
                        </span>
                        <span className="text-[9px] text-[#64748B] font-body block">Includes all local taxes &amp; insurance</span>
                      </div>
                    </div>
                  </div>

                  {/* Security Badges */}
                  <div className="bg-[#FAF7F2] p-3.5 rounded-2xl border border-[#E2D9CC] space-y-2 text-[11px] font-heading text-[#475569]">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-orange shrink-0" />
                      <span>100% Original Nepal Origin Guarantee</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-orange shrink-0" />
                      <span>Numbered X-Ray Density Certificate</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-orange shrink-0" />
                      <span>Insured Transit &amp; Replacement Protection</span>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        )}

      </main>

      {/* ── REALISTIC FONEPAY DYNAMIC QR MODAL ── */}
      {showQrModal && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 relative border border-[#E2D9CC] shadow-2xl text-center">
            
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-[#64748B] hover:text-[#0F172A] hover:bg-[#FAF7F2] cursor-pointer text-sm font-bold"
            >
              ✕
            </button>

            {/* Fonepay Official Logo Header */}
            <div className="space-y-2">
              <FonepayLogo className="h-8 sm:h-9 mx-auto" />
              <h3 className="font-display text-xl font-bold text-[#0F172A]">
                Fonepay Dynamic Merchant QR
              </h3>
              <p className="text-xs text-[#64748B]">
                Merchant: <strong className="text-[#0F172A]">RUDRANTRA SACRED TREASURY</strong>
              </p>
            </div>

            {/* Dynamic QR Code Box */}
            <div className="bg-[#FAF7F2] p-5 rounded-2xl border-2 border-dashed border-[#D32F2F]/40 space-y-3">
              <div className="w-48 h-48 bg-white p-3 rounded-xl mx-auto shadow-md border border-[#E2D9CC] flex flex-col items-center justify-center relative">
                {/* Generated QR Graphics */}
                <div className="w-full h-full border-4 border-black p-2 flex flex-col justify-between items-center relative">
                  <div className="w-full flex justify-between">
                    <div className="w-8 h-8 bg-black" />
                    <div className="w-8 h-8 bg-black" />
                  </div>
                  <div className="text-center font-mono font-bold text-[10px] text-[#D32F2F]">
                    RUDRANTRA SCAN
                  </div>
                  <div className="w-full flex justify-between">
                    <div className="w-8 h-8 bg-black" />
                    <div className="w-6 h-6 bg-[#D32F2F] rounded-full flex items-center justify-center text-white text-[8px] font-bold">
                      F
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center space-y-0.5">
                <span className="text-[10px] font-heading font-bold text-[#64748B] uppercase tracking-wider block">
                  Amount to Pay
                </span>
                <span className="font-display text-2xl font-bold text-[#D32F2F]">
                  {formatPrice(totalAmount)}
                </span>
              </div>
            </div>

            {/* Countdown & Instructions */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-mono font-bold">
                <span>QR Session Expires In:</span>
                <span className="text-red-600">{formatTimer(qrTimer)}</span>
              </div>

              <p className="text-xs text-[#475569] leading-relaxed">
                Open Global IME, Nabil, NIC Asia, Prabhu, eSewa or any Mobile Banking app in Nepal to scan and complete payment.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  setShowQrModal(false);
                  executePayment(false);
                }}
                className="w-full py-3.5 bg-[#D32F2F] text-white font-heading font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-[#B71C1C] transition-all shadow-md cursor-pointer"
              >
                I Have Completed QR Payment
              </button>

              <button
                onClick={() => setShowQrModal(false)}
                className="w-full py-2 text-xs font-heading font-bold text-[#64748B] hover:text-[#0F172A] cursor-pointer"
              >
                Cancel &amp; Select Other Method
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
