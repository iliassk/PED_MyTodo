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

	TDMService.listcontact()
	.success(function(data) {
		alert('success', 'OK!', 'update success');
		$scope.contact = data;
	})
	.error(function() {
		alert('warning', 'Oops!', 'update failed');
	});

	$scope.total = function(group, contact){
		var total = 0, i = 0;
		for(i=0; i< contact.length; i++){
			if(contact[i].id_group == group.id_group)
				total = total+1;
			
		}
		return total;

	};


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