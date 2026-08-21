import React, { useState } from 'react';
import { 
  Heart, 
  Star, 
  ChevronDown, 
  Sparkles, 
  MessageCircle, 
  HelpCircle,
  CheckCircle2
} from 'lucide-react';
import { TESTIMONIALS, FAQS, SHOP_INFO } from '../data/stationeryData';

export const TestimonialsSection: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <section id="faqs" className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Testimonials Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E8E2D9] text-[#E07A5F] text-[10px] font-bold uppercase tracking-[0.25em] mb-2 shadow-2xs">
            <Heart className="w-3.5 h-3.5 fill-[#E07A5F]" />
            <span>Historias & Experiencias Reales</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-[#2E282A]">
            Lo que Dicen Nuestras Familias y Clientes
          </h2>
          <p className="text-xs sm:text-sm text-[#2E282A]/70 mt-1.5">
            Cada testimonio es el impulso que nos motiva a cuidar cada milímetro de papel y cada detalle en foil.
          </p>
        </div>

        {/* Testimonials 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white p-6 rounded-3xl border border-[#E8E2D9] shadow-2xs flex flex-col justify-between hover:border-[#E07A5F]/40 transition-colors"
            >
              <div>
                <div className="flex text-[#E07A5F] mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#E07A5F]" />
                  ))}
                </div>
                <p className="text-xs text-[#2E282A]/80 italic leading-relaxed mb-4">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#E8E2D9] flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#E8E2D9]"
                />
                <div>
                  <h4 className="text-xs font-bold text-[#2E282A]">{t.name}</h4>
                  <span className="text-[10px] text-[#2E282A]/60 block">{t.role}</span>
                  <span className="text-[10px] text-[#E07A5F] font-semibold block mt-0.5">
                    {t.productName}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQs Section */}
        <div className="max-w-3xl mx-auto pt-10 border-t border-[#E8E2D9]">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#E07A5F] mb-1">
              <HelpCircle className="w-4 h-4" />
              <span>Resolvemos tus dudas</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-black text-[#2E282A]">
              Preguntas Frecuentes
            </h3>
            <p className="text-xs text-[#2E282A]/70 mt-1">
              Todo lo que necesitás saber sobre personalización, tiempos, envíos y pagos.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-[#E8E2D9] overflow-hidden transition-all shadow-2xs"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4.5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF8F5] transition-colors"
                  >
                    <span className="font-display text-xs sm:text-sm font-bold text-[#2E282A]">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#E07A5F] transition-transform duration-300 shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4.5 pb-4.5 pt-1 text-xs text-[#2E282A]/80 leading-relaxed border-t border-[#E8E2D9]/50 bg-[#FAF8F5]/50 animate-fade-in">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Direct question box */}
          <div className="mt-8 p-4 bg-white rounded-2xl border border-[#E8E2D9] text-center flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <h4 className="font-display text-xs font-bold text-[#2E282A]">
                ¿Tenés una consulta especial o pedido a medida?
              </h4>
              <p className="text-[11px] text-[#2E282A]/70">
                Escribinos directamente a nuestro WhatsApp y te asesoramos al instante.
              </p>
            </div>

            <a
              href={`https://wa.me/${SHOP_INFO.whatsappRaw}?text=${encodeURIComponent("¡Hola Sus Creaciones! Tengo una consulta sobre un pedido especial 🌸")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shrink-0"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Chatear por WhatsApp</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
