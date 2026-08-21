import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { SHOP_INFO } from '../data/stationeryData';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 group">
      {/* Tooltip speech bubble */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white text-[#2E282A] px-3.5 py-2 rounded-2xl shadow-md border border-[#E8E2D9] text-xs font-semibold relative animate-fade-in">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-[#2E282A]/50 hover:text-[#2E282A]"
            aria-label="Cerrar tooltip"
          >
            <X className="w-3 h-3" />
          </button>
          <span>¿Querés personalizar un producto? ¡Escribinos! ✨</span>
          <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white transform rotate-45 border-r border-b border-[#E8E2D9]" />
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={`https://wa.me/${SHOP_INFO.whatsappRaw}?text=${encodeURIComponent("¡Hola Sus Creaciones! 👋 Quiero consultar por un producto personalizado.")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white p-3.5 sm:px-4 sm:py-3.5 rounded-full shadow-lg hover:scale-105 transition-all duration-300 relative cursor-pointer"
        title="Consultar por WhatsApp"
      >
        <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
        <span className="hidden sm:inline font-bold text-xs uppercase tracking-wider">
          WhatsApp Directo
        </span>
        
        {/* Pulsing indicator */}
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
        </span>
      </a>
    </div>
  );
};
