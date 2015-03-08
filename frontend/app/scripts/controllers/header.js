'use strict';

/**
 * @ngdoc function
 * @name ToDoManagerApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the ToDoManagerApp
 */
angular.module('ToDoManagerApp').controller('HeaderCtrl', function($scope, $auth) {
	// Satellizer auth service instead of authToken
	$scope.isAuthenticated = $auth.isAuthenticated;
});