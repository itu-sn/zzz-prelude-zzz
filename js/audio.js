
// ================================
// 効果音
// ================================

const clickSE = new Audio("sound/SE.mp3");

clickSE.volume = 0.35;

function playSE(){

    clickSE.currentTime = 0;

    clickSE.play();

}

// ===================================
// オーディオ
// ===================================

let audio = new Audio();

let isPlaying = false;

// ===================================
// 曲を再生
// ===================================
function playMusic() {

    if (isPlaying) return;

    const music = musicList[currentQuestion];

    audio.src = music.file;
    audio.currentTime = 0;
    audio.play();

    isPlaying = true;

    playButton.innerHTML = `
        <span class="material-icons">graphic_eq</span>
        再生中...
    `;

    // ★追加
    equalizer.classList.add("playing");

}

// ===================================
// 曲を停止
// ===================================

function stopMusic() {

    audio.pause();
    audio.currentTime = 0;

    isPlaying = false;

    playButton.innerHTML = `
        <span class="material-icons">play_arrow</span>
        再生する
    `;

    // ★追加
    equalizer.classList.remove("playing");

}

// ===================================
// 曲終了
// ===================================

audio.addEventListener("ended",()=>{

    isPlaying = false;

    playButton.innerHTML = `
        <span class="material-icons">play_arrow</span>
        再生する
    `;

    equalizer.classList.remove("playing");

});