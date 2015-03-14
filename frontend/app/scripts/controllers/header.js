'use strict';

/**
 * @ngdoc function
 * @name ToDoManagerApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the ToDoManagerApp
 */
angular.module('ToDoManagerApp').controller('HeaderCtrl', function($scope, $auth, TDMService, $rootScope) {
    console.log("Header.js");
	// Satellizer auth service instead of authToken
	$scope.isAuthenticated = $auth.isAuthenticated;

    if($scope.isAuthenticated())
        TDMService.refresh(function(){
            $scope.data = TDMService.data;
        })
    $scope.data = TDMService.data;

    if($scope.isAuthenticated()){
        $rootScope.closeMenu = false
    }else
        $rootScope.closeMenu = true

    $scope.loaded = function() { console.log("Loaded"); }
})
.directive("myDirective", ["$templateCache", "$compile", function($templateCache, $compile) {
        return {
            scope: true,
            restrict: "A",
            controller: function($scope) {
                $scope.save = function(e) {}
                $scope.cancel = function(e) {}
            },
            link: function(scope, el, attrs) {
                var tpl = $templateCache.get(attrs.popoverTemplate);
                el.popover({
                    trigger: 'click',
                    html: true,
                    title: attrs.popoverTitle,
                    content: $compile(tpl)(scope),
                    placement: attrs.popoverPlacement
                });
            }
        }
    }]);
