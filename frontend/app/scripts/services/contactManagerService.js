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

	//GET users not in contact
	this.userslist = function() {
		return $http.get(API_URL + 'userslist')
		
	};
	this.addContact = function(id) {
		return $http.post(API_URL + 'addcontact', {
			id : id
		})
	};

	
});