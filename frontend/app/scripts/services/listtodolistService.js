'use strict';

/**
 * @ngdoc service
 * @name ToDoManagerApp.auth
 * @description
 * # auth
 * Service in the ToDoManagerApp.
 */
angular.module('ToDoManagerApp').service('listtodolistservice', function ($http, API_URL, authToken, $state) {

	

	this.listtodolist = function() {
		return $http.get(API_URL + 'listtodolist')
		.success(function(data, status, headers, config){ 
 			 console.log("sucess"); 
				});
		};

	this.deletetodolist = function(obj) {
		return $http.delete(API_URL + 'listtodolist/'+obj)
		.success(function(){ 
 			 console.log('delete success'); 
				});
		};

});
