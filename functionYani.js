/***
 * Divide el texto pasado por parametro en un arreglo de cadenas
 */
function decompose(text){
    var separador = ".";
    return text.split(separador);
}
/*****
 * link: contiene url de youtube
 ****/
 function searchID(id){
    return document.getElementById(id);
}


function assignedText(cadena){
    if (cadena !== null){
        var t;
        for (var i=0; i < cadena.length; i++) {
            t=searchID('texto'+i);
            if (cadena[i]!==''){ t.textContent=cadena[i]; }
        }
    }
}


/***
 * Crea un marcador con sus respectivas funciones
 */
 var createMarker = function (L,mymap,personIcon,latlng,texto,link){
    var marker = L.marker(latlng,{icon:personIcon}).addTo(mymap);
    marker.on('keypress',function(e){ //Aca entra solo si es con un enter
        let aux = e.target._icon;
        console.log(e.target._icon);
        Swal.fire({        
            html:
              '<h1 class="text">Nombre: '+cadena[0]+'. </h1> <h1>Barrio: '+cadena[1]+'. </h1> <iframe width="400" height="315" src='+link+' title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
            showCloseButton: true,
            focusConfirm: false,
            confirmButtonText:
              '<i class="fa fa-thumbs-up"></i> Salir',
            confirmButtonAriaLabel: 'Salir',
          })
    })
    
    marker.on('click',function(e){ //Aca entra solo si es click de mouse
        let aux = e.target._icon;
        var textoinicio = document.getElementById('tituloinicial');
        if (textoinicio != null) textoinicio.remove();    
        searchID('label1').style.visibility='visible';
        searchID('label2').style.visibility='visible';
        var cadena = decompose(texto);
        assignedText(cadena);
        Swal.fire({
            html:
              `<h1 class="text">Nombre: ${cadena[0]}. </h1> 
              <h1>Barrio: ${cadena[1]}. </h1> 
              <iframe width="400" 
                      height="315" 
                      src=${link} 
                      title="YouTube video player" 
                      frameborder="0" 
                      allow="accelerometer; 
                      autoplay; 
                      clipboard-write; 
                      encrypted-media; 
                      gyroscope; 
                      picture-in-picture" 
                      allowfullscreen>
                </iframe>`,
            showCloseButton: true,
            focusConfirm: false,
            confirmButtonText:
            '<i class="fa fa-thumbs-up"></i> Salir',
            confirmButtonAriaLabel: 'Salir',
          }).then(res => {
              if(res.isDismissed){
                  if(res.dismiss === "esc" || res.dismiss === "close"){
                      console.log('vuelvo el foco al marcador');
                      document.querySelector('#mapid').setAttribute('tabindex','-1');
                      document.querySelector('#mapid').setAttribute("aria-hidden", "true");
                      e.target._icon.focus();
                  }
              }
          });
    })
} 

export {
    createMarker
}