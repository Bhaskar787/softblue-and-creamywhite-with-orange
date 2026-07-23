import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import HomePage from '@/pages/HomePage';
import MukhiGuidePage from '@/pages/MukhiGuidePage';
import AllProductsPage from '@/pages/AllProductsPage';
import ProductDetailPage from '@/pages/ProductDetailPage';
import ConsultationPage from '@/pages/ConsultationPage';
import BlogListPage from '@/pages/BlogListPage';
import BlogDetailPage from '@/pages/BlogDetailPage';
import { UIProvider } from '@/context/UIContext';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';

const queryClient = new QueryClient();

import { useLocation } from 'wouter';
import { useEffect } from 'react';

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

import AboutPage from '@/pages/AboutPage';
import CustomOrderPage from '@/pages/CustomOrderPage';
import ContactPage from '@/pages/ContactPage';
import FAQPage from '@/pages/FAQPage';

import CollectionsPage from '@/pages/CollectionsPage';
import CategoryCollectionPage from '@/pages/CategoryCollectionPage';

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/about-us" component={AboutPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/contact-us" component={ContactPage} />
        <Route path="/faq" component={FAQPage} />
        <Route path="/faqs" component={FAQPage} />
        <Route path="/collections" component={CollectionsPage} />
        <Route path="/collection" component={CollectionsPage} />
        <Route path="/collection/:slug" component={CategoryCollectionPage} />
        <Route path="/collections/:slug" component={CategoryCollectionPage} />
        <Route path="/collection-explore/:slug" component={CategoryCollectionPage} />
        <Route path="/customize-order" component={CustomOrderPage} />
        <Route path="/custom-order" component={CustomOrderPage} />
        <Route path="/customize" component={CustomOrderPage} />
        <Route path="/all-products" component={AllProductsPage} />
        <Route path="/products" component={AllProductsPage} />
        <Route path="/product/:id" component={ProductDetailPage} />
        <Route path="/product" component={ProductDetailPage} />
        <Route path="/mukhi-guide" component={MukhiGuidePage} />
        <Route path="/consultation" component={ConsultationPage} />
        <Route path="/blog" component={BlogListPage} />
        <Route path="/blogs" component={BlogListPage} />
        <Route path="/article/:id" component={BlogDetailPage} />
        <Route path="/blog/:id" component={BlogDetailPage} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <UIProvider>
          <CartProvider>
            <WishlistProvider>
              <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
                <Router />
              </WouterRouter>
              <Toaster />
            </WishlistProvider>
          </CartProvider>
        </UIProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;