angular.module('moovleeAssignment')
.factory ('Locations', function ($resource, $http) {
  var location = $resource('http://localhost:8080/api/user/:id',{
    "id": "@id"
  }, {
    saveLocation: {
      url: 'http://localhost:8080/api/saveLocation',
      method: 'POST'
    },
    allSearchedLocation: {
      url: 'http://localhost:8080/api/allSearchedLocation',
      method: 'GET'
    }
  });
  return location;
})
