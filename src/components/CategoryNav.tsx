import React, { useRef } from 'react';
import { CATEGORIES } from '../data/menu';
import { CategoryId } from '../types';
import { 
  Percent, Flame, Sandwich, Beef, Drumstick, 
  Pizza, Soup, Utensils, CookingPot, Salad, Cake,
  ChevronLeft, ChevronRight, Layers
} from 'lucide-react';

interface CategoryNavProps {
  activeCategory: string;
  onSelectCategory: (id: string) => void;
  categoryItemCounts: Record<string, number>;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  activeCategory,
  onSelectCategory,
  categoryItemCounts,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const getCategoryIcon = (id: CategoryId) => {
    switch (id) {
      case 'discounted-deals': return <Percent className="w-4 h-4" />;
      case 'pizza-deals': return <Flame className="w-4 h-4" />;
      case 'burger': return <Sandwich className="w-4 h-4" />;
      case 'grilled-burger': return <Flame className="w-4 h-4" />;
      case 'smash-burger': return <Beef className="w-4 h-4" />;
      case 'wrap-roll': return <Layers className="w-4 h-4" />;
      case 'broast-wings': return <Drumstick className="w-4 h-4" />;
      case 'pizza': return <Pizza className="w-4 h-4" />;
      case 'desi-tarka': return <Soup className="w-4 h-4" />;
      case 'desi-thali': return <Utensils className="w-4 h-4" />;
      case 'fries': return <CookingPot className="w-4 h-4" />;
      case 'sandwich': return <Sandwich className="w-4 h-4" />;
      case 'pasta': return <Salad className="w-4 h-4" />;
      case 'dessert': return <Cake className="w-4 h-4" />;
      default: return <Utensils className="w-4 h-4" />;
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -280 : 280;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-[80px] z-30 bg-[#0f1115]/95 backdrop-blur-md border-b border-white/5 py-3 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative flex items-center">
        {/* Scroll Left Button */}
        <button
          onClick={() => scroll('left')}
          className="hidden md:flex absolute left-2 z-10 p-1.5 rounded-full bg-[#1b1f2a] border border-white/10 text-slate-300 hover:text-white hover:bg-amber-500 shadow-md transition-colors"
          aria-label="Scroll categories left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Scrollable container */}
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth w-full px-1 md:px-8 py-1"
        >
          {/* 'All Items' Tab */}
          <button
            onClick={() => onSelectCategory('all')}
            className={`shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/25 scale-[1.02]'
                : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/5'
            }`}
          >
            <span>All Menu</span>
          </button>

          {CATEGORIES.map((cat) => {
            const count = categoryItemCounts[cat.id] || 0;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-black shadow-lg shadow-orange-500/20 font-bold scale-[1.02]'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/5'
                }`}
              >
                <span className={isActive ? 'text-black' : 'text-amber-400'}>
                  {getCategoryIcon(cat.id)}
                </span>
                <span>{cat.name}</span>
                {count > 0 && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-black/20 text-black font-extrabold'
                        : 'bg-white/10 text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Scroll Right Button */}
        <button
          onClick={() => scroll('right')}
          className="hidden md:flex absolute right-2 z-10 p-1.5 rounded-full bg-[#1b1f2a] border border-white/10 text-slate-300 hover:text-white hover:bg-amber-500 shadow-md transition-colors"
          aria-label="Scroll categories right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
