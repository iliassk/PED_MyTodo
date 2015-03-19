'use strict';

/**
 * @ngdoc function
 * @name ToDoManagerApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the ToDoManagerApp
 */
angular.module('ToDoManagerApp').controller('HeaderCtrl', function($scope, $auth, TDMService, $rootScope, TDMServiceOffline) {
	// Satellizer auth service instead of authToken
	$scope.isAuthenticated = $auth.isAuthenticated;

    /*if($scope.isAuthenticated() && $rootScope.online)
        TDMService.refresh(function(){
            $scope.data = TDMService.data;
        })*/

    $rootScope.$watch('canFetchData', function(canFetchData) {
        console.log("$rootScope.$watch('canFetchData'  " + canFetchData)

            if(canFetchData){
                TDMService.refresh(function(){
                    $scope.data = TDMService.data;
                })
            }
    });

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
              /*  $el.click(function() {
                    $('.popover').each(function(){
                        var $this = $(this);
                        if($this.parent().attr('id') != $element.parent().attr('id'))
                        {
                            $this.scope().$hide();
                        }
                    }
                    );
                });*/
            }
        }
}]);
