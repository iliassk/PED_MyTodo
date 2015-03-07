'use strict';

/**
 * @ngdoc function
 * @name ToDoManagerApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the ToDoManagerApp
 */
angular.module('ToDoManagerApp').controller('LoginCtrl', function($scope, alert, auth) {

	$scope.submit = function() {

		auth.login($scope.email, $scope.password)
			.success(function(res) {
				alert('success', 'Welcome!', 'Thanks for coming back, ' + res.user.email + ' !');
			})
			.error(function(err) {
				alert('warning', 'Something went wrong :(', 'Incorrect email or/and password !');
			});
	};

	$scope.google = function() {
		//Google Auth function
		auth.googleAuth().then(function(res) {
			alert('success', 'Welcome!', 'Thanks for coming back, ' + res.user.email + ' !');
		}, function(err) {
			alert('warning', 'Something went wrong :(', 'Unable to connect you with Google !');
		});
	}
});