import { filterMarker2 } from "./map.js";
var alert = document.getElementById('error');
var button = document.querySelector('.button-search');
var input = document.getElementById('search');

button.addEventListener('click', checkInput);

function checkInput(e) {
	e.preventDefault();
    let nombre_busqueda = input.value.trim(); //trim() elimina espacios en blanco de los extremos del string
	if(nombre_busqueda === "") {
		alert.innerHTML = "";
		var span = document.createElement('span');
		span.innerHTML = "Ingresa el nombre de la persona que desea buscar";
		alert.appendChild(span);
		input.setAttribute('aria-invalid', true);
		input.focus();
	}
  else {
      nombre_busqueda = nombre_busqueda.toLowerCase();
      console.log(nombre_busqueda);
      //Busco mediante la lista de nombres
      filterMarker2(nombre_busqueda);
  }
}
window.onload = function() {
	//alert.setAttribute('aria-hidden', true);
};
