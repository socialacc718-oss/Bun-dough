import React from 'react';
import { MapPin, Clock, Bike, ShieldCheck, Heart } from 'lucide-react';
import { RESTAURANT_INFO, CATEGORIES } from '../data/menu';

interface FooterProps {
  onSelectCategory: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  return (
    <footer className="bg-[#0b0c10] text-slate-400 border-t border-white/5 pt-14 pb-24 sm:pb-12 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-12 border-b border-white/5">
          {/* Brand & Story */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center p-0.5">
                <div className="w-full h-full bg-[#12141c] rounded-[10px] flex items-center justify-center">
                  <span className="font-extrabold text-amber-400 text-sm">B&D</span>
                </div>
              </div>
              <span className="text-xl font-black text-white font-['Outfit',sans-serif] tracking-tight">
                BUN <span className="text-amber-500">&</span> DOUGH
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Respect Your Hunger. Handcrafting the juiciest Smash Burgers, stone-baked Pizzas,
              crispy Injected Broast, sizzling Desi Karahi & wholesome family meals.
            </p>

            <div className="flex items-center gap-3 pt-1">
              {/* WhatsApp Icon Button (Clean brand icon without bare phone text) */}
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Connect on WhatsApp"
                className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-white flex items-center justify-center transition-all shadow-sm"
                aria-label="WhatsApp"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.97.53 1.764.819 2.796.819 3.18 0 5.767-2.587 5.767-5.766.001-3.18-2.585-5.766-5.767-5.766zm10.156 5.766c0 5.617-4.57 10.187-10.187 10.187-1.745 0-3.383-.443-4.821-1.222l-5.679 1.488 1.516-5.541c-.886-1.516-1.391-3.277-1.391-5.152 0-5.617 4.57-10.188 10.187-10.188 5.617 0 10.187 4.571 10.187 10.188zm-3.992 4.148c-.22-.11-1.303-.643-1.505-.716-.202-.074-.35-.11-.497.11-.148.221-.57.716-.7862-.128.147-.257.165-.477.055-.22-.11-.93-.343-1.771-1.093-.654-.584-1.096-1.305-1.224-1.526-.129-.221-.014-.34.096-.45.099-.099.22-.257.33-.385.11-.129.147-.221.22-.368.074-.147.037-.276-.018-.386-.055-.11-.497-1.197-.681-1.639-.179-.431-.36-.372-.497-.379-.129-.007-.276-.008-.423-.008s-.386.055-.588.276c-.202.221-.772.754-.772 1.839 0 1.085.79 2.133.9 2.28.11.147 1.554 2.373 3.766 3.327.526.227.937.363 1.258.465.529.168 1.01.144 1.391.087.424-.063 1.303-.533 1.487-1.048.184-.515.184-.956.129-1.048-.055-.092-.202-.147-.423-.257z"/>
                </svg>
              </a>

              {/* Instagram / Facebook tag */}
              <div className="text-xs text-slate-400 font-mono">
                {RESTAURANT_INFO.socialHandle}
              </div>
            </div>
          </div>

          {/* Quick Categories navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 font-['Outfit',sans-serif]">
              Popular Categories
            </h4>
            <ul className="space-y-1.5 text-xs">
              {CATEGORIES.slice(0, 7).map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => {
                      onSelectCategory(c.id);
                      window.scrollTo({ top: 380, behavior: 'smooth' });
                    }}
                    className="hover:text-amber-400 transition-colors text-left"
                  >
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 font-['Outfit',sans-serif]">
              More Delicious Food
            </h4>
            <ul className="space-y-1.5 text-xs">
              {CATEGORIES.slice(7).map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => {
                      onSelectCategory(c.id);
                      window.scrollTo({ top: 380, behavior: 'smooth' });
                    }}
                    className="hover:text-amber-400 transition-colors text-left"
                  >
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Location & Timings */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 font-['Outfit',sans-serif]">
              Store & Delivery
            </h4>

            <div className="flex items-start gap-2.5 text-xs">
              <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <span className="text-white block font-medium">BUN & DOUGH Islamabad</span>
                <span className="text-slate-400 block mt-0.5">{RESTAURANT_INFO.address}</span>
                <a
                  href={RESTAURANT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-1 text-[11px] text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-2"
                >
                  View on Google Maps →
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-xs pt-1">
              <Clock className="w-4 h-4 text-amber-500 shrink-0" />
              <div>
                <span className="text-white font-medium">Operational Timings</span>
                <p className="text-slate-400">{RESTAURANT_INFO.timings}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-xs pt-1">
              <Bike className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <span className="text-emerald-400 font-medium">FREE Home Delivery</span>
                <p className="text-slate-400">{RESTAURANT_INFO.deliveryNote}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} BUN & DOUGH. All Rights Reserved. Respect Your Hunger.
          </div>
          <div className="flex items-center gap-1 text-[11px]">
            <span>Crafted with</span>
            <Heart className="w-3 h-3 text-amber-500 fill-amber-500 inline" />
            <span>for Food Lovers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
