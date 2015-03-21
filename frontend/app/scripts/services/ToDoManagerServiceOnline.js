'use strict';

angular.module('ToDoManagerApp').service('TDMServiceOnline', function ($auth, $http, API_URL, $state, $rootScope, TDMServiceOffline) {

	var ToDoManagerApp = this;
	var data = {
			listsWithToDo: [],
			group: '',
			usersNocontact: '',
			shareListsWithToDo: [],
			currentUser:''
		}

	this.fetchAll = function(f) {
		console.online("fetchAll")
		
		$rootScope.isWorking = true
		$http.get(API_URL + 'listtodolistwithtodos')
		.success(function(_data){
			console.log("Success fetching all data !!!")
			data.listsWithToDo = _data;
			TDMServiceOffline.save(data)

			$http.get(API_URL + 'listgroupe')
			.success(function(_groupe){
					

				data.group = _groupe;
				console.log("===================="+$auth.getPayload().sub+"=======================")
				$http.get(API_URL + 'listuserNocontact/'+$auth.getPayload().sub)
				.success(function(_contact){
					data.usersNocontact = _contact;


				$http.get(API_URL + 'user/'+$auth.getPayload().sub)
				.success(function(_current){
					console.log("Success fetching  "+_current)
					data.currentUser = _current;
					
					
					$rootScope.isWorking = false;
					if(f)f(data);
				})
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

<<<<<<< HEAD
=======
	this.sync = function(callback){
		console.online("Synchronisation en cours ...")
		$rootScope.isWorking = true;

		var data = JSON.parse(localStorage.ToDoManagerAppData_XYZ)
		var lists = data.listsWithToDo,
			todos = []

		var iteration = 0

		if(lists == undefined || !lists || lists.length == 0)
			return callback(100)

		lists.forEach(function (list_elem, list_index, lists_array) {
			todos.push.apply(todos, list_elem.todos)
		})

		var number_of_call = todos.length
		var step_value = number_of_call/100

		var checkIfFinish = function(){
			if(iteration == number_of_call)
				return callback(100)
		}

		todos.forEach(function (todo_elem, todo_index, todos_array) {
			iteration += 1

			$http.put(API_URL + 'todo/'+ todo_elem.id_todo, todo_elem)
			.success(function(){
				callback(iteration*step_value)
				checkIfFinish()
			})
		})
	}

>>>>>>> cc93b82b28e82a6d0f9f12670797de89e9081373
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

	// delete contact

	this.deletecontact = function(idcontact){
		console.online("deletecontact")
		$rootScope.isWorking = true;
		return $http.post(API_URL + 'deletecontact', {
			id : idcontact
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
		
		return $http.put(API_URL + 'todos/',{
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