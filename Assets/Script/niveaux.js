#pragma strict

//Script qui controle les différents niveaux et menus

//Les gameObjects importants
private var perso : GameObject;
private var cam : GameObject;
private var interf : GameObject;
private var drag : GameObject;

//Les musiques principales du jeu
var musique1 : AudioClip; // musique du menu
var musique2 : AudioClip; // musique en jeu


function Start () {

	//Cherche les gameObjects
	perso = GameObject.Find("Perso");
	cam = GameObject.Find("Camera");
	interf = GameObject.Find("Canvas");
	drag = GameObject.Find("Dragon");

	//Initialise le jeu au menu principal
	MenuPrincipal();
}

function MenuPrincipal(){ //Pour initialiser le menu principal

	//Place la caméra 
	var limite1 = Vector2(-23.2,-0.4);
	var limite2 = Vector2(-23.2,-0.4);

	cam.GetComponent(cameraPrin).limite1 = limite1;
	cam.GetComponent(cameraPrin).limite2 = limite2;

	//désactive l'interface de jeu
	interf.SetActive(false);

	//désactive les controles du personnage
	perso.GetComponent(Controle).estMort = true;

	//fait jouer la musique du menu
	gameObject.GetComponent(AudioSource).Stop();
	gameObject.GetComponent(AudioSource).PlayOneShot(musique1);

}

function Instructions(){ //Pour initialiser les instructions du jeu

	//Place la caméra 
	var limite1 = Vector2(-42.3,-0.4);
	var limite2 = Vector2(-42.3, 0.4);

	cam.GetComponent(cameraPrin).limite1 = limite1;
	cam.GetComponent(cameraPrin).limite2 = limite2;
}

function EcranMort(){ //Pour initialiser l'écran de mort du joueur
	
	//Place la caméra 
	var resurrection = Vector2(-7,-1.5);
	var limite1 = Vector2(-42.3,-11.95);
	var limite2 = Vector2(-42.3,-11.95);

	perso.transform.position = resurrection;
	cam.GetComponent(cameraPrin).limite1 = limite1;
	cam.GetComponent(cameraPrin).limite2 = limite2;

	//désactive l'interface de jeu
	interf.SetActive(false);

	//désactive les controles du personnage
	perso.GetComponent(Controle).estMort = true;
}

function EcranVictoire(){ //Pour initialiser l'écran de victoire à la fin du jeu

	//Place la caméra et le personnage
	var resurrection = Vector2(-7,-1.5);
	var limite1 = Vector2(-23.2,-11.95);
	var limite2 = Vector2(-23.2,-11.95);

	perso.transform.position = resurrection;
	cam.GetComponent(cameraPrin).limite1 = limite1;
	cam.GetComponent(cameraPrin).limite2 = limite2;

	//désactive l'interface de jeu
	interf.SetActive(false);

	//désactive les controles du personnage
	perso.GetComponent(Controle).estMort = true;
}

function Niveau1(){ //Pour initialiser le niveau 1

	//Place la caméra et le personnage
	var resurrection = Vector2(-7,-1.5);
	var limite1 = Vector2(0,-11);
	var limite2 = Vector2(18,-0.43);

	perso.transform.position = resurrection;
	cam.GetComponent(cameraPrin).limite1 = limite1;
	cam.GetComponent(cameraPrin).limite2 = limite2;

	//fait jouer la musique principale du jeu
	gameObject.GetComponent(AudioSource).Stop();
	gameObject.GetComponent(AudioSource).PlayOneShot(musique2);

	//active l'interface
	interf.SetActive(true);

	//Initialise les composantes de l'interface et active les controles
	perso.GetComponent(Controle).estMort = false;
	perso.GetComponent(Controle).vie = 3;
	perso.GetComponent(Controle).nbPiece = 0;
	perso.GetComponent(Controle).nbClef = 0;

}

function Niveau2(){ //Pour initialiser le niveau 2

	//Place la caméra et le personnage
	var resurrection = Vector2(36.5,-1);
	var limite1 = Vector2(43.5,-11);
	var limite2 = Vector2(61,-0.43);

	perso.transform.position = resurrection;
	cam.GetComponent(cameraPrin).limite1 = limite1;
	cam.GetComponent(cameraPrin).limite2 = limite2;

}

function Niveau3(){ //Pour initialiser le niveau 3

	//Place la caméra et le personnage
	var resurrection = Vector2(79,0.6);
	var limite1 = Vector2(86.5,-11);
	var limite2 = Vector2(104,-0.43);

	perso.transform.position = resurrection;
	cam.GetComponent(cameraPrin).limite1 = limite1;
	cam.GetComponent(cameraPrin).limite2 = limite2;

}

function Niveau4(){ //Pour initialiser le niveau 4

	//Place la caméra, le personnage et initialise le dragon
	var resurrection = Vector2(121.5,0.6);
	var limite1 = Vector2(128.8,-11);
	var limite2 = Vector2(146.2,-0.43);

	drag.GetComponent(Dragon).vieDrag = 3;

	perso.transform.position = resurrection;
	drag.transform.position = Vector2(152.5,-0.8);
	cam.GetComponent(cameraPrin).limite1 = limite1;
	cam.GetComponent(cameraPrin).limite2 = limite2;
}