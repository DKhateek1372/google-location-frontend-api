angular.module('moovleeAssignment').factory("AuthTokenFactory", function($window) {
  var getToken, key, setToken, store;
  getToken = function() {
    return store.getItem(key);
  };
  setToken = function(token) {
    if (token) {
      return store.setItem(key, token);
    } else {
      return store.removeItem(key);
    }
  };
  store = $window.localStorage;
  key = "auth-token";
  return {
    getToken: getToken,
    setToken: setToken
  };
});

angular.module('moovleeAssignment').factory('authInterceptor', function (AuthTokenFactory) {
 return {
   request : function (config) {
     token = AuthTokenFactory.getToken();
     config.headers = config.headers || {};
     if (token) {
       config.headers.Authorization = token
     }
     return config;
   },
   response: function (res) {
     return res;
   }
 }
})
