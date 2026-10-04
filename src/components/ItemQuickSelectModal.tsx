import React, { useState } from 'react';
import { MenuItem, VariantOption } from '../types';
import { X, Plus, Minus, Check, Sparkles } from 'lucide-react';
import { PIZZA_EXTRA_TOPPINGS } from '../data/menu';

interface ItemQuickSelectModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (
    item: MenuItem,
    selectedVariant?: VariantOption,
    selectedTopping?: { name: string; price: number },
    quantity?: number,
    notes?: string
  ) => void;
}

export const ItemQuickSelectModal: React.FC<ItemQuickSelectModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  if (!item) return null;

  const [selectedVariant, setSelectedVariant] = useState<VariantOption | undefined>(
    item.variants && item.variants.length > 0 ? item.variants[0] : undefined
  );
  const [addExtraTopping, setAddExtraTopping] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [specialNote, setSpecialNote] = useState('');
  const [justAdded, setJustAdded] = useState(false);

  // Price calculations
  const basePrice = selectedVariant ? selectedVariant.price : (item.price || 0);
  const toppingCost =
    item.hasExtraToppings && addExtraTopping && selectedVariant
      ? PIZZA_EXTRA_TOPPINGS[selectedVariant.label] || 150
      : 0;

  const currentUnitPrice = basePrice + toppingCost;

  const handleConfirm = () => {
    const toppingObj =
      addExtraTopping && toppingCost > 0
        ? { name: 'Extra Cheese & Toppings', price: toppingCost }
        : undefined;

    onAddToCart(item, selectedVariant, toppingObj, quantity, specialNote);

    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="fixed inset-0" 
        onClick={onClose} 
      />

      <div className="relative w-full sm:max-w-md bg-[#161922] border-t sm:border border-white/10 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden text-white z-10 max-h-[90vh] flex flex-col">
        {/* Header with image */}
        <div className="relative h-44 w-full bg-[#11131a] overflow-hidden shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#161922] via-[#161922]/40 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-white/80 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {item.badge && (
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-red-600 text-white text-[11px] font-black uppercase tracking-wider shadow-md">
              {item.badge}
            </div>
          )}

          <div className="absolute bottom-3 left-4 right-4">
            <h3 className="text-lg font-black text-white font-['Outfit',sans-serif] leading-tight">
              {item.name}
            </h3>
            {item.description && (
              <p className="text-xs text-slate-300 line-clamp-1 mt-0.5">
                {item.description}
              </p>
            )}
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 no-scrollbar">
          {/* Size / Variant options */}
          {item.variants && item.variants.length > 0 && (
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Choose Size / Portion
              </div>
              <div className="grid grid-cols-2 gap-2">
                {item.variants.map((v) => {
                  const isSelected = selectedVariant?.label === v.label;
                  return (
                    <button
                      key={v.label}
                      type="button"
                      onClick={() => setSelectedVariant(v)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-red-600/15 border-red-500 text-white shadow-md'
                          : 'bg-[#1b1f2c] border-white/5 text-slate-300 hover:border-white/20'
                      }`}
                    >
                      <div className="text-xs font-bold truncate">{v.label}</div>
                      <div className={`text-xs mt-0.5 font-black font-['Outfit'] ${isSelected ? 'text-red-400' : 'text-slate-400'}`}>
                        Rs {v.price}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Extra Toppings for Pizza */}
          {item.hasExtraToppings && selectedVariant && (
            <label className="flex items-center justify-between p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 cursor-pointer text-xs">
              <div>
                <span className="font-bold text-amber-200 block">
                  + Extra Toppings ({selectedVariant.label})
                </span>
                <span className="text-[11px] text-amber-300/80">
                  Extra mozzarella cheese & delicious toppings
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-bold">
                  +Rs {PIZZA_EXTRA_TOPPINGS[selectedVariant.label] || 150}
                </span>
                <input
                  type="checkbox"
                  checked={addExtraTopping}
                  onChange={(e) => setAddExtraTopping(e.target.checked)}
                  className="rounded text-red-600 focus:ring-red-500 w-4 h-4 bg-transparent border-amber-500/40"
                />
              </div>
            </label>
          )}

          {/* Special Cooking Note */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Cooking Note (Optional)
            </label>
            <input
              type="text"
              value={specialNote}
              onChange={(e) => setSpecialNote(e.target.value)}
              placeholder="e.g. Extra spicy, no mayo, crispy..."
              className="w-full bg-[#1b1f2c] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
            />
          </div>

          {/* Quantity selector */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Quantity
            </span>
            <div className="flex items-center bg-[#11131a] rounded-xl border border-white/10 p-1">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white rounded-lg hover:bg-white/5"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center text-sm font-bold text-white">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white rounded-lg hover:bg-white/5"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer with Add to Cart Button */}
        <div className="p-4 bg-[#141720] border-t border-white/10 shrink-0">
          <button
            type="button"
            onClick={handleConfirm}
            className={`w-full py-3.5 px-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer ${
              justAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-red-600 hover:bg-red-500 text-white shadow-red-600/30 active:scale-[0.98]'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-5 h-5 stroke-[3]" />
                <span>Added to Order!</span>
              </>
            ) : (
              <>
                <Plus className="w-5 h-5 stroke-[3]" />
                <span>Add to Cart · Rs {currentUnitPrice * quantity}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
