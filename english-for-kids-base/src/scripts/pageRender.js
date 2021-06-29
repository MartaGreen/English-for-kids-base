import { CategoryName } from "../scripts/cards";
import { cards } from "../scripts/cardsInfo";
import { openMenu } from "../scripts/pageFunc";
const CATEGORIES_NAME_CARDS_SRC = [
    "emotions",
    "actions",
    "illnesses",
    "clothes",
    "animals",
    "food",
    "colors",
    "transport",
];
export const CATEGORY_CARDS = [];
const renderSitchMode = () => {
    const switchMode = document.createElement("label");
    switchMode.setAttribute("class", "switchMode");
    const switchModeInput = document.createElement("input");
    switchModeInput.setAttribute("class", "switchModeInput");
    switchModeInput.setAttribute("type", "checkbox");
    const switchModeSpan = document.createElement("span");
    switchModeSpan.setAttribute("class", "switchModeSpan");
    switchMode.appendChild(switchModeInput);
    switchMode.appendChild(switchModeSpan);
    return switchMode;
};
const pageHeader = () => {
    // header rendering
    const header = document.createElement("header");
    header.setAttribute("class", "header");
    const burgerMenu = document.createElement("div");
    burgerMenu.setAttribute("class", "burgerMenu");
    for (let i = 0; i < 3; i++) {
        const burgerMenuItem = document.createElement("div");
        burgerMenuItem.setAttribute("class", "burgerMenuItem");
        burgerMenuItem.setAttribute("id", `burgerMenuItem${i + 1}`);
        burgerMenu.appendChild(burgerMenuItem);
    }
    header.appendChild(burgerMenu);
    const switchMode = renderSitchMode();
    header.appendChild(switchMode);
    document.body.appendChild(header);
};
const createMenuNavItem = (category, navMenu, categoryClass) => {
    const navMenuItem = document.createElement("li");
    navMenuItem.setAttribute("class", categoryClass);
    navMenuItem.setAttribute("id", `${category.split(" ").join("_")}_nav`);
    navMenuItem.innerHTML = category;
    navMenu.appendChild(navMenuItem);
};
const createMenu = () => {
    const menu = document.createElement("div");
    menu.setAttribute("class", "menu");
    const navMenu = document.createElement("ul");
    navMenu.setAttribute("class", "navMenu");
    createMenuNavItem("Main Page", navMenu, "navMenuItem navMenuItemActive");
    CATEGORIES_NAME_CARDS_SRC.forEach(category => {
        createMenuNavItem(category, navMenu, "navMenuItem");
    });
    menu.appendChild(navMenu);
    document.body.appendChild(menu);
};
const pageMain = () => {
    const main = document.createElement("main");
    main.setAttribute("class", "main");
    document.body.appendChild(main);
    // main page rendering
    const mainPage = document.createElement("div");
    mainPage.setAttribute("class", "page mainPage block");
    CATEGORIES_NAME_CARDS_SRC.forEach((category) => {
        const card = new CategoryName(cards[category].mainImage, category);
        const cardImg = card.render();
        CATEGORY_CARDS.push(card);
        mainPage.appendChild(cardImg);
        card.loadCategoryCards();
    });
    // categories page rendering
    const categoriesPage = document.createElement("div");
    categoriesPage.setAttribute("class", "categoriesPage block");
    main.appendChild(mainPage);
    main.appendChild(categoriesPage);
};
createMenu();
pageHeader();
pageMain();
openMenu();
//# sourceMappingURL=pageRender.js.map