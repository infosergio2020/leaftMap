function clickHandler(e) {
    let message = e.target.getAttribute('data-message');
    if(message==="Rodrigo"){
        var fun="https://www.youtube.com/embed/Yn94t4r7y1c";
    }
    if(message==="Lore"){
        var fun="https://www.youtube-nocookie.com/embed/2J52CfXvGaQ";
    } 
        Swal.fire({   
            html:`<iframe width="400" height="315" src='${fun}' frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; " allowfullscreen></iframe>`,
            showCloseButton: true,
            focusConfirm: false,
            confirmButtonText:
            '<i class="fa fa-thumbs-up aria-label="Holaa1"">Salir</i>',
            confirmButtonAriaLabel: 'Salir',
    })
    
    var d = searchID('video');
    let vi=e.target.getAttribute('video');
    vi.src= "https://www.youtube-nocookie.com/embed/2J52CfXvGaQ";
    d.src = "https://www.youtube-nocookie.com/embed/2J52CfXvGaQ";
    // var cadena = decompose(texto);
    // assignedText(cadena);
}


const buttons = document.querySelectorAll('li');
      buttons.forEach(btn => addHandler(btn));
      function addHandler(li) {
                li.addEventListener('click',clickHandler)
      }




// //Create my map 
// var mymap = L.map('mapid').setView([-34.91018,-57.94452], 12);

// L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     maxZoom: 18,
//     id: 'mapbox/streets-v10',
//     tileSize: 512,
//     zoomOffset: -1,
//     accessToken: 'pk.eyJ1IjoibWl6enkyMDIiLCJhIjoiY2t0aHVtNWI0MHZuODJ3dWU2OGdjZjBxMiJ9.Z5oB_qULFlnOpBwo10mT-A'
// }).addTo(mymap);

// //Add geojson 
// L.geoJSON(inundaciones).addTo(mymap)

// //Create an icon 
// var LeafletIcon = L.Icon.extend({
//     options: {
//         iconSize: [38.95],
//         iconAnchor: [22,94],
//         popupAnchor: [3,76]
//     }
// })
// var personIcon = new LeafletIcon ({
//     iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-orange.png'
// })

// /*L.marker([-34.91018, -57.94452],{icon:personIcon}).bindTooltip("Entrevista 1.").addTo(mymap)
//     .bindPopup(`
//     <h1 tabindex=0 >Juan. Barrio: La Plata.</h1>
//     <iframe tabindex=0 width="260" height="315" src="https://www.youtube.com/embed/cCJEH0NCbBY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
//     `);
// */

// //Functions

// /*****
//  * link: contiene url de youtube
//  ****/
// function searchID(id){
//     return document.getElementById(id);
// }
// /***
//  * Divide el texto pasado por parametro en un arreglo de cadenas
//  */
// function decompose(text){
//     var separador = ".";
//     return text.split(separador);
// }
// function assignedText(cadena){
//     if (cadena !== null){
//         //console.log(cadena.length);
//         var t;
//         for (var i=0; i < cadena.length; i++) {
//             //console.log('texto'+i);
//             t=searchID('texto'+i);
//             //console.log(cadena[i]);
//             if (cadena[i]!==''){
//                 t.textContent=cadena[i];                
//             }
//         }
//     }
// }
// /***
//  * Crea un marcador con sus respectivas funciones
//  */
// var createMarker = function (latlng,texto,link){
//     var marker = L.marker(latlng).addTo(mymap);
//     marker.on('keypress',function(e){ //Aca entra solo si es con un enter
//         //console.log('Entre!!');
//         if(event.keyCode==13) {
//             var d = searchID('video');
//             d.src = link;
//             var cadena = decompose(texto);
//             assignedText(cadena);
//         }
//     })
//     marker.on('click',function(e){ //Aca entra solo si es click de mouse
//         //console.log('Entre!!');
//         var d = searchID('video');
//         d.src = link;
//         var cadena = decompose(texto);
//         assignedText(cadena);
//     })
// } 
// // //funcion de orii para el enter 
// // var presione = document.getElementById("presione1");
// // presione.addEventListener("keydown", function (e) {
// //     // if (e.key === "Enter") { 
// //     if (e.keyCode==13) {  
// //       validate(e);
// //     }
// //   });
// //   function validate(e) {
// //     // var text = e.target.value;
// //     alert("hola");
// //   }


// // const buttons = document.querySelectorAll('button');

// //       for(let i = 0; i < buttons.length; i++) {
// //         addHandler(buttons[i]);
// //       }

// //       function addHandler(button) {
// //         button.addEventListener('click', function(e) {
// //           let message = e.target.getAttribute('data-message');
// //           alert(message);
// //         })
// //       }


      

// //Create 6 markers
// createMarker([-34.933861,-57.9787715], `Maria. Barrio: La Plata`,"https://www.youtube-nocookie.com/embed/cCJEH0NCbBY");
// createMarker([-34.91018, -57.94452],`Jose. Barrio: La Plata.`,"https://www.youtube-nocookie.com/embed/2J52CfXvGaQ");
// createMarker([-34.9138982,-57.9758826],'holaa',"https://www.youtube-nocookie.com/embed/amKEijrl_3M");
// createMarker([-34.9528344,-57.96863],'jhhhjg. Barrio: Los Hornos',"https://www.youtube-nocookie.com/embed/pTyjIWZRpzs");
// createMarker([-34.9361601,-57.9825345],'kjkjh. Barrio: San Carlos',"https://www.youtube-nocookie.com/embed/AkPDuj0_XBQ");
// createMarker([-34.8868379,-57.983098],'uwu',"https://www.youtube-nocookie.com/embed/onb5PeKrmwQ");
