'use strict';

/**
 * @ngdoc service
 * @name ToDoManagerApp.TDMService
 * @description
 * 
 * Service in the ToDoManagerApp.
 */
angular.module('ToDoManagerApp').service('TDMService', function ($http, API_URL, $state, $rootScope, alert, TDMServiceOffline, TDMServiceOnline) {

	var ToDoManagerApp = this

	//Shared data used for synchronisation between controllers
	ToDoManagerApp.data = {
		listsWithToDo: [],
		group: '',
		contact: '',
		shareListsWithToDo: []
	}

	this.markAsOffLine = function(){
		localStorage.hasBeenOffLine = true
	}

	this.markAsOnLine = function(){
		localStorage.hasBeenOffLine = false
	}

	this.hasBeenOffLine = function(){
		return localStorage.hasBeenOffLine == "true"
	}

	this.isOnLine = function(){

		return $rootScope.online
	}

	this.sync = function(){
		$rootScope.isWorking = true
		TDMServiceOnline.sync(function(){
        	$rootScope.canFetchData = true
		})
	}

	this.forgaveData = function(){
		console.log("[Master] => forgaveData")
	}

	this.refresh = function(callback){
		console.log("[Master] => refresh")
		if(ToDoManagerApp.data.listsWithToDo == ''){
			$rootScope.isWorking = true
			if(ToDoManagerApp.isOnLine()){
				TDMServiceOnline.fetchAll(function(_data){
					ToDoManagerApp.data = _data
					callback()
				})
			}else{
				TDMServiceOffline.fetchAll(function(_data){
					ToDoManagerApp.data = _data
					callback()
				})
			}
		}else if(callback)
			callback()
	}

	this.forceRefresh = function(callback){
		$rootScope.isWorking = true
		if(ToDoManagerApp.isOnLine()){
			TDMServiceOnline.fetchAll(function(_data){
				ToDoManagerApp.data = _data
				callback()
			})
		}else{
			TDMServiceOffline.fetchAll(function(_data){
				ToDoManagerApp.data = _data
				callback()
			})
		}
	}

	/**
	* Accessors to the shared data
	**/
	//Get a list with it's id
	this.getAList = function(_id) {
		$rootScope.isWorking = true
		for(var i=0; i < ToDoManagerApp.data.listsWithToDo.length; i++){
			if(ToDoManagerApp.data.listsWithToDo[i].id_list == _id)
				return ToDoManagerApp.data.listsWithToDo[i]
		}
		$rootScope.isWorking = false
	}

	//get a todo with it's id
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
	}

	//get all todos
	this.getAllToDo = function(){
		$rootScope.isWorking = true
		var result = []
		for(var i=0; i < ToDoManagerApp.data.listsWithToDo.length; i++){
			if(ToDoManagerApp.data.listsWithToDo[i].todos)
				for(var j=0; j < ToDoManagerApp.data.listsWithToDo[i].todos.length; j++){
					result.push(ToDoManagerApp.data.listsWithToDo[i].todos[j])
				}
		}

		$rootScope.isWorking = false
		return result
	}

	///////////////////////////////////////////////////
	/**
	* Manage ADD method
	*/
	///////////////////////////////////////////////////


	//ADD a todoList
	this.todolist = function(name, description, color, success, error) {
		$rootScope.isWorking = true;

		if(ToDoManagerApp.isOnLine()){
			TDMServiceOnline.todolist(name, description, color)
			.success(function(){
		        $rootScope.accessData = false
		        $rootScope.accessData = true
				$rootScope.mustRefresh = true
				$rootScope.isWorking = false
				success()
			}).error(function(){
				error()
			})
		}else{
			TDMServiceOffline.todolist(name, description, color, success, error)
		}
	}

	this.addTodo = function(_mytodo, success, error) {
		$rootScope.isWorking = true;
		
		if(ToDoManagerApp.isOnLine()){
			TDMServiceOnline.addTodo(_mytodo)
			.success(function(){
		        $rootScope.accessData = false
		        $rootScope.accessData = true
				$rootScope.mustRefresh = true
				$rootScope.isWorking = false
				success()
			}).error(function(){
				error()
			})
		}else{
			TDMServiceOffline.addTodo(_mytodo, success, error)
		}	
	}

	this.addgroup = function(namegroup, success, error) {
		$rootScope.isWorking = true;

		if(ToDoManagerApp.isOnLine()){
			TDMServiceOnline.addgroup(namegroup)
			.success(function(){
		        $rootScope.accessData = false
		        $rootScope.accessData = true
				$rootScope.mustRefresh = true
				$rootScope.isWorking = false
				success()
			}).error(function(){
				error()
			})
		}else{
			TDMServiceOffline.addgroup(namegroup, success, error)
		}
	}

	///////////////////////////////////////////////////
	/**
	* Manage DELETE method
	*/
	///////////////////////////////////////////////////

	//DELETE a todolist
	this.deletetodolist = function(obj, success, error) {
		$rootScope.isWorking = true;

		//Find the specific list and kill it
		//we fist check the shared list
		for(var i=0; i < ToDoManagerApp.data.shareListsWithToDo.length; i++){
			if(ToDoManagerApp.data.shareListsWithToDo[i].id_list == obj.id_list)
				ToDoManagerApp.data.shareListsWithToDo.splice(i, 1)
		}
		//then all the remaining list
		for(var i=0; i < ToDoManagerApp.data.listsWithToDo.length; i++){
			if(ToDoManagerApp.data.listsWithToDo[i].id_list == obj.id_list)
				ToDoManagerApp.data.listsWithToDo.splice(i, 1)
		}

		if(ToDoManagerApp.isOnLine()){
			TDMServiceOnline.deletetodolist(obj)
			.success(function(){
				success()
			}).error(function(){
				error()
			})
		}else{
			TDMServiceOffline.deletetodolist(obj, ToDoManagerApp.data, success, error)
		}
	}

	//DELETE todo
	this.deleteToDo = function(_id, success, error) {
		$rootScope.isWorking = true;

		for(var i=0; i < ToDoManagerApp.data.listsWithToDo.length; i++){
			if(ToDoManagerApp.data.listsWithToDo[i].todos)
				for(var j=0; j < ToDoManagerApp.data.listsWithToDo[i].todos.length; j++){
					if(ToDoManagerApp.data.listsWithToDo[i].todos[j].id_todo == _id)
						ToDoManagerApp.data.listsWithToDo[i].todos.splice(j, 1)
				}
		}

		if(ToDoManagerApp.isOnLine()){
			TDMServiceOnline.deleteToDo(_id)
			.success(function(){
				success()
			}).error(function(){
				error()
			})
		}else{
			TDMServiceOffline.deleteToDo(_id, ToDoManagerApp.data, success, error)
		}	
	}

	//DELETE subtodo
	this.deleteSubToDo = function(_id, success, error) {
		$rootScope.isWorking = true;

		for(var i=0; i < ToDoManagerApp.data.listsWithToDo.length; i++){
			if(ToDoManagerApp.data.listsWithToDo[i].todos)
				for(var j=0; j < ToDoManagerApp.data.listsWithToDo[i].todos.length; j++){
					if(ToDoManagerApp.data.listsWithToDo[i].todos[j].subtodos)
						for(var k=0; k < ToDoManagerApp.data.listsWithToDo[i].todos[j].subtodos.length; k++){
							if(ToDoManagerApp.data.listsWithToDo[i].todos[j].subtodos[k].id_subtodo == _id)
								ToDoManagerApp.data.listsWithToDo[i].todos[j].subtodos.splice(k, 1)
						}
				}
		}

		if(ToDoManagerApp.isOnLine()){
			TDMServiceOnline.deleteSubToDo(_id)
			.success(function(){
				success()
			}).error(function(){
				error()
			})
		}else{
			TDMServiceOffline.deleteSubToDo(_id, ToDoManagerApp.data, success, error)
		}
	}

	///////////////////////////////////////////////////
	/**
	* Manage PUT method
	*/
	///////////////////////////////////////////////////
	//Update todo
	this.updateTodo = function(todo, success, error) {
		$rootScope.isWorking = true;

		if(ToDoManagerApp.isOnLine()){
			TDMServiceOnline.updateTodo(todo)
			.success(function(){
				success()
			}).error(function(){
				error()
			})
		}else{
			TDMServiceOffline.updateTodo(todo, ToDoManagerApp.data, success, error)
		}
	};

	//updates multiple todos
	this.updateTodos = function(data, success, error) {
		$rootScope.isWorking = true;

		if(ToDoManagerApp.isOnLine()){
			TDMServiceOnline.updateTodos(data)
			.success(function(){
				success()
			}).error(function(){
				error()
			})
		}else{
			TDMServiceOffline.updateTodos(data, ToDoManagerApp.data, success, error)
		}
	}

	///////////////////////////////////////////////////
	/**
	* Manage GET method
	*/
	///////////////////////////////////////////////////

	this.generateShareListLink = function(_id, success, error) {
		$rootScope.isWorking = true;
		
		if(ToDoManagerApp.isOnLine()){
			TDMServiceOnline.generateShareListLink(_id)
			.success(function(result){
				success(result)
			}).error(function(){
				error()
			})
		}else{
			TDMServiceOffline.generateShareListLink(_id, success, error)
		}
	}

	this.generateShareToDoLink = function(_id, success, error) {
		$rootScope.isWorking = true;
		
		if(ToDoManagerApp.isOnLine()){
			TDMServiceOnline.generateShareToDoLink(_id)
			.success(function(result){
				success(result)
			}).error(function(){
				error()
			})
		}else{
			TDMServiceOffline.generateShareToDoLink(_id, success, error)
		}
	}

	this.fetchSharedData = function(url, type, success, error) {
		$rootScope.isWorking = true;
		
		if(ToDoManagerApp.isOnLine()){
			TDMServiceOnline.fetchSharedData(url, type)
			.success(function(result){
				success(result)
			}).error(function(){
				error()
			})
		}else{
			TDMServiceOffline.fetchSharedData(url, type, success, error)
		}
	}

	//GET all groupe
	/*this.listGroupe = function() {
		$rootScope.isWorking = true;

		if(ToDoManagerApp.isOnLine()){
			return TDMServiceOnline.listGroupe()
		}else{
			return TDMServiceOffline.listGroupe()
		}
	};*/

	//GET all contact
	/*this.listcontact = function() {
		$rootScope.isWorking = true;

		if(ToDoManagerApp.isOnLine()){
			return TDMServiceOnline.listcontact()
		}else{
			return TDMServiceOffline.listcontact()
		}
	}*/

	//GET User Avatar
	this.userAvatar = function(obj_id) {
		return $http.get(API_URL +'user/'+obj_id)
	};


	this.avatar_path = function(obj_file, obj_id){
		return $http.post(API_URL + 'avatarpath', {
			file : obj_file,
			iduser : obj_id
		})

	};

});

