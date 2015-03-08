'use strict';

angular.module('ToDoManagerApp')


.controller('AddTodoCtrl', ['$scope', '$location', '$log', '$modal', 'TDMService','alert', '$upload', '$http', 'API_URL', function($scope, $location, $log, $modal, TDMService, alert, $upload,$http, API_URL) {


  ////////////////Submit form /////////////////
  $scope.mytodo = {title: '', description: '', priority: '', context: '', date: '', completed: false, id_owner: '', url: '', attachment_path:'', localization: '', id_list:'', id_category:''};
  $scope.mytodolist;
  $scope.file;
  $scope.img = 'uploads/petite1425567949927.jpg'
  //$scope.img2 = $http.get(API_URL + $scope.img)
  $http({method: 'GET', url: API_URL + 'uploads/petite1425567949927.jpg'}).
  success(function(data, status, headers, config) {
     var element = angular.element('#toto');
     element.attr({
         href: 'data:attachment/jpg,' + encodeURI(data),
         target: '_blank',
         download: 'uploads/petite1425567949927.jpg'
     })[0].click();

  }).
  error(function(data, status, headers, config) {
    // if there's an error you should see it here
  });
  console.log("$scope.img2")
  console.log($scope.img2)
  console.log("$scope.img2")
  TDMService.listtodolist()
  .success(function(data) {
    console.log('success', 'OK!', 'update success');
    $scope.mytodolist = data;
  })
  .error(function() {
    alert('warning', 'Oops!', 'update failed');
  });
  
  $scope.submit = function() {

    TDMService.addTodo($scope.mytodo) 
      .success(function(res) {
        alert('success', 'Todo created!', 'Your todo has been created !');
      })
      .error(function(err) {
        alert('warning', 'Something went wrong :(', err.message);
      });
  };

  ////////////////Attachment file /////////////////
  angular.element('#input-file').fileinput({showCaption: false,showUpload: false, maxFileSize:2000}); 
  $scope.onFileSelect = function($files) {
    //$files: an array of files selected, each file has name, size, and type. 
    for (var i = 0; i < $files.length; i++) {
      var file = $files[i];
      $scope.upload = $upload.upload({
        url: API_URL + 'upload', //upload.php script, node.js route, or servlet url 
        //method: 'POST' or 'PUT', 
        //headers: {'header-key': 'header-value'}, 
        //withCredentials: true, 
        data: {myObj: $scope.file},
        file: file, // or list of files ($files) for html5 only 
        //fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s) 
        // customize file formData name ('Content-Desposition'), server side file variable name.  
        //fileFormDataName: myFile, //or a list of names for multiple files (html5). Default is 'file'  
        // customize how data is added to formData. See #40#issuecomment-28612000 for sample code 
        //formDataAppender: function(formData, key, val){} 
      }).progress(function(evt) {
        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
      }).success(function(data, status, headers, config) {
        // file is uploaded successfully 
        console.log("File : ")
        console.log(data['file']['path']);
        $scope.mytodo.attachment_path = data['file']['path'];
        $scope.file = data['file']['path'];
        console.log("End of file")
      });
      //.error(...) 
      //.then(success, error, progress);  
      // access or attach event listeners to the underlying XMLHttpRequest. 
      //.xhr(function(xhr){xhr.upload.addEventListener(...)}) 
    }
    /* alternative way of uploading, send the file binary with the file's content-type.
       Could be used to upload files to CouchDB, imgur, etc... html5 FileReader is needed. 
       It could also be used to monitor the progress of a normal http post/put request with large data*/
    // $scope.upload = $upload.http({...})  see 88#issuecomment-31366487 for sample code. 
  };
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

