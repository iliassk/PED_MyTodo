'use strict';

/**
 * @ngdoc service
 * @name ToDoManagerApp.TDMService
 * @description
 * # 
 * Service in the ToDoManagerApp.
 */
angular.module('ToDoManagerApp').service('CMService', function ($http, API_URL, authToken, $state) {

	/**
	* Manage todolist 
	* ADD, GET, Delete, UPDATE
	*/

	//GET all users
	this.userslist = function() {
		return $http.get(API_URL + 'userslist')
		
	};

	
});