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


	$scope.total = function(group){
		var obj = group.id_group;

		var total = 0, i = 0;
		var contact = $scope.contact;
		for(i=0; i< contact.length; i++){
			if(contact[i].id_group == obj)
				total = total+1;
			
		}
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

	//$scope.group = TDMService.getGroups()

	$rootScope.$watch('accessData', function(accessData) {
        console.log("accessData  listtodolist.js")

        if(accessData){

        }
    });

});