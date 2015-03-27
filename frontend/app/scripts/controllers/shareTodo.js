'use strict';

angular.module('ToDoManagerApp').controller('ShareCtrl', function($scope, $stateParams, $window, alert, TDMService, $state, $rootScope) {
    console.log( 'url : ' + $stateParams.url)
    console.log( 'type : ' + $stateParams.type)
    
    $scope.hasSubtodo;
    $scope.mytodo = '';
    $scope.mylist = '';
    $scope.displayedCollection = {};

    $scope.data = '';
    //Ferme le menu
    $rootScope.closeMenu = true;

    //$scope.init();

    $scope.hideCompleted = function(todo){
        $scope.hidecompleted = !$scope.hidecompleted;
    }

    $scope.showDate = function(date){

        var lastDate = new Date(date);
        var today=new Date();
        var oneDay=1000*60*60*24;
        if(Math.ceil((lastDate.getTime()-today.getTime())/(oneDay)) < 0){
            if(Math.abs(Math.ceil((lastDate.getTime()-today.getTime())/(oneDay))) == 1)
                return 'Expired ' + Math.abs(Math.ceil((lastDate.getTime()-today.getTime())/(oneDay))) + ' day ago';
            else
                return 'Expired ' + Math.abs(Math.ceil((lastDate.getTime()-today.getTime())/(oneDay))) + ' days ago';
        }
        else{
            if(Math.abs(Math.ceil((lastDate.getTime()-today.getTime())/(oneDay))) == 1)
                return Math.ceil((lastDate.getTime()-today.getTime())/(oneDay)) + ' day remaining';
            else
                return Math.ceil((lastDate.getTime()-today.getTime())/(oneDay)) + ' days remaining';
        }
    };

    $scope.addToCalendar = function(type, todo){
        var date = "20140510/20150514";
        var url = "";
        if(type === 'google'){
            url = 
                "https://www.google.com/calendar/render?action=TEMPLATE" + 
                "&text=" + encodeURIComponent(todo.title) +
                "&dates=" + encodeURIComponent(date) +
                "&details=" + encodeURIComponent(todo.description) +
                "&location="+ encodeURIComponent(todo.localization)+
                "&pli=1"+
                "&uid=&sf=false&output=xml#g";
        }else if(type === 'hotmail'){
            url = 
                "https://bay03.calendar.live.com/calendar/calendar.aspx?rru=addevent" +
                "&dtstart=20140510"+
                "&dtend=20150514"+
                "&summary=" + encodeURIComponent(todo.title) +
                "&location="+ encodeURIComponent(todo.localization)+
                "&description=" + encodeURIComponent(todo.description) +
                "&uid=";
        }

        $window.open(url, '_blank');
    }

    $scope.onTodoModified = function(todo){
        todo.completed = !todo.completed;
        todo.completed = (todo.completed ? 1 : 0);

        TDMService.updateTodo(todo)
        .success(function(data) {
            console.log("[updateTodo] success");
        })
        .error(function(data) {
            console.log("[updateTodo] failure");
        });
    }    

    $scope.showMapButton = function(place){
        return place == "" || place == undefined || place == null
    }

    //fetch the data
    TDMService.fetchSharedData($stateParams.url, $stateParams.type,function(data){
        $scope.data = data;
        if($stateParams.type == "todo"){
            $scope.isList = false;
            $scope.mytodo = data[0];
            $scope.hasSubtodo = $scope.mytodo.subtodos ? true : false;
        }
        else if($stateParams.type == "todolist"){
            console.log("todtolis")
            $scope.isList = true;
            $scope.mylist = data[0];
            $scope.displayedCollection = [].concat($scope.mylist.todos);
        }
    },function(){
        console.log("erreur")
    })



});

