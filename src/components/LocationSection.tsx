import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Truck, 
  MessageCircle, 
  CreditCard, 
  Building, 
  Sparkles,
  ShieldCheck,
  Send
} from 'lucide-react';
import { SHOP_INFO } from '../data/stationeryData';

export const LocationSection: React.FC = () => {
  return (
    <section id="contacto" className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E8E2D9] text-[#E07A5F] text-[10px] font-bold uppercase tracking-[0.25em] mb-2 shadow-2xs">
            <MapPin className="w-3.5 h-3.5" />
            <span>Taller & Punto de Retiro</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[#2E282A]">
            Atención, Envíos y Contacto
          </h2>
          <p className="text-sm sm:text-base text-[#2E282A]/70 mt-2">
            Trabajamos desde nuestro taller creativo en Paraguay con envíos a todo el país y atención personalizada por WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Info Card Left */}
          <div className="lg:col-span-6 bg-white p-8 rounded-3xl border border-[#E8E2D9] shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div className="flex items-center gap-3 pb-4 border-b border-[#E8E2D9]">
                <div className="w-12 h-12 rounded-2xl bg-[#E07A5F]/15 flex items-center justify-center text-[#E07A5F]">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-[#2E282A]">
                    {SHOP_INFO.name}
                  </h3>
                  <span className="text-xs text-[#2E282A]/60">
                    {SHOP_INFO.subtitle}
                  </span>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#2E282A]/80">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#E07A5F] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#2E282A] block">Ubicación del Taller:</strong>
                    <span>{SHOP_INFO.address}, {SHOP_INFO.city}.</span>
                    <span className="text-[11px] text-[#2E282A]/60 block mt-0.5">
                      (Retiro de pedidos con previa coordinación una vez notificado el listo para entrega)
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#E07A5F] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#2E282A] block">Horarios de Atención:</strong>
                    <span>Lunes a Viernes: 8:00 a 18:00 hs</span>
                    <span className="block">Sábados: 8:30 a 13:00 hs</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Truck className="w-4 h-4 text-[#E07A5F] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#2E282A] block">Tiempos de Producción:</strong>
                    <span>{SHOP_INFO.productionTime}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#E07A5F] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#2E282A] block">WhatsApp Oficial:</strong>
                    <span>{SHOP_INFO.whatsappDisplay}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8E2D9] flex flex-wrap items-center gap-3">
              <a
                href={`https://wa.me/${SHOP_INFO.whatsappRaw}?text=${encodeURIComponent("¡Hola Sus Creaciones! Quiero hacer una consulta 🌸")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-xs transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Hablar por WhatsApp</span>
              </a>

              <a
                href={SHOP_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#FAF8F5] hover:bg-[#E8E2D9] text-[#2E282A] px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider border border-[#E8E2D9] transition-all"
              >
                Ver Instagram
              </a>
            </div>
          </div>

          {/* Nationwide Shipping & Payment Coverage Card Right */}
          <div className="lg:col-span-6 bg-white p-8 rounded-3xl border border-[#E8E2D9] shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E07A5F]">
                <Truck className="w-4 h-4" />
                <span>Logística & Envíos Seguros</span>
              </div>

              <h3 className="font-display text-2xl font-black text-[#2E282A]">
                Llegamos a Todo Paraguay 🇵🇾
              </h3>
              <p className="text-xs sm:text-sm text-[#2E282A]/70 leading-relaxed">
                Cada paquete se despacha con protección especial anti-impacto y papel seda para que tus carpetas, libritos o agendas lleguen en perfecto estado.
              </p>

              <div className="space-y-2.5 pt-2">
                <div className="p-3.5 bg-[#FAF8F5] rounded-2xl border border-[#E8E2D9] flex items-center justify-between text-xs">
                  <div>
                    <strong className="text-[#2E282A] block">Asunción & Gran Asunción</strong>
                    <span className="text-[11px] text-[#2E282A]/60">Delivery en moto puerta a puerta (San Lorenzo, Luque, Lambaré, etc.)</span>
                  </div>
                  <span className="font-bold text-[#E07A5F]">24/48 hs</span>
                </div>

                <div className="p-3.5 bg-[#FAF8F5] rounded-2xl border border-[#E8E2D9] flex items-center justify-between text-xs">
                  <div>
                    <strong className="text-[#2E282A] block">Interior del País (AEX / NSA / TVS)</strong>
                    <span className="text-[11px] text-[#2E282A]/60">A agencia o domicilio con número de rastreo y guía</span>
                  </div>
                  <span className="font-bold text-[#E07A5F]">24 a 72 hs</span>
                </div>
              </div>

              {/* Payment Methods Badges */}
              <div className="pt-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#2E282A]/60 block mb-2">
                  Medios de Pago Aceptados:
                </span>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 bg-[#FAF8F5] rounded-xl border border-[#E8E2D9] text-[11px] font-bold text-[#2E282A]">
                    📲 Transferencia SIPAP
                  </div>
                  <div className="p-2 bg-[#FAF8F5] rounded-xl border border-[#E8E2D9] text-[11px] font-bold text-[#2E282A]">
                    📱 Giros Tigo / QR
                  </div>
                  <div className="p-2 bg-[#FAF8F5] rounded-xl border border-[#E8E2D9] text-[11px] font-bold text-[#2E282A]">
                    💵 Efectivo Taller
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-950 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Compra 100% segura con atención directa y personalizada.</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
