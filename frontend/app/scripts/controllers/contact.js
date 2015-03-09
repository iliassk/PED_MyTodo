'use strict';

/**
 * @ngdoc function
 * @name ToDoManagerApp.controller:TodoListCtrl
 * @description
 * # TodoListCtrl
 * Controller of the ToDoManagerApp
 */

angular.module('ToDoManagerApp').controller('contactCtrl', function ($scope, CMService){
	
  
  CMService.userslist()
	.success(function(data) {
		alert('success', 'OK!', 'update success');
		$scope.users = data;
	})
	.error(function() {
		alert('warning', 'Oops!', 'update failed');
	});

	CMService.listGroupe()
	.success(function(data) {
		alert('success', 'OK!', 'update success');
		$scope.groups = data;
	})

	$scope.addContact=function(id, item){
		CMService.addContact(id, item).success(function() {
			alert('success', 'OK!', 'add contact success');
		})
		.error(function() {
			alert('warning', 'Oops!', 'add contact failed');
		});
	}
 

})