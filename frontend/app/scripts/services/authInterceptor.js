'use strict';

/**
 * @ngdoc service
 * @name ToDoManagerApp.authInterceptor
 * @description
 * # authInterceptor
 * Factory in the ToDoManagerApp.
 */
angular.module('ToDoManagerApp')
    .factory('authInterceptor', function (authToken) {

        return {
            request: function(config) {
                var token = authToken.getToken();
                if (token){
                    config.headers.Authorization = 'Bearer ' + token;
                }

                return config;
            },
            response: function(response) {
                return response;
            } 
        };
    });
