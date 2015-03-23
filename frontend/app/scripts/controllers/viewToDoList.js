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

	$rootScope.$watch('accessData', function(accessData) {
        console.log("accessData  ViewToDoList : " + accessData)

            if(accessData){

               TDMService.refresh(function(){
					$scope.list = TDMService.getAList($stateParams.id)
					console.log($scope.list)
					$scope.group = TDMService.data.group
					$scope.displayedCollection = [].concat($scope.list.todos);
					$rootScope.isWorking = false;
			   })
            }
    });
    
	$scope.hidecompleted = false;

	$scope.itemsByPage=15;

    //copy the references (you could clone ie angular.copy but then have to go through a dirty checking for the matches)


	$scope.hideCompleted = function(todo){
		$scope.hidecompleted = !$scope.hidecompleted;
	}

	$scope.shareTodo = function(todo){
		console.log("Share todo")
		TDMService.generateShareToDoLink(todo.id_todo, function(result){
			$scope.openShareInfo(APP_URL + 'share/' + result.url + '/' + "todo")
		}, function(){
			//fail
		})
	}

	$scope.shareList = function(list){
		console.log("Share list")
		TDMService.generateShareListLink(list.id_list, function(result){
			$scope.openShareInfo(APP_URL + 'share/' + result.url + '/' + "todolist")
		}, function(){
			//fail
		})
	}

	$scope.openShareTodoInfo = function(_todo){
		console.log("ouverture modal avec todo : " + _todo)
		var modalInstance = $modal.open({
	      templateUrl: 'shareTodo.html',
	      controller: 'ShareTodoModalCtrl',
	      //size: 'sm',
	      resolve: {
	        todo: function () {
	          return _todo;
	        },
	        contact: function(){
	        	return $scope.group;
	        }
	      }
	    });
	}

	$scope.openShareListInfo = function(_list){
		console.log("ouverture modal avec list : " + _list)
		var modalInstance = $modal.open({
	      templateUrl: 'shareList.html',
	      controller: 'ShareListModalCtrl',
	      //size: 'sm',
	      resolve: {
	        list: function () {
	          return _list;
	        },
	        contact: function(){
	        	return $scope.group;
	        }
	      }
	    });
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

		TDMService.deleteToDo(todo_id, function(data) {
			//sucess
		}, function(data) {
			//fail
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

		TDMService.updateTodo(todo, function(data) {
			console.log("[updateTodo] success");
		}, function(data) {
			console.log("[updateTodo] failure");
		});
	}

	$scope.showMapButton = function(place){
		return place == "" || place == undefined || place == null
	}

});

angular.module('ToDoManagerApp')
.controller('ShareModalCtrl', function ($scope, $modalInstance, url) {

  $scope.url = url;
  $scope.close = function () {
    $modalInstance.dismiss('cancel');
  };

});

angular.module('ToDoManagerApp')
.controller('ShareTodoModalCtrl', function ($scope, $modalInstance, todo, contact, TDMService, alert) {
	$scope.type = -1
	$scope.selected_group = -1;
	$scope.selected_group2 = -1;
	$scope.selected_contact = -1;
	$scope.contact = contact
	console.log(contact)
	$scope.todo = todo;
	$scope.ok = function(){
		if($scope.type == 0 && $scope.selected_group != -1){
			console.log(contact[$scope.selected_group].contact)
			contact[$scope.selected_group].contact.forEach(function(elem, index, array){
				console.log(elem)
				TDMService.shareTodoContact(todo.id_todo,elem.id_user).success(function(data) {
					alert("You successfully shared your todo!")
					$scope.close();
				})
				.error(function(data) {
					console.log("[shareTodoGroup] failure");
				});
			})
		}
		else if($scope.type == 1 && $scope.selected_group2 != -1 && $scope.selected_contact != 1){
			TDMService.shareTodoContact(todo.id_todo,$scope.selected_contact).success(function(data) {
					alert("You successfully shared your todo!")
					console.log("[shareTodoContact] success");
					$scope.close();
				})
				.error(function(data) {
					console.log("[shareTodoContact] failure");
				});
		}
	}
  $scope.close = function () {
    $modalInstance.dismiss('cancel');
  };
});

angular.module('ToDoManagerApp')
.controller('ShareListModalCtrl', function ($scope, $modalInstance, list, contact, TDMService, alert) {
	console.log("ouverture modal avec list 2 : " + list)
	$scope.type = -1
	$scope.selected_group = -1;
	$scope.selected_group2 = -1;
	$scope.selected_contact = -1;
	$scope.contact = contact
	console.log(contact)
	$scope.list = list;
	$scope.ok = function(){
		if($scope.type == 0 && $scope.selected_group != -1){
			console.log(contact[$scope.selected_group].contact)
			contact[$scope.selected_group].contact.forEach(function(elem, index, array){
				console.log(elem)
				TDMService.shareListContact(list.id_list,elem.id_user).success(function(data) {
					alert("You successfully shared your todo!")
					console.log("[shareTodoGroup] success");
					$scope.close();
				})
				.error(function(data) {
					console.log("[shareTodoGroup] failure");
				});
			})
		}
		else if($scope.type == 1 && $scope.selected_group2 != -1 && $scope.selected_contact != 1){
			TDMService.shareListContact(list.id_list,$scope.selected_contact).success(function(data) {
				alert("You successfully shared your todo!")
					console.log("[shareTodoContact] success");
					$scope.close();
				})
		}
	}
	$scope.close = function () {
    $modalInstance.dismiss('cancel');
  };
})
