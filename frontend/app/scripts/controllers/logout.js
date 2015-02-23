'use strict';

/**
 * @ngdoc function
 * @name ToDoManagerApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the ToDoManagerApp
 */
angular.module('ToDoManagerApp').controller('LogoutCtrl', function(authToken, $state) {
	authToken.removeToken();
	$state.go('main');
});