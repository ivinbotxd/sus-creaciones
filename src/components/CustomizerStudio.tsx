import React, { useState } from 'react';
import { 
  Sparkles, 
  Palette, 
  Check, 
  ShoppingBag, 
  MessageCircle, 
  RefreshCw,
  Baby,
  BookOpen,
  Eye
} from 'lucide-react';
import { THEME_OPTIONS, COVER_FINISH_OPTIONS, FOIL_OPTIONS, BINDING_COLORS, PRODUCTS, FORMAT_CURRENCY, SHOP_INFO } from '../data/stationeryData';
import { Product, CartItem } from '../types';

interface CustomizerStudioProps {
  onAddToCart: (product: Product, customization: any, quantity: number) => void;
  onClose?: () => void;
}

export const CustomizerStudio: React.FC<CustomizerStudioProps> = ({ onAddToCart }) => {
  const [selectedProductId, setSelectedProductId] = useState<string>('carpeta-prenatal-deluxe');
  const [customName, setCustomName] = useState<string>('Benjamín');
  const [customSubtitle, setCustomSubtitle] = useState<string>('Mi Dulce Espera • 2025');
  const [selectedTheme, setSelectedTheme] = useState<string>('Animalitos del Bosque / Forest Animals');
  const [selectedFinish, setSelectedFinish] = useState<string>('mate');
  const [selectedFoil, setSelectedFoil] = useState<string>('foil-dorado');
  const [selectedBinding, setSelectedBinding] = useState<string>('Dorado metalizado');

  const selectedProduct = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];

  // Calculate pricing
  const finishObj = COVER_FINISH_OPTIONS.find((f) => f.id === selectedFinish) || COVER_FINISH_OPTIONS[0];
  const foilObj = FOIL_OPTIONS.find((f) => f.id === selectedFoil) || FOIL_OPTIONS[0];
  const calculatedPrice = selectedProduct.price + finishObj.priceDelta + foilObj.priceDelta;

  const handleAddToCart = () => {
    onAddToCart(
      selectedProduct,
      {
        name: customName || 'Sin nombre especificado',
        theme: selectedTheme,
        finish: finishObj.label,
        foil: foilObj.label,
        binding: selectedBinding,
        dedication: customSubtitle,
        extraPrice: finishObj.priceDelta + foilObj.priceDelta,
      },
      1
    );
  };

  // Visual style helpers for the preview card
  const getThemeBackground = () => {
    if (selectedTheme.includes('Safari')) return 'from-[#EBF2EA] to-[#F7F4EA] border-[#D0DEC9]';
    if (selectedTheme.includes('Dinosaurios')) return 'from-[#EAF2F8] to-[#E5EFEA] border-[#C2D7CE]';
    if (selectedTheme.includes('Flores') || selectedTheme.includes('Princesas')) return 'from-[#FDF2F4] to-[#FBF0F7] border-[#F0D5DD]';
    if (selectedTheme.includes('Espacio')) return 'from-[#EAEFF8] to-[#E3E8F5] border-[#CAD5E8]';
    if (selectedTheme.includes('Arcoíris')) return 'from-[#FFF8F0] to-[#FAF2EB] border-[#EADAC9]';
    return 'from-[#F7F3EB] to-[#FAF8F5] border-[#E0D7C9]';
  };

  const getThemeEmoji = () => {
    if (selectedTheme.includes('Safari')) return '🦁 🦒 🌿';
    if (selectedTheme.includes('Dinosaurios')) return '🦕 🌴 🦖';
    if (selectedTheme.includes('Flores')) return '🌸 🌿 💐';
    if (selectedTheme.includes('Princesas')) return '👑 ✨ 🏰';
    if (selectedTheme.includes('Espacio')) return '🚀 🪐 ⭐';
    if (selectedTheme.includes('Arcoíris')) return '🌈 ☁️ ☀️';
    return '🦊 🦌 🌲';
  };

  const getFoilClass = () => {
    if (selectedFoil === 'foil-dorado') {
      return 'text-amber-800 border-amber-300/80 bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-xs font-serif font-black tracking-wide';
    }
    if (selectedFoil === 'foil-plateado') {
      return 'text-slate-800 bg-gradient-to-r from-slate-300 via-slate-100 to-slate-400 bg-clip-text text-transparent drop-shadow-xs font-serif font-black tracking-wide';
    }
    if (selectedFoil === 'foil-rosegold') {
      return 'text-rose-900 bg-gradient-to-r from-rose-300 via-rose-400 to-amber-200 bg-clip-text text-transparent drop-shadow-xs font-serif font-black tracking-wide';
    }
    return 'text-[#2E282A] font-serif font-bold';
  };

  return (
    <section id="personalizador" className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-[#E8E2D9] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8E2D9] text-[#E07A5F] text-[10px] font-bold uppercase tracking-[0.25em] mb-2 shadow-2xs">
            <Palette className="w-3.5 h-3.5 text-[#E07A5F]" />
            <span>Taller de Personalización en Vivo</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[#2E282A]">
            Creá tu Tapa Personalizada
          </h2>
          <p className="text-sm sm:text-base text-[#2E282A]/80 mt-2">
            Escribí el nombre, elegí tu temática favorita, seleccioná los acabados en foil metalizado y mirá la vista previa en tiempo real.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Controls */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E2D9] shadow-sm space-y-6">
            
            {/* 1. Select Product to Customize */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#2E282A] block mb-2">
                1. Seleccioná el Modelo de Producto:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'carpeta-prenatal-deluxe', name: 'Carpeta Prenatal', icon: '🤰' },
                  { id: 'cuaderno-pediatrico-salud', name: 'Cuaderno Pediátrico', icon: '👶' },
                  { id: 'pack-libritos-pintar-souvenir', name: 'Librito Colorear', icon: '🎨' },
                  { id: 'agenda-perpetua-planner-semanal', name: 'Agenda Perpetua', icon: '📖' },
                  { id: 'libro-recuerdos-bebe-primer-ano', name: 'Libro de Recuerdos', icon: '🍼' },
                  { id: 'cajas-souvenir-candy-bar', name: 'Cajitas Souvenir', icon: '🎀' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedProductId(item.id)}
                    className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                      selectedProductId === item.id
                        ? 'border-[#E07A5F] bg-[#E07A5F]/10 shadow-2xs text-[#2E282A] font-bold'
                        : 'border-[#E8E2D9] hover:bg-[#FAF8F5] text-[#2E282A]/80'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-xs font-semibold leading-tight">{item.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Custom Name & Subtitle */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#2E282A] block mb-1.5">
                  2. Nombre del Bebé / Niño / Titular:
                </label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="Ej: Benjamín, Sofía, Valentina..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8E2D9] bg-[#FAF8F5] text-sm text-[#2E282A] font-bold focus:outline-none focus:border-[#E07A5F] focus:ring-2 focus:ring-[#E07A5F]/20"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#2E282A] block mb-1.5">
                  Subtítulo / Frase / Fecha:
                </label>
                <input
                  type="text"
                  value={customSubtitle}
                  onChange={(e) => setCustomSubtitle(e.target.value)}
                  placeholder="Ej: Mi dulce espera • 2025"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8E2D9] bg-[#FAF8F5] text-sm text-[#2E282A] focus:outline-none focus:border-[#E07A5F] focus:ring-2 focus:ring-[#E07A5F]/20"
                />
              </div>
            </div>

            {/* 3. Theme Selector */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#2E282A] block mb-1.5">
                3. Temática o Paleta de Ilustración:
              </label>
              <select
                value={selectedTheme}
                onChange={(e) => setSelectedTheme(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#E8E2D9] bg-[#FAF8F5] text-xs sm:text-sm text-[#2E282A] font-medium focus:outline-none focus:border-[#E07A5F]"
              >
                {THEME_OPTIONS.map((theme) => (
                  <option key={theme} value={theme}>
                    {theme}
                  </option>
                ))}
              </select>
            </div>

            {/* 4. Foil Metalizado & Acabado de Tapa */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#2E282A] block mb-1.5">
                  4. Detalle en Foil Metalizado:
                </label>
                <div className="space-y-1.5">
                  {FOIL_OPTIONS.map((foil) => (
                    <button
                      key={foil.id}
                      onClick={() => setSelectedFoil(foil.id)}
                      className={`w-full p-2.5 rounded-xl border text-left text-xs flex items-center justify-between transition-all cursor-pointer ${
                        selectedFoil === foil.id
                          ? 'border-[#E07A5F] bg-[#E07A5F]/10 font-bold text-[#2E282A]'
                          : 'border-[#E8E2D9] hover:bg-[#FAF8F5] text-[#2E282A]/80'
                      }`}
                    >
                      <span>{foil.label}</span>
                      {foil.priceDelta > 0 && (
                        <span className="text-[10px] text-[#E07A5F] font-bold">
                          +{FORMAT_CURRENCY(foil.priceDelta)}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#2E282A] block mb-1.5">
                  5. Laminado Protector de Tapa:
                </label>
                <div className="space-y-1.5">
                  {COVER_FINISH_OPTIONS.map((finish) => (
                    <button
                      key={finish.id}
                      onClick={() => setSelectedFinish(finish.id)}
                      className={`w-full p-2.5 rounded-xl border text-left text-xs flex items-center justify-between transition-all cursor-pointer ${
                        selectedFinish === finish.id
                          ? 'border-[#E07A5F] bg-[#E07A5F]/10 font-bold text-[#2E282A]'
                          : 'border-[#E8E2D9] hover:bg-[#FAF8F5] text-[#2E282A]/80'
                      }`}
                    >
                      <span>{finish.label}</span>
                      {finish.priceDelta > 0 && (
                        <span className="text-[10px] text-[#E07A5F] font-bold">
                          +{FORMAT_CURRENCY(finish.priceDelta)}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 6. Ring Binding Color */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#2E282A] block mb-1.5">
                6. Color de Anillado Wire-o:
              </label>
              <div className="flex flex-wrap gap-2">
                {BINDING_COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedBinding(color)}
                    className={`px-3 py-1.5 rounded-full border text-xs font-semibold transition-all cursor-pointer ${
                      selectedBinding === color
                        ? 'border-[#2E282A] bg-[#2E282A] text-white shadow-2xs'
                        : 'border-[#E8E2D9] bg-[#FAF8F5] text-[#2E282A] hover:bg-[#F2ECE4]'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Live Visual 3D Preview Card */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            
            {/* Visual Cover Stage */}
            <div className="bg-white p-6 rounded-3xl border border-[#E8E2D9] shadow-md flex flex-col items-center">
              
              <div className="flex items-center justify-between w-full mb-4 pb-2 border-b border-[#E8E2D9]">
                <div className="flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-[#E07A5F]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#2E282A]">
                    Vista Previa de Tapa
                  </span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#E07A5F] bg-[#E07A5F]/10 px-2.5 py-0.5 rounded-full">
                  Muestra Digital
                </span>
              </div>

              {/* The Realistic Book Cover Rendering */}
              <div className="relative w-full max-w-[280px] aspect-[1/1.38] rounded-2xl shadow-xl border-4 border-white p-6 flex flex-col justify-between text-center overflow-hidden transition-all duration-300 bg-gradient-to-b">
                
                {/* Book spine / Wire-o simulation left edge */}
                <div className="absolute left-2 top-0 bottom-0 w-3 flex flex-col justify-around py-4 opacity-70">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="w-2.5 h-1.5 rounded-full bg-[#3D3538] shadow-xs" />
                  ))}
                </div>

                {/* Cover Theme Background Layer */}
                <div className={`absolute inset-0 bg-gradient-to-br ${getThemeBackground()} opacity-90`} />

                {/* Holographic or Texture Shimmer overlay if selected */}
                {selectedFinish === 'holografico' && (
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-pink-400/15 to-cyan-300/20 mix-blend-overlay pointer-events-none" />
                )}

                {/* Top Badge */}
                <div className="relative z-10 pt-2">
                  <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-[#2E282A]/70 bg-white/70 backdrop-blur-xs px-2.5 py-1 rounded-full border border-black/5 inline-block">
                    {selectedProduct.name}
                  </span>
                </div>

                {/* Center Content: Theme Emoji & Big Name with Foil */}
                <div className="relative z-10 my-auto space-y-2 px-2">
                  <div className="text-4xl sm:text-5xl drop-shadow-xs animate-bounce-subtle">
                    {getThemeEmoji()}
                  </div>

                  <div className="py-2">
                    <h3 className={`text-2xl sm:text-3xl leading-tight ${getFoilClass()}`}>
                      {customName || 'Nombre Aquí'}
                    </h3>
                    <p className="text-[11px] font-sans font-semibold text-[#2E282A]/70 mt-1">
                      {customSubtitle}
                    </p>
                  </div>
                </div>

                {/* Bottom Spine & Brand Signoff */}
                <div className="relative z-10 pb-1">
                  <div className="flex items-center justify-center gap-1.5 text-[8px] uppercase tracking-[0.2em] font-bold text-[#2E282A]/60 bg-white/60 backdrop-blur-xs py-1 px-3 rounded-full mx-auto w-fit">
                    <Sparkles className="w-2.5 h-2.5 text-[#E07A5F]" />
                    <span>Sus Creaciones • Hecho a Mano</span>
                  </div>
                </div>

                {/* Corner Metallic Reinforcements (Visual) */}
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-amber-400/80 rounded-tr-lg" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-amber-400/80 rounded-br-lg" />
              </div>

              {/* Specs Summary Pill */}
              <div className="w-full mt-4 p-3 bg-[#FAF8F5] rounded-2xl border border-[#E8E2D9] text-xs text-[#2E282A]/80 space-y-1">
                <div className="flex justify-between">
                  <span className="text-[#2E282A]/60">Temática:</span>
                  <span className="font-bold truncate max-w-[170px]">{selectedTheme}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#2E282A]/60">Acabado Tapa:</span>
                  <span className="font-bold">{finishObj.label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#2E282A]/60">Foil Metalizado:</span>
                  <span className="font-bold">{foilObj.label}</span>
                </div>
              </div>

              {/* Price & Add to Cart */}
              <div className="w-full mt-4 pt-4 border-t border-[#E8E2D9] flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#2E282A]/60 block">
                    Precio Total Configurado
                  </span>
                  <span className="text-xl font-display font-black text-[#2E282A]">
                    {FORMAT_CURRENCY(calculatedPrice)}
                  </span>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#E07A5F] hover:bg-[#D0694E] text-white py-3 px-4 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Agregar al Carrito</span>
                </button>
              </div>

            </div>

            {/* Guarantee Note */}
            <div className="p-3.5 bg-emerald-50/80 rounded-2xl border border-emerald-200 text-xs text-emerald-950 flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Antes de imprimir, te enviamos la <strong>muestra digital exacta por WhatsApp</strong> para tu tranquilidad total.</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
