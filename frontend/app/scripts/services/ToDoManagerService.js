'use strict';

/**
 * @ngdoc service
 * @name ToDoManagerApp.TDMService
 * @description
 * # 
 * Service in the ToDoManagerApp.
 */
angular.module('ToDoManagerApp').service('TDMService', function ($http, API_URL, $state) {

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
		.success(function(data, status, headers, config){ 
 			console.log("success"); 
		});
	};

	//GET one todolist with its id
	this.gettodolist = function(_id) {
		return $http.get(API_URL + 'todolist/' + _id)
		.success(function(data, status, headers, config){ 
 			console.log("success"); 
		});

	};

	//DELETE a todolist
	this.deletetodolist = function(obj) {
		return $http.delete(API_URL + 'listtodolist/'+ obj)
		
	};

	//GET todos in a todolist
	this.fetchToDoListToDos = function(_id) {
		return $http.get(API_URL + 'listtodolist/'+ _id)
		
	};

	//GET todolist and all its todos
	this.fetchToDoAndListToDos = function() {
		return $http.get(API_URL + 'listtodolistwithtodos')
		.success(function(){
 			console.log('get success'); 
		});
	};

	/**
	* Manage todo 
	* Delete, Update, GET, POST
	*/
	//ADD a todo
	this.addTodo = function(_mytodo) {
		console.log(_mytodo)
		return $http.post(API_URL + 'add/todo', {
			mytodo : _mytodo
		});
	};
	//GET a todo
	this.getTodo = function(_id) {
		return $http.get(API_URL + 'todo/'+ _id)
		.success(function(data, status, headers, config){ 
 			console.log("sucess"); 
		});
	};

	//GET all todo
	this.getTodo = function() {
		return $http.get(API_URL + 'todo/')
		.success(function(data, status, headers, config){ 
 			console.log("sucess"); 
		});
	};

	//DELETE todo
	this.deleteToDo = function(_id) {
		return $http.delete(API_URL + 'todo/'+ _id);
	};

	//Update todo
	this.updateTodo = function(todo) {
		return $http.put(API_URL + 'todo/'+ todo.id_todo, todo);
	};

	this.updateTodos = function(data) {
		return $http.put(API_URL + 'todo/',{
			data : data
		})
	};


	/* Manage contacts 
	* Delete, Update, GET, POST
	*/
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