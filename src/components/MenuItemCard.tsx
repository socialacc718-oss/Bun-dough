import React, { useState } from 'react';
import { MenuItem, VariantOption } from '../types';
import { Plus, Heart, Check } from 'lucide-react';

interface MenuItemCardProps {
  item: MenuItem;
  onSelectForOptions?: (item: MenuItem) => void;
  onQuickAdd: (
    item: MenuItem,
    selectedVariant?: VariantOption,
    selectedTopping?: { name: string; price: number },
    quantity?: number
  ) => void;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  onSelectForOptions,
  onQuickAdd,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  // Default display price
  const displayPrice = item.price
    ? item.price
    : item.variants && item.variants.length > 0
    ? item.variants[0].price
    : 0;

  const handlePlusClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    // If item has variants (e.g. multiple sizes) or pizza toppings, open the quick selection modal
    if ((item.variants && item.variants.length > 1) || item.hasExtraToppings) {
      if (onSelectForOptions) {
        onSelectForOptions(item);
      }
      return;
    }

    // Direct add for single-price items
    const defaultVariant = item.variants && item.variants.length > 0 ? item.variants[0] : undefined;
    onQuickAdd(item, defaultVariant, undefined, 1);

    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
    }, 700);
  };

  const handleCardClick = () => {
    if ((item.variants && item.variants.length > 1) || item.hasExtraToppings) {
      if (onSelectForOptions) {
        onSelectForOptions(item);
      }
    } else {
      onQuickAdd(item, undefined, undefined, 1);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 700);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative flex flex-col bg-[#161922] rounded-3xl border border-white/5 hover:border-red-500/30 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer p-2.5 sm:p-3"
    >
      {/* Top Image Container */}
      <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#11131a]">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Favorite Heart Button (Top Right as in Screenshot) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-2.5 right-2.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/60 sm:bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md active:scale-90 transition-transform cursor-pointer"
          aria-label="Add to favorites"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorite
                ? 'fill-red-500 text-red-500'
                : 'text-slate-400 sm:text-slate-600 hover:text-red-500'
            }`}
          />
        </button>

        {/* Badge if available */}
        {item.badge && (
          <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-lg bg-black/70 backdrop-blur-md text-[9px] sm:text-[10px] font-black uppercase text-amber-400 tracking-wider">
            {item.badge}
          </div>
        )}

        {/* Circular Red Plus Button (Positioned at bottom-right corner of the image as in Screenshot) */}
        <div className="absolute bottom-2.5 right-2.5">
          <button
            type="button"
            onClick={handlePlusClick}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-xl active:scale-85 transition-all duration-200 cursor-pointer ${
              justAdded
                ? 'bg-emerald-600 text-white scale-110'
                : 'bg-red-600 hover:bg-red-500 text-white shadow-red-600/40 hover:scale-105'
            }`}
            aria-label="Add item"
          >
            {justAdded ? (
              <Check className="w-4 h-4 sm:w-5 sm:h-5 stroke-[3] animate-in zoom-in" />
            ) : (
              <Plus className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
            )}
          </button>
        </div>
      </div>

      {/* Item Details below image */}
      <div className="pt-3 px-1 pb-1 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h3 className="text-sm sm:text-base font-black text-white font-['Outfit',sans-serif] group-hover:text-red-400 transition-colors leading-snug truncate">
            {item.name}
          </h3>

          {/* Subtitle / Description / Ingredients in clean uppercase format as in Screenshot */}
          <p className="text-[10px] sm:text-[11px] text-slate-400 uppercase tracking-tight line-clamp-2 mt-1 font-medium leading-relaxed">
            {item.description || item.ingredients?.join(' · ') || 'Fresh & Hot at BUN & DOUGH'}
          </p>
        </div>

        {/* Bottom Price */}
        <div className="mt-2.5 flex items-baseline justify-between">
          <div className="text-sm sm:text-base font-black text-white font-['Outfit',sans-serif]">
            <span className="text-xs text-red-500 font-bold mr-1">Rs</span>
            <span>{displayPrice.toLocaleString()}</span>
            {item.variants && item.variants.length > 1 && (
              <span className="text-[10px] text-slate-400 font-normal ml-1">
                (from)
              </span>
            )}
          </div>

          {item.variants && item.variants.length > 1 && (
            <span className="text-[10px] text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded font-bold">
              {item.variants.length} Sizes
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
