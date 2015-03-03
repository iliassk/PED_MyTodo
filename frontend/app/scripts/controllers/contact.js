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
		$scope.contacts = data;
	})
	.error(function() {
		alert('warning', 'Oops!', 'update failed');
	});

 

})