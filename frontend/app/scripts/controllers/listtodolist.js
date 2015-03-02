angular.module('ToDoManagerApp').controller('ListTodoListCtrl', function($scope, $window, alert, listtodolistservice) {
    

		listtodolistservice.listtodolist()
		.success(function(data) {
				alert('success', 'OK!', 'update success');
				$scope.TODOLIST = data;
			})
			.error(function() {
				alert('warning', 'Oops!', 'update failed');
			});

		$scope.deleteTodoList = function(obj){
			$scope.test=obj;

     		listtodolistservice.deletetodolist(obj)
     		.success(function(data) {
				alert('success', 'OK!', 'delete success');
				$scope.TODOLIST = data;
			})
			.error(function() {
				alert('warning', 'Oops!', 'delete failed');
			});

     		 $window.location.reload();
	};	

});