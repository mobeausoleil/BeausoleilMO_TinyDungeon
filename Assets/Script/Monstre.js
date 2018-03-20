#pragma strict

//Script qui fait disparaitre les monstres quand ils sont frappés par le personnage

var monstre : GameObject;


function Start () {

}

function Update () {

}

function OnTriggerEnter2D(info: Collider2D) { // désactive les monstres

	if(info.gameObject.name == "Perso"){

		monstre.SetActive(false);

	}
	
}