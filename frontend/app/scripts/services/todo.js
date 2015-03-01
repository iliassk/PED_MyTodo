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

	this.add = function(email, mytodo) {
		return $http.post(API_URL + 'add/todo', {
			email : email,
			mytodo : mytodo
		});//.success(authSuccessful);
	};

	/*this.modify = function(oldtodo, newtodo) {
		return $http.post(API_URL + 'register', {
			username : username,
			email : email,
			password : password
		}).success(authSuccessful);
	};*/
});
