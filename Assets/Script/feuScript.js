#pragma strict

//Script qui détruit les boules de feu quand elle touche quelque chose

function Start () {

}

function Update () {

}

function OnCollisionEnter2D() { // détruit les boules de feu


	Destroy(gameObject);
	
}