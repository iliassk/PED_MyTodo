'use strict';

/**
 * @ngdoc service
 * @name ToDoManagerApp.auth
 * @description
 * # auth
 * Service in the ToDoManagerApp.
 */
angular.module('ToDoManagerApp').service('todolistservice', function ($http, API_URL, authToken, $state) {

	

	this.todolist = function(name, description, color) {
		return $http.post(API_URL + 'todolist', {
			name : name,
			description : description,
			color : color
		}).success(function(r,s){ 
 			 console.log('success'); 
				});
		};
});
