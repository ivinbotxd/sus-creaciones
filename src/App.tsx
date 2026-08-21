import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CustomizerStudio } from './components/CustomizerStudio';
import { ProductCatalog } from './components/ProductCatalog';
import { DailySpecialBanner } from './components/DailySpecialBanner';
import { AboutSection } from './components/AboutSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { LocationSection } from './components/LocationSection';
import { InstagramSection } from './components/InstagramSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ProductDetailModal } from './components/ProductDetailModal';
import { WhatsAppOrderDrawer } from './components/WhatsAppOrderDrawer';
import { Product, ProductCategory, CartItem, CartCustomization } from './types';
import { PRODUCTS } from './data/stationeryData';

export const App: React.FC = () => {
  // Local storage cart persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('sus_creaciones_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('sus_creaciones_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  }, [cart]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleAddToCart = (
    product: Product,
    customization: CartCustomization | undefined,
    quantity: number = 1
  ) => {
    const extraPrice = customization?.extraPrice || 0;
    const unitPrice = product.price + extraPrice;

    // Generate unique key based on customization
    const customKey = customization
      ? `${product.id}-${customization.name}-${customization.theme}-${customization.finish}-${customization.foil}`
      : product.id;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.cartItemId === customKey);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            cartItemId: customKey,
            product,
            quantity,
            customization,
            unitPrice,
          },
        ];
      }
    });

    showToast(`✨ ¡${product.name} agregado al carrito!`);
    setIsCartOpen(true);
  };

  const handleQuickAddToCart = (product: Product) => {
    handleAddToCart(product, undefined, 1);
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.cartItemId !== cartItemId));
    showToast('Producto eliminado del carrito.');
  };

  const handleClearCart = () => {
    setCart([]);
    showToast('Carrito vaciado.');
  };

  const scrollToCustomizer = () => {
    const el = document.getElementById('personalizador');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategoryFromAnywhere = (category: ProductCategory) => {
    setActiveCategory(category);
    const el = document.getElementById('catalogo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#2E282A] selection:bg-[#E07A5F]/20 selection:text-[#2E282A]">
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#2E282A] text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-lg border border-[#E07A5F]/40 animate-fade-in flex items-center gap-2 uppercase tracking-wider">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navbar */}
      <Navbar
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategoryFromAnywhere}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onSelectCategory={handleSelectCategoryFromAnywhere}
          onOpenCustomizer={scrollToCustomizer}
        />

        {/* Special Packs & Combos Banner */}
        <DailySpecialBanner
          onSelectCategory={handleSelectCategoryFromAnywhere}
        />

        {/* Interactive Customizer Studio */}
        <CustomizerStudio
          onAddToCart={handleAddToCart}
        />

        {/* Product Catalog */}
        <ProductCatalog
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenProductModal={(product) => setSelectedProduct(product)}
          onQuickAddToCart={handleQuickAddToCart}
        />

        {/* Artisanal Process / How It Works */}
        <AboutSection />

        {/* Testimonials & FAQs */}
        <TestimonialsSection />

        {/* Workshop, Shipping & Contact */}
        <LocationSection />

        {/* Instagram Showcase */}
        <InstagramSection onSelectCategory={handleSelectCategoryFromAnywhere} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />

      {/* Detailed Product Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Cart & WhatsApp Checkout Drawer */}
      <WhatsAppOrderDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
};

export default App;
