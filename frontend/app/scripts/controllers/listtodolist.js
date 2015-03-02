'use strict';

angular.module('ToDoManagerApp').controller('ListTodoListCtrl', function($scope, $window, alert, TDMService) {
    
	$scope.todoList;

	TDMService.listtodolist()
	.success(function(data) {
		alert('success', 'OK!', 'update success');
		$scope.todoList = data;
	})
	.error(function() {
		alert('warning', 'Oops!', 'update failed');
	});

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

});