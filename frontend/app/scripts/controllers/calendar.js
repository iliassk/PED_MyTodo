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
        console.log("accessData  calendar.js")

            if(accessData){
               TDMService.refresh(function(){
			    	var data = TDMService.getAllToDo()
			    	for(var i = 0; i < data.length; i++){
						//todo[i] = {title: data[0].title ,start: new Date(y, m, 1), editable: true};
						var list = TDMService.getAList(data[i].id_list)
						var jour = data[i].date; //new Date(data[i].date)
						$scope.test = 'date: '+data[0].date;

						$scope.events[i]={  title: data[i].title, 
											id:data[i].id_todo,
											start: jour,
											backgroundColor: list.color,
											durationEditable:false};
					}

					$rootScope.isWorking = false;
			    })
            }
    });


   var datas = $scope.events

	/* config object */
	var checker = navigator.userAgent.match(/(iPhone|iPod|iPad|BlackBerry|Android)/);

	if(checker){ 
		$scope.uiConfig = {
			calendar:{
		        height: 550,
		        width: 400,
		        editable: false,
		                                      
				header:{
		         	left: 'today prev,next',
		         	right: 'month,basicDay'
		       	},    
	      }
	    }
	}else{
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
		       	eventDrop: function(event) {
		       		
		       		for (var i = 0; i < datas.length; i++){
		       			if(datas[i].id == event.id )
		       				datas[i].start = event.start;

		       		}
		       				
      				  

    		}
	
			}
	    };
 	}	
		    
	$scope.submit = function(){
		var dataEvent =[];
		var t = datas;
		for (var i = 0; i < t.length; i++) {
			var ev = { nvtime: '', id: ''};
			ev.nvtime = t[i].start;
			ev.id = t[i].id;	

			dataEvent.push(ev);
		}
		TDMService.updateTodos(dataEvent)
         window.location.reload();

	};																																																																																																																																																																																																																																																																																																																																																																																																																																						
			
	$scope.eventSources = [$scope.events, $scope.eventSources];

});