import React from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Heart, 
  MessageCircle, 
  Instagram, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowUp
} from 'lucide-react';
import { SHOP_INFO, CATEGORIES } from '../data/stationeryData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#2E282A] text-[#FAF8F5] pt-16 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#E07A5F] flex items-center justify-center text-white shadow-xs">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-display text-xl font-black text-white tracking-tight">
                  {SHOP_INFO.name}
                </h3>
                <span className="text-[9px] text-[#E07A5F] font-bold tracking-[0.2em] uppercase block">
                  {SHOP_INFO.subtitle}
                </span>
              </div>
            </div>

            <p className="text-xs text-[#FAF8F5]/70 leading-relaxed max-w-sm">
              {SHOP_INFO.description}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={`https://wa.me/${SHOP_INFO.whatsappRaw}?text=${encodeURIComponent("¡Hola Sus Creaciones! 🌸")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#25D366] text-white flex items-center justify-center transition-colors"
                title="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <a
                href={SHOP_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#E1306C] text-white flex items-center justify-center transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Category Navigation */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display text-xs font-bold text-white uppercase tracking-[0.2em]">
              Categorías
            </h4>
            <ul className="space-y-2 text-xs text-[#FAF8F5]/70">
              {CATEGORIES.slice(1).map((cat) => (
                <li key={cat.id}>
                  <a
                    href="#catalogo"
                    className="hover:text-[#E07A5F] transition-colors flex items-center gap-1.5"
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-display text-xs font-bold text-white uppercase tracking-[0.2em]">
              Información
            </h4>
            <ul className="space-y-2 text-xs text-[#FAF8F5]/70">
              <li>
                <a href="#personalizador" className="hover:text-[#E07A5F] transition-colors">
                  Personalizador en Vivo
                </a>
              </li>
              <li>
                <a href="#proceso" className="hover:text-[#E07A5F] transition-colors">
                  Cómo Trabajamos
                </a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-[#E07A5F] transition-colors">
                  Preguntas Frecuentes
                </a>
              </li>
              <li>
                <a href="#contacto" className="hover:text-[#E07A5F] transition-colors">
                  Taller & Envíos
                </a>
              </li>
              <li>
                <a href="#instagram" className="hover:text-[#E07A5F] transition-colors">
                  Galería de Fotos
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display text-xs font-bold text-white uppercase tracking-[0.2em]">
              Contacto & Taller
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FAF8F5]/70">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#E07A5F] shrink-0 mt-0.5" />
                <span>{SHOP_INFO.address}, {SHOP_INFO.city}.</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#E07A5F] shrink-0" />
                <span>{SHOP_INFO.whatsappDisplay}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#E07A5F] shrink-0" />
                <span>{SHOP_INFO.email}</span>
              </li>
            </ul>

            <div className="pt-2">
              <span className="text-[10px] text-white/50 block">
                Envíos a todo Paraguay por transportadoras (AEX, NSA) 🇵🇾
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Signoff */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF8F5]/50">
          <p>© {new Date().getFullYear()} {SHOP_INFO.name}. Todos los derechos reservados. Asunción, Paraguay 🇵🇾</p>
          
          <div className="flex items-center gap-4">
            <p className="flex items-center gap-1">
              <span>Hecho con</span>
              <Heart className="w-3.5 h-3.5 text-[#E07A5F] fill-[#E07A5F]" />
              <span>y amor artesanal</span>
            </p>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-white/10 hover:bg-[#E07A5F] text-white transition-colors"
              title="Volver arriba"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
