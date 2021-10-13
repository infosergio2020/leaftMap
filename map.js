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
        iconSize: [38.95],
        iconAnchor: [22,94],
        popupAnchor: [3,76]
    }
})
var personIcon = new LeafletIcon ({
    iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-orange.png'
})

/*L.marker([-34.91018, -57.94452],{icon:personIcon}).bindTooltip("Entrevista 1.").addTo(mymap)
    .bindPopup(`
    <h1 tabindex=0 >Juan. Barrio: La Plata.</h1>
    <iframe tabindex=0 width="260" height="315" src="https://www.youtube.com/embed/cCJEH0NCbBY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `);
*/

//Functions

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
        t=searchID('texto'+0);
        t.focus(); //Al finalizar, realizo el focus al nombre del entrevistado.
    }
}
/**
 * Se posiciona en el ultimo marcador en el que se hizo click
 * Parametros: ? Necesitaria guardarme el marcador en si para realizar marker.focus()
 */
function positionMap(){
    alert('Volver al mapa!!');
}
/***
 * Crea un marcador con sus respectivas funciones
 */
var createMarker = function (latlng,texto,link){
    var marker = L.marker(latlng).addTo(mymap);
    marker.on('keypress',function(e){ //Aca entra solo si es con un enter
        //console.log('Entre!!');
        if(event.keyCode==13) {
            var d = searchID('video');
            d.src = link;
            var cadena = decompose(texto);
            assignedText(cadena);
            //Ver si se puede realizar un marker.focus() como evento cuando se hace click en boton "volver al mapa".
            //Este ultimo tengo que crearlo!!!
            const button = document.createElement('button'); 
            button.type = 'button'; 
            button.innerText = 'Haz Click';
            //document.getElementById('desc')[0].appendChild(button);
            //document.body.appendChild(button); 
        }
    })
    marker.on('click',function(e){ //Aca entra solo si es click de mouse
        //console.log('Entre!!');
        var d = searchID('video');
        d.src = link;
        var cadena = decompose(texto);
        assignedText(cadena);
    })
} 


//Create 6 markers
//Nota: siempre cuando me manejo por tab, y despues de moverme por el mapa con el tabulador comienzo en el primer marcador creado
//es decir Maria
createMarker([-34.933861,-57.9787715], `Maria. Barrio: La Plata`,"https://www.youtube-nocookie.com/embed/cCJEH0NCbBY");
createMarker([-34.91018, -57.94452],`Jose. Barrio: La Plata.`,"https://www.youtube-nocookie.com/embed/2J52CfXvGaQ");
createMarker([-34.9138982,-57.9758826],'Julieta. Barrio: La Plata',"https://www.youtube-nocookie.com/embed/amKEijrl_3M");
createMarker([-34.9528344,-57.96863],'Paula. Barrio: Los Hornos',"https://www.youtube-nocookie.com/embed/pTyjIWZRpzs");
createMarker([-34.9361601,-57.9825345],'Pedro. Barrio: San Carlos',"https://www.youtube-nocookie.com/embed/AkPDuj0_XBQ");
createMarker([-34.8868379,-57.983098],'Juan. Barrio: Ringuelet',"https://www.youtube-nocookie.com/embed/onb5PeKrmwQ");
