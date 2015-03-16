'use strict';

/**
 * @ngdoc service
 * @name ToDoManagerApp.TDMService
 * @description
 * 
 * Service in the ToDoManagerApp.
 */
angular.module('ToDoManagerApp').service('TDMService', function ($http, API_URL, $state, $rootScope) {

	var ToDoManagerApp = this;

	//Shared data used for synchronisation between controllers
	ToDoManagerApp.data = {
		listsWithToDo: [],
		groupe: '',
		contact: '',
		shareListsWithToDo: []
	}

	this.refresh = function(callback){
		
		if(ToDoManagerApp.data.listsWithToDo == ''){
			$rootScope.isWorking = true
			ToDoManagerApp.fetchAll(callback);
		}else if(callback)
			callback()
	}

	this.fetchAll = function(f) {
		$rootScope.isWorking = true
		$http.get(API_URL + 'listtodolistwithtodos')
		.success(function(_data){
			console.log("Success fetching all data !!!")
			ToDoManagerApp.data.listsWithToDo = _data;
			console.log(ToDoManagerApp.data.listsWithToDo)
			$rootScope.isWorking = false;
			if(f)f();
		})

		$http.get(API_URL + 'listsharedtodolistwithtodos')
		.success(function(_data){
			console.log("Success fetching all data !!!")
			ToDoManagerApp.data.shareListsWithToDo = _data;
			$rootScope.isWorking = false;
			if(f)f();
		})

		
	};

	this.getAList = function(_id) {
		$rootScope.isWorking = true
		for(var i=0; i < ToDoManagerApp.data.listsWithToDo.length; i++){
			if(ToDoManagerApp.data.listsWithToDo[i].id_list == _id)
				return ToDoManagerApp.data.listsWithToDo[i]
		}
		$rootScope.isWorking = false
	};

	this.getAToDo = function(_id) {
		$rootScope.isWorking = true;
		for(var i=0; i < ToDoManagerApp.data.listsWithToDo.length; i++){
			if(ToDoManagerApp.data.listsWithToDo[i].todos)
			for(var j=0; j < ToDoManagerApp.data.listsWithToDo[i].todos.length; j++){
				if(ToDoManagerApp.data.listsWithToDo[i].todos[j].id_todo == _id){
					$rootScope.isWorking = false;
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
		$rootScope.isWorking = true;
		return $http.post(API_URL + 'todolist', {
			name : name,
			description : description,
			color : color
		}).success(function(){
			$rootScope.isWorking = false;
		}).error(function(){
			$rootScope.isWorking = false;
		})
	};

	//GET all todolist
	this.listtodolist = function() {
		$rootScope.isWorking = true;
		return $http.get(API_URL + 'listtodolist')
		.success(function(){
			$rootScope.isWorking = false;
		}).error(function(){
			$rootScope.isWorking = false;
		})
	};

	//GET one todolist with its id
	this.gettodolist = function(_id) {
		$rootScope.isWorking = true;
		return $http.get(API_URL + 'todolist/' + _id)
		.success(function(){
			$rootScope.isWorking = false;
		}).error(function(){
			$rootScope.isWorking = false;
		})
	};

	//DELETE a todolist
	this.deletetodolist = function(obj) {
		$rootScope.isWorking = true;
		return $http.delete(API_URL + 'listtodolist/'+ obj)
		.success(function(){
			$rootScope.isWorking = false;
		}).error(function(){
			$rootScope.isWorking = false;
		})
	};

	//GET todos in a todolist
	this.fetchToDoListToDos = function(_id) {
		$rootScope.isWorking = true;
		return $http.get(API_URL + 'listtodolist/'+ _id)
		.success(function(){
			$rootScope.isWorking = false;
		}).error(function(){
			$rootScope.isWorking = false;
		})
	};

	//GET todolist and all its todos
	this.fetchToDoAndListToDos = function() {
		$rootScope.isWorking = true;
		return $http.get(API_URL + 'listtodolistwithtodos')
		.success(function(){
			$rootScope.isWorking = false;
		}).error(function(){
			$rootScope.isWorking = false;
		})
	};

	/**
	* Manage todo 
	* Delete, Update, GET, POST
	*/
	//ADD a todo
	this.addTodo = function(_mytodo) {
		$rootScope.isWorking = true;
		return $http.post(API_URL + 'add/todo', {
			mytodo : _mytodo
		}).success(function(){
			$rootScope.isWorking = false;
		}).error(function(){
			$rootScope.isWorking = false;
		});
	};
	//GET a todo
	this.getTodo = function(_id) {
		$rootScope.isWorking = true;
		return $http.get(API_URL + 'todo/'+ _id)
		.success(function(){
			$rootScope.isWorking = false;
		}).error(function(){
			$rootScope.isWorking = false;
		})
};

	//GET all todo
	this.getTodo = function() {
		return $http.get(API_URL + 'todo/')
		.success(function(data, status, headers, config){ 
		});
	}
	

	//DELETE todo
	this.deleteToDo = function(_id) {
		$rootScope.isWorking = true;
		for(var i=0; i < ToDoManagerApp.data.listsWithToDo.length; i++){
			for(var j=0; j < ToDoManagerApp.data.listsWithToDo[i].todos.length; j++){
				if(ToDoManagerApp.data.listsWithToDo[i].todos[j].id_todo == _id)
					ToDoManagerApp.data.listsWithToDo[i].todos.splice(j, 1)
			}
		}

		return $http.delete(API_URL + 'todo/'+ _id)
		.success(function(){
			$rootScope.isWorking = false;
		}).error(function(){
			$rootScope.isWorking = false;
		});
	};

	//Update todo
	this.updateTodo = function(todo) {
		$rootScope.isWorking = true;
		return $http.put(API_URL + 'todo/'+ todo.id_todo, todo)
		.success(function(){
			$rootScope.isWorking = false;
		}).error(function(){
			$rootScope.isWorking = false;
		});
	};

	//DELETE subtodo
	this.deleteSubToDo = function(_id) {
		return $http.delete(API_URL + 'subtodo/'+ _id);
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
		$rootScope.isWorking = true;
		return $http.get(API_URL + 'listgroupe')
		.success(function(){
			$rootScope.isWorking = false;
		}).error(function(){
			$rootScope.isWorking = false;
		})

	};

	//ADD a group
	this.addgroup = function(namegroup) {
		$rootScope.isWorking = true;
		return $http.post(API_URL + 'addgroup', {
			name : namegroup
		})
		.success(function(){
			$rootScope.isWorking = false;
		}).error(function(){
			$rootScope.isWorking = false;
		})
	};

	//GET all contact
	this.listcontact = function() {
		$rootScope.isWorking = true;
		return $http.get(API_URL + 'listcontact')
		.success(function(){
			$rootScope.isWorking = false;
		}).error(function(){
			$rootScope.isWorking = false;
		})
	};

	this.generateShareListLink = function(_id) {
		$rootScope.isWorking = true;
		return $http.get(API_URL + 'share/todolist/'+ _id)
		.success(function(){
			$rootScope.isWorking = false;
		}).error(function(){
			$rootScope.isWorking = false;
		})
	};

	this.generateShareToDoLink = function(_id) {
		$rootScope.isWorking = true;
		return $http.get(API_URL + 'share/todo/'+ _id)
		.success(function(){
			$rootScope.isWorking = false;
		}).error(function(){
			$rootScope.isWorking = false;
		})
	};

	this.fetchSharedData = function(url, type) {
		$rootScope.isWorking = true;
		return $http.get(API_URL + 'share/data/'+ url + '/' + type)
		.success(function(){
			$rootScope.isWorking = false;
		}).error(function(){
			$rootScope.isWorking = false;
		})
	};

});