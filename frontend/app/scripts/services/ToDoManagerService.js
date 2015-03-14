'use strict';

/**
 * @ngdoc service
 * @name ToDoManagerApp.TDMService
 * @description
 * 
 * Service in the ToDoManagerApp.
 */
angular.module('ToDoManagerApp').service('TDMService', function ($http, API_URL, $state) {

	var ToDoManagerApp = this;

	//Shared data used for synchronisation between controllers
	ToDoManagerApp.data = {
		listsWithToDo: '',
		groupe: '',
		contact: '',
		isWorking : false
	}

	this.refresh = function(callback){
		
		if(ToDoManagerApp.data.listsWithToDo == ''){
			ToDoManagerApp.data.isWorking = true;
			ToDoManagerApp.fetchAll(callback);
		}else if(callback)
			callback()
	}

	this.fetchAll = function(f) {
		console.log("Starting fetching data ...")
		$http.get(API_URL + 'listtodolistwithtodos')
		.success(function(_data){
			console.log("Success fetching all data !!!")
			ToDoManagerApp.data.listsWithToDo = _data;
			ToDoManagerApp.data.isWorking = false;
			if(f)f();
		})
	};

	this.getAList = function(_id) {
		ToDoManagerApp.data.isWorking = true
		for(var i=0; i < ToDoManagerApp.data.listsWithToDo.length; i++){
			if(ToDoManagerApp.data.listsWithToDo[i].id_list == _id)
				return ToDoManagerApp.data.listsWithToDo[i]
		}
		ToDoManagerApp.data.isWorking = false
	};

	this.getAToDo = function(_id) {
		ToDoManagerApp.data.isWorking = true;
		for(var i=0; i < ToDoManagerApp.data.listsWithToDo.length; i++){
			if(ToDoManagerApp.data.listsWithToDo[i].todos)
			for(var j=0; j < ToDoManagerApp.data.listsWithToDo[i].todos.length; j++){
				if(ToDoManagerApp.data.listsWithToDo[i].todos[j].id_todo == _id){
					ToDoManagerApp.data.isWorking = false;
					return ToDoManagerApp.data.listsWithToDo[i].todos[j]
				}
			}
		}
	};

	/**
	* Manage todolist 
	* ADD, GET, Delete, UPDATE
	*/

	//ADD a todoList
	this.todolist = function(name, description, color) {
		ToDoManagerApp.data.isWorking = true;
		return $http.post(API_URL + 'todolist', {
			name : name,
			description : description,
			color : color
		}).success(function(){
			ToDoManagerApp.data.isWorking = false;
		}).error(function(){
			ToDoManagerApp.data.isWorking = false;
		})
	};

	//GET all todolist
	this.listtodolist = function() {
		ToDoManagerApp.data.isWorking = true;
		return $http.get(API_URL + 'listtodolist')
		.success(function(){
			ToDoManagerApp.data.isWorking = false;
		}).error(function(){
			ToDoManagerApp.data.isWorking = false;
		})
	};

	//GET one todolist with its id
	this.gettodolist = function(_id) {
		ToDoManagerApp.data.isWorking = true;
		return $http.get(API_URL + 'todolist/' + _id)
		.success(function(){
			ToDoManagerApp.data.isWorking = false;
		}).error(function(){
			ToDoManagerApp.data.isWorking = false;
		})
	};

	//DELETE a todolist
	this.deletetodolist = function(obj) {
		ToDoManagerApp.data.isWorking = true;
		return $http.delete(API_URL + 'listtodolist/'+ obj)
		.success(function(){
			ToDoManagerApp.data.isWorking = false;
		}).error(function(){
			ToDoManagerApp.data.isWorking = false;
		})
	};

	//GET todos in a todolist
	this.fetchToDoListToDos = function(_id) {
		ToDoManagerApp.data.isWorking = true;
		return $http.get(API_URL + 'listtodolist/'+ _id)
		.success(function(){
			ToDoManagerApp.data.isWorking = false;
		}).error(function(){
			ToDoManagerApp.data.isWorking = false;
		})
	};

	//GET todolist and all its todos
	this.fetchToDoAndListToDos = function() {
		ToDoManagerApp.data.isWorking = true;
		return $http.get(API_URL + 'listtodolistwithtodos')
		.success(function(){
			ToDoManagerApp.data.isWorking = false;
		}).error(function(){
			ToDoManagerApp.data.isWorking = false;
		})
	};

	/**
	* Manage todo 
	* Delete, Update, GET, POST
	*/
	//ADD a todo
	this.addTodo = function(_mytodo) {
		ToDoManagerApp.data.isWorking = true;
		return $http.post(API_URL + 'add/todo', {
			mytodo : _mytodo
		}).success(function(){
			ToDoManagerApp.data.isWorking = false;
		}).error(function(){
			ToDoManagerApp.data.isWorking = false;
		});
	};
	//GET a todo
	this.getTodo = function(_id) {
		ToDoManagerApp.data.isWorking = true;
		return $http.get(API_URL + 'todo/'+ _id)
		.success(function(){
			ToDoManagerApp.data.isWorking = false;
		}).error(function(){
			ToDoManagerApp.data.isWorking = false;
		})
	};

	//DELETE todo
	this.deleteToDo = function(_id) {
		ToDoManagerApp.data.isWorking = true;
		for(var i=0; i < ToDoManagerApp.data.listsWithToDo.length; i++){
			for(var j=0; j < ToDoManagerApp.data.listsWithToDo[i].todos.length; j++){
				if(ToDoManagerApp.data.listsWithToDo[i].todos[j].id_todo == _id)
					ToDoManagerApp.data.listsWithToDo[i].todos.splice(j, 1)
			}
		}

		return $http.delete(API_URL + 'todo/'+ _id)
		.success(function(){
			ToDoManagerApp.data.isWorking = false;
		}).error(function(){
			ToDoManagerApp.data.isWorking = false;
		});
	};

	//Update todo
	this.updateTodo = function(todo) {
		ToDoManagerApp.data.isWorking = true;
		return $http.put(API_URL + 'todo/'+ todo.id_todo, todo)
		.success(function(){
			ToDoManagerApp.data.isWorking = false;
		}).error(function(){
			ToDoManagerApp.data.isWorking = false;
		});
	};


	/* Manage contacts 
	* Delete, Update, GET, POST
	*/
	//GET all groupe
	this.listGroupe = function() {
		ToDoManagerApp.data.isWorking = true;
		return $http.get(API_URL + 'listgroupe')
		.success(function(){
			ToDoManagerApp.data.isWorking = false;
		}).error(function(){
			ToDoManagerApp.data.isWorking = false;
		})

	};

	//ADD a group
	this.addgroup = function(namegroup) {
		ToDoManagerApp.data.isWorking = true;
		return $http.post(API_URL + 'addgroup', {
			name : namegroup
		})
		.success(function(){
			ToDoManagerApp.data.isWorking = false;
		}).error(function(){
			ToDoManagerApp.data.isWorking = false;
		})
	};

	//GET all contact
	this.listcontact = function() {
		ToDoManagerApp.data.isWorking = true;
		return $http.get(API_URL + 'listcontact')
		.success(function(){
			ToDoManagerApp.data.isWorking = false;
		}).error(function(){
			ToDoManagerApp.data.isWorking = false;
		})
	};



});