'use strict';

angular.module('TODOManager', ['ngResource'])
.factory('TODOManager', ['$resource',
  function($resource){

    return $resource('./../server/todos/:id', {}, {
      
    });
  }
]);