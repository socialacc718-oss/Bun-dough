import React from 'react';
import { ShoppingBag, MapPin, Sparkles, PhoneCall } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menu';

interface HeaderProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onExploreClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
  onExploreClick,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#0d0f14]/90 backdrop-blur-md border-b border-white/5 transition-all">
      {/* Top micro banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 text-white text-xs font-semibold py-1.5 px-4 text-center tracking-wide flex items-center justify-center gap-2 shadow-sm">
        <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-200" />
        <span>⚡ <strong>FREE DELIVERY</strong> in Jinnah Garden, Islamabad | Respect Your Hunger</span>
        <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-200 hidden sm:inline" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Logo / Brand Name */}
        <div className="flex items-center gap-3 cursor-pointer group" onClick={onExploreClick}>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 p-0.5 shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform flex items-center justify-center">
            <div className="w-full h-full bg-[#12141c] rounded-[14px] flex items-center justify-center">
              <span className="font-extrabold text-lg tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                B&D
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white font-['Outfit',sans-serif]">
                BUN <span className="text-amber-500">&</span> DOUGH
              </h1>
            </div>
            <p className="text-[11px] text-amber-400/80 font-medium tracking-wider uppercase hidden sm:block">
              {RESTAURANT_INFO.tagline} · {RESTAURANT_INFO.pillars}
            </p>
          </div>
        </div>

        {/* Center / Location Quick Link */}
        <a
          href={RESTAURANT_INFO.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Open Location in Google Maps"
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-amber-500/40 text-slate-300 hover:text-white transition-all text-xs"
        >
          <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          <span className="truncate max-w-[200px] lg:max-w-xs">
            Jinnah Garden, Islamabad
          </span>
          <span className="text-[10px] bg-amber-500/20 text-amber-400 font-semibold px-1.5 py-0.5 rounded-full">
            Map
          </span>
        </a>

        {/* Right Action Icons: WhatsApp Icon & Cart Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* WhatsApp Direct Icon (No ugly text, clean WhatsApp Brand Icon) */}
          <a
            href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Chat & Order directly on WhatsApp"
            className="group relative p-2.5 sm:p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all shadow-md shadow-emerald-500/10 active:scale-95 flex items-center justify-center"
            aria-label="WhatsApp Contact"
          >
            {/* Authentic WhatsApp SVG Logo */}
            <svg
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.97.53 1.764.819 2.796.819 3.18 0 5.767-2.587 5.767-5.766.001-3.18-2.585-5.766-5.767-5.766zm10.156 5.766c0 5.617-4.57 10.187-10.187 10.187-1.745 0-3.383-.443-4.821-1.222l-5.679 1.488 1.516-5.541c-.886-1.516-1.391-3.277-1.391-5.152 0-5.617 4.57-10.188 10.187-10.188 5.617 0 10.187 4.571 10.187 10.188zm-3.992 4.148c-.22-.11-1.303-.643-1.505-.716-.202-.074-.35-.11-.497.11-.148.221-.57.716-.7 862-.128.147-.257.165-.477.055-.22-.11-.93-.343-1.771-1.093-.654-.584-1.096-1.305-1.224-1.526-.129-.221-.014-.34.096-.45.099-.099.22-.257.33-.385.11-.129.147-.221.22-.368.074-.147.037-.276-.018-.386-.055-.11-.497-1.197-.681-1.639-.179-.431-.36-.372-.497-.379-.129-.007-.276-.008-.423-.008s-.386.055-.588.276c-.202.221-.772.754-.772 1.839 0 1.085.79 2.133.9 2.28.11.147 1.554 2.373 3.766 3.327.526.227.937.363 1.258.465.529.168 1.01.144 1.391.087.424-.063 1.303-.533 1.487-1.048.184-.515.184-.956.129-1.048-.055-.092-.202-.147-.423-.257z"/>
            </svg>
            <span className="sr-only">WhatsApp</span>
          </a>

          {/* Cart Floating / Sticky Trigger Button */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold shadow-lg shadow-orange-500/25 active:scale-95 transition-all cursor-pointer"
            aria-label="View Shopping Cart"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#12141c] animate-bounce">
                  {cartCount}
                </span>
              )}
            </div>
            <div className="text-left hidden xs:block">
              <div className="text-[10px] uppercase font-bold text-amber-100 tracking-wider leading-none">
                Cart
              </div>
              <div className="text-xs sm:text-sm font-extrabold leading-none mt-0.5">
                Rs. {cartTotal}
              </div>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
