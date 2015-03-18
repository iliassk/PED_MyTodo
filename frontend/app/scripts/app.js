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
.run(function($window, $rootScope) {

    console.offline = function(text){
      console.log("[offline] => " + text)
    }
    console.online = function(text){
      console.log("[online] => " + text)
    }

	   $rootScope.isWorking = false

  	$rootScope.online = navigator.onLine;
  	$window.addEventListener("offline", function () {
      $rootScope.online = false;
  	}, false);
  	$window.addEventListener("online", function () {
    	//$rootScope.$apply(function() {
      		$rootScope.online = true;
    	//});
  	}, false);

    $rootScope.closeMenu = true

    $rootScope.$watch('closeMenu', function() {
        if($rootScope.closeMenu){
          angular.element("#wrapper").addClass("toggled");
        }else{
          angular.element("#wrapper").removeClass("toggled");
        }
    });
});
