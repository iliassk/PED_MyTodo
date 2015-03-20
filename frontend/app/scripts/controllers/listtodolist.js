'use strict';

angular.module('ToDoManagerApp').controller('ListTodoListCtrl', function($scope, $window, alert, TDMService, $auth ,$rootScope) {

    
	$scope.hidecompleted = false;
	$scope.group;
	$scope.contact;
	
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
		})
		.error(function(data) {
			console.log("[updateTodo] failure");
		});
	}


	$scope.deleteTodoList = function(obj){
 		TDMService.deletetodolist(obj);
	};

	$scope.deletecontact = function(obj){
		TDMService.deletecontact(obj);
		window.location.reload();
	};
	
	$scope.submitgroup = function(name){
		TDMService.addgroup(name);
	};

	//$scope.group = TDMService.getGroups()

	$rootScope.$watch('accessData', function(accessData) {
      //  console.log("accessData  listtodolist.js");
        if(accessData){

        }
    });

});