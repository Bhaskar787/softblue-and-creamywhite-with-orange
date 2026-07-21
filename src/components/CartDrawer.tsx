import { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';
import { X, ShoppingBag, ShoppingCart, Sparkles } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export function CartDrawer() {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeFromCart, subtotal } = useCart();

  // Local state lets us play a real closing animation instead of unmounting instantly.
  const [shouldRender, setShouldRender] = useState(isCartOpen);
  const [isClosing, setIsClosing] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);

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

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping cart"
    >
      <div
        className={`absolute inset-0 bg-navy-deep/80 backdrop-blur-sm transition-opacity duration-300 ${
          isClosing ? 'opacity-0' : 'opacity-100'
        }`}
        onClick={() => setIsCartOpen(false)}
      />

      <div
        className={`relative w-full sm:max-w-md h-full bg-navy-deep flex flex-col shadow-2xl border-l border-orange/30 overflow-hidden transition-transform duration-300 ease-out ${
          isClosing ? 'translate-x-full' : 'translate-x-0 animate-in slide-in-from-right'
        }`}
      >
        {/* Faint mandala watermark for a quiet Vedic touch */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[420px] aspect-square bg-mandala opacity-[0.04] pointer-events-none" />
        {/* Giant OM watermark */}
        <div className="absolute -bottom-8 -right-6 text-[150px] sm:text-[220px] text-orange/[0.04] font-serif select-none pointer-events-none leading-none">
          ॐ
        </div>

        <div className="relative z-10 flex items-center justify-between p-4 sm:p-6 border-b border-orange/20 bg-navy-deep">
          <h2 className="font-display text-xl sm:text-2xl text-orange flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" /> Your Sacred Cart
            {items.length > 0 && (
              <span className="text-[10px] sm:text-xs font-heading font-bold bg-orange text-navy-deep rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center ml-1">
                {items.reduce((n, i) => n + i.qty, 0)}
              </span>
            )}
          </h2>
          <button
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
            className="p-2 text-orange hover:text-orange-bright hover:bg-navy hover:rotate-90 transition-all duration-300 rounded-full"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        <div className="relative z-10 flex-1 overflow-y-auto p-4 sm:p-6 bg-navy-deep/60">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-peach-soft text-center animate-in fade-in zoom-in-95 duration-500">
              <ShoppingCart className="w-10 h-10 sm:w-14 sm:h-14 mb-4 text-orange" />
              <p className="font-heading text-base sm:text-lg mb-2 text-peach font-semibold">Your cart awaits its first bead</p>
              <p className="text-xs sm:text-sm text-peach/85 mb-6 max-w-[240px] italic">
                ॐ नमः शिवाय — begin your journey with a Rudraksha chosen for your intention.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-5 py-2.5 rounded-full border border-orange/40 text-orange text-[10px] sm:text-xs font-heading font-bold uppercase tracking-widest hover:bg-orange hover:text-navy-deep transition-colors"
              >
                Explore Rudraksha
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4 sm:gap-6">
              {items.map((item) => {
                const isRemoving = removingId === item.id;
                return (
                  <div
                    key={item.id}
                    className={`flex gap-3 sm:gap-4 p-3 sm:p-4 border border-orange/20 rounded-xl bg-navy-deep transition-all duration-200 hover:border-orange/40 ${
                      isRemoving ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                    }`}
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border border-orange/30 shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-heading text-orange text-xs sm:text-sm font-semibold mb-1 line-clamp-1">{item.name}</h4>
                        <p className="text-peach text-[10px] sm:text-xs font-medium">{formatPrice(item.price)}</p>
                      </div>
                      <div className="flex items-center justify-between mt-1 sm:mt-2">
                        <div className="flex items-center border border-orange/30 rounded bg-navy">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            aria-label="Decrease quantity"
                            className="px-2 py-0.5 text-orange hover:bg-orange hover:text-navy transition-colors font-bold"
                          >
                            -
                          </button>
                          <span className="px-2 sm:px-3 text-[10px] sm:text-xs text-peach tabular-nums font-semibold">{item.qty}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            aria-label="Increase quantity"
                            className="px-2 py-0.5 text-orange hover:bg-orange hover:text-navy transition-colors font-bold"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="text-[10px] sm:text-xs text-crimson hover:underline font-bold"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="relative z-10 p-4 sm:p-6 border-t border-orange/20 bg-navy-deep">
            <p className="flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] font-heading tracking-widest uppercase text-orange mb-3 sm:mb-4 font-semibold">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Energized at Pashupatinath before it ships
            </p>
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <span className="font-heading text-peach text-sm sm:text-base font-semibold">Subtotal</span>
              <span className="font-heading text-orange text-lg sm:text-xl font-bold">{formatPrice(subtotal)}</span>
            </div>
            <button className="w-full py-3 sm:py-4 bg-gradient-to-r from-orange to-orange-soft text-navy-deep font-heading font-bold rounded-xl hover:shadow-sacred-glow transition-all flex items-center justify-center gap-2 text-sm sm:text-base">
              <ShoppingBag className="w-4 h-4" /> Proceed to Checkout
            </button>
            <p className="text-center text-[10px] sm:text-[11px] text-peach/80 font-body italic mt-3 sm:mt-4">
              Namaste — every order is a small step on the path.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}