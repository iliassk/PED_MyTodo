'use strict';

/**
 * @ngdoc overview
 * @name ToDoManagerApp
 * @description
 * # ToDoManagerApp
 *
 * Main module of the application.
 */
angular.module('ToDoManagerApp', ['ui.router', 'ui.calendar', 'ngAnimate', 'ui.bootstrap', 'angularFileUpload', 'satellizer', 'smart-table'])
  .run(function($window, $rootScope, TDMService, $modal, $auth, API_URL, $http, $interval) {

    console.offline = function(text) {
      console.log("[offline] => " + text)
    }
    console.online = function(text) {
      console.log("[online] => " + text)
    }
    $auth.isAuthenticated() ? $rootScope.mustRefresh = true : $rootScope.mustRefresh = false;
    $rootScope.mustRefresh = false
    $rootScope.accessData = false
    $rootScope.isWorking = false
    $rootScope.canFetchData = false

    //$rootScope.online = true
    //$rootScope.online = navigator.onLine

    $http.get(API_URL + 'connected')

      .success(function(response) {
        if (response.status) {
          $rootScope.online = true;
          console.log('Online mode !');
        }
      })

      .error(function(error) {
        $rootScope.online = false;
        console.log('Offline mode !');
      })

    $rootScope.$watch('online', function() {
      if ($rootScope.online == true) {
        console.log("destection online")
        debugger
        if (TDMService.hasBeenOffLine()) {
          $rootScope.accessData = false
          $modal.open({
            templateUrl: 'modalOffLine.html',
            controller: 'OffLineCtrl',
            resolve: {
              offline: function() {
                return false;
              }
            }
          });
        } else {
          $rootScope.canFetchData = true
        }
        TDMService.markAsOnLine()
      } else if($rootScope.online == false){
        TDMService.markAsOffLine()
        $modal.open({
          templateUrl: 'modalOffLine.html',
          controller: 'OffLineCtrl',
          resolve: {
            offline: function() {
              return true;
            }
          }
        });
      }
    });

    $interval(function() {
      $http.get(API_URL + 'connected')

      .success(function(response) {
        if (response.status) {
          $rootScope.online = true;
          console.log('Online mode !');
        }
      })

      .error(function(error) {
        $rootScope.online = false;
        console.log('Offline mode !');
      })
    }, 1000);

    /*if ($rootScope.online == false) {
      

    } else {
      
    }*/
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
      if ($rootScope.closeMenu) {
        angular.element("#wrapper").addClass("toggled");
      } else {
        angular.element("#wrapper").removeClass("toggled");
      }
    });
  })
  .controller('OffLineCtrl', function($scope, $modalInstance, offline, $state, TDMService, $rootScope) {

    $scope.offlineFlag = offline
    $scope.showProgress = false
    $scope.percent = 0

    $scope.synchronisation = function() {
      $scope.showProgress = true
      $rootScope.canFetchData = false
      TDMService.sync(function(step) {
        $scope.percent = step
        if (step >= 100) {
          $rootScope.isWorking = false;
          $rootScope.canFetchData = true
          $modalInstance.close()
        }
      })
    }

    $scope.abandonMyData = function() {
      $rootScope.canFetchData = true
      TDMService.forgaveData()
      $modalInstance.close()
    }

    $scope.continue = function() {
      $rootScope.canFetchData = true
      $modalInstance.close()
    };

    $scope.cancel = function() {
      $rootScope.canFetchData = false
      window.location.href = "http://www.google.fr"
    };
  });