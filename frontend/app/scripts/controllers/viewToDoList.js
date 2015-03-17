'use strict';

/**
 * @ngdoc function
 * @name ToDoManagerApp.controller:TodoListCtrl
 * @description
 * # TodoListCtrl
 * Controller of the ToDoManagerApp
 */

angular.module('ToDoManagerApp').controller('ViewToDoList', function($scope, $stateParams, $window, alert, TDMService, $state, APP_URL, $modal, $rootScope) {
    
	$scope.list = {};
	$scope.displayedCollection = {};
    TDMService.refresh(function(){
    	console.log("accessing shared data")
		$scope.list = TDMService.getAList($stateParams.id)
		console.log($scope.list)
		$scope.displayedCollection = [].concat($scope.list.todos);
		$rootScope.isWorking = false;
    })
	$scope.hidecompleted = false;

	$scope.itemsByPage=15;

    //copy the references (you could clone ie angular.copy but then have to go through a dirty checking for the matches)


	$scope.hideCompleted = function(todo){
		$scope.hidecompleted = !$scope.hidecompleted;
	}

	$scope.shareTodo = function(todo){
		console.log("Share todo")
		TDMService.generateShareToDoLink(todo.id_todo)
		.success(function(result){
			$scope.openShareInfo(APP_URL + 'share/' + result.url + '/' + "todo")
		}).error(function(){
			alert("Impossible de générer un lien !");
		})
		
	}

	$scope.shareList = function(list){
		console.log("Share list")
		TDMService.generateShareListLink(list.id_list)
		.success(function(result){
			$scope.openShareInfo(APP_URL + 'share/' + result.url + '/' + "todolist")
		}).error(function(){
			alert("Impossible de générer un lien !");
		})
	}

	$scope.openShareInfo = function(_url){
		console.log("ouverture modal avec url : " + _url)
		var modalInstance = $modal.open({
	      templateUrl: 'share_data.html',
	      controller: 'ShareModalCtrl',
	     // size: 'sm',
	      resolve: {
	        url: function () {
	          return _url;
	        }
	      }
	    });
	}

	$scope.deleteTodo = function(todo_id, row){
		console.log("[deleteTodo]");

		TDMService.deleteToDo(todo_id)
		.success(function(data) {
			console.log("[deleteTodo] success");
			
		})
		
		.error(function(data) {
			console.log("[deleteTodo] failure");
		});
	}

	$scope.addToCalendar = function(type, todo){
		var date = "20140510/20150514";
		var url = "";
		if(type === 'google'){
			url = 
				"https://www.google.com/calendar/render?action=TEMPLATE" + 
				"&text=" + encodeURIComponent(todo.title) +
				"&dates=" + encodeURIComponent(date) +
				"&details=" + encodeURIComponent(todo.description) +
				"&location="+ encodeURIComponent(todo.localization)+
				"&pli=1"+
				"&uid=&sf=false&output=xml#g";
		}else if(type === 'hotmail'){
			url = 
				"https://bay03.calendar.live.com/calendar/calendar.aspx?rru=addevent" +
				"&dtstart=20140510"+
				"&dtend=20150514"+
				"&summary=" + encodeURIComponent(todo.title) +
				"&location="+ encodeURIComponent(todo.localization)+
				"&description=" + encodeURIComponent(todo.description) +
				"&uid="
		}

		$window.open(url, '_blank');
	}

	$scope.onTodoModified = function(todo){
		console.log(todo);
		todo.completed = !todo.completed
		todo.completed = (todo.completed ? 1 : 0)

		TDMService.updateTodo(todo)
		.success(function(data) {
			console.log("[updateTodo] success");
		})
		.error(function(data) {
			console.log("[updateTodo] failure");
		});
	}

});

angular.module('ToDoManagerApp')
.controller('ShareModalCtrl', function ($scope, $modalInstance, url) {

  $scope.url = url;
  $scope.close = function () {
    $modalInstance.dismiss('cancel');
  };
});