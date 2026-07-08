// ==========================================
// Timer
// ==========================================

let gameTimer = null;
let answerTimer = null;

let gameTime = 20;
let answerTime = 10;

// ==========================================
// SVGリング
// ==========================================

const gameCircle = document.getElementById("gameProgress");
const answerCircle = document.getElementById("answerProgress");

const radius = 95;
const circumference = 2 * Math.PI * radius;

gameCircle.style.strokeDasharray = circumference;
gameCircle.style.strokeDashoffset = 0;

answerCircle.style.strokeDasharray = circumference;
answerCircle.style.strokeDashoffset = 0;

// ==========================================
// リング更新
// ==========================================

function updateGameRing() {

    const offset =
        circumference -
        (gameTime / 20) * circumference;

    gameCircle.style.strokeDashoffset = offset;

}

function updateAnswerRing() {

    const offset =
        circumference -
        (answerTime / 10) * circumference;

    answerCircle.style.strokeDashoffset = offset;

}

// ==========================================
// ゲームタイマー開始
// ==========================================

function startGameTimer() {

    clearInterval(gameTimer);

    gameTime = 20;

    document.getElementById("timer").textContent = gameTime;

    gameCircle.style.strokeDashoffset = 0;

    updateGameRing();

    gameTimer = setInterval(() => {

        gameTime--;

        document.getElementById("timer").textContent = gameTime;

        updateGameRing();

        // ★あとで追加
        // updateGameRingColor();

if (gameTime <= 0) {

    clearInterval(gameTimer);

    onGameTimeEnd();

}

    }, 1000);

}

// ==========================================
// 回答タイマー開始
// ==========================================

function startAnswerTimer() {

    clearInterval(answerTimer);

    answerTime = 10;

    document.getElementById("answerTimer").textContent = answerTime;

    answerCircle.style.strokeDashoffset = 0;

    updateAnswerRing();

    answerTimer = setInterval(() => {

        answerTime--;

        document.getElementById("answerTimer").textContent = answerTime;

        updateAnswerRing();

       if (answerTime <= 0) {

    clearInterval(answerTimer);

    onAnswerTimeEnd();

}

    }, 1000);

}

// ==========================================
// タイマー停止
// ==========================================

function stopAllTimer() {

    clearInterval(gameTimer);

    clearInterval(answerTimer);

}