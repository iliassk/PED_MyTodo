'use strict';

angular.module('ToDoManagerApp').service('TDMServiceOnline', function ($http, API_URL, $state, $rootScope, TDMServiceOffline) {

	var ToDoManagerApp = this;

	this.fetchAll = function(f) {
		var data = {
			listsWithToDo: [],
			group: '',
			contact: '',
			shareListsWithToDo: []
		}
		$rootScope.isWorking = true
		$http.get(API_URL + 'listtodolistwithtodos')
		.success(function(_data){
			data.listsWithToDo = _data;
			TDMServiceOffline.save(data)
			$http.get(API_URL + 'listgroupe')
			.success(function(_groupe){
				data.group = _groupe;
				$http.get(API_URL + 'listcontact')
				.success(function(_contact){
					data.contact = _contact;
					$rootScope.isWorking = false;
					if(f)f(data);
				})
			})
		})

		/*$http.get(API_URL + 'listsharedtodolistwithtodos')
		.success(function(_data){
			console.log("Success fetching all data !!!")
			ToDoManagerApp.data.shareListsWithToDo = _data;
			$rootScope.isWorking = false;
			if(f)f();
		})*/
	};

	this.sync = function(callback){
		console.online("Synchronisation en cours ...")
		return $http.post(
					API_URL + 'sync', 
					JSON.parse(localStorage.ToDoManagerAppData_XYZ)
				).success(function(){
			console.online("Synchronisation en terminé")
			$rootScope.isWorking = false
			callback()
		}).error(function(){
			console.online("Synchronisation échec")
			$rootScope.isWorking = false
			callback()
		})
	}

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
	/*this.listGroupe = function() {
		console.online("listGroupe")

		$rootScope.isWorking = true;
		return $http.get(API_URL + 'listgroupe')
		.success(function(){
			$rootScope.isWorking = false;
		}).error(function(){
			$rootScope.isWorking = false;
		})
	}*/

	//GET all contact
	/*this.listcontact = function() {
		console.online("listcontact")

		$rootScope.isWorking = true;
		return $http.get(API_URL + 'listcontact')
		.success(function(){
			$rootScope.isWorking = false;
		}).error(function(){
			$rootScope.isWorking = false;
		})
	}*/
});