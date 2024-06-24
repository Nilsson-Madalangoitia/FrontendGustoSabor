document.addEventListener("DOMContentLoaded", () => {
    const menuManager = new MenuManager();

    const desayunos = [
        new Menu(1, "Desayuno Andino", "Quinua con leche, pan integral con palta, jugo de naranja natural.", 15.00, 'img/desayuno1.jpg'),
        new Menu(2, "Desayuno Costeño", "Tamal, pan con chicharrón, café con leche.", 18.00, "img/desayuno2.jpg"),
        new Menu(3, "Desayuno Energético", "Batido de frutas con avena, tostadas con mermelada de aguaymanto, café negro.", 20.00, "img/desayuno3.jpg")
    ];

    menuManager.addCategory(new MenuCategory("desayunos", desayunos));

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
                <button class="remove-dish-btn" data-id="${menu.id}">
                    <i class='bx bx-trash'></i> Eliminar
                </button>
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

    loadMenuCards("desayunos");

    document.addEventListener('click', event => {
        if (event.target.classList.contains('remove-dish-btn') || event.target.closest('.remove-dish-btn')) {
            const menuId = parseInt(event.target.dataset.id || event.target.closest('.remove-dish-btn').dataset.id);
            console.log(`Eliminar plato con ID: ${menuId}`);
            // Aquí puedes agregar la lógica para eliminar el plato, por ejemplo, removiéndolo del arreglo de menús.
        }
    });
});
