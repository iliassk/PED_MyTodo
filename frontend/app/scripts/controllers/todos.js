'use strict';

/**
 * @ngdoc function
 * @name ToDoManagerApp.controller:TodosCtrl
 * @description
 * # TodosCtrl
 * Controller of the ToDoManagerApp
 */
angular.module('ToDoManagerApp')
	.controller('TodosCtrl',['$scope', '_''persistenceService', 'offline'] 

		function($scope, $http, API_URL, alert, _, persistenceService, offline) {

		$http.get(API_URL + 'todos')
			.success(function(todos) {
				$scope.todos = todos;
			})

			.error(function(err) {
				alert('warning', 'Unable to get jobs', err.message);
			});

			$scope.showlist =false;

			var getData = function (){
				persistenceService.action.getAll().then(
				function(todos){
					$scope.todos = todos;
					$scope.showlist = true;
					$scope.showEmptyListMessage = todos.length ==0;

				},
				function(error){
					$scope.error = error;
			});

			};

			var lazyGetData =_.debounce(getData, 50);	

			offline.on('confirmed-down', lazyGetData);
			offline.on('confirmed-up', lazyGetData);

			lazyGetData();

			$scope.delete = function (index) {
				var id = $scope.todos[index].id;

				persistenceService.action.delete.then(
					function(result){
						$scope.todos.splice(index, 1);
					},

					function(error){
					$scope.error = error;
					});
			};


	});