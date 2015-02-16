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
      when('/login', { templateUrl: 'sources/login/login.html'}).
      otherwise({ redirectTo: '/dashboard'});
}]);