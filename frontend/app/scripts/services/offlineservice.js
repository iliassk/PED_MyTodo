'use strict';

/**
 * @ngdoc service
 * @name ToDoManagerApp.offlineService
 * @description
 * # offlineService
 * Service in the ToDoManagerApp.
 */
angular.module('ToDoManagerApp')
  .service('offlineService', function ($q) {
    // AngularJS will instantiate a singleton by calling "new" on this function
      this.db = null;

    window.indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB;
    if ('webkitIndexedDB' in window) {
        window.IDBTransaction = window.webkitIDBTransaction;
        window.IDBKeyRange = window.webkitIDBKeyRange;
    }
    window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;

    this.onerror = function(e) {
        console.log(e);
    };

    var todosMysql = [];

    this.open = function() {
        var version = 4;

        var deferred = $q.defer();              

        if(window.indexedDB) {
            var request = window.indexedDB.open('ToDoManagerOffline', version);
            // We can only create Object stores in a versionchange transaction.
            request.onupgradeneeded = function(e) {
                db = e.target.result;
                // A versionchange transaction is started automatically.
                e.target.transaction.onerror = this.onerror;
                populateData();

                if(! db.objectStoreNames.contains('todoOffline')) {
 
                     var objectStore = db.createObjectStore('todoOffline', { keyPath: 'id' });
					 objectStore.createIndex('title', 'title', { unique: false });
					 objectStore.createIndex('description', 'description', { unique: false });
					 objectStore.createIndex('priority', 'priority', { unique: false });
					 objectStore.createIndex('context', 'context', { unique: false });
					 objectStore.createIndex('date', 'date', { unique: true });
					 objectStore.createIndex('completed', 'completed', { unique: false });
					 objectStore.createIndex('id_owner', 'id_owner', { unique: false });
					 objectStore.createIndex('url', 'url', { unique: false });
					 objectStore.createIndex('attachment_path', 'attachment_path', { unique: false });
					 objectStore.createIndex('localization', 'localization', { unique: false });
					 objectStore.createIndex('id_list', 'id_list', { unique: false });
					 objectStore.createIndex('id_category', 'id_category', { unique: true });
                }
                if(! db.objectStoreNames.contains('todoListOffline')) {
                     var objectStore = db.createObjectStore('todoListOffline', {keyPath: 'id'});
                     objectStore.createIndex('name', 'name', { unique: false });
					 objectStore.createIndex('description', 'description', { unique: false });
					 objectStore.createIndex('color', 'color', { unique: false });
					 objectStore.createIndex('id_owner', 'id_owner', { unique: false });
                }
            };

            request.onsuccess = function(e) {
                db = e.target.result;

                deferred.resolve();
               
            };
        }
        else{
            console.log('ERROR: Error occured while accessing indexedDB.')
        }
        request.onerror = this.onerror;
        deferred.reject();
        return deferred.promise;
    };

    function populateData() {
		var transaction = db.transaction(['todoOffline'], 'readwrite');
		var objectStore = transaction.objectStore('todoOffline');
		for(i = 0; i < todosMysql.length ; i++) {
			var request = objectStore.put(todosMysql[i]);

		};



    var getTodosOffline = function () {

        var deferred = $q.defer();

        if (db === null) {

            deferred.reject("IndexDB is not opened yet!");

        } else {

            var trans = db.transaction(["todoOffline"], "readwrite");

            var store = trans.objectStore("todoOffline");

            var todos = [];

            

            var keyRange = IDBKeyRange.lowerBound(0);

            var cursorRequest = store.openCursor(keyRange);

            cursorRequest.onsuccess = function (e) {

                var result = e.target.result;

                if (result === null || result === undefined) {

                    deferred.resolve(todos);

                } else {

                    todos.push(result.value);

                    if (result.value.id > lastIndex) {

                        lastIndex = result.value.id;

                    }

                    result.

                    continue ();

                }

            };

            cursorRequest.onerror = function (e) {

                console.log(e.value);

                deferred.reject("Something went wrong!!!");

            };

        }

        return deferred.promise;

    };

    var deleteTodoOffline = function (id) {

        var deferred = $q.defer();

        if (db === null) {

            deferred.reject("IndexDB is not opened yet!");

        } else {

            var trans = db.transaction(["todoOffline"], "readwrite");

            var store = trans.objectStore("todoOffline");

            var request = store.delete(id);

            request.onsuccess = function (e) {

                deferred.resolve();

            };

            request.onerror = function (e) {

                console.log(e.value);

                deferred.reject("Todo item couldn't be deleted");

            };

        }

        return deferred.promise;

    };
  });
