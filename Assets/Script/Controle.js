#pragma strict

//Script qui controle le personnage et la majorité des intéractions

//Nombres modifiables
var ForceX : float;
var vitMax : float;
var ForceY : float;
var vie : float = 3;
var nbPiece : float = 0;
var nbClef : float = 0;

//textes pour l'interface
var score : UI.Text;
var vieTexte : UI.Text;
var clefText : UI.Text;

//controle des sons interractifs
var sonClef : AudioClip;
var sonFontaine : AudioClip;
var sonVendeur : AudioClip;

//controle des variable de type booléens
var estMort : boolean = false;
private var saut:boolean = false;
private var surPlancher : boolean;
private var activePorte : boolean = false;
private var activeFontaine : boolean = false;
private var activeVendeur : boolean = false;

//autres variable
private var anim : Animator; //Accède à l'animator
var porte : GameObject; //Accède à la porte qu'on peut ouvrir avec une clef
private var rb : Rigidbody2D; //Accède au rigidbody du personnage



function Start () {
	//Initialisation des variables importantes
	rb = GetComponent(Rigidbody2D);
	score.text = "Pièce : "+nbPiece;
	vieTexte.text = "Vie: "+vie;
	clefText.text = "Clef: "+nbClef;
	anim = GetComponent(Animator);
	
}

function Update () {

	//Update l'interface pour montre l'inventaire et les vies en tout temps
	score.text = "Pièce : "+nbPiece;
	vieTexte.text = "Vie: "+vie;
	clefText.text = "Clef: "+nbClef;


	if(!estMort){ // Active les controles
		
		if(Input.GetKeyDown("s")){ //pour sauter
			saut = true;
		}

		if(Input.GetKeyDown("w")){ //controle l'attaque du personnage
		anim.SetBool("attaque",true);
		GetComponent(CircleCollider2D).enabled = true;
		}
		if(Input.GetKeyUp("w")){
			anim.SetBool("attaque",false);
			GetComponent(CircleCollider2D).enabled = false;
		}

		if(activePorte){ // permer d'ouvrir la grande porte du niveau 1
			if(Input.GetKeyDown("e")){
				//porte.GetComponent(Animator).SetBool("open", true);
				porte.GetComponent(Animator).SetTrigger("open2");
				nbClef = nbClef-1;
				activePorte = false;
			}
		}

		if(activeFontaine){ //permet de payer la fontaine pour recharger ses vies à 3
			if(Input.GetKeyDown("e")){

				gameObject.GetComponent(AudioSource).PlayOneShot(sonFontaine);
				nbPiece = nbPiece - 8;
				vie = 3;
				activeFontaine = false;
			}
		}

		if(activeVendeur){ //permet de payer le vendeur pour gagner 3 vies suplémentaires
			if(Input.GetKeyDown("e")){

				gameObject.GetComponent(AudioSource).PlayOneShot(sonVendeur);
				nbPiece = nbPiece - 15;
				vie = vie + 3;
				activeVendeur = false;
			}
		}
	}
}



function FixedUpdate () {
	if(!estMort){ //Controle du personnage de base

		var depX = Input.GetAxis("Horizontal") * ForceX;
		var vitAbs:float = Mathf.Abs(vitMax);
		var vitLimit:float = Mathf.Clamp(vitMax, -1, 1);
		var vitX:float = rb.velocity.x;

		if(vitX > -vitMax && vitX < vitMax){
			rb.AddForce(Vector2(depX,0));
		}

		if(saut){ //Sauter
			rb.AddForce(Vector2(0,ForceY), ForceMode2D.Impulse);
			saut=false;
		}

		if(depX > 0){ //tourner le personnage dans le bon sens
			GetComponent(SpriteRenderer).flipX = false;
//			transform.localScale.x=Mathf.Abs(transform.localScale.x);
			anim.SetBool("marche",true);
		}

		if(depX < 0){//tourner le personnage dans le bon sens
			GetComponent(SpriteRenderer).flipX = true;
//			transform.localScale.x=-Mathf.Abs(transform.localScale.x);
			anim.SetBool("marche",true);
			
		}

		if(depX == 0) { // désactiver la marche
			anim.SetBool("marche",false);
		}
	}
}


function OnCollisionEnter2D(objetTouche : Collision2D) { //Controle des collisions et des intéractions

	var objetNom : String = objetTouche.gameObject.name;
	var objetTag : String = objetTouche.gameObject.tag;

	if(objetTag == "monstre"){ //ce qui arrive quand on touche un monstre
		if(vie <= 1){ //s'il ne nous reste plus de vie
			vie = vie-1;
			estMort = true;
			yield WaitForSeconds(1);
			GameObject.Find("controlNiveau").GetComponent(niveaux).EcranMort();
		}
		else { // s'il nous reste des vies
			vie = vie-1;
		}
	}

	if(objetNom == "Lave"){ // mort automatique quand on touche la lave
	    estMort = true;
	    yield WaitForSeconds(1);
		GameObject.Find("controlNiveau").GetComponent(niveaux).EcranMort();
	}

	if(objetNom == "porteCoulissante" && nbClef>=1){ //Pour activer la porte coulissante (grande porte du niveau 1)
		activePorte = true;
	}

	if(objetNom == "porte1"){ //Ce qui arrive quand on touche la porte 1 du donjon numéro 1 (Va au prochain niveau)
		GameObject.Find("controlNiveau").GetComponent(niveaux).Niveau2();
	}

	if(objetNom == "porte2"){ //Ce qui arrive quand on touche la porte 2 du donjon numéro 1 (Va au prochain niveau)
		GameObject.Find("controlNiveau").GetComponent(niveaux).Niveau3();
	}

	if(objetNom == "porte3"){//Ce qui arrive quand on touche la porte 3 du donjon numéro 2 (Va au prochain niveau)
		GameObject.Find("controlNiveau").GetComponent(niveaux).Niveau4();
	}

	if(objetNom == "porte4" && nbClef >= 3){//Ce qui arrive quand on touche la porte 4 du donjon numéro 3 (Va au prochain niveau) Il faut avoir ramasser 3 clefs

		nbClef = nbClef-3;
		GameObject.Find("controlNiveau").GetComponent(niveaux).Niveau4();
	}

	if(objetNom == "fontaine" && nbPiece >= 8){ //pour activer la fontaine (Il faut avoir au moins 8 pièces d'or)
		
		activeFontaine = true;
	}

	if(objetNom == "vendeur" && nbPiece >= 15){//pour activer le vendeur (Il faut avoir au moins 15 pièces d'or)
		
		activeVendeur = true;
	}

	if(objetNom == "bouleFeu(Clone)"){ //Quand on touche une boule de feu
		if(vie <= 1){ //s'il nous ne reste plus de vie
			vie = vie-1;
			estMort = true;
			yield WaitForSeconds(1);
			GameObject.Find("controlNiveau").GetComponent(niveaux).EcranMort();
		}
		else { // s'il nous reste des vies
			vie = vie-1;
		}
	}
}

function OnTriggerEnter2D(info: Collider2D){
	var touche = info.gameObject.name;

	if(touche == "Piece"){ //Pour ramasser des pièces d'or
		info.gameObject.SetActive(false);
		nbPiece++;
	}

	if(touche == "clef"){ //Pour ramasser des clefs
	    info.gameObject.SetActive(false);
	    nbClef++;
	    gameObject.GetComponent(AudioSource).PlayOneShot(sonClef);
	}

}