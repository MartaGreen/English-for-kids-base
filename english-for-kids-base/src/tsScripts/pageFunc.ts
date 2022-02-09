import { CATEGORIES_NAMES } from "../scripts/pageRender";
const changeMode = () => {
  const slider: HTMLInputElement = document.querySelector(".switchModeInput");
  slider.addEventListener("change", (e) => {
    console.log("change");
    const modeInput: HTMLInputElement = <HTMLInputElement>e.target;
    const mode = modeInput.checked ? "play" : "train";
    CATEGORIES_NAMES.forEach((category) => {
      category.stage = mode;
    });
    const loadedCategory = CATEGORIES_NAMES.find(
      (category) => category.status === "loaded"
    );
    if (loadedCategory) loadedCategory.cardContainer.click();
    document.body.classList.toggle("playMode");
    if (!modeInput.checked) {
      const removeAttempts = document.querySelector(".attempts");
      if (removeAttempts) removeAttempts.remove();
    }
  });
};

const openMainPage = () => {
  const mainPageNav: HTMLElement = document.getElementById("Main_Page_nav");
  const mainPage: HTMLDivElement = document.querySelector(".mainPageCont");
  const categoriesPage: HTMLDivElement = document.querySelector(
    ".categoriesPageCont"
  );
  mainPageNav.addEventListener("click", () => {
    const activeNavPage: HTMLLIElement =
      document.querySelector(".navMenuItemActive");
    activeNavPage.classList.remove("navMenuItemActive");
    mainPageNav.classList.add("navMenuItemActive");
    const loadedCategory = CATEGORIES_NAMES.find(
      (category) => category.status === "loaded"
    );
    if (loadedCategory) loadedCategory.status = "static";
    mainPage.classList.add("page");
    categoriesPage.classList.remove("page");
  });
};

export const openMenu = () => {
  const menuBtn: HTMLDivElement = document.querySelector(".burgerMenu");
  menuBtn.addEventListener("click", () => {
    document.body.classList.toggle("openedMenu");
    // const header: HTMLElement = document.querySelector(".header");
    if (document.querySelector(".openedMenu")) {
      document.body.addEventListener("click", hideMenu);
      // header.addEventListener("click", hideMenu);
    } else {
      document.body.removeEventListener("click", hideMenu);
      // header.removeEventListener("click", hideMenu);
    }
  });
  openMainPage();
  changeMode();
};

function hideMenu(clickedObj) {
  console.log(clickedObj.target);
  const burgerMenu: HTMLDivElement = document.querySelector(".burgerMenu");
  const menu: HTMLDivElement = document.querySelector(".menu");
  const navMenu: HTMLUListElement = document.querySelector(".navMenu");
  if (
    !burgerMenu.contains(clickedObj.target) &&
    clickedObj.target !== menu &&
    clickedObj.target !== navMenu
  ) {
    document.body.classList.remove("openedMenu");
  }
}
