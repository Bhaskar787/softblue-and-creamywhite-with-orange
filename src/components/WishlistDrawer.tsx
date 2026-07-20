import { useEffect, useState } from 'react';
import { useWishlist, WishlistItem } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { X, Heart, ShoppingCart, ShoppingBag, Check } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export function WishlistDrawer() {
  const { isWishlistOpen, setIsWishlistOpen, items, toggleWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  // Local state lets us play a real closing animation instead of unmounting instantly.
  const [shouldRender, setShouldRender] = useState(isWishlistOpen);
  const [isClosing, setIsClosing] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [addedId, setAddedId] = useState<string | null>(null);

  useEffect(() => {
    if (isWishlistOpen) {
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
  }, [isWishlistOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  // Lock page scroll while the drawer is open.
  useEffect(() => {
    if (isWishlistOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isWishlistOpen]);

  // Close on Escape for a11y.
  useEffect(() => {
    if (!isWishlistOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsWishlistOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isWishlistOpen, setIsWishlistOpen]);

  if (!shouldRender) return null;

  const handleRemove = (id: string) => {
    setRemovingId(id);
    // Let the fade/scale-out play before actually removing the item from state.
    setTimeout(() => {
      const item = items.find((i) => i.id === id);
      if (item) toggleWishlist(item);
      setRemovingId(null);
    }, 200);
  };

  const handleAddToCart = (item: WishlistItem) => {
    addToCart(item);
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  const handleMoveAllToCart = () => {
    items.forEach((item) => addToCart(item));
    clearWishlist();
    setIsWishlistOpen(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Wishlist"
    >
      <div
        className={`absolute inset-0 bg-navy-deep/80 backdrop-blur-sm transition-opacity duration-300 ${
          isClosing ? 'opacity-0' : 'opacity-100'
        }`}
        onClick={() => setIsWishlistOpen(false)}
      />

      <div
        className={`relative w-full sm:max-w-md h-full bg-navy-deep flex flex-col shadow-2xl border-l border-orange/30 transition-transform duration-300 ease-out ${
          isClosing ? 'translate-x-full' : 'translate-x-0 animate-in slide-in-from-right'
        }`}
      >
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-orange/20 bg-navy-deep">
          <h2 className="font-display text-xl sm:text-2xl text-orange flex items-center gap-2">
            <Heart className="w-5 h-5 sm:w-6 sm:h-6" /> Sacred Wishlist
            {items.length > 0 && (
              <span className="text-[10px] sm:text-xs font-heading font-bold bg-orange text-navy-deep rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center ml-1">
                {items.length}
              </span>
            )}
          </h2>
          <button
            onClick={() => setIsWishlistOpen(false)}
            aria-label="Close wishlist"
            className="p-2 text-orange hover:text-orange-bright hover:bg-navy hover:rotate-90 transition-all duration-300 rounded-full"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-navy-deep">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-peach-soft text-center animate-in fade-in zoom-in-95 duration-500">
              <Heart className="w-12 h-12 sm:w-16 sm:h-16 mb-4 text-orange/40" />
              <p className="font-heading text-base sm:text-lg mb-2">Your wishlist is empty</p>
              <p className="text-xs sm:text-sm text-peach-soft/50 mb-6 max-w-[240px]">
                Save the beads and malas that speak to you — they'll wait for you here.
              </p>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="px-5 py-2 sm:px-6 sm:py-2.5 rounded-full border border-orange/40 text-orange text-[10px] sm:text-xs font-heading font-bold uppercase tracking-widest hover:bg-orange hover:text-navy-deep transition-colors"
              >
                Continue Browsing
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {items.map((item, i) => {
                const isRemoving = removingId === item.id;
                const justAdded = addedId === item.id;
                return (
                  <div
                    key={item.id}
                    style={{ animationDelay: `${i * 60}ms` }}
                    className={`group relative flex flex-col bg-navy-deep rounded-2xl p-2 sm:p-3 border border-orange/20 transition-all duration-200 hover:border-orange/50 hover:shadow-sacred-glow animate-in fade-in slide-in-from-bottom-2 fill-mode-both ${
                      isRemoving ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
                    }`}
                  >
                    <div className="relative aspect-square rounded-xl overflow-hidden mb-2 sm:mb-3 border border-orange/10">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <button
                        onClick={() => handleRemove(item.id)}
                        aria-label={`Remove ${item.name} from wishlist`}
                        className="absolute top-1 right-1 sm:top-2 sm:right-2 p-1 bg-navy-deep/80 backdrop-blur rounded-full text-orange hover:bg-crimson hover:text-peach transition-colors"
                      >
                        <X className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                    <h3 className="font-heading text-[11px] sm:text-sm text-orange font-semibold mb-1 line-clamp-1">{item.name}</h3>
                    <p className="text-[10px] sm:text-xs text-peach mb-2 sm:mb-3">{formatPrice(item.price)}</p>
                    <button
                      onClick={() => handleAddToCart(item)}
                      disabled={justAdded}
                      className={`mt-auto w-full py-1.5 sm:py-2 border text-[10px] sm:text-xs font-semibold uppercase tracking-wider rounded-lg transition-all duration-300 flex items-center justify-center gap-1 ${
                        justAdded
                          ? 'bg-orange border-orange text-navy-deep'
                          : 'bg-navy border-orange/30 text-orange hover:bg-orange hover:text-navy-deep'
                      }`}
                    >
                      {justAdded ? (
                        <>
                          <Check className="w-3 h-3" /> Added
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-3 h-3" /> Add
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-4 sm:p-6 border-t border-orange/20 bg-navy-deep">
            <button
              onClick={handleMoveAllToCart}
              className="w-full py-3 sm:py-3.5 bg-gradient-to-r from-orange to-orange-soft text-navy-deep font-heading font-bold text-[10px] sm:text-xs uppercase tracking-widest rounded-full transition-all hover:shadow-sacred-glow flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-3 h-3 sm:w-4 sm:h-4" /> Move All to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}