'use strict';

/**
 * @ngdoc function
 * @name ToDoManagerApp.controller:TodosCtrl
 * @description
 * # TodosCtrl
 * Controller of the ToDoManagerApp
 */
angular.module('ToDoManagerApp')
	.controller('TodosCtrl', function($scope, $http, API_URL, alert) {

		$http.get(API_URL + 'todos')
			.success(function(todos) {
				$scope.todos = todos;
			})

			.error(function(err) {
				alert('warning', 'Unable to get todos', err.message);
			});

	});