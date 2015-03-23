'use strict';

angular.module('ToDoManagerApp').controller('ShareCtrl', function($scope, $stateParams, $window, alert, TDMService, $state, $rootScope) {
    console.log( 'url : ' + $stateParams.url)
    console.log( 'type : ' + $stateParams.type)
    
    $scope.hasSubtodo;
    $scope.mytodo = ''
    $scope.mylist = ''
    $scope.displayedCollection = {};

    $scope.isList = $stateParams.type == "todolist" ? true : false
    console.log($scope.isList)
    $scope.data = ''
    //Ferme le menu
    $rootScope.closeMenu = true

    $scope.init();

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
                "&uid="
        }

        $window.open(url, '_blank');
    }

    $scope.onTodoModified = function(todo){
        console.log(todo);
        todo.completed = !todo.completed
        todo.completed = (todo.completed ? 1 : 0)

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
    TDMService.fetchSharedData($stateParams.url, $stateParams.type)
    .success(function(data){
        $scope.data = data
        console.log("TROLOLOLO")
        console.log($stateParams.type)
        if($stateParams.type == "todo"){
            console.log("todo")
            $scope.mytodo = data[0];
            $scope.hasSubtodo = $scope.mytodo.subtodos ? true : false;
        }
        else if($stateParams.type == "todolist"){
            console.log("todtolis")
            $scope.mylist = data[0];
            $scope.displayedCollection = [].concat($scope.mylist.todos);
        }
    }).error(function(){
        console.log("erreur")
    })
});

