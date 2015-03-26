'use strict';

/**
 * @ngdoc function
 * @name ToDoManagerApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the ToDoManagerApp
 */
angular.module('ToDoManagerApp').controller('HeaderCtrl', function($scope, $auth, TDMService, $rootScope, $modal, $log,  API_URL, $upload) {
	// Satellizer auth service instead of authToken
	console.debug("Header.js init")
  $scope.isAuthenticated = $auth.isAuthenticated;
   
  $rootScope.$watch('mustRefresh', function(mustRefresh) {

    if(mustRefresh == true){
      console.debug("Header.js forcerefresh sidebar")
      TDMService.forceRefresh(function(){

        $scope.data = TDMService.data;
        $rootScope.accessData = false
        $rootScope.accessData = true
        $rootScope.refreshCalendar = true
        console.debug("J'ai passé refreshCalendar à true ...")
      });
     $rootScope.mustRefresh = false
    }
  });

  $rootScope.$watch('canFetchData', function(canFetchData) {
    if(canFetchData && $scope.isAuthenticated()){
      console.debug("Header.js refresh canfetchdata sidebar")

      TDMService.refresh(function(){
        console.log("==== refresh header.js ====")

        $rootScope.accessData = false
        $rootScope.accessData = true
        $rootScope.refreshCalendar = true
        console.debug("J'ai passé refreshCalendar à true ...")
        $scope.data = TDMService.data;
    });
    }
  });

    $scope.data = TDMService.data;

    if($scope.isAuthenticated()){
        $rootScope.closeMenu = false
    }else
        $rootScope.closeMenu = true

    $scope.loaded = function() { console.log("Loaded"); }


  ////////////////Attachment file /////////////////
  
    $scope.onFileSelect = function($files) {
    //$files: an array of files selected, each file has name, size, and type. 
    for (var i = 0; i < $files.length; i++) {
      var file = $files[i];
      $scope.upload = $upload.upload({
        url: API_URL + 'upload', //upload.php script, node.js route, or servlet url 
        data: {myObj: $scope.file},
        file: file, 
      }).progress(function(evt) {
        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
      }).success(function(data, status, headers, config) {
        // file is uploaded successfully 
        console.log("File : ")
        console.log(data['file']['path']);
       
        file : data['file']['path'];
        TDMService.avatar_path(data['file']['path'],$auth.getPayload().sub);
        $scope.file =data['file']['path'];
         window.location.reload();
        console.log("End of file");
      
      });
    }
    
  };


})
