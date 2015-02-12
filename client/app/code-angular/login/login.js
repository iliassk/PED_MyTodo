'use strict';

angular.module('LoginCtrl', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'code-angular/login/login.html',
    controller: 'LoginCtrl'
  });
}])

.controller('LoginCtrl', ['$scope', 'TODOManager', '$location', function($scope, TODOManager, $location) {

    $scope.login = function () {

        var credentials = {
            email: this.email,
            pwd: this.password
        };

        console.log(credentials);

    };
}]);
