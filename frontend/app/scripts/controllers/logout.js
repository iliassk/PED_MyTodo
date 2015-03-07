'use strict';

/**
 * @ngdoc function
 * @name ToDoManagerApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the ToDoManagerApp
 */
angular.module('ToDoManagerApp').controller('LogoutCtrl', function(authToken, $state, $window) {
	authToken.removeToken();
	$window.location.reload();
	$state.go('main');
});