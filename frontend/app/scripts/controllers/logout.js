'use strict';

/**
 * @ngdoc function
 * @name ToDoManagerApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the ToDoManagerApp
 */
angular.module('ToDoManagerApp').controller('LogoutCtrl', function($auth, $state, $window, $rootScope) {
	$auth.logout();
	$rootScope.canFetchData = false
	$window.location.reload();
	$state.go('main');
});