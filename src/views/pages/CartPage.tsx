import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Navbar } from '@/views/components/Navbar';
import { Footer } from '@/views/components/Footer';
import { CartDrawer } from '@/views/components/CartDrawer';
import { SearchOverlay } from '@/views/components/SearchOverlay';
import { MenuDrawer } from '@/views/components/MenuDrawer';
import { useCart } from '@/models/context/CartContext';
import { formatPrice } from '@/utils/utils';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  Gift,
  Award,
  LogIn,
  ShieldCheck,
  HeartHandshake,
  Globe,
  Star,
  Check,
  ChevronRight,
  Sparkles,
  Lock,
  MessageSquare,
  AlertCircle
} from 'lucide-react';

export function CartPage() {
  const [, setLocation] = useLocation();
  const { items, updateQuantity, removeFromCart, subtotal, addToCart } = useCart();
  const [orderNote, setOrderNote] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [showTermsError, setShowTermsError] = useState(false);
  const [showNote, setShowNote] = useState(false);

  // Cross-sell product
  const upsellProduct = {
    id: 'rud-br-5mukhi-cartpage',
    name: '5 Mukhi Rudraksha Bracelet',
    price: 26900,
    image: 'https://images.pexels.com/photos/25283500/pexels-photo-25283500.jpeg?auto=compress&cs=tinysrgb&w=600',
  };
  const [upsellQty, setUpsellQty] = useState(1);
  const [upsellAdded, setUpsellAdded] = useState(false);

  // Free shipping progress calculation (Threshold: 50,000)
  const freeShippingThreshold = 50000;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const amountNeeded = freeShippingThreshold - subtotal;

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear all items from your cart?')) {
      items.forEach((item) => removeFromCart(item.id));
    }
  };

  const handleAddUpsell = () => {
    addToCart(upsellProduct, upsellQty);
    setUpsellAdded(true);
    setTimeout(() => setUpsellAdded(false), 2000);
  };

  const handleCheckout = () => {
    if (!agreedTerms) {
      setShowTermsError(true);
      return;
    }
    setShowTermsError(false);
    setLocation('/checkout');
  };

  const totalItemCount = items.reduce((n, i) => n + i.qty, 0);

  const paymentLogos = [
    { name: 'Visa', url: 'https://img.icons8.com/color/96/visa.png' },
    { name: 'Mastercard', url: 'https://img.icons8.com/color/96/mastercard.png' },
    { name: 'Paytm', url: 'https://img.icons8.com/color/96/paytm.png' },
    { name: 'Amex', url: 'https://img.icons8.com/color/96/american-express.png' },
    { name: 'Apple Pay', url: 'https://img.icons8.com/color/96/apple-pay.png' },
    { name: 'PayPal', url: 'https://img.icons8.com/color/96/paypal.png' },
    { name: 'Google Pay', url: 'https://img.icons8.com/color/96/google-pay.png' },
    { name: 'RuPay', url: 'https://upload.wikimedia.org/wikipedia/commons/d/d1/RuPay-Logo.png' },
    { name: 'UPI', url: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg' },
    { name: 'Razorpay', url: 'https://images.seeklogo.com/logo-png/44/1/razorpay-logo-png_seeklogo-442270.png' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col font-body text-slate-800 antialiased selection:bg-amber-100 selection:text-amber-900">
      <Navbar />
      <CartDrawer />
      <SearchOverlay />
      <MenuDrawer />

      <main className="flex-1">
        {/* Breadcrumb Navigation */}
        <div className="bg-white border-b border-stone-200 py-3 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-medium text-stone-500">
            <Link href="/" className="hover:text-amber-700 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-stone-400" />
            <span className="text-stone-900 font-semibold">Shopping Cart</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          
          {/* Header Title */}
          <div className="flex items-center justify-between pb-6 border-b border-stone-200 mb-8">
            <div className="flex items-baseline gap-3">
              <h1 className="font-heading text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
                Your Shopping Cart
              </h1>
              <span className="text-xs font-semibold text-amber-800 bg-amber-100 border border-amber-200 px-3 py-1 rounded-full">
                {totalItemCount} {totalItemCount === 1 ? 'Item' : 'Items'}
              </span>
            </div>

            {items.length > 0 && (
              <button
                onClick={handleClearCart}
                className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-red-600 transition-colors py-1 px-2 rounded-lg hover:bg-stone-100"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear Cart
              </button>
            )}
          </div>

          {items.length === 0 ? (
            /* Empty Cart State */
            <div className="bg-white rounded-3xl border border-stone-200/80 p-12 sm:p-16 text-center max-w-xl mx-auto space-y-6 shadow-sm my-8">
              <div className="w-24 h-24 rounded-full bg-amber-50 border border-amber-200/60 flex items-center justify-center mx-auto text-amber-700 shadow-inner">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h2 className="font-heading text-2xl text-stone-900 font-bold">Your cart is empty</h2>
                <p className="text-sm text-stone-500 max-w-md mx-auto">
                  Looks like you haven't added any sacred artifacts or rudraksha items to your cart yet.
                </p>
              </div>
              <Link
                href="/all-products"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-navy hover:bg-navy-deep text-white font-semibold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg transform active:scale-95"
              >
                Explore Collection
              </Link>
            </div>
          ) : (
            /* Active Cart Layout */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* LEFT COLUMN: Cart Items & Perks */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* Shipping Progress Bar Offer */}
                <div className="bg-white rounded-2xl border border-stone-200/80 p-4 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span className="flex items-center gap-1.5 text-stone-700">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      {amountNeeded > 0 ? (
                        <>Add <strong className="text-amber-800 font-bold">{formatPrice(amountNeeded)}</strong> more to qualify for <strong>FREE Insured Express Shipping</strong></>
                      ) : (
                        <strong className="text-emerald-700">You qualify for FREE Insured Express Delivery!</strong>
                      )}
                    </span>
                    <span className="text-stone-500">{Math.round(progressToFreeShipping)}%</span>
                  </div>
                  <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full transition-all duration-500"
                      style={{ width: `${progressToFreeShipping}%` }}
                    />
                  </div>
                </div>

                {/* Shravan Special Promotion Banner */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 rounded-2xl p-4 flex items-start sm:items-center gap-3.5 shadow-sm">
                  <div className="p-2.5 bg-amber-500/10 rounded-xl text-amber-800 shrink-0">
                    <Gift className="w-5 h-5" />
                  </div>
                  <div className="text-xs sm:text-sm text-stone-700 space-y-0.5">
                    <p className="font-semibold text-stone-900">
                      Shravan Special Offer Included!
                    </p>
                    <p className="text-stone-600">
                      Complete this order today and automatically receive a <span className="font-bold text-amber-800">Rs. 300</span> Nepa Gift Voucher via Email/WhatsApp upon dispatch.
                    </p>
                  </div>
                </div>

                {/* Items Container */}
                <div className="bg-white rounded-2xl border border-stone-200/80 shadow-sm overflow-hidden">
                  <div className="p-4 sm:p-6 divide-y divide-stone-100">
                    {items.map((item) => (
                      <div key={item.id} className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center justify-between">
                        
                        {/* Product Meta */}
                        <div className="flex gap-4 items-start w-full sm:w-auto">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover border border-stone-200 shrink-0 bg-stone-50"
                          />
                          <div className="space-y-1.5 flex-1">
                            <h3 className="font-heading font-bold text-stone-900 text-base leading-snug">
                              {item.name}
                            </h3>
                            
                            <div className="text-xs text-stone-500 space-y-0.5">
                              <p><span className="font-medium text-stone-700">Size:</span> Collector Medium (25-27mm)</p>
                              <p><span className="font-medium text-stone-700">Energization:</span> Free Touch Energization Included</p>
                            </div>

                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="sm:hidden inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-700 font-medium pt-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" /> Remove
                            </button>
                          </div>
                        </div>

                        {/* Controls & Price Block */}
                        <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-0 border-stone-100">
                          
                          {/* Unit Price */}
                          <div className="text-left sm:text-right">
                            <span className="block text-[10px] text-stone-400 uppercase tracking-wider font-semibold">Price</span>
                            <span className="text-sm font-semibold text-stone-700">{formatPrice(item.price)}</span>
                          </div>

                          {/* Quantity Switcher */}
                          <div className="flex items-center border border-stone-300 rounded-lg bg-stone-50 overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-1.5 text-stone-600 hover:bg-stone-200 hover:text-stone-900 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-8 text-center text-xs font-bold text-stone-900 tabular-nums">
                              {item.qty}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-1.5 text-stone-600 hover:bg-stone-200 hover:text-stone-900 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Line Total */}
                          <div className="text-right min-w-[80px]">
                            <span className="block text-[10px] text-stone-400 uppercase tracking-wider font-semibold">Total</span>
                            <span className="font-heading font-extrabold text-stone-900 text-base">
                              {formatPrice(item.price * item.qty)}
                            </span>
                          </div>

                          {/* Remove button desktop */}
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="hidden sm:block text-stone-400 hover:text-red-600 transition-colors p-1 rounded-lg hover:bg-red-50"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                      </div>
                    ))}
                  </div>

                  <div className="bg-stone-50 px-6 py-3.5 border-t border-stone-100 flex items-center justify-between">
                    <Link
                      href="/all-products"
                      className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-amber-800 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" /> Continue Shopping
                    </Link>
                    <button
                      onClick={handleClearCart}
                      className="sm:hidden text-xs text-red-600 font-medium"
                    >
                      Clear All
                    </button>
                  </div>
                </div>

                {/* Rewards Loyalty Banner */}
                <div className="bg-amber-900/5 border border-amber-800/15 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5 text-center sm:text-left">
                    <div className="p-3 bg-amber-800 text-amber-100 rounded-xl shrink-0 hidden sm:block">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-amber-800 tracking-wider uppercase">
                        Sadhana Loyalty Rewards
                      </span>
                      <p className="text-sm font-bold text-stone-900">
                        Earn <span className="text-amber-800 font-extrabold">42 Nepa Coins</span> on this purchase
                      </p>
                      <p className="text-xs text-stone-500">Coins can be redeemed for instant discounts on future orders.</p>
                    </div>
                  </div>

                  <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-navy hover:bg-navy-deep text-orange font-semibold text-xs rounded-xl transition-all shrink-0">
                    <LogIn className="w-3.5 h-3.5 text-orange" /> Sign In to Earn
                  </button>
                </div>

                {/* Special Instructions Collapsible */}
                <div className="bg-white rounded-2xl border border-stone-200/80 p-4 shadow-sm">
                  <button
                    onClick={() => setShowNote(!showNote)}
                    className="w-full flex items-center justify-between text-xs font-bold text-stone-800 uppercase tracking-wider"
                  >
                    <span className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-stone-500" /> Add Order Instructions / Blessings Note
                    </span>
                    <span className="text-stone-400 text-lg">{showNote ? '−' : '+'}</span>
                  </button>
                  
                  {showNote && (
                    <div className="mt-3 pt-3 border-t border-stone-100">
                      <textarea
                        rows={3}
                        value={orderNote}
                        onChange={(e) => setOrderNote(e.target.value)}
                        placeholder="Write any special requests regarding energization name, gotra, or custom packaging..."
                        className="w-full p-3 rounded-xl border border-stone-300 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-stone-50/50"
                      />
                    </div>
                  )}
                </div>

              </div>

              {/* RIGHT COLUMN: Natural Page Flow (No sticky/floating positioning) */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Checkout Summary Box */}
                <div className="bg-white rounded-2xl border border-stone-200/80 shadow-md overflow-hidden">
                  
                  <div className="bg-navy-deep text-white px-6 py-4">
                    <h2 className="font-heading text-base text-orange font-bold uppercase tracking-wider flex items-center gap-2">
                      <Lock className="w-4 h-4 text-orange" /> Order Summary
                    </h2>
                  </div>

                  <div className="p-6 space-y-5">
                    
                    {/* Price Breakdown */}
                    <div className="space-y-3 text-xs">
                      <div className="flex justify-between items-center text-stone-600">
                        <span>Subtotal</span>
                        <span className="font-bold text-stone-900 text-sm">{formatPrice(subtotal)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center text-stone-600">
                        <span>Estimated Express Shipping</span>
                        <span className="font-semibold text-emerald-700">
                          {amountNeeded <= 0 ? 'FREE' : 'Calculated at checkout'}
                        </span>
                      </div>

                      <div className="flex justify-between items-center text-stone-600">
                        <span>Vedic Energization Service</span>
                        <span className="font-semibold text-emerald-700">FREE</span>
                      </div>

                      <div className="pt-3 border-t border-dashed border-stone-200 flex justify-between items-baseline">
                        <span className="font-heading font-extrabold text-stone-900 text-sm">Total</span>
                        <div className="text-right">
                          <span className="font-heading font-extrabold text-amber-800 text-xl block">
                            {formatPrice(subtotal)}
                          </span>
                          <span className="text-[10px] text-stone-400">Taxes included where applicable</span>
                        </div>
                      </div>
                    </div>

                    {/* Terms & Conditions Checkbox */}
                    <div className="space-y-2 pt-2 border-t border-stone-100">
                      <div className="flex items-start gap-2.5 text-xs text-stone-600">
                        <input
                          type="checkbox"
                          id="cart-terms"
                          checked={agreedTerms}
                          onChange={(e) => {
                            setAgreedTerms(e.target.checked);
                            if (e.target.checked) setShowTermsError(false);
                          }}
                          className="mt-0.5 rounded border-stone-300 text-amber-700 focus:ring-amber-500 cursor-pointer h-4 w-4"
                        />
                        <label htmlFor="cart-terms" className="cursor-pointer select-none leading-relaxed">
                          I agree to the{' '}
                          <Link href="#" className="underline text-stone-800 hover:text-amber-800 font-medium">Terms of Service</Link>{' '}
                          and{' '}
                          <Link href="#" className="underline text-stone-800 hover:text-amber-800 font-medium">Refund Policy</Link>.
                        </label>
                      </div>

                      {showTermsError && (
                        <div className="flex items-center gap-1.5 text-red-600 text-xs font-medium">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>Please accept terms before proceeding.</span>
                        </div>
                      )}
                    </div>

                    {/* Proceed to Checkout Button */}
                    <button
                      onClick={handleCheckout}
                      className="w-full py-4 bg-amber-600 hover:bg-amber-700 text-white font-heading font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md hover:shadow-lg transform active:scale-98 flex items-center justify-center gap-2"
                    >
                      <span>Proceed To Checkout</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    {/* Advisory Callout */}
                    <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 text-[11px] font-body text-stone-500 leading-relaxed">
                      <strong className="text-stone-700">Notice for International Orders:</strong> Ensure international payments are enabled on your card or bank application for a smooth transaction.
                    </div>

                  </div>
                </div>

                {/* Upsell Cross-Sell Widget */}
                <div className="bg-amber-50/60 rounded-2xl border border-amber-200/80 p-4 space-y-3">
                  <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">
                    Recommended Addition
                  </span>
                  
                  <div className="flex items-center gap-3">
                    <img
                      src={upsellProduct.image}
                      alt={upsellProduct.name}
                      className="w-14 h-14 rounded-lg object-cover border border-amber-200 shrink-0 bg-white"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-heading text-xs font-bold text-stone-900 truncate">
                        {upsellProduct.name}
                      </h4>
                      <p className="text-xs font-extrabold text-amber-800 mt-0.5">
                        {formatPrice(upsellProduct.price)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-amber-200/60">
                    <div className="flex items-center border border-amber-300 rounded bg-white text-xs">
                      <button
                        onClick={() => setUpsellQty((q) => Math.max(1, q - 1))}
                        className="px-2 py-1 text-stone-600 hover:bg-amber-100 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-stone-900 font-bold">{upsellQty}</span>
                      <button
                        onClick={() => setUpsellQty((q) => q + 1)}
                        className="px-2 py-1 text-stone-600 hover:bg-amber-100 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={handleAddUpsell}
                      disabled={upsellAdded}
                      className={`px-4 py-2 font-heading font-bold text-xs rounded-lg transition-all shadow-sm flex items-center gap-1.5 ${
                        upsellAdded 
                          ? 'bg-emerald-700 text-white' 
                          : 'bg-amber-800 hover:bg-amber-900 text-white'
                      }`}
                    >
                      {upsellAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" /> Added
                        </>
                      ) : (
                        'Add to Order'
                      )}
                    </button>
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>




      </main>

      <Footer />
    </div>
  );
}
export default CartPage;