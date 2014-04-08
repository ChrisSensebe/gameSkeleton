var PRELOADTOTAL = 2;
var preloadCount = 0;

var touches = {};

var objJoueur;
var imgJoueur = new Image();
var objBackground ;
var imgBackground = new Image();

function loadDefault(){
	//reinitialisation des variables au debut d'une nouvelle partie.
	}

//ecoute du clavier
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

//demarage du jeu
function startGame(){
	preloadAssets();
}

function preloadAssets(){
	imgJoueur.onload = preloadUpdate();
	//imgJoueur.src =;
	imgBackground.onload = preloadUpdate();
	//imgBarriere.src =;
}

//verif que tt est chargé
function preloadUpdate(){
	preloadCount++;
	if(preloadCount == PRELOADTOTAL){
		launchGame();
	}
}

//creation des elements du jeu
function launchGame(){
	stage = new createjs.Stage(document.getElementById("gameCanvas"));

	objJoueur = new createjs.Bitmap(imgJoueur);
	stage.addChild(objJoueur);
	/*objJoueur.x = ;
	objJoueur.y = ;*/

	objBackground = new createjs.Bitmap(imgBackground);
	stage.addChild(objBackground);
	/*objBarriere.x = ;
	objBarriere.y = ;*/

	HUDTexte = new createjs.Text("HUD", "24px Arial", "#000000");
	scoreTexte.x = 8;
	scoreTexte.y = 450;
	stage.addChild(HUDTexte);

	createjs.Ticker.setFPS(30);
	createjs.Ticker.addEventListener("tick",mainTick);
}

//Tick du jeu
function mainTick(){
	//the game
} 
