'use strict';

/**
 * @ngdoc function
 * @name ToDoManagerApp.controller:TodoListCtrl
 * @description
 * # TodoListCtrl
 * Controller of the ToDoManagerApp
 */

angular.module('ToDoManagerApp').controller('contactCtrl', function ($scope, CMService, TDMService, $rootScope){

	//$scope.data = TDMService.data;
	
	//$scope.users => $scope.data.contact
	 //$scope.groups = $scope.data.group
	// 

	$rootScope.$watch('accessData', function(accessData) {
        console.log("accessData  ViewToDoList")
        if(accessData){
           TDMService.refresh(function(){
		    	$scope.data = TDMService.data;
		   })
        }
    });

	$scope.addContact=function(id, item){
		CMService.addContact(id, item).success(function() {
		$rootScope.accessData = false
		$rootScope.accessData = true
			
		})

	}
 

})