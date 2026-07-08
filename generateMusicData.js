const fs = require("fs");
const path = require("path");

// ===== 設定 =====
const musicFolder = path.join(__dirname, "music");
const outputFile = path.join(__dirname, "js", "musicData.js");

// ===== MP3一覧取得 =====
const files = fs
    .readdirSync(musicFolder)
    .filter(file => file.toLowerCase().endsWith(".mp3"))
    .sort((a, b) => a.localeCompare(b, "ja"));

// ===== musicData生成 =====
const musicData = files.map(file => {

    const name = file.replace(/\.mp3$/i, "");

    let artist = "";
    let title = name;

    if (name.includes(" - ")) {

        const split = name.split(" - ");

        artist = split.shift();

        title = split.join(" - ");

    }

    return {
        title,
        artist,
        file: `music/${file}`
    };

});

// ===== JSファイル出力 =====
const content =
`const musicData = ${JSON.stringify(musicData, null, 4)};`;

fs.writeFileSync(outputFile, content, "utf8");

console.log(`✅ ${musicData.length}曲を書き出しました！`);