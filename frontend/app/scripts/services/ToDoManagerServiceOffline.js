'use strict';

angular.module('ToDoManagerApp').service('TDMServiceOffline', function ($http, API_URL, $state, $rootScope) {

	var ToDoManagerApp = this;

	//done
	// A appeler DES que vous voulez faire une modif sur un élément des données : ajout, modif, supression, ...
	this.save = function(data){
		console.offline("save")
		$rootScope.isWorking = true
		localStorage.ToDoManagerAppData_XYZ = JSON.stringify(data)
		$rootScope.isWorking = false
	}

	//done
	this.fetchAll = function(f) {
		console.offline("fetchAll")
		$rootScope.isWorking = true
		var data = JSON.parse(localStorage.ToDoManagerAppData_XYZ)
		$rootScope.isWorking = false
		if(f)f(data);
	};

	///////////////////////////////////////////////////
	/**
	* Manage ADD method
	*/
	///////////////////////////////////////////////////

	//ADD a todoList
	this.todolist = function(name, description, color, callback, success, error) {
		console.offline("todolist")
		$rootScope.isWorking = true
		alert('warning', 'OffLine error', 'You cannot create object while in offline mode !!');
		$rootScope.isWorking = false
		error()
	};

	//ADD a todo
	this.addTodo = function(_mytodo, callback, success, error) {
		console.offline("addTodo")
		$rootScope.isWorking = true
		alert('warning', 'OffLine error', 'You cannot create object while in offline mode !!');
		$rootScope.isWorking = false
		error()
	}

	//ADD a todo
	this.addgroup = function(_mytodo, callback, success, error) {
		console.offline("addgroup")
		$rootScope.isWorking = true
		alert('warning', 'OffLine error', 'You cannot create object while in offline mode !!');
		$rootScope.isWorking = false
		error()
	}

	///////////////////////////////////////////////////
	/**
	* Manage DELETE method
	*/
	///////////////////////////////////////////////////
	//DELETE a todolist
	this.deletetodolist = function(obj, data, success, error) {
		console.offline("deletetodolist")
		$rootScope.isWorking = true
		ToDoManagerApp.save(data)
		$rootScope.isWorking = false
		success()
	}

	//DELETE todo
	this.deleteToDo = function(_id, data, success, error) {
		console.offline("deleteToDo")
		$rootScope.isWorking = true
		ToDoManagerApp.save(data)
		$rootScope.isWorking = false
		success()
	}

	//DELETE subtodo
	this.deleteSubToDo = function(_id, data, success, error) {
		console.offline("deleteSubToDo")
		$rootScope.isWorking = true
		ToDoManagerApp.save(data)
		$rootScope.isWorking = false
		success()
	}

	///////////////////////////////////////////////////
	/**
	* Manage PUT method
	*/
	///////////////////////////////////////////////////
	//Update todo
	this.updateTodo = function(todo, data, success, error) {
		console.offline("updateTodo")
		$rootScope.isWorking = true
		ToDoManagerApp.save(data)
		$rootScope.isWorking = false
		success()
	}

	//Update all todos
	this.updateTodos = function(todo, data, success, error) {
		console.offline("updateTodos")
		$rootScope.isWorking = true
		ToDoManagerApp.save(data)
		$rootScope.isWorking = false
		success()
	}
	///////////////////////////////////////////////////
	/**
	* Manage GET method
	*/
	///////////////////////////////////////////////////

	this.generateShareListLink = function(_id, success, error) {
		console.offline("generateShareListLink")
		
		$rootScope.isWorking = true
		alert('warning', 'OffLine error', 'Impossible to generate a share link in OffLine Mode !!');
		$rootScope.isWorking = false
		error()
	}

	this.generateShareToDoLink = function(_id, success, error) {
		console.offline("generateShareToDoLink")
		
		$rootScope.isWorking = true
		alert('warning', 'OffLine error', 'Impossible to generate a share link in OffLine Mode !!');
		$rootScope.isWorking = false
		error()
	}

	this.fetchSharedData = function(url, type, success, error) {
		console.offline("generateShareToDoLink")
		
		$rootScope.isWorking = true
		alert('warning', 'OffLine error', 'Impossible to view a share link in OffLine Mode !!');
		$rootScope.isWorking = false
		error()
	}
});