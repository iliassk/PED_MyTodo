'use strict';

/**
 * @ngdoc function
 * @name ToDoManagerApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the ToDoManagerApp
 */
angular.module('ToDoManagerApp').controller('LogoutCtrl', function($auth, $state, $window) {
	$auth.logout();
	$window.location.reload();
	$state.go('main');
});