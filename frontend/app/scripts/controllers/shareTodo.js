'use strict';

angular.module('ToDoManagerApp').controller('ShareCtrl', function($scope, $stateParams, $window, alert, TDMService, $state, $rootScope) {
    console.log( 'url : ' + $stateParams.url)
    console.log( 'type : ' + $stateParams.type)
    
    $scope.hasSubtodo;
    $scope.mytodo = ''
    $scope.isList = $stateParams.type == "todolist" ? true : false
    $scope.data = ''
    //Ferme le menu
	$rootScope.closeMenu = true

    //Date format
    $scope.format = "EEE MMM dd yyyy HH:mm G'M'TZ '(CET)'";


    $scope.address = '';
    $scope.init = function(){ 
        getAdresse(['map-canvas', 'input-address', 'type-selector'], function(position, address){
          console.log(position);
          console.log(address);
          $scope.address = address;
        }, function(msg){
          console.log(msg);
        });
    };

    $scope.init();

    //fetch the data
    TDMService.fetchSharedData($stateParams.url, $stateParams.type, function(data){
		$scope.data = data
        if($stateParams.type == "todo"){
            $scope.mytodo = data[0];
            $scope.hasSubtodo = $scope.mytodo.subtodos ? true : false;
        }
	}, function(){
		//fail
	})

});

