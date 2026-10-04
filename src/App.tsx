import React, { useState, useEffect, useMemo } from 'react';
import { 
  CATEGORIES, 
  MENU_ITEMS, 
  RESTAURANT_INFO 
} from './data/menu';
import { 
  CartItem, 
  CustomerOrderData, 
  MenuItem, 
  VariantOption 
} from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryNav } from './components/CategoryNav';
import { MenuItemCard } from './components/MenuItemCard';
import { ItemQuickSelectModal } from './components/ItemQuickSelectModal';
import { CartDrawer } from './components/CartDrawer';
import { OrderSlipModal } from './components/OrderSlipModal';
import { Footer } from './components/Footer';
import { BottomActionDock } from './components/BottomActionDock';
import { ShoppingBag, ArrowRight, UtensilsCrossed } from 'lucide-react';

export default function App() {
  // Cart state persisted in localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('bun_dough_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [completedOrder, setCompletedOrder] = useState<CustomerOrderData | null>(null);
  
  // Selected item for quick variant modal
  const [quickSelectItem, setQuickSelectItem] = useState<MenuItem | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bun_dough_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  // Total items in cart
  const cartItemCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  // Subtotal in cart
  const cartSubtotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
  }, [cart]);

  // Counts of items per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const item of MENU_ITEMS) {
      counts[item.categoryId] = (counts[item.categoryId] || 0) + 1;
    }
    return counts;
  }, []);

  // Filtered menu items based on category and search query
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category match
      const matchesCategory =
        activeCategory === 'all' || item.categoryId === activeCategory;

      // Search match
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q)) ||
        (item.ingredients && item.ingredients.some((ing) => ing.toLowerCase().includes(q)));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Add Item to Cart
  const handleAddToCart = (
    item: MenuItem,
    selectedVariant?: VariantOption,
    selectedTopping?: { name: string; price: number },
    quantity: number = 1,
    notes?: string
  ) => {
    const unitPrice =
      (selectedVariant ? selectedVariant.price : (item.price || 0)) +
      (selectedTopping ? selectedTopping.price : 0);

    const variantKey = selectedVariant ? selectedVariant.label : 'std';
    const toppingKey = selectedTopping ? selectedTopping.name : 'no-top';
    const cartItemId = `${item.id}-${variantKey}-${toppingKey}`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((ci) => ci.id === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        if (notes) {
          updated[existingIndex].itemNotes = notes;
        }
        return updated;
      } else {
        const newItem: CartItem = {
          id: cartItemId,
          menuItemId: item.id,
          name: item.name,
          category: item.categoryId,
          selectedVariant,
          selectedTopping,
          unitPrice,
          quantity,
          itemNotes: notes,
          image: item.image,
        };
        return [...prevCart, newItem];
      }
    });
  };

  // Update Item Quantity
  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
    } else {
      setCart((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
      );
    }
  };

  // Remove Item
  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Clear Cart
  const handleClearCart = () => {
    setCart([]);
  };

  // Complete Order
  const handleCompleteOrder = (orderData: CustomerOrderData) => {
    setCompletedOrder(orderData);
    setCart([]);
    setIsCartOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0d0f14] text-white flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Header */}
      <Header
        cartCount={cartItemCount}
        cartTotal={cartSubtotal}
        onOpenCart={() => setIsCartOpen(true)}
        onExploreClick={() => {
          setActiveCategory('all');
          setSearchQuery('');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Hero Section */}
      <Hero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSelectCategory={(catId) => {
          setActiveCategory(catId);
          const el = document.getElementById('menu-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Sticky Categories Bar */}
      <div id="menu-section">
        <CategoryNav
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          categoryItemCounts={categoryCounts}
        />
      </div>

      {/* Main Menu Grid Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-3 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Section title & count */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 sm:mb-8 pb-3 border-b border-white/5">
          <div>
            <h2 className="text-xl sm:text-3xl font-black text-white font-['Outfit',sans-serif] tracking-tight">
              {activeCategory === 'all'
                ? 'Full Authentic Menu'
                : CATEGORIES.find((c) => c.id === activeCategory)?.name || 'Menu Items'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              {searchQuery
                ? `Showing search results for "${searchQuery}"`
                : activeCategory === 'all'
                ? 'All freshly prepared burgers, pizzas, broast, desi tarka & combos'
                : CATEGORIES.find((c) => c.id === activeCategory)?.tagline}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Delivering in Jinnah Garden</span>
          </div>
        </div>

        {/* Empty state if search found nothing */}
        {filteredItems.length === 0 ? (
          <div className="py-20 text-center bg-[#141720] rounded-3xl border border-white/5 p-8">
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 text-slate-500">
              <UtensilsCrossed className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">No menu items found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mb-6">
              We couldn't find anything matching "{searchQuery}". Try searching for burgers, pizza, broast, karahi, wings, or check our deals.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="px-5 py-2.5 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-500 transition-colors shadow-lg shadow-red-600/30"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* Exact 2-column mobile layout and 3/4 desktop layout as in User Screenshot */
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {filteredItems.map((item) => (
              <MenuItemCard
                key={item.id}
                item={item}
                onSelectForOptions={(i) => setQuickSelectItem(i)}
                onQuickAdd={(i, variant, topping, qty) =>
                  handleAddToCart(i, variant, topping, qty)
                }
              />
            ))}
          </div>
        )}
      </main>

      {/* Floating Bottom Cart Bar for Mobile (when items are in cart) */}
      {cartItemCount > 0 && (
        <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-[#12151e]/95 backdrop-blur-md border-t border-white/10 p-3 shadow-2xl">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-red-600 to-red-500 text-white font-extrabold flex items-center justify-between shadow-lg shadow-red-600/30 active:scale-[0.99] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-white" />
                <span className="absolute -top-2 -right-2 bg-white text-red-600 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider">
                View Food Cart
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-sm font-black font-['Outfit',sans-serif]">
                Rs {cartSubtotal.toLocaleString()}
              </span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      )}

      {/* Ultra Professional Bottom Action Dock (Clean Green WhatsApp & Red Phone Call icons arranged at the bottom as in Screenshot) */}
      <BottomActionDock />

      {/* Quick Variant & Topping Selection Modal */}
      <ItemQuickSelectModal
        item={quickSelectItem}
        onClose={() => setQuickSelectItem(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Cart Drawer Component (fully responsive & fitted inside screen) */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onCompleteOrder={handleCompleteOrder}
      />

      {/* Order Slip Modal with Lottie Success Celebration, Printable Receipt & WhatsApp Dispatch */}
      <OrderSlipModal
        order={completedOrder}
        onClose={() => setCompletedOrder(null)}
      />

      {/* Footer */}
      <Footer onSelectCategory={setActiveCategory} />
    </div>
  );
}
