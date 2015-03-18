'use strict';

angular.module('ToDoManagerApp').service('TDMServiceOffline', function ($http, API_URL, $state, $rootScope) {

	var ToDoManagerApp = this;
	ToDoManagerApp.data = {};

	this.init = function(_data){
		ToDoManagerApp.data = _data
	}

	//done
	// A appeler DES que vous voulez faire une modif sur un élément des données : ajout, modif, supression, ...
	this.save = function(){
		console.offline("save")
		$rootScope.isWorking = true
		localStorage.ToDoManagerAppData_XYZ = JSON.stringify(ToDoManagerApp.data)
		$rootScope.isWorking = false
	}

	//done
	this.fetchAll = function(f) {
		console.offline("fetchAll")
		$rootScope.isWorking = true
		ToDoManagerApp.data = JSON.parse(localStorage.ToDoManagerAppData_XYZ)
		$rootScope.isWorking = false
	};

	///////////////////////////////////////////////////
	/**
	* Manage ADD method
	*/
	///////////////////////////////////////////////////

	//ADD a todoList
	this.todolist = function(name, description, color) {
		console.offline("todolist")
		$rootScope.isWorking = true
		alert('warning', 'OffLine error', 'You cannot create object while in offline mode !!');
		$rootScope.isWorking = false
	};

	//ADD a todo
	this.addTodo = function(_mytodo) {
		console.offline("addTodo")
		$rootScope.isWorking = true
		alert('warning', 'OffLine error', 'You cannot create object while in offline mode !!');
		$rootScope.isWorking = false
	}

	//ADD a todo
	this.addgroup = function(_mytodo) {
		console.offline("addgroup")
		$rootScope.isWorking = true
		alert('warning', 'OffLine error', 'You cannot create object while in offline mode !!');
		$rootScope.isWorking = false
	}

	///////////////////////////////////////////////////
	/**
	* Manage DELETE method
	*/
	///////////////////////////////////////////////////
	//DELETE a todolist
	this.deletetodolist = function(obj) {
		console.offline("deletetodolist")
		$rootScope.isWorking = true
		ToDoManagerApp.save()
		$rootScope.isWorking = false
	}

	//DELETE todo
	this.deleteToDo = function(_id) {
		console.offline("deleteToDo")
		$rootScope.isWorking = true
		ToDoManagerApp.save()
		$rootScope.isWorking = false
	}

	//DELETE subtodo
	this.deleteSubToDo = function(_id) {
		console.offline("deleteSubToDo")
		$rootScope.isWorking = true
		ToDoManagerApp.save()
		$rootScope.isWorking = false
	}

	///////////////////////////////////////////////////
	/**
	* Manage PUT method
	*/
	///////////////////////////////////////////////////
	//Update todo
	this.updateTodo = function(todo) {
		console.offline("updateTodo")
		$rootScope.isWorking = true
		ToDoManagerApp.save()
		$rootScope.isWorking = false
	}

	///////////////////////////////////////////////////
	/**
	* Manage GET method
	*/
	///////////////////////////////////////////////////

	this.generateShareListLink = function(_id) {
		console.offline("generateShareListLink")
		
		$rootScope.isWorking = true
		alert('warning', 'OffLine error', 'Impossible to generate a share link in OffLine Mode !!');
		$rootScope.isWorking = false
	}

	this.generateShareToDoLink = function(_id) {
		console.offline("generateShareToDoLink")
		
		$rootScope.isWorking = true
		alert('warning', 'OffLine error', 'Impossible to generate a share link in OffLine Mode !!');
		$rootScope.isWorking = false
	}

	this.fetchSharedData = function(url, type) {
		console.offline("generateShareToDoLink")
		
		$rootScope.isWorking = true
		alert('warning', 'OffLine error', 'Impossible to view a share link in OffLine Mode !!');
		$rootScope.isWorking = false
	}
});