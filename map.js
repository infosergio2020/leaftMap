//Me fijo que idioma fue selecciono mediante localStorage
var idioma = localStorage.getItem("IDIOMA");
var titulos=["Maria.","Jose.","Julieta.","Paula.","Pedro.","Juan."]; //CAMBIAR! ESTO se toma de los videos!

//Cambio de idioma
if (idioma == "EN"){
    for (var i = 0; i < titulos.length; ++i) {
        titulos[i]="Press enter to listen to the interview from "+titulos[i];
    }
    console.log('estoy en ingles');
    //Por defecto esta en ingles
}
else if (idioma == "ES"){
    for (var i = 0; i < titulos.length; ++i) {
        titulos[i]="Presiona enter para escuchar la entrevista de "+titulos[i];
    }
    console.log('estoy en español');
    //Cambio de info a español
    //Titulo del mapa
    document.getElementsByClassName('accesible')[0].innerHTML='Mapa de entrevistados';
    document.getElementsByClassName('accesible')[0].setAttribute('aria-label','A continuación se listas las 6 entrevistas en el mapa de entrevistados.');
    //Cambio de idioma
    document.getElementsByClassName('button')[0].innerHTML='Idioma';
    //Informacion de 1 entretvistado
    searchID('title-info').innerHTML='Información del entrevistado';
    searchID('tituloinicial').innerHTML='Haga click en alguna persona dentro del mapa para obtener mas información de la misma.';
    searchID('label1').innerHTML='<h1>Nombre: </h1>';
    searchID('label2').innerHTML='<h1>Zona: </h1>';
    searchID('boton').setAttribute('aria-label','Presione enter para volver al mapa');
    searchID('boton').innerHTML='Volver al mapa';
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

//Functions
function toggleText(id) {
   var el = searchID(id);
   if (idioma == "ES") 
   {
       el.firstChild.data = "Volver al mapa";
   }
   else 
   {
     el.firstChild.data = "Go back to map";
   }
}

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
var createMarker = function (latlng,texto){
    var marker = L.marker(latlng,{icon:personIcon}).addTo(mymap);
    marker.on('click',function(e){ //Aca entra solo si es click de mouse
        searchID('info').setAttribute('aria-hidden','false');
        var textoinicio = document.getElementById('tituloinicial');
        if (textoinicio != null) textoinicio.remove();    
        searchID('label1').style.visibility='visible';
        searchID('label2').style.visibility='visible';
        var cadena = decompose(texto);  
        assignedText(cadena);
        console.log("Estoy en función click!!");
        //Insertar aqui los cambios a media-player
        var link='media/'+cadena[0]+'.mp4';
        console.log(link);
        searchID('videoactual').setAttribute('src',link);
        //
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
createMarker([-34.933861,-57.9787715], `Benitez-Gabriela. Plaza Castelli`);
createMarker([-34.9138982,-57.9758826],'Carzolio-Clara. Estadio Maradona');
createMarker([-34.9528344,-57.96863],'Dominguez-Lujan. Los Hornos');
createMarker([-34.9361601,-57.9825345],'Fernandez-Alejandro. Tolosa');
createMarker([-34.8868379,-57.983098],'Galicchio-Maria. Plaza Castelli');
createMarker([-34.8868379,-57.983098],'Gomez-Carlos. Tolosa'); //-dfas
createMarker([-34.8868379,-57.983098],'Gutierrez-Lucas. Ringuelet');
createMarker([-34.8868379,-57.983098],'Maria-Paola. Barrio Jardin');
createMarker([-34.8868379,-57.983098],'McAdden-Betina. Barrio Norte');
createMarker([-34.8868379,-57.983098],'Mendoza-Azucena. Los Hornos');
createMarker([-34.8868379,-57.983098],'Purdier-Victor. Villa Elvira');
createMarker([-34.8868379,-57.983098],'Rivas-Silvia. Estadio Maradona');
createMarker([-34.8868379,-57.983098],'Suarez-Amina. Tolosa');

hideZoomControl();
hideMaker(titulos);