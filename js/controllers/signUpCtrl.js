//author : deepak
angular.module('moovleeAssignment')
.controller('SignUpCtrl', function($scope, User, $location, SweetAlert){
  var validateEmail =  function(email) {
    return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
  };
  $scope.user = {};
  $scope.passwordMatched = false;
  $scope.submitForm = function (form) {
    console.log("Here");
    if (form.$invalid) {
      SweetAlert.swal('Alert', "Something Worng");
      return
    }
    if (!validateEmail($scope.user.email)) {
      SweetAlert.swal('Error', "Email Address Is Not Correct");
    }
    else {
      if ($scope.user.password != $scope.user.repassword) {
        SweetAlert.swal('Error', "password is not matching");
        return
      }
      else {
        User.signUp({
          firstName: $scope.user.firstName,
          lastName: $scope.user.lastName,
          email: $scope.user.email,
          password: $scope.user.password
        }).$promise
        .then (function (singedUpUser) {
          if (singedUpUser) {
            $location.url('/login')
          }
        })
        .catch (function (err) {
          console.log("Error Occur while signUp", err);
        })
      }
    }
  };
  $scope.$watchCollection('user.repassword', function() {
    if ($scope.user.password !== '' && $scope.user.password !== undefined && $scope.user.password === $scope.user.repassword) {
      $scope.passwordMatched = true;
    }
    else {
      $scope.passwordMatched = false;
    }
  });
});
