import React from 'react';
import { 
  Sparkles, 
  BookOpen, 
  Palette, 
  Baby, 
  ShoppingBag, 
  CheckCircle2, 
  ArrowRight, 
  Heart,
  Truck,
  Layers,
  Star
} from 'lucide-react';
import { SHOP_INFO } from '../data/stationeryData';
import { ProductCategory } from '../types';

interface HeroProps {
  onSelectCategory: (cat: ProductCategory) => void;
  onOpenCustomizer: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectCategory, onOpenCustomizer }) => {
  return (
    <section className="relative overflow-hidden bg-[#FAF8F5] border-b border-[#E8E2D9] py-12 sm:py-20 bg-creative-dots">
      {/* Soft gradient background accents */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#E07A5F]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#81B29A]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Copy, Highlights & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Super Header Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8E2D9] text-[#E07A5F] text-[11px] font-bold uppercase tracking-[0.25em] shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#E07A5F]" />
              <span>Papelería Creativa & Librería Artesanal</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-[#2E282A] tracking-tight leading-[1.1]">
              Diseños que Guardan Momentos Inolvidables
            </h1>

            {/* Subtitle / Value Proposition */}
            <p className="text-base sm:text-lg text-[#2E282A]/80 leading-relaxed max-w-2xl">
              Especialistas en <strong>carpetas prenatales</strong> para la dulce espera, <strong>libritos para pintar</strong> que entretienen a los más chicos, agendas perpetuas y artículos de librería hechos a mano con amor y papeles premium.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#catalogo"
                className="inline-flex items-center gap-2 bg-[#E07A5F] hover:bg-[#D0694E] text-white px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Explorar Catálogo</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenCustomizer}
                className="inline-flex items-center gap-2 bg-white hover:bg-[#F2ECE4] text-[#2E282A] px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider border border-[#E8E2D9] shadow-2xs transition-all cursor-pointer"
              >
                <Palette className="w-4 h-4 text-[#E07A5F]" />
                <span>Personalizador en Vivo ✨</span>
              </button>
            </div>

            {/* Quick Category Badges */}
            <div className="pt-3">
              <span className="text-[10px] uppercase tracking-widest text-[#2E282A]/60 font-bold block mb-2">
                Accesos Directos Populares:
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => onSelectCategory('prenatal')}
                  className="px-3 py-1.5 rounded-full bg-white hover:bg-[#F2ECE4] border border-[#E8E2D9] text-xs font-semibold text-[#2E282A] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Baby className="w-3.5 h-3.5 text-[#E07A5F]" />
                  <span>Carpetas Prenatales</span>
                </button>

                <button
                  onClick={() => onSelectCategory('colorear')}
                  className="px-3 py-1.5 rounded-full bg-white hover:bg-[#F2ECE4] border border-[#E8E2D9] text-xs font-semibold text-[#2E282A] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Palette className="w-3.5 h-3.5 text-[#81B29A]" />
                  <span>Libritos para Pintar</span>
                </button>

                <button
                  onClick={() => onSelectCategory('agendas')}
                  className="px-3 py-1.5 rounded-full bg-white hover:bg-[#F2ECE4] border border-[#E8E2D9] text-xs font-semibold text-[#2E282A] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#F2CC8F]" />
                  <span>Agendas & Planners</span>
                </button>
              </div>
            </div>

            {/* Trust Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-[#E8E2D9]">
              <div className="flex items-center gap-2 text-xs text-[#2E282A]/80 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#81B29A] shrink-0" />
                <span>100% Personalizado</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#2E282A]/80 font-medium">
                <Truck className="w-4 h-4 text-[#81B29A] shrink-0" />
                <span>Envíos a todo el país</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#2E282A]/80 font-medium">
                <Layers className="w-4 h-4 text-[#81B29A] shrink-0" />
                <span>Papeles 120g/200g</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase Bento Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md">
              {/* Main Featured Image Card */}
              <div className="bg-white p-3.5 rounded-3xl border border-[#E8E2D9] shadow-sm relative overflow-hidden">
                <div className="relative rounded-2xl overflow-hidden aspect-4/3 bg-[#F2ECE4]">
                  <img
                    src="https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=800&q=80"
                    alt="Carpeta prenatal personalizada Sus Creaciones"
                    className="w-full h-full object-cover"
                  />
                  {/* Floating Tag */}
                  <div className="absolute top-3 left-3 bg-[#2E282A]/90 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-white/20">
                    ⭐ Producto Estrella
                  </div>
                </div>

                {/* Card Content Footer */}
                <div className="p-3 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#E07A5F]">
                      Edición Maternidad
                    </span>
                    <div className="flex items-center gap-1 text-[#E07A5F] text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-[#E07A5F]" />
                      <span>5.0 (48 opiniones)</span>
                    </div>
                  </div>
                  <h3 className="font-display text-base font-bold text-[#2E282A] mt-0.5">
                    Carpeta Prenatal con Separadores & Folios
                  </h3>
                  <p className="text-xs text-[#2E282A]/70 mt-1 line-clamp-2">
                    Tapa dura forrada con el nombre de tu bebé, separadores de trimestres y sobre para ecografías.
                  </p>
                </div>
              </div>

              {/* Floating Mini Badge Bottom-Right: Libritos para Pintar */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-white p-3 rounded-2xl border border-[#E8E2D9] shadow-md flex items-center gap-3 max-w-[210px] sm:max-w-xs animate-bounce-subtle">
                <div className="w-10 h-10 rounded-xl bg-[#E07A5F]/15 flex items-center justify-center text-[#E07A5F] shrink-0 font-bold">
                  🎨
                </div>
                <div className="text-left">
                  <span className="text-[9px] uppercase font-bold text-[#E07A5F] tracking-wider block">
                    Souvenir N°1
                  </span>
                  <h4 className="text-xs font-bold text-[#2E282A] leading-tight">
                    Libritos para Pintar + Crayones
                  </h4>
                </div>
              </div>

              {/* Floating Mini Badge Top-Left: Muestra Digital */}
              <div className="absolute -top-4 -left-4 bg-[#2E282A] text-white px-3.5 py-2 rounded-2xl shadow-xs flex items-center gap-2 border border-white/10">
                <Sparkles className="w-3.5 h-3.5 text-[#E07A5F]" />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  Muestra Digital Gratis
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
