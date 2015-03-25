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
						var list = TDMService.getAList(data[i].id_list)
						var jour = data[i].date; //new Date(data[i].date)
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
			
	$scope.eventSources = [$scope.events];
});