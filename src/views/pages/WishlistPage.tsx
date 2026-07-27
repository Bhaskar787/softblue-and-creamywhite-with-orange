import { useState } from 'react';
import { Link } from 'wouter';
import { Navbar } from '@/views/components/Navbar';
import { Footer } from '@/views/components/Footer';
import { CartDrawer } from '@/views/components/CartDrawer';
import { SearchOverlay } from '@/views/components/SearchOverlay';
import { MenuDrawer } from '@/views/components/MenuDrawer';
import { LeftReviewsDrawer } from '@/views/components/LeftReviewsDrawer';
import { useWishlist, WishlistItem } from '@/models/context/WishlistContext';
import { useCart } from '@/models/context/CartContext';
import { formatPrice } from '@/utils/utils';
import { Heart, ShoppingBag, ShieldCheck, Award, HeartHandshake, Globe, Check, Star } from 'lucide-react';
import { TrustPaymentBar } from '../components/TrustPaymentBar';

export function WishlistPage() {
  const { items, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const handleAddToCart = (item: WishlistItem) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });
    setAddedIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1500);
  };

  // Logos array matching Image 2 payment logos bar
  const paymentLogos = [
    { name: 'Mastercard', url: 'https://img.icons8.com/color/96/mastercard.png' },
    { name: 'Paytm', url: 'https://img.icons8.com/color/96/paytm.png' },
    { name: 'Amex', url: 'https://img.icons8.com/color/96/american-express.png' },
    { name: 'Apple Pay', url: 'https://img.icons8.com/color/96/apple-pay.png' },
    { name: 'PayPal', url: 'https://img.icons8.com/color/96/paypal.png' },
    { name: 'Google Pay', url: 'https://img.icons8.com/color/96/google-pay.png' },
    { name: 'RuPay', url: 'https://upload.wikimedia.org/wikipedia/commons/d/d1/RuPay-Logo.png' },
    { name: 'Shop Pay', url: 'https://img.icons8.com/color/96/shopify.png' },
    { name: 'UPI', url: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg' },
    { name: 'Razorpay', url: 'https://images.seeklogo.com/logo-png/44/1/razorpay-logo-png_seeklogo-442270.png' },
    { name: 'Visa', url: 'https://img.icons8.com/color/96/visa.png' },
  ];

  return (
    <div className="min-h-screen bg-warm flex flex-col font-body text-navy selection:bg-orange/30">
      <Navbar />
      <CartDrawer />
      <SearchOverlay />
      <MenuDrawer />
      <LeftReviewsDrawer />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Top Breadcrumb */}
        <div className="bg-navy-deep/5 border-b border-orange/15 py-3 px-4 sm:px-8 text-center">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-xs font-heading text-navy/70">
            <Link href="/" className="hover:text-orange transition-colors">Home</Link>
            <span>/</span>
            <span className="text-orange font-bold">Wishlist</span>
          </div>
        </div>

        {/* Wishlist Header & Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center mb-12">
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-wide uppercase">
              WISHLIST
            </h1>
            <div className="w-24 h-1 bg-orange mx-auto mt-4 rounded-full shadow-sacred-glow"></div>
          </div>

          {items.length === 0 ? (
            /* Empty State matching Image 2 */
            <div className="max-w-lg mx-auto py-12 sm:py-20 px-4 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-orange/10 border border-orange/30 flex items-center justify-center mb-5 sm:mb-6 shadow-sacred-glow">
                <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-orange" />
              </div>
              <p className="font-heading text-lg sm:text-xl md:text-2xl text-navy/80 font-medium mb-6 sm:mb-8 max-w-md">
                No products were added to the wishlist
              </p>
              <Link
                href="/all-products"
                className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-3.5 bg-[#6B4E2E] hover:bg-[#523A20] text-white font-heading font-bold text-xs sm:text-sm uppercase tracking-widest rounded-lg transition-all duration-300 shadow-md hover:shadow-xl active:scale-95 text-center cursor-pointer"
              >
                CONTINUE SHOPPING
              </Link>
            </div>
          ) : (
            /* Grid of Wishlist Products matching Image 2 */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {items.map((item) => {
                const isAdded = addedIds[item.id];

                return (
                  <div
                    key={item.id}
                    className="group relative bg-white rounded-2xl overflow-hidden border border-orange/20 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                  >
                    {/* Image Box */}
                    <div className="relative aspect-square overflow-hidden bg-warm-deep">
                      <Link href={`/product/${item.id}`} className="block w-full h-full cursor-pointer">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover  "
                        />
                      </Link>
                      
                      {/* Heart / Wishlist Toggle Button (Image 2 style badge) */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          toggleWishlist(item);
                        }}
                        className="absolute top-3 right-3 w-10 h-10 rounded-full bg-[#B8860B] hover:bg-[#8B6508] text-white flex items-center justify-center shadow-md transition-transform hover:scale-110 z-10"
                        title="Remove from Wishlist"
                      >
                        <Heart className="w-5 h-5 fill-current" />
                      </button>
                    </div>

                    {/* Info Body */}
                    <div className="p-5 flex-1 flex flex-col text-center justify-between">
                      <div>
                        <Link href={`/product/${item.id}`} className="block group/title cursor-pointer">
                          <h3 className="font-heading font-bold text-navy text-sm sm:text-base mb-2 group-hover/title:text-orange transition-colors line-clamp-2">
                            {item.name}
                          </h3>
                        </Link>
                        <p className="font-heading font-bold text-navy/80 text-sm mb-4">
                          {formatPrice(item.price)}
                        </p>
                      </div>

                      <button
                        onClick={() => handleAddToCart(item)}
                        disabled={isAdded}
                        className={`w-full py-2.5 font-heading text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 ${
                          isAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-navy text-peach hover:bg-orange hover:text-navy-deep'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4" /> Added to Cart
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-4 h-4" /> Add to Cart
                          </>
                        )}
                      </button>
                    </div>

                    
                    
                  </div>

                  
                );
              })}
            </div>

            
          )}
        </div>

        

    
      </main>
      <TrustPaymentBar/>

      <Footer />
    </div>
  );
}

export default WishlistPage;
