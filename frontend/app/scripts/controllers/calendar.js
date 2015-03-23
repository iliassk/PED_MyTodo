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
    var regExp = new RegExp("IEMobile", "i");

    $rootScope.$watch('accessData', function(accessData) {
       
            if(accessData){
            	console.log("refreshing calendar.js")
               	TDMService.refresh(function(){
			    	var data = TDMService.getAllToDo()
			    	for(var i = 0; i < data.length; i++){
						//todo[i] = {title: data[0].title ,start: new Date(y, m, 1), editable: true};
						var jour = new Date(data[i].date)
						var list = TDMService.getAList(data[i].id_list)
						$scope.events[i]={title: data[i].title, id:data[i].id_todo ,start: jour, backgroundColor: list.color, durationEditable:false};
					}

					$rootScope.isWorking = false;
			    })
            }
    });


    

	/* config object */
	var isMobile = window.matchMedia("only screen and (max-width: 760px)");
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
			}
	    };
 	}	
		   
	$scope.submit = function(){
		var data =[];
		var t = $scope.events;
		  			
		for (var i = 0; i < t.length; i++) {
			var ev = { nvtime: '', id: ''};
			ev.nvtime = t[i].start.getFullYear()+"-"+parseInt(parseInt(t[i].start.getMonth())+1)+"-"+t[i].start.getDate();
			ev.id = t[i].id;
			data.push(ev);
		};
		
		TDMService.updateTodos(data, function(){
			//success
		}, function(){
			//fail
		})
	};																																																																																																																																																																																																																																																																																																																																																																																																																																						
			
	$scope.eventSources = [$scope.events, $scope.eventSources];
});