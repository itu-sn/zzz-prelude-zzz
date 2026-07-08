// ================================
// 画面一覧
// ================================

const screens = {

    start: document.getElementById("startScreen"),
    game: document.getElementById("gameScreen"),
    answer: document.getElementById("answerScreen"),
    result: document.getElementById("resultScreen"),
    finish: document.getElementById("finishScreen")

};

console.log(screens);

// ================================
// 全画面非表示
// ================================

function hideAllScreens(){

    Object.values(screens).forEach(screen=>{

        screen.classList.remove("active");

    });

}

// ================================
// 画面表示
// ================================

function showScreen(name){

    hideAllScreens();

    screens[name].classList.add("active");

}

// ================================
// 各画面へ移動
// ================================

function showStartScreen(){

    showScreen("start");

}

function showGameScreen(){

    showScreen("game");

}

function showAnswerScreen(){

    showScreen("answer");

}

function showResultScreen(){

    showScreen("result");

}

function showFinishScreen(){

    showScreen("finish");

}