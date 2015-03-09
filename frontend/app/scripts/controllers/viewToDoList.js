'use strict';

/**
 * @ngdoc function
 * @name ToDoManagerApp.controller:TodoListCtrl
 * @description
 * # TodoListCtrl
 * Controller of the ToDoManagerApp
 */

angular.module('ToDoManagerApp').controller('ViewToDoList', function($scope, $stateParams, alert, TDMService) {
    
	$scope.list_id = $stateParams.id
	$scope.list
	$scope.todos
	$scope.hidecompleted = false;
	$scope.hideCompleted = function(todo){
		$scope.hidecompleted = !$scope.hidecompleted;
	}

	$scope.fetchData = function(){
		TDMService.fetchToDoListToDos($scope.list_id)
		.success(function(data) {
			data.forEach(function(todo){
				todo.completed = (todo.completed == 1 ? true : false)
			})
			$scope.todos = data;
			console.log("Success fetchData");
		})
		.error(function() {
			console.log("Faillure fetchData");
		});

		TDMService.gettodolist($scope.list_id)
		.success(function(data) {
			$scope.list = data[0];
			console.log('Success get list');
		})
		.error(function() {
			console.log('Failure get list');
		});
	}

	$scope.deleteTodo = function(todo_id){
		console.log("[deleteTodo]");

		TDMService.deleteToDo(todo_id)
		.success(function(data) {
		console.log("[deleteTodo] success");
			$scope.fetchData();
		})
		.error(function(data) {
			console.log("[deleteTodo] failure");
		});

	}

	$scope.onTodoModified = function(todo){
		console.log(todo);
		todo.completed = !todo.completed
		todo.completed = (todo.completed ? 1 : 0)

		TDMService.updateTodo(todo)
		.success(function(data) {
			console.log("[updateTodo] success");
			$scope.fetchData();
		})
		.error(function(data) {
			console.log("[updateTodo] failure");
		});
	}

	$scope.fetchData();

});