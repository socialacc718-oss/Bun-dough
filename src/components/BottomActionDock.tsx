import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menu';

export const BottomActionDock: React.FC = () => {
  return (
    <aside aria-label="Quick contact actions" className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-center gap-2.5">
      {/* WhatsApp Circular Button (Official Green) */}
      <a
        href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        title="Chat / Order on WhatsApp"
        className="group relative w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-xl shadow-green-500/30 hover:scale-110 active:scale-90 transition-all duration-200 cursor-pointer"
        aria-label="WhatsApp Order"
      >
        <svg
          className="w-6 h-6 fill-white"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.97.53 1.764.819 2.796.819 3.18 0 5.767-2.587 5.767-5.766.001-3.18-2.585-5.766-5.767-5.766zm10.156 5.766c0 5.617-4.57 10.187-10.187 10.187-1.745 0-3.383-.443-4.821-1.222l-5.679 1.488 1.516-5.541c-.886-1.516-1.391-3.277-1.391-5.152 0-5.617 4.57-10.188 10.187-10.188 5.617 0 10.187 4.571 10.187 10.188zm-3.992 4.148c-.22-.11-1.303-.643-1.505-.716-.202-.074-.35-.11-.497.11-.148.221-.57.716-.7862-.128.147-.257.165-.477.055-.22-.11-.93-.343-1.771-1.093-.654-.584-1.096-1.305-1.224-1.526-.129-.221-.014-.34.096-.45.099-.099.22-.257.33-.385.11-.129.147-.221.22-.368.074-.147.037-.276-.018-.386-.055-.11-.497-1.197-.681-1.639-.179-.431-.36-.372-.497-.379-.129-.007-.276-.008-.423-.008s-.386.055-.588.276c-.202.221-.772.754-.772 1.839 0 1.085.79 2.133.9 2.28.11.147 1.554 2.373 3.766 3.327.526.227.937.363 1.258.465.529.168 1.01.144 1.391.087.424-.063 1.303-.533 1.487-1.048.184-.515.184-.956.129-1.048-.055-.092-.202-.147-.423-.257z"/>
        </svg>
      </a>

      {/* Direct Call Circular Button (Official Red as in Screenshot) */}
      <a
        href={`tel:${RESTAURANT_INFO.phone.replace(/\s+/g, '')}`}
        title="Direct Phone Call"
        className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-xl shadow-red-600/30 hover:scale-110 active:scale-90 transition-all duration-200 cursor-pointer"
        aria-label="Direct Phone Call"
      >
        <Phone className="w-5 h-5 fill-white" />
      </a>
    </aside>
  );
};
