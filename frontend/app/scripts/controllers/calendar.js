'use strict';

/**
 * @ngdoc function
 * @name ToDoManagerApp.controller:MainSchedulerCtrl
 * @description
 * # TodoListCtrl
 * Controller of the ToDoManagerApp
 */


angular.module('ToDoManagerApp').controller('CalendarCtrl', function($scope, $window, uiCalendarConfig, alert, TDMService) {
  
 			var date = new Date();
		    var d = date.getDate();
		    var m = date.getMonth();
		    var y = date.getFullYear();
		    $scope.events = [];
		    
		    

		    

		     TDMService.getTodo().success(function(data) {
				alert('success', 'OK!', 'update calendar success ');
				
				for(var i = 0; i < data.length; i++){
				//todo[i] = {title: data[0].title ,start: new Date(y, m, 1), editable: true};
				var jour = new Date(data[i].date)
				$scope.events[i]={title: data[i].title, id:data[i].id_todo ,start: jour, backgroundColor: 'green', durationEditable:false};
				}
			})

		 /* config object */
		    $scope.uiConfig = {
		      calendar:{
		        height: 550,
		        width: 400,
		        editable: true,
		        header:{
		          left: 'today prev,next',
		          center: 'title',
		          right: 'month,basicWeek,basicDay'
		        },
		      }
		    };

		  	$scope.submit = function(){
		  		var data =[];
		  		var t = $scope.events;
		  		  			
		  		for (var i = 0; i < t.length; i++) {
		  			var ev = { nvtime: '', id: ''};
		  			ev.nvtime = t[i].start.getFullYear()+"-"+parseInt(parseInt(t[i].start.getMonth())+1)+"-"+t[i].start.getDate();
		  			ev.id = t[i].id;
		  			data.push(ev);
		  		};
		  		TDMService.updateTodos(data)
		  		  $window.location.reload();
		  	};																																																																																																																																																																																																																																																																																																																																																																																																																																						
			

		     /* event sources array*/
 		    $scope.eventSources 	= [$scope.events, $scope.eventSource, $scope.eventsF];
   			
   			
			
		

});