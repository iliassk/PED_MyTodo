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
		        eventClick: $scope.alertOnEventClick,
        		eventDrop: $scope.alertOnDrop,
      		    eventResize: $scope.alertOnResize,
     		    eventRender: $scope.eventRender
		      }
		    };

		     TDMService.getTodo().success(function(data) {
				alert('success', 'OK!', 'update success '+ data[0].title);
				
				for(var i = 0; i < data.length; i++){
				//todo[i] = {title: data[0].title ,start: new Date(y, m, 1), editable: true};
				var d = new Date(data[i].date)
				$scope.events[i]={title: data[i].title ,start: d, editable: true};
				}
			})
		   
		  


			

		    /* Change View */
		    $scope.renderCalender = function(calendar) {
			    if(uiCalendarConfig.calendars[calendar]){
			        uiCalendarConfig.calendars[calendar].fullCalendar('render');
			    }
		    };

		  																																																																																																																																																																																																																																																																																																																																																																																																																																								
	

		     /* event sources array*/
 		    $scope.eventSources 	= [$scope.events, $scope.eventSource, $scope.eventsF];
   			
   			
			
		

});