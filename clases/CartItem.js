// CartItem.js
export default class CartItem {
    constructor(menu, quantity) {
      this.menu = menu;
      this.quantity = quantity;
    }
  
    getTotal() {
      return this.menu.price * this.quantity;
    }
  }