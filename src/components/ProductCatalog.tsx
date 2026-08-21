import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Sparkles, 
  Star, 
  ShoppingBag, 
  SlidersHorizontal, 
  Check, 
  Baby, 
  Palette, 
  BookOpen, 
  Tag,
  Eye,
  Plus
} from 'lucide-react';
import { CATEGORIES, PRODUCTS, FORMAT_CURRENCY } from '../data/stationeryData';
import { Product, ProductCategory } from '../types';

interface ProductCatalogProps {
  activeCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenProductModal: (product: Product) => void;
  onQuickAddToCart: (product: Product) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onOpenProductModal,
  onQuickAddToCart,
}) => {
  const [selectedTag, setSelectedTag] = useState<string>('todos');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const filterTags = [
    { id: 'todos', label: 'Todos' },
    { id: 'Personalizable', label: '✨ Personalizables' },
    { id: 'Más Vendido', label: '🔥 Más Vendidos' },
    { id: 'Stock Inmediato', label: '⚡ Stock Inmediato' },
    { id: 'Maternidad', label: '🤰 Maternidad' },
    { id: 'Souvenirs', label: '🎀 Souvenirs' },
  ];

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Category match
      const matchCategory = activeCategory === 'todos' || p.category === activeCategory;

      // Search match
      const matchSearch =
        !searchQuery.trim() ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      // Tag filter match
      const matchTag =
        selectedTag === 'todos' ||
        p.tags.includes(selectedTag) ||
        (selectedTag === 'Personalizable' && p.isCustomizable);

      return matchCategory && matchSearch && matchTag;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      // Default: featured first, then review count
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0) || b.reviewCount - a.reviewCount;
    });
  }, [activeCategory, searchQuery, selectedTag, sortBy]);

  return (
    <section id="catalogo" className="py-16 sm:py-20 bg-[#FAF8F5] border-b border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E8E2D9] text-[#E07A5F] text-[10px] font-bold uppercase tracking-[0.25em] mb-2 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Colecciones & Catálogo Completo</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-[#2E282A]">
              Nuestras Creaciones
            </h2>
            <p className="text-xs sm:text-sm text-[#2E282A]/70 mt-1 max-w-xl">
              Elegí entre nuestras carpetas prenatales, libritos para colorear, agendas, souvenirs de eventos y artículos de librería general.
            </p>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 self-start md:self-end">
            <span className="text-xs font-semibold text-[#2E282A]/70 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Ordenar:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white text-xs font-bold text-[#2E282A] border border-[#E8E2D9] rounded-xl px-3 py-2 focus:outline-none focus:border-[#E07A5F]"
            >
              <option value="featured">Destacados & Populares</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
              <option value="rating">Mejor Calificados (⭐)</option>
            </select>
          </div>
        </div>

        {/* Category Pills Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-6">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#2E282A] text-white shadow-xs scale-102'
                    : 'bg-white text-[#2E282A]/80 border border-[#E8E2D9] hover:bg-[#F2ECE4]'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
                {cat.badge && (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded-full uppercase tracking-wider ${
                    isActive ? 'bg-[#E07A5F] text-white' : 'bg-[#E07A5F]/15 text-[#E07A5F]'
                  }`}>
                    {cat.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tag Filters Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 bg-white p-3.5 rounded-2xl border border-[#E8E2D9]">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#2E282A]/60 mr-2 flex items-center gap-1">
              <Tag className="w-3 h-3" />
              Filtro rápido:
            </span>
            {filterTags.map((tag) => (
              <button
                key={tag.id}
                onClick={() => setSelectedTag(tag.id)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                  selectedTag === tag.id
                    ? 'bg-[#E07A5F] text-white font-bold'
                    : 'bg-[#FAF8F5] text-[#2E282A]/70 hover:bg-[#E8E2D9]'
                }`}
              >
                {tag.label}
              </button>
            ))}
          </div>

          <div className="text-xs font-medium text-[#2E282A]/60">
            Mostrando <strong>{filteredProducts.length}</strong> productos
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#E8E2D9] max-w-md mx-auto p-8">
            <div className="w-16 h-16 rounded-full bg-[#FAF8F5] text-3xl flex items-center justify-center mx-auto mb-4">
              🔍
            </div>
            <h3 className="font-display text-lg font-bold text-[#2E282A]">
              No encontramos productos
            </h3>
            <p className="text-xs text-[#2E282A]/70 mt-1 mb-4">
              Probá cambiando las palabras de búsqueda o seleccionando otra categoría.
            </p>
            <button
              onClick={() => {
                onSelectCategory('todos');
                onSearchChange('');
                setSelectedTag('todos');
              }}
              className="bg-[#2E282A] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider"
            >
              Ver Todo el Catálogo
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-3xl border border-[#E8E2D9] hover:border-[#E07A5F]/50 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                {/* Product Image Container */}
                <div className="relative aspect-4/3 overflow-hidden bg-[#F2ECE4] cursor-pointer" onClick={() => onOpenProductModal(product)}>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                    {product.isCustomizable && (
                      <span className="bg-[#2E282A]/90 backdrop-blur-xs text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.8 rounded-full border border-white/20 flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5 text-[#E07A5F]" />
                        Personalizable
                      </span>
                    )}
                    {product.originalPrice && (
                      <span className="bg-[#E07A5F] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.8 rounded-full">
                        Oferta
                      </span>
                    )}
                  </div>

                  {/* Quick View Button on Hover */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenProductModal(product);
                    }}
                    className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs hover:bg-white text-[#2E282A] p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    title="Ver detalles completos"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Category & Rating */}
                    <div className="flex items-center justify-between text-[10px] text-[#2E282A]/60 font-semibold mb-1">
                      <span className="uppercase tracking-wider text-[#E07A5F] font-bold">
                        {CATEGORIES.find((c) => c.id === product.category)?.name || product.category}
                      </span>
                      <div className="flex items-center gap-1 text-[#E07A5F]">
                        <Star className="w-3 h-3 fill-[#E07A5F]" />
                        <span>{product.rating.toFixed(1)} ({product.reviewCount})</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3
                      onClick={() => onOpenProductModal(product)}
                      className="font-display text-base font-bold text-[#2E282A] group-hover:text-[#E07A5F] transition-colors line-clamp-2 cursor-pointer"
                    >
                      {product.name}
                    </h3>

                    {/* Tagline / Short description */}
                    <p className="text-xs text-[#2E282A]/70 mt-1.5 line-clamp-2 leading-relaxed">
                      {product.tagline}
                    </p>

                    {/* Specs Pills */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {product.specs.dimensions && (
                        <span className="text-[10px] bg-[#FAF8F5] text-[#2E282A]/70 px-2 py-0.5 rounded-md border border-[#E8E2D9]">
                          📏 {product.specs.dimensions.split('-')[0]}
                        </span>
                      )}
                      {product.specs.pages && (
                        <span className="text-[10px] bg-[#FAF8F5] text-[#2E282A]/70 px-2 py-0.5 rounded-md border border-[#E8E2D9]">
                          📄 {product.specs.pages.split('(')[0]}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom: Price & CTA */}
                  <div className="pt-4 mt-4 border-t border-[#E8E2D9] flex items-center justify-between gap-2">
                    <div>
                      {product.originalPrice && (
                        <span className="text-[10px] text-[#2E282A]/40 line-through block -mb-0.5">
                          {FORMAT_CURRENCY(product.originalPrice)}
                        </span>
                      )}
                      <span className="font-display text-lg font-black text-[#2E282A]">
                        {FORMAT_CURRENCY(product.price)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {product.isCustomizable ? (
                        <button
                          onClick={() => onOpenProductModal(product)}
                          className="bg-[#E07A5F] hover:bg-[#D0694E] text-white px-3.5 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                        >
                          <Sparkles className="w-3 h-3" />
                          <span>Personalizar</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => onQuickAddToCart(product)}
                          className="bg-[#2E282A] hover:bg-[#3D3538] text-white px-3.5 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Agregar</span>
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
