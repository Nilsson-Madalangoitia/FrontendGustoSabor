document.addEventListener("DOMContentLoaded", () => {
    const menuManager = new MenuManager();

    const desayunos = [
        new Menu(1, "Desayuno Andino", "Quinua con leche, pan integral con palta, jugo de naranja natural.", 15.00, 'img/desayuno1.jpg'),
        new Menu(2, "Desayuno Costeño", "Tamal, pan con chicharrón, café con leche.", 18.00, "img/desayuno2.jpg"),
        new Menu(3, "Desayuno Energético", "Batido de frutas con avena, tostadas con mermelada de aguaymanto, café negro.", 20.00, "img/desayuno3.jpg")
    ];

    const almuerzos = [
        new Menu(4,"Lomo Saltado", "Jugoso lomo de res salteado con cebolla, tomate, ají amarillo y salsa de soya, acompañado de arroz blanco y papas fritas.", 25.00, "img/almuerzo1.jpg"),
        new Menu(5,"Ceviche Mixto", "Fresco pescado y mariscos marinados en jugo de limón, ají limo, cebolla roja, acompañado de camote y choclo.", 30.00, "img/almuerzo2.jpg"),
        new Menu(6,"Ají de Gallina", "Delicioso guiso de gallina deshilachada en una salsa cremosa de ají amarillo, nueces y queso parmesano, servido con arroz blanco y papas.",  22.00, "img/almuerzo3.jpg")
    ];

    const buffets = [
        new Menu(7,"Buffet Criollo", "Una variedad de platos tradicionales peruanos como anticuchos, causa limeña, ají de gallina, arroz con pollo, seco de cordero y postres como mazamorra morada y arroz con leche.", 60.00, "img/buffet1.jpg"),
        new Menu(8,"Buffet Marino", "Una selección de los mejores platos de mariscos, incluyendo ceviche, tiradito, arroz con mariscos, parihuela y picante de mariscos.", 65.00, "img/buffet2.jpg"),
        new Menu(9,"Buffet Andino", "Un surtido de platos de la sierra peruana, como cuy chactado, rocoto relleno, adobo arequipeño, quinua atamalada y postres como queso helado y chicha morada.", 60.00, "img/buffet3.jpg")
    ];

    const cocteles = [
        new Menu(10,"Pisco Sour", "Refrescante cóctel a base de pisco, jugo de limón, ginger ale y un toque de amargo de angostura.", 15.00, "img/coctel1.jpg"),
        new Menu(11,"Chilcano", "Refrescante cóctel a base de pisco, jugo de limón, ginger ale y un toque de amargo de angostura.", 15.00, "img/colctel2.jpg"),
        new Menu(12,"Maracuyá Sour", "Delicioso cóctel a base de pisco, jugo de maracuyá, jarabe de goma, clara de huevo y un toque de amargo de angostura.", 15.00, "img/coctel3.jpg")
    ];

    menuManager.addCategory(new MenuCategory("desayunos", desayunos));
    menuManager.addCategory(new MenuCategory("almuerzos", almuerzos));
    menuManager.addCategory(new MenuCategory("buffets", buffets));
    menuManager.addCategory(new MenuCategory("cocteles", cocteles));

    function loadMenuCards(category) {
        const menuCards = document.querySelector(".menu-cards");
        menuCards.innerHTML = "";

        const menuItems = menuManager.getMenusByCategory(category).slice(0, 3);

        menuItems.forEach(menu => {
            const card = document.createElement("div");
            card.classList.add("menu-card");
            card.innerHTML = `
                <img src="${menu.image}" alt="${menu.name}">
                <h3>${menu.name}</h3>
                <p>${menu.description}</p>
                <span class="price">${menu.price}</span>
                <button class="add-to-cart-btn" data-name="${menu.name}">Agregar al Carrito</button>
            `;
            menuCards.appendChild(card);
        });
    }

    const sidebarItems = document.querySelectorAll(".menu-sidebar li");
    sidebarItems.forEach(item => {
        item.addEventListener("click", () => {
            sidebarItems.forEach(item => item.classList.remove("active"));
            item.classList.add("active");
            const category = item.dataset.category;
            loadMenuCards(category);
        });
    });

    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    const menuCards = document.querySelector(".menu-cards");

    prevBtn.addEventListener("click", () => {
        const activeCategory = document.querySelector(".menu-sidebar li.active").dataset.category;
        const menuItems = menuManager.getMenusByCategory(activeCategory);
        const currentIndex = menuItems.findIndex(menu => menu.name === menuCards.firstElementChild.querySelector("h3").textContent);

        if (currentIndex > 0) {
            const prevItems = menuItems.slice(currentIndex - 3, currentIndex);
            menuCards.innerHTML = "";
            prevItems.forEach(menu => {
                const card = document.createElement("div");
                card.classList.add("menu-card");
                card.innerHTML = `
                    <img src="${menu.image}" alt="${menu.name}">
                    <h3>${menu.name}</h3>
                    <p>${menu.description}</p>
                    <span class="price">${menu.price}</span>
                    <button class="add-to-cart-btn" data-name="${menu.name}">Agregar al Carrito</button>
                `;
                menuCards.appendChild(card);
            });
        }
    });

    nextBtn.addEventListener("click", () => {
        const activeCategory = document.querySelector(".menu-sidebar li.active").dataset.category;
        const menuItems = menuManager.getMenusByCategory(activeCategory);
        const currentIndex = menuItems.findIndex(menu => menu.name === menuCards.lastElementChild.querySelector("h3").textContent);

        if (currentIndex < menuItems.length - 1) {
            const nextItems = menuItems.slice(currentIndex + 1, currentIndex + 4);
            menuCards.innerHTML = "";
            nextItems.forEach(menu => {
                const card = document.createElement("div");
                card.classList.add("menu-card");
                card.innerHTML = `
                    <img src="${menu.image}" alt="${menu.name}">
                    <h3>${menu.name}</h3>
                    <p>${menu.description}</p>
                    <span class="price">${menu.price}</span>
                    <button class="add-to-cart-btn" data-name="${menu.name}">Agregar al Carrito</button>
                `;
                menuCards.appendChild(card);
            });
        }
    });

    loadMenuCards("desayunos");

    // Obtener el ícono del carrito y la interfaz del carrito de compras
    const cartIcon = document.getElementById('cart-icon');
    const cartElement = document.getElementById('cart');

    // Agregar evento de clic al ícono del carrito
    cartIcon.addEventListener('click', () => {
        // Agregar la clase 'active' a la interfaz del carrito de compras
        cartElement.classList.add('active');
    });

    // Agregar evento de clic al botón de cerrar el carrito
    const closeBtn = document.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        // Remover la clase 'active' de la interfaz del carrito de compras
        cartElement.classList.remove('active');
    });

    // Agregar evento de clic a los botones "Agregar al Carrito"
    document.addEventListener('click', event => {
        if (event.target.classList.contains('add-to-cart-btn')) {
            const menuName = event.target.dataset.name;
            const menu = menuManager.getMenusByCategory(document.querySelector('.menu-sidebar li.active').dataset.category).find(menu => menu.name === menuName);
            cart.addItem(menu);
        }
    });

    // Agregar evento de clic a los botones "Eliminar" de los productos en el carrito
    document.addEventListener('click', event => {
        if (event.target.classList.contains('plus-btn')) {
            const menuId = parseInt(event.target.dataset.id);
            cart.addItem(menuManager.getMenuById(menuId));
        }
    
        if (event.target.classList.contains('minus-btn')) {
            const menuId = parseInt(event.target.dataset.id);
            cart.removeItem(menuId);
        }
    
        if (event.target.classList.contains('remove-btn')) {
            const menuId = parseInt(event.target.dataset.id);
            cart.removeItem(menuId);
        }
    });
});
