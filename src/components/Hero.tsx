import React from 'react';
import { Search, Flame, Sparkles, Clock, Bike, ShieldCheck } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menu';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectCategory: (catId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  onSearchChange,
  onSelectCategory,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-10 sm:pt-14 sm:pb-16 bg-gradient-to-b from-[#12151d] via-[#0d0f14] to-[#0f1115] border-b border-white/5">
      {/* Background ambient lighting glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Subtle Tagline kicker */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-4 sm:mb-6">
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>RESPECT YOUR HUNGER · ISLAMABAD</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight font-['Outfit',sans-serif] leading-[1.1] mb-4">
            Crave the Crunch, <br className="hidden sm:inline" />
            Savor the <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500">BUN & DOUGH</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 font-normal max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed">
            From juicy Smash Burgers and wood-crust loaded Pizzas to crisp Injected Broast,
            hot Desi Karahi & special Thalis. Order online and get your WhatsApp slip instantly!
          </p>

          {/* Search bar inside Hero */}
          <div className="max-w-xl mx-auto mb-6">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search burgers, pizzas, broast, karahi, wings, deals..."
                className="w-full bg-[#1b1f2a] border border-white/10 focus:border-amber-500 text-white placeholder-slate-400 text-sm sm:text-base rounded-2xl pl-12 pr-4 py-3.5 shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/30"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-4 text-xs font-bold text-slate-400 hover:text-white bg-white/10 px-2 py-1 rounded-md"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Key Value Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 max-w-3xl mx-auto text-left">
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-2.5">
              <Bike className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <div className="text-[11px] font-bold text-white leading-tight">Free Delivery</div>
                <div className="text-[10px] text-slate-400 leading-tight">Jinnah Garden</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-2.5">
              <Clock className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <div className="text-[11px] font-bold text-white leading-tight">1:00 PM - 2:00 AM</div>
                <div className="text-[10px] text-slate-400 leading-tight">Open 7 Days a Week</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <div className="text-[11px] font-bold text-white leading-tight">100% Fresh Halal</div>
                <div className="text-[10px] text-slate-400 leading-tight">Pure Quality Ingredients</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <div className="text-[11px] font-bold text-white leading-tight">Instant Slip</div>
                <div className="text-[10px] text-slate-400 leading-tight">Direct WhatsApp Order</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
