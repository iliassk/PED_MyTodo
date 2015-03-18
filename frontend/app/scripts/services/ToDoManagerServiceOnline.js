'use strict';

angular.module('ToDoManagerApp').service('TDMServiceOnline', function ($http, API_URL, $state, $rootScope, TDMServiceOffline) {

	var ToDoManagerApp = this;
	ToDoManagerApp.data = {};

	this.init = function(_data){
		ToDoManagerApp.data = _data
	}

	//done
	this.fetchAll = function(f) {
		console.online("fetchAll")
		$rootScope.isWorking = true
		$http.get(API_URL + 'listtodolistwithtodos')
		.success(function(_data){
			console.log("Success fetching all data !!!")
			ToDoManagerApp.data.listsWithToDo = _data;
			TDMServiceOffline.save()
			$rootScope.isWorking = false;
			if(f)f();
		})

		/*$http.get(API_URL + 'listsharedtodolistwithtodos')
		.success(function(_data){
			console.log("Success fetching all data !!!")
			ToDoManagerApp.data.shareListsWithToDo = _data;
			$rootScope.isWorking = false;
			if(f)f();
		})*/
	};

	///////////////////////////////////////////////////
	/**
	* Manage ADD method
	*/
	///////////////////////////////////////////////////

	//ADD a todoList
	this.todolist = function(name, description, color) {
		console.online("todolist")
		$rootScope.isWorking = true

		return $http.post(API_URL + 'todolist', {
			name : name,
			description : description,
			color : color
		}).success(function(){
			ToDoManagerApp.fetchAll()
			$rootScope.isWorking = false
		}).error(function(){
			$rootScope.isWorking = false
		})
	};

	//ADD a todo
	this.addTodo = function(_mytodo) {
		console.online("addTodo")
		$rootScope.isWorking = true;
		return $http.post(API_URL + 'add/todo', {
			mytodo : _mytodo
		}).success(function(){
			ToDoManagerApp.fetchAll()
			$rootScope.isWorking = false;
		}).error(function(){
			$rootScope.isWorking = false;
		});
	}

	//ADD a group
	this.addgroup = function(namegroup) {
		console.online("addgroup")
		$rootScope.isWorking = true;
		return $http.post(API_URL + 'addgroup', {
			name : namegroup
		})
		.success(function(){
			ToDoManagerApp.fetchAll()
			$rootScope.isWorking = false;
		}).error(function(){
			$rootScope.isWorking = false;
		})
	}

	///////////////////////////////////////////////////
	/**
	* Manage DELETE method
	*/
	///////////////////////////////////////////////////
	//DELETE a todolist
	this.deletetodolist = function(obj) {
		console.online("deletetodolist")
		$rootScope.isWorking = true;
		return $http.delete(API_URL + 'listtodolist/'+ obj)
		.success(function(){
			TDMServiceOffline.save()
			$rootScope.isWorking = false;
		}).error(function(){
			$rootScope.isWorking = false;
		})
	}

	//DELETE todo
	this.deleteToDo = function(_id) {
		console.online("deleteToDo")
		$rootScope.isWorking = true
		
		return $http.delete(API_URL + 'todo/'+ _id)
		.success(function(){
			TDMServiceOffline.save()
			$rootScope.isWorking = false
		}).error(function(){
			$rootScope.isWorking = false
		})
	}

	//DELETE subtodo
	this.deleteSubToDo = function(_id) {
		console.online("deleteSubToDo")
		$rootScope.isWorking = true

		return $http.delete(API_URL + 'subtodo/'+ _id)
		.success(function(){
			TDMServiceOffline.save()
			$rootScope.isWorking = false
		}).error(function(){
			$rootScope.isWorking = false
		})
	}

	///////////////////////////////////////////////////
	/**
	* Manage PUT method
	*/
	///////////////////////////////////////////////////
	//Update todo
	this.updateTodo = function(todo) {
		console.online("updateTodo")
		$rootScope.isWorking = true;
		
		return $http.put(API_URL + 'todo/'+ todo.id_todo, todo)
		.success(function(){
			TDMServiceOffline.save()
			$rootScope.isWorking = false;
		}).error(function(){
			$rootScope.isWorking = false;
		});
	}

	//updates multiple todos
	this.updateTodos = function(data) {
		console.online("updateTodos")
		$rootScope.isWorking = true;
		
		return $http.put(API_URL + 'todo/',{
			data : data
		}).success(function(){
			TDMServiceOffline.save()
			$rootScope.isWorking = false;
		}).error(function(){
			$rootScope.isWorking = false;
		});		
	}

	///////////////////////////////////////////////////
	/**
	* Manage GET method
	*/
	///////////////////////////////////////////////////

	this.generateShareListLink = function(_id) {
		console.online("generateShareListLink")
		$rootScope.isWorking = true;
		return $http.get(API_URL + 'share/todolist/'+ _id)
		.success(function(){
			$rootScope.isWorking = false;
		}).error(function(){
			$rootScope.isWorking = false;
		})
	}

	this.generateShareToDoLink = function(_id) {
		console.online("generateShareToDoLink")
		$rootScope.isWorking = true;
		return $http.get(API_URL + 'share/todo/'+ _id)
		.success(function(){
			$rootScope.isWorking = false;
		}).error(function(){
			$rootScope.isWorking = false;
		})
	}

	this.fetchSharedData = function(url, type) {
		console.online("fetchSharedData")
		$rootScope.isWorking = true;
		return $http.get(API_URL + 'share/data/'+ url + '/' + type)
		.success(function(){
			$rootScope.isWorking = false;
		}).error(function(){
			$rootScope.isWorking = false;
		})
	}

	//GET all groupe
	this.listGroupe = function() {
		console.online("listGroupe")

		$rootScope.isWorking = true;
		return $http.get(API_URL + 'listgroupe')
		.success(function(){
			$rootScope.isWorking = false;
		}).error(function(){
			$rootScope.isWorking = false;
		})
	}

	//GET all contact
	this.listcontact = function() {
		console.online("listcontact")

		$rootScope.isWorking = true;
		return $http.get(API_URL + 'listcontact')
		.success(function(){
			$rootScope.isWorking = false;
		}).error(function(){
			$rootScope.isWorking = false;
		})
	}
});