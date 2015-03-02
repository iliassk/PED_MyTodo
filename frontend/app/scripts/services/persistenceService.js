(function(){
	'use strict';
	var app = angular.module('ToDoManagerApp');

	app.service('persistenceService',

			['$q', 'offline', 'remotePersistenceStrategy', 'localPersistenceStrategy',
		function($q, offline, remotePersistenceStrategy, localPersistenceStrategy)	

			var self = this;

			self.pesistenceType = 'remote'

			self.action = remotePersistenceStrategy

			offline.on('confirmed-down', function(){
				self.action = localPersistenceStrategy;
				self.pesistenceType = 'local';
			});
			offline.on('confirmed-up', function(){
				self.action = localPersistenceStrategy;
				self.pesistenceType = 'remote';

				self.getRemoteTodo = function(id){
					return remotePersistenceStrategy.getById(id);
					};	
				self.getLocalTodo = function(id){
					return localPersistenceStrategy.getById(id);

				self.getById = function (id){

					var deferred = $q.defer();

					if(offline.state = 'up') {
						var 

							remoteTodo = {},
							localTodo = {};

						self.getRemoteTodo(id).then(function (rTodo)){

							remoteTodo = rTodo;
						}

						self.getLocalTodo(id).then(function (lTodo)){
							
							localTodo = lTodo;

							if(localTodo.modifiedDate > new Date(remoteTodo.modifiedDate))){
								deferred.resolve(localTodo);
							}
							else {
								deferred.resolve(remoteTodo);

							}

						}, deferred.reject);	

					},deferred.reject);
				else{
					self.getLocalTodo(id).then(deferred.resolve, deferred.reject);
				}
					return deferred.promise;	
			
				};
			});
				
			return self; 


		}]);
}());