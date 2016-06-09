angular.module('starter.services', [])

.factory('sailsClient', function(GoogleMaps){
	
	var jokes = [];
	var jokers = [];
		
	function initJokes(datos, $state) {
  	  	var data = datos;
      	      	
      	//console.log( data );
      	jokes.push(data);
      	
      	//console.log('Joke arrived, count: ' + jokes.length);
      	//console.log(data);
      	GoogleMaps.loadMarkers(jokes);
      	GoogleMaps.getGeocodeStats(jokes);
      	
      	//Parar el refresh, aunque sigan llegando y guardándose las bromas, cuando estoy escribiendo una
      	if ($state.current.name != "tab.account") {
      	  $state.go($state.current, {}, {reload: true});
      	}
      	//var divdata = jQuery('div#data');
      	//divdata.html( divdata.html() + JSON.stringify( data ) );
  }
  
   
  function getJokes() {
    return jokes;	
  }
    
  return {
    initJokes: initJokes,
    getJokes: getJokes
    //initJoker: initJoker
  }

})

.factory('Jokes', function(sailsClient, $cordovaGeolocation, $http) {
  
  var jokes = sailsClient.getJokes();
  
  function actualizabroma(broma, $scope, Jokes) {
        
    var direccion = 'http://bartopranks.nursoft.cl:1337/jokes/' + broma.id + '/?title=' + broma.title;
              
    jQuery.ajax({ type: 'POST',
	     url: direccion,
	     async: false,
	     success : function(text) {
	       respuesta = text;
	     },
	     error: function(error) {
	       //no hacer nada, el registro entra	
	     }
	  });
	  
	  jokes.splice(jokes.indexOf(broma), 1);
	  alert("¡Broma actualizada!");
	  $scope.$ionicGoBack();
	}
  
  function borrarbroma(broma) {
    
    var direccion = 'http://bartopranks.nursoft.cl:1337/jokes/' + broma.id;
    
    console.log(direccion);
              
    jQuery.ajax({ url: direccion,
	     type: 'DELETE',
	     async: false,
	     success : function(text) {
	       
	     },
	     error: function(error) {
	       console.log(error);
	     }
	  });
    
    jokes.splice(jokes.indexOf(broma), 1);
  }
  
  function guardabroma (broma, $scope) {
    
    var options = {timeout: 10000, enableHighAccuracy: true};
    $cordovaGeolocation.getCurrentPosition(options).then(function(position){
    	
      var fecha = fechaActual();
      
      //socket para buscar al joker por nombre
      var socket0 = io.sails.connect();
      
      socket0.get('/joker', {'title': broma.creador }, function(resData, jwr) {
        
        if (resData.length > 0) {
          //Lo encontré por su nombre
          //console.log("Bromista:" + resData[0].id);
          
          var direccion = 'http://bartopranks.nursoft.cl:1337/jokes/?owner='+resData[0].id+'&latitude='+position.coords.latitude+'&longitude='+position.coords.longitude+'&title=' + broma.titulo;
                    
          jQuery.ajax({ type: 'POST',   
	    	     url: direccion,
	    	     async: false,
	    	     success : function(text) {
	    	       respuesta = text;
	    	     },
	    	     error: function(error) {
	    	       //no hacer nada, el registro entra	
	    	     }
	        });
	        
	        alert("¡Broma guardada!");
	        
        }	else {
          //alert("Bromista no encontrado");	
          //No lo encontré. crear bromista
                    
          var respuesta = '';
          
          jQuery.ajax({ type: 'POST',   
	    	     url: 'http://bartopranks.nursoft.cl:1337/joker/?jokes=&title=' + broma.creador,
	    	     async: false,
	    	     success : function(text) {
	    	       respuesta = text;
	    	     },
	    	     error: function(error) {
	    	       //no hacer nada, el registro entra	
	    	     }
	        });
      
          //llamo esta función de nuevo; ahora sí encontrará al bromista
          guardabroma(broma, $scope);  
        }
      });
      
      
    });
      
  }
  
  function fechaActual() {
  	var d = new Date();
  	var month = d.getMonth().toString();
  	if (month.length == 1) { 
  		month = "0"+month; 
  	}
  	var date = d.getDate().toString();
  	if (date.length == 1) {
  		 date = "0"+date; 
  	}
  	var hours = d.getHours().toString();
  	if (hours.length == 1) { hours = "0"+ hours; }
  	
  	var minutes = d.getMinutes().toString();
  	if (minutes.length == 1) { minutes = "0"+ minutes; }
  	
  	var seconds = d.getSeconds().toString();
  	if (seconds.length == 1) { seconds = "0"+ seconds; }
  	
  	return d.getFullYear() + "-" + month + "-" + date + "T" + hours + ":" + minutes + ":" + seconds + ".000Z";
  }
  
  return {
    all: function() {
      return jokes;
    },
    remove: borrarbroma,
    get: function(jokeId) {
      for (var i = 0; i < jokes.length; i++) {
        if (jokes[i].id === parseInt(jokeId)) {
          return jokes[i];
        }
      }
      return null;
    },
    guardabroma: guardabroma,
    actualizabroma: actualizabroma
  };
});
