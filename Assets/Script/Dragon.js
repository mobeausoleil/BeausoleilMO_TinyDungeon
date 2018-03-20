#pragma strict

//Script qui controle les actions du dragon


var feu : GameObject; // les boules de feu à créer

var vieDrag : float = 3; //les vies restantes du dragon

//La range pour faire apparaitre les boules de feu
private var rangeFeu1: float = 1;
private var rangeFeu2: float = -1;

function Start () {

	InvokeRepeating("CreationObjet", 0, 2); // Fait apparaite une boule de feu tous les 2 secondes

}


function CreationObjet(){ // Créer la boule de feu

	var posY = Random.Range(rangeFeu1,rangeFeu2);
	var obj = Instantiate(feu, Vector2(150,posY), Quaternion.identity);
	obj.SetActive(true);
	obj.GetComponent(Rigidbody2D).AddForce(Vector2(-200,0));

}

function OnTriggerEnter2D(info: Collider2D) { // controle des collisions

	if(info.gameObject.name == "Perso"){ //Ce qui arrive quand le personnage principale frappe le dragon avec son épée

		if(vieDrag == 3){ //La dragon descend d'un étage et la première dalle disparait

			rangeFeu1 = -5;
			rangeFeu2 = -8;
			gameObject.transform.position = Vector2(152.5,-8.5);
			GameObject.Find("solDest1").SetActive(false);
			vieDrag = vieDrag-1;
		}

		else if(vieDrag == 2){ //La dragon descend d'un étage et la deuxième dalle disparait

			rangeFeu1 = -12;
			rangeFeu2 = -15;
			gameObject.transform.position = Vector2(152.5,-15.5);
			GameObject.Find("solDetruit").SetActive(false);
			vieDrag = vieDrag-1;
		}

		else if(vieDrag == 1){ //La dragon est vaincu et le joueur gagne la partie
			GameObject.Find("controlNiveau").GetComponent(niveaux).EcranVictoire();
		}

	}
	
}