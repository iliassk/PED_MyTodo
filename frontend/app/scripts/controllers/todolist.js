'use strict';

/**
 * @ngdoc function
 * @name ToDoManagerApp.controller:TodoListCtrl
 * @description
 * # TodoListCtrl
 * Controller of the ToDoManagerApp
 */

angular.module('ToDoManagerApp').controller('TodoListCtrl', function($scope, alert, TDMService, $state) {
    
	$scope.submit = function() {
        
		TDMService.todolist($scope.name, $scope.description, $scope.color)
		.success(function() {
			alert('success', 'OK!', 'add todolist success');
			
        console.warn("Fetchall retiré ici !!! l'ajout peut être buggé!!! ")
			$state.go('main');
		})
		.error(function() {
			alert('warning', 'Oops!', 'add todolist failed');
		});
	};
});