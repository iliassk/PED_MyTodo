'use strict';

/**
 * @ngdoc function
 * @name ToDoManagerApp.controller:MainSchedulerCtrl
 * @description
 * # TodoListCtrl
 * Controller of the ToDoManagerApp
 */


angular.module('ToDoManagerApp').controller('CalendarCtrl', function($scope, $compile, uiCalendarConfig, alert, TDMService) {
  
 			var date = new Date();
		    var d = date.getDate();
		    var m = date.getMonth();
		    var y = date.getFullYear();
		    $scope.events = [];
		    $scope.test =[{title:'titre 1'},{title:'titre 2'}];
		    

		    

		     TDMService.getTodo().success(function(data) {
				alert('success', 'OK!', 'update success '+ data[0].title);
				
				for(var i = 0; i < data.length; i++){
				//todo[i] = {title: data[0].title ,start: new Date(y, m, 1), editable: true};
				var jour = new Date(data[i].date)
				$scope.events[i]={title: data[i].title, id:data[i].id_todo ,start: jour, backgroundColor: 'green'};
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
		  			var t = [];
		  			t = $scope.events;
		  			var g = t[0].start.getFullYear()+"-"+parseInt(parseInt(t[0].start.getMonth())+1)+"-"+t[0].start.getDate();
		  			$scope.test = g + "id est" +t[0].id ;
		  		  
		  	};																																																																																																																																																																																																																																																																																																																																																																																																																																						
			

		     /* event sources array*/
 		    $scope.eventSources 	= [$scope.events, $scope.eventSource, $scope.eventsF];
   			
   			
			
		

});