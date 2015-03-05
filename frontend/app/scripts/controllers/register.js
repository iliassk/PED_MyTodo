'use strict';

/**
 * @ngdoc function
 * @name ToDoManagerApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the ToDoManagerApp
 */
angular.module('ToDoManagerApp').controller('RegisterCtrl', function($scope, alert, auth) {
	$scope.submit = function() {

		auth.register($scope.username, $scope.email, $scope.password)	
			.success(function(res) {
				alert('success', 'Account Created!', 'Welcome, ' + res.user.username + ' !');
			})
			.error(function(err) {
				alert('warning', 'Something went wrong :(', 'Email or/and password already in use !');
			});
	};
});