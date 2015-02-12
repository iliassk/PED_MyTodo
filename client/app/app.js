'use strict';

/* App Module */
angular.module('todoManager', [
  'ngRoute',
  'LoginCtrl',
  'TODOManager'
])

.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      otherwise({
        redirectTo: '/dashboard'
      });
}]);