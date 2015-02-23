'use strict';

/**
 * @ngdoc function
 * @name toDoManagerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the toDoManagerApp
 */
angular.module('toDoManagerApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
