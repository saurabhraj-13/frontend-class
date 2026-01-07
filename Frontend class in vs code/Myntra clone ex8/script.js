/* script.js
   Shared logic: manage cart using localStorage, update badge, helpers
*/

// localStorage key
const CART_KEY = 'myntra_clone_cart_v1';

// helpers
function getCart(){
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
  } catch(e){ return []; }
}
function saveCart(cart){ localStorage.setItem(CART_KEY, JSON.stringify(cart)); updateCartBadge(); }
function updateCartBadge(){
  const badge = document.getElementById('cart-count-badge');
  if(!badge) return;
  const cart = getCart();
  const count = cart.reduce((s,i)=> s + (i.qty||1), 0);
  badge.innerText = count;
}

// add product {id, title, price, image}
function addToCart(product){
  const cart = getCart();
  const found = cart.find(i => i.id === product.id);
  if(found){ found.qty = (found.qty||1) + 1; }
  else { cart.push({ ...product, qty: 1 }); }
  saveCart(cart);
  // small visual toast (simple)
  showToast(`${product.title} added to cart`);
}

// simple toast
function showToast(message){
  let el = document.getElementById('micro-toast');
  if(!el){
    el = document.createElement('div');
    el.id = 'micro-toast';
    el.style.cssText = 'position:fixed;right:20px;bottom:20px;background:#111;color:#fff;padding:10px 14px;border-radius:10px;box-shadow:0 10px 30px rgba(0,0,0,0.2);z-index:9999;';
    document.body.appendChild(el);
  }
  el.innerText = message;
  el.style.opacity = '1';
  setTimeout(()=> el.style.opacity = '0', 1400);
}

// Expose some functions globally so other pages can call them
window.myntraCart = { getCart, saveCart, addToCart, updateCartBadge, showToast };

// Immediately update badge on load
document.addEventListener('DOMContentLoaded', updateCartBadge);
