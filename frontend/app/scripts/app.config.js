'use strict';

angular.module('ToDoManagerApp').config(function($urlRouterProvider, $stateProvider, $httpProvider) {

	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('main', {
			url: '/',
			templateUrl: '/views/main.html'
		})
		.state('register', {
			url: '/register',
			templateUrl: '/views/register.html',
			controller: 'RegisterCtrl'
		})
		.state('todolist', {
			url : '/todolist',
			templateUrl : '/views/todolist.html',
			controller : 'TodoListCtrl'
		})
		.state('viewToDoList/:id', {
			url: '/todolist/:id',
			templateUrl: '/views/ViewToDoList.html',
			controller: 'ViewToDoList'
		})
		.state('login', {
			url: '/login',
			templateUrl: '/views/login.html',
			controller: 'LoginCtrl'
		})
		.state('todos', {
			url: '/todos',
			templateUrl: '/views/todos.html',
			controller: 'TodosCtrl'
		})
		.state('add/todo', {
			url: '/add/todo',
			templateUrl: '/views/addTodo.html',
			controller: 'AddTodoCtrl'
		})
		.state('todo/', {
			url: '/todo/:id',
			templateUrl: '/views/todo.html',
			controller: 'TodoCtrl'
		})
		.state('listcontact', {
			url: '/listcontact',
			templateUrl: '/views/listcontact.html',
			controller: 'contactCtrl'
		})
		.state('logout', {
			url: '/logout',
			controller: 'LogoutCtrl'
		});

	$httpProvider.interceptors.push('authInterceptor');
})

.constant('API_URL', 'http://localhost:3000/');
