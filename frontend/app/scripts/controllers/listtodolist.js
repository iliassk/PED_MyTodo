'use strict';

angular.module('ToDoManagerApp').controller('ListTodoListCtrl', function($scope, $window, alert, TDMService, $auth ,$rootScope) {

    
	$scope.hidecompleted = false;
	$scope.group;
	$scope.contact;
	
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

		TDMService.updateTodo(todo, function(data) {
			//success
		}, function(data) {
			//fail
		});
	}


	$scope.total = function(){

		var total = 0;
		$scope.data.group.forEach(function(elem,index,array){
			total = elem.contact.length + total;
		})

		return total;

	};

	$scope.deleteTodoList = function(obj){
		
 		TDMService.deletetodolist(obj, function(data) {
			alert('success', 'OK!', 'delete success');
		}, function() {
			alert('warning', 'Oops!', 'delete failed');
		});
	};
	
	$scope.submitgroup = function(name){

		TDMService.addgroup(name, function() {
			//success
		}, function() {
			//fail
		})
	};

	$rootScope.$watch('accessData', function(accessData) {
        console.log("accessData  listtodolist.js : " + accessData)
        if(accessData){

        }
    });

});