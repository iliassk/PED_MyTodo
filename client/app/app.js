'use strict';

/* App Module */
angular.module('todoManager', [
  'ngRoute',
  'TODOManager'
])

.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      otherwise({
        redirectTo: '/dashboard'
      });
}]);