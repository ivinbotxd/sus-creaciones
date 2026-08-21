import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Star, 
  Check, 
  ShoppingBag, 
  MessageCircle, 
  Layers, 
  FileText, 
  ShieldCheck, 
  Truck,
  Plus,
  Minus,
  Info
} from 'lucide-react';
import { COVER_FINISH_OPTIONS, FOIL_OPTIONS, BINDING_COLORS, THEME_OPTIONS, FORMAT_CURRENCY, SHOP_INFO } from '../data/stationeryData';
import { Product, CartCustomization } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, customization: CartCustomization | undefined, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Customization states
  const [customName, setCustomName] = useState('');
  const [customTheme, setCustomTheme] = useState(
    product.customization?.defaultTheme || THEME_OPTIONS[0]
  );
  const [selectedFinish, setSelectedFinish] = useState(
    product.customization?.coverFinishes?.[0]?.id || COVER_FINISH_OPTIONS[0].id
  );
  const [selectedFoil, setSelectedFoil] = useState(
    product.customization?.foilOptions?.[0]?.id || FOIL_OPTIONS[0].id
  );
  const [selectedBinding, setSelectedBinding] = useState(
    product.customization?.bindingColors?.[0] || BINDING_COLORS[0]
  );
  const [customDedication, setCustomDedication] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  const images = product.gallery && product.gallery.length > 0 ? product.gallery : [product.imageUrl];

  // Price calculations
  const finishObj =
    product.customization?.coverFinishes?.find((f) => f.id === selectedFinish) ||
    COVER_FINISH_OPTIONS.find((f) => f.id === selectedFinish) ||
    COVER_FINISH_OPTIONS[0];

  const foilObj =
    product.customization?.foilOptions?.find((f) => f.id === selectedFoil) ||
    FOIL_OPTIONS.find((f) => f.id === selectedFoil) ||
    FOIL_OPTIONS[0];

  const extraPerUnit = product.isCustomizable ? (finishObj?.priceDelta || 0) + (foilObj?.priceDelta || 0) : 0;
  const unitPrice = product.price + extraPerUnit;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    let customizationData: CartCustomization | undefined = undefined;

    if (product.isCustomizable) {
      customizationData = {
        name: customName || 'Sin nombre especificado',
        theme: customTheme,
        finish: finishObj?.label,
        foil: foilObj?.label,
        binding: selectedBinding,
        dedication: customDedication,
        additionalNotes: additionalNotes,
        extraPrice: extraPerUnit,
      };
    }

    onAddToCart(product, customizationData, quantity);
    onClose();
  };

  const handleDirectWhatsApp = () => {
    let text = `¡Hola Sus Creaciones! 👋 Quiero consultar/encargar el producto:\n` +
      `📌 *${product.name}*\n` +
      `🔢 *Cantidad:* ${quantity} u.\n`;

    if (product.isCustomizable) {
      text += `\n*Detalles de Personalización:*\n` +
        `• *Nombre en portada:* ${customName || '(A definir)'}\n` +
        `• *Temática:* ${customTheme}\n` +
        `• *Laminado:* ${finishObj?.label}\n` +
        `• *Foil:* ${foilObj?.label}\n` +
        `• *Anillado:* ${selectedBinding}\n`;
      if (customDedication) text += `• *Dedicatoria/Fecha:* ${customDedication}\n`;
      if (additionalNotes) text += `• *Notas extra:* ${additionalNotes}\n`;
    }

    text += `\n💰 *Total Estimado:* ${FORMAT_CURRENCY(totalPrice)}\n` +
      `¿Cómo coordinamos el diseño y el envío? ¡Gracias!`;

    window.open(`https://wa.me/${SHOP_INFO.whatsappRaw}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-[#E8E2D9] overflow-hidden relative max-h-[92vh] flex flex-col">
        
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#2E282A] flex items-center justify-center shadow-md transition-all cursor-pointer"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Left Column: Image Gallery */}
            <div className="md:col-span-5 space-y-3">
              <div className="aspect-4/3 rounded-2xl overflow-hidden bg-[#F2ECE4] border border-[#E8E2D9] shadow-2xs">
                <img
                  src={images[activeImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {images.length > 1 && (
                <div className="flex gap-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        activeImageIndex === idx ? 'border-[#E07A5F] scale-105' : 'border-transparent opacity-70'
                      }`}
                    >
                      <img src={img} alt="Miniatura" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Specifications Box */}
              <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#E8E2D9] text-xs space-y-2 text-[#2E282A]/80">
                <h4 className="font-bold text-[#2E282A] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#E07A5F]" />
                  Ficha Técnica & Materiales:
                </h4>
                {product.specs.dimensions && (
                  <p><strong>Tamaño:</strong> {product.specs.dimensions}</p>
                )}
                {product.specs.pages && (
                  <p><strong>Páginas / Capacidad:</strong> {product.specs.pages}</p>
                )}
                {product.specs.paperType && (
                  <p><strong>Papel:</strong> {product.specs.paperType}</p>
                )}
                {product.specs.cover && (
                  <p><strong>Tapa:</strong> {product.specs.cover}</p>
                )}

                {product.specs.extras && product.specs.extras.length > 0 && (
                  <div className="pt-2 border-t border-[#E8E2D9]/70">
                    <span className="font-bold text-[#2E282A] block mb-1">Incluye:</span>
                    <ul className="space-y-1">
                      {product.specs.extras.map((extra, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-[#81B29A] shrink-0" />
                          <span>{extra}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Details & Customization Controls */}
            <div className="md:col-span-7 space-y-5 text-left">
              
              {/* Product Header */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#E07A5F] bg-[#E07A5F]/10 px-2.5 py-0.5 rounded-full">
                    {product.category.toUpperCase()}
                  </span>
                  <div className="flex items-center gap-1 text-[#E07A5F] text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-[#E07A5F]" />
                    <span>{product.rating.toFixed(1)} ({product.reviewCount} opiniones)</span>
                  </div>
                </div>

                <h2 className="font-display text-2xl sm:text-3xl font-black text-[#2E282A]">
                  {product.name}
                </h2>
                <p className="text-xs sm:text-sm text-[#2E282A]/70 mt-1 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Customization Form (if product is customizable) */}
              {product.isCustomizable && (
                <div className="bg-[#FAF8F5] p-4 sm:p-5 rounded-2xl border border-[#E8E2D9] space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-[#E8E2D9]">
                    <Sparkles className="w-4 h-4 text-[#E07A5F]" />
                    <h3 className="font-display text-sm font-bold text-[#2E282A] uppercase tracking-wider">
                      Personalizá este producto:
                    </h3>
                  </div>

                  {/* Name Input */}
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#2E282A] block mb-1">
                      Nombre a incluir en la portada:
                    </label>
                    <input
                      type="text"
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      placeholder="Ej: Sofía, Tomás, Mis Recuerdos..."
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#E8E2D9] text-xs sm:text-sm text-[#2E282A] font-semibold focus:outline-none focus:border-[#E07A5F]"
                    />
                  </div>

                  {/* Theme Select */}
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#2E282A] block mb-1">
                      Temática o diseño:
                    </label>
                    <select
                      value={customTheme}
                      onChange={(e) => setCustomTheme(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#E8E2D9] text-xs sm:text-sm text-[#2E282A] focus:outline-none focus:border-[#E07A5F]"
                    >
                      {(product.customization?.themes || THEME_OPTIONS).map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  {/* Foil & Finish Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[#2E282A] block mb-1">
                        Detalle en Foil:
                      </label>
                      <select
                        value={selectedFoil}
                        onChange={(e) => setSelectedFoil(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#E8E2D9] text-xs text-[#2E282A] focus:outline-none focus:border-[#E07A5F]"
                      >
                        {(product.customization?.foilOptions || FOIL_OPTIONS).map((f) => (
                          <option key={f.id} value={f.id}>
                            {f.label} {f.priceDelta > 0 ? `(+${FORMAT_CURRENCY(f.priceDelta)})` : ''}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[#2E282A] block mb-1">
                        Laminado de Tapa:
                      </label>
                      <select
                        value={selectedFinish}
                        onChange={(e) => setSelectedFinish(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#E8E2D9] text-xs text-[#2E282A] focus:outline-none focus:border-[#E07A5F]"
                      >
                        {(product.customization?.coverFinishes || COVER_FINISH_OPTIONS).map((f) => (
                          <option key={f.id} value={f.id}>
                            {f.label} {f.priceDelta > 0 ? `(+${FORMAT_CURRENCY(f.priceDelta)})` : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Extra Notes */}
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#2E282A] block mb-1">
                      Aclaraciones o fecha especial (opcional):
                    </label>
                    <input
                      type="text"
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                      placeholder="Ej: Cumple de 4 años, fecha 15/10/2025, etc."
                      className="w-full px-3.5 py-1.5 rounded-xl bg-white border border-[#E8E2D9] text-xs text-[#2E282A] focus:outline-none focus:border-[#E07A5F]"
                    />
                  </div>

                </div>
              )}

              {/* Quantity & Pricing Controls */}
              <div className="pt-3 border-t border-[#E8E2D9] space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#2E282A]">
                      Cantidad:
                    </span>
                    <div className="flex items-center border border-[#E8E2D9] rounded-full bg-white p-1">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-7 h-7 rounded-full bg-[#FAF8F5] hover:bg-[#E8E2D9] flex items-center justify-center text-xs font-bold text-[#2E282A] cursor-pointer"
                        aria-label="Restar cantidad"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-[#2E282A]">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-7 h-7 rounded-full bg-[#FAF8F5] hover:bg-[#E8E2D9] flex items-center justify-center text-xs font-bold text-[#2E282A] cursor-pointer"
                        aria-label="Sumar cantidad"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-[#2E282A]/60 block uppercase font-semibold">
                      Total ({quantity} {quantity === 1 ? 'unidad' : 'unidades'})
                    </span>
                    <span className="font-display text-2xl font-black text-[#2E282A]">
                      {FORMAT_CURRENCY(totalPrice)}
                    </span>
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-[#E07A5F] hover:bg-[#D0694E] text-white py-3 px-4 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Agregar al Carrito</span>
                  </button>

                  <button
                    onClick={handleDirectWhatsApp}
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-3 px-4 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Comprar por WhatsApp</span>
                  </button>
                </div>

                <p className="text-[11px] text-center text-[#2E282A]/60 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#81B29A]" />
                  <span>Te enviamos la muestra digital antes de comenzar la producción.</span>
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
