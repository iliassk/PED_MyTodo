'use strict';

angular.module('ToDoManagerApp')
.controller('AddTodoCtrl', function($scope, $location, $log, $modal, TDMService, $rootScope, alert, $upload,$http, API_URL, $state) {
 
  
  $rootScope.$watch('canFetchData', function(canFetchData) {
        console.log("$rootScope.$watch('canFetchData'  " + canFetchData)

            if(canFetchData){
               TDMService.refresh(function(){
                  $scope.data = TDMService.data;

                });
            }
    });
  ////////////////Submit form /////////////////
  $scope.data = TDMService.data;

  $scope.mytodo = {title: '', description: '', priority: '', context: '', date: '', completed: false, id_owner: '', url: '', attachment_path:'', localization: '', id_list:'', id_category:'', subtodos: new Array()};
  $scope.subtodo = {title: '', description: ''}
  $scope.file;
  $scope.isCollapsed = true;

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
    TDMService.addTodo($scope.mytodo) 
      .success(function(res) {
        alert('success', 'Todo created!', 'Your todo has been created !');
        $state.go('calendar');
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

  $scope.init = function(){ 

    getAdresse(['map-canvas', 'input-address', 'type-selector'], function(position, address){
      $scope.mytodo.localization = address;
    }, function(msg){
      console.log(msg);
    });
  };

  $scope.init();

});

