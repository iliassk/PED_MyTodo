'use strict';

/**
 * @ngdoc function
 * @name ToDoManagerApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the ToDoManagerApp
 */
angular.module('ToDoManagerApp').controller('LoginCtrl', function($scope, alert, $auth) {

	$scope.submit = function() {

		$auth.login({ 
			email: $scope.email, 
			password: $scope.password 
		}).then(function(res) {
			var message = 'Thanks for coming back, ' + res.data.user.email + ' !';
			
			if (!res.data.user.active)
				message = 'Just a reminder, please activate your account soon !';

			alert('success', 'Welcome!', message);
		})
		.catch(function(err) {
			alert('warning', 'Something went wrong :(', 'Incorrect email or/and password !');
		});
	};

	$scope.authenticate = function(provider) {
		// Google/Facebook Auth function
		$auth.authenticate(provider).then(function(res) {
            angular.element("#wrapper").removeClass("toggled");
			alert('success', 'Welcome!', 'Thanks for coming back, ' + res.data.user.email + ' !');
		}, function(err) {
            angular.element("#wrapper").addClass("toggled");
			alert('warning', 'Something went wrong :(', 'Unable to connect you with your ' + provider +' account !');
		});
	}
});