import { CATEGORIES_NAMES } from "../scripts/pageRender";
const changeMode = () => {
    const slider = document.querySelector(".switchModeInput");
    slider.addEventListener("change", (e) => {
        console.log("change");
        const modeInput = e.target;
        const mode = modeInput.checked ? "play" : "train";
        CATEGORIES_NAMES.forEach((category) => {
            category.stage = mode;
        });
        const loadedCategory = CATEGORIES_NAMES.find((category) => category.status === "loaded");
        if (loadedCategory)
            loadedCategory.cardContainer.click();
        document.body.classList.toggle("playMode");
        if (!modeInput.checked) {
            const removeAttempts = document.querySelector(".attempts");
            if (removeAttempts)
                removeAttempts.remove();
        }
    });
};
const openMainPage = () => {
    const mainPageNav = document.getElementById("Main_Page_nav");
    const mainPage = document.querySelector(".mainPageCont");
    const categoriesPage = document.querySelector(".categoriesPageCont");
    mainPageNav.addEventListener("click", () => {
        const activeNavPage = document.querySelector(".navMenuItemActive");
        activeNavPage.classList.remove("navMenuItemActive");
        mainPageNav.classList.add("navMenuItemActive");
        const loadedCategory = CATEGORIES_NAMES.find((category) => category.status === "loaded");
        if (loadedCategory)
            loadedCategory.status = "static";
        mainPage.classList.add("page");
        categoriesPage.classList.remove("page");
    });
};
export const openMenu = () => {
    const menuBtn = document.querySelector(".burgerMenu");
    menuBtn.addEventListener("click", () => {
        document.body.classList.toggle("openedMenu");
        // const header: HTMLElement = document.querySelector(".header");
        if (document.querySelector(".openedMenu")) {
            document.body.addEventListener("click", hideMenu);
            // header.addEventListener("click", hideMenu);
        }
        else {
            document.body.removeEventListener("click", hideMenu);
            // header.removeEventListener("click", hideMenu);
        }
    });
    openMainPage();
    changeMode();
};
function hideMenu(clickedObj) {
    console.log(clickedObj.target);
    const burgerMenu = document.querySelector(".burgerMenu");
    const menu = document.querySelector(".menu");
    const navMenu = document.querySelector(".navMenu");
    if (!burgerMenu.contains(clickedObj.target) &&
        clickedObj.target !== menu &&
        clickedObj.target !== navMenu) {
        document.body.classList.remove("openedMenu");
    }
}
//# sourceMappingURL=pageFunc.js.map