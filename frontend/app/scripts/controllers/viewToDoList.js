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
        console.log('accessData  ViewToDoList : ' + accessData);

            if(accessData){

               TDMService.refresh(function(){
					$scope.list = TDMService.getAList($stateParams.id);
					console.log($scope.list);
					$scope.group = TDMService.data.group;
					$scope.displayedCollection = [].concat($scope.list.todos);
					$rootScope.isWorking = false;
			   });
            }
    });
    
	$scope.hidecompleted = false;

	$scope.itemsByPage=15;

    //copy the references (you could clone ie angular.copy but then have to go through a dirty checking for the matches)


	$scope.hideCompleted = function(){
		$scope.hidecompleted = !$scope.hidecompleted;
	};

	$scope.shareTodo = function(todo){
		TDMService.generateShareToDoLink(todo.id_todo, function(result){
			$scope.openShareInfo(APP_URL + 'share/' + result.url + '/' + 'todo');
		}, function(){
			//fail
		})     ;   
	};

	$scope.shareList = function(list){
		TDMService.generateShareListLink(list.id_list, function(result){
			$scope.openShareInfo(APP_URL + 'share/' + result.url + '/' + 'todolist');
		}, function(){
			//fail
		});
	};

	$scope.openShareTodoInfo = function(_todo){
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
	};

	$scope.openShareListInfo = function(_list){
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
	};



	$scope.openShareInfo = function(_url){
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
	};

	$scope.deleteTodo = function(todoId, row){
		console.log('[deleteTodo]');

		TDMService.deleteToDo(todoId, function() {
			//sucess
		}, function() {
			//fail
		});
	};

	$scope.deleteTodoList = function(list, row){
		console.log('[deleteTodoList]');

		TDMService.deletetodolist(list, function() {
			//sucess
			$state.go('calendar');

		}, function() {
			//fail
		});
	};

	$scope.addToCalendar = function(type, todo){
		var date = '20140510/20150514';
		var url = '';
		if(type === 'google'){
			url = 
				'https://www.google.com/calendar/render?action=TEMPLATE' + 
				'&text=' + encodeURIComponent(todo.title) +
				'&dates=' + encodeURIComponent(date) +
				'&details=' + encodeURIComponent(todo.description) +
				'&location='+ encodeURIComponent(todo.localization)+
				'&pli=1'+
				'&uid=&sf=false&output=xml#g';
		}else if(type === 'hotmail'){
			url = 
				'https://bay03.calendar.live.com/calendar/calendar.aspx?rru=addevent' +
				'&dtstart=20140510'+
				'&dtend=20150514'+
				'&summary=' + encodeURIComponent(todo.title) +
				'&location='+ encodeURIComponent(todo.localization)+
				'&description=' + encodeURIComponent(todo.description) +
				'&uid=';
		}

		$window.open(url, '_blank');
	};

	$scope.onTodoModified = function(todo){
		todo.completed = !todo.completed;
		todo.completed = (todo.completed ? 1 : 0);

		TDMService.updateTodo(todo, function(data) {
			console.log('[updateTodo] success');
		}, function(data) {
			console.log('[updateTodo] failure');
		});
	};

	$scope.showDate = function(date){

		var lastDate = new Date(date);
		var today=new Date();
		var oneDay=1000*60*60*24;
 		if(Math.ceil((lastDate.getTime()-today.getTime())/(oneDay)) < 0){
 			if(Math.abs(Math.ceil((lastDate.getTime()-today.getTime())/(oneDay))) == 1)
 				return 'Expired ' + Math.abs(Math.ceil((lastDate.getTime()-today.getTime())/(oneDay))) + ' day ago';
 			else
 				return 'Expired ' + Math.abs(Math.ceil((lastDate.getTime()-today.getTime())/(oneDay))) + ' days ago';
 		}
 		else{
 			if(Math.abs(Math.ceil((lastDate.getTime()-today.getTime())/(oneDay))) == 1)
				return Math.ceil((lastDate.getTime()-today.getTime())/(oneDay)) + ' day remaining';
			else
				return Math.ceil((lastDate.getTime()-today.getTime())/(oneDay)) + ' days remaining';
		}
	};

	$scope.showMapButton = function(place){
		return place == '' || place == undefined || place == null;
	};

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
	$scope.type = -1;
	$scope.selectedGroup = -1;
	$scope.selectedGroup2 = -1;
	$scope.selectedContact = -1;
	$scope.contact = contact;
	console.log(contact);
	$scope.todo = todo;
	$scope.ok = function(){
		if($scope.type == 0 && $scope.selectedGroup != -1){
			console.log(contact[$scope.selectedGroup].contact);
			contact[$scope.selectedGroup].contact.forEach(function(elem, index, array){
				console.log(elem);
				TDMService.shareTodoContact(todo.id_todo,elem.id_user).success(function(data) {
					alert('You successfully shared your todo!');
					$scope.close();
				})
				.error(function(data) {
					console.log('[shareTodoGroup] failure');
				});
			});
		}
		else if($scope.type == 1 && $scope.selectedGroup2 != -1 && $scope.selectedContact != 1){
			TDMService.shareTodoContact(todo.id_todo,$scope.selectedContact).success(function(data) {
					alert('You successfully shared your todo!');
					console.log('[shareTodoContact] success');
					$scope.close();
				})
				.error(function(data) {
					console.log('[shareTodoContact] failure');
				});
		}
	};
  $scope.close = function () {
    $modalInstance.dismiss('cancel');
  };
});

angular.module('ToDoManagerApp')
.controller('ShareListModalCtrl', function ($scope, $modalInstance, list, contact, TDMService, alert) {
	console.log('ouverture modal avec list 2 : ' + list);
	$scope.type = -1;
	$scope.selectedGroup = -1;
	$scope.selectedGroup2 = -1;
	$scope.selectedContact = -1;
	$scope.contact = contact;
	$scope.list = list;
	$scope.ok = function(){
		if($scope.type == 0 && $scope.selectedGroup != -1){
			console.log(contact[$scope.selectedGroup].contact);
			contact[$scope.selectedGroup].contact.forEach(function(elem, index, array){
				TDMService.shareListContact(list.id_list,elem.id_user).success(function(data) {
					alert('You successfully shared your todo!');
					console.log('[shareTodoGroup] success');
					$scope.close();
				})
				.error(function(data) {
					console.log('[shareTodoGroup] failure');
				});
			});
		}
		else if($scope.type == 1 && $scope.selectedGroup2 != -1 && $scope.selectedContact != 1){
			TDMService.shareListContact(list.id_list,$scope.selectedContact).success(function(data) {
				alert('You successfully shared your todo!');
					console.log('[shareTodoContact] success');
					$scope.close();
				});
		}
	};
	$scope.close = function () {
    $modalInstance.dismiss('cancel');
  };
});
