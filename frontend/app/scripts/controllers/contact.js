'use strict';

/**
 * @ngdoc function
 * @name ToDoManagerApp.controller:TodoListCtrl
 * @description
 * # TodoListCtrl
 * Controller of the ToDoManagerApp
 */

angular.module('ToDoManagerApp').controller('contactCtrl', function ($scope, CMService, $rootScope){

  CMService.userslist()
	.success(function(data) {
		$scope.users = data;
	})
	

	CMService.listGroupe()
	.success(function(data) {
		$scope.groups = data;
	})

	$scope.addContact=function(id, item){
		CMService.addContact(id, item).success(function() {
			alert('success', 'OK!', 'add contact success');
		})
	}
 

})