angular.module('starter.controllers', ['ionic'])

.controller('DashCtrl', function($scope, Jokes, sailsClient, GoogleMaps) {
  $scope.$on('$ionicView.enter', function(e) {
    var jokes = Jokes.all(); 
    GoogleMaps.loadMarkers(jokes);
    google.maps.event.trigger(map, 'resize');
    //GoogleMaps.getGeocodeStats(jokes);  
  });
})

.controller('JokesCtrl', function($scope, Jokes, GoogleMaps) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  $scope.$on('$ionicView.enter', function(e) {
    $scope.jokes = Jokes.all();
    //GoogleMaps.loadMarkers($scope.jokes);
    GoogleMaps.getGeocodeStats($scope.jokes);
  });

  
  $scope.remove = function(joke) {
    Jokes.remove(joke);
  };
})

.controller('JokeDetailCtrl', function($scope, $stateParams, Jokes) {
  $scope.joke = Jokes.get($stateParams.jokeId);
  $scope.actualizabroma = function(broma) {
    if (broma) {
      Jokes.actualizabroma(broma, $scope);	
    } else {
    	alert("¡Llena todos los campos!");
    }
  }  
})

.controller('AccountCtrl', function($scope, Jokes) {
  $scope.settings = {
    enableFriends: true
  };
  
  $scope.guardabroma = function(broma) {
  	if (broma) {
  	  Jokes.guardabroma(broma, $scope);
  	} else {
    	alert("¡Llena todos los campos!");
    }
  }
  
});
