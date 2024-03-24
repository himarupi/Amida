const fps = 60;
const canvasSize=[640, 480];

const scenes = {
	title: "タイトル",
	game: "ゲーム",
	settings: "設定",
	registRanking: "ランキング登録",
	rankings: "順位表",
	result: "結果"
};

// 成績
let recordTypeCount = 0;
let recordMissTypeCount = 0;
let recordKillCount = 0;
let startTime = 0;
let endTime = 0;
let recordClearTime = 0;
let typeSpeed = 1.0;
let typeSpeedLevel = 1;


let g, scene;      // 
let clickPos = []; // クリックされた場所のcanvasからの相対座標が格納される.
let objects = {};  // 
let input = []; // キー入力
let rankingPage = 0;
// ゲーム画面
let typingJson;
let pharasesJson;
let typingObject; // まだ入力されてない文字列

// 音楽
let bgm;
let se;

/* Webページ読み込み時の処理 */
window.onload = async function() {
	// canvas
	const canvas = document.getElementById("gamecanvas");
	g = canvas.getContext("2d");
	g.imageSmoothingEnabled = true;
	
	// ファイル読み込み
	const paths = ['./src/img/background01.png', './src/img/amida.png', ];
	const promises = paths.map(path => fetch(path));
	await Promise.all(promises)

	// font読み込み
	//   azuki_font
	var fontFace = new FontFace('azuki_font', 'url(./src/fonts/azuki.ttf)', { style: 'normal', weight: 700});
	await fontFace.load().then(function(loadedFace){document.fonts.add(loadedFace);}).catch(function(e){});
	//   07LightNovelPOP
	var fontFace = new FontFace('LightNovelPOP', 'url(./src/fonts/LightNovelPOPv2.otf)', { style: 'normal', weight: 700});
	await fontFace.load().then(function(loadedFace){document.fonts.add(loadedFace);}).catch(function(e){});

	// typingJson読み込み
	var response = await fetch('./src/others/typing.json');
	typingJson = await response.json();
	// typingJson読み込み
	var response = await fetch('./src/others/phrases.json');
	pharasesJson = await response.json();
	// 曲読み込み
	se = new Audio('./src/se/typing_sound.wav');

	// ゲーム開始
	init();
	setInterval("gameloop()", 1000 / fps);
	console.log("maguro oisii");

};

function init(){
	scene = scenes.title;
	titleOnLoad();
	console.log("ebi mo oisii");
}

// マウスクリック イベントリスナー
// canvasに対する相対座標をclickPosに格納する
document.addEventListener("click", function(e){
	const rect = e.target.getBoundingClientRect();
    const y = e.clientY - rect.top;
	const x = e.clientX - rect.left;
	clickPos.push([x,y]);
}, false);

// キー入力
document.addEventListener('keydown', function(e){
	e.preventDefault(); // ブラウザのショートカットキーを無効にする
	input.push(e.key);
});


/* ---- o ---- o ---- o ---- o ---- o ---- o ---- o ---- o
❁ Main
	- gameloop()  1秒に60回ループ
	- update()  数値計算やオブジェクト管理など
	- draw()  描画処理
o ---- o ---- o ---- o ---- o ---- o ---- o ---- o ---- */

function gameloop() {
	switch(scene){
		case scenes.title:
			titleDraw();
			titleUpdate();
			break;
		case scenes.game:
			gameDraw();
			gameUpdate();
			break;
		case scenes.result:
			resultDraw();
			resultUpdate();
			break;
		case scenes.rankings:
			rankingDraw();
			rankingUpdate();
			break;
		case scenes.registRanking:
			registRankingDraw();
			registRankingUpdate();
			break
	}
	update();
	draw();
}

function update() {}

function draw() {}

/* ---- o ---- o ---- o ---- o ---- o ---- o ---- o ---- o
❁ functions
o ---- o ---- o ---- o ---- o ---- o ---- o ---- o ---- */