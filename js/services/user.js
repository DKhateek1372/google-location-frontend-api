//author : deepak
angular.module('moovleeAssignment')
.factory('User', function($resource, $http, $rootScope, $location) {
   var res;
   res = $resource('http://localhost:8080/api/user/:id', {
     "id": "@id"
   }, {
       login: {
         url: 'http://localhost:8080/api/authenticate',
         method: 'POST'
      },
      getUser: {
         url: 'http://localhost:8080/api/user',
         method: 'GET'
     },
     loggedInUser: {
       url: 'http://localhost:8080/api/loggedInUser',
       method: 'GET'
     },
     signUp: {
       url: 'http://localhost:8080/api/signUp',
       method: 'POST'
     }
 });
return res;
});
