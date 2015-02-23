'use strict';

/**
 * @ngdoc function
 * @name ToDoManagerApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the ToDoManagerApp
 */
angular.module('ToDoManagerApp').controller('LoginCtrl', function ($scope, $rootScope, $http, alert, authToken, API_URL) {
	$scope.submit = function() {

		var url = API_URL + 'login';
		var user = {
			email: $scope.email,
			password: $scope.password
		};
		$http.post(url, user)
			.success(function(res) {
				alert('success', 'Welcome!', 'Thanks for coming back, ' + res.user.email + ' !');
				authToken.setToken(res.token);
			})
			.error(function(err) {
				alert('warning', 'Something went wrong :(', err.message);
			});
	};
  });
