'use strict';

/**
 * @ngdoc function
 * @name ToDoManagerApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the ToDoManagerApp
 */
angular.module('ToDoManagerApp').controller('LoginCtrl', function($state,$scope, alert, $auth, TDMService, $rootScope) {

	$scope.submit = function() {

		$auth.login({ 
			email: $scope.email, 
			password: $scope.password 
		}).then(function(res) {
			var message = 'Thanks for coming back, ' + res.data.user.email + ' !';
			$rootScope.mustRefresh = true
			if (!res.data.user.active)
				message = 'Just a reminder, please activate your account soon !';
			$state.go('calendar')
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
			$rootScope.canFetchData = true
			$state.go('calendar')
		}, function(err) {
            angular.element("#wrapper").addClass("toggled");
			alert('warning', 'Something went wrong :(', 'Unable to connect you with your ' + provider +' account !');
		});
	}
});