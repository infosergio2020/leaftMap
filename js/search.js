import { filterMarker2 } from "./map.js";
var alert = document.getElementById('error');
var button = document.querySelector('.button-search');
var input = document.getElementById('search');
var span = document.createElement('span');

function validarEscritura(check){
	if (!check){
		span.innerHTML = "Ingresa el nombre de la persona que desea buscar";
		alert.appendChild(span);
		input.setAttribute('aria-invalid', true);
	}
	else{
		console.log("valido");
		span.innerHTML = "";
		if (alert.hasChildNodes())
			span = alert.removeChild(span);
		input.setAttribute('aria-invalid', false);
	}
}
button.addEventListener('click', checkInput);
/**
 * chequea una unica vez cuando se realiza click al boton button
 * @param {*} e evento click 
 */
function checkInput(e) {
	e.preventDefault();
    let nombre_busqueda = input.value.trim(); //trim() elimina espacios en blanco de los extremos del string
	if(nombre_busqueda === "") { //caso que deje input en blanco
		alert.innerHTML = "";
		validarEscritura(false);
		input.focus();
	}
  else {
      nombre_busqueda = nombre_busqueda.toLowerCase();
      console.log(nombre_busqueda);
      //Busco mediante la lista de nombres
      filterMarker2(nombre_busqueda);
  }
}
input.setAttribute('aria-label','Escriba el nombre de la persona que desea buscar y luego presione Enter.');
input.addEventListener('keypress',function(event){	
	if (event.keyCode === 13){
		event.preventDefault();
		console.log("evento keyup");
		button.click();
		return false;
	}
	else {console.log("no es enter");validarEscritura(true);}
});

window.onload = function() {
	//alert.setAttribute('aria-hidden', true);
};
