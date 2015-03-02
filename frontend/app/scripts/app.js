'use strict';

/**
 * @ngdoc overview
 * @name ToDoManagerApp
 * @description
 * # ToDoManagerApp
 *
 * Main module of the application.
 */
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

angular.module('ToDoManagerApp', ['ui.router', 'ngAnimate', 'ngResource']).config(['$provide',function($provide) {

	$provide.constant('indexedDB', window.indexedDB);

	$provide.constant('_', window._);

	$provide.constant('localStorage', window.localStorage);

	$provide.constant('offline', window.offline);

}]);
