angular.module('starter.maps', [])
//SOLOMARCO: líneas así comentadas son para mostrar sólo los marcadores que caben en la parte visible del mapa;
//esa parte visible está delimitada por la localización actual, lo que impide proyectar la caminata hacia lugares
//que se salen del marco. No me gustó, así que las comenté
.factory('Markers', function() {
 
  var markers = [];
 
  return {
    getMarkers: function(){
      
    },
    getMarker: function(id){
 
    }
  }
})

.factory('GoogleMaps', function($cordovaGeolocation, $ionicLoading, $rootScope, $cordovaNetwork, Markers){
  
  var apiKey = false;
  var markerCache = [];
  var map = null;
  var breadCrumbs = [];
  var redDot = {};
  var bounds;  
  function initMap(){
 
    var options = {timeout: 10000, enableHighAccuracy: true};
    redDot = {
          	fillColor: '#F75C50',
          	fillOpacity: 0.8,
          	strokeWeight: 0.5,
            path: google.maps.SymbolPath.CIRCLE,
            scale: 4
          };
    
    
    
    //$cordovaGeolocation.getCurrentPosition(options).then(function(position){
      //Plaza de Armas de Santiago
      //var latLng = new google.maps.LatLng(-33.437812, -70.650502);
      //var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      var latLng = new google.maps.LatLng(10.843054, -156.468723);
      var minZoom = 1;
      var Zoom = 1;
      if (jQuery(window).width() > 768) {
    	  minZoom = 3;
    	  Zoom = 3;
      }
      
      var mapOptions = {
        center: latLng,
        zoom: Zoom,
        minZoom:minZoom,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
 
      map = new google.maps.Map(document.getElementById("map"), mapOptions);
 
      //Wait until the map is loaded
      google.maps.event.addListenerOnce(map, 'idle', function(){
 
        //agregar marcador de mi posición actual
        
        //var marcadoractual = new google.maps.Marker({
        //  map: map,
        //  position: latLng,
          
        //});
        
        //agrego mi marcador de localización al arreglo de localizaciones
        //breadCrumbs.push(marcadoractual);
              
        //Load the markers
        
      });
      
    //}, function(error){
    //  console.log("No se pudo obtener la localización.");
    //});
 
  }
  
  function getGeocodeStats(records) {
  	var geocoder = new google.maps.Geocoder();
  	var continentObject = {};
  	var southAmericaBounds = new google.maps.LatLngBounds({lat:-59.450451, lng:-109.47493},{lat:13.39029, lng:-26.33247}); 
  	var northAmericaBounds = new google.maps.LatLngBounds({lat:5.49955, lng:-167.276413},{lat:83.162102, lng: -52.23304}); 
  	var australiaBounds = new google.maps.LatLngBounds({lat:-53.05872, lng:105.377037},{lat:-6.06945, lng:-175.292496});
  	
  	for (var i = 0; i < records.length; i++) {
  		var record = records[i];
      var latitud = record.latitude;
      var longitud = record.longitude;
      var markerPos = new google.maps.LatLng(latitud, longitud);
  		
  		if (southAmericaBounds.contains(markerPos)) {
  		  if (!continentObject["S.America"]) {
  		    continentObject["S.America"] = 0;
  		  }
  		  continentObject["S.America"]++;
  	  } else if (northAmericaBounds.contains(markerPos)) {
  		  if (!continentObject["N.America"]) {
  		    continentObject["N.America"] = 0;
  		  }
  		  continentObject["N.America"]++;
  	  } else if (australiaBounds.contains(markerPos)) {
  		  if (!continentObject["Australia"]) {
  		    continentObject["Australia"] = 0;
  		  }
  		  continentObject["Australia"]++;
  	  } else {
  	  	if (!continentObject["Otros"]) {
  		    continentObject["Otros"] = 0;
  		  }
  		  continentObject["Otros"]++;
  	  }
  	}
    
    var ctx = jQuery("#myChart");
    var array_keys = [];
    var array_values = [];
    for (var prop in continentObject) {
      array_keys.push(prop);
      array_values.push(continentObject[prop]);	
    }
    
        
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: array_keys,
          datasets: [{
              label: '# de bromas por destino',
              data: array_values,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          hover: {
            mode:'label'
          },
          events: ["click"],
          
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }
  });
  
  if (jQuery(window).width() > 768) {
    	Chart.defaults.global.defaultFontSize = 50; 
  }
    
    //for (var clave in continentObject) {
  	//  console.log(clave + ":" + continentObject[clave]);	
  	//}
  }
   
  function loadMarkers(markers){
 
    var records = markers;	
    
    //obtengo límites del rectángulo de la vista de mapa actual
    if (map) {
      var vista = map.getBounds();
      var bounds = new google.maps.LatLngBounds(vista.getSouthWest(), vista.getNorthEast());
    }
    
    //agrego función de cerrar infoWindow
    jQuery('#cerrar_sucursal').click(function() {
      jQuery(".aside_mapa").slideUp('fast');
    });
    
    for (var i = 0; i < records.length; i++) {
 
      var record = records[i];   
      
      var latitud = record.latitude;
      var longitud = record.longitude;
      var markerPos = new google.maps.LatLng(latitud, longitud);
      
      var geocoder = new google.maps.Geocoder();
        
      //muestro sólo los puntos que están dentro de mi vista actual
        
      if (!markerExists(markerPos.lat(), markerPos.lng())) {
       //si el marcador no existe, lo agrego al mapa    
        var image = 'img/7_flag.png';
        // Añadir marcador al mapa
        var marker = new google.maps.Marker({
          map: map,
          animation: google.maps.Animation.DROP,
          position: markerPos,
          icon: image
        });
          
        // Añadir marcador a markerCache para saber que no debemos agregarlo de nuevo
        var markerData = {
          lat: markerPos.lat(),
          lng: markerPos.lng(),
          marker: marker
        };
 
        markerCache.push(markerData);
        
        if (vista) {
          bounds.extend(markerPos);
          map.fitBounds(bounds);
        }
          
        addInfoWindow(marker, record);
          
      }
    }
  }
   
    
  function markerExists(lat, lng){
      var exists = false;
      var cache = markerCache;
      for(var i = 0; i < cache.length; i++){
        if(cache[i].lat === lat && cache[i].lng === lng){
          exists = true;
        }
      }
      return exists;
  } 
   
  function addInfoWindow(marker, joke) {
 
      google.maps.event.addListener(marker, 'click', function () {
          
          //inyectar información del registro a la ventana div.aside_mapa y mostrar la ventana
          if (joke.owner) {
            jQuery('#nombre_monumento').html("<h3>Bromista: " + joke.owner.title + "</h3>");
          } else {
          	jQuery('#nombre_monumento').html("");
          }
          if (joke.createdAt) {
            jQuery('#direccion_monumento').html("<i>Broma realizada el: " + joke.createdAt + "</i>");
          } else {
          	jQuery('#direccion_monumento').html("");
          }
          //if (record.datos.url_imagen) {
          //  jQuery('#imagen_monumento').html("<img src='" + record.datos.url_imagen + "'>");
          //} else {
          	jQuery('#imagen_monumento').html("");
          //}
          if (joke.title) {
            jQuery('#info_monumento').html("<p>" + joke.title + "</p>");
          } else {
          	jQuery('#info_monumento').html("");
          }
          jQuery(".aside_mapa").slideDown('fast');
          
      });
 
  }
  
  return {
    init: initMap,
    
    loadMarkers: loadMarkers,
    getGeocodeStats:getGeocodeStats
  }
 
});