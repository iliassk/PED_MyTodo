'use strict';

/**
 * @ngdoc service
 * @name ToDoManagerApp.TDMService
 * @description
 * # 
 * Service in the ToDoManagerApp.
 */
angular.module('ToDoManagerApp').service('TDMService', function ($http, API_URL, authToken, $state) {

	/**
	* Manage todolist 
	* ADD, GET, Delete, UPDATE
	*/

	//ADD a todoList
	this.todolist = function(name, description, color) {
		return $http.post(API_URL + 'todolist', {
			name : name,
			description : description,
			color : color
		})
	};

	//GET all todolist
	this.listtodolist = function() {
		return $http.get(API_URL + 'listtodolist')
		
	};

	//DELETE a todolist
	this.deletetodolist = function(obj) {
		return $http.delete(API_URL + 'listtodolist/'+ obj)
		
	};

	//GET todos in a todolist
	this.fetchToDoListToDos = function(_id) {
		return $http.get(API_URL + 'listtodolist/'+ _id)
		
	};

	/**
	* Manage todo 
	* Delete, Update, GET, POST
	*/

	//DELETE todo
	this.deleteToDo = function(_id) {
		return $http.delete(API_URL + 'todo/'+ _id);
	};

	//Update todo
	this.updateTodo = function(todo) {
		return $http.put(API_URL + 'todo/'+ todo.id_todo, todo);
	};

	//GET all groupe
	this.listGroupe = function() {
		return $http.get(API_URL + 'listgroupe')

	};

	//ADD a group
	this.addgroup = function(namegroup) {
		return $http.post(API_URL + 'addgroup', {
			name : namegroup
		})
	};

	//GET all contact
	this.listcontact = function() {
		return $http.get(API_URL + 'listcontact')

	};



});