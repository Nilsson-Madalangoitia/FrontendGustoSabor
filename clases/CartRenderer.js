// CartRenderer.js
export default class CartRenderer {
    constructor(cartOverlay, cartItems, cartTotalPrice, shoppingCart) {
        this.cartOverlay = cartOverlay;
        this.cartItems = cartItems;
        this.cartTotalPrice = cartTotalPrice;
        this.shoppingCart = shoppingCart;
    }
  
    renderCartItems(items) {
      this.cartItems.innerHTML = '';
  
      items.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
          <p>${item.menu.name} x ${item.quantity}</p>
          <p>$${item.getTotal().toFixed(2)}</p>
        `;
        this.cartItems.appendChild(cartItem);
      });
  
      this.cartTotalPrice.textContent = `$${shoppingCart.getTotalPrice().toFixed(2)}`;
    }
  
    showCart() {
      this.cartOverlay.style.display = 'block';
    }
  
    hideCart() {
      this.cartOverlay.style.display = 'none';
    }
  }