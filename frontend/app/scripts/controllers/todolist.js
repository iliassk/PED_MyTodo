'use strict';

/**
 * @ngdoc function
 * @name ToDoManagerApp.controller:TodoListCtrl
 * @description
 * # TodoListCtrl
 * Controller of the ToDoManagerApp
 */

angular.module('ToDoManagerApp').controller('TodoListCtrl', function($scope, $rootScope, $http, alert) {
    
    
	$scope.submit = function() {
        

		http://jsfiddle.net/24A9b/7783/

		var url = 'http://localhost:3000/todolist';
		var todolist = {
			name: $scope.name,
			description: $scope.description,
			color : $scope.color
		};
	    
		$http.post(url, todolist)
			.success(function() {
				alert('success', 'OK!', 'add todolist success');
			})
			.error(function() {
				alert('warning', 'Oops!', 'add todolist failed');
			});
	};
});