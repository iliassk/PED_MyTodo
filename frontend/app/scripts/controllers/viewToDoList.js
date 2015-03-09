'use strict';

/**
 * @ngdoc function
 * @name ToDoManagerApp.controller:TodoListCtrl
 * @description
 * # TodoListCtrl
 * Controller of the ToDoManagerApp
 */

angular.module('ToDoManagerApp').controller('ViewToDoList', function($scope, $stateParams, $window, alert, TDMService) {
    
	$scope.list_id = $stateParams.id
	$scope.list
	$scope.todos
	$scope.hidecompleted = false;
	$scope.hideCompleted = function(todo){
		$scope.hidecompleted = !$scope.hidecompleted;
	}

	$scope.popup = {
  		content: '<p>Popup content here</p>',
  		options: {
  			html: true,
    		title: null,
    		placement: 'bottom'
  		}
	}; 


	$scope.fetchData = function(){
		TDMService.fetchToDoListToDos($scope.list_id)
		.success(function(data) {
			data.forEach(function(todo){
				todo.completed = (todo.completed == 1 ? true : false)
			})
			$scope.todos = data;
			console.log("Success fetchData");
		})
		.error(function() {
			console.log("Faillure fetchData");
		});

		TDMService.gettodolist($scope.list_id)
		.success(function(data) {
			$scope.list = data[0];
			console.log('Success get list');
		})
		.error(function() {
			console.log('Failure get list');
		});
	}

	$scope.deleteTodo = function(todo_id){
		console.log("[deleteTodo]");

		TDMService.deleteToDo(todo_id)
		.success(function(data) {
		console.log("[deleteTodo] success");
			$scope.fetchData();
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
			$scope.fetchData();
		})
		.error(function(data) {
			console.log("[updateTodo] failure");
		});
	}

	$scope.fetchData();

});

angular.module('ToDoManagerApp').
directive('popup', function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    scope: {
      ngModel: '=',
      options: '=popup'
    },
    link: function(scope, element) {
      scope.$watch('ngModel', function(val) {
        element.attr('data-content', val);
      });

      var options = scope.options || {} ; 

      var title = options.title || null;
      var placement = options.placement || 'right';
      var html = options.html || false;
      var delay = options.delay ? angular.toJson(options.delay) : null;
      var trigger = options.trigger || 'hover';

      element.attr('title', title);
      element.attr('data-placement', placement);
      element.attr('data-html', html);
      element.attr('data-delay', delay);
      element.popover({ trigger: trigger });
    }
  };
});