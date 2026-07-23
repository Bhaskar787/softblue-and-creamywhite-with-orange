import { useState, useEffect } from 'react';
import { useRoute, Link } from 'wouter';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MenuDrawer } from '@/components/MenuDrawer';
import { CartDrawer } from '@/components/CartDrawer';
import { WishlistDrawer } from '@/components/WishlistDrawer';
import { SearchOverlay } from '@/components/SearchOverlay';
import { FloatingActions } from '@/components/FloatingActions';
import { BlogGiftOffers } from '@/components/BlogGiftOffers';
import { FloatingBlogAd } from '@/components/FloatingBlogAd';
import { BLOG_POSTS, BlogPost } from '@/data/blogData';
import { productsData } from '@/data/productsData';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { formatPrice } from '@/lib/utils';
import {
  ChevronRight,
  Calendar,
  Clock,
  Eye,
  ArrowRight,
  CheckCircle2,
  Share2,
  Bookmark,
  ShoppingBag,
  Heart,
  Flame,
  X,
  Sparkles,
} from 'lucide-react';

export default function BlogDetailPage() {
  const [, params] = useRoute('/article/:id');
  const [, paramsBlog] = useRoute('/blog/:id');
  const articleId = params?.id || paramsBlog?.id || 'rudraksha-shrawan-7-benefits';

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [articleId]);

  const post = BLOG_POSTS.find((p) => p.id === articleId) || BLOG_POSTS[0];
  const relatedArticles = BLOG_POSTS.filter((p) => p.id !== post.id).slice(0, 3);
  const suggestedProducts = productsData.slice(0, 4);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [isAdVisible, setIsAdVisible] = useState(true);

  return (
    <div className="flex flex-col min-h-screen bg-[#faf7f4] text-navy relative">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 pb-16 sm:pb-24">
        
        {/* Breadcrumb Navigation (Matching Image 2) */}
        <div className="bg-[#0E1B26] text-peach py-4 border-b border-orange/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs font-heading uppercase tracking-widest text-peach/75 overflow-x-auto whitespace-nowrap hide-scrollbar">
            <Link href="/" className="hover:text-orange transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-orange/60" />
            <Link href="/blog" className="hover:text-orange transition-colors">
              Blog
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-orange/60" />
            <span className="text-orange font-bold truncate max-w-xs">{post.title}</span>
          </div>
        </div>

        {/* 1. ARTICLE HEADER SECTION */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-6">
          
          <div className="space-y-4">
            <span className="inline-flex items-center gap-1.5 bg-orange/10 border border-orange/30 text-orange font-heading font-bold text-[10px] sm:text-xs uppercase tracking-widest px-3.5 py-1.5 rounded-full">
              <Sparkles className="w-3 h-3 text-orange" />
              {post.category}
            </span>

            <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-navy-deep leading-tight tracking-tight">
              {post.title}
            </h1>

            <p className="font-body text-sm sm:text-base md:text-lg text-navy/80 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Author & Meta Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-y border-navy/15 text-xs font-heading text-navy/70">
              <div className="flex items-center gap-3">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full object-cover border border-orange/40"
                />
                <div>
                  <h4 className="font-bold text-navy-deep text-xs">{post.author.name}</h4>
                  <span className="text-[10px] text-navy/60 font-body block">{post.author.role}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-[11px]">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-orange" />
                  {post.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-orange" />
                  {post.readTime}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-orange" />
                  {post.views} views
                </span>
              </div>
            </div>
          </div>

          {/* Featured Hero Image */}
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-lg border border-navy/15">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* ARTICLE BODY CONTENT (Matching Image 2 Layout) */}
          <div className="bg-white border border-navy/15 rounded-2xl p-6 sm:p-10 shadow-sm space-y-8 text-navy/85 font-body leading-relaxed text-sm sm:text-base">
            
            {/* Intro paragraph */}
            <p className="text-base sm:text-lg font-medium text-navy-deep leading-relaxed border-l-4 border-orange pl-4 bg-[#faf7f4] py-3 pr-3 rounded-r-xl">
              {post.content.intro}
            </p>

            {/* Sections Loop */}
            {post.content.sections.map((section, idx) => (
              <div key={idx} className="space-y-4 pt-4 border-t border-navy/10 first:border-t-0 first:pt-0">
                <h2 className="font-display text-xl sm:text-2xl text-navy-deep font-bold tracking-tight">
                  {section.heading}
                </h2>

                <p className="leading-relaxed">{section.text}</p>

                {section.bullets && section.bullets.length > 0 && (
                  <ul className="space-y-2.5 pt-2">
                    {section.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm sm:text-base">
                        <CheckCircle2 className="w-4 h-4 text-orange shrink-0 mt-1" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {/* Conclusion Callout Box */}
            <div className="bg-navy-deep text-peach border border-orange/30 rounded-2xl p-6 sm:p-8 space-y-3 shadow-md">
              <h3 className="font-heading font-bold text-xs uppercase tracking-widest text-orange flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-orange" />
                Key Spiritual Takeaway
              </h3>
              <p className="font-body text-sm sm:text-base text-peach/90 leading-relaxed">
                {post.content.conclusion}
              </p>
            </div>

          </div>

        </article>

        {/* 2. "YOU MAY ALSO LIKE" PRODUCT RECOMMENDATIONS GRID (Matching Image 2 Screenshot) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
          <div className="bg-white border border-navy/15 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex justify-between items-center border-b border-navy/15 pb-4">
              <div>
                <span className="text-[10px] font-heading font-bold uppercase tracking-widest text-orange">
                  Sacred Consecrated Jewelry
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-navy-deep">
                  You May Also Like
                </h3>
              </div>
              <Link href="/all-products" className="text-xs font-heading font-bold text-orange hover:underline">
                View Catalog →
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {suggestedProducts.map((product) => {
                const inWishlist = isInWishlist(product.id);
                return (
                  <div
                    key={product.id}
                    className="bg-[#faf7f4] border border-navy/15 rounded-xl overflow-hidden p-3 flex flex-col justify-between group hover:border-orange transition-colors"
                  >
                    <div>
                      <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-navy-deep mb-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <button
                          onClick={() => toggleWishlist(product)}
                          className="absolute top-2 right-2 p-1.5 bg-navy-deep/80 text-orange rounded-full hover:bg-orange hover:text-navy-deep transition-colors"
                        >
                          <Heart className={`w-3.5 h-3.5 ${inWishlist ? 'fill-orange' : ''}`} />
                        </button>
                      </div>

                      <h4 className="font-heading font-bold text-xs text-navy-deep line-clamp-1 group-hover:text-orange transition-colors">
                        <Link href={`/product/${product.id}`}>{product.name}</Link>
                      </h4>
                      <p className="text-[10px] font-body text-navy/70 line-clamp-1 mt-0.5">
                        {(product as any).subtitle || (product as any).description || 'Lab Certified Bead'}
                      </p>
                    </div>

                    <div className="pt-3 flex justify-between items-center border-t border-navy/10 mt-3">
                      <span className="text-xs font-heading font-bold text-orange">
                        {formatPrice(product.price)}
                      </span>
                      <button
                        onClick={() => addToCart(product)}
                        className="p-1.5 bg-navy-deep text-orange hover:bg-orange hover:text-navy-deep rounded-lg transition-colors"
                        aria-label="Add to cart"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3. RELATED ARTICLES SECTION (Matching Image 2 Screenshot Bottom) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
          <div className="space-y-6">
            <div className="flex justify-between items-end border-b border-navy/15 pb-4">
              <div>
                <span className="text-[10px] font-heading font-bold uppercase tracking-widest text-orange">
                  Vedic Knowledge Journal
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-navy-deep">
                  Related Articles
                </h3>
              </div>

              <Link href="/blog" className="text-xs font-heading font-bold text-orange hover:underline">
                View All Articles →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <article
                  key={rel.id}
                  className="bg-white border border-navy/15 rounded-2xl overflow-hidden shadow-sm hover:border-orange hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-navy-deep">
                      <img
                        src={rel.image}
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-2.5 left-2.5 bg-navy-deep/90 text-orange text-[8px] font-heading font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-orange/40">
                        {rel.category}
                      </span>
                    </div>

                    <div className="p-5 space-y-2">
                      <div className="flex items-center gap-2 text-[10px] font-heading text-navy/60">
                        <span>{rel.date}</span>
                        <span>•</span>
                        <span>{rel.readTime}</span>
                      </div>
                      <h4 className="font-display text-base font-bold text-navy-deep group-hover:text-orange transition-colors line-clamp-2 leading-snug">
                        <Link href={`/article/${rel.id}`}>{rel.title}</Link>
                      </h4>
                      <p className="font-body text-xs text-navy/75 line-clamp-2 leading-relaxed">
                        {rel.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-2 border-t border-navy/10 mt-2">
                    <Link
                      href={`/article/${rel.id}`}
                      className="text-xs font-heading font-bold text-orange group-hover:text-orange-bright flex items-center gap-1 transition-all"
                    >
                      <span>Read article</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
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
      <BlogGiftOffers />
      <FloatingActions />
    </div>
  );
}
