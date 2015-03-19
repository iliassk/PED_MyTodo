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

		TDMService.updateTodo(todo)
		.success(function(data) {
			console.log("[updateTodo] success");
		})
		.error(function(data) {
			console.log("[updateTodo] failure");
		});
	}

	$scope.fetchData = function(){
		TDMService.listGroupe()
		.success(function(data) {
			alert('success', 'OK!', 'update success');
			$scope.groupe = data;
		})
		.error(function() {
			alert('warning', 'Oops!', 'update failed');
		});

		TDMService.listcontact()
		.success(function(data) {
			alert('success', 'OK!', 'update success');
			$scope.contact = data;
		})
		.error(function() {
			alert('warning', 'Oops!', 'update failed');
		});
	}

	$scope.total = function(obj){
		var total = 0, i = 0;
		var contact = $scope.contact;
		for(i=0; i< contact.length; i++){
			if(contact[i].id_group == obj)
				total = total+1;
			
		}
		return total;

	};


	$scope.deleteTodoList = function(obj){
		

 		TDMService.deletetodolist(obj)
 		.success(function(data) {
			alert('success', 'OK!', 'delete success');
		})
		.error(function() {
			alert('warning', 'Oops!', 'delete failed');
		});
	};
	
	$scope.submitgroup = function(name){

		TDMService.addgroup(name)
		.success(function() {
			alert('success', 'OK!', 'add group success');
		})
		.error(function() {
			alert('warning', 'Oops!', 'add group failed');
		})
	};

	/*if($auth.isAuthenticated() &&  $rootScope.online)
		$scope.fetchData()*/

	$rootScope.$watch('canFetchData', function(canFetchData) {
        console.log("$rootScope.$watch('canFetchData'  " + canFetchData)

            if(canFetchData){
               // $scope.fetchData()
            }
    });
});