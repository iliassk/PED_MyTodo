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
   // var todolist = TDMService.data.listsWithToDo.length;
   // var color;
    //var iscolor=false;
    $rootScope.$watch('accessData', function(accessData) {
       
            if(accessData){
            	TDMService.refresh(function(){
			    	var data = TDMService.getAllToDo()
			    	for(var i = 0; i < data.length; i++){
			    	/*	iscolor=false;
			    		for(var i = 0; i < todolist.length; i++){
			    			if (data.id_list == todolist.id_list) {
			    				color =todolist.color
			    				iscolor =true 
			    			}
			    		}
			    			if(iscolor=false) color ='green';
*/
						var jour = data[i].date; //new Date(data[i].date)
							$scope.events[i]={  title: data[i].title, 
											id:data[i].id_todo,
											start: jour,
											backgroundColor: 'green',
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