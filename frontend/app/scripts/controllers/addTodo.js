'use strict';

angular.module('ToDoManagerApp')


.controller('AddTodoCtrl', ['$scope', '$location', '$log', '$modal', 'todo','alert', function($scope, $location, $log, $modal, todo, alert) {


  ////////////////Submit form /////////////////
  $scope.mytodo = {title: '', description: '', priority: '', context: '', date: '', completed: false, id_owner: '', url: '', attachment_path:'', localization: '', id_list:'', id_category:''};
  //$scope.mytodo = {title: $scope.title, description: $scope.description, priority: $scope.priority, context: $scope.context, date: $scope.date, time: $scope.time, completed: false, idowner: "", url: $scope.url, attachmentpath:"", localization: $scope.address, idlist:"", idcategory:""};

  //temporaire : le temps de pouvoir récupérer l'id ou l'email du propriétaire :
  $scope.email = 'humphf@gmail.com';
  $scope.submit = function() {

    todo.add($scope.email, $scope.mytodo) 
      .success(function(res) {
        alert('success', 'Todo created!', 'Your todo has been created !');
      })
      .error(function(err) {
        alert('warning', 'Something went wrong :(', err.message);
      });
  };

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

