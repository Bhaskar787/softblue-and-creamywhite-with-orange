import { useState, useEffect } from 'react';
import { AnnouncementBar } from '@/views/components/AnnouncementBar';
import { Navbar } from '@/views/components/Navbar';
import { Footer } from '@/views/components/Footer';
import { MenuDrawer } from '@/views/components/MenuDrawer';
import { CartDrawer } from '@/views/components/CartDrawer';
import { WishlistDrawer } from '@/views/components/WishlistDrawer';
import { SearchOverlay } from '@/views/components/SearchOverlay';
import { FloatingActions } from '@/views/components/FloatingActions';
import { BlogGiftOffers } from '@/views/components/BlogGiftOffers';
import { Link } from 'wouter';
import { BLOG_POSTS } from '@/models/data/blogData';
import {
  ChevronRight,
  BookOpen,
  Calendar,
  Clock,
  Eye,
  ArrowRight,
  ShieldCheck,
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
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] text-stone-900 font-body antialiased selection:bg-amber-100 selection:text-amber-900 relative">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 pb-16 sm:pb-24">
        
        {/* Breadcrumb Navigation */}
        <div className="bg-[#0E1B26] text-peach py-3.5 border-b border-orange/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs font-heading font-extrabold uppercase tracking-widest text-peach overflow-x-auto whitespace-nowrap hide-scrollbar">
            <Link href="/" className="hover:text-orange transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-orange" />
            <span className="text-orange font-extrabold">Spiritual Wisdom &amp; Blog Articles</span>
          </div>
        </div>

        {/* 1. HERO BANNER SECTION */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white via-[#FAF8F5] to-[#FAF8F5] border-b border-stone-200 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Copy */}
              <div className="lg:col-span-8 space-y-5">
                <span className="inline-flex items-center gap-2 text-xs font-heading font-extrabold uppercase tracking-widest text-navy-deep bg-orange px-4 py-1.5 rounded-full border border-orange-bright/50 shadow-2xs">
                  <BookOpen className="w-4 h-4 text-navy-deep" />
                  INSIGHTS &amp; SACRED KNOWLEDGE
                </span>

                <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight">
                  Spiritual Guides &amp; Wellness Articles
                </h1>

                <p className="font-body text-stone-800 font-medium text-base sm:text-lg leading-relaxed max-w-2xl">
                  Practical Rudraksha knowledge, authentic Nepal bead care tips, and sadhana guidance — written to help you choose, wear, and nurture your sacred beads with confidence.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href="/consultation"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-navy hover:bg-navy-deep text-white font-heading font-extrabold text-xs uppercase tracking-widest rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    <span>Book a Consultation →</span>
                  </Link>

                  <Link
                    href="/consultation"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-stone-900 border border-stone-300 hover:border-orange font-heading font-extrabold text-xs uppercase tracking-widest rounded-xl shadow-2xs transition-all cursor-pointer"
                  >
                    <span>Customize a Mala</span>
                  </Link>
                </div>
              </div>

              {/* Right Article Library Stats Box */}
              <div className="lg:col-span-4 bg-navy-deep text-peach border border-orange/40 rounded-2xl p-6 shadow-xl space-y-4">
                <h3 className="font-heading font-extrabold text-xs uppercase tracking-widest text-orange border-b border-orange/20 pb-2">
                  ARTICLE LIBRARY
                </h3>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-navy/80 border border-orange/20 rounded-xl p-3">
                    <span className="block font-heading text-2xl font-extrabold text-orange">{BLOG_POSTS.length}</span>
                    <span className="text-[10px] font-heading font-extrabold uppercase text-peach/90">ARTICLES</span>
                  </div>
                  <div className="bg-navy/80 border border-orange/20 rounded-xl p-3">
                    <span className="block font-heading text-2xl font-extrabold text-orange">100%</span>
                    <span className="text-[10px] font-heading font-extrabold uppercase text-peach/90">NEPAL</span>
                  </div>
                  <div className="bg-navy/80 border border-orange/20 rounded-xl p-3">
                    <span className="block font-heading text-2xl font-extrabold text-orange">FREE</span>
                    <span className="text-[10px] font-heading font-extrabold uppercase text-peach/90">GUIDED</span>
                  </div>
                </div>

                <div className="pt-2 flex justify-between items-center text-xs font-heading font-bold uppercase text-peach/80 border-t border-orange/20">
                  <span>Rudraksha Knowledge Base</span>
                  <span className="text-orange font-extrabold">Updated Weekly</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 2. FILTER & SORT BAR */}
        <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-stone-200/90 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-heading font-extrabold uppercase text-stone-900">
                <SlidersHorizontal className="w-4 h-4 text-orange" />
                <span>Filter &amp; Sort Articles</span>
                <span className="text-orange font-extrabold">({filteredPosts.length} articles)</span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* Sort dropdown */}
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as any)}
                  className="bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2 text-xs font-heading font-extrabold text-stone-900 focus:outline-none focus:ring-2 focus:ring-orange cursor-pointer shadow-2xs"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="popular">Most Popular</option>
                </select>

                {/* Featured Toggle button */}
                <button
                  onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
                  className={`px-3.5 py-2 rounded-xl border text-xs font-heading font-extrabold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                    showFeaturedOnly
                      ? 'bg-orange text-navy-deep border-orange shadow-2xs'
                      : 'bg-stone-50 text-stone-900 border-stone-300 hover:border-orange'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-navy-deep" />
                  <span>Featured Only</span>
                </button>
              </div>
            </div>

            {/* Topic Filter Pills */}
            <div className="flex items-center gap-2.5 overflow-x-auto whitespace-nowrap hide-scrollbar pt-2 border-t border-stone-200">
              {['All topics', 'Rudraksha', 'Vedic Practice', 'Authenticity'].map((topic) => (
                <button
                  key={topic}
                  onClick={() => setSelectedTopic(topic)}
                  className={`px-4 py-2 rounded-full text-xs font-heading font-extrabold transition-all cursor-pointer ${
                    selectedTopic === topic
                      ? 'bg-orange text-navy-deep border border-orange shadow-xs'
                      : 'bg-stone-100 text-stone-800 hover:bg-orange hover:text-navy-deep border border-stone-300'
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>

          </div>
        </section>

        {/* 3. ARTICLE GRID SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white border border-stone-200/90 rounded-2xl overflow-hidden shadow-sm hover:border-orange hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Article Thumbnail Image */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-navy-deep">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <span className="absolute top-3.5 left-3.5 bg-orange text-navy-deep text-xs font-heading font-extrabold uppercase tracking-widest px-3.5 py-1 rounded-md border border-orange-bright shadow-xs">
                      {post.category}
                    </span>
                  </div>

                  {/* Article Content */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-xs font-heading font-bold text-stone-600">
                      <span className="flex items-center gap-1 text-stone-700">
                        <Calendar className="w-3.5 h-3.5 text-orange" />
                        {post.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-stone-700">
                        <Clock className="w-3.5 h-3.5 text-orange" />
                        {post.readTime}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-stone-700">
                        <Eye className="w-3.5 h-3.5 text-orange" />
                        {post.views} views
                      </span>
                    </div>

                    <h2 className="font-heading text-xl sm:text-2xl text-stone-900 font-extrabold leading-snug group-hover:text-orange transition-colors">
                      <Link href={`/article/${post.id}`}>{post.title}</Link>
                    </h2>

                    <p className="font-body text-xs sm:text-sm font-medium text-stone-800 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                {/* Read Article CTA Footer */}
                <div className="p-6 pt-0 border-t border-stone-200 mt-4 flex items-center justify-between">
                  <Link
                    href={`/article/${post.id}`}
                    className="text-xs font-heading font-extrabold text-orange hover:underline flex items-center gap-1.5 transition-all"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <span className="text-[10px] font-heading font-bold uppercase text-stone-600">Pashupatinath Verified</span>
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
