'use strict';

/**
 * @ngdoc function
 * @name ToDoManagerApp.controller:MainSchedulerCtrl
 * @description
 * # TodoListCtrl
 * Controller of the ToDoManagerApp
 */


angular.module('ToDoManagerApp').controller('MainSchedulerCtrl', function($scope) {
  $scope.events = [
    { id:1, text:"Task A-12458",
      start_date: new Date(2013, 10, 12),
      end_date: new Date(2013, 10, 16) },
    { id:2, text:"Task A-83473",
      start_date: new Date(2013, 10, 22 ),
      end_date: new Date(2013, 10, 24 ) }
  ];

  $scope.scheduler = { date : new Date(2013,10,1) };

});