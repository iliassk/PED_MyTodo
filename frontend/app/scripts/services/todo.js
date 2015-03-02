'use strict';

/**
 * @ngdoc service
 * @name ToDoManagerApp.auth
 * @description
 * # auth
 * Service in the ToDoManagerApp.
 */
angular.module('ToDoManagerApp').service('todo', function ($http, API_URL, $state) {

	/*function authSuccessful(res) {
		authToken.setToken(res.token);
		$state.go('main');
	}*/

	this.add = function(_mytodo) {
		console.log(_mytodo)
		return $http.post(API_URL + 'add/todo', {
			mytodo : _mytodo
		});//.success(authSuccessful);
	};

	/*this.edit = function(oldtodo, newtodo) {
		return $http.post(API_URL + 'register', {
			username : username,
			email : email,
			password : password
		}).success(authSuccessful);
	};*/
});
