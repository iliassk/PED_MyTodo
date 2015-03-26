'use strict';

angular.module('ToDoManagerApp')
.controller('AddTodoCtrl', function($scope, $location, $log, $modal, TDMService, $rootScope, alert, $upload,$http, API_URL, $state) {

  $rootScope.$watch('accessData', function(accessData) {
        console.log("accessData  addTodo.js")

            if(accessData){
               TDMService.refresh(function(){
                  $scope.data = TDMService.data;
                    $scope.uploading = false;

                });
            }
    });
  ////////////////Submit form /////////////////
  $scope.data = TDMService.data;



  $scope.mytodo = {title: '', description: '', priority: '', context: '', date: '', completed: false, id_owner: '', url: '', attachment_path:'', localization: '', id_list:'', id_category:'', subtodos: new Array()};
  $scope.subtodo = {title: '', description: ''}
  $scope.files = '';
  $scope.isCollapsed = true;
  $scope.isMapCollapsed = true;
  $scope.progressPercentage

  $scope.addSubTodo = function(subtodo) {
    if(subtodo.title != ''){
      var subtodoTmp = {title : subtodo.title, completed: false, description : subtodo.description}
      $scope.mytodo.subtodos.push(subtodoTmp)
      subtodo.title = ""
      subtodo.description = ""
    }
    else
      alert('warning', 'Empty Subtodo : ', 'If you want to add a subtodo, give it a name!')
  };
  
  $scope.submit = function() {
    TDMService.addTodo($scope.mytodo, function() {
        $state.go('calendar');
        //success
      }, function() {
        //fail
      });
  };

  $scope.openAttachmentUrl = function() {
     window.open($scope.mytodo.attachment_path,'_blank');
  }

   $scope.$watch('files', function () {
        $scope.upload($scope.files);
    });
   $scope.myfilepath = ''

    $scope.upload = function (files) {
        if (files && files.length ) {
          if(files[0].size<=2000000){
            $scope.uploading = true;
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                $upload.upload({
                    url: API_URL + 'upload',
                    data: {myObj: $scope.file},
                    file: file
                }).progress(function (evt) {
                    

                    $scope.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    if ($scope.progressPercentage == 100) {
                      $scope.type = 'success';
                    } else if ($scope.progressPercentage < 50) {
                      $scope.type = 'info';
                    }
                    console.log('progress: ' + $scope.progressPercentage + '% ' + evt.config.file.name);
                }).success(function (data, status, headers, config) {
                   //$scope.mytodo.attachment_path = data['file'].path;
                   var url =  data['file'].path;
                   var file = url.split("/")[3]+"/"+url.split("/")[4];
                   $scope.mytodo.attachment_path =  file;
                  });
            }
          }
          else{
                  alert('warning', 'File size : ', 'The size of your file is too high! 2MB is the maximal size.')
          }
        }
  
    };

  ////////////////Attachment file /////////////////

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

  $scope.format = "EEE MMM dd yyyy HH:mm G'M'TZ '(CET)'";
  
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
});

