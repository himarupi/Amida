// title画面
function titleOnLoad(){
	objects = {};
	/* 別画面からタイトル画面へ移動したとき */
	const bgImageSrc = "./src/img/background01.png";
	objects.bgImage = new ImageBox(0, 0, canvasSize[0], canvasSize[1], "rectangle", bgImageSrc);

	// タイトル 表示
	const titleWidth = 300;
	const titleHeight = 75;
	objects.title = new TextBox(canvasSize[0]/2-titleWidth/2, 72, titleWidth, titleHeight, "rectangle");

	objects.title.text = "阿弥打";
	objects.title.font = "75px azuki_font";
	let titleColor = "#FFF";
	objects.title.drawText = function(){
		// const canvas = document.getElementById("gamecanvas");
		// const g = canvas.getContext("2d");
		g.font = this.font;
		g.fillStyle = titleColor;
		g.textBaseline = "middle"; // 基準をテキストの上下中央に
		g.textAlign = "center"; // 基準をテキストの左右中央に
		g.fillText(this.text, this.posX + this.width/2, this.posY + this.height/2); // 中央に文字を配置
	}

	// ボタン配置
	objects.buttons = {};
	// 中央 ボタン(スタート, ランキング, 設定) 共通部分
	//   サイズ
	let buttonWidth = 150;
	let buttonHeight = 40;
	//   色付け
	const buttonColor1 = "rgba(0,0,0,0.6)"; // 塗りつぶす色
	const buttonColor2 = "#FFF"; // 輪郭の色
	const buttonLineWidth  = 1;
	let buttonDraw = function(){
		g.fillStyle = buttonColor1;
		g.strokeStyle = buttonColor2;
		g.lineWidth = buttonLineWidth;
		createRoundRectPath(this.posX, this.posY, this.width, this.height, 4);
		g.fill();
		g.stroke();
	};
	//   文字フォント, 文字色
	const buttonTextColor1 = "#fff";
	const buttonTextFont = "18px azuki_font";
	let buttonDrawText = function(){
		g.font = buttonTextFont;
		g.fillStyle = buttonTextColor1;
		g.textBaseline = "middle"; // 基準をテキストの上下中央に
		g.textAlign = "center"; // 基準をテキストの左右中央に
		g.fillText(this.text, this.posX + this.width/2, this.posY + this.height/2); // 中央に文字を配置
	}

	// objects に追加
	//   startButton
	objects.buttons.startButton   = new Button(canvasSize[0]/2-buttonWidth/2, canvasSize[1]/2 + 26 + 55*0, buttonWidth, buttonHeight, "rectangle")
	objects.buttons.startButton.draw  = buttonDraw;
	objects.buttons.startButton.drawText = buttonDrawText;
	objects.buttons.startButton.text = "スタート"
	objects.buttons.startButton.onClick = function(){
		scene = scenes.game;
		gameOnload();
		return true;
	}
	//   rankingButton
	objects.buttons.rankingButton = new Button(canvasSize[0]/2-buttonWidth/2, canvasSize[1]/2 + 26 + 55*1, buttonWidth, buttonHeight, "rectangle")
	objects.buttons.rankingButton.draw = buttonDraw;
	objects.buttons.rankingButton.drawText = buttonDrawText;
	objects.buttons.rankingButton.text = "ランキング"
	objects.buttons.rankingButton.onClick = function(){
		scene = scenes.rankings;
		rankingOnload();
		return true;
	}
	//   settingButton
	/*
	objects.buttons.settingButton = new Button(canvasSize[0]/2-buttonWidth/2, canvasSize[1]/2 + 26 + 55*2, buttonWidth, buttonHeight, "rectangle")
	objects.buttons.settingButton.draw = buttonDraw;
	objects.buttons.settingButton.drawText = buttonDrawText;
	objects.buttons.settingButton.text = "設定"
	*/
}
function titleUpdate(){
	/* タイトル画面の動作処理 */
	// クリック処理
	for(let i=0; i<clickPos.length;i++){
		for(btnName in objects.buttons){
			/* オブジェクトに被った場所をクリックしていたらイベントを実行する */
			if(objects.buttons[btnName].isPointInsideShape(clickPos[i][0], clickPos[i][1])){
				let flg = objects.buttons[btnName].onClick(); // 画面遷移がある場合はreturn がtrue
				if(flg){break;}
			}
		}
	}
	clickPos = [];
}
function titleDraw(){
	// BackGroundImage
	objects.bgImage.draw();
	// title
	objects.title.drawText();

	// 中央 ボタン
	objects.buttons.startButton.draw();
	objects.buttons.startButton.drawText();
	objects.buttons.rankingButton.draw();
	objects.buttons.rankingButton.drawText();
	// objects.buttons.settingButton.draw();
	// objects.buttons.settingButton.drawText();
}

// ゲーム画面
function gameOnload(){
	objects = {};
	input = [];
	/* 別画面からゲーム画面へ移動したとき */
	const bgImageSrc = "./src/img/background01.png"
	objects.bgImage = new ImageBox(0, 0, canvasSize[0], canvasSize[1], "rectangle", bgImageSrc);

	// 例文表示
	// 外枠
	//   サイズ
	const typingBoxBackGroundWidth = 514;
	const typingBoxBackGroundHeight = 100;
	//    色
	const typingBoxBackGroundColor1 = "rgba(0,0,0,0.6)";
	const typingBoxBackGroundColor2 = "#FFF";
	const typingBoxBackGroundLineWidth = 1;
	const typingBoxBackGroundDraw = function(){
		g.fillStyle = typingBoxBackGroundColor1;
		g.strokeStyle = typingBoxBackGroundColor2;
		g.lineWidth = typingBoxBackGroundLineWidth;
		createRoundRectPath(this.posX, this.posY, this.width, this.height, 4);
		g.fill();
		g.stroke();
	}
	objects.typingBackGroundBox = new TextBox(canvasSize[0]/2-typingBoxBackGroundWidth/2, 52, typingBoxBackGroundWidth, typingBoxBackGroundHeight, "rectangle", "");
	objects.typingBackGroundBox.draw = typingBoxBackGroundDraw;

	// 漢字
	//   サイズ
	const typingBoxSrcTextBoxWidth = 514;
	const typingBoxSrcTextBoxHeight = 18;
	//   文字
	const typingBoxSrcTextBoxColor1 = "#fff";
	const typingBoxSrcTextBoxFont = "18px azuki_font";
	let typingBoxSrcTextBoxDrawText = function(){
		g.font = typingBoxSrcTextBoxFont;
		g.fillStyle = typingBoxSrcTextBoxColor1;
		g.textBaseline = "top"; // 基準をテキストの上下中央に
		g.textAlign = "center"; // 基準をテキストの左右中央に
		g.fillText(this.text, this.posX+this.width/2, this.posY); // 中央に文字を配置
	}
	objects.typingBoxSrcTextBox = new TextBox(canvasSize[0]/2-typingBoxSrcTextBoxWidth/2, 70, typingBoxBackGroundWidth, typingBoxSrcTextBoxHeight, "rectangle", "");
	objects.typingBoxSrcTextBox.drawText = typingBoxSrcTextBoxDrawText;
	// ローマ字
	//   サイズ
	const typingBoxAlpWidth = 514;
	const typingBoxAlpHeight = 18;
	//   文字
	const typingBoxAlpTypedColor1 = "#fff";
	const typingBoxAlpCandidateColor1 = "#aaa";
	const typingBoxAlpFont = "18px azuki_font";
	const typingBoxAlpDrawText = function(){
		// TypedとCandidateのテキストの長さを取得
		g.font = typingBoxAlpFont;
		const typedTextWidth = g.measureText(typingObject.typed_alphabets).width;
		g.font = typingBoxAlpFont;
		const CandidateTextWidth = g.measureText(typingObject.best_alphabets_candidate).width;
		// 描画
		g.textAlign = "left";
		g.textBaseline = "top";
		g.font = typingBoxAlpFont;
		g.fillStyle = typingBoxAlpTypedColor1;
		g.fillText(typingObject.typed_alphabets, this.posX+this.width/2-(typedTextWidth+CandidateTextWidth)/2, this.posY);
		g.font = typingBoxAlpFont;
		g.fillStyle = typingBoxAlpCandidateColor1;
		g.fillText(typingObject.best_alphabets_candidate, this.posX+this.width/2-(-typedTextWidth+CandidateTextWidth)/2, this.posY);
	}
	objects.typingBoxAlp = new TextBox(canvasSize[0]/2-typingBoxAlpWidth/2, 116, typingBoxAlpWidth, typingBoxAlpHeight, "rectangle", "")
	objects.typingBoxAlp.drawText = typingBoxAlpDrawText;

	// キーボード
	const keyBoardImgWidth = 514;
	const keyBoardImgHeight = 174;
	const keyBoardImgSrc = "./src/img/keyboard.png"
	objects.keyBoardImg = new ImageBox(canvasSize[0]/2-keyBoardImgWidth/2, 294, keyBoardImgWidth, keyBoardImgHeight, "rectangle", keyBoardImgSrc);

	// 阿弥陀
	const amidaWidth = 55;
	const amidaHeight = 100;
	const amidaSrc = "./src/img/amida.png"
	objects.amida = new Amida(63, 173, amidaWidth, amidaHeight, "rectangle", amidaSrc);

	// ボス
	const bossWidth = 67;
	const bossHeight = 100;
	const bossSrc = "./src/img/noumen.png";
	objects.boss = new Boss(510, 173, bossWidth, bossHeight, "rectangle", bossSrc);

	// 敵
	objects.enemys = [];

	// 倒した数
	objects.soulImg = new ImageBox(551, 10, 22.5, 32, "rectangle", "./src/img/soul.png");
	objects.xText = new TextBox(600, 17, 50, 24, "rectangle", "x");
	objects.xText.drawText = function(){
		g.font = typingBoxSrcTextBoxFont;
		g.fillStyle = typingBoxSrcTextBoxColor1;
		g.textBaseline = "top"; // 基準をテキストの上下中央に
		g.textAlign = "left"; // 基準をテキストの左右中央に
		g.fillText(this.text, this.posX, this.posY); // 中央に文字を配置
	}
	objects.killCountText = new TextBox(600, 17, 24, 24, "rectangle", "0");
	objects.killCountText.drawText = function(){
		g.font = typingBoxSrcTextBoxFont;
		g.fillStyle = typingBoxSrcTextBoxColor1;
		g.textBaseline = "top"; // 基準をテキストの上下中央に
		g.textAlign = "right"; // 基準をテキストの左右中央に
		g.fillText(this.text, this.posX+this.width, this.posY); // 中央に文字を配置
	}

	
	// typingObject
	typingObject = new TypingObject({}, "", "");

	// 成績初期化
	let date = new Date();
	recordTypeCount = 0;
	recordMissTypeCount = 0;
	recordKillCount = 0;
	startTime = date.getTime();
	endTime = 0;
	recordClearTime = 0;
	typeSpeed = 1.0;
	typeSpeedLevel = 1;

}
function gameUpdate(){
	// 入力し終えたら次の文へ
	if(typingObject.s == "" || typingObject.best_alphabets_candidate == ""){
		if(objects.enemys.length!=0){
			// 倒したとき
			// 記録
			recordKillCount += 1;
			objects.enemys.shift();
			if(typeSpeed<=2){
				typeSpeed += 0.1;
			}else if(typeSpeed<=3.5){
				typeSpeed += 0.15;
				typeSpeedLevel = 2;
			}else if(typeSpeed<=5){
				typeSpeed += 0.15;
				typeSpeedLevel = 3;
			}else{
				typeSpeed += 0.2;
				typeSpeedLevel = 4;
			}
			console.log(`typeSpeed: ${typeSpeed}`)
		}

		// 記録
		recordTypeCount += typingObject.typeCount;
		recordMissTypeCount += typingObject.missTypeCount;

		// pharaseJson から例文を選ぶ
		const pharase = pharasesJson["normal"][typeSpeedLevel][Math.floor(Math.random()*pharasesJson["normal"][typeSpeedLevel].length)];
		typingObject = new TypingObject(typingJson, pharase[0], pharase[1]);

		// 敵を追加する
		let moveSpeed = (typeSpeed/(pharase[1].length*2))*350/fps
		objects.boss.addEnemy(moveSpeed);
	}

	// 入力受け取り
	typingObject.update_typing(input);
	objects.typingBoxSrcTextBox.text = typingObject.s;
	// その他ショートカットキー
	for(let i=0; i<input.length; i++){
		switch(input[i]){
			case "Escape":
				// ゲームをやり直す
				scene = scenes.game;

				// record初期化
				date = new Date();
				recordTypeCount = 0;
				recordMissTypeCount = 0;
				recordKillCount = 0;
				startTime = 0;
				endTime = 0;

				gameOnload();
				return true;
		}
	}
	input = [];

	// 敵 接触判定, 移動
	if(objects.enemys.length!=0 && objects.enemys[0].isPointInsideShape(objects.amida.posX+objects.amida.width, objects.amida.posY+objects.amida.height*(2/3))){
		// 接触時
		objects.amida.health -= 1;
		objects.enemys.shift();
		typingObject.best_alphabets_candidate = "";
	}
	for(let i=0; i<objects.enemys.length; i++){
		objects.enemys[i].move();
	}

	// キルカウント
	objects.killCountText.text = String(recordKillCount);

	// 終了条件
	if(objects.amida.health <= 0){
		// 記録
		date = new Date();
		endTime = date.getTime();
		recordClearTime = endTime-startTime;
		recordTypeCount += typingObject.typeCount;
		recordMissTypeCount += typingObject.missTypeCount;

		scene = scenes.result;
		resultOnload();
	}

}
function gameDraw(){
	// BackGroundImage
	objects.bgImage.draw();

	// typingBox
	objects.typingBackGroundBox.draw(); // 背景
	objects.typingBoxSrcTextBox.drawText(); // 漢字
	objects.typingBoxAlp.drawText();

	// keyBoard
	objects.keyBoardImg.draw();

	//amida
	objects.amida.draw();
	objects.amida.healthDraw();

	// boss
	objects.boss.draw();

	// enemy
	for(let i=0; i<objects.enemys.length; i++){
		objects.enemys[i].draw();
	}

	// soul
	objects.soulImg.draw();
	objects.xText.drawText();
	objects.killCountText.drawText();
}

//リザルト画面
function resultOnload(){
	objects = {};
	input = [];
	/* 別画面からゲーム画面へ移動したとき */
	const bgImageSrc = "./src/img/background01.png"
	objects.bgImage = new ImageBox(0, 0, canvasSize[0], canvasSize[1], "rectangle", bgImageSrc);

	// 外枠
	//   サイズ
	const BackGroundWidth = 280;
	const BackGroundHeight = 335;
	//    色
	const BackGroundColor1 = "rgba(0,0,0,0.6)";
	const BackGroundColor2 = "#FFF";
	const BackGroundLineWidth = 1;
	const BackGroundDraw = function(){
		g.fillStyle = BackGroundColor1;
		g.strokeStyle = BackGroundColor2;
		g.lineWidth = BackGroundLineWidth;
		createRoundRectPath(this.posX, this.posY, this.width, this.height, 4);
		g.fill();
		g.stroke();
	}
	objects.GroundBox = new TextBox(canvasSize[0]/2-BackGroundWidth/2, canvasSize[1]/2-BackGroundHeight/2, BackGroundWidth, BackGroundHeight, "rectangle", "");
	objects.GroundBox.draw = BackGroundDraw;

	// textBox(共通部分)
	objects.textBox = [];
	let textColor1 = "#fff";
	let textFont = "16px azuki_font";
	const textBoxDrawText = function(){
		g.fillStyle = textColor1;
		g.font = textFont;
		g.textAlign = "left";
		g.textBaseline = "top";
		g.fillText(this.text, this.posX, this.posY);
	}
	let textTitleFont = "26px azuki_font";
	const resultTitleTextBoxDrawText = function(){
		g.fillStyle = textColor1;
		g.font = textTitleFont;
		g.textAlign = "left";
		g.textBaseline = "top";
		g.fillText(this.text, this.posX, this.posY);
	}
	objects.textTitle = new TextBox(268, 97, 104, 26, "rectangle", "リザルト");
	objects.textBox.push(new TextBox(212, 171, 64, 16, "rectangle", `倒した数: `));
	objects.textBox.push(new TextBox(317, 171, 50, 16, "rectangle", `x ${recordKillCount} 個`));
	objects.textBox.push(new TextBox(212, 203, 64, 16, "rectangle", `タイム:        ${(recordClearTime/1000).toFixed(2)} 秒`));
	objects.textBox.push(new TextBox(212, 239, 64, 16, "rectangle", `タイピング速度:  ${(recordTypeCount/(recordClearTime/1000)).toFixed(2)} type/s`));
	objects.textBox.push(new TextBox(212, 275, 64, 16, "rectangle", `ミスタイプ:      ${recordMissTypeCount}回`));
	objects.textBox.push(new TextBox(212, 311, 64, 16, "rectangle", `正確性:       ${(recordTypeCount/(recordMissTypeCount+recordTypeCount)*100).toFixed(4)} %`));

	// ImageBox
	objects.imgBox = [];
	objects.imgBox.push(new ImageBox(296, 163, 17, 24, "rectangle", "./src/img/soul.png")); // 倒した数のところのsoul

	// textBoxDrawText設定
	objects.textTitle.drawText = resultTitleTextBoxDrawText;
	for(let i=0; i<objects.textBox.length; i++){objects.textBox[i].drawText = textBoxDrawText;};

	// button
	const buttonDraw = function(){
		g.strokeStyle = textColor1;
		createRoundRectPath(this.posX, this.posY, this.width, this.height, 4);
		g.stroke();
	}
	const buttonDrawText = function(){
		g.fillStyle = textColor1;
		g.textAlign = "center";
		g.textBaseline = "middle";
		g.fillText(this.text, this.posX+this.width/2, this.posY+this.height/2);
	}
	// button
	objects.buttons = {};
	objects.images = {};
	//   ランキング登録
	const registRankingButton = new Button(214, 348, 128, 34, "rectangle");
	registRankingButton.text = "ランキング登録";
	registRankingButton.draw = buttonDraw;
	registRankingButton.drawText = buttonDrawText;
	registRankingButton.onClick = function(){
		scene = scenes.registRanking;
		registRankingOnload();
		return true;
	}
	objects.buttons.registRankingButton = registRankingButton;

	//    リスタート
	const restartButton = new Button(350, 348, 34, 34, "rectangle");
	const restartImg = new ImageBox(357, 355, 20, 20, "rectangle", "./src/img/reload.png");
	restartButton.text = "";
	restartButton.draw = buttonDraw;
	// objects.restartButton.drawText = buttonDrawText;
	restartButton.onClick = function(){
		scene = scenes.game;
		gameOnload();
		return true;
	}
	objects.buttons.restartButton = restartButton;
	objects.images.restartImg = restartImg;

	// back
	const backButton = new Button(392, 348, 34, 34, "rectangle");
	const backImg = new ImageBox(399, 355, 20, 20, "rectangle", "./src/img/exit.png");
	backButton.text = "";
	backButton.draw = buttonDraw;
	backButton.onClick = function(){
		scene = scenes.title;
		titleOnLoad();
		return true;
	}
	objects.buttons.backButton = backButton;
	objects.images.backImg = backImg;
}
function resultUpdate(){
	/* リザルト画面の動作処理 */
	// クリック処理
	for(let i=0; i<clickPos.length;i++){
		for(btnName in objects.buttons){
			/* オブジェクトに被った場所をクリックしていたらイベントを実行する */
			if(objects.buttons[btnName].isPointInsideShape(clickPos[i][0], clickPos[i][1])){
				let flg = objects.buttons[btnName].onClick(); // 画面遷移がある場合はreturn がtrue
				if(flg){break;}
			}
		}
	}
	clickPos = [];
}
function resultDraw(){
	// bgImage
	objects.bgImage.draw();
	// 外枠
	objects.GroundBox.draw();
	// textTitle
	objects.textTitle.drawText();
	// textBox
	for(let i=0; i<objects.textBox.length; i++){objects.textBox[i].drawText();}
	// imageBox
	for(let i=0; i<objects.imgBox.length; i++){objects.imgBox[i].draw();}

	// button
	for(btnName in objects.buttons){objects.buttons[btnName].draw();objects.buttons[btnName].drawText();}
	for(imgName in objects.images){objects.images[imgName].draw();objects.images[imgName].draw();}

}

// ランキング画面
async function rankingOnload(){
	objects = {};
	input = [];
	/* 別画面からゲーム画面へ移動したとき */
	const bgImageSrc = "./src/img/background01.png"
	objects.bgImage = new ImageBox(0, 0, canvasSize[0], canvasSize[1], "rectangle", bgImageSrc);

	// 外枠
	//   サイズ
	const BackGroundWidth = 500;
	const BackGroundHeight = 400;
	//    色
	const BackGroundColor1 = "rgba(0,0,0,0.6)";
	const BackGroundColor2 = "#FFF";
	const BackGroundLineWidth = 1;
	const BackGroundDraw = function(){
		g.fillStyle = BackGroundColor1;
		g.strokeStyle = BackGroundColor2;
		g.lineWidth = BackGroundLineWidth;
		createRoundRectPath(this.posX, this.posY, this.width, this.height, 4);
		g.fill();
		g.stroke();
	}
	objects.GroundBox = new TextBox(canvasSize[0]/2-BackGroundWidth/2, canvasSize[1]/2-BackGroundHeight/2, BackGroundWidth, BackGroundHeight, "rectangle", "");
	objects.GroundBox.draw = BackGroundDraw;

	// textBox(共通部分)
	objects.textBox = [];
	let textColor1 = "#fff";
	let textFont = "16px azuki_font";
	const textBoxDrawText = function(){
		g.fillStyle = textColor1;
		g.font = textFont;
		g.textAlign = "left";
		g.textBaseline = "top";
		g.fillText(this.text, this.posX, this.posY);
	}
	let rankingTitleFont = "30px azuki_font";
	const rankingTitleTextBoxDrawText = function(){
		g.fillStyle = textColor1;
		g.font = rankingTitleFont;
		g.textAlign = "left";
		g.textBaseline = "top";
		g.fillText(this.text, this.posX, this.posY);
	}

	// title
	objects.textTitle = new TextBox(245, 60, 104, 26, "rectangle", "ランキング");
	objects.textTitle.drawText = rankingTitleTextBoxDrawText;

	// rankingData
	objects.rankingData = [];
	const querySnapshot = await window.querySnapshot(); //query(collection(db, "rankings"), orderBy("kill", "desc")));
	const rankindDataFont = "30px azuki_font";
	const rankindDataDrawText = function(){
		g.fillStyle = textColor1;
		g.font = rankindDataFont;
		g.textAlign = "center";
		g.textBaseline = "top";
		g.fillText(this.text, this.posX+this.width/2, this.posY);
	}
	let index=0;
	querySnapshot.forEach((doc) => {
		let data = doc.data();
		let rankingData = new TextBox(canvasSize[0]/2-BackGroundWidth/2, 130+60*index, BackGroundWidth, 50, "rectangle", `${data.name}   ${data.kill}`);
		console.log(data);
		rankingData.drawText = rankindDataDrawText;
		objects.rankingData.push(rankingData);
		index++;
	});

	// back
	objects.buttons = {};
	objects.images = {};

	let backButtonPosX = 15
	let backButtonPosY = 15
	const backButton = new Button(backButtonPosX, backButtonPosY, 34, 34, "rectangle");
	const backImg = new ImageBox(backButtonPosX+7, backButtonPosY+7, 20, 20, "rectangle", "./src/img/exit.png");
	backButton.text = "";
	backButton.draw = function(){
		g.strokeStyle = textColor1;
		createRoundRectPath(this.posX, this.posY, this.width, this.height, 4);
		g.stroke()
	}
	backButton.onClick = function(){
		scene = scenes.title;
		titleOnLoad();
		return true;
	}
	objects.buttons.backButton = backButton;
	objects.images.backImg = backImg;
	
}
function rankingUpdate(){
	// クリック処理
	for(let i=0; i<clickPos.length;i++){
		for(btnName in objects.buttons){
			/* オブジェクトに被った場所をクリックしていたらイベントを実行する */
			if(objects.buttons[btnName].isPointInsideShape(clickPos[i][0], clickPos[i][1])){
				let flg = objects.buttons[btnName].onClick(); // 画面遷移がある場合はreturn がtrue
				if(flg){break;}
			}
		}
	}
	input = [];
}
function rankingDraw(){
	// bgImage
	objects.bgImage.draw();
	// 外枠
	objects.GroundBox.draw();
	// title
	objects.textTitle.drawText();
	// rankingData
	for(let i=0; i<objects.rankingData.length; i++){objects.rankingData[i].drawText();}
	// back button
	for(btnName in objects.buttons){objects.buttons[btnName].draw();objects.buttons[btnName].drawText();}
	for(imgName in objects.images){objects.images[imgName].draw();objects.images[imgName].draw();}
}

// registRanking
function registRankingOnload(){
	objects = {};
	input = [];
	/* 別画面からゲーム画面へ移動したとき */
	const bgImageSrc = "./src/img/background01.png"
	objects.bgImage = new ImageBox(0, 0, canvasSize[0], canvasSize[1], "rectangle", bgImageSrc);

	// 外枠
	//   サイズ
	const BackGroundWidth = 280;
	const BackGroundHeight = 335;
	//    色
	const BackGroundColor1 = "rgba(0,0,0,0.6)";
	const BackGroundColor2 = "#FFF";
	const BackGroundLineWidth = 1;
	const BackGroundDraw = function(){
		g.fillStyle = BackGroundColor1;
		g.strokeStyle = BackGroundColor2;
		g.lineWidth = BackGroundLineWidth;
		createRoundRectPath(this.posX, this.posY, this.width, this.height, 4);
		g.fill();
		g.stroke();
	}
	objects.GroundBox = new TextBox(canvasSize[0]/2-BackGroundWidth/2, canvasSize[1]/2-BackGroundHeight/2, BackGroundWidth, BackGroundHeight, "rectangle", "");
	objects.GroundBox.draw = BackGroundDraw;

	// textBox(共通部分)
	objects.textBox = [];
	let textColor1 = "#fff";
	let textFont = "16px azuki_font";
	const textBoxDrawText = function(){
		g.fillStyle = textColor1;
		g.font = textFont;
		g.textAlign = "left";
		g.textBaseline = "top";
		g.fillText(this.text, this.posX, this.posY);
	}
	let registRankingTitleFont = "20px azuki_font";
	const registRankingTitleTextBoxDrawText = function(){
		g.fillStyle = textColor1;
		g.font = registRankingTitleFont;
		g.textAlign = "center";
		g.textBaseline = "middle";
		g.fillText(this.text, this.posX+this.width/2, this.posY+this.height/2);
	}
	// title
	objects.textTitle = new TextBox(canvasSize[0]/2-BackGroundWidth/2, 103, BackGroundWidth, 26, "rectangle", "ランキング登録");
	objects.textTitle.drawText = registRankingTitleTextBoxDrawText;

	objects.textBox.push(new TextBox(canvasSize[0]/2-BackGroundWidth/2, 184, BackGroundWidth, 35, "rectangle", "登録する名前"));
	for(let i=0; i<objects.textBox.length; i++){objects.textBox[i].drawText = function(){
		g.fillStyle = textColor1;
		g.font = textFont;
		g.textAlign = "center";
		g.textBaseline = "top";
		g.fillText(this.text, this.posX+this.width/2, this.posY);
	}}
	// nameTextBox
	const nameTextBoxWidth = 144;
	objects.nameTextBox = new TextBox(canvasSize[0]/2-nameTextBoxWidth/2, 220, nameTextBoxWidth, 35, "rectangle", "player");
	objects.nameTextBox.drawText = function(){
		g.fillStyle = textColor1;
		g.font = textFont;
		g.textAlign = "left";
		g.textBaseline = "middle";
		g.fillText(this.text, this.posX+this.width*0.1, this.posY+this.height/2);
	};
	objects.nameTextBox.draw = function(){
		g.fillStyle = textColor1;
		createRoundRectPath(this.posX, this.posY, this.width, this.height, 4);
		g.stroke();
	}

	// ボタン
	const sendButtonWidth = 145;
	objects.sendButton = new Button(canvasSize[0]/2-sendButtonWidth/2, 348, sendButtonWidth, 34, "rectangle");
	objects.sendButton.text = "送信ボタン";
	objects.sendButton.draw = function(){
		g.strokeStyle = textColor1;
		createRoundRectPath(this.posX, this.posY, this.width, this.height, 4);
		g.stroke();
	}
	objects.sendButton.drawText = function(){
		g.fillStyle = textColor1;
		g.font = textFont;
		g.textAlign = "center";
		g.textBaseline = "middle";
		g.fillText(this.text, this.posX+this.width/2, this.posY+this.height/2);
	}
	objects.sendButton.onClick = function(){
		window.sendScore(objects.nameTextBox.text, recordKillCount, recordClearTime);
		scene = scenes.rankings;
		rankingOnload();
		return true;
	}

}
function registRankingUpdate(){
	/* ランキング登録画面の動作処理 */
	// クリック処理
	for(let i=0; i<clickPos.length;i++){
		if(objects.sendButton.isPointInsideShape(clickPos[i][0], clickPos[i][1])){
			let flg = objects.sendButton.onClick();
			if(flg){break;}
		}

	}
	clickPos = [];
	// 
	for(let i=0; i<input.length; i++){
		if(input[i].length==1){
			objects.nameTextBox.text += input[i];
		} else{
			switch(input[i]){
				case "Backspace":
					objects.nameTextBox.text = objects.nameTextBox.text.slice(0,-1);
					break;
			}
		}
	}
	input = []
}
function registRankingDraw(){
	// bgImage
	objects.bgImage.draw();
	// 外枠
	objects.GroundBox.draw();
	// textTitle
	objects.textTitle.drawText();
	// nameTextBox
	objects.nameTextBox.draw();
	objects.nameTextBox.drawText();
	// その他テキスト
	for(let i=0; i<objects.textBox.length; i++){objects.textBox[i].drawText();}
	// sendButton
	objects.sendButton.draw();
	objects.sendButton.drawText();
}