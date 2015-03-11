'use strict';

/**
 * @ngdoc function
 * @name ToDoManagerApp.controller:MainSchedulerCtrl
 * @description
 * # TodoListCtrl
 * Controller of the ToDoManagerApp
 */


angular.module('ToDoManagerApp').controller('CalendarCtrl', function($scope, alert, TDMService) {
  
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
				$scope.events[i]={title: data[i].title ,start: new Date(y, m, 1), editable: true};
				}
			})
		   
		  

			  /* event source that contains custom events on the scope */
		 /*   $scope.events = [
		      {title: 'All Day Event',start: new Date(y, m, 1), editable: true},
		      {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
		      {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 3),allDay: true},
		      {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16.5, 0),allDay: false},
		      {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
		      {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
		    ];*/
			
		    /* Render Tooltip */
		    $scope.eventRender = function( event, element, view ) { 
		        element.attr({'tooltip': event.title,
		                     'tooltip-append-to-body': true});
		        $compile(element)($scope);
		        console.log("Nemam Amma Bhagavan Sharanam -- Calling tooltip");
		    };

			

		    /* Change View */
		    $scope.renderCalender = function(calendar) {
			    if(uiCalendarConfig.calendars[calendar]){
			        uiCalendarConfig.calendars[calendar].fullCalendar('render');
			    }
		    };

		    /* add and removes an event source of choice */
		    $scope.addRemoveEventSource = function(sources,source) {
		      var canAdd = 0;
		      angular.forEach(sources,function(value, key){
		        if(sources[key] === source){
		          sources.splice(key,1);
		          canAdd = 1;
		        }
		      });
		      if(canAdd === 0){
		        sources.push(source);
		      }
		    };

		     /* event sources array*/
 		    $scope.eventSources 	= [$scope.events, $scope.eventSource, $scope.eventsF];
   			$scope.eventSources2 	= [$scope.calEventsExt, $scope.eventsF, $scope.events];
   			$scope.sources 			= "";
   			$scope.source 			= "";
   		
   			 /* add custom event*/
		     $scope.addEvent = function() {
		     	  console.log("Nemam Amma Bhagavan Sharanam -- Storing Data");
		     	//  1. Store new event in db
		     	// Simple POST request example (passing data) :
				$http.post('/api/addEvent', {
										title: $scope.newEventTitle,
										start: $scope.newEventStart, 
										end: $scope.newEventEnd,
										allDay: false,
										url: ""
										}).
				  success(function(data, status, headers, config) {
				    // this callback will be called asynchronously
				    // when the response is available
				    console.log("Nemam Amma Bhagavan Sharanam -- Storing Data" + data + status);
				    // 2. Render it in calendar
				    $scope.events = res;
        			
        			callback($scope.events);
				  }).
				  error(function(data, status, headers, config) {
				    // called asynchronously if an error occurs
				    // or server returns response with an error status.
				     $scope.events = [{}];

				     console.log("Nemam Amma Bhagavan Sharanam -- Unable to Store Data" + data + status);
				  });
		     	
		    }

			
		

});