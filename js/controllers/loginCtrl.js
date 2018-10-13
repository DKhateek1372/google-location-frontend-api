//author : deepak
angular.module('moovleeAssignment')
.controller('LoginCtrl', ['$scope', '$location', '$rootScope', 'User', 'AuthTokenFactory', 'SweetAlert',
 function($scope, $location, $rootScope, User, AuthTokenFactory, SweetAlert) {
  var validateEmail =  function(email) {
    return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
  };
  $scope.user = {};
  $scope.login = function (form) {
    if (form.$invalid) {
      SweetAlert.swal("Error", "Something went Wrong");
      return
    }
    if (!validateEmail($scope.user.email)) {
      SweetAlert.swal('Error', "Email Address Is Not Correct");
    }
    else {
      User.login($scope.user).$promise
      .then (function (user) {
        $rootScope.$broadcast('hideLoginAlert');
        localStorage.setItem('isLoggedIn', "true");
        AuthTokenFactory.setToken(user.token)
        if (user.success){
          $location.url("/home");
        }
        else {
          $scope.user.password = '';
          SweetAlert.swal('Error', "Check Email Or Password");
        }
      });
    }
  }
}]);
