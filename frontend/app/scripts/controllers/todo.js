'use strict';

angular.module('ToDoManagerApp')
.controller('TodoCtrl',  function($scope, $location, $log, $modal, TDMService, alert, $stateParams, $state) {

  $scope.todo_id = $stateParams.id;

  $scope.mytodo = {};
  $scope.mytodolist;
  $scope.isCollapsed = true;
  $scope.isNotEditing = true;

  //This function erases the chosen subtodo
  $scope.eraseSubtodo = function(index, id){
    $scope.mytodo.subtodos.splice(index, 1);
    TDMService.deleteSubToDo(id);
  }

    $scope.addSubTodo = function(subtodo) {
    if(subtodo.title != ''){
      var subtodoTmp = {title : subtodo.title, description : subtodo.description}
      $scope.mytodo.subtodos.push(subtodoTmp)
    }
    else
      alert('warning', 'Empty Subtodo : ', 'If you want to add a subtodo, give it a name!')
  };

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

  $scope.onTodoModified = function(){
    $scope.mytodo.completed = ($scope.mytodo.completed ? 1 : 0)
  }

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
  };  ////////////////Calendar /////////////////

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

  TDMService.refresh(function(){
    //debugger;
    $scope.mytodo = TDMService.getAToDo($stateParams.id);
    console.log("accessing shared data")
    console.log($scope.mytodo)

    $scope.data = TDMService.data;
    $scope.today();
    $scope.toggleMin();
  })

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

  $scope.init();

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

});

  

  ////////////////Controller map modal /////////////////


angular.module('ToDoManagerApp')
.controller('deleteTodoCtrl', function ($scope, $modalInstance, id, $state, TDMService) {

  $scope.id = id;

  $scope.deleteTodo = function () {
    TDMService.deleteToDo(id).success(function(res) {
        console.log('success', 'Todo deleted!', 'Your todo has been deleted !');
        $state.go('main');
      })
      .error(function(err) {
        alert('warning', 'Something went wrong :(', err.message);
      });
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});

