'use strict';

/**
 * @ngdoc function
 * @name ToDoManagerApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the ToDoManagerApp
 */
angular.module('ToDoManagerApp').controller('HeaderCtrl', function($scope, $auth) {
	// Satellizer auth service instead of authToken
	$scope.isAuthenticated = $auth.isAuthenticated;


    console.log = {};
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
