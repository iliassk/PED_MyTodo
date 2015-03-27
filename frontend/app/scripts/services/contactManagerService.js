'use strict';

/**
 * @ngdoc service
 * @name ToDoManagerApp.TDMService
 * @description
 * # 
 * Service in the ToDoManagerApp.
 */
angular.module('ToDoManagerApp').service('CMService', function ($http, API_URL, $state) {

	/**
	* Manage todolist 
	* ADD, GET, Delete, UPDATE
	*/

	//GET users not in contact
	this.userslist = function() {
		return $http.get(API_URL + 'userslist')
		
	};

	//add contact to group
	this.addContact = function(id, item) {
		return $http.post(API_URL + 'addcontact', {
			id : id,
			item : item
		})
	};

	//GET all groupe
	this.listGroupe = function() {
		return $http.get(API_URL + 'listgroupe')

	};

	
});