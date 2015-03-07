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
	$scope.todos

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

	$scope.addToCalendar = function(todo){
		console.log(todo);

		
		//google
		/*
		var date = "20140510/20150514";

		var url = 
		  "https://www.google.com/calendar/render?action=TEMPLATE" + 
		  "&text=" + encodeURIComponent(todo.title) +
		  "&dates=" + encodeURIComponent(date) +
		  "&details=" + encodeURIComponent(todo.description) +
		  "&location="+ encodeURIComponent(todo.localization)+
		  "&pli=1"+
		  "&uid=&sf=false&output=xml#g";
		*/

		//hotmail
		var url = 
			"https://bay03.calendar.live.com/calendar/calendar.aspx?rru=addevent" +
			"&dtstart=20140510"+
			"&dtend=20150514"+
			"&summary=" + encodeURIComponent(todo.title) +
			"&location="+ encodeURIComponent(todo.localization)+
			"&description=" + encodeURIComponent(todo.description) +
			"&uid="

		$window.open(url, '_blank');
	}

	$scope.onTodoModified = function(todo){
		console.log(todo);

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