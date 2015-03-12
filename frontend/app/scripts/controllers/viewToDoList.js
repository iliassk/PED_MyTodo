'use strict';

/**
 * @ngdoc function
 * @name ToDoManagerApp.controller:TodoListCtrl
 * @description
 * # TodoListCtrl
 * Controller of the ToDoManagerApp
 */

angular.module('ToDoManagerApp').controller('ViewToDoList', function($scope, $stateParams, $window, alert, TDMService) {
    TDMService.refresh()
	$scope.list = TDMService.getAList($stateParams.id)
	$scope.hidecompleted = false;
	
	$scope.hideCompleted = function(todo){
		$scope.hidecompleted = !$scope.hidecompleted;
	}

	$scope.deleteTodo = function(todo_id){
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