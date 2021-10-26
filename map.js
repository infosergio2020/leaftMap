// IMPORTS
import { datos,titulos,opciones } from "./data.js";
import { hideMaker,hideZoomControl } from "./functionOri.js";
import { createMarker } from "./functionYani.js";
/*----------------------------------------------------------------------------------------------*/
titulos.map((titulo)=>{ titulo = `Presiona enter para ver la entrevista de ${titulo}`; })
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
var LeafletIcon = L.Icon.extend({ options: opciones })
var personIcon = new LeafletIcon ({ iconUrl: 'marcador_ori.png' })
//Create 6 markers
//Nota: siempre cuando me manejo por tab, y despues de moverme por el mapa con el tabulador comienzo en el primer marcador creado
datos.forEach(dato => createMarker(L,mymap,personIcon,dato.coord,dato.title,dato.link));
hideZoomControl();
hideMaker(titulos);