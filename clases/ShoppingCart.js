import CartItem from './CartItem.js';

export default class ShoppingCart {
  constructor() {
    this.items = [];
  }

  addItem(menu, quantity) {
    const existingItem = this.items.find(item => item.menu.id === menu.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push(new CartItem(menu, quantity));
    }
  }

  removeItem(menuId) {
    this.items = this.items.filter(item => item.menu.id !== menuId);
  }

  getTotalPrice() {
    return this.items.reduce((total, item) => total + item.getTotal(), 0);
  }
}