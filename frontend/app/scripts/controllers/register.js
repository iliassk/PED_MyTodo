'use strict';

/**
 * @ngdoc function
 * @name ToDoManagerApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the ToDoManagerApp
 */
angular.module('ToDoManagerApp').controller('RegisterCtrl', function($scope, alert, $auth, $rootScope) {
	$scope.submit = function() {

		$auth.signup({ 
			username: $scope.username,
			email: $scope.email,
			password: $scope.password
		}).then(function(res) {
			$rootScope.canFetchData = true
			alert('success', 'Account Created!', 'Welcome, ' + res.data.user.username + ' ! Please activate your account in the next few days.');
		})
		.catch(function(err) {
			alert('warning', 'Something went wrong :(', 'Email or/and password already in use !');
		});
	};
});