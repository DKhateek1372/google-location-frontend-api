//author : deepak
angular.module('moovleeAssignment')
.controller('Locations', function($scope, $location, Locations){
  $scope.location = location;
  Locations.allSearchedLocation().$promise
  .then (function (searchedlocation) {
    // console.log("locations", searchedlocation.locations);
    $scope.locations = searchedlocation.locations;
    // console.log("$scope.locations", $scope.locations);
  })
  .catch (function(err) {
    console.log("Err", err);
  });
  
  $scope.logOut = function () {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('auth-token')
    $location.url('/login');
  };
});
