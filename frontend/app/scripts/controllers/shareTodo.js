'use strict';

angular.module('ToDoManagerApp').controller('ShareCtrl', function($scope, $stateParams, $window, alert, TDMService, $state, $rootScope) {
    console.log( 'url : ' + $stateParams.url)
    console.log( 'type : ' + $stateParams.type)
    
    $scope.isList = $stateParams.type == "todolist" ? true : false
    $scope.data = ''
    //Ferme le menu
	$rootScope.closeMenu = true

    //fetch the data
    TDMService.fetchSharedData($stateParams.url, $stateParams.type)
    .success(function(data){
		$scope.data = data
	}).error(function(){
		console.log("erreur")
	})

});

