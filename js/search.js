var alert = document.getElementById('error');
var button = document.querySelector('.button');
var input = document.getElementById('search');

button.addEventListener('click', checkInput);

function checkInput(e) {
	e.preventDefault();

	if(input.value === "") {
		alert.innerHTML = "";
		var span = document.createElement('span');
		span.innerHTML = "You need to enter a search term before pressing submit";
		alert.appendChild(span);
		input.setAttribute('aria-invalid', true);
		input.focus();
	}
  else 
    console .log("ele");
}
window.onload = function() {
	//alert.setAttribute('aria-hidden', true);
};
