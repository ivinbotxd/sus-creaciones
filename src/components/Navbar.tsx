import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  MessageCircle, 
  Sparkles, 
  BookOpen, 
  Heart,
  Palette
} from 'lucide-react';
import { SHOP_INFO, FORMAT_CURRENCY } from '../data/stationeryData';
import { CartItem } from '../types';

interface NavbarProps {
  cart: CartItem[];
  onOpenCart: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeCategory: string;
  onSelectCategory: (cat: any) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cart,
  onOpenCart,
  searchQuery,
  onSearchChange,
  activeCategory,
  onSelectCategory,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

  const navLinks = [
    { name: 'Catálogo', href: '#catalogo' },
    { name: 'Carpetas Prenatales', href: '#catalogo', category: 'prenatal' },
    { name: 'Libritos para Pintar', href: '#catalogo', category: 'colorear' },
    { name: 'Agendas & Planners', href: '#catalogo', category: 'agendas' },
    { name: 'Cómo Trabajamos', href: '#proceso' },
    { name: 'Preguntas', href: '#faqs' },
    { name: 'Contacto', href: '#contacto' },
  ];

  const handleNavClick = (link: typeof navLinks[0]) => {
    if (link.category) {
      onSelectCategory(link.category);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E2D9] transition-all">
      {/* Top Banner Notice */}
      <div className="bg-[#2E282A] text-[#FAF8F5] text-[11px] sm:text-xs py-1.5 px-4 text-center font-medium tracking-wide">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#E07A5F]" />
          <span>¡Personalizá tu carpeta prenatal o libritos con nombre y temática sin costo extra de diseño!</span>
          <span className="hidden md:inline text-[#FAF8F5]/60">•</span>
          <span className="hidden md:inline text-[#E07A5F] font-semibold">Envíos a todo el país</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-[#E07A5F] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              <BookOpen className="w-6 h-6 text-white stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#2E282A]">
                  Sus Creaciones
                </span>
                <Sparkles className="w-3.5 h-3.5 text-[#E07A5F]" />
              </div>
              <span className="text-[10px] text-[#2E282A]/70 uppercase tracking-[0.25em] font-semibold block -mt-0.5">
                Papelería Creativa & Librería
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => handleNavClick(link)}
                className={`text-xs font-semibold uppercase tracking-wider transition-colors hover:text-[#E07A5F] ${
                  link.category && activeCategory === link.category
                    ? 'text-[#E07A5F] font-bold border-b-2 border-[#E07A5F] pb-1'
                    : 'text-[#2E282A]/80'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Actions: Search, WhatsApp, Cart & Mobile Menu */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Search toggle */}
            <button
              onClick={() => setShowSearchBar(!showSearchBar)}
              className="p-2.5 rounded-full text-[#2E282A]/80 hover:text-[#E07A5F] hover:bg-[#F2ECE4] transition-colors"
              title="Buscar productos"
              aria-label="Buscar"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Direct WhatsApp CTA */}
            <a
              href={`https://wa.me/${SHOP_INFO.whatsappRaw}?text=${encodeURIComponent("¡Hola Sus Creaciones! Quiero hacer una consulta sobre un producto personalizado ✨")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-3.5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-xs"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>WhatsApp</span>
            </a>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 bg-[#2E282A] hover:bg-[#3D3538] text-white px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer"
              aria-label="Ver carrito de compras"
            >
              <ShoppingBag className="w-4 h-4 text-[#E07A5F]" />
              <span className="hidden md:inline">
                {totalItems > 0 ? FORMAT_CURRENCY(subtotal) : 'Carrito'}
              </span>
              {totalItems > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#E07A5F] text-white text-[10px] font-black flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-full text-[#2E282A] hover:bg-[#F2ECE4]"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Expandable Search Bar */}
        {showSearchBar && (
          <div className="py-3 border-t border-[#E8E2D9] animate-fade-in">
            <div className="relative max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Buscar carpetas prenatales, libritos para pintar, agendas, marcadores..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 rounded-full bg-white border border-[#E8E2D9] text-xs sm:text-sm text-[#2E282A] focus:outline-none focus:border-[#E07A5F] focus:ring-2 focus:ring-[#E07A5F]/20 shadow-2xs"
                autoFocus
              />
              <Search className="w-4 h-4 text-[#2E282A]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#2E282A]/50 hover:text-[#2E282A]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[#E8E2D9] space-y-2 animate-fade-in">
            <div className="grid grid-cols-1 gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => handleNavClick(link)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-[#2E282A] hover:bg-[#F2ECE4] flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  {link.category && (
                    <span className="text-[10px] text-[#E07A5F] lowercase font-normal">ver categoría</span>
                  )}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-[#E8E2D9] flex flex-col gap-2 px-2">
              <a
                href={`https://wa.me/${SHOP_INFO.whatsappRaw}?text=${encodeURIComponent("¡Hola Sus Creaciones! Quiero hacer una consulta 🌸")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-emerald-700 text-white py-2.5 rounded-full text-xs font-bold uppercase tracking-wider"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Consultar por WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
