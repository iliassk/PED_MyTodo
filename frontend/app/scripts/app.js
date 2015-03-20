'use strict';

/**
 * @ngdoc overview
 * @name ToDoManagerApp
 * @description
 * # ToDoManagerApp
 *
 * Main module of the application.
 */
angular.module('ToDoManagerApp', ['ui.router','ui.calendar', 'ngAnimate','ui.bootstrap','angularFileUpload', 'satellizer','smart-table'])
.run(function($window, $rootScope, TDMService, $modal, $auth) {

    console.offline = function(text){
      console.log("[offline] => " + text)
    }
    console.online = function(text){
      console.log("[online] => " + text)
    }

    $rootScope.mustRefresh = false
    $rootScope.accessData = false
  	$rootScope.isWorking = false
    $rootScope.canFetchData = false

    $rootScope.online = true

    if($rootScope.online == false){
      TDMService.markAsOffLine()
      $modal.open({
        templateUrl: 'modalOffLine.html',
        controller: 'OffLineCtrl',
        size: 'sm',
         resolve: {
          offline: function () {
            return true;
          }
        }
      });

    }else{
      if(TDMService.hasBeenOffLine()){
        $rootScope.accessData = false
        $modal.open({
          templateUrl: 'modalOffLine.html',
          controller: 'OffLineCtrl',
          size: 'sm',
           resolve: {
            offline: function () {
              return false;
            }
          }
        });
      }else{
        $rootScope.canFetchData = true
      }
      TDMService.markAsOnLine()
    }
    //$rootScope.online = navigator.onLine;
  	/*$window.addEventListener("offline", function () {
      $rootScope.online = false;
      TDMService.markAsOffLine()
  	}, false);
  	$window.addEventListener("online", function () {
      $rootScope.online = true;

      
  	}, false);*/

    $rootScope.closeMenu = true

    $rootScope.$watch('closeMenu', function() {
        if($rootScope.closeMenu){
          angular.element("#wrapper").addClass("toggled");
        }else{
          angular.element("#wrapper").removeClass("toggled");
        }
    });
})
.controller('OffLineCtrl', function ($scope, $modalInstance, offline, $state, TDMService, $rootScope) {

    $scope.offlineFlag = offline

    $scope.synchronisation = function(){
        $rootScope.canFetchData = false
        TDMService.sync()
        $modalInstance.close()
    }

    $scope.abandonMyData = function(){
        $rootScope.canFetchData = true
        TDMService.forgaveData()
        $modalInstance.close()
    }

    $scope.continue = function () {
        $rootScope.canFetchData = true
        $modalInstance.close()
    };

    $scope.cancel = function () {
        $rootScope.canFetchData = false
        window.location.href = "http://www.google.fr"
    };
});

