import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  MessageCircle, 
  Truck, 
  CreditCard, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  Info
} from 'lucide-react';
import { CartItem } from '../types';
import { SHOP_INFO, FORMAT_CURRENCY } from '../data/stationeryData';

interface WhatsAppOrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
}

export const WhatsAppOrderDrawer: React.FC<WhatsAppOrderDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [shippingMethod, setShippingMethod] = useState<'retiro' | 'delivery-asuncion' | 'interior-transportadora'>('retiro');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'transferencia' | 'giros' | 'efectivo'>('transferencia');
  const [generalNotes, setGeneralNotes] = useState('');

  // Shipping cost calculation
  const getShippingCost = () => {
    switch (shippingMethod) {
      case 'delivery-asuncion': return 25000;
      case 'interior-transportadora': return 35000;
      default: return 0;
    }
  };

  const subtotal = cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const shippingCost = getShippingCost();
  const total = subtotal + shippingCost;

  const handleSendWhatsApp = () => {
    if (cart.length === 0) return;

    let message = `🌸 *NUEVO PEDIDO - SUS CREACIONES* 🌸\n` +
      `-----------------------------------------\n` +
      `👤 *Cliente:* ${customerName.trim() || 'Cliente Web'}\n` +
      `📱 *WhatsApp:* ${customerPhone.trim() || 'No especificado'}\n`;

    if (shippingMethod !== 'retiro') {
      message += `📍 *Dirección de Envío:* ${address.trim() || 'A coordinar'}, ${city.trim() || 'Paraguay'}\n`;
    }

    message += `🚚 *Método de Entrega:* ${
      shippingMethod === 'retiro'
        ? 'Retiro en Taller / Showroom (Gratis)'
        : shippingMethod === 'delivery-asuncion'
        ? 'Delivery Asunción / Gran Asunción (25.000 Gs.)'
        : 'Envío al Interior por Transportadora AEX/NSA (35.000 Gs.)'
    }\n` +
    `💳 *Forma de Pago:* ${
      paymentMethod === 'transferencia'
        ? 'Transferencia Bancaria SIPAP / QR'
        : paymentMethod === 'giros'
        ? 'Giros Tigo / Billetera Digital'
        : 'Efectivo al retirar en taller'
    }\n` +
    `-----------------------------------------\n` +
    `📦 *DETALLE DE PRODUCTOS:*\n\n`;

    cart.forEach((item, index) => {
      message += `${index + 1}. *${item.product.name}*\n` +
        `   • Cantidad: ${item.quantity} u. x ${FORMAT_CURRENCY(item.unitPrice)} = ${FORMAT_CURRENCY(item.unitPrice * item.quantity)}\n`;

      if (item.customization) {
        message += `   • Nombre en portada: *${item.customization.name || 'Sin especificar'}*\n` +
          `   • Temática: ${item.customization.theme || 'Estándar'}\n` +
          `   • Tapa: ${item.customization.finish || 'Mate'}\n` +
          `   • Foil: ${item.customization.foil || 'Clásico'}\n` +
          `   • Anillado: ${item.customization.binding || 'Blanco'}\n`;
        if (item.customization.dedication) {
          message += `   • Subtítulo/Dedicatoria: ${item.customization.dedication}\n`;
        }
        if (item.customization.additionalNotes) {
          message += `   • Aclaración: ${item.customization.additionalNotes}\n`;
        }
      }
      message += `\n`;
    });

    message += `-----------------------------------------\n` +
      `🧾 *Subtotal Productos:* ${FORMAT_CURRENCY(subtotal)}\n`;

    if (shippingCost > 0) {
      message += `🚚 *Costo de Envío:* ${FORMAT_CURRENCY(shippingCost)}\n`;
    }

    message += `💰 *TOTAL FINAL:* ${FORMAT_CURRENCY(total)}\n`;

    if (generalNotes.trim()) {
      message += `📝 *Nota adicional:* ${generalNotes.trim()}\n`;
    }

    message += `-----------------------------------------\n` +
      `¡Hola! Envío el detalle de mi pedido para coordinar la muestra digital y el pago. ¡Muchas gracias! 💕`;

    window.open(`https://wa.me/${SHOP_INFO.whatsappRaw}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-fade-in">
      <div className="bg-white w-full max-w-lg h-full shadow-2xl flex flex-col justify-between border-l border-[#E8E2D9] relative">
        
        {/* Header */}
        <div className="p-5 border-b border-[#E8E2D9] flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#E07A5F] text-white flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-[#2E282A]">
                Tu Carrito de Creaciones
              </h3>
              <span className="text-[11px] text-[#2E282A]/70">
                {cart.length} {cart.length === 1 ? 'producto seleccionado' : 'productos seleccionados'}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white hover:bg-[#E8E2D9] text-[#2E282A] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Cerrar carrito"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#FAF8F5] text-3xl flex items-center justify-center mx-auto text-[#2E282A]/40">
                🛒
              </div>
              <h4 className="font-display text-lg font-bold text-[#2E282A]">
                Tu carrito está vacío
              </h4>
              <p className="text-xs text-[#2E282A]/70 max-w-xs mx-auto">
                Explorá nuestro catálogo de carpetas prenatales, libritos para colorear y artículos de librería para armar tu pedido.
              </p>
              <button
                onClick={onClose}
                className="mt-2 bg-[#E07A5F] text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider"
              >
                Ver Productos
              </button>
            </div>
          ) : (
            <>
              {/* Product Lines List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-[#2E282A]/70 font-semibold pb-1 border-b border-[#E8E2D9]">
                  <span>Ítems a ordenar</span>
                  <button
                    onClick={onClearCart}
                    className="text-[#E07A5F] hover:underline text-[11px] font-bold"
                  >
                    Vaciar carrito
                  </button>
                </div>

                {cart.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-[#E8E2D9] flex gap-3 text-left relative group"
                  >
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 border border-[#E8E2D9]"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-display text-xs font-bold text-[#2E282A] truncate">
                        {item.product.name}
                      </h4>
                      <div className="text-[11px] font-bold text-[#E07A5F]">
                        {FORMAT_CURRENCY(item.unitPrice)} c/u
                      </div>

                      {/* Customization Badges */}
                      {item.customization && (
                        <div className="mt-1.5 p-2 bg-white rounded-lg border border-[#E8E2D9] text-[10px] text-[#2E282A]/80 space-y-0.5">
                          <p><strong>Nombre:</strong> {item.customization.name}</p>
                          <p><strong>Temática:</strong> {item.customization.theme}</p>
                          {item.customization.foil && (
                            <p><strong>Foil:</strong> {item.customization.foil}</p>
                          )}
                          {item.customization.finish && (
                            <p><strong>Tapa:</strong> {item.customization.finish}</p>
                          )}
                        </div>
                      )}

                      {/* Quantity and Line Total */}
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#E8E2D9]/60">
                        <div className="flex items-center border border-[#E8E2D9] rounded-full bg-white px-2 py-0.5">
                          <button
                            onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                            className="text-[#2E282A] hover:text-[#E07A5F] px-1"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold px-2">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                            className="text-[#2E282A] hover:text-[#E07A5F] px-1"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="font-display text-xs font-black text-[#2E282A]">
                            {FORMAT_CURRENCY(item.unitPrice * item.quantity)}
                          </span>
                          <button
                            onClick={() => onRemoveItem(item.cartItemId)}
                            className="text-[#2E282A]/40 hover:text-red-600 p-1"
                            title="Eliminar ítem"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Customer Info Form */}
              <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#E8E2D9] space-y-3 text-left">
                <h4 className="font-display text-xs font-bold uppercase tracking-wider text-[#2E282A] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#E07A5F]" />
                  Tus Datos de Contacto:
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Tu Nombre y Apellido *"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E8E2D9] text-xs text-[#2E282A] focus:outline-none focus:border-[#E07A5F]"
                  />
                  <input
                    type="tel"
                    placeholder="WhatsApp de contacto *"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E8E2D9] text-xs text-[#2E282A] focus:outline-none focus:border-[#E07A5F]"
                  />
                </div>
              </div>

              {/* Shipping Method Selector */}
              <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#E8E2D9] space-y-2.5 text-left">
                <h4 className="font-display text-xs font-bold uppercase tracking-wider text-[#2E282A] flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#E07A5F]" />
                  Método de Entrega:
                </h4>

                <div className="space-y-1.5">
                  {[
                    { id: 'retiro', title: 'Retiro en Taller / Showroom', desc: 'Asunción / Gran Asunción (Sin costo)', price: 0 },
                    { id: 'delivery-asuncion', title: 'Delivery Asunción / Gran Asunción', desc: 'Moto mensajería puerta a puerta', price: 25000 },
                    { id: 'interior-transportadora', title: 'Envío al Interior (AEX / NSA Encomiendas)', desc: 'A todo Paraguay con número de guía', price: 35000 },
                  ].map((s) => (
                    <label
                      key={s.id}
                      className={`p-2.5 rounded-xl border flex items-center justify-between text-xs cursor-pointer transition-all ${
                        shippingMethod === s.id
                          ? 'border-[#E07A5F] bg-white font-bold text-[#2E282A] shadow-2xs'
                          : 'border-[#E8E2D9] bg-white/50 text-[#2E282A]/70'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="shipping"
                          checked={shippingMethod === s.id}
                          onChange={() => setShippingMethod(s.id as any)}
                          className="accent-[#E07A5F]"
                        />
                        <div>
                          <span className="block leading-tight">{s.title}</span>
                          <span className="text-[10px] text-[#2E282A]/50 font-normal">{s.desc}</span>
                        </div>
                      </div>
                      <span className="font-bold text-[#E07A5F]">
                        {s.price === 0 ? 'Gratis' : FORMAT_CURRENCY(s.price)}
                      </span>
                    </label>
                  ))}
                </div>

                {shippingMethod !== 'retiro' && (
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <input
                      type="text"
                      placeholder="Dirección / Barrio / Referencia"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="px-3 py-1.5 rounded-xl bg-white border border-[#E8E2D9] text-xs text-[#2E282A]"
                    />
                    <input
                      type="text"
                      placeholder="Ciudad (ej: Luque, CDE, etc.)"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="px-3 py-1.5 rounded-xl bg-white border border-[#E8E2D9] text-xs text-[#2E282A]"
                    />
                  </div>
                )}
              </div>

              {/* Payment Method */}
              <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#E8E2D9] space-y-2 text-left">
                <h4 className="font-display text-xs font-bold uppercase tracking-wider text-[#2E282A] flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-[#E07A5F]" />
                  Forma de Pago Preferida:
                </h4>

                <div className="grid grid-cols-3 gap-1.5 text-center">
                  {[
                    { id: 'transferencia', label: 'SIPAP / QR' },
                    { id: 'giros', label: 'Giros Tigo / Zimple' },
                    { id: 'efectivo', label: 'Efectivo Retiro' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPaymentMethod(p.id as any)}
                      className={`p-2 rounded-xl border text-[11px] font-semibold transition-all cursor-pointer ${
                        paymentMethod === p.id
                          ? 'border-[#E07A5F] bg-[#E07A5F]/10 text-[#2E282A] font-bold'
                          : 'border-[#E8E2D9] bg-white text-[#2E282A]/70'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer & Submit Order Button */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-[#E8E2D9] bg-[#FAF8F5] space-y-3">
            <div className="space-y-1 text-xs text-[#2E282A]/80">
              <div className="flex justify-between">
                <span>Subtotal ({cart.reduce((a, b) => a + b.quantity, 0)} productos):</span>
                <span className="font-bold">{FORMAT_CURRENCY(subtotal)}</span>
              </div>
              {shippingCost > 0 && (
                <div className="flex justify-between">
                  <span>Envío:</span>
                  <span className="font-bold">{FORMAT_CURRENCY(shippingCost)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-black text-[#2E282A] pt-2 border-t border-[#E8E2D9]">
                <span>Total Estimado:</span>
                <span className="font-display text-lg text-[#E07A5F]">{FORMAT_CURRENCY(total)}</span>
              </div>
            </div>

            <button
              onClick={handleSendWhatsApp}
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-3.5 px-4 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:scale-101 transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Enviar Pedido a WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[10px] text-center text-[#2E282A]/60">
              Al enviar tu pedido se abrirá WhatsApp con el resumen completo listo para coordinar muestra digital y entrega.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
