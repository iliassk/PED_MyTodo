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

<<<<<<< HEAD
  $rootScope.mustRefresh = false
	$rootScope.isWorking = false

  	$rootScope.online = true;
    //$rootScope.online = navigator.onLine;
  	$window.addEventListener("offline", function () {
      $rootScope.online = false;
      TDMService.markAsOffLine()
  	}, false);
  	$window.addEventListener("online", function () {
      $rootScope.online = true;

      if(TDMService.hasBeenOffLine()){
=======
    $rootScope.mustRefresh = false
    $rootScope.accessData = false
    $rootScope.isWorking = false
    $rootScope.canFetchData = false

    //$rootScope.online = true

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

    if ($rootScope.online == false) {
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

    } else {
      if (TDMService.hasBeenOffLine()) {
        $rootScope.accessData = false
>>>>>>> cc93b82b28e82a6d0f9f12670797de89e9081373
        $modal.open({
          templateUrl: 'modalOffLine.html',
          controller: 'OffLineCtrl',
          resolve: {
            offline: function() {
              return false;
            }
          }
        });
<<<<<<< HEAD
      }
      TDMService.markAsOnLine()
=======
      } else {
        $rootScope.canFetchData = true
      }
      TDMService.markAsOnLine()
    }
    //$rootScope.online = navigator.onLine;
    /*$window.addEventListener("offline", function () {
      $rootScope.online = false;
      TDMService.markAsOffLine()
>>>>>>> cc93b82b28e82a6d0f9f12670797de89e9081373
  	}, false);

    $rootScope.closeMenu = true

    $rootScope.$watch('closeMenu', function() {
      if ($rootScope.closeMenu) {
        angular.element("#wrapper").addClass("toggled");
      } else {
        angular.element("#wrapper").removeClass("toggled");
      }
    });
<<<<<<< HEAD
    
    $rootScope.canFetchData = ($auth.isAuthenticated() && $rootScope.online) ? true : false; //$rootScope.online

    if(!$rootScope.online)
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
})
.controller('OffLineCtrl', function ($scope, $modalInstance, offline, $state, TDMService, $rootScope) {
=======
  })
  .controller('OffLineCtrl', function($scope, $modalInstance, offline, $state, TDMService, $rootScope) {
>>>>>>> cc93b82b28e82a6d0f9f12670797de89e9081373

    $scope.offlineFlag = offline
    $scope.showProgress = false
    $scope.percent = 0

<<<<<<< HEAD
    $scope.synchronisation = function(){
        $rootScope.canFetchData = false
        TDMService.sync()
    }

    $scope.abandonMyData = function(){
        $rootScope.canFetchData = true
        TDMService.forgaveData()
=======
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
>>>>>>> cc93b82b28e82a6d0f9f12670797de89e9081373
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