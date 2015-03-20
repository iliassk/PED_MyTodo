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
	$scope.isAuthenticated = $auth.isAuthenticated;
   
  $rootScope.$watch('mustRefresh', function(mustRefresh) {
    console.log("REFRESH SIDE BAR !!! : " + mustRefresh)
    if(mustRefresh == true){
      TDMService.forceRefresh(function(){
          $scope.data = TDMService.data;
      });
     $rootScope.mustRefresh = false
    }
  });

    $rootScope.$watch('canFetchData', function(canFetchData) {
      if(canFetchData){
        console.log("Je lance le refresh !! header.js")
        //get user avatar
      //var idUser = $auth.getPayload().sub;
      /*TDMService.userAvatar(idUser)
       .success(function(data) {
         $scope.user_avatar = data[0].avatar_path;
       });*/
        TDMService.refresh(function(){
          console.log("==== refresh header.js ====")

          $rootScope.accessData = true
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

    $scope.changeAvatar = function () {

    var modalInstance = $modal.open({
      templateUrl: 'modalDelete.html',
      size: 'sm',
      controller: 'HeaderCtrl',
      resolve: {
        id: function () {
          return "toto";
        }
      }
    });

    modalInstance.result.then(function () {
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
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
          data: {myObj: $scope.file},
          file: file, 
        }).progress(function(evt) {
          console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
        }).success(function(data, status, headers, config) {
          // file is uploaded successfully 
          console.log("File : ")
          console.log(data['file']['path']);
         
          file : data['file']['path'];
          TDMService.avatar_path(data['file']['path'],idUser);
          $scope.file = data['file']['path'];
          console.log("End of file");
        
        });
      }
    
  };


})
.directive("myDirective", ["$templateCache", "$compile", function($templateCache, $compile) {
        return {
            scope: true,
            restrict: "A",
            controller: function($scope) {
                $scope.save = function(e) {}
                $scope.cancel = function(e) {}
            },
            link: function(scope, el, attrs) {
                var tpl = $templateCache.get(attrs.popoverTemplate);
                el.popover({
                    trigger: 'click',
                    html: true,
                    title: attrs.popoverTitle,
                    content: $compile(tpl)(scope),
                    placement: attrs.popoverPlacement
                });
              /*  $el.click(function() {
                    $('.popover').each(function(){
                        var $this = $(this);
                        if($this.parent().attr('id') != $element.parent().attr('id'))
                        {
                            $this.scope().$hide();
                        }
                    }
                    );
                });*/
            }
        }
}]);
