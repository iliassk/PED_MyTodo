'use strict';

angular.module('ToDoManagerApp')
.service('ShareData', function ($http, API_URL, $state) {

	this.data = {
		todoList: '1',
		contact: '1',
		groupe: '1'
	}

	this.updateToDoList = function(){
		console.log("[ShareData][updateToDoList]")
		this.data.todoList = "2"
	}

})