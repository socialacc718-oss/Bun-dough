import React, { useState } from 'react';
import { CartItem, CustomerOrderData } from '../types';
import { 
  X, Trash2, Plus, Minus, Bike, Store, ShoppingBag, 
  Sparkles, AlertCircle, ArrowRight 
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menu';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onCompleteOrder: (order: CustomerOrderData) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCompleteOrder,
}) => {
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'takeaway'>('delivery');
  const [deliveryArea, setDeliveryArea] = useState<'jinnah-garden' | 'other'>('jinnah-garden');
  
  // Customer details
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState('');

  if (!isOpen) return null;

  // Calculation
  const subtotal = cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  
  // Delivery fee: FREE in Jinnah Garden, Rs 150 for other, 0 for takeaway
  const deliveryFee = deliveryType === 'takeaway' ? 0 : (deliveryArea === 'jinnah-garden' ? 0 : 150);
  const grandTotal = subtotal + deliveryFee;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (cart.length === 0) {
      setFormError('Your cart is empty. Please select food items first.');
      return;
    }

    if (!customerName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }

    if (!customerPhone.trim() || customerPhone.trim().length < 8) {
      setFormError('Please enter a valid contact phone number.');
      return;
    }

    if (deliveryType === 'delivery' && !address.trim()) {
      setFormError('Please provide your complete delivery address in Islamabad.');
      return;
    }

    // Generate random 4-digit order code
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const orderId = `BD-${randomDigits}`;

    const orderData: CustomerOrderData = {
      orderId,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      deliveryType,
      deliveryArea: deliveryArea === 'jinnah-garden' ? 'Jinnah Garden (FREE Delivery)' : 'Other Area',
      address: deliveryType === 'delivery' ? address.trim() : 'Takeaway from BUN & DOUGH branch',
      notes: notes.trim(),
      items: [...cart],
      subtotal,
      deliveryFee,
      grandTotal,
      createdAt: new Date().toLocaleString('en-PK', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
    };

    onCompleteOrder(orderData);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dark backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Container: 100% responsive, fits completely on mobile & desktop */}
      <div className="fixed inset-y-0 right-0 w-full sm:max-w-md bg-[#13161f] text-white shadow-2xl flex flex-col border-l border-white/10 z-50">
        {/* Sticky Header */}
        <div className="px-5 py-4 bg-[#181c27] border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black font-['Outfit',sans-serif] text-white leading-tight">
                Your Food Cart
              </h2>
              <p className="text-xs text-slate-400">
                {cart.length} {cart.length === 1 ? 'item' : 'items'} in order
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                type="button"
                onClick={onClearCart}
                className="text-[11px] text-red-400 hover:text-red-300 px-2 py-1 rounded bg-red-500/10 hover:bg-red-500/20 transition-colors"
                title="Clear all cart items"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content: Items & Checkout form */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 no-scrollbar">
          {cart.length === 0 ? (
            <div className="py-14 text-center">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-3 text-slate-500">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">Your cart is empty</h3>
              <p className="text-xs text-slate-400 max-w-xs mx-auto mb-4">
                Explore our sizzling burgers, pizzas, broast & deals to start your order.
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-amber-500 text-black text-xs font-bold hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20"
              >
                Explore Menu
              </button>
            </div>
          ) : (
            <>
              {/* Itemized Cart List */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                  <span>Selected Items</span>
                  <span className="text-amber-400 font-normal text-[11px]">Free delivery in Jinnah Garden</span>
                </div>

                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-[#1b1f2b] border border-white/5 flex gap-3 items-center"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 rounded-lg object-cover bg-black shrink-0 border border-white/5"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs sm:text-sm font-bold text-white leading-tight truncate">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-slate-500 hover:text-red-400 p-1 shrink-0"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Variant & Topping labels */}
                      <div className="text-[11px] text-amber-400/90 mt-0.5 space-y-0.5">
                        {item.selectedVariant && (
                          <div className="font-medium">
                            Size: <span className="text-white">{item.selectedVariant.label}</span>
                          </div>
                        )}
                        {item.selectedTopping && (
                          <div className="text-[10px] text-amber-300">
                            + {item.selectedTopping.name} (Rs. {item.selectedTopping.price})
                          </div>
                        )}
                      </div>

                      {/* Quantity & Line Total */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center bg-[#11131a] rounded-lg border border-white/10 p-0.5">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="w-5 h-5 flex items-center justify-center text-slate-400 hover:text-white rounded hover:bg-white/5"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-5 h-5 flex items-center justify-center text-slate-400 hover:text-white rounded hover:bg-white/5"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="text-xs font-extrabold text-amber-400 font-['Outfit',sans-serif]">
                            Rs. {item.unitPrice * item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Options: Delivery or Takeaway */}
              <div className="pt-2">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Order Type
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDeliveryType('delivery')}
                    className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                      deliveryType === 'delivery'
                        ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Bike className="w-4 h-4" />
                    <span>Home Delivery</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryType('takeaway')}
                    className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                      deliveryType === 'takeaway'
                        ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Store className="w-4 h-4" />
                    <span>Takeaway / Dine-in</span>
                  </button>
                </div>
              </div>

              {/* Delivery Area Selection if delivery is chosen */}
              {deliveryType === 'delivery' && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                  <div className="text-xs font-bold text-amber-200">
                    Delivery Area:
                  </div>
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-xs cursor-pointer">
                      <input
                        type="radio"
                        name="deliveryArea"
                        checked={deliveryArea === 'jinnah-garden'}
                        onChange={() => setDeliveryArea('jinnah-garden')}
                        className="text-amber-500 focus:ring-amber-500"
                      />
                      <span className="font-semibold text-white">
                        Jinnah Garden <strong className="text-emerald-400">(FREE Delivery)</strong>
                      </span>
                    </label>

                    <label className="flex items-center gap-2 text-xs cursor-pointer">
                      <input
                        type="radio"
                        name="deliveryArea"
                        checked={deliveryArea === 'other'}
                        onChange={() => setDeliveryArea('other')}
                        className="text-amber-500 focus:ring-amber-500"
                      />
                      <span className="text-slate-300">
                        Other Nearby Area (+Rs. 150 standard delivery)
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* Customer Information Form */}
              <div className="space-y-3 pt-2">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Customer & Delivery Details
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Muhammad Ali"
                    className="w-full bg-[#1b1f2b] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    WhatsApp / Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="e.g. 03XX XXXXXXX"
                    className="w-full bg-[#1b1f2b] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                {deliveryType === 'delivery' && (
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Complete Delivery Address & Sector *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. House # 12, Street 4, Phase 1, Jinnah Garden, Islamabad"
                      className="w-full bg-[#1b1f2b] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 resize-none"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Special Cooking / Delivery Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Extra spicy, no mayo, bring cold drink"
                    className="w-full bg-[#1b1f2b] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                {formError && (
                  <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Sticky Footer: Total & WhatsApp Order Slip Generation Button */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 bg-[#171b26] border-t border-white/10 shrink-0 space-y-3">
            {/* Bill Summary */}
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span className="font-semibold text-white">Rs. {subtotal}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Delivery Charges</span>
                <span className="font-semibold text-emerald-400">
                  {deliveryFee === 0 ? 'FREE' : `Rs. ${deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between text-sm sm:text-base font-black text-white pt-2 border-t border-white/10">
                <span>Grand Total</span>
                <span className="text-amber-400 font-['Outfit',sans-serif]">
                  Rs. {grandTotal}
                </span>
              </div>
            </div>

            {/* Submit & Generate WhatsApp Slip Button (NO ugly phone text, clean official WhatsApp Brand Icon) */}
            <button
              type="button"
              onClick={handleSubmitOrder}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-emerald-600/30 active:scale-[0.98] transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              {/* WhatsApp Authentic SVG Icon */}
              <svg
                className="w-5 h-5 fill-current shrink-0"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.97.53 1.764.819 2.796.819 3.18 0 5.767-2.587 5.767-5.766.001-3.18-2.585-5.766-5.767-5.766zm10.156 5.766c0 5.617-4.57 10.187-10.187 10.187-1.745 0-3.383-.443-4.821-1.222l-5.679 1.488 1.516-5.541c-.886-1.516-1.391-3.277-1.391-5.152 0-5.617 4.57-10.188 10.187-10.188 5.617 0 10.187 4.571 10.187 10.188zm-3.992 4.148c-.22-.11-1.303-.643-1.505-.716-.202-.074-.35-.11-.497.11-.148.221-.57.716-.7862-.128.147-.257.165-.477.055-.22-.11-.93-.343-1.771-1.093-.654-.584-1.096-1.305-1.224-1.526-.129-.221-.014-.34.096-.45.099-.099.22-.257.33-.385.11-.129.147-.221.22-.368.074-.147.037-.276-.018-.386-.055-.11-.497-1.197-.681-1.639-.179-.431-.36-.372-.497-.379-.129-.007-.276-.008-.423-.008s-.386.055-.588.276c-.202.221-.772.754-.772 1.839 0 1.085.79 2.133.9 2.28.11.147 1.554 2.373 3.766 3.327.526.227.937.363 1.258.465.529.168 1.01.144 1.391.087.424-.063 1.303-.533 1.487-1.048.184-.515.184-.956.129-1.048-.055-.092-.202-.147-.423-.257z"/>
              </svg>
              <span>Generate Slip & Order on WhatsApp</span>
            </button>
            <p className="text-[10px] text-center text-slate-400">
              ⚡ Digital receipt slip will be created & sent directly to BUN & DOUGH
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
