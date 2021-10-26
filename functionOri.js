// ori prueba esconder los controles de zoom
const hideZoomControl = function(){
    console.log('hideZoomControl its running!!!');
    let elementos = document.querySelectorAll(".leaflet-control a");
    elementos.forEach(item => {
        item.setAttribute("aria-hidden", "true")
        item.setAttribute("tabindex", "-1");//no lo enfoques
    })
}

// ori termina de ver esconder los markers
const hideMaker = function(titulos){
    console.log('hideMaker its running!!!');
    let elements = document.querySelectorAll(".leaflet-marker-icon");
    for (var i = 0; i < elements.length; ++i) {
        elements[i].setAttribute("alt", titulos[i]);
        elements[i].setAttribute("tabindex", "0");
        } 
}

export {
    hideMaker,
    hideZoomControl
}