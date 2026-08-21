import React from 'react';
import { 
  Sparkles, 
  Tag, 
  ArrowRight, 
  Baby, 
  Palette, 
  ShoppingBag, 
  CheckCircle2,
  Clock
} from 'lucide-react';
import { FORMAT_CURRENCY } from '../data/stationeryData';

interface SpecialPacksBannerProps {
  onSelectCategory: (cat: any) => void;
  onOpenProductModalById?: (id: string) => void;
}

export const DailySpecialBanner: React.FC<SpecialPacksBannerProps> = ({
  onSelectCategory,
  onOpenProductModalById,
}) => {
  return (
    <section className="py-12 bg-[#FAF8F5] border-b border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Promo Card 1: Combo Maternidad */}
          <div className="bg-gradient-to-br from-[#FFF5F7] to-[#FAF8F5] p-6 sm:p-8 rounded-3xl border border-[#F2D6DC] shadow-2xs relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E07A5F] text-white text-[10px] font-bold uppercase tracking-wider">
                  <Sparkles className="w-3 h-3" />
                  Combo Ahorro 15% OFF
                </span>
                <span className="text-2xl">🤰🍼</span>
              </div>

              <h3 className="font-display text-2xl font-black text-[#2E282A]">
                Combo Maternidad "Dulce Espera + Salud"
              </h3>
              <p className="text-xs sm:text-sm text-[#2E282A]/70 leading-relaxed">
                Incluye la <strong>Carpeta Prenatal Deluxe A4</strong> con separadores + el <strong>Cuaderno Pediátrico A5</strong> haciendo juego con la misma temática y nombre.
              </p>

              <ul className="space-y-1.5 text-xs text-[#2E282A]/80 pt-1">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Ambos con tapa dura personalizada y foil metalizado</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Plancha de stickers temáticos de regalo</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-4 border-t border-[#F2D6DC] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#2E282A]/50 line-through block">
                  {FORMAT_CURRENCY(32700)}
                </span>
                <span className="font-display text-xl font-black text-[#E07A5F]">
                  {FORMAT_CURRENCY(27800)}
                </span>
              </div>

              <button
                onClick={() => onSelectCategory('prenatal')}
                className="bg-[#2E282A] hover:bg-[#E07A5F] text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Ver Maternidad</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Promo Card 2: Pack Fiestas & Cumpleaños */}
          <div className="bg-gradient-to-br from-[#F4F9F6] to-[#FAF8F5] p-6 sm:p-8 rounded-3xl border border-[#D5E8DD] shadow-2xs relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#81B29A] text-white text-[10px] font-bold uppercase tracking-wider">
                  <Tag className="w-3 h-3" />
                  Especial Souvenirs
                </span>
                <span className="text-2xl">🎨🎂</span>
              </div>

              <h3 className="font-display text-2xl font-black text-[#2E282A]">
                Pack Cumpleaños "Creatividad Pura"
              </h3>
              <p className="text-xs sm:text-sm text-[#2E282A]/70 leading-relaxed">
                <strong>Pack x 20 Libritos para Pintar A5</strong> con portada personalizada + <strong>20 cajitas de crayones</strong> + bolsita individual lista para entregar como souvenir.
              </p>

              <ul className="space-y-1.5 text-xs text-[#2E282A]/80 pt-1">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Dibujos según la temática elegida (Dinos, Princesas, etc.)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Cierrabolsa autoadhesivo con nombre y edad del cumpleañero</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-4 border-t border-[#D5E8DD] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#2E282A]/50 line-through block">
                  {FORMAT_CURRENCY(38000)}
                </span>
                <span className="font-display text-xl font-black text-[#81B29A]">
                  {FORMAT_CURRENCY(31500)}
                </span>
              </div>

              <button
                onClick={() => onSelectCategory('colorear')}
                className="bg-[#2E282A] hover:bg-[#81B29A] text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Ver Souvenirs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
