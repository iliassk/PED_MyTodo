'use strict';

/**
 * @ngdoc service
 * @name ToDoManagerApp.auth
 * @description
 * # auth
 * Service in the ToDoManagerApp.
 */
angular.module('ToDoManagerApp').service('auth', function ($http, API_URL, authToken, $state) {

	function authSuccessful(res) {
		authToken.setToken(res.token);
		$state.go('main');
	}

	this.login = function(email, password) {
		return $http.post(API_URL + 'login', {
			email : email,
			password : password
		}).success(authSuccessful);
	};

	this.register = function(username, email, password) {
		return $http.post(API_URL + 'register', {
			username : username,
			email : email,
			password : password
		}).success(authSuccessful);
	};
});
