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

//ecoute du clavier.
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

//lancement du prechargement.
function startGame(){
	preloadAssets();
}

//prechargement.
function preloadAssets(){
	imgJoueur.onload = preloadUpdate();
	imgJoueur.src = "defaultJoueur.png";
	imgBackground.onload = preloadUpdate();
	imgBackground.src = "defaultBackground.png";
}

//lancement du jeu si prechargement fini.
function preloadUpdate(){
	preloadCount++;
	if(preloadCount == PRELOADTOTAL){
		launchGame();
	}
}

//mise en place des elements du jeu.
function launchGame(){
	stage = new createjs.Stage(document.getElementById("gameCanvas"));

	objJoueur = new createjs.Bitmap(imgJoueur);
	stage.addChild(objJoueur);

	objBackground = new createjs.Bitmap(imgBackground);
	stage.addChild(objBackground);

	HUDText = new createjs.Text("HUD", "24px Arial", "#000000");
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

//lancement nouvelle partie + reinitialisation variables partie.
function newGame(){
	inMenu = false;
	HUDText.visible = true;
	menuText[0].visible = false;
	menuText[1].visible = false;
	objJoueur.visible = false;	
}

//fin de partie.
function endGame(){
	inMenu = true;	
	menuText[0].visible = true;
	menuText[1].visible = true;
	objJoueur.visible = false;
	HUDText.visible = false;
}

//Tick du jeu.
function mainTick(){
	if(inMenu){
		if(32 in touches){
			newGame();
		}
	}
	else{
		/*code du jeu
		if(condition de fin){
			endGame();
		}*/
	}
	stage.update();
} 
