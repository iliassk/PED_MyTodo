'use strict';

/**
 * @ngdoc service
 * @name ToDoManagerApp.auth
 * @description
 * # auth
 * Service in the ToDoManagerApp.
 */
angular.module('ToDoManagerApp').service('auth', function ($http, API_URL, authToken, $state, $window, $q) {

	function authSuccessful(res) {
		authToken.setToken(res.token);
		$state.go('main');
	}

	this.login = function(email, password) {
		return $http.post(API_URL + 'login', {
			email : email,
			password : password
		}).success(authSuccessful);
	};

	this.register = function(username, email, password) {
		return $http.post(API_URL + 'register', {
			username : username,
			email : email,
			password : password
		}).success(authSuccessful);
	};


	var urlBuilder = [];
	var clientId = '601634073893-bd2squ5fv4goei543i19t9nal38k1oph.apps.googleusercontent.com'

	// A string builder of parameters to provide to OAuth
	urlBuilder.push('response_type=code',
		'client_id=' + clientId,
		'redirect_uri=' + window.location.origin,
		'scope=profile email');

	this.googleAuth = function() {
		var url = "https://accounts.google.com/o/oauth2/auth?" + urlBuilder.join('&');

		// Google pop-up's size and position adaptable to different resolutions
		var options = "width=500, height=500, left=" + ($window.outerWidth - 500) / 2 + ", top=" + ($window.outerHeight - 500) / 2.5;

		// We are using the q service to create the promise that will manage the asynchronous calls from addEventListener and $http.post
		var deferred = $q.defer();

		var popup = $window.open(url, '', options);
		$window.focus();

		// Listen to the postMessage (authorization code) from the popup window
		$window.addEventListener('message', function(event) {
			if(event.origin === $window.location.origin) {
				var authCode = event.data;
				popup.close();

				$http.post(API_URL + 'auth/google', {
					code: authCode,
					clientId: clientId,
					redirectUri: window.location.origin
				}).success(function(jwt) {
					authSuccessful(jwt);
					// Send back the promise
					deferred.resolve(jwt);
				});
			}
		});

		return deferred.promise;
	}
});
