'use strict';

/**
 * @ngdoc function
 * @name ToDoManagerApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the ToDoManagerApp
 */
angular.module('ToDoManagerApp').controller('RegisterCtrl', function($scope, alert, $auth) {
	$scope.submit = function() {

		$auth.signup({ 
			username: $scope.username,
			email: $scope.email,
			password: $scope.password
		}).then(function(res) {
			alert('success', 'Account Created!', 'Welcome, ' + res.data.user.username + ' !');
		})
		.catch(function(err) {
			alert('warning', 'Something went wrong :(', 'Email or/and password already in use !');
		});
	};
});