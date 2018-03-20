#pragma strict

//Script qui controle la caméra principale pour qu'elle suivent le personnage

var limite1 : Vector2;
var limite2 : Vector2;

var cible : GameObject;


function Update () {

	//Positionne la caméra
	transform.position.x = cible.transform.position.x;
	transform.position.y = cible.transform.position.y;

	//limite en x et en y de la caméra
	transform.position.y = Mathf.Clamp(transform.position.y, limite1.y, limite2.y);
	transform.position.x = Mathf.Clamp(transform.position.x, limite1.x, limite2.x);

}