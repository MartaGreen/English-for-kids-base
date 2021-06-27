import { CategoryName } from "../scripts/cards";
import { cards } from "../scripts/cardsInfo";
import { openMenu } from "../scripts/pageFunc"

const CATEGORIES_NAME_CARDS_SRC = [
  "emotions",
  "actions",
  "illnesses",
  "clothes",
  "animals",
  "food",
  "colors",
  "transports",
];

const pageHeader = () => {
  // header rendering
  const header: HTMLElement = document.createElement("header");
  header.setAttribute("class", "header");

  const burgerMenu: HTMLDivElement = document.createElement("div");
  burgerMenu.setAttribute("class", "burgerMenu");
  for (let i = 0; i < 3; i++) {
    const burgerMenuItem: HTMLDivElement = document.createElement("div");
    burgerMenuItem.setAttribute("class", "burgerMenuItem");
    burgerMenuItem.setAttribute("id", `burgerMenuItem${i+1}`);

    burgerMenu.appendChild(burgerMenuItem);
  }

  header.appendChild(burgerMenu);

  const switchModeContainer : HTMLDivElement = document.createElement("div");
  switchModeContainer.setAttribute("class", "switchModeContainer")

  const switchModeInput: HTMLInputElement = document.createElement("input");
  switchModeInput.setAttribute("class", "switchModeInput");
  switchModeInput.setAttribute("type", "checkbox");

  const switchModeLable: HTMLLabelElement = document.createElement("label");
  switchModeLable.setAttribute("class", "switchModeLable");

  switchModeContainer.appendChild(switchModeInput);
  switchModeContainer.appendChild(switchModeLable);
  header.appendChild(switchModeContainer);

  document.body.appendChild(header);
}

const createMenuNavItem = (category: string, navMenu: HTMLElement, categoryClass: string) => {
  const navMenuItem = document.createElement("li");
    navMenuItem.setAttribute("class", categoryClass);
    navMenuItem.setAttribute("id", `${category}_nav`);
    navMenuItem.innerHTML = category;

    navMenu.appendChild(navMenuItem);
}

const createMenu = () => {
  const menu: HTMLDivElement = document.createElement("div");
  menu.setAttribute("class", "menu");
  const navMenu: HTMLElement = document.createElement("ul");
  navMenu.setAttribute("class", "navMenu");

  createMenuNavItem("Main Page", navMenu, "navMenuItem navMenuItemActive");

  CATEGORIES_NAME_CARDS_SRC.forEach(category => {
    createMenuNavItem(category, navMenu, "navMenuItem");
  })
  menu.appendChild(navMenu);

  document.body.appendChild(menu);
}

const pageMain = () => {
  const main: HTMLElement = document.createElement("main");
  main.setAttribute("class", "main");
  document.body.appendChild(main)

  // main page rendering
  const mainPage: HTMLDivElement = document.createElement("div");
  mainPage.setAttribute("class", "page mainPage block");

  CATEGORIES_NAME_CARDS_SRC.forEach((category) => {
    const card: CategoryName = new CategoryName(cards[category].mainImage, category);
    const cardImg: HTMLCanvasElement = card.render();

    mainPage.appendChild(cardImg);
    card.loadCategoryCards();
  });

  // categories page rendering
  const categoriesPage: HTMLDivElement = document.createElement("div");
  categoriesPage.setAttribute("class", "categoriesPage block");

  main.appendChild(mainPage);
  main.appendChild(categoriesPage);
};

createMenu();
pageHeader();
pageMain();
openMenu();
