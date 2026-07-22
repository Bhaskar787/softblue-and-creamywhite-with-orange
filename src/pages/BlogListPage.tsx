import { useState, useEffect } from 'react';
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
import { Link } from 'wouter';
import { BLOG_POSTS, BlogPost } from '@/data/blogData';
import {
  ChevronRight,
  BookOpen,
  Calendar,
  Clock,
  Eye,
  ArrowRight,
  Filter,
  Sparkles,
  Tag,
  X,
  Flame,
  ShoppingBag,
  SlidersHorizontal,
} from 'lucide-react';

export default function BlogListPage() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [selectedTopic, setSelectedTopic] = useState('All topics');
  const [sortOption, setSortOption] = useState<'newest' | 'oldest' | 'popular'>('newest');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [isAdVisible, setIsAdVisible] = useState(true);

  // Filter & Sort Logic
  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesTopic = selectedTopic === 'All topics' || post.category === selectedTopic;
    const matchesFeatured = !showFeaturedOnly || post.featured;
    return matchesTopic && matchesFeatured;
  }).sort((a, b) => {
    if (sortOption === 'newest') return new Date(b.date).getTime() - new Date(a.date).getTime();
    if (sortOption === 'oldest') return new Date(a.date).getTime() - new Date(b.date).getTime();
    if (sortOption === 'popular') return b.views - a.views;
    return 0;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#faf7f4] text-navy relative">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 pb-16 sm:pb-24">
        
        {/* Breadcrumb Navigation */}
        <div className="bg-navy-deep text-peach py-4 border-b border-orange/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs font-heading uppercase tracking-widest text-peach/75 overflow-x-auto whitespace-nowrap hide-scrollbar">
            <Link href="/" className="hover:text-orange transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-orange/60" />
            <span className="text-orange font-bold">Spiritual Wisdom & Blog Articles</span>
          </div>
        </div>

        {/* 1. HERO BANNER SECTION (Matching Image 1 Screenshot Layout) */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-[#faf7f4] via-white to-[#faf7f4] border-b border-orange/15 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Copy */}
              <div className="lg:col-span-8 space-y-5">
                <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-heading font-bold uppercase tracking-[0.2em] text-orange bg-orange/10 border border-orange/30 px-4 py-1.5 rounded-full shadow-xs">
                  <BookOpen className="w-3.5 h-3.5 text-orange" />
                  INSIGHTS & STORIES
                </span>

                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-deep tracking-tight leading-tight">
                  Spiritual guides & wellness articles
                </h1>

                <p className="font-body text-navy/80 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl">
                  Practical Rudraksha knowledge, care tips, and sadhana guidance — written to help you choose, wear, and nurture your beads with confidence.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href="/consultation"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-orange via-orange-bright to-orange text-navy-deep font-heading font-bold text-xs uppercase tracking-widest rounded-xl shadow-md hover:shadow-sacred-glow transition-all"
                  >
                    <span>Book a consultation →</span>
                  </Link>

                  <Link
                    href="/consultation"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-white text-navy-deep border border-navy/20 hover:border-orange font-heading font-bold text-xs uppercase tracking-widest rounded-xl shadow-xs transition-all"
                  >
                    <span>Customize a mala</span>
                  </Link>
                </div>
              </div>

              {/* Right Article Library Stats Box */}
              <div className="lg:col-span-4 bg-navy-deep text-peach border border-orange/30 rounded-2xl p-6 shadow-xl space-y-4">
                <h3 className="font-heading font-bold text-xs uppercase tracking-widest text-orange border-b border-orange/20 pb-2">
                  ARTICLE LIBRARY
                </h3>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-navy/70 border border-orange/20 rounded-xl p-3">
                    <span className="block font-display text-2xl font-bold text-orange">{BLOG_POSTS.length}</span>
                    <span className="text-[9px] font-heading uppercase text-peach/70">PUBLISHED</span>
                  </div>
                  <div className="bg-navy/70 border border-orange/20 rounded-xl p-3">
                    <span className="block font-display text-2xl font-bold text-orange">1</span>
                    <span className="text-[9px] font-heading uppercase text-peach/70">PAGES</span>
                  </div>
                  <div className="bg-navy/70 border border-orange/20 rounded-xl p-3">
                    <span className="block font-display text-2xl font-bold text-orange">1</span>
                    <span className="text-[9px] font-heading uppercase text-peach/70">CURRENT</span>
                  </div>
                </div>

                <div className="pt-2 flex justify-between items-center text-[10px] font-heading uppercase text-peach/60 border-t border-orange/20">
                  <span>Rudraksha Knowledge Base</span>
                  <span className="text-orange font-bold">Updated Weekly</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 2. FILTER & SORT BAR (Matching Image 1) */}
        <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-navy/15 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-heading font-bold uppercase text-navy/70">
                <SlidersHorizontal className="w-4 h-4 text-orange" />
                <span>Filter & sort</span>
                <span className="text-orange font-bold">({filteredPosts.length} articles)</span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* Sort dropdown */}
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as any)}
                  className="bg-[#faf7f4] border border-navy/20 rounded-xl px-3 py-1.5 text-xs font-heading font-semibold text-navy focus:outline-none focus:border-orange cursor-pointer"
                >
                  <option value="newest">Newest first</option>
                  <option value="oldest">Oldest first</option>
                  <option value="popular">Most popular</option>
                </select>

                {/* Featured Toggle button */}
                <button
                  onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-heading font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                    showFeaturedOnly
                      ? 'bg-orange text-navy-deep border-orange shadow-xs'
                      : 'bg-[#faf7f4] text-navy/70 border-navy/20 hover:border-orange'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Featured</span>
                </button>
              </div>
            </div>

            {/* Topic Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap hide-scrollbar pt-2 border-t border-navy/10">
              {['All topics', 'Rudraksha', 'Vedic Practice', 'Authenticity'].map((topic) => (
                <button
                  key={topic}
                  onClick={() => setSelectedTopic(topic)}
                  className={`px-4 py-1.5 rounded-full text-xs font-heading font-bold transition-all cursor-pointer ${
                    selectedTopic === topic
                      ? 'bg-navy-deep text-orange border border-orange shadow-xs'
                      : 'bg-[#faf7f4] text-navy/75 hover:bg-orange/10 hover:text-navy border border-navy/15'
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>

          </div>
        </section>

        {/* 3. ARTICLE GRID SECTION (Matching Image 1 Cards) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white border border-navy/15 rounded-2xl overflow-hidden shadow-sm hover:border-orange hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Article Thumbnail Image */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-navy-deep">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <span className="absolute top-3 left-3 bg-navy-deep/90 text-orange text-[9px] font-heading font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-orange/40 backdrop-blur-md">
                      {post.category}
                    </span>
                  </div>

                  {/* Article Content */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-[11px] font-heading text-navy/60">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-orange" />
                        {post.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-orange" />
                        {post.readTime}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3 text-orange" />
                        {post.views}
                      </span>
                    </div>

                    <h2 className="font-display text-xl sm:text-2xl text-navy-deep font-bold leading-snug group-hover:text-orange transition-colors">
                      <Link href={`/article/${post.id}`}>{post.title}</Link>
                    </h2>

                    <p className="font-body text-xs sm:text-sm text-navy/75 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                {/* Read Article CTA Footer */}
                <div className="p-6 pt-0 border-t border-navy/10 mt-4 flex items-center justify-between">
                  <Link
                    href={`/article/${post.id}`}
                    className="text-xs font-heading font-bold text-orange group-hover:text-orange-bright flex items-center gap-1.5 transition-all"
                  >
                    <span>Read article</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <span className="text-[10px] font-heading uppercase text-navy/50">Pashupatinath Verified</span>
                </div>
              </article>
            ))}
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
