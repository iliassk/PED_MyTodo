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
	* Manage the todo list
	* Add, Get, Delete
	*/
	//ADD a todoList
	this.todolist = function(name, description, color) {
		return $http.post(API_URL + 'todolist', {
			name : name,
			description : description,
			color : color
		}).success(function(r,s){ 
 			console.log('success'); 
		});
	};
	//GET all todolist
	this.listtodolist = function() {
		return $http.get(API_URL + 'listtodolist')
		.success(function(data, status, headers, config){ 
 			console.log("sucess"); 
		});
	};
	//DELETE a todolist
	//deleteTodoList(list.id_list)
	this.deletetodolist = function(obj) {
		return $http.delete(API_URL + 'listtodolist/'+ obj)
		.success(function(){ 
 			console.log('delete success'); 
		});
	};

	//GET todos in a todolist
	this.fetchToDoListToDos = function(_id) {
		return $http.get(API_URL + 'listtodolist/'+ _id)
		.success(function(){
 			console.log('get success'); 
		});
	};

	/**
	* Manage todo 
	* Delete, Update
	*/
	//DELETE todo
	this.deleteToDo = function(_id) {
		return $http.delete(API_URL + 'todo/'+ _id);
	};

	//Update todo
	this.updateTodo = function(todo) {
		return $http.put(API_URL + 'todo/'+ todo.id_todo, todo);
	};
});