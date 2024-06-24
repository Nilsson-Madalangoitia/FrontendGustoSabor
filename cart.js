class CartItem {
    constructor(menu, quantity) {
        this.menu = menu;
        this.quantity = quantity;
        this.price = menu.price;
        this.subtotal = this.price * this.quantity;
    }

    updateSubtotal() {
        this.subtotal = this.price * this.quantity;
    }
}

class Cart {
    constructor() {
        this.items = this.loadCartFromLocalStorage();
        this.cartIcon = document.getElementById('cart-icon');
        this.cartElement = document.getElementById('cart');
        this.closeBtn = document.querySelector('.close-btn');
        this.checkoutBtn = document.querySelector('.checkout-btn');
        this.addEventListeners();
        this.updateCart();
    }

    addEventListeners() {
        this.cartIcon.addEventListener('click', this.openCart.bind(this));
        this.closeBtn.addEventListener('click', this.closeCart.bind(this));
        this.checkoutBtn.addEventListener('click', this.processCheckout.bind(this));
    }

    openCart() {
        this.cartElement.classList.add('active');
    }

    closeCart() {
        this.cartElement.classList.remove('active');
    }

    processCheckout() {
        // Lógica para procesar el pago
        console.log('Procesando pago...');
    }

    addItem(menu) {
        const existingItem = this.items.find(item => item.menu.id === menu.id);
        if (existingItem) {
            existingItem.quantity++;
            existingItem.updateSubtotal();
        } else {
            this.items.push(new CartItem(menu, 1));
        }
        this.updateCart();
    }
    
    removeItem(menuId) {
        const itemIndex = this.items.findIndex(item => item.menu.id === menuId);
        if (itemIndex !== -1) {
            const item = this.items[itemIndex];
            if (item.quantity > 1) {
                item.quantity--;
                item.updateSubtotal();
            } else {
                this.items.splice(itemIndex, 1);
            }
            this.updateCart();
        }
    }
    
    updateCart() {
        const cartItemsElement = document.querySelector('.cart-items');
        cartItemsElement.innerHTML = '';
    
        this.items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.menu.image}" alt="${item.menu.name}">
                </div>
                <div class="cart-item-details">
                    <span>${item.menu.name}</span>
                    <span>$${item.price.toFixed(2)}</span>
                    <div class="quantity">
                        <button class="minus-btn" data-id="${item.menu.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="plus-btn" data-id="${item.menu.id}">+</button>
                    </div>
                    <span>Subtotal: $${item.subtotal.toFixed(2)}</span>
                </div>
            `;
            cartItemsElement.appendChild(itemElement);
        });
    
        const total = this.items.reduce((acc, item) => acc + item.subtotal, 0);
        const totalElement = document.querySelector('.total');
        totalElement.textContent = `Total: $${total.toFixed(2)}`;
        
        // Guardar el carrito en localStorage
        this.saveCartToLocalStorage();
    }
    
    saveCartToLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }
    
    loadCartFromLocalStorage() {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        return cartItems.map(item => new CartItem(item.menu, item.quantity));
    }
}

const cart = new Cart();
