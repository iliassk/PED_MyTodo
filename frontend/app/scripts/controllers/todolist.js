'use strict';

/**
 * @ngdoc function
 * @name ToDoManagerApp.controller:TodoListCtrl
 * @description
 * # TodoListCtrl
 * Controller of the ToDoManagerApp
 */

angular.module('ToDoManagerApp').controller('TodoListCtrl', function($scope, alert, TDMService, $state) {
    

    $scope.color = "#000000";
	$scope.submit = function() {
        
		TDMService.todolist($scope.name, $scope.description, $scope.color, function() {
			alert('success', 'OK!', 'add todolist success');
			$state.go('calendar');
		}, function() {
			alert('warning', 'Oops!', 'add todolist failed');
		});
	};
});