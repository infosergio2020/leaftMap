//Create my map 
var mymap = L.map('mapid').setView([-34.91018,-57.94452], 12);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    maxZoom: 18,
    id: 'mapbox/streets-v10',
   
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWl6enkyMDIiLCJhIjoiY2t0aHVtNWI0MHZuODJ3dWU2OGdjZjBxMiJ9.Z5oB_qULFlnOpBwo10mT-A'
}).addTo(mymap);


// ori prueba esconder los controles de zoom
var elements = document.querySelectorAll(".leaflet-control a");
for (var i = 0; i < elements.length; ++i) {
    elements[i].setAttribute("aria-hidden", "true");
  }
  

  var elements = document.querySelectorAll(".leaflet-tile-pane img");
  for (var i = 0; i < elements.length; ++i) {
      elements[i].setAttribute("aria-hidden", "true");
      elements[i].setAttribute("alt", "holass");
      elements[i].setAttribute("tabindex", "-1");

    } 
    
// ori termina de ver esconder los controles de zoom


// ori prueba colocar titulo a la imagen
// $(document).on('ready', function(){
//     addMapTileAttr('.leaflet-tile-pane img')
// });

// function addMapTileAttr(styleClass) {
//     var selector = $(styleClass);
//     selector.each(
//     function(index) {
//         $(this).attr('alt',"Map tile image " + index);
//     });
// }
// ori termina de ver colocar titulo a la imagen


//Add geojson 
L.geoJSON(inundaciones).addTo(mymap)

//Create an icon 
var LeafletIcon = L.Icon.extend({
    options: {
        iconSize: [38,95],
        iconAnchor: [22,94],
        popupAnchor: [3,76],
        
    }
    
})
var personIcon = new LeafletIcon ({
    iconUrl: 'marcador_ori.png',
    title:"hola soy una persona"
    
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
        //t=searchID('texto'+0);
        //t.focus(); //Al finalizar, realizo el focus al nombre del entrevistado.
    }
}
/***
 * Crea un marcador con sus respectivas funciones
 */
var createMarker = function (latlng,texto,link){
    var marker = L.marker(latlng,{icon:personIcon}).addTo(mymap);
    /*marker.on('keypress',function(e){ //Aca entra solo si es con un enter
        //console.log('Entre!!');
        if(event.keyCode==13) {
            var d = searchID('video');
            d.src = link;
            var cadena = decompose(texto);
            assignedText(cadena);
            //Ver si se puede realizar un marker.focus() como evento cuando se hace click en boton "volver al mapa".
            //Creación del botón
            var button = document.getElementById('button');
            if (button != null) boton.remove();    
            button = document.createElement('button'); 
            button.id='button';
            button.type = 'button'; 
            button.onclick=positionMap ;
            button.innerText = 'Haz Click'; 
            document.getElementById('desc').appendChild(button);
            
        }
    })*/
    marker.on('click',function(e){ //Aca entra solo si es click de mouse
        //console.log('Entre!!');
        var d = searchID('video');
        d.src = link;
        var textoinicio = document.getElementById('tituloinicial');
        if (textoinicio != null) textoinicio.remove();    
        searchID('label1').style.visibility='visible';
        searchID('label2').style.visibility='visible';
        var cadena = decompose(texto);
        assignedText(cadena);
    })
} 
// abrir un alert personalizado cuando se presiona una opcion del listado.
const buttons = document.querySelectorAll('li');

      for(let i = 0; i < buttons.length; i++) {
        addHandler(buttons[i]);
      }

      function addHandler(li) {
        li.addEventListener('click', function(e) {
          let message = e.target.getAttribute('data-message');
        //   alert(message);
        Swal.fire({
          
    
            html:
              '<iframe width="400" height="315" src="https://www.youtube-nocookie.com/embed/2J52CfXvGaQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
            showCloseButton: true,
            focusConfirm: false,
            confirmButtonText:
              '<i class="fa fa-thumbs-up"></i> Salir',
            confirmButtonAriaLabel: 'Salir',
           
          })
          var d = searchID('video');
            d.src = "https://www.youtube-nocookie.com/embed/2J52CfXvGaQ";
            // var cadena = decompose(texto);
            // assignedText(cadena);
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
