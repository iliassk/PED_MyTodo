'use strict';

/**
 * @ngdoc function
 * @name ToDoManagerApp.controller:TodoListCtrl
 * @description
 * # TodoListCtrl
 * Controller of the ToDoManagerApp
 */

angular.module('ToDoManagerApp').controller('contactCtrl', function ($scope, CMService, TDMService, $rootScope){


	$rootScope.$watch('accessData', function(accessData) {
        console.log("accessData  ViewToDoList")
        if(accessData){
           TDMService.refresh(function(){
		    	$scope.data = TDMService.data;
		   })
        }
    });

	$scope.addContact=function(id, item){
		TDMService.addContact(id, item, function() {
			//success
		}, function() {
			//fail
		}) 	

	}
 

})