'use strict';

angular.module('ToDoManagerApp').controller('ListTodoListCtrl', function($scope, $window, alert, TDMService) {
    
	

	
	TDMService.listtodolist()
	.success(function(data) {
		alert('success', 'OK!', 'update success');
		$scope.todoList = data;
	})
	.error(function() {
		alert('warning', 'Oops!', 'update failed');
	});

	TDMService.listGroupe()
	.success(function(data) {
		alert('success', 'OK!', 'update success');
		$scope.groupe = data;
	})
	.error(function() {
		alert('warning', 'Oops!', 'update failed');
	});



	$scope.deleteTodoList = function(obj){
		

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

	$scope.submitgroup = function(name){

		TDMService.addgroup(name)
		.success(function() {
			alert('success', 'OK!', 'add group success');
		})
		.error(function() {
			alert('warning', 'Oops!', 'add group failed');
		});

	
};

});