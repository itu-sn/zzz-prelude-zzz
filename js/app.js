// ==========================================
// IntroQuiz Version 1.0
// ==========================================

// ---------- ボタン ----------
const startButton = document.getElementById("startButton");
const playButton = document.getElementById("playButton");
const answerButton = document.getElementById("answerButton");

const correctButton = document.getElementById("correctButton");
const wrongButton = document.getElementById("wrongButton");

const countButtons = document.querySelectorAll(".count-btn");

const homeButtons = document.querySelectorAll(".homeButton");
const backHomeButton = document.getElementById("backHomeButton");

// ---------- 表示 ----------
const scoreText = document.getElementById("score");
const comboText = document.getElementById("combo");
const questionText = document.getElementById("questionCount");

const resultScore = document.getElementById("resultScore");
const resultCombo = document.getElementById("resultCombo");
const resultQuestion = document.getElementById("resultQuestion");

const finalScore = document.getElementById("finalScore");

const rankText = document.getElementById("rank");
const rankComment = document.getElementById("rankComment");

const musicTitle = document.getElementById("musicTitle");
const artistName = document.getElementById("artistName");

const equalizer = document.querySelector(".equalizer");

// ==========================================
// ゲーム情報
// ==========================================

let musicList = [];

let currentQuestion = 0;

let questionCount = 1;

let score = 0;

let combo = 0;

let correctCount = 0;

// ==========================================
// 問題数
// ==========================================

countButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        playSE();

        countButtons.forEach(btn=>{

            btn.classList.remove("selected");

        });

        button.classList.add("selected");

        if(button.dataset.count==="all"){

            questionCount = musicData.length;

        }else{

            questionCount = Number(button.dataset.count);

        }

    });

});

countButtons[0].classList.add("selected");

// ==========================================
// シャッフル
// ==========================================

function shuffle(array){

    for(let i=array.length-1;i>0;i--){

        const j=Math.floor(Math.random()*(i+1));

        [array[i],array[j]]=[array[j],array[i]];

    }

    return array;

}

// ==========================================
// UI更新
// ==========================================

function updateUI(){

    scoreText.textContent = `${score} pt`;

    comboText.textContent = `${combo} combo`;

    questionText.textContent =
        `${currentQuestion+1} / ${questionCount}`;

if(resultScore){

    resultScore.textContent = `${score} pt`;

}

if(resultCombo){

    resultCombo.textContent = `${combo} combo`;

}

if(resultQuestion){

    resultQuestion.textContent =
        `${currentQuestion+1} / ${questionCount}`;

}

}

// ==========================================
// 曲情報
// ==========================================

function showCurrentMusic(){

    const music = musicList[currentQuestion];

    musicTitle.textContent = music.title;

    artistName.textContent = music.artist;

}

// ==========================================
// ゲーム開始
// ==========================================

function startGame(){

    stopMusic();
    stopAllTimer();

    musicList = shuffle([...musicData]);
    musicList = musicList.slice(0, questionCount);

    currentQuestion = 0;
    score = 0;
    combo = 0;
    correctCount = 0;

    correctButton.disabled = false;
    wrongButton.disabled = false;

    playButton.innerHTML = `
        <span class="material-icons">
            play_arrow
        </span>
        再生する
    `;

    updateUI();

    showGameScreen();

}

// ← この下に追加！
startButton.addEventListener("click", () => {

    playSE();

    startGame();

});

// ==========================================
// 再生
// ==========================================

playButton.addEventListener("click",()=>{

    playSE();

    playMusic();

    startGameTimer();

});

// ==========================================
// 回答
// ==========================================

answerButton.addEventListener("click",()=>{

    playSE();

    stopMusic();

    stopAllTimer();

    showAnswerScreen();

    startAnswerTimer();

});

// ==========================================
// ホーム
// ==========================================

homeButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        if(!confirm("ホームへ戻りますか？")) return;

        playSE();

        stopMusic();

        stopAllTimer();

        showStartScreen();

    });

});

backHomeButton.addEventListener("click",()=>{

    playSE();
    
    stopMusic();

    stopAllTimer();

    showStartScreen();

});

// ==========================================
// タイマー終了後
// ==========================================

// timer.js から呼ばれる
function onAnswerTimeEnd() {

    showResultScreen();

    showCurrentMusic();

    updateUI();

}

// timer.js から呼ばれる
function onGameTimeEnd() {

    stopMusic();

    showAnswerScreen();

    startAnswerTimer();

}

// ==========================================
// 正解
// ==========================================

correctButton.addEventListener("click", () => {

    console.log("correct clicked");
   
    playSE();

    correctButton.disabled = true;
    wrongButton.disabled = true;

    combo++;
    correctCount++;

    score += Math.min(100 + (combo - 1) * 10, 150);

    updateUI();

    nextQuestion();

});

// ==========================================
// 不正解
// ==========================================

wrongButton.addEventListener("click", () => {

    console.log("wrong clicked");

    playSE();

    correctButton.disabled = true;
    wrongButton.disabled = true;

    combo = 0;

    updateUI();

    nextQuestion();

});

// ==========================================
// 次の問題
// ==========================================

function nextQuestion() {

    stopAllTimer();

    setTimeout(() => {

        currentQuestion++;

        if (currentQuestion >= questionCount) {

            finishGame();

            return;

        }

        correctButton.disabled = false;
        wrongButton.disabled = false;

        playButton.innerHTML = `
            <span class="material-icons">
                play_arrow
            </span>
            再生する
        `;

        updateUI();

        showGameScreen();

    }, 1000);

}

// ==========================================
// ゲーム終了
// ==========================================

function finishGame() {

    stopMusic();
    stopAllTimer();

    finalScore.textContent = `${score} pt`;

    const accuracy = correctCount / questionCount;

    if (accuracy === 1) {

        rankText.textContent = "S";
        rankComment.textContent = "Perfect!!";

    } else if (accuracy >= 0.9) {

        rankText.textContent = "A";
        rankComment.textContent = "Excellent!!";

    } else if (accuracy >= 0.7) {

        rankText.textContent = "B";
        rankComment.textContent = "Great!";

    } else if (accuracy >= 0.5) {

        rankText.textContent = "C";
        rankComment.textContent = "Good!";

    } else {

        rankText.textContent = "D";
        rankComment.textContent = "Try Again!";

    }

    showFinishScreen();

}