class MenuManager {
    constructor() {
        this.categories = [];
    }

    addCategory(category) {
        this.categories.push(category);
    }

    getMenusByCategory(categoryName) {
        const category = this.categories.find(category => category.name === categoryName);
        return category ? category.menus : [];
    }
    getMenuById(menuId) {
        for (const category of this.categories) {
            const menu = category.menus.find(menu => menu.id === menuId);
            if (menu) {
                return menu;
            }
        }
        return null;
    }
}