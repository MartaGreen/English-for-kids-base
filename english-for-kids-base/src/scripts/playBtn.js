import { CATEGORY_CARDS, CATEGORIES_NAMES } from "../scripts/pageRender";
let CORRECT_ATTEMPTS = 0;
let FAIL_ATTEMPTS = 0;
function shuffle(cardsArr) {
    return cardsArr.sort(() => Math.random() - 0.5);
}
function createFinishImg(src, cls) {
    const canvas = document.createElement("canvas");
    canvas.setAttribute("class", cls);
    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.src = src;
    image.onload = () => {
        image.width = canvas.width;
        image.height = canvas.height;
        ctx.drawImage(image, 0, 0, image.width, image.height);
    };
    return canvas;
}
function attemptFinish(cls, type) {
    return new Promise((resolve, reject) => {
        const finishBlock = document.querySelector(".finish");
        finishBlock.classList.add(cls);
        let image;
        let errorMsg;
        setTimeout(() => {
            if (type === "correct") {
                image = createFinishImg("./images/good_job.png", "finishImg");
                finishBlock.appendChild(image);
                const finishSound = document.querySelector(".correctFinish");
                finishSound.play();
            }
            else if (type === "fail") {
                image = createFinishImg("./images/fail.png", "finishImg");
                finishBlock.appendChild(image);
                errorMsg = document.createElement("div");
                errorMsg.setAttribute("class", "errorMsg");
                errorMsg.innerHTML = `${FAIL_ATTEMPTS} ${FAIL_ATTEMPTS === 1 ? "error" : "errors"}`;
                finishBlock.appendChild(errorMsg);
                const finishSound = document.querySelector(".failFinish");
                finishSound.play();
            }
            setTimeout(() => {
                finishBlock.classList.remove(cls);
                image.remove();
                if (errorMsg)
                    errorMsg.remove();
                resolve("done!");
            }, 3500);
        }, 1000);
    }).then(() => {
        console.log("in");
        const mainPage = document.getElementById("Main_Page_nav");
        mainPage.click();
        FAIL_ATTEMPTS = 0;
        CORRECT_ATTEMPTS = 0;
    });
}
function createFinish() {
    if (CORRECT_ATTEMPTS === 8) {
        if (!FAIL_ATTEMPTS) {
            attemptFinish("finishOpen", "correct");
        }
        else {
            console.log("was wrang");
            attemptFinish("finishOpen", "fail");
        }
    }
    else {
        const playBtn = document.querySelector(".playBtn");
        playBtnFunc(playBtn);
    }
}
function createCorrectAttempt() {
    const attemptCont = document.createElement("div");
    attemptCont.setAttribute("class", "attemptCont");
    attemptCont.innerHTML = `<svg class="attempt" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"/></svg>`;
    return attemptCont;
}
function createWrongAttempt() {
    const attemptCont = document.createElement("div");
    attemptCont.setAttribute("class", "attemptCont");
    attemptCont.innerHTML = `<?xml version="1.0" encoding="iso-8859-1"?>
  <!-- Generator: Adobe Illustrator 18.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
  <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
  <svg class="attempt" width="24" height="24" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
     viewBox="0 0 298.796 298.796" style="enable-background:new 0 0 298.796 298.796;" xml:space="preserve">
  <g>
    <g>
      <path d="M92.403,170.148l53.439-44.832l-14.99-73.318c-14.142-13.761-33.324-21.874-53.77-21.874
        C34.579,30.123,0,64.702,0,107.205c0,34.281,12.496,64.665,39.323,95.621c16.591,19.144,53.774,46.152,74.463,60.549
        c4.406,3.065,9.462,4.806,14.61,5.242l-40.363-76.039C84.014,185.008,85.836,175.657,92.403,170.148z"/>
    </g>
    <g>
      <path d="M298.796,107.205c0-42.503-34.579-77.082-77.082-77.082c-20.451,0-39.638,8.117-53.781,21.884l15.667,76.631
        c1.335,6.531-1.015,13.269-6.121,17.554l-50.466,42.338l42.541,80.142c5.438-0.308,10.809-2.063,15.455-5.296
        c20.687-14.395,57.87-41.402,74.465-60.55C286.3,171.871,298.796,141.486,298.796,107.205z"/>
    </g>
  </g>
  </svg>`;
    return attemptCont;
}
function game(arr, i, replayBtn) {
    // checking user answer
    function handleClick(clickedObj) {
        if (!clickedObj.target.classList.contains("checkedBg")) {
            if (clickedObj.target === chosenCard.cardContainer ||
                chosenCard.cardContainer.contains(clickedObj.target)) {
                const attempt = createCorrectAttempt();
                attempts.prepend(attempt);
                CORRECT_ATTEMPTS += 1;
                const sound = document.querySelector(".correctAttempt");
                sound.play();
                replayBtn.removeEventListener("click", startReplay);
                chosenCard.cardContainer.classList.add("checked");
                if (i < arr.length - 1) {
                    cardsField.removeEventListener("click", handleClick);
                    i += 1;
                    game(arr, i, replayBtn);
                }
                else {
                    console.log("stop");
                    createFinish();
                    cardsField.removeEventListener("click", handleClick);
                    return;
                }
            }
            else {
                if (clickedObj.target !== document.querySelector(".categoriesPage")) {
                    console.log(clickedObj.target);
                    FAIL_ATTEMPTS += 1;
                    const sound = document.querySelector(".failAttempt");
                    sound.play();
                    const attempt = createWrongAttempt();
                    attempts.prepend(attempt);
                    console.log(false);
                }
            }
        }
    }
    function stopGame() {
        slider.removeEventListener("change", stopGame);
        i = arr.length;
        cardsField.removeEventListener("click", handleClick);
        replayBtn.removeEventListener("click", startReplay);
        const removeAttempts = document.querySelector(".attempts");
        if (removeAttempts)
            removeAttempts.remove();
        createPlayBtn();
        console.log("delete");
    }
    const chosenCard = arr[i];
    setTimeout(() => chosenCard.sound.play(), i === 0 ? 100 : 1500);
    function startReplay() {
        console.log("chosencard", chosenCard);
        chosenCard.sound.play();
    }
    replayBtn.addEventListener("click", startReplay);
    const attempts = document.querySelector(".attempts");
    const cardsField = document.querySelector(".categoriesPage");
    cardsField.addEventListener("click", handleClick);
    // hard stop game (user stop a game before finish it)
    const slider = document.querySelector(".switchModeInput");
    const navItems = document.querySelectorAll(".navMenuItem");
    slider.addEventListener("change", stopGame);
    navItems.forEach((item) => {
        item.addEventListener("click", stopGame);
    });
}
function playBtnFunc(playBtn) {
    playBtn.addEventListener("click", function playBtnEvent() {
        playBtn.removeEventListener("click", playBtnEvent);
        removePlayBtn();
        const replayBtn = createReplayBtn();
        const page = document.querySelector(".categoriesPageCont");
        page.appendChild(replayBtn);
        // rerender attempts field
        const categoriesPageCont = document.querySelector(".categoriesPageCont");
        const removeAttempts = document.querySelector(".attempts");
        if (removeAttempts)
            removeAttempts.remove();
        const attempts = document.createElement("div");
        attempts.setAttribute("class", "attempts");
        categoriesPageCont.appendChild(attempts);
        // get loaded category cards
        const loadedCategory = CATEGORIES_NAMES.find((category) => category.status === "loaded");
        let loadedCardsArr = Array.from(CATEGORY_CARDS[loadedCategory.name]);
        // create game functionality
        loadedCardsArr = shuffle(loadedCardsArr);
        game(loadedCardsArr, 0, replayBtn);
    });
}
function createReplayBtn() {
    const replayBtn = document.createElement("input");
    replayBtn.setAttribute("class", "replayBtn playBtn");
    replayBtn.setAttribute("type", "button");
    replayBtn.setAttribute("value", "replay");
    // replayBtn.innerHTML = `<svg class="replayIcon" fill="orange" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="30px" height="30px"><path d="M 15 3 A 1.0001 1.0001 0 1 0 15 5 C 20.534534 5 25 9.4654664 25 15 C 25 20.534534 20.534534 25 15 25 C 9.4654664 25 5 20.534534 5 15 C 5 12.650241 5.8085376 10.496834 7.1601562 8.7929688 L 9 11 L 11 4 L 4 5 L 5.8671875 7.2402344 C 4.086665 9.3350655 3 12.041787 3 15 C 3 21.615466 8.3845336 27 15 27 C 21.615466 27 27 21.615466 27 15 C 27 8.3845336 21.615466 3 15 3 z"/></svg>`
    return replayBtn;
}
function removePlayBtn() {
    const replayBtn = document.querySelector(".replayBtn");
    if (replayBtn)
        replayBtn.remove();
    const removePlayBtn = document.querySelector(".playBtn");
    if (removePlayBtn)
        removePlayBtn.remove();
}
export function createPlayBtn() {
    removePlayBtn();
    const categoriesPageCont = document.querySelector(".categoriesPageCont");
    const playBtn = document.createElement("input");
    playBtn.setAttribute("class", "playBtn");
    playBtn.setAttribute("type", "button");
    playBtn.setAttribute("value", "play");
    categoriesPageCont.appendChild(playBtn);
    playBtnFunc(playBtn);
    return playBtn;
}
//# sourceMappingURL=playBtn.js.map