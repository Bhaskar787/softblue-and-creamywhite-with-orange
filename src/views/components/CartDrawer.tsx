import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { useCart } from '@/models/context/CartContext';
import { X, ShoppingBag, ShoppingCart, Sparkles, Truck, Trash2, Plus, Minus, Gift, Award, LogIn } from 'lucide-react';
import { formatPrice } from '@/utils/utils';

export function CartDrawer() {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeFromCart, subtotal, addToCart } = useCart();

  // Local state lets us play a real closing animation instead of unmounting instantly.
  const [shouldRender, setShouldRender] = useState(isCartOpen);
  const [isClosing, setIsClosing] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);

  // Sample upsell product ("Also Add:")
  const upsellProduct = {
    id: 'rud-br-5mukhi-upsell',
    name: '5 Mukhi Rudra Bracelet',
    price: 26900,
    image: 'https://images.pexels.com/photos/25283500/pexels-photo-25283500.jpeg?auto=compress&cs=tinysrgb&w=600',
  };
  const [upsellQty, setUpsellQty] = useState(1);
  const [upsellAdded, setUpsellAdded] = useState(false);

  useEffect(() => {
    if (isCartOpen) {
      setShouldRender(true);
      setIsClosing(false);
    } else if (shouldRender) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
        setIsClosing(false);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [isCartOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  // Lock page scroll while the drawer is open.
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isCartOpen]);

  // Close on Escape for a11y.
  useEffect(() => {
    if (!isCartOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsCartOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isCartOpen, setIsCartOpen]);

  if (!shouldRender) return null;

  const handleRemove = (id: string) => {
    setRemovingId(id);
    setTimeout(() => {
      removeFromCart(id);
      setRemovingId(null);
    }, 200);
  };

  const handleAddUpsell = () => {
    addToCart(upsellProduct, upsellQty);
    setUpsellAdded(true);
    setTimeout(() => setUpsellAdded(false), 1500);
  };

  const totalItemCount = items.reduce((n, i) => n + i.qty, 0);

  return (
    <div
      className="fixed inset-0 z-[150] flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping cart"
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-navy-deep/80 backdrop-blur-sm transition-opacity duration-300 ${
          isClosing ? 'opacity-0' : 'opacity-100'
        }`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer Container */}
      <div
        className={`relative w-full sm:max-w-md md:max-w-lg h-full bg-[#0E1B26] text-peach flex flex-col shadow-2xl border-l border-orange/30 overflow-hidden transition-transform duration-300 ease-out ${
          isClosing ? 'translate-x-full' : 'translate-x-0 animate-in slide-in-from-right'
        }`}
      >
        {/* Mandala Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] aspect-square bg-mandala opacity-[0.03] pointer-events-none" />

        {/* 1. Header */}
        <div className="relative z-10 flex items-center justify-between px-5 py-4 border-b border-orange/20 bg-[#0A141D]">
          <div className="flex items-center gap-3">
            <h2 className="font-display text-2xl text-orange font-bold flex items-center gap-2">
              Cart
            </h2>
            <span className="text-xs font-heading font-semibold text-peach/80 bg-orange/15 px-2.5 py-0.5 rounded-full border border-orange/30">
              {totalItemCount} {totalItemCount === 1 ? 'Item' : 'Items'}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
            className="p-1.5 text-peach/70 hover:text-orange hover:bg-navy-light/50 hover:rotate-90 transition-all duration-300 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2. Free Shipping Announcement Bar */}
        <div className="relative z-10 bg-gradient-to-r from-[#0E1B26] via-[#0E1B26] to-[#0E1B26] border-b border-[#f08254] px-4 py-2.5 text-xs flex items-center justify-between text-[#f08254] font-heading">
          <div className="flex items-center gap-2 font-medium">
            <Truck className="w-4 h-4 text-[#f08254] shrink-0" />
            <span>You are eligible for free shipping!</span>
          </div>
          <ShoppingBag className="w-4 h-4 text-[#f08254] shrink-0 opacity-80" />
        </div>

        {/* 3. Main Scrollable Body */}
        <div className="relative z-10 flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 hide-scrollbar">
          {items.length === 0 ? (
            <div className="h-full py-16 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-500">
              <div className="w-20 h-20 rounded-full bg-navy-mid/60 border border-orange/30 flex items-center justify-center mb-4 shadow-sacred-glow">
                <ShoppingCart className="w-9 h-9 text-[#f08254]" />
              </div>
              <p className="font-display text-xl text-peach font-bold mb-2">Your sacred cart is empty</p>
              <p className="text-xs text-peach/75 mb-6 max-w-xs italic font-body">
                ॐ नमः शिवाय — explore our Pashupatinath consecrated Rudraksha beads, malas, and sacred items.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-6 py-2.5 rounded-full border border-orange/50 bg-orange/10 text-orange text-xs font-heading font-bold uppercase tracking-widest hover:bg-orange hover:text-navy-deep transition-all"
              >
                Explore Sacred Collection
              </button>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="space-y-3.5">
                {items.map((item) => {
                  const isRemoving = removingId === item.id;

                  return (
                    <div
                      key={item.id}
                      className={`relative flex gap-3.5 p-3.5 border border-orange/20 rounded-xl bg-navy-deep/90 backdrop-blur-sm transition-all duration-200 hover:border-orange/40 ${
                        isRemoving ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                      }`}
                    >
                      {/* Item Thumbnail */}
                      <div className="w-20 h-20 rounded-lg overflow-hidden border border-orange/30 shrink-0 bg-navy">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>

                      {/* Item Content */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="font-heading text-orange text-sm font-bold leading-tight line-clamp-1">
                              {item.name}
                            </h4>
                            <button
                              onClick={() => handleRemove(item.id)}
                              className="text-peach/50 hover:text-crimson transition-colors p-1"
                              title="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Options Breakdown (matching reference image) */}
                          <div className="mt-1 space-y-0.5 text-[10.5px] text-peach/75 font-body">
                            <p><span className="font-medium text-peach/90">Select Size:</span> Medium (25-27mm)</p>
                            <p><span className="font-medium text-peach/90">Energization:</span> Free Touch Energization</p>
                            <p><span className="font-medium text-peach/90">Select Your Design:</span> Loose Bead</p>
                          </div>
                        </div>

                        {/* Price & Quantity Controls */}
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-orange/10">
                          <span className="text-xs font-heading font-semibold text-peach-bright">
                            {item.qty} X {formatPrice(item.price)}
                          </span>

                          {/* Quantity Selector */}
                          <div className="flex items-center border border-orange/30 rounded-lg bg-navy overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              aria-label="Decrease quantity"
                              className="px-2 py-1 text-orange hover:bg-orange hover:text-navy-deep transition-colors font-bold text-xs"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2.5 text-xs text-peach tabular-nums font-bold">
                              {item.qty}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              aria-label="Increase quantity"
                              className="px-2 py-1 text-orange hover:bg-orange hover:text-navy-deep transition-colors font-bold text-xs"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Subtotal & Agreement Box */}
              <div className="bg-navy-deep/80 border border-orange/20 rounded-xl p-4 space-y-2">
                <div className="flex justify-between items-center text-sm font-heading">
                  <span className="text-peach font-bold uppercase tracking-wider">TOTAL:</span>
                  <span className="text-orange text-lg font-extrabold">{formatPrice(subtotal)}</span>
                </div>
                <p className="text-[10px] text-peach/70 font-body leading-tight">
                  By purchasing the products, I agree with the{' '}
                  <Link href="#" className="underline hover:text-orange">terms of services</Link> and{' '}
                  <Link href="#" className="underline hover:text-orange">refund policy</Link>.
                </p>
              </div>

              {/* Offer Banner Card (Shravan Special & Rewards - Image 1 Concept) */}
              <div className="rounded-xl border border-amber-500/40 bg-gradient-to-br from-amber-950/40 via-navy-deep to-orange/10 p-3.5 space-y-2.5">
                <div className="flex items-start gap-2.5">
                  <Gift className="w-4 h-4 text-[#f08254] shrink-0 mt-0.5 animate-pulse" />
                  <p className="text-[11px] text-hsl(17.84deg 72.55% 90%) font-body leading-snug">
                    <strong className="text-[#f08254] font-heading">Shravan Special —</strong> Complete your order and earn a <span className="text-orange-bright font-bold">NPR 2,472.00</span> Gift Card. Straight to your Email and Whatsapp.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-amber-500/20 text-[11px] font-heading">
                  <div className="flex items-center gap-1.5 text-hsl(17.84deg 72.55% 90%)">
                    <Award className="w-3.5 h-3.5 text-orange" />
                    <span>Get <strong className="text-orange font-extrabold">42</strong>Coins</span>
                  </div>
                  <button className="flex items-center gap-1 text-[10px] font-bold bg-orange/20 border border-orange/40 text-orange px-2.5 py-1 rounded-full hover:bg-orange hover:text-navy-deep transition-all">
                    <LogIn className="w-3 h-3" /> Login to Get Rewards!
                  </button>
                </div>
              </div>

              {/* "Also Add:" Upsell Section inside Cart Drawer (Image 1 Concept) */}
              <div className="bg-navy-deep border border-orange/30 rounded-xl p-3.5 space-y-2.5">
                <span className="text-xs font-heading font-bold uppercase tracking-wider text-orange block">
                  Also Add:
                </span>
                <div className="flex items-center gap-3">
                  <img
                    src={upsellProduct.image}
                    alt={upsellProduct.name}
                    className="w-14 h-14 rounded-lg object-cover border border-orange/20 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-heading text-xs text-peach font-semibold truncate">
                      {upsellProduct.name}
                    </h5>
                    <p className="text-xs text-orange font-bold mt-0.5">
                      {formatPrice(upsellProduct.price)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 pt-1">
                  {/* Quantity selector */}
                  <div className="flex items-center border border-orange/30 rounded bg-navy text-xs">
                    <button
                      onClick={() => setUpsellQty((q) => Math.max(1, q - 1))}
                      className="px-2 py-1 text-orange hover:bg-orange hover:text-navy-deep transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-2.5 text-peach font-bold">{upsellQty}</span>
                    <button
                      onClick={() => setUpsellQty((q) => q + 1)}
                      className="px-2 py-1 text-orange hover:bg-orange hover:text-navy-deep transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Add to cart button */}
                  <button
                    onClick={handleAddUpsell}
                    className="px-4 py-1.5 bg-orange/90 hover:bg-orange text-navy-deep font-heading text-xs font-bold rounded-lg transition-all shadow-md active:scale-95"
                  >
                    {upsellAdded ? 'Added ✓' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* 4. Bottom Sticky Action Buttons (Image 1 Concept: PROCEED TO CHECKOUT & VIEW CART) */}
        {items.length > 0 && (
          <div className="relative z-10 p-4 border-t border-orange/20 bg-[#0A141D] space-y-2.5">
            <Link
              href="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="w-full py-3.5 bg-gradient-to-r from-orange via-orange-bright to-orange-soft text-navy-deep font-heading font-extrabold rounded-xl hover:shadow-sacred-glow transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-widest cursor-pointer text-center"
            >
              <ShoppingBag className="w-4 h-4" /> PROCEED TO CHECKOUT
            </Link>

            <Link
              href="/cart"
              onClick={() => setIsCartOpen(false)}
              className="w-full py-2.5 border border-orange/40 bg-navy-deep/60 hover:bg-navy-mid text-orange font-heading font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-widest cursor-pointer text-center"
            >
              VIEW CART
            </Link>

            <p className="text-center text-[10px] text-peach/60 font-body italic">
              Free Pashupatinath Energization & International Express Shipping Included
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartDrawer;