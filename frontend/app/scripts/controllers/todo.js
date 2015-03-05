'use strict';

angular.module('ToDoManagerApp')


.controller('TodoCtrl', ['$scope', '$location', '$log', '$modal', 'TDMService','alert','$stateParams', function($scope, $location, $log, $modal, TDMService, alert, $stateParams) {

  $scope.todo_id = $stateParams.id;

  $scope.mytodo = {}

  $scope.fetchData = function(){
    TDMService.getTodo($scope.todo_id)
      .success(function(data) {
        data.completed = (data.completed == 1 ? true: false)
        $scope.mytodo = data[0];
        console.log("Success fetchData");
      })
      .error(function() {
        console.log("Faillure fetchData");
      });
  }

  $scope.fetchData();

  ////////////////Submit form /////////////////
  $scope.submit = function() {
     TDMService.updateTodo($scope.mytodo) 
      .success(function(res) {
        alert('success', 'Todo edited!', 'Your todo has been edited !');
      })
      .error(function(err) {
        alert('warning', 'Something went wrong :(', err.message);
      });
  };

  ////////////////Completed boolean ///////////

  $scope.onTodoModified = function(todo){

    mytodo.completed = (mytodo.completed ? 1 : 0)
  }

  ////////////////Attachment file /////////////////
  angular.element('#input-file').fileinput({showCaption: false,showUpload: false, maxFileSize:2000}); 

  ////////////////Calendar /////////////////

$scope.today = function() {
    var today = new Date();
    /*var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if (mm <= 9){
      mm = '0'+mm;
    }
    today = dd+'/'+mm+'/'+yyyy;*/
    $scope.mytodo.date = today;

  };
  $scope.today();

  $scope.clear = function () {
    $scope.mytodo.date = null;
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.format = "EEE MMM dd yyyy HH:mm:ss G'M'TZ '(CET)'";
  
  ////////////////Time /////////////////


  //$scope.mytodo.date = $scope.mytodo.date;

  $scope.hstep = 1;
  $scope.mstep = 1;

  $scope.options = {
    hstep: [1, 2, 3],
    mstep: [1, 5, 10, 15, 25, 30]
  };

  $scope.ismeridian = true;
  $scope.toggleMode = function() {
    $scope.ismeridian = ! $scope.ismeridian;
  };

  $scope.update = function() {
    $scope.mytodo.date.setHours( 14 );
    $scope.mytodo.date.setMinutes( 0 );
  };

  $scope.changed = function () {
    $log.log('Time changed to: ' + $scope.mytodo.date);
  };

  $scope.clear = function() {
    $scope.mytodo.date = null;
  };  

  ////////////////Localization /////////////////

  $scope.showLocation = function(size){

    var modalInstance = $modal.open({
      templateUrl: 'localizaton_map.html',
      controller: 'MapCtrl',
      size: size
    });

    modalInstance.result.then(function (address) {
      $scope.mytodo.localization = address;
      console.log('result got : ' + address);

    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

}]);

  ////////////////Controller map modal /////////////////

angular.module('ToDoManagerApp')
.controller('MapCtrl', function ($scope, $modalInstance) {

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

  $scope.ok = function () {
    $modalInstance.close($scope.address);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});


