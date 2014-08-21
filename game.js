var PRELOADTOTAL = 2;
var preloadCount = 0;
var touches = {};
var HUDText;
var menuText = [];
var inMenu = true;
var objJoueur;
var imgJoueur = new Image();
var objBackground;
var imgBackground = new Image();
var timer;
var paused;

//event listeners
addEventListener("keydown",
	function(e){
	touches[e.keyCode] = true;
	if((e.keyCode >= 37)&&(e.keyCode <= 40)){
		e.preventDefault();
	}
});

addEventListener("keyup",
function(e){
	delete touches[e.keyCode];
});

//satrting game engine
function startGame(){
	preloadAssets();
}

addEventListener("keypress",
function(e){
	if(e.keyCode == 32){
		paused = !paused;
	}
})

//preloading
function preloadAssets(){
	imgJoueur.onload = preloadUpdate();
	imgJoueur.src = "defaultJoueur.png";
	imgBackground.onload = preloadUpdate();
	imgBackground.src = "defaultBackground.png";
}

//game launch after preloading is done
function preloadUpdate(){
	preloadCount++;
	if(preloadCount == PRELOADTOTAL){
		launchGame();
	}
}

//adding game elements to stage
function launchGame(){
	stage = new createjs.Stage(document.getElementById("gameCanvas"));

	objBackground = new createjs.Bitmap(imgBackground);
	stage.addChild(objBackground);

	objJoueur = new createjs.Bitmap(imgJoueur);
	objJoueur.x = 300;
	objJoueur.y = 220;
	stage.addChild(objJoueur);

	HUDText = new createjs.Text("End game in : ", "24px Arial", "#000000");
	HUDText.x = 8;
	HUDText.y = 450;
	stage.addChild(HUDText);

	for(var i=0;i<2;i++){
		menuText[i] = new createjs.Text("", "36px Arial", "#000000");
		menuText[i].textAlign = "center";
		menuText[i].x = 320;
		menuText[i].y = 150 + i*48;
		if(i==0){
			menuText[i].text = "Menu";
		}
		else{
			menuText[i].text = "Press space to play"
		}
		stage.addChild(menuText[i]);
	}

	HUDText.visible = false;
	objJoueur.visible = false;

	createjs.Ticker.setFPS(30);
	createjs.Ticker.addEventListener("tick",mainTick);
}

//launching new game session
function newGame(){
	inMenu = false;
	menuText[0].visible = false;
	menuText[1].visible = false;
	HUDText.visible = true;
	objJoueur.visible = true;
	timer = 600;
	paused = false;
}

//ending game session
function endGame(){
	inMenu = true;	
	menuText[0].visible = true;
	menuText[1].visible = true;
	objJoueur.visible = false;
	HUDText.visible = false;
}

//player inputs
function inputs(){
	if(37 in touches){
		objJoueur.x -=2;
		if (objJoueur.x <= -50) {
			objJoueur.x = 640;
		}
	}
	if(38 in touches){
		objJoueur.y -=2;
		if (objJoueur.y <= -50) {
			objJoueur.y = 480;
		}
	}
	if(39 in touches){
		objJoueur.x += 2;
		if(objJoueur.x > 640){
			objJoueur.x = -50;
		}
	}
	if(40 in touches){
		objJoueur.y += 2;
		if(objJoueur.y > 480){
			objJoueur.y = -50;
		}
	}
}

//box level collision detection
function boxCollisionDetection (box1, box2) {
	var widthCollide = (box1.x > (box2.x-box1.width) && box1.x < (box2.x+box2.width));
	var heightCollide = (box1.y > (box2.y-box1.height) && box1.y < (box2.y+box2.height));
	return (widthCollide && heightCollide);
}

//pixel level collision detection
function pixelLevelCollision(box1,box2){

	var collisionBoxX = box1.x < box2.x ? box2.x : box1.x;
	var collisionBoxY = box1.y < box2.y ? box2.y : box1.y;
	var xMax = (box1.width + box1.x) < (box2.width + box2.x) ? (box1.width + box1.x) : (box2.width + box2.x);
	var collisionBoxWidth = xMax - collisionBoxX;
	var yMax = (box1.height + box1.y) < (box2.height + box2.y) ? (box1.height + box1.y) : (box2.height + box2.y);
	var collisionBoxHeight = yMax - collisionBoxY;

	var canvas1 = document.getElementById("gameCanvas");
	var context1 = canvas1.getContext('2d');
	context1.clearRect (0 ,0 ,640 ,480 );
	context1.drawImage(box1.image, box1.x, box1.y);
	var box1Data = context1.getImageData(collisionBoxX, collisionBoxY, collisionBoxWidth, collisionBoxHeight).data;

	var canvas2 = document.getElementById("gameCanvas");
	var context2 = canvas2.getContext('2d');
	context2.clearRect (0 ,0 ,640 ,480 );
	context2.drawImage(box2.image, box2.x, box2.y);
	var box2Data = context2.getImageData(collisionBoxX, collisionBoxY, collisionBoxWidth, collisionBoxHeight).data;

	for (var i = 3; i < box1Data.length; i += 4) {
		if (box1Data[i]>0 && box2Data[i]>0) {
			return true;
		};
	};

	return false;
}

//game tick
function mainTick(){
	if(inMenu){
		if(32 in touches){
			newGame();
		}
	}
	else{
		if (timer == 0) {
			endGame();
		}
		if(paused){
			createjs.Ticker.SetPaused(true);
		}
		inputs();
		HUDText.text = "End game in : " + Math.round(timer/30) + " s";
		timer--;
	}
	stage.update();
} 
