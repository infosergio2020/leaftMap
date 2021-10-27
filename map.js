
var titulos=["Maria.","Jose.","Julieta.","Paula.","Pedro.","Juan."];
for (var i = 0; i < titulos.length; ++i) {
    titulos[i]="Presiona enter para escuchar la entrevista de "+titulos[i];
}

//Create my map 
var mymap = L.map('mapid').setView([-34.91018,-57.94452], 12);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    maxZoom: 18,
    id: 'mapbox/streets-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWl6enkyMDIiLCJhIjoiY2t0aHVtNWI0MHZuODJ3dWU2OGdjZjBxMiJ9.Z5oB_qULFlnOpBwo10mT-A'
}).addTo(mymap);

//Add geojson 
L.geoJSON(inundaciones).addTo(mymap)

//Create an icon 
var LeafletIcon = L.Icon.extend({
    options: {
        iconSize: [38,95],
        iconAnchor: [22,94],
        popupAnchor: [3,76]
    }
})
var personIcon = new LeafletIcon ({
    iconUrl: 'marcador_ori.png'
})

/*L.marker([-34.91018, -57.94452],{icon:personIcon}).bindTooltip("Entrevista 1.").addTo(mymap)
    .bindPopup(`
    <h1 tabindex=0 >Juan. Barrio: La Plata.</h1>
    <iframe tabindex=0 width="260" height="315" src="https://www.youtube.com/embed/cCJEH0NCbBY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `);
*/

//Functions
const hideMaker = function(titulos){
    console.log('hideMaker its running!!!');
    let elements = document.querySelectorAll(".leaflet-marker-icon");
    for (var i = 0; i < elements.length; ++i) {
        elements[i].setAttribute("alt", titulos[i]);
        elements[i].setAttribute("tabindex", "0");
        } 
}
// ori prueba esconder los controles de zoom
const hideZoomControl = function(){
    console.log('hideZoomControl its running!!!');
    let elementos = document.querySelectorAll(".leaflet-control a");
    elementos.forEach(item => {
        item.setAttribute("aria-hidden", "true")
        item.setAttribute("tabindex", "-1");//no lo enfoques
    })
}

/*****
 * link: contiene url de youtube
 ****/
function searchID(id){
    return document.getElementById(id);
}
/***
 * Divide el texto pasado por parametro en un arreglo de cadenas
 */
function decompose(text){
    var separador = ".";
    return text.split(separador);
}
function assignedText(cadena){
    if (cadena !== null){
        //console.log(cadena.length);
        var t;
        for (var i=0; i < cadena.length; i++) {
            //console.log('texto'+i);
            t=searchID('texto'+i);
            //console.log(cadena[i]);
            if (cadena[i]!==''){
                t.textContent=cadena[i];                
            }
        }
        t=searchID('label1');
        t.focus(); //Al finalizar, realizo el focus al titulo nombre!
    }
    return;
}

/***
 * Crea un marcador con sus respectivas funciones
 */
var createMarker = function (latlng,texto,link){
    var marker = L.marker(latlng,{icon:personIcon}).addTo(mymap);
/*     marker.on('keypress',function(e){ //Aca entra solo si es con un enter - No funciona! Siempre va por onClick
        if(e.keyCode === 13) {
            var d = searchID('video');
            d.src = link;
            var textoinicio = document.getElementById('tituloinicial');
            if (textoinicio != null) textoinicio.remove();    
            searchID('label1').style.visibility='visible';
            searchID('label2').style.visibility='visible';
            var cadena = decompose(texto);
            assignedText(cadena);
            console.log("Voy por acá!!");
            //Creación del botón
            var boton = document.getElementById('boton');
            console.log(boton);
            //boton.style.visibility='visible'; NO FUNCIONA!!
            //boton.onclick=markerFocus(e);
            //console.log(e.target._icon);  
        }
    }) */
    marker.on('click',function(e){ //Aca entra solo si es click de mouse
        searchID('info').setAttribute('aria-hidden','false');
        searchID('video').setAttribute('tabindex','0');
        searchID('video').setAttribute('aria-hidden','false');
        var d = searchID('video');
        d.src = link;
        var textoinicio = document.getElementById('tituloinicial');
        if (textoinicio != null) textoinicio.remove();    
        searchID('label1').style.visibility='visible';
        searchID('label2').style.visibility='visible';
        var cadena = decompose(texto);  
        assignedText(cadena);
        console.log("Estoy en función click!!");
        //Add button "volver al mapa"
        var markerFocus = function (){
            e.target._icon.focus();
            searchID('info').setAttribute('aria-hidden','true');
            //searchID('label1').blur(); //le saco el focus al texto Nombre!
            console.log("markerFocus");
        };
        let boton = document.getElementById('boton');
        boton.addEventListener('click',markerFocus.bind(e));
        boton.style.visibility='visible';
    })
} 


//Create 6 markers
//Nota: siempre cuando me manejo por tab, y despues de moverme por el mapa con el tabulador comienzo en el primer marcador creado
//es decir Maria
createMarker([-34.933861,-57.9787715], `Maria. La Plata`,"https://www.youtube-nocookie.com/embed/cCJEH0NCbBY");
createMarker([-34.91018, -57.94452],`Jose. La Plata.`,"https://www.youtube-nocookie.com/embed/2J52CfXvGaQ");
createMarker([-34.9138982,-57.9758826],'Julieta.  La Plata',"https://www.youtube-nocookie.com/embed/amKEijrl_3M");
createMarker([-34.9528344,-57.96863],'Paula.  Los Hornos',"https://www.youtube-nocookie.com/embed/pTyjIWZRpzs");
createMarker([-34.9361601,-57.9825345],'Pedro. San Carlos',"https://www.youtube-nocookie.com/embed/AkPDuj0_XBQ");
createMarker([-34.8868379,-57.983098],'Juan. Ringuelet',"https://www.youtube-nocookie.com/embed/onb5PeKrmwQ");
hideZoomControl();
hideMaker(titulos);