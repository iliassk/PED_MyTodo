'use strict';

angular.module('ToDoManagerApp').config(function($urlRouterProvider, $stateProvider, $httpProvider, $authProvider, API_URL) {

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
			url: '/todolist',
			templateUrl: '/views/todolist.html',
			controller: 'TodoListCtrl'
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
		.state('logout', {
			url: '/logout',
			controller: 'LogoutCtrl'
		});

	// Manage Satellizer authentication providers (Login, Register, Social Login : Google, Facebook ...) with API_URL (port 3000)
	$authProvider.loginUrl = API_URL + 'login';
	$authProvider.signupUrl = API_URL + 'register';

	$authProvider.google({
		clientId: '601634073893-bd2squ5fv4goei543i19t9nal38k1oph.apps.googleusercontent.com',
		// We have to specify our API endpoint for the authorization code exchange, otherwise it will use the port 9000
		url: API_URL + 'auth/google'
	})

	$authProvider.facebook({
		clientId: '894162163981032',
		// We have to specify our API endpoint for the authorization code exchange, otherwise it will use the port 9000
		url: API_URL + 'auth/facebook'
	})

	// Middleware authInterceptor will inject the authorization token
	//$authProvider.httpInterceptor = true;
	//$httpProvider.interceptors.push('authInterceptor');
})

.constant('API_URL', 'http://localhost:3000/')

// Retrieve the authorization code from google
.run(function($window) {
	// Get the params passed back from google, without the question mark from the authorization code included in the params
	var params = $window.location.search.substring(1);

	// To check that params is valid and that we are in the popup window
	if (params && $window.opener && $window.opener.location.origin === $window.location.origin) {
		var pair = params.split('=');
		// To make sure that there is no URI characters in there
		var code = decodeURIComponent(pair[1]);

		// Authorization code is sent from the popup window to the main window
		$window.opener.postMessage(code, $window.location.origin);

	}

});