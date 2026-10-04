import React, { useEffect } from 'react';
import { CustomerOrderData } from '../types';
import { 
  Printer, X, ArrowLeft, 
  MapPin, Clock, FileText, Check, Sparkles, Send
} from 'lucide-react';
import { LottieLight } from 'lottie-react';
import { successLottieData } from '../utils/successAnimationData';
import { openWhatsAppOrder } from '../utils/whatsapp';
import { RESTAURANT_INFO } from '../data/menu';

interface OrderSlipModalProps {
  order: CustomerOrderData | null;
  onClose: () => void;
}

export const OrderSlipModal: React.FC<OrderSlipModalProps> = ({ order, onClose }) => {
  useEffect(() => {
    // Automatically trigger WhatsApp pre-filled order slip on mount after slight delay for visual reward
    if (order) {
      const timer = setTimeout(() => {
        openWhatsAppOrder(order);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [order]);

  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleSendWhatsAppAgain = () => {
    openWhatsAppOrder(order);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg bg-[#141720] border border-white/10 rounded-3xl shadow-2xl overflow-hidden my-auto text-white">
        {/* Top Rewarding Celebration Banner with Lottie Animation */}
        <div className="relative overflow-hidden bg-gradient-to-b from-emerald-950/80 via-[#141720] to-[#141720] pt-6 pb-4 px-6 text-center border-b border-white/5">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors"
            aria-label="Close slip modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Lottie-based Success Celebration Animation */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto -mt-2">
            <LottieLight
              src={successLottieData}
              loop={false}
              autoplay={true}
              className="w-full h-full"
            />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-black uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Order Slip Successfully Generated!</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white font-['Outfit',sans-serif] leading-tight">
            Order #{order.orderId} Confirmed
          </h3>

          <p className="text-xs text-slate-300 mt-1 max-w-sm mx-auto">
            Opening WhatsApp to send your order slip directly to <strong className="text-emerald-400">BUN & DOUGH</strong>...
          </p>
        </div>

        {/* The Printable Order Slip (Styled like a modern restaurant paper receipt) */}
        <div className="p-4 sm:p-6 space-y-4 max-h-[58vh] overflow-y-auto no-scrollbar" id="printable-receipt">
          {/* Slip Container */}
          <div className="bg-[#1b1f2b] p-5 sm:p-6 rounded-2xl border border-white/10 text-slate-200 shadow-inner font-mono text-xs sm:text-sm">
            {/* Restaurant Brand Header */}
            <div className="text-center pb-4 border-b border-dashed border-white/20">
              <h2 className="text-xl sm:text-2xl font-black text-white font-['Outfit',sans-serif] tracking-wider">
                BUN & DOUGH
              </h2>
              <p className="text-[11px] text-amber-400 font-sans uppercase font-bold tracking-widest mt-0.5">
                {RESTAURANT_INFO.pillars}
              </p>
              <p className="text-[11px] text-slate-400 font-sans mt-1">
                {RESTAURANT_INFO.address}
              </p>
              <div className="inline-block mt-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-sans font-extrabold text-[10px] tracking-wider uppercase">
                Official Digital Order Receipt
              </div>
            </div>

            {/* Slip Meta details */}
            <div className="py-3 border-b border-dashed border-white/20 grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-slate-400">Order ID:</span>{' '}
                <strong className="text-white">#{order.orderId}</strong>
              </div>
              <div className="text-right">
                <span className="text-slate-400">Date:</span>{' '}
                <span className="text-white">{order.createdAt}</span>
              </div>
              <div>
                <span className="text-slate-400">Customer:</span>{' '}
                <strong className="text-white">{order.customerName}</strong>
              </div>
              <div className="text-right">
                <span className="text-slate-400">Phone:</span>{' '}
                <span className="text-white">{order.customerPhone}</span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-400">Order Type:</span>{' '}
                <span className="text-amber-400 font-bold uppercase">
                  {order.deliveryType === 'delivery' ? 'Home Delivery' : 'Self Pickup / Takeaway'}
                </span>
              </div>
              {order.deliveryType === 'delivery' && (
                <div className="col-span-2 text-[11px] text-slate-300 bg-white/5 p-2 rounded-lg mt-1 font-sans">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Delivery Address:</span>
                  {order.address}
                </div>
              )}
              {order.notes && (
                <div className="col-span-2 text-[11px] text-amber-300/90 bg-amber-500/10 p-2 rounded-lg font-sans">
                  <span className="text-amber-400 block text-[10px] uppercase font-bold">Special Instructions:</span>
                  {order.notes}
                </div>
              )}
            </div>

            {/* Itemized Table */}
            <div className="py-3 border-b border-dashed border-white/20 space-y-2">
              <div className="flex justify-between font-bold text-white text-[11px] uppercase pb-1 border-b border-white/10">
                <span>Item & Specifications</span>
                <span>Amount</span>
              </div>

              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start gap-2 py-1">
                  <div className="min-w-0">
                    <div className="font-bold text-white leading-tight">
                      {item.quantity}x {item.name}
                    </div>
                    {item.selectedVariant && (
                      <div className="text-[10px] text-amber-400 font-sans">
                        Size: {item.selectedVariant.label}
                      </div>
                    )}
                    {item.selectedTopping && (
                      <div className="text-[10px] text-amber-300 font-sans">
                        + {item.selectedTopping.name}
                      </div>
                    )}
                    <div className="text-[10px] text-slate-400 font-sans">
                      Rs. {item.unitPrice} each
                    </div>
                  </div>
                  <div className="text-right font-extrabold text-white shrink-0">
                    Rs. {item.unitPrice * item.quantity}
                  </div>
                </div>
              ))}
            </div>

            {/* Financial Totals */}
            <div className="pt-3 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal:</span>
                <span className="font-semibold text-white">Rs. {order.subtotal}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Delivery Fee:</span>
                <span className="font-semibold text-emerald-400">
                  {order.deliveryFee === 0 ? 'FREE (Jinnah Garden)' : `Rs. ${order.deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-black text-amber-400 pt-2 border-t border-white/20 font-sans">
                <span>TOTAL PAYABLE:</span>
                <span>Rs. {order.grandTotal}</span>
              </div>
            </div>

            {/* Footer note inside slip */}
            <div className="text-center pt-4 mt-3 border-t border-dashed border-white/20 text-[11px] text-slate-400 font-sans">
              <p>Thank you for ordering with BUN & DOUGH!</p>
              <p className="text-[10px] text-slate-500 mt-0.5">
                Estimated Delivery / Prep Time: 30 - 45 Minutes
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="p-4 sm:p-5 bg-[#171b26] border-t border-white/10 flex flex-col sm:flex-row items-center gap-2.5">
          {/* Send via WhatsApp (with authentic WhatsApp brand SVG) */}
          <button
            type="button"
            onClick={handleSendWhatsAppAgain}
            className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
          >
            <svg
              className="w-4 h-4 fill-current shrink-0"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.97.53 1.764.819 2.796.819 3.18 0 5.767-2.587 5.767-5.766.001-3.18-2.585-5.766-5.767-5.766zm10.156 5.766c0 5.617-4.57 10.187-10.187 10.187-1.745 0-3.383-.443-4.821-1.222l-5.679 1.488 1.516-5.541c-.886-1.516-1.391-3.277-1.391-5.152 0-5.617 4.57-10.188 10.187-10.188 5.617 0 10.187 4.571 10.187 10.188zm-3.992 4.148c-.22-.11-1.303-.643-1.505-.716-.202-.074-.35-.11-.497.11-.148.221-.57.716-.7862-.128.147-.257.165-.477.055-.22-.11-.93-.343-1.771-1.093-.654-.584-1.096-1.305-1.224-1.526-.129-.221-.014-.34.096-.45.099-.099.22-.257.33-.385.11-.129.147-.221.22-.368.074-.147.037-.276-.018-.386-.055-.11-.497-1.197-.681-1.639-.179-.431-.36-.372-.497-.379-.129-.007-.276-.008-.423-.008s-.386.055-.588.276c-.202.221-.772.754-.772 1.839 0 1.085.79 2.133.9 2.28.11.147 1.554 2.373 3.766 3.327.526.227.937.363 1.258.465.529.168 1.01.144 1.391.087.424-.063 1.303-.533 1.487-1.048.184-.515.184-.956.129-1.048-.055-.092-.202-.147-.423-.257z"/>
            </svg>
            <span>Resend WhatsApp Slip</span>
          </button>

          {/* Print / Save Receipt */}
          <button
            type="button"
            onClick={handlePrint}
            className="w-full sm:w-auto py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Slip</span>
          </button>

          {/* Close & Continue */}
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs sm:text-sm transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
