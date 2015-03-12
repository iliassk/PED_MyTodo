'use strict';

/**
 * @ngdoc function
 * @name ToDoManagerApp.controller:TodoListCtrl
 * @description
 * # TodoListCtrl
 * Controller of the ToDoManagerApp
 */

angular.module('ToDoManagerApp').controller('TodoListCtrl', function($scope, alert, TDMService) {
    
    
	$scope.submit = function() {
        
		TDMService.todolist($scope.name, $scope.description, $scope.color)
		.success(function() {
			alert('success', 'OK!', 'add todolist success');
			TDMService.fetchAll()
			$state.go('main');
		})
		.error(function() {
			alert('warning', 'Oops!', 'add todolist failed');
		});
	};
});