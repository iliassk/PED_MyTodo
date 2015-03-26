'use strict';

angular.module('ToDoManagerApp')
.controller('sharedTodoCtrl',  function($scope, $location, $log, $modal, TDMService, alert, $stateParams, $state, $rootScope) {

  $scope.mytodo = {};
  $scope.data = {};
  $scope.isCollapsed = true;
  $scope.isNotEditing = true;
  $scope.isMapCollapsed = true;

  //This function erases the chosen subtodo
  $scope.eraseSubtodo = function(index, id){
    $scope.mytodo.subtodos.splice(index, 1);
    TDMService.deleteSubToDo(id, function(){
      //success
    }, function(){
      //fail
    });
  }

  $scope.addSubTodo = function(subtodo) {
    if(subtodo.title != ''){
      var subtodoTmp = {title : subtodo.title, description : subtodo.description}
      if(!$scope.mytodo.subtodos)
        $scope.mytodo.subtodos = []
      $scope.mytodo.subtodos.push(subtodoTmp)
      subtodo.title = ""
      subtodo.description = ""
    }
    else
      alert('warning', 'Empty Subtodo : ', 'If you want to add a subtodo, give it a name!')
  };

  ////////////////Submit form /////////////////
  $scope.submit = function() {
     TDMService.updateTodo($scope.mytodo, function(res) {
        //success
      }, function(err) {
        //fail
      });
  };



  ////////////////Completed boolean ///////////

  $scope.onTodoModified = function(){
    $scope.mytodo.completed = ($scope.mytodo.completed ? 1 : 0)
  }

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
  

  $scope.clear = function () {
    $scope.mytodo.date = null;
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };

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

   $scope.showMap = function(){ 
    $scope.isMapCollapsed = false
    
    getAdresse(['map-canvas', 'input-address', 'type-selector'], function(position, address){
      $scope.mytodo.localization = address;
    }, function(msg){
      console.log(msg);
    });
  };

  $scope.showMapButton = function(place){
        return place == "" || place == undefined || place == null
    }

  ////////////////Delete todo /////////////////


 $scope.delete = function () {

    var modalInstance = $modal.open({
      templateUrl: 'modalDelete.html',
      controller: 'deleteTodoCtrl',
      size: 'sm',
      resolve: {
        id: function () {
          return $scope.mytodo.id_todo;
        }
      }
    });

    modalInstance.result.then(function () {
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

$rootScope.$watch('accessData', function(accessData) {
        console.log("accessData  sharedTodo.js")

            if(accessData){
               TDMService.refresh(function(){

          $scope.mytodo = TDMService.getASharedToDo($stateParams.id);
          console.log($scope.mytodo)
          if($scope.mytodo.id_list)
            $scope.sharedList = $scope.list = TDMService.getASharedList($scope.mytodo.id_list)


          $scope.data = TDMService.data;
      
          $scope.toggleMin();
          })
            }
    });


});

  

  ////////////////Controller map modal /////////////////


angular.module('ToDoManagerApp')
.controller('deleteTodoCtrl', function ($scope, $modalInstance, id, $state, TDMService) {

  $scope.id = id;

  $scope.deleteTodo = function () {
    TDMService.deleteToDo(id, function(res) {
        //success
        $state.go('calendar');
      }, function(err) {
        //fail
      });
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});

