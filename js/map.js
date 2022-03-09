import { barrioJardin,villaElvira,altosDeSanLorenzo,parqueCasteli,Tolosa,LosHornos,estadioMaradona,barrioNorte,Ringuelet } from "./zonas.js";
import { Select2 } from "./combobox.js";
//Me fijo que idioma fue selecciono mediante localStorage
var idioma = localStorage.getItem("IDIOMA");
let itvwszone;[]; //entrevistas por zona
var titulos=[]; //Nombre de los entrevistados
var usados=[]; //para el nro aleatorio
let introtext;
//Cambio de idioma
if (idioma == "EN"){
    for (var i = 0; i < titulos.length; ++i) {
        titulos[i]="Press enter to listen to the interview from "+titulos[i].nombre;
    }
    introtext= titulos+' interviews are listed below on the testimonial map';
    console.log('estoy en ingles');
    //Por defecto esta en ingles
}
else if (idioma == "ES"){
    for (var i = 0; i < titulos.length; ++i) {
        titulos[i]="Presiona enter para escuchar la entrevista de "+titulos[i].nombre;
    }
    console.log('estoy en español');
    introtext='A continuación se listan'+titulos.length+'entrevistas en el mapa de entrevistados';
    //Cambio de info a español
    //Titulo del mapa
    document.getElementsByClassName('accesible')[0].innerHTML='Mapa de entrevistados';
    document.getElementsByClassName('accesible')[0].setAttribute('aria-label','A continuación se listas las 6 entrevistas en el mapa de entrevistados.');
    //Cambio de idioma
    document.getElementsByClassName('button')[0].innerHTML='Idioma';
    //Informacion de 1 entretvistado
    searchID('title-info').innerHTML='Acceso a la entrevista';
    searchID('tituloinicial').innerHTML='Seleccione alguna persona dentro del mapa para obtener mas información de la misma.';
    searchID('label1').innerHTML='<h1>Entrevista a</h1>';
    searchID('label2').innerHTML='<h1>De</h1>';
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
L.geoJSON(zonas).addTo(mymap)

//Create an icon 
var LeafletIcon = L.Icon.extend({
    options: {
        iconSize: [38,95],
        iconAnchor: [22,94],
        popupAnchor: [3,76]
    }
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
        elements[i].setAttribute("alt", titulos[i].nombre);
        elements[i].setAttribute("data-nombre",titulos[i].nombre);
        elements[i].setAttribute("data-zona",titulos[i].zona);
        elements[i].setAttribute("aria-label", "Haga click en "+titulos[i].nombre+" para acceder a su entrevista");
        elements[i].setAttribute("role", "image");
        elements[i].setAttribute("tabindex", i+2); //traslado 1 por titulo de pagina y boton
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
function decompose(text,separador){
    return text.split(separador);
}
function noNull (item){
    return (item != null)
}
function idiomaEspañol(){
    return (idioma == "ES")
}

/*Carga la informacion del entrevistado y la zona donde vive*/ 
function assignedText(cadena){
    if (noNull(cadena)){
        var t;
        for (var i=0; i < cadena.length; i++) {
            //console.log('texto'+i);
            t=searchID('label'+(i+1));
            t.setAttribute('tabindex','0');
            //console.log(cadena[i]);
            if (cadena[i]!==''){
                if(i==0) t.innerText='Entrevista a';
                else t.innerText='De'
                t.innerText= t.innerText+' '+cadena[i].replace("-"," ");    //Agregado para reemplazar el guion por un espacio
            }
        }
        //Inserto los cambios de la informacion de la zona
        var zone = searchID('accordion-section-1');
        if (idiomaEspañol){
            switch (cadena[1]) {
                case " Los Hornos":  zone.innerHTML = LosHornos ;break;
                case " Villa Elvira": zone.innerHTML = villaElvira; break;
                case " Barrio Jardin": zone.innerHTML = barrioJardin; break;
                case " Tolosa": zone.innerHTML = Tolosa; break;
                case " Estadio Maradona": zone.innerHTML = estadioMaradona; break;
                case " Parque Castelli":  zone.innerHTML = parqueCasteli; break;
                case " Barrio Norte": zone.innerHTML = barrioNorte; break;
                case " Ringuelet": zone.innerHTML = Ringuelet; break;
                case " Altos de San Lorenzo": zone.innerHTML = altosDeSanLorenzo; break;
            }
        }
        t=searchID('label1');
        t.focus(); //Al finalizar, realizo el focus al titulo nombre!
    }
    return;
}
/*Agrega a la variable titulos el nombre de la persona + zona */
var agregoNombre = function(texto){
    var cadena = decompose(texto,".");
    if (noNull(cadena)){
        let reg = {nombre:cadena[0],zona:cadena[1]};
        titulos.push(reg);  
        return cadena[0]
    }
} 
/**
 * Limpia los hijos de listbox2 en el caso de que hubiera algo cargado anteriormente
 * Nota de yani: esta funcion deberia ser invocada del combobx2.js
 */
function clearListbox2(){
    console.log("clearList2");
    var elemBefore = document.getElementById('listbox2');
    console.log(elemBefore);  
    while (elemBefore.hasChildNodes())
      elemBefore.removeChild(elemBefore.firstChild);
  }
/**
 * Cargo opciones al segundo combobox 
 * @param {*} itvwszone  entrevistados de zona seleccionada por filterMarker
 */
 function cargaElementos(...itvwszone){
    const selectEls = document.querySelectorAll('.js-select2');
    clearListbox2();
    selectEls.forEach((el) => {
        new Select2(el, itvwszone);
    });   
}
/**
 * agrega a alt el numero de entrevistas.. 1 de 4, 2 de 4.. etc
 * @param {*} itvwszone  entrevistados de zona seleccionada por filterMarker
 */
function renameMarker(...itvwszone){
    var add;
    for (let i = 0; i < itvwszone.length; ++i) {
        add = "Haga click en "+itvwszone[i].alt+" para acceder a su entrevista.";
        add = add+' '+(i+1)+' de '+itvwszone.length+'.';
        itvwszone[i].setAttribute('aria-label',add); 
    }
}
/**
 * Elimina o esconde aquellos marcadores que no pertenecen a la zona opcionName
 * @param {*} opcionName opcion seleccionada por evento
 * @param {*} opcList  boolean indica en el listbox que estoy posicionado: false-listbox1 true-listbox2
 * @returns 
 */
export function filterMarker(opcionName,opcList){
    console.log('filterMarker with option: '+opcionName);
    let elements = document.querySelectorAll(".leaflet-marker-icon");
    itvwszone=[]; //vacio mi array
    let j=0;
    if (!opcList){ //listbox 1 POR ZONA
        for (let i = 0; i < elements.length; ++i) {
            if ((opcionName == elements[i].dataset.zona)||(opcionName == 'Todas las zonas')){ //marcadores que SI PERTENECEN A LA ZONA se vuelven a mostrar
                elements[i].setAttribute("tabindex", i+2); 
                elements[i].style.visibility='visible';
                itvwszone[j]=elements[i];
                j++;
            }
            else{ //Los marcadores que NO sean de la ZONA se esconden
                elements[i].setAttribute("tabindex", '-1');
                elements[i].style.visibility='hidden';
            }
        }
    }
    else{ //listbox 2 POR NOMBRE
        for (let i = 0; i < elements.length; ++i) {
            if ((opcionName == elements[i].dataset.nombre)){ //marcadores que SI PERTENECEN A LA ZONA se vuelven a mostrar
                elements[i].setAttribute("tabindex", i+2); 
                elements[i].style.visibility='visible';
                itvwszone[j]=elements[i];
                j++;
            }
            else{ //Los marcadores que NO sean de la ZONA se esconden
                elements[i].setAttribute("tabindex", '-1');
                elements[i].style.visibility='hidden';
            }
        }
    }
    renameMarker(...itvwszone); 
    if (!opcList) //si es listbox1 cargo elementos al 2
        cargaElementos(...itvwszone);
    return j; //si retorna 0 es que no hubo coincidencias
}
/**
 * Corrobora que la ocurrencia sea válida con un entrevistado. 
 * No quiero llegar a Ej: si matcheo con una vocal 'a' me va a devolver todas las 'a' que encontró en el string.
 * @param {*} coincidencias array del matcheo con todas las coincidencias
 * @param marcador nombre del marcador leaflet 
 * @returns true o false de acuerdo a si el elemento coincidió o no
 */
 function validarMatch(marcador,...coincidencias){
    var cadena = decompose(marcador,"-");
    var i = 0; var notfound=false;
    while ((i<cadena.length)&&(!notfound)){ //comparo resultado del match con elemento leaflet
      notfound= (cadena[i]==coincidencias[0]); i++; //Tomo la primera coincidencia porque el nombre de una persona no se repite 2 veces en 1 persona
    } 
    return notfound;
}
export function filterMarker2(inputName){
    console.log('filterMarker2 with option: '+inputName);
    let elements = document.querySelectorAll(".leaflet-marker-icon");
    itvwszone=[]; //vacio mi array,voy a ver si puedo reutilizarlo para esta fn
    let j=0;
    let elementMarker; 
    let input = new RegExp(inputName, 'i'); //convierto en un objeto RegExp ya que no permite concatenación ni vaariable para invocar al match()
    for (let i = 0; i < elements.length; ++i) {   
        elementMarker = elements[i].dataset.nombre;
         //match devuelve un array con las coincidencias
        if (validarMatch(elementMarker,elementMarker.match(input))){ //marcadores que SI COINCIDEN con NOMBRE, APELLIDO o AMBOS se muestran
            elements[i].setAttribute("tabindex", i+2); 
            elements[i].style.visibility='visible';
            itvwszone[j]=elements[i];
            j++;
        }
        else{ //Los marcadores que NO sean de la ZONA se esconden
            elements[i].setAttribute("tabindex", '-1');
            elements[i].style.visibility='hidden';
        }
    }
    renameMarker(...itvwszone); 
    return j; //si retorna 0 es que no hubo coincidencias
}
/*
* De acuerdo al boolean que le pase esconde o muestra los botones del media player 
* opcion T: esconde
* opcion F: muestra
*/
function hideMediaplayer(opcion){
    if (opcion == true){
        let media_btn = document.getElementsByClassName('px-video-restart')[0];
        if (noNull(media_btn)) media_btn.setAttribute('tabindex','-1');
        media_btn = document.getElementsByClassName('px-video-rewind')[0];
        if (noNull(media_btn)) media_btn.setAttribute('tabindex','-1');
        media_btn = document.getElementsByClassName('px-video-play')[0];
        if (noNull(media_btn)) media_btn.setAttribute('tabindex','-1');
        media_btn = document.getElementsByClassName('px-video-pause')[0];
        if (noNull(media_btn)) media_btn.setAttribute('tabindex','-1');
        media_btn = document.getElementsByClassName('px-video-forward')[0];
        if (noNull(media_btn)) media_btn.setAttribute('tabindex','-1');
        media_btn = document.getElementsByClassName('px-video-mute')[0];
        if (noNull(media_btn)) media_btn.setAttribute('tabindex','-1');
        media_btn = document.getElementsByClassName('px-video-volume')[0];
        if (noNull(media_btn)) media_btn.setAttribute('tabindex','-1');
        media_btn = document.getElementsByClassName('px-video-btnCaptions')[0];
        if (noNull(media_btn)) media_btn.setAttribute('tabindex','-1');
        media_btn = document.getElementsByClassName('px-video-btnFullScreen')[0];
        if (noNull(media_btn)) media_btn.setAttribute('tabindex','-1');
    }
    else{
        let media_btn = document.getElementsByClassName('px-video-restart')[0];
        if (noNull(media_btn)) media_btn.setAttribute('tabindex','1');
        media_btn = document.getElementsByClassName('px-video-rewind')[0];
        if (noNull(media_btn)) media_btn.setAttribute('tabindex','1');
        media_btn = document.getElementsByClassName('px-video-play')[0];
        if (noNull(media_btn)) media_btn.setAttribute('tabindex','1');
        media_btn = document.getElementsByClassName('px-video-pause')[0];
        if (noNull(media_btn)) media_btn.setAttribute('tabindex','1');
        media_btn = document.getElementsByClassName('px-video-forward')[0];
        if (noNull(media_btn)) media_btn.setAttribute('tabindex','1');
        media_btn = document.getElementsByClassName('px-video-mute')[0];
        if (noNull(media_btn)) media_btn.setAttribute('tabindex','1');
        media_btn = document.getElementsByClassName('px-video-volume')[0];
        if (noNull(media_btn)) media_btn.setAttribute('tabindex','1');
        media_btn = document.getElementsByClassName('px-video-btnCaptions')[0];
        if (noNull(media_btn)) media_btn.setAttribute('tabindex','1');
        media_btn = document.getElementsByClassName('px-video-btnFullScreen')[0];
        if (noNull(media_btn)) media_btn.setAttribute('tabindex','1');
    }
}

/***
 * Crea un marcador con sus respectivas funciones - Mientras agrega el marcador agrega a titulos el nombre de la persona (agregoNombre)
 */
var nro=1;
var createMarker = function (latlng,texto){
    var marker = L.marker(latlng,{icon:new LeafletIcon({iconUrl: 'media/makers/avatar'+(nro++)+'.png'})
        }).bindTooltip(agregoNombre(texto)).openTooltip().addTo(mymap);
    //Añado función click a medida que se crea cada marcador
    marker.on('click',function(e){ 
        searchID('info').setAttribute('aria-hidden','false');
        var textoinicio = document.getElementById('tituloinicial');
        if (textoinicio != null) textoinicio.remove();    
        //Hago visible toda la info
        searchID('label1').style.visibility='visible';
        searchID('label2').style.visibility='visible';
        searchID('accordionGroup').style.visibility='visible';
        searchID('separator').style.visibility='visible';
        hideMediaplayer(false);
        var cadena = decompose(texto,".");  
        assignedText(cadena); //+da focus al titulo de la info entrevistado
        console.log("Estoy en función click!!");
        //Inserto los cambios a media-player
        var link= cadena[0];
        console.log(link);
        var mediaplayer = searchID('video');
        mediaplayer.remove();
        mediaplayer = searchID('mediaplayer');
        //me fijo el idioma en el que tengo que cargar cc o sub. Si esta en ingles el archivo se encontrara con nombre2.vtt
        let changevtt;
        if (idioma=="ES") changevtt = 
        '<track kind="captions" label="Subtitulos en Español" src="media/'+link+'.vtt" srclang="es" default />'
        else 
            changevtt = '<track kind="captions" label="English captions" src="media/'+link+'2.vtt" srclang="es" default />';
        var mynewplayer = 
        '<div class="px-video-container" id="video">'+
        '<div class="px-video-img-captions-container">'+
            '<div class="px-video-captions hide" aria-hidden="true"></div>'+
            '<video class="px-video" poster="media/posters/'+link+'.jpg" controls>'+
                '<source id="videoactual" src="video/'+link+'.mp4" type="video/mp4" />'+
                '<source src="foo.webm" type="video/webm" />'+
                changevtt+
            '</video>'+
        '</div>'+
        '<div class="px-video-controls"></div>'+
        '</div>';
        mediaplayer.innerHTML= mynewplayer;
        // Initialize
        new InitPxVideo({
            "videoId": "video",
            "captionsOnDefault": true,
            "seekInterval": 20,
            "videoTitle": "Entrevista a "+cadena[0], //Esto tiene que ir cambiando constantemente
            "debug": true
        });
        //funcion click del boton volver al mapa - Aca colocp los tabindex en -1 para que no enfoque hasta el siguiente click/enter del avatar
        var markerFocus = function (){
            e.target._icon.focus();
            //Hide info - crear funcion despues
            searchID('label1').setAttribute('tabindex','-1'); //esconde 'Entrevista a'
            searchID('label2').setAttribute('tabindex','-1'); //esconde 'De'
            searchID('accordionGroup').setAttribute('tabindex','-1'); //esconder acordeon  no esta funcionando
            searchID('accordion-open-1').setAttribute('tabindex','-1');
            searchID('separator').setAttribute('tabindex','-1'); //esconde el separador
            //falta esconder controles del mediaplayer (ver)
            hideMediaplayer(true);
            searchID('boton').setAttribute('tabindex','-1'); //esconde el boton
            //para el ultimo caso
            if (e.target._icon.alt == titulos[titulos.length-1].nombre) searchID('inicio').focus(); //para el ultimo marcador se va al inicio de la pagina 
            console.log("markerFocus - volviendo al mapa..");
        };
        //Añadir boton "volver al mapa"
        let boton = document.getElementById('boton');
        boton.addEventListener('click',markerFocus.bind(e));
        boton.style.visibility='visible';
        boton.setAttribute('tabindex','0'); //reaparece boton
        boton.setAttribute('role','button');
        boton.setAttribute('aria-label','Haga click para volver al mapa.')
    })
} 

//Createm markers 14 
//Nota: los avatars estan ordenados
createMarker([-34.943566, -57.958339], `Benitez-Gabriela.Parque Castelli`);
createMarker([-34.917228, -57.985247],'Carzolio-Clara.Estadio Maradona');
createMarker([-34.957986, -57.977000],'Dominguez-Lujan.Los Hornos');
createMarker([-34.900719, -57.980701],'Fernandez-Alejandro.Tolosa');
createMarker([-34.942394, -57.948540],'Galicchio-Maria.Parque Castelli');
createMarker([-34.902690, -57.977697],'Gomez-Carlos.Tolosa'); 
createMarker([-34.886737, -57.984030],'Gutierrez-Lucas.Ringuelet');
createMarker([-34.926702, -57.911197],'Maria-Paola.Barrio Jardín');
createMarker([-34.907296, -57.963152],'McAdden-Betina.Barrio Norte');
createMarker([-34.955009, -57.991031],'Mendoza-Azucena.Los Hornos');
createMarker([-34.960042, -57.875716],'Purdier-Victor.Villa Elvira');
createMarker([-34.917343, -57.989806],'Rivas-Silvia.Estadio Maradona');
createMarker([-34.896274, -57.981307],'Suarez-Amina.Tolosa');
createMarker([-34.956277, -57.947428],'Fariña-Marily.Cementerio');


hideZoomControl();
hideMaker(titulos);
//enfoca primero el titulo de la página
searchID('inicio').focus();