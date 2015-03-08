'use strict';

angular.module('ToDoManagerApp').controller('ListTodoListCtrl', function($scope, $window, alert, TDMService) {
    
	$scope.todoList;
	$scope.hidecompleted = false;
	/*TDMService.listtodolist()
	.success(function(data) {
		console.log('success', 'OK!', 'update success');
		$scope.todoList = data;
		console.log($scope.todoList)
	})
	.error(function() {
		alert('warning', 'Oops!', 'update failed');
	});*/

	angular.element('[data-toggle="popover"]').popover()
	angular.element('i').click(function(e) {
    	e.stopPropagation();
	})

	$scope.hideCompleted = function(todo){
		$scope.hidecompleted = !$scope.hidecompleted;
	}

	$scope.onTodoModified = function(todo){
		console.log(todo);
		todo.completed = !todo.completed
		todo.completed = (todo.completed ? 1 : 0)

		TDMService.updateTodo(todo)
		.success(function(data) {
			console.log("[updateTodo] success");
			//$scope.fetchData();
		})
		.error(function(data) {
			console.log("[updateTodo] failure");
		});
	}

	$scope.fetchData = function(){
		TDMService.fetchToDoAndListToDos()
		.success(function(data){
			console.log('success', 'OK!', 'update success');
			$scope.todoList = data;
			console.log($scope.todoList)
		})
		.error(function() {
			alert('warning', 'Oops!', 'update failed');
		});
	}

	$scope.deleteTodoList = function(obj){
		$scope.test=obj;

 		TDMService.deletetodolist(obj)
 		.success(function(data) {
			alert('success', 'OK!', 'delete success');
			$scope.todoList = data;
		})
		.error(function() {
			alert('warning', 'Oops!', 'delete failed');
		});

 		$window.location.reload();
	};
	$scope.fetchData();

});