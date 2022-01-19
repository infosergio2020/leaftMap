//Me fijo que idioma fue selecciono mediante localStorage
var idioma = localStorage.getItem("IDIOMA");
var titulos=[]; //Nombre de los entrevistados
var usados=[]; //para el nro aleatorio
let introtext;
//Cambio de idioma
if (idioma == "EN"){
    for (var i = 0; i < titulos.length; ++i) {
        titulos[i]="Press enter to listen to the interview from "+titulos[i];
    }
    introtext= titulos+' interviews are listed below on the testimonial map';
    console.log('estoy en ingles');
    //Por defecto esta en ingles
}
else if (idioma == "ES"){
    for (var i = 0; i < titulos.length; ++i) {
        titulos[i]="Presiona enter para escuchar la entrevista de "+titulos[i];
    }
    console.log('estoy en español');
    introtext='A continuación se listan'+titulos+'entrevistas en el mapa de entrevistados';
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
document.getElementsByClassName('accesible')[0].setAttribute('aria-label',introtext);

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

/*var personIcon= new LeafletIcon (nro) ({
    iconUrl: 'media/makers/avatar'+nro+'.png'
})*/

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
function noNull (item){
    return (item != null)
}
function assignedText(cadena){
    if (noNull(cadena)){
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
var agregoNombre = function(texto){
    var cadena = decompose(texto);
    if (noNull(cadena)){
        titulos.push(cadena[0]);
        return cadena[0]
    }
} 

/***
 * Crea un marcador con sus respectivas funciones - 
 */
var nro=1;
var createMarker = function (latlng,texto){
    var marker = L.marker(latlng,{icon:new LeafletIcon({iconUrl: 'media/makers/avatar'+(nro++)+'.png'})
        }).bindTooltip(agregoNombre(texto)).openTooltip().addTo(mymap);

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
        var link= cadena[0];
        console.log(link);
        var mediaplayer = searchID('myvid');
        mediaplayer.remove();
        mediaplayer = searchID('mediaplayer');
        //me fijo el idioma en el que tengo que cargar cc o sub. Si es ingles el archivo se encontrara con nombre2.vtt
        let changevtt;
        if (idioma=="ES") changevtt = 
        '<track kind="captions" label="Subtitulos en Español" src="media/'+link+'.vtt" srclang="es" default />'
        else 
            '<track kind="captions" label="English captions" src="media/'+link+'2.vtt" srclang="es" default />';
        var mynewplayer = 
        '<div class="px-video-container" id="myvid">'+
        '<div class="px-video-img-captions-container">'+
            '<div class="px-video-captions hide" aria-hidden="true"></div>'+
            '<video width="380" height="195" poster="media/foo.jpg" controls>'+
                '<source id="videoactual" src="video/'+link+'.mp4" type="video/mp4" />'+
                '<source src="foo.webm" type="video/webm" />'+
                changevtt+
            '</video>'+
        '</div>'+
        '<div class="px-video-controls"></div>'+
        '</div>';
        mediaplayer.innerHTML= mynewplayer;
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


//Createm markers 13 
//Nota: los avatars estan ordenados
createMarker([-34.943566, -57.958339], `Benitez-Gabriela. Parque Castelli`);
createMarker([-34.917228, -57.985247],'Carzolio-Clara. Estadio Maradona');
createMarker([-34.957986, -57.977000],'Dominguez-Lujan. Los Hornos');
createMarker([-34.900719, -57.980701],'Fernandez-Alejandro. Tolosa');
createMarker([-34.942394, -57.948540],'Galicchio-Maria. Parque Castelli');
createMarker([-34.902690, -57.977697],'Gomez-Carlos. Tolosa'); 
createMarker([-34.886737, -57.984030],'Gutierrez-Lucas. Ringuelet');
createMarker([-34.926702, -57.911197],'Maria-Paola. Barrio Jardin');
createMarker([-34.907296, -57.963152],'McAdden-Betina. Barrio Norte');
createMarker([-34.955009, -57.991031],'Mendoza-Azucena. Los Hornos');
createMarker([-34.960042, -57.875716],'Purdier-Victor. Villa Elvira');
createMarker([-34.917343, -57.989806],'Rivas-Silvia. Estadio Maradona');
createMarker([-34.896274, -57.981307],'Suarez-Amina. Tolosa');

hideZoomControl();
hideMaker(titulos);