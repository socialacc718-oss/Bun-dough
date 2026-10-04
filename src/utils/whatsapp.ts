import { CustomerOrderData } from '../types';
import { RESTAURANT_INFO } from '../data/menu';

export function formatWhatsAppMessage(order: CustomerOrderData): string {
  const lineSeparator = '━━━━━━━━━━━━━━━━━━━━━━';
  
  const itemsText = order.items
    .map((item, index) => {
      const variantText = item.selectedVariant ? ` (${item.selectedVariant.label})` : '';
      const toppingText = item.selectedTopping ? ` + Extra Topping: ${item.selectedTopping.name} (Rs. ${item.selectedTopping.price})` : '';
      const notesText = item.itemNotes ? `\n   Note: _${item.itemNotes}_` : '';
      return `${index + 1}. *${item.name}*${variantText}${toppingText}\n   Qty: ${item.quantity} x Rs. ${item.unitPrice} = *Rs. ${item.unitPrice * item.quantity}*${notesText}`;
    })
    .join('\n\n');

  const deliveryNotice = order.deliveryType === 'delivery' 
    ? (order.deliveryFee === 0 ? 'FREE (Within Jinnah Garden)' : `Rs. ${order.deliveryFee}`)
    : 'Self Pickup / Takeaway';

  const message = `🍔 *NEW ORDER - BUN & DOUGH* 🍕
${lineSeparator}
📋 *Order ID:* #${order.orderId}
📅 *Date & Time:* ${order.createdAt}
👤 *Customer Name:* ${order.customerName}
📞 *Contact Number:* ${order.customerPhone}
🛵 *Order Type:* ${order.deliveryType === 'delivery' ? 'Home Delivery' : 'Takeaway / Pickup'}
📍 *Delivery Address:* 
${order.address || 'Takeaway at branch'}
${order.notes ? `\n📝 *Special Instructions:* \n${order.notes}` : ''}

${lineSeparator}
🛒 *ORDER ITEMS:*
${itemsText}

${lineSeparator}
💵 *Subtotal:* Rs. ${order.subtotal}
🛵 *Delivery Charges:* ${deliveryNotice}
💰 *TOTAL PAYABLE:* *Rs. ${order.grandTotal}*
${lineSeparator}

📍 *BUN & DOUGH Islamabad*
S/No. G-1 Main Civic Center, Jinnah Center, Jinnah Garden.
Respect Your Hunger! 🔥`;

  return message;
}

export function openWhatsAppOrder(order: CustomerOrderData) {
  const message = formatWhatsAppMessage(order);
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
}
