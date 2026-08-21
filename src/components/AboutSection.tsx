import React from 'react';
import { 
  Sparkles, 
  Heart, 
  Layers, 
  Scissors, 
  CheckCircle2, 
  ShieldCheck, 
  Award,
  BookOpen
} from 'lucide-react';
import { WORKSHOP_STEPS, SHOP_INFO } from '../data/stationeryData';

export const AboutSection: React.FC = () => {
  return (
    <section id="proceso" className="py-16 sm:py-24 bg-white border-b border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF8F5] border border-[#E8E2D9] text-[#E07A5F] text-[10px] font-bold uppercase tracking-[0.25em] mb-2 shadow-2xs">
            <Scissors className="w-3.5 h-3.5" />
            <span>El Arte de la Papelería a Mano</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[#2E282A]">
            Cómo Nace Cada Creación
          </h2>
          <p className="text-sm sm:text-base text-[#2E282A]/70 mt-2">
            No somos una imprenta industrial masiva. En <strong>Sus Creaciones</strong> combinamos diseño gráfico personalizado, papeles de calidad premium y encuadernación artesanal para que cada producto sea único.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {WORKSHOP_STEPS.map((step) => (
            <div
              key={step.step}
              className="bg-[#FAF8F5] p-6 rounded-3xl border border-[#E8E2D9] relative flex flex-col justify-between hover:border-[#E07A5F]/40 transition-all hover:shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{step.icon}</span>
                  <span className="font-display text-2xl font-black text-[#E07A5F]/30">
                    {step.step}
                  </span>
                </div>
                <h3 className="font-display text-base font-bold text-[#2E282A] mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-[#2E282A]/70 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#E8E2D9]/60 flex items-center gap-1.5 text-[11px] font-bold text-[#E07A5F]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Garantía de Calidad</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quality Pillars Bento */}
        <div className="bg-[#FAF8F5] rounded-3xl border border-[#E8E2D9] p-8 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E07A5F]">
                <Sparkles className="w-4 h-4" />
                <span>Nuestros Estándares de Producción</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-black text-[#2E282A]">
                Papeles Gruesos, Tintas Nítidas y Acabados que Perduran
              </h3>
              <p className="text-xs sm:text-sm text-[#2E282A]/70 leading-relaxed">
                Sabemos que una carpeta prenatal o un libro de recuerdos de bebé es para toda la vida, y que los libritos para colorear deben soportar marcadores sin romperse. Por eso seleccionamos cuidadosamente cada gramaje y material.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-white rounded-2xl border border-[#E8E2D9]">
                  <h4 className="font-bold text-xs text-[#2E282A]">Papel Chambril 120g/150g</h4>
                  <p className="text-[11px] text-[#2E282A]/60 mt-0.5">Sin traspaso de tinta ni sombras al escribir.</p>
                </div>
                <div className="p-3 bg-white rounded-2xl border border-[#E8E2D9]">
                  <h4 className="font-bold text-xs text-[#2E282A]">Laminado Anti-Rayas</h4>
                  <p className="text-[11px] text-[#2E282A]/60 mt-0.5">Tapas protegidas contra salpicaduras y roces.</p>
                </div>
                <div className="p-3 bg-white rounded-2xl border border-[#E8E2D9]">
                  <h4 className="font-bold text-xs text-[#2E282A]">Foil Termotransmisible</h4>
                  <p className="text-[11px] text-[#2E282A]/60 mt-0.5">Brillo metalizado dorado y plateado real.</p>
                </div>
                <div className="p-3 bg-white rounded-2xl border border-[#E8E2D9]">
                  <h4 className="font-bold text-xs text-[#2E282A]">Anillado Metálico Wire-o</h4>
                  <p className="text-[11px] text-[#2E282A]/60 mt-0.5">Apertura 360° cómoda y resistente.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="aspect-4/3 rounded-2xl overflow-hidden border border-[#E8E2D9] shadow-md bg-white">
                <img
                  src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80"
                  alt="Taller de papelería artesanal Sus Creaciones"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating quote badge */}
              <div className="absolute -bottom-4 -left-4 bg-[#2E282A] text-white p-4 rounded-2xl border border-white/10 shadow-lg max-w-xs">
                <p className="text-xs italic leading-snug">
                  "Diseñamos cada pieza pensando en la emoción de quien la recibe."
                </p>
                <span className="text-[10px] text-[#E07A5F] font-bold uppercase tracking-wider block mt-1.5">
                  — El Equipo de Sus Creaciones
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
