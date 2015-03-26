'use strict';

angular.module('ToDoManagerApp').service('TDMServiceOnline', function ($http, API_URL, $state, $rootScope, TDMServiceOffline, $auth) {

	var ToDoManagerApp = this;

	this.fetchAll = function(f) {
		console.online('fetch all');
		var data = {
			listsWithToDo: [],
			group: '',
			usersNocontact: '',
			currentUser:'',
			shareListsWithToDo: [],
			offlineDeleteToDo: [],
			offlineDeleteList: []
		};
		$rootScope.isWorking = true;
		$http.get(API_URL + 'listtodolistwithtodos')
		.success(function(_data){
			data.listsWithToDo = _data;
			//TDMServiceOffline.save(data);
			$http.get(API_URL + 'listgroupe')
			.success(function(_groupe){
				data.group = _groupe;
				//TDMServiceOffline.save(data);
				$http.get(API_URL + 'listuserNocontact/'+$auth.getPayload().sub)
				.success(function(_contact){
					data.usersNocontact = _contact;
					//TDMServiceOffline.save(data);
					$http.get(API_URL + 'user/'+$auth.getPayload().sub)
					.success(function(_current){
						data.currentUser = _current;
						$http.get(API_URL + 'listsharedtodolistwithtodos')
						.success(function(shareList){
							data.shareListsWithToDo = shareList;
							$http.get(API_URL + 'todosharedtodolistwithtodos')
							.success(function(shareTodo){
								data.shareListsWithToDo.push({
									name : "Other Shared Todos",
									description: "",
									color : "grey",
									todos : shareTodo
								})
								TDMServiceOffline.save(data);
								$rootScope.isWorking = false;
								if(f){f(data);}
							});
							
						});
					});
				});
			});
		});

	};

	this.sync = function(callback){
		console.online('Synchronisation en cours ...');
		$rootScope.isWorking = true;

		var data = JSON.parse(localStorage.ToDoManagerAppData_XYZ);
		var lists = data.listsWithToDo,
			todos = [],
			deletedTodos = data.offlineDeleteToDo,
			deletedList = data.offlineDeleteList;

		var iteration = 0;

		if(lists == undefined || !lists || lists.length == 0)
			return callback(100);

		lists.forEach(function (listElem, listIndex, listsArray) {
			todos.push.apply(todos, listElem.todos);
		});

		var number_of_call = (todos.length) + deletedTodos.length + lists.length + deletedList.length;

		var step_value = 100/number_of_call;

		var checkIfFinish = function(){
			if(iteration == number_of_call)
				{return callback(100);}
		};

		//synchronise les listes ajoutées
		lists.forEach(function (listElem, listIndex, listsArray) {
			iteration += 1;

			if(listElem.id_list >= 9999999){
				delete listElem.id_list
				return $http.post(API_URL + 'todolist', listElem)
				.success(function(){
					callback(iteration*step_value);
					checkIfFinish();
				});
			}
		});

		//synchronise les todos ajoutés et modifiés
		todos.forEach(function (todo_elem, todo_index, todosArray) {

			iteration += 1;
			
			//id généré par le client
			if(todo_elem.id_todo >= 9999999) {
				delete todo_elem.id_todo
				return $http.post(API_URL + 'add/todo', {
					mytodo : todo_elem
				}).success(function(){
					callback(iteration*step_value);
					checkIfFinish();
				});
			}else{
				//on gére les modifications des todos
				$http.put(API_URL + 'todo/'+ todo_elem.id_todo, todo_elem)
				.success(function(){
					callback(iteration*step_value);
					checkIfFinish();
				});
			}
		});

		//supprime les todos
		deletedTodos.forEach(function (todo_id, todo_index, todosArray) {

			iteration += 1;

			return $http.delete(API_URL + 'todo/'+ todo_id)
			.success(function(){
				callback(iteration*step_value);
				checkIfFinish();
			});
		});

		//supprime les listes
		deletedList.forEach(function (list_id, listIndex, listsArray) {

			iteration += 1;

			return $http.delete(API_URL + 'listtodolist/'+ list_id)
			.success(function(){
				callback(iteration*step_value);
				checkIfFinish();
			});
		});

	};

	///////////////////////////////////////////////////
	/**
	* Manage ADD method
	*/
	///////////////////////////////////////////////////

	//ADD a todoList
	this.todolist = function(name, description, color) {
		console.online('todolist');
		$rootScope.isWorking = true;

		return $http.post(API_URL + 'todolist', {
			name : name,
			description : description,
			color : color
		}).success(function(){
			$rootScope.isWorking = false;
		}).error(function(){
			$rootScope.isWorking = false;
		});
	};

	//ADD a todo
	this.addTodo = function(_mytodo) {
		console.online('addTodo');
		$rootScope.isWorking = true;
		return $http.post(API_URL + 'add/todo', {
			mytodo : _mytodo
		}).success(function(){
			$rootScope.isWorking = false;
		}).error(function(){
			$rootScope.isWorking = false;
		});
	};

	//ADD a group
	this.addgroup = function(namegroup) {
		console.online('addgroup');
		$rootScope.isWorking = true;
		return $http.post(API_URL + 'addgroup', {
			name : namegroup
		})
		.success(function(){
			$rootScope.isWorking = false;
		}).error(function(){
			$rootScope.isWorking = false;
		});
	};

	//ADD contact to group
	this.addcontact = function(id, item) {
		console.online('addcontact');
		$rootScope.isWorking = true;
		return $http.post(API_URL + 'addcontact', {
			id : id,
			item : item
		})
		.success(function(){
			$rootScope.isWorking = false;
		}).error(function(){
			$rootScope.isWorking = false;
		});
	};

	///////////////////////////////////////////////////
	/**
	* Manage DELETE method
	*/
	///////////////////////////////////////////////////
	//DELETE a todolist
	this.deletetodolist = function(obj) {
		console.online('deletetodolist');
		$rootScope.isWorking = true;
		return $http.delete(API_URL + 'listtodolist/'+ obj.id_list)
		.success(function(){
			TDMServiceOffline.save();
			$rootScope.isWorking = false;
		}).error(function(){
			$rootScope.isWorking = false;
		});
	};

	//DELETE todo
	this.deleteToDo = function(_id) {
		console.online('deleteToDo');
		$rootScope.isWorking = true;
		
		return $http.delete(API_URL + 'todo/'+ _id)
		.success(function(){
			TDMServiceOffline.save();
			$rootScope.isWorking = false;
		}).error(function(){
			$rootScope.isWorking = false;
		});
	};

	//DELETE subtodo
	this.deleteSubToDo = function(_id) {
		console.online('deleteSubToDo');
		$rootScope.isWorking = true;

		return $http.delete(API_URL + 'subtodo/'+ _id)
		.success(function(){
			TDMServiceOffline.save();
			$rootScope.isWorking = false;
		}).error(function(){
			$rootScope.isWorking = false;
		});
	};


	// delete contact
	this.deletecontact = function(idcontact){
		console.online('deletecontact');
		$rootScope.isWorking = true;
		return $http.delete(API_URL + 'deletecontact/'+idcontact)
		.success(function(){
			$rootScope.isWorking = false;
		}).error(function(){
			$rootScope.isWorking = false;
		});
	};

	// delete contact
	this.deletegroup = function(idgroup){
		console.online('deletegroup');
		$rootScope.isWorking = true;
		return $http.delete(API_URL + 'deletegroup/'+idgroup)
		.success(function(){
			$rootScope.isWorking = false;
		}).error(function(){
			$rootScope.isWorking = false;
		});
	};

	///////////////////////////////////////////////////
	/**
	* Manage PUT method
	*/
	///////////////////////////////////////////////////
	//Update todo
	this.updateTodo = function(todo) {
		console.online('updateTodo');
		$rootScope.isWorking = true;
		
		return $http.put(API_URL + 'todo/'+ todo.id_todo, todo)
		.success(function(){
			TDMServiceOffline.save();
			$rootScope.isWorking = false;
		}).error(function(){
			$rootScope.isWorking = false;
		});
	};

	//updates multiple todos
	this.updateTodos = function(data) {
		console.online('updateTodos');
		$rootScope.isWorking = true;

		return $http.put(API_URL + 'todos/',{
			data : data
		}).success(function(){
			TDMServiceOffline.save();
			$rootScope.isWorking = false;
		}).error(function(){
			$rootScope.isWorking = false;
		});		
	};

	///////////////////////////////////////////////////
	/**
	* Manage GET method
	*/
	///////////////////////////////////////////////////

	this.generateShareListLink = function(_id) {
		console.online('generateShareListLink');
		$rootScope.isWorking = true;
		return $http.get(API_URL + 'share/todolist/'+ _id)
		.success(function(){
			$rootScope.isWorking = false;
		}).error(function(){
			$rootScope.isWorking = false;
		});
	};

	this.generateShareToDoLink = function(_id) {
		console.online('generateShareToDoLink');
		$rootScope.isWorking = true;
		return $http.get(API_URL + 'share/todo/'+ _id)
		.success(function(){
			$rootScope.isWorking = false;
		}).error(function(){
			$rootScope.isWorking = false;
		});
	};

	this.fetchSharedData = function(url, type) {
		console.online('fetchSharedData');
		$rootScope.isWorking = true;
		return $http.get(API_URL + 'share/data/'+ url + '/' + type)
		.success(function(){
			$rootScope.isWorking = false;
		}).error(function(){
			$rootScope.isWorking = false;
		});
	};

	this.shareTodoContact = function(_id_todo,_id_user) {
		console.online('shareTodoContact');
		$rootScope.isWorking = true;
		
		return $http.post(API_URL + 'share/todo/'+ _id_todo + '/' + _id_user)
		.success(function(){
			$rootScope.isWorking = false;
		}).error(function(){
			$rootScope.isWorking = false;
		});
	};

	this.shareListContact = function(_id_list,_id_user) {
		console.online('shareListContact');
		$rootScope.isWorking = true;
		
		return $http.post(API_URL + 'share/todolist/'+ _id_list + '/' + _id_user)
		.success(function(){
			$rootScope.isWorking = false;
		}).error(function(){
			$rootScope.isWorking = false;
		});
	};


	//GET all groupe
	/*this.listGroupe = function() {
		console.online('listGroupe')

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
		console.online('listcontact')

		$rootScope.isWorking = true;
		return $http.get(API_URL + 'listcontact')
		.success(function(){
			$rootScope.isWorking = false;
		}).error(function(){
			$rootScope.isWorking = false;
		})
	}*/
});