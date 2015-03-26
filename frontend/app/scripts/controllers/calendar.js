'use strict';

/**
 * @ngdoc function
 * @name ToDoManagerApp.controller:MainSchedulerCtrl
 * @description
 * # TodoListCtrl
 * Controller of the ToDoManagerApp
 */

angular.module('ToDoManagerApp').controller('CalendarCtrl', function($scope, $window, uiCalendarConfig, alert, TDMService, $rootScope) {
  
    $scope.events = [];

    $scope.eventSources = $scope.events;

    $rootScope.$watch('accessData', function(accessData) {
        
        console.log("calendar refresh !! : " + accessData)

        if(accessData){
        	TDMService.refresh(function(){
		    	$scope.refreshCalendar()
		    })
        }
    });

    $rootScope.$watch('refreshCalendar', function(refreshCalendar) {
        
        console.log("refreshCalendar : " + refreshCalendar)

        if(refreshCalendar){
			$scope.refreshCalendar()
		    $rootScope.refreshCalendar = false
        }
    });

	/* config object */
	var checker = navigator.userAgent.match(/(iPhone|iPod|iPad|BlackBerry|Android)/);

	if(checker){ 
		$scope.uiConfig = {
			calendar:{
		        width: 400,
		        editable: true,
		                                      
				header:{
		         	left: 'today prev,next',
		         	right: 'month,basicDay'
		       	},    
	      }
	    }
	}else{
		$scope.uiConfig = {
			calendar:{
		        width: 400,
		        editable: true,
		                                      
				header:{
		         	left: 'today prev,next',
		         	center: 'title',
		         	right: 'month,basicWeek,basicDay'
		       	},
		       	eventDrop: function(event) {
		       		var ev = { nvtime: '', id: ''};
					ev.nvtime = event.start;
					ev.id = event.id;	
					console.log(ev)
	   				TDMService.updateTodos(ev, function(){
	   					//success
	   					console.log("success")
	   				}, function(){
	   					console.log("fail")
	   					//fail
	   				})
    			}    
			}
	    };
 	}																																																																																																																																																																																																																																																																																																																																																																																																																													
		

	$scope.refreshCalendar = function(){
		console.log("calendar refresh !!")
		
		$rootScope.isWorking = true;
		var data = TDMService.getAllToDo()

    	for(var i = 0; i < data.length; i++){

			$scope.events[i]={  
				title: data[i].title, 
				id:data[i].id_todo,
				start: data[i].date,
				url: '/#/todo/' + data[i].id_todo,
				backgroundColor: TDMService.getAList(data[i].id_list).color,
				durationEditable:false
			};
		}

		$scope.eventSources = [$scope.events];
		$rootScope.isWorking = false;
	}
	$scope.refreshCalendar()
});