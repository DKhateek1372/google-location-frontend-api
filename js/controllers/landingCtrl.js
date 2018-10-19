//author : deepak
angular.module('moovleeAssignment')
.controller('LandingCtrl', function($scope, Locations, $location,$window){
  console.log('LandingCtrl')
  if (!localStorage.getItem('isLoggedIn')) {
    $location.url('/login')
  }
  $scope.lat = 12.9715987;
  $scope.lng = 77.59456269999998;
   $scope.location = location;
  $scope.name = 'Bengaluru';
  //  $scope.openModal = function(){
  //    $("#myModal").modal('show');
  // }

  $scope.$on('gmPlacesAutocomplete::placeChanged', function(){
    console.log($scope.autocomplete.getPlace());
    var location = $scope.autocomplete.getPlace()
    var geometry = location.geometry.location;
    $scope.types = []
    $scope.types = location.types
    $scope.name = location.name;
    $scope.lng = geometry.lng();
    $scope.lat = geometry.lat();
    var saveLoc = {
      name: $scope.name,
      location: {
        type: $scope.types,
        coordinates: [$scope.lat, $scope.lat]
      }
    }
    Locations.saveLocation(saveLoc).$promise
    .then (function (location) {
      console.log("Locations is here", location);
      $scope.autocomplete = ''
    })
    .catch (function (err) {
      console.log("Error found in locations", err);
    })
    $scope.$apply();
    settingLocation();
  });

  
  function settingLocation () {
    $window.map = new google.maps.Map(document.getElementById('mymap'), {
      center: {
          lat: $scope.lat,
          lng: $scope.lng
      },
      zoom: 8
    });
    var marker = new google.maps.Marker({position: {lat: $scope.lat, lng: $scope.lng}, map: $window.map});
     var geocoder = new google.maps.Geocoder;
     var infowindow = new google.maps.InfoWindow;

     marker.addListener('click', function() {
          map.setZoom(8);
          $("#myModal").modal('show');
        });
         document.getElementById('submit').addEventListener('click', function() {
          geocodeLatLng(geocoder, map, infowindow);
          });
      }

      function geocodeLatLng(geocoder, map, infowindow) {
        var input = document.getElementById('latlng').value;
        var latlngStr = input.split(',', 2);
        var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
        geocoder.geocode({'location': latlng}, function(results, status) {
          if (status === 'OK') {
            if (results[0]) {
              map.setZoom(11);
              var marker = new google.maps.Marker({
                position: latlng,
                map: map
              });
              infowindow.setContent(results[0].formatted_address);
              infowindow.open(map, marker);
            } else {
              window.alert('No results found');
            }
          } else {
            window.alert('Geocoder failed due to: ' + status);
          }
        });
  }




  $scope.logOut = function () {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('auth-token')
    $location.url('/login');
  }
  settingLocation();
});
