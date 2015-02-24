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
		.state('logout', {
			url: '/logout',
			controller: 'LogoutCtrl'
		});

	$httpProvider.interceptors.push('authInterceptor');
})

.constant('API_URL', 'http://localhost:3000/');